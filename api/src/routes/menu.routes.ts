import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';

const router = Router();
const controller = new MenuController();

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;

