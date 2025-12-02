import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getSheetsClient() {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID };
}

export const SHEET_NAMES = {
  STOCK: 'Stock',
  MENU: 'Menu',
  ORDERS: 'Orders',
} as const;

