import { NextRequest, NextResponse } from 'next/server';
import { StockRepository } from '@/lib/api-backend/repositories/stock.repository';
import { createStockSchema, updateStockSchema } from '@/lib/api-backend/schemas/stock.schema';

const stockRepo = new StockRepository();

export async function GET() {
  try {
    const items = await stockRepo.getAll();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createStockSchema.parse(body);
    const item = await stockRepo.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create stock item' },
      { status: 500 }
    );
  }
}

