import { z } from 'zod';

export const ingredientSchema = z.object({
  productName: z.string().min(1, 'ชื่อสินค้าต้องไม่ว่าง'),
  quantity: z.number().positive('จำนวนต้องมากกว่า 0'),
});

export const createMenuSchema = z.object({
  foodName: z.string().min(1, 'ชื่ออาหารต้องไม่ว่าง'),
  ingredients: z.array(ingredientSchema).min(1, 'ต้องมีวัตถุดิบอย่างน้อย 1 รายการ'),
  sellingPrice: z.number().positive('ราคาขายต้องมากกว่า 0'),
});

export const updateMenuSchema = createMenuSchema.partial();

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;

