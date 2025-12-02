# 🚀 Deploy ไป Vercel - คู่มือแบบละเอียด

**Repository:** https://github.com/Nattapong05032535/restaurant-managent

---

## 📋 วิธีที่ 1: ใช้ Vercel Dashboard (แนะนำ - ง่ายที่สุด)

### ขั้นตอนที่ 1: เข้าไปที่ Vercel

1. เปิดเบราว์เซอร์ไปที่: **https://vercel.com**
2. **Sign up** หรือ **Sign in** ด้วย GitHub account

### ขั้นตอนที่ 2: Import Project

1. คลิกปุ่ม **"+ Add New..."** (มุมขวาบน)
2. เลือก **"Project"**
3. คลิก **"Import Git Repository"**
4. เลือก **GitHub** และ authorize Vercel
5. ค้นหา repository: **`restaurant-managent`**
6. หรือ paste URL: `https://github.com/Nattapong05032535/restaurant-managent`
7. คลิก **"Import"**

### ขั้นตอนที่ 3: ตั้งค่า Project

1. **Project Name:** ตั้งชื่อ (หรือใช้ชื่อเดิม `restaurant-managent`)
2. **Framework Preset:** Next.js (จะ auto-detect อัตโนมัติ)
3. **Root Directory:** `ui` ⚠️ **สำคัญมาก!** 
   - คลิก "Edit" ตรง Root Directory
   - เปลี่ยนจาก `/` เป็น `ui`
   - **หมายเหตุ:** Root Directory ต้องตั้งค่าใน Dashboard เท่านั้น ไม่ได้อยู่ในไฟล์ `vercel.json`
4. **Build Command:** จะถูก auto-fill จาก `vercel.json` หรือเว้นว่างไว้
5. **Output Directory:** `.next` (หรือเว้นว่าง)
6. **Install Command:** จะถูก auto-fill จาก `vercel.json` หรือเว้นว่างไว้

### ขั้นตอนที่ 4: เพิ่ม Environment Variables

**ก่อนคลิก Deploy** ให้เพิ่ม Environment Variables:

1. คลิก **"Environment Variables"**
2. เพิ่ม variables ทีละตัว:

   **ตัวที่ 1:**
   - Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: `restaurant-api-service@restaurant-management-480003.iam.gserviceaccount.com`
   - Environment: เลือก **Production, Preview, Development** ทั้งหมด

   **ตัวที่ 2:**
   - Name: `GOOGLE_PRIVATE_KEY`
   - Value: คัดลอกทั้ง private key จากไฟล์ `.env`:
     ```
     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC62NWJNFXVT+yY\n...\n-----END PRIVATE KEY-----\n"
     ```
     ⚠️ **สำคัญ:** ต้องมี `"..."` และ `\n` ภายใน
   - Environment: เลือก **Production, Preview, Development** ทั้งหมด

   **ตัวที่ 3:**
   - Name: `GOOGLE_SPREADSHEET_ID`
   - Value: `1_3pbkw3F7oayXKyY518n9LBKe6T-lXcBiXid5c_MNJk`
   - Environment: เลือก **Production, Preview, Development** ทั้งหมด

3. คลิก **"Add"** สำหรับแต่ละตัว

### ขั้นตอนที่ 5: Deploy!

1. คลิกปุ่ม **"Deploy"**
2. รอให้ build เสร็จ (ประมาณ 2-5 นาที)
3. ✅ เสร็จแล้ว!

### ขั้นตอนที่ 6: ตรวจสอบ

1. หลังจาก deploy เสร็จ Vercel จะให้ URL เช่น:
   - `https://restaurant-managent.vercel.app`
2. เปิด URL นั้น
3. ทดสอบว่าเว็บทำงานได้

---

## 📋 วิธีที่ 2: ใช้ Vercel CLI

### ติดตั้ง Vercel CLI

