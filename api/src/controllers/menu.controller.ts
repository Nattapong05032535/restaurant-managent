import { Request, Response } from 'express';
import { MenuRepository } from '../repositories/menu.repository';
import { createMenuSchema, updateMenuSchema } from '../schemas/menu.schema';

const menuRepo = new MenuRepository();

export class MenuController {
  async getAll(req: Request, res: Response) {
    try {
      const items = await menuRepo.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = createMenuSchema.parse(req.body);
      const item = await menuRepo.create(data);
      res.status(201).json(item);
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create menu item' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateMenuSchema.parse(req.body);
      const item = await menuRepo.update(id, data);
      res.json(item);
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to update menu item' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await menuRepo.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete menu item' });
    }
  }
}

