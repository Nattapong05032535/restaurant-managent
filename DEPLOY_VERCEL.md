# 🚀 Deploy ทั้งหมดไป Vercel

โปรเจกต์นี้พร้อม deploy ไป Vercel แล้ว! **ทั้ง Frontend และ Backend อยู่ในที่เดียว**

---

## ✅ สิ่งที่ทำแล้ว

- ✅ แปลง Express API เป็น Next.js API Routes
- ✅ ย้าย backend code ไปยัง `ui/lib/api-backend/`
- ✅ สร้าง API Routes ทั้งหมดใน `ui/app/api/`
- ✅ แก้ไข frontend ให้เรียกใช้ API routes โดยตรง
- ✅ เพิ่ม dependencies ที่จำเป็น
- ✅ Build test ผ่านแล้ว!

---

## 📋 ขั้นตอน Deploy

### วิธีที่ 1: ใช้ Vercel CLI (แนะนำ)

```bash
# 1. ติดตั้ง Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. ตอบคำถาม:
# - Set up and deploy? Y
# - Which scope? (เลือก account)
# - Link to existing project? N
# - Project name? (ตั้งชื่อหรือ Enter)
# - Directory? ui (สำคัญ!)
# - Override settings? N
```

### วิธีที่ 2: ใช้ Vercel Dashboard

1. ไปที่ https://vercel.com
2. คลิก **"Add New..."** → **"Project"**
3. Import Git Repository
4. **ตั้งค่า:**
   - **Framework Preset:** Next.js (auto-detect)
   - **Root Directory:** `ui` ⚠️ **สำคัญมาก!**
   - **Build Command:** `pnpm install && pnpm build` (หรือเว้นว่าง)
   - **Output Directory:** `.next` (หรือเว้นว่าง)
   - **Install Command:** `pnpm install`
5. คลิก **"Deploy"**

---

## ⚙️ Environment Variables

หลังจาก deploy แล้ว ต้องตั้งค่า Environment Variables ใน Vercel:

1. ไปที่ Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. เพิ่ม variables ต่อไปนี้:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
```

**⚠️ สำคัญ:**
- `GOOGLE_PRIVATE_KEY` ต้องใส่ทั้ง private key รวมถึง `-----BEGIN PRIVATE KEY-----` และ `-----END PRIVATE KEY-----`
- ต้องใช้ `\n` สำหรับ newline

3. **Redeploy** หลังจากเพิ่ม environment variables

---

## 📁 โครงสร้าง API Routes

```
ui/app/api/
├── stock/
│   ├── route.ts              → GET, POST /api/stock
│   └── [id]/
│       └── route.ts          → PUT, DELETE /api/stock/:id
├── menu/
│   ├── route.ts              → GET, POST /api/menu
│   └── [id]/
│       └── route.ts          → PUT, DELETE /api/menu/:id
├── order/
│   ├── route.ts              → GET, POST /api/order
│   └── dashboard/
│       └── route.ts          → GET /api/order/dashboard
├── upload/
│   └── receipt/
│       └── route.ts          → POST /api/upload/receipt
├── uploads/
│   └── [filename]/
│       └── route.ts          → GET /api/uploads/:filename
└── health/
    └── route.ts              → GET /api/health
```

---

## 🔧 การทำงาน

### Development (Local)
```bash
cd ui
pnpm dev
```
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/*

### Production (Vercel)
- Frontend & API: `https://your-app.vercel.app`
- API Routes: `https://your-app.vercel.app/api/*`

---

## 📝 หมายเหตุสำคัญ

### 1. File Uploads (สำคัญ!)
**Vercel Serverless Functions มี limitation:**
- ไฟล์ที่อัพโหลดจะถูกเก็บใน `/tmp` (ephemeral storage)
- ไฟล์จะหายไปเมื่อ function หมดอายุ (ประมาณ 10 วินาที - 10 นาที)
- URL ที่เก็บใน Google Sheet อาจใช้งานไม่ได้ถ้า function หมดอายุ

**คำแนะนำสำหรับ Production:**
- ใช้ **Vercel Blob Storage** (แนะนำ)
- หรือใช้ **AWS S3**, **Cloudinary**, **ImageKit** ฯลฯ

### 2. Environment Variables
- ตั้งค่าใน Vercel Dashboard → Settings → Environment Variables
- **Redeploy** หลังจากเพิ่ม environment variables

### 3. Google Sheets Setup
- ดูรายละเอียดใน `WHAT_TO_DO_AT_GOOGLE.md`
- ต้องตั้งค่า Service Account และแชร์ Google Sheet

---

## ✅ Checklist

- [ ] ติดตั้ง Vercel CLI หรือใช้ Dashboard
- [ ] Login Vercel
- [ ] Deploy โปรเจกต์
- [ ] **ตั้ง Root Directory เป็น `ui`**
- [ ] เพิ่ม Environment Variables:
  - [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL
  - [ ] GOOGLE_PRIVATE_KEY
  - [ ] GOOGLE_SPREADSHEET_ID
- [ ] Redeploy หลังจากตั้งค่า environment variables
- [ ] ทดสอบ API: `https://your-app.vercel.app/api/health`
- [ ] ทดสอบ Frontend

---

## 🎉 พร้อมใช้งาน!

เมื่อ deploy สำเร็จ:
- **Frontend:** `https://your-app.vercel.app`
- **API Health:** `https://your-app.vercel.app/api/health`
- **Stock API:** `https://your-app.vercel.app/api/stock`

---

## 🐛 แก้ไขปัญหา

### Build Error
```bash
cd ui
rm -rf node_modules .next
pnpm install
pnpm build
```

### Environment Variables ไม่ทำงาน
- ตรวจสอบว่าใส่ใน Vercel Dashboard แล้ว
- **Redeploy** หลังจากเพิ่ม environment variables

### API Routes ไม่ทำงาน
- ตรวจสอบว่า route files อยู่ใน `ui/app/api/`
- ดู logs ใน Vercel Dashboard → Deployments → [Deployment] → Functions

---

## 📚 เอกสารเพิ่มเติม

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**🚀 พร้อม deploy แล้ว!**

