import { z } from 'zod';

export const createOrderSchema = z.object({
  menuItems: z.array(z.object({
    foodName: z.string().min(1),
    quantity: z.number().positive(),
  })).min(1, 'ต้องมีรายการอาหารอย่างน้อย 1 รายการ'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

