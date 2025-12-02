// Simple in-memory storage for demo/testing
// Can be switched to Google Sheets by setting USE_GOOGLE_SHEETS=true

export interface StorageAdapter {
  getStock(): Promise<any[]>;
  createStock(data: any): Promise<any>;
  updateStock(id: string, data: any): Promise<any>;
  deleteStock(id: string): Promise<void>;
  
  getMenu(): Promise<any[]>;
  createMenu(data: any): Promise<any>;
  updateMenu(id: string, data: any): Promise<any>;
  deleteMenu(id: string): Promise<void>;
  
  getOrders(): Promise<any[]>;
  createOrder(data: any): Promise<any>;
}

class MemoryStorage implements StorageAdapter {
  private stock: any[] = [];
  private menu: any[] = [];
  private orders: any[] = [];

  async getStock() {
    return this.stock;
  }

  async createStock(data: any) {
    const item = {
      id: `stock-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.stock.push(item);
    return item;
  }

  async updateStock(id: string, data: any) {
    const index = this.stock.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Stock item not found');
    this.stock[index] = { ...this.stock[index], ...data };
    return this.stock[index];
  }

  async deleteStock(id: string) {
    const index = this.stock.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Stock item not found');
    this.stock.splice(index, 1);
  }

  async getMenu() {
    return this.menu;
  }

  async createMenu(data: any) {
    const item = {
      id: `menu-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.menu.push(item);
    return item;
  }

  async updateMenu(id: string, data: any) {
    const index = this.menu.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Menu item not found');
    this.menu[index] = { ...this.menu[index], ...data };
    return this.menu[index];
  }

  async deleteMenu(id: string) {
    const index = this.menu.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Menu item not found');
    this.menu.splice(index, 1);
  }

  async getOrders() {
    return this.orders;
  }

  async createOrder(data: any) {
    const order = {
      id: `order-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }
}

// Create instance first
export const memoryStorage = new MemoryStorage();

// Initialize with some demo data (only if using memory storage)
if (process.env.USE_MEMORY_STORAGE === 'true') {
  memoryStorage.createStock({
    productName: 'ข้าวสาร',
    quantity: 10000,
    pricePerUnit: 500,
    addedBy: 'Demo User',
  });

  memoryStorage.createStock({
    productName: 'เนื้อหมู',
    quantity: 5000,
    pricePerUnit: 800,
    addedBy: 'Demo User',
  });

  memoryStorage.createMenu({
    foodName: 'ข้าวผัด',
    ingredients: [
      { productName: 'ข้าวสาร', quantity: 200 },
      { productName: 'เนื้อหมู', quantity: 100 },
    ],
    sellingPrice: 80,
  });
}

