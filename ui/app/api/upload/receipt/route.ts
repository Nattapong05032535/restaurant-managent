import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('receipt') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ไม่มีไฟล์ที่อัพโหลด' },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าเป็นไฟล์รูปภาพ
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น' },
        { status: 400 }
      );
    }

    // ตรวจสอบขนาดไฟล์ (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'ขนาดไฟล์ต้องไม่เกิน 5MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // สร้างชื่อไฟล์
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `receipt-${uniqueSuffix}-${file.name}`;

    // สำหรับ Vercel: ใช้ /tmp directory (ephemeral storage)
    // หมายเหตุ: ไฟล์จะหายไปเมื่อ function หมดอายุ แต่ URL จะเก็บไว้ใน Google Sheet
    const uploadDir = process.env.VERCEL ? '/tmp' : join(process.cwd(), 'public', 'uploads');
    
    if (!process.env.VERCEL && !existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // สำหรับ Vercel: ใช้ public URL (ต้อง upload ไป external storage)
    // หรือใช้ Vercel Blob Storage
    // ตอนนี้จะใช้ /api/uploads/[filename] endpoint
    const fileUrl = `/api/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการอัพโหลดไฟล์' },
      { status: 500 }
    );
  }
}

