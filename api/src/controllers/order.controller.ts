import { Request, Response } from 'express';
import { OrderRepository } from '../repositories/order.repository';
import { createOrderSchema } from '../schemas/order.schema';

const orderRepo = new OrderRepository();

export class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const orders = await orderRepo.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = createOrderSchema.parse(req.body);
      const order = await orderRepo.create(data);
      res.status(201).json(order);
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create order' });
      }
    }
  }

  async getDashboard(req: Request, res: Response) {
    try {
      const stats = await orderRepo.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  }
}

