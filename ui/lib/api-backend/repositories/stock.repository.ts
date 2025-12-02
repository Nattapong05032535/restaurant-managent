import { getSheetsClient, SHEET_NAMES } from '../config/sheets';
import { CreateStockInput, UpdateStockInput } from '../schemas/stock.schema';
import { memoryStorage } from '../config/storage';

export interface StockItem {
  id: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  addedBy: string;
  createdAt: string;
  receiptUrl?: string;
}

export class StockRepository {
  private useMemoryStorage(): boolean {
    return !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
           !process.env.GOOGLE_SPREADSHEET_ID ||
           process.env.USE_MEMORY_STORAGE === 'true';
  }

  async getAll(): Promise<StockItem[]> {
    if (this.useMemoryStorage()) {
      return memoryStorage.getStock();
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_NAMES.STOCK}!A2:F`,
      });

      const rows = response.data.values || [];
      return rows.map((row, index) => ({
        id: `stock-${index + 2}`,
        productName: row[0] || '',
        quantity: parseFloat(row[1] || '0'),
        pricePerUnit: parseFloat(row[2] || '0'),
        addedBy: row[3] || '',
        createdAt: row[4] || new Date().toISOString(),
        receiptUrl: row[5] || '',
      }));
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.getStock();
    }
  }

  async create(data: CreateStockInput): Promise<StockItem> {
    if (this.useMemoryStorage()) {
      return memoryStorage.createStock(data);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      
      const values = [[
        data.productName,
        data.quantity,
        data.pricePerUnit,
        data.addedBy,
        new Date().toISOString(),
        data.receiptUrl || '',
      ]];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAMES.STOCK}!A:F`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      const allItems = await this.getAll();
      return allItems[allItems.length - 1];
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.createStock(data);
    }
  }

  async update(id: string, data: UpdateStockInput): Promise<StockItem> {
    if (this.useMemoryStorage()) {
      return memoryStorage.updateStock(id, data);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      const rowIndex = parseInt(id.split('-')[1]);
      
      const existing = await this.getAll();
      const item = existing.find(i => i.id === id);
      if (!item) throw new Error('Stock item not found');

      const updated = { ...item, ...data };
      const values = [[
        updated.productName,
        updated.quantity,
        updated.pricePerUnit,
        updated.addedBy,
        updated.createdAt,
        updated.receiptUrl || '',
      ]];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAMES.STOCK}!A${rowIndex}:F${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.updateStock(id, data);
    }
  }

  async delete(id: string): Promise<void> {
    if (this.useMemoryStorage()) {
      return memoryStorage.deleteStock(id);
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
                sheetId: await this.getSheetId(SHEET_NAMES.STOCK),
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
      return memoryStorage.deleteStock(id);
    }
  }

  private async getSheetId(sheetName: string): Promise<number> {
    const { sheets, spreadsheetId } = await getSheetsClient();
    const response = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = response.data.sheets?.find(s => s.properties?.title === sheetName);
    return sheet?.properties?.sheetId || 0;
  }
}
