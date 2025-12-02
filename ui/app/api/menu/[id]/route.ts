import { NextRequest, NextResponse } from 'next/server';
import { MenuRepository } from '@/lib/api-backend/repositories/menu.repository';
import { updateMenuSchema } from '@/lib/api-backend/schemas/menu.schema';

const menuRepo = new MenuRepository();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateMenuSchema.parse(body);
    const item = await menuRepo.update(id, data);
    return NextResponse.json(item);
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to update menu item' },
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
    await menuRepo.delete(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}

