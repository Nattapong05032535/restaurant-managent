# 🚀 คู่มือ Deploy ขึ้น Vercel

โปรเจกต์นี้สามารถ deploy ขึ้น Vercel ได้ แต่ต้อง deploy แยกเป็น 2 ส่วน:

1. **Frontend (Next.js)** → Deploy ไป Vercel ✅
2. **Backend (Express API)** → Deploy ไป platform อื่น เช่น Railway, Render, หรือ Heroku

---

## 📋 ขั้นตอนการ Deploy

### วิธีที่ 1: Deploy Frontend ไป Vercel + Backend แยก (แนะนำ)

#### ขั้นตอนที่ 1: Deploy Backend ไป Railway (แนะนำ) หรือ Render

**Railway (แนะนำ - ง่ายและฟรี):**
1. ไปที่ https://railway.app
2. สร้าง Account (ใช้ GitHub login)
3. คลิก "New Project" → "Deploy from GitHub repo"
4. เลือก repository และตั้งค่า:
   - **Root Directory:** `api`
   - **Build Command:** `pnpm install`
   - **Start Command:** `pnpm start` หรือ `pnpm run dev`
5. เพิ่ม Environment Variables:
   ```
   PORT=3001
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@...
   GOOGLE_PRIVATE_KEY=your-private-key
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
   ```
6. Railway จะให้ URL เช่น: `https://your-api.railway.app`

**หรือใช้ Render:**
1. ไปที่ https://render.com
2. สร้าง Account และ New Web Service
3. เชื่อมต่อ GitHub repo
4. ตั้งค่า:
   - **Root Directory:** `api`
   - **Build Command:** `pnpm install`
   - **Start Command:** `pnpm start`
5. เพิ่ม Environment Variables เหมือน Railway

---

#### ขั้นตอนที่ 2: Deploy Frontend ไป Vercel

**วิธีที่ 1: ใช้ Vercel CLI (แนะนำ)**

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd ui
vercel

# ตั้งค่า Environment Variables
vercel env add NEXT_PUBLIC_API_URL
# ใส่ URL ของ Backend เช่น: https://your-api.railway.app
```

**วิธีที่ 2: ใช้ Vercel Dashboard (เว็บไซต์)**

1. ไปที่ https://vercel.com
2. สร้าง Account (ใช้ GitHub login)
3. คลิก "Add New..." → "Project"
4. Import Git Repository (เชื่อมต่อ GitHub repo)
5. ตั้งค่า Project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `ui` (สำคัญ!)
   - **Build Command:** `pnpm install && pnpm build` (หรือเว้นว่าง)
   - **Output Directory:** `.next` (หรือเว้นว่าง)
   - **Install Command:** `cd ui && pnpm install`
6. เพิ่ม Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app
   ```
7. คลิก "Deploy"

---

### วิธีที่ 2: Deploy ทั้ง Frontend และ Backend ไป Vercel (Advanced)

หากต้องการ deploy ทั้งหมดไป Vercel ต้องแปลง Backend เป็น Vercel Serverless Functions

**ข้อดี:**
- Deploy ที่เดียว
- ไม่ต้องจัดการ backend แยก

**ข้อจำกัด:**
- File uploads อาจมีปัญหา (ต้องใช้ external storage)
- Execution time จำกัด (10 วินาทีสำหรับ Hobby plan)

---

## 🔧 การตั้งค่า Environment Variables

### สำหรับ Frontend (Vercel)

ไปที่ Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

**⚠️ สำคัญ:** ต้องใช้ `NEXT_PUBLIC_` prefix เพื่อให้ใช้ได้ใน client-side

### สำหรับ Backend (Railway/Render)

```
PORT=3001
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
```

---

## 📝 ไฟล์ที่ต้องแก้ไขสำหรับ Production

### 1. ตรวจสอบ `ui/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

ต้องตั้งค่า `NEXT_PUBLIC_API_URL` ใน Vercel environment variables

### 2. ตรวจสอบ CORS ใน Backend

ต้องอัปเดต CORS ใน `api/src/app.ts` ให้อนุญาต domain ของ Vercel:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'
  ]
}));
```

---

## 🐛 แก้ไขปัญหา CORS

หากพบ CORS error หลัง deploy:

1. แก้ไข `api/src/app.ts`:
```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

2. เพิ่ม Environment Variable ใน Backend:
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Checklist ก่อน Deploy

### Frontend (Vercel)
- [ ] สร้าง Vercel account
- [ ] เชื่อมต่อ GitHub repository
- [ ] ตั้งค่า Root Directory เป็น `ui`
- [ ] เพิ่ม Environment Variable: `NEXT_PUBLIC_API_URL`
- [ ] Deploy!

### Backend (Railway/Render)
- [ ] สร้าง account ที่ Railway หรือ Render
- [ ] Deploy backend API
- [ ] เพิ่ม Environment Variables ทั้งหมด
- [ ] ทดสอบ API endpoint (เช่น `https://your-api.railway.app/health`)
- [ ] อัปเดต CORS ให้รองรับ Vercel domain

---

## 🌐 URLs หลัง Deploy

- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-api.railway.app`

---

## 📚 เอกสารเพิ่มเติม

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

## 🆘 ถ้ามีปัญหา

1. **Frontend ไม่แสดงข้อมูล:**
   - ตรวจสอบ `NEXT_PUBLIC_API_URL` ใน Vercel environment variables
   - ตรวจสอบ Console ใน Browser (F12) ดู error

2. **CORS Error:**
   - แก้ไข CORS configuration ใน backend
   - เพิ่ม Vercel domain ใน allowed origins

3. **Backend ไม่ทำงาน:**
   - ตรวจสอบ logs ใน Railway/Render dashboard
   - ตรวจสอบ environment variables
   - ทดสอบ API endpoint โดยตรง

---

## 💡 Tips

- ใช้ Vercel CLI สำหรับ quick deployment
- ตั้งค่า Environment Variables ใน Vercel Dashboard จะสะดวกกว่า
- Railway ฟรีสำหรับ personal projects
- Render ฟรีแต่มี limitation (ต้อง wake up ถ้า idle นาน)

