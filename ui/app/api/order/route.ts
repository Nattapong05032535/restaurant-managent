import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository } from '@/lib/api-backend/repositories/order.repository';
import { createOrderSchema } from '@/lib/api-backend/schemas/order.schema';

const orderRepo = new OrderRepository();

export async function GET() {
  try {
    const orders = await orderRepo.getAll();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createOrderSchema.parse(body);
    const order = await orderRepo.create(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

