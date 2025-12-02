import { NextResponse } from 'next/server';
import { OrderRepository } from '@/lib/api-backend/repositories/order.repository';

const orderRepo = new OrderRepository();

export async function GET() {
  try {
    const stats = await orderRepo.getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

