import express from 'express';
import cors from 'cors';
import path from 'path';
import stockRoutes from './routes/stock.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map((url: string) => url.trim())
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/stock', stockRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

