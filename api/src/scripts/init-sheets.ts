import { getSheetsClient, SHEET_NAMES } from '../config/sheets';

async function initializeSheets() {
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Initialize Stock sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAMES.STOCK}!A1:E1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          'ชื่อสินค้า',
          'จำนวน',
          'ราคาต่อจำนวน',
          'ผู้เพิ่มสต็อก',
          'วันที่สร้าง'
        ]],
      },
    });

    // Initialize Menu sheet
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

    // Initialize Orders sheet
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

    console.log('✅ Google Sheets initialized successfully!');
    console.log(`📊 Spreadsheet ID: ${spreadsheetId}`);
    console.log(`📋 Sheets created: ${SHEET_NAMES.STOCK}, ${SHEET_NAMES.MENU}, ${SHEET_NAMES.ORDERS}`);
  } catch (error: any) {
    console.error('❌ Failed to initialize sheets:', error.message);
    if (error.message.includes('Unable to parse range')) {
      console.error('\n💡 Make sure you have created the following sheets in your Google Spreadsheet:');
      console.error(`   - ${SHEET_NAMES.STOCK}`);
      console.error(`   - ${SHEET_NAMES.MENU}`);
      console.error(`   - ${SHEET_NAMES.ORDERS}`);
    }
    process.exit(1);
  }
}

initializeSheets();