```bash
npm i -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
# จาก root directory ของโปรเจกต์
vercel
```

**ตอบคำถาม:**
- Set up and deploy? → **Y**
- Which scope? → เลือก account
- Link to existing project? → **N** (ถ้าเป็นครั้งแรก)
- Project name? → ตั้งชื่อหรือ Enter
- Directory? → **ui** ⚠️ **สำคัญ!**
- Override settings? → **N**

### เพิ่ม Environment Variables

```bash
# เพิ่ม environment variables
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
# ตอบ: production, preview, development (เลือกทั้งหมด)

vercel env add GOOGLE_PRIVATE_KEY
# ใส่ private key

vercel env add GOOGLE_SPREADSHEET_ID
# ใส่ spreadsheet ID
```

### Deploy Production

```bash
vercel --prod
```

---

## 🔧 หลังจาก Deploy

### ตรวจสอบ Deployment

1. ไปที่ Vercel Dashboard
2. เลือก Project
3. ดู **Deployments** tab
4. คลิก deployment ล่าสุด
5. ดู **Functions** tab เพื่อดู API routes

### ทดสอบ API

เปิดเบราว์เซอร์และทดสอบ:
- `https://your-app.vercel.app/api/health`
- `https://your-app.vercel.app/api/stock`
- `https://your-app.vercel.app/api/menu`

---

## 🐛 แก้ไขปัญหา

### Build Error

**ปัญหา:** Build ไม่สำเร็จ
**แก้ไข:**
1. ตรวจสอบ logs ใน Vercel Dashboard
2. ตรวจสอบว่า Root Directory เป็น `ui`
3. ตรวจสอบ Build Command

### Environment Variables ไม่ทำงาน

**ปัญหา:** API ไม่สามารถเชื่อมต่อ Google Sheets
**แก้ไข:**
1. ตรวจสอบว่า Environment Variables ถูกตั้งค่าแล้ว
2. **Redeploy** หลังจากเพิ่ม environment variables
3. ตรวจสอบว่า `GOOGLE_PRIVATE_KEY` มี `\n` สำหรับ newline

### API Routes ไม่ทำงาน

**ปัญหา:** API endpoints คืนค่า error
**แก้ไข:**
1. ตรวจสอบ logs ใน Vercel Dashboard → Functions
2. ตรวจสอบ environment variables
3. ทดสอบ API endpoint โดยตรง

---

## ✅ Checklist

- [ ] สร้าง Vercel account
- [ ] Import Git Repository
- [ ] ตั้งค่า Root Directory เป็น `ui`
- [ ] เพิ่ม Environment Variables:
  - [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL
  - [ ] GOOGLE_PRIVATE_KEY
  - [ ] GOOGLE_SPREADSHEET_ID
- [ ] Deploy
- [ ] ทดสอบเว็บไซต์
- [ ] ทดสอบ API endpoints

---

## 🎉 เสร็จแล้ว!

เมื่อ deploy สำเร็จ คุณจะได้:
- **Frontend & API:** `https://your-app.vercel.app`
- **Health Check:** `https://your-app.vercel.app/api/health`
- **Stock API:** `https://your-app.vercel.app/api/stock`

---

## 📝 หมายเหตุสำคัญ

1. **File Uploads:**
   - ไฟล์จะถูกเก็บใน `/tmp` (ephemeral storage)
   - ไฟล์จะหายไปเมื่อ serverless function หมดอายุ
   - สำหรับ production แนะนำให้ใช้ Vercel Blob Storage

2. **Environment Variables:**
   - ต้องตั้งค่าใน Vercel Dashboard
   - **Redeploy** หลังจากเพิ่ม environment variables

3. **Google Sheets:**
   - ต้องแชร์ Google Sheet ให้ Service Account แล้ว
   - ตรวจสอบว่า Google Sheets API เปิดใช้งานแล้ว

---

**🚀 พร้อม deploy แล้ว!**

