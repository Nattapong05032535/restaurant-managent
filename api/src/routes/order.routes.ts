import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const controller = new OrderController();

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.get('/dashboard', (req, res) => controller.getDashboard(req, res));

export default router;

