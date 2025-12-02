import { getSheetsClient, SHEET_NAMES } from '../config/sheets';
import { CreateOrderInput } from '../schemas/order.schema';
import { MenuRepository } from './menu.repository';
import { StockRepository } from './stock.repository';
import { memoryStorage } from '../config/storage';

export interface Order {
  id: string;
  menuItems: Array<{ foodName: string; quantity: number }>;
  totalSales: number;
  totalCost: number;
  profit: number;
  createdAt: string;
}

export class OrderRepository {
  private menuRepo = new MenuRepository();
  private stockRepo = new StockRepository();

  private useMemoryStorage(): boolean {
    return !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
           !process.env.GOOGLE_SPREADSHEET_ID ||
           process.env.USE_MEMORY_STORAGE === 'true';
  }

  async getAll(): Promise<Order[]> {
    if (this.useMemoryStorage()) {
      return memoryStorage.getOrders();
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_NAMES.ORDERS}!A2:F`,
      });

      const rows = response.data.values || [];
      return rows.map((row, index) => ({
        id: `order-${index + 2}`,
        menuItems: JSON.parse(row[0] || '[]'),
        totalSales: parseFloat(row[1] || '0'),
        totalCost: parseFloat(row[2] || '0'),
        profit: parseFloat(row[3] || '0'),
        createdAt: row[4] || new Date().toISOString(),
      }));
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.getOrders();
    }
  }

  async create(data: CreateOrderInput): Promise<Order> {
    const menus = await this.menuRepo.getAll();
    const stocks = await this.stockRepo.getAll();
    
    let totalSales = 0;
    let totalCost = 0;
    const usedIngredients: Record<string, number> = {};

    // Calculate sales and cost
    for (const orderItem of data.menuItems) {
      const menu = menus.find(m => m.foodName === orderItem.foodName);
      if (!menu) continue;

      totalSales += menu.sellingPrice * orderItem.quantity;

      // Calculate cost from ingredients
      for (const ingredient of menu.ingredients) {
        const stock = stocks.find(s => s.productName === ingredient.productName);
        if (stock) {
          const costPerGram = stock.pricePerUnit / stock.quantity;
          const cost = costPerGram * ingredient.quantity * orderItem.quantity;
          totalCost += cost;
          
          // Track used ingredients
          if (!usedIngredients[ingredient.productName]) {
            usedIngredients[ingredient.productName] = 0;
          }
          usedIngredients[ingredient.productName] += ingredient.quantity * orderItem.quantity;
        }
      }
    }

    const profit = totalSales - totalCost;
    const orderData = {
      menuItems: data.menuItems,
      totalSales,
      totalCost,
      profit,
    };

    if (this.useMemoryStorage()) {
      return memoryStorage.createOrder(orderData);
    }

    try {
      const { sheets, spreadsheetId } = await getSheetsClient();
      const values = [[
        JSON.stringify(data.menuItems),
        totalSales,
        totalCost,
        profit,
        new Date().toISOString(),
      ]];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAMES.ORDERS}!A:E`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      const allOrders = await this.getAll();
      return allOrders[allOrders.length - 1];
    } catch (error) {
      console.warn('Google Sheets error, falling back to memory storage:', error);
      return memoryStorage.createOrder(orderData);
    }
  }

  async getDashboardStats() {
    const orders = await this.getAll();
    
    const totalSales = orders.reduce((sum, order) => sum + order.totalSales, 0);
    const totalCost = orders.reduce((sum, order) => sum + order.totalCost, 0);
    const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);

    return {
      totalSales,
      totalCost,
      totalProfit,
      orderCount: orders.length,
      reports: orders,
    };
  }
}
