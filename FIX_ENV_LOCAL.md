# 🔧 แก้ไขปัญหา Environment Variables

## ปัญหา
Next.js API Routes ไม่สามารถดึงข้อมูลจาก Google Sheet ได้

## สาเหตุ
Next.js API Routes ต้องใช้ `.env.local` ในโฟลเดอร์ `ui/` แต่ `.env` อยู่ที่ root directory

## วิธีแก้ไข

### วิธีที่ 1: Copy .env ไป ui/.env.local (แนะนำ)

```bash
# จาก root directory
cp .env ui/.env.local
```

### วิธีที่ 2: สร้าง Symlink

```bash
# จาก root directory
ln -s ../.env ui/.env.local
```

### วิธีที่ 3: สร้าง .env.local ใหม่ใน ui/

```bash
cd ui
cp ../.env .env.local
```

## ตรวจสอบ

หลังจากแก้ไขแล้ว:
1. **Restart Next.js dev server**
2. ทดสอบ: `curl http://localhost:3000/api/test-env`
3. ตรวจสอบว่า environment variables ถูกโหลดแล้ว

## สำหรับ Production (Vercel)

ตั้งค่า Environment Variables ใน Vercel Dashboard → Settings → Environment Variables

---

**หมายเหตุ:** ไฟล์ `.env.local` อยู่ใน `.gitignore` แล้ว ไม่ต้องกังวลเรื่อง commit secrets

