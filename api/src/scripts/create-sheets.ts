import dotenv from 'dotenv';
import { resolve } from 'path';
import { getSheetsClient, SHEET_NAMES } from '../config/sheets';

// Load .env from project root (not from api folder)
dotenv.config({ path: resolve(__dirname, '../../../.env') });

async function createSheets() {
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Get existing sheets
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

    const sheetsToCreate = [
      SHEET_NAMES.STOCK,
      SHEET_NAMES.MENU,
      SHEET_NAMES.ORDERS,
    ];

    const requests: any[] = [];

    for (const sheetName of sheetsToCreate) {
      if (!existingSheets.includes(sheetName)) {
        requests.push({
          addSheet: {
            properties: {
              title: sheetName,
            },
          },
        });
        console.log(`➕ Will create sheet: ${sheetName}`);
      } else {
        console.log(`✓ Sheet already exists: ${sheetName}`);
      }
    }

    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests,
        },
      });
      console.log(`✅ Created ${requests.length} new sheet(s)`);
    }

    // Initialize headers
    await initializeHeaders();
  } catch (error: any) {
    console.error('❌ Failed to create sheets:', error.message);
    process.exit(1);
  }
}

async function initializeHeaders() {
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Stock headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAMES.STOCK}!A1:F1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          'ชื่อสินค้า',
          'จำนวน',
          'ราคาต่อจำนวน',
          'ผู้เพิ่มสต็อก',
          'วันที่สร้าง',
          'รูปใบเสร็จ'
        ]],
      },
    });

    // Menu headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAMES.MENU}!A1:D1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          'ชื่ออาหาร',
          'วัตถุดิบ',
          'ราคาขาย',
          'วันที่สร้าง'
        ]],
      },
    });

    // Orders headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAMES.ORDERS}!A1:E1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          'รายการอาหาร',
          'ยอดขาย',
          'ต้นทุน',
          'กำไร',
          'วันที่สร้าง'
        ]],
      },
    });

    console.log('✅ Headers initialized successfully!');
  } catch (error: any) {
    console.error('❌ Failed to initialize headers:', error.message);
    throw error;
  }
}

createSheets();

