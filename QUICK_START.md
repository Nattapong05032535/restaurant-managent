# 🚀 Quick Start Guide

## วิธีที่ 1: ใช้ Setup Script (แนะนำ)

```bash
chmod +x setup.sh
./setup.sh
```

Script จะช่วย:
- สร้างไฟล์ `.env`
- ติดตั้ง dependencies
- Initialize Google Sheets (ถ้ามี credentials)

## วิธีที่ 2: ตั้งค่าด้วยตนเอง

### ขั้นตอนที่ 1: ตั้งค่า Google Sheets (5 นาที)

1. **สร้าง Google Sheet ใหม่**
   - ไปที่ https://sheets.google.com
   - สร้าง Spreadsheet ใหม่
   - คัดลอก Spreadsheet ID จาก URL:
     ```
     https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
     ```

2. **สร้าง Service Account**
   - ไปที่ https://console.cloud.google.com
   - สร้างโปรเจกต์ใหม่
   - เปิดใช้งาน Google Sheets API
   - สร้าง Service Account และดาวน์โหลด JSON key
   - เปิดไฟล์ JSON และคัดลอก:
     - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     - `private_key` → `GOOGLE_PRIVATE_KEY`
   - แชร์ Google Sheet ให้ `client_email` ด้วยสิทธิ์ Editor

3. **ตั้งค่า .env**
   ```bash
   cp .env.example .env
   # แก้ไข .env ด้วยข้อมูลจาก Service Account
   ```

### ขั้นตอนที่ 2: Initialize Google Sheets

```bash
cd api
npm install
npm run create-sheets
```

คำสั่งนี้จะ:
- สร้าง Sheets: `Stock`, `Menu`, `Orders` (ถ้ายังไม่มี)
- เพิ่ม header rows ให้อัตโนมัติ

### ขั้นตอนที่ 3: รันแอป

**ใช้ Docker:**
```bash
docker-compose up --build
```

**หรือรันแบบ Development:**
```bash
# Terminal 1 - Backend
cd api
npm run dev

# Terminal 2 - Frontend
cd ui
npm run dev
```

### ขั้นตอนที่ 4: ใช้งาน

เปิดเบราว์เซอร์ไปที่: **http://localhost:3000**

## ✅ Checklist

- [ ] Google Sheet สร้างแล้ว
- [ ] Service Account สร้างแล้ว
- [ ] Google Sheet แชร์ให้ Service Account แล้ว
- [ ] ไฟล์ `.env` ตั้งค่าแล้ว
- [ ] รัน `npm run create-sheets` สำเร็จ
- [ ] แอปพลิเคชันรันได้

## 🆘 ปัญหาที่พบบ่อย

### "Unable to parse range"
→ ตรวจสอบว่า Sheet names ถูกต้อง: `Stock`, `Menu`, `Orders`

### "The caller does not have permission"
→ ตรวจสอบว่าแชร์ Google Sheet ให้ Service Account แล้ว

### "API not enabled"
→ เปิดใช้งาน Google Sheets API ใน Google Cloud Console

### Frontend ไม่แสดงข้อมูล
→ ตรวจสอบว่า Backend รันที่ port 3001 และ `NEXT_PUBLIC_API_URL` ถูกต้อง

## 📞 ต้องการความช่วยเหลือ?

ดูรายละเอียดเพิ่มเติมใน `SETUP.md`

