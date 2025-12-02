# 🚀 Deploy ทั้ง Frontend และ Backend ไป Vercel

โปรเจกต์นี้ได้รับการตั้งค่าให้สามารถ **deploy ทั้งหมดไป Vercel** ได้แล้ว!

## ✅ สิ่งที่ทำแล้ว

1. ✅ แปลง Express API เป็น Next.js API Routes
2. ✅ ย้าย backend code ไปยัง `ui/lib/api-backend/`
3. ✅ สร้าง API Routes ใน `ui/app/api/`
4. ✅ แก้ไข frontend ให้เรียกใช้ API routes โดยตรง
5. ✅ เพิ่ม dependencies ที่จำเป็น (googleapis, zod, dotenv)

---

## 📋 ขั้นตอนการ Deploy

### ขั้นตอนที่ 1: ติดตั้ง Vercel CLI

```bash
npm i -g vercel
```

### ขั้นตอนที่ 2: Login ไป Vercel

```bash
vercel login
```

### ขั้นตอนที่ 3: Deploy โปรเจกต์

```bash
# ใน root directory ของโปรเจกต์
vercel
```

หรือใช้ Vercel Dashboard:
1. ไปที่ https://vercel.com
2. คลิก "Add New..." → "Project"
3. Import Git Repository
4. **ตั้งค่า Root Directory เป็น `ui`**
5. Vercel จะ auto-detect Next.js

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables

ไปที่ Vercel Dashboard → Project → Settings → Environment Variables

เพิ่ม variables ต่อไปนี้:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
```

**⚠️ สำคัญ:** 
- `GOOGLE_PRIVATE_KEY` ต้องใส่ทั้ง private key รวมถึง `-----BEGIN PRIVATE KEY-----` และ `-----END PRIVATE KEY-----`
- ต้องใช้ `\n` สำหรับ newline

### ขั้นตอนที่ 5: Redeploy

หลังจากตั้งค่า Environment Variables แล้ว:

```bash
vercel --prod
```

หรือใน Dashboard: คลิก "Redeploy"

---

## 📁 โครงสร้าง API Routes

```
ui/app/api/
├── stock/
│   ├── route.ts          # GET, POST /api/stock
│   └── [id]/
│       └── route.ts      # PUT, DELETE /api/stock/:id
├── menu/
│   ├── route.ts          # GET, POST /api/menu
│   └── [id]/
│       └── route.ts      # PUT, DELETE /api/menu/:id
├── order/
│   ├── route.ts          # GET, POST /api/order
│   └── dashboard/
│       └── route.ts      # GET /api/order/dashboard
├── upload/
│   └── receipt/
│       └── route.ts      # POST /api/upload/receipt
├── uploads/
│   └── [filename]/
│       └── route.ts      # GET /api/uploads/:filename
└── health/
    └── route.ts          # GET /api/health
```

---

## ⚙️ Configuration Files

### `vercel.json`
- ตั้งค่า Root Directory เป็น `ui`
- Build และ deploy commands

### `.vercelignore`
- ไฟล์ที่ต้อง exclude จาก deployment

---

## 🔧 การทำงาน

### Development (Local)
```bash
cd ui
pnpm dev
```
- Frontend: http://localhost:3000
- API Routes: http://localhost:3000/api/*

### Production (Vercel)
- Frontend: `https://your-app.vercel.app`
- API Routes: `https://your-app.vercel.app/api/*`

---

## 📝 หมายเหตุสำคัญ

### 1. File Uploads
- ไฟล์ที่อัพโหลดจะถูกเก็บใน `/tmp` (ephemeral storage) บน Vercel
- **ไฟล์จะหายไปเมื่อ serverless function หมดอายุ** (ประมาณ 10 วินาที - 10 นาที)
- **แนะนำ:** สำหรับ production จริง ควรใช้:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary
  - หรือ external file storage service

### 2. Environment Variables
- ต้องตั้งค่าใน Vercel Dashboard
- ใช้ `.env.local` สำหรับ development

### 3. Google Sheets API
- ต้องตั้งค่า Service Account และ credentials
- ดูรายละเอียดใน `WHAT_TO_DO_AT_GOOGLE.md`

---

## 🐛 แก้ไขปัญหา

### Build Error
```bash
# ลบ node_modules และ .next
cd ui
rm -rf node_modules .next
pnpm install
pnpm build
```

### Environment Variables ไม่ทำงาน
- ตรวจสอบว่าใส่ใน Vercel Dashboard แล้ว
- Redeploy หลังจากเพิ่ม environment variables

### API Routes ไม่ทำงาน
- ตรวจสอบว่า route files อยู่ใน `ui/app/api/` directory
- ตรวจสอบ logs ใน Vercel Dashboard

---

## ✅ Checklist

- [ ] ติดตั้ง Vercel CLI
- [ ] Login Vercel
- [ ] Deploy โปรเจกต์
- [ ] ตั้งค่า Root Directory เป็น `ui`
- [ ] เพิ่ม Environment Variables:
  - [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL
  - [ ] GOOGLE_PRIVATE_KEY
  - [ ] GOOGLE_SPREADSHEET_ID
- [ ] Redeploy หลังจากตั้งค่า environment variables
- [ ] ทดสอบ API endpoints
- [ ] ทดสอบ Frontend

---

## 🎉 พร้อมใช้งาน!

เมื่อ deploy สำเร็จ:
- **Frontend & API:** `https://your-app.vercel.app`
- **Health Check:** `https://your-app.vercel.app/api/health`
- **Stock API:** `https://your-app.vercel.app/api/stock`

---

## 📚 เอกสารเพิ่มเติม

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

