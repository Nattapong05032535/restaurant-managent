# คู่มือการตั้งค่า (Setup Guide)

## 1. ตั้งค่า Google Sheets API

### ขั้นตอนที่ 1: สร้าง Google Cloud Project
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่
3. เปิดใช้งาน **Google Sheets API**:
   - ไปที่ "APIs & Services" > "Library"
   - ค้นหา "Google Sheets API"
   - คลิก "Enable"

### ขั้นตอนที่ 2: สร้าง Service Account
1. ไปที่ "APIs & Services" > "Credentials"
2. คลิก "Create Credentials" > "Service Account"
3. ตั้งชื่อ Service Account (เช่น `restaurant-api`)
4. คลิก "Done"
5. คลิกที่ Service Account ที่สร้างขึ้น
6. ไปที่แท็บ "Keys"
7. คลิก "Add Key" > "Create new key"
8. เลือก "JSON" และดาวน์โหลดไฟล์

### ขั้นตอนที่ 3: สร้าง Google Sheet
1. สร้าง Google Sheet ใหม่
2. ตั้งชื่อ Sheet เป็น:
   - `Stock`
   - `Menu`
   - `Orders`

3. ใน Sheet "Stock" เพิ่ม header row (แถวแรก):
   ```
   ชื่อสินค้า | จำนวน | ราคาต่อจำนวน | ผู้เพิ่มสต็อก | วันที่สร้าง
   ```

4. ใน Sheet "Menu" เพิ่ม header row:
   ```
   ชื่ออาหาร | วัตถุดิบ | ราคาขาย | วันที่สร้าง
   ```
   (คอลัมน์ "วัตถุดิบ" จะเก็บ JSON array)

5. ใน Sheet "Orders" เพิ่ม header row:
   ```
   รายการอาหาร | ยอดขาย | ต้นทุน | กำไร | วันที่สร้าง
   ```
   (คอลัมน์ "รายการอาหาร" จะเก็บ JSON array)

6. แชร์ Sheet ให้ Service Account:
   - คลิก "Share" ใน Google Sheet
   - ใส่ email ของ Service Account (จากไฟล์ JSON ที่ดาวน์โหลด: `client_email`)
   - ให้สิทธิ์ "Editor"
   - คลิก "Send"

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables
1. เปิดไฟล์ JSON ที่ดาวน์โหลดจาก Service Account
2. คัดลอกค่า `client_email` และ `private_key`
3. สร้างไฟล์ `.env` ในโฟลเดอร์ root:
   ```bash
   cp .env.example .env
   ```

4. แก้ไข `.env`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-from-url
   PORT=3001
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **หมายเหตุ:** 
   - `GOOGLE_SPREADSHEET_ID` หาได้จาก URL ของ Google Sheet:
     `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - `GOOGLE_PRIVATE_KEY` ต้องใส่ทั้ง private key รวมถึง `-----BEGIN PRIVATE KEY-----` และ `-----END PRIVATE KEY-----`
   - ต้องใช้ `\n` สำหรับ newline ใน private key

## 2. รันแอปพลิเคชัน

### วิธีที่ 1: ใช้ Docker Compose (แนะนำ)
```bash
docker-compose up --build
```

### วิธีที่ 2: รันแบบ Development (ไม่ใช้ Docker)

**Backend:**
```bash
cd api
npm install
npm run dev
```

**Frontend (ใน terminal อื่น):**
```bash
cd ui
npm install
npm run dev
```

## 3. เข้าถึงแอปพลิเคชัน

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 4. การใช้งาน

1. **จัดการสต็อก** (`/stock`):
   - เพิ่มวัตถุดิบพร้อมจำนวน (กรัม) และราคา
   - ระบุผู้เพิ่มสต็อก

2. **จัดการเมนู** (`/menu`):
   - เพิ่มรายการอาหาร
   - เลือกวัตถุดิบที่ใช้และจำนวน
   - ตั้งราคาขายต่อจาน

3. **รายการอาหาร** (`/order`):
   - เลือกรายการอาหารที่ขาย
   - ระบบจะคำนวณต้นทุนและกำไรอัตโนมัติ

4. **แดชบอร์ด** (`/dashboard`):
   - ดูยอดขายรวม
   - ดูต้นทุนรวม
   - ดูรายงานแต่ละรายการ

## 5. Troubleshooting

### ปัญหา: ไม่สามารถเชื่อมต่อ Google Sheets ได้
- ตรวจสอบว่า Service Account มีสิทธิ์ Editor ใน Google Sheet
- ตรวจสอบว่า Google Sheets API เปิดใช้งานแล้ว
- ตรวจสอบว่า environment variables ถูกต้อง

### ปัญหา: API ไม่ทำงาน
- ตรวจสอบว่า backend รันที่ port 3001
- ตรวจสอบ logs: `docker-compose logs api`

### ปัญหา: Frontend ไม่แสดงข้อมูล
- ตรวจสอบว่า `NEXT_PUBLIC_API_URL` ถูกต้อง
- ตรวจสอบ CORS settings ใน backend

