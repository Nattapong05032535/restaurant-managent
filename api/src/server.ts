import dotenv from 'dotenv';
import { resolve } from 'path';
import app from './app';

// Load .env from project root (not from api folder)
dotenv.config({ path: resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

