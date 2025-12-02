import { z } from 'zod';

export const createStockSchema = z.object({
  productName: z.string().min(1, 'ชื่อสินค้าต้องไม่ว่าง'),
  quantity: z.number().positive('จำนวนต้องมากกว่า 0'),
  pricePerUnit: z.number().positive('ราคาต่อหน่วยต้องมากกว่า 0'),
  addedBy: z.string().min(1, 'ผู้เพิ่มสต็อกต้องไม่ว่าง'),
  receiptUrl: z.string().optional(),
});

export const updateStockSchema = createStockSchema.partial();

export type CreateStockInput = z.infer<typeof createStockSchema>;
export type UpdateStockInput = z.infer<typeof updateStockSchema>;

