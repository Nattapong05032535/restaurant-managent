import { NextResponse } from 'next/server';

export async function GET() {
  // ตรวจสอบ environment variables (ไม่แสดงค่า private key)
  return NextResponse.json({
    hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    hasSpreadsheetId: !!process.env.GOOGLE_SPREADSHEET_ID,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.substring(0, 30) + '...' : 'Not set',
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID ? 
      process.env.GOOGLE_SPREADSHEET_ID.substring(0, 20) + '...' : 'Not set',
  });
}

