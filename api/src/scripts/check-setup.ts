import dotenv from 'dotenv';
import { resolve } from 'path';
import { getSheetsClient, SHEET_NAMES } from '../config/sheets';

// Load .env from project root (not from api folder)
dotenv.config({ path: resolve(__dirname, '../../../.env') });

async function checkSetup() {
  console.log('🔍 Checking setup...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  const requiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SPREADSHEET_ID',
  ];

  let allVarsSet = true;
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value && value.trim() !== '') {
      console.log(`  ✅ ${varName}: Set`);
    } else {
      console.log(`  ❌ ${varName}: Not set`);
      allVarsSet = false;
    }
  }

  if (!allVarsSet) {
    console.log('\n⚠️  Please set all required environment variables in .env file');
    process.exit(1);
  }

  console.log('\n🔗 Testing Google Sheets connection...');
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // Test connection by getting spreadsheet metadata
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    console.log(`  ✅ Connected to spreadsheet: ${spreadsheet.data.properties?.title || spreadsheetId}`);

    // Check if sheets exist
    console.log('\n📊 Checking sheets:');
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];
    const requiredSheets = [SHEET_NAMES.STOCK, SHEET_NAMES.MENU, SHEET_NAMES.ORDERS];

    for (const sheetName of requiredSheets) {
      if (existingSheets.includes(sheetName)) {
        console.log(`  ✅ ${sheetName}: Exists`);

        // Check headers
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:Z1`,
          });
          const headers = response.data.values?.[0] || [];
          if (headers.length > 0) {
            console.log(`     Headers: ${headers.join(', ')}`);
          } else {
            console.log(`     ⚠️  No headers found`);
          }
        } catch (error) {
          console.log(`     ⚠️  Could not read headers`);
        }
      } else {
        console.log(`  ❌ ${sheetName}: Missing`);
      }
    }

    console.log('\n✅ Setup check complete!');
    console.log('\n💡 If sheets are missing, run: npm run create-sheets');
  } catch (error: any) {
    console.error('\n❌ Connection failed:', error.message);
    if (error.message.includes('permission')) {
      console.error('\n💡 Make sure:');
      console.error('   1. Service Account has access to the spreadsheet');
      console.error('   2. Google Sheets API is enabled');
      console.error('   3. Credentials are correct');
    }
    process.exit(1);
  }
}

checkSetup();

