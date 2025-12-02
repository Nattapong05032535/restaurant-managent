import { Request, Response } from 'express';
import { StockRepository } from '../repositories/stock.repository';
import { createStockSchema, updateStockSchema } from '../schemas/stock.schema';

const stockRepo = new StockRepository();

export class StockController {
  async getAll(req: Request, res: Response) {
    try {
      const items = await stockRepo.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stock items' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = createStockSchema.parse(req.body);
      const item = await stockRepo.create(data);
      res.status(201).json(item);
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create stock item' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateStockSchema.parse(req.body);
      const item = await stockRepo.update(id, data);
      res.json(item);
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to update stock item' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await stockRepo.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete stock item' });
    }
  }
}

