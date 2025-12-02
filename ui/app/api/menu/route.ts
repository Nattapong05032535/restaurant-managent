import { NextRequest, NextResponse } from 'next/server';
import { MenuRepository } from '@/lib/api-backend/repositories/menu.repository';
import { createMenuSchema, updateMenuSchema } from '@/lib/api-backend/schemas/menu.schema';

const menuRepo = new MenuRepository();

export async function GET() {
  try {
    const items = await menuRepo.getAll();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createMenuSchema.parse(body);
    const item = await menuRepo.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

