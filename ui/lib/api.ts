import axios from 'axios';

// สำหรับ production จะใช้ relative path, สำหรับ development ใช้ localhost
const API_URL = typeof window !== 'undefined' 
  ? '' // ใช้ relative path เมื่ออยู่ใน browser
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StockItem {
  id: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  addedBy: string;
  createdAt: string;
  receiptUrl?: string;
}

export interface MenuItem {
  id: string;
  foodName: string;
  ingredients: Array<{ productName: string; quantity: number }>;
  sellingPrice: number;
  createdAt: string;
}

export interface Order {
  id: string;
  menuItems: Array<{ foodName: string; quantity: number }>;
  totalSales: number;
  totalCost: number;
  profit: number;
  createdAt: string;
}

export const stockApi = {
  getAll: () => api.get<StockItem[]>('/api/stock'),
  create: (data: Omit<StockItem, 'id' | 'createdAt'>) => api.post<StockItem>('/api/stock', data),
  update: (id: string, data: Partial<StockItem>) => api.put<StockItem>(`/api/stock/${id}`, data),
  delete: (id: string) => api.delete(`/api/stock/${id}`),
};

export const uploadApi = {
  uploadReceipt: (file: File) => {
    const formData = new FormData();
    formData.append('receipt', file);
    // ใช้ relative path สำหรับ API routes
    return axios.post<{ url: string }>('/api/upload/receipt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const menuApi = {
  getAll: () => api.get<MenuItem[]>('/api/menu'),
  create: (data: Omit<MenuItem, 'id' | 'createdAt'>) => api.post<MenuItem>('/api/menu', data),
  update: (id: string, data: Partial<MenuItem>) => api.put<MenuItem>(`/api/menu/${id}`, data),
  delete: (id: string) => api.delete(`/api/menu/${id}`),
};

export const orderApi = {
  getAll: () => api.get<Order[]>('/api/order'),
  create: (data: { menuItems: Array<{ foodName: string; quantity: number }> }) => 
    api.post<Order>('/api/order', data),
  getDashboard: () => api.get<{
    totalSales: number;
    totalCost: number;
    totalProfit: number;
    orderCount: number;
    reports: Order[];
  }>('/api/order/dashboard'),
};

