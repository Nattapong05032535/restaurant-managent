import { getSheetsClient, SHEET_NAMES } from '../config/sheets';
import { CreateMenuInput, UpdateMenuInput } from '../schemas/menu.schema';
import { memoryStorage } from '../config/storage';

export interface MenuItem {
  id: string;
  foodName: string;
  ingredients: Array<{ productName: string; quantity: number }>;
  sellingPrice: number;
  createdAt: string;
}

export class MenuRepository {
  private useMemoryStorage(): boolean {
    return !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
           !process.env.GOOGLE_SPREADSHEET_ID ||
           process.env.USE_MEMORY_STORAGE === 'true';
  }

  async getAll(): Promise<MenuItem[]> {
    if (this.useMemoryStorage()) {
      return memoryStorage.getMenu();
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_NAMES.MENU}!A2:D`,
      });

      const rows = response.data.values || [];
      return rows.map((row, index) => ({
        id: `menu-${index + 2}`,
        foodName: row[0] || '',
        ingredients: JSON.parse(row[1] || '[]'),
        sellingPrice: parseFloat(row[2] || '0'),
        createdAt: row[3] || new Date().toISOString(),
      }));
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.getMenu();
    }
  }

  async create(data: CreateMenuInput): Promise<MenuItem> {
    if (this.useMemoryStorage()) {
      return memoryStorage.createMenu(data);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      
      const values = [[
        data.foodName,
        JSON.stringify(data.ingredients),
        data.sellingPrice,
        new Date().toISOString(),
      ]];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAMES.MENU}!A:D`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      const allItems = await this.getAll();
      return allItems[allItems.length - 1];
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.createMenu(data);
    }
  }

  async update(id: string, data: UpdateMenuInput): Promise<MenuItem> {
    if (this.useMemoryStorage()) {
      return memoryStorage.updateMenu(id, data);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      const rowIndex = parseInt(id.split('-')[1]);
      
      const existing = await this.getAll();
      const item = existing.find(i => i.id === id);
      if (!item) throw new Error('Menu item not found');

      const updated = { ...item, ...data };
      const values = [[
        updated.foodName,
        JSON.stringify(updated.ingredients),
        updated.sellingPrice,
        updated.createdAt,
      ]];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAMES.MENU}!A${rowIndex}:D${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.updateMenu(id, data);
    }
  }

  async delete(id: string): Promise<void> {
    if (this.useMemoryStorage()) {
      return memoryStorage.deleteMenu(id);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      const rowIndex = parseInt(id.split('-')[1]);
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: await this.getSheetId(SHEET_NAMES.MENU),
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          }],
        },
      });
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.deleteMenu(id);
    }
  }

  private async getSheetId(sheetName: string): Promise<number> {
    const { sheets, spreadsheetId } = await getSheetsClient();
    const response = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = response.data.sheets?.find(s => s.properties?.title === sheetName);
    return sheet?.properties?.sheetId || 0;
  }
}
