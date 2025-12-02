import { NextRequest, NextResponse } from 'next/server';
import { StockRepository } from '@/lib/api-backend/repositories/stock.repository';
import { updateStockSchema } from '@/lib/api-backend/schemas/stock.schema';

const stockRepo = new StockRepository();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateStockSchema.parse(body);
    const item = await stockRepo.update(id, data);
    return NextResponse.json(item);
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to update stock item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await stockRepo.delete(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete stock item' },
      { status: 500 }
    );
  }
}

