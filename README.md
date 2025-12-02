# Restaurant Management System

ระบบจัดการร้านอาหารที่ใช้ Google Sheets เป็นฐานข้อมูล

## 🚀 Features

1. **จัดการสต็อก** - เพิ่ม/แก้ไข วัตถุดิบและสินค้า
2. **จัดการเมนู** - เพิ่ม/แก้ไข รายการอาหารพร้อมวัตถุดิบ
3. **แดชบอร์ด** - ดูยอดขาย ต้นทุน และรายงาน
4. **รายการอาหาร** - เลือกรายการอาหารที่ขาย

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Google Cloud Project with Sheets API enabled
- Google Service Account credentials

## 🔧 Quick Setup

**สำหรับอีเมล:** `nattapong05032535@gmail.com`

### วิธีที่ 1: ใช้ Helper Script (แนะนำ - ง่ายที่สุด)

```bash
# ติดตั้ง dependencies
chmod +x setup.sh
./setup.sh

# ตั้งค่า Google Sheets (ใช้ JSON key file)
chmod +x scripts/setup-google-sheets.sh
./scripts/setup-google-sheets.sh ~/Downloads/restaurant-management-xxxxx.json

# Initialize Google Sheets
cd api && pnpm run create-sheets
```

### วิธีที่ 2: ใช้ Setup Script แบบอัตโนมัติ

```bash
chmod +x setup.sh
./setup.sh
```

หรือใช้ Makefile:

```bash
make setup
```

### วิธีที่ 3: ตั้งค่าด้วยตนเอง

1. **ตั้งค่า Google Sheets**
   - ดูรายละเอียดใน `SETUP_GOOGLE_SHEETS.md` (คู่มือละเอียดสำหรับอีเมล nattapong05032535@gmail.com)
   - หรือ `QUICK_SETUP.md` (คู่มือเร็ว)
   - หรือ `QUICK_START.md` (คู่มือทั่วไป)

2. **Initialize Google Sheets**
   ```bash
   cd api
   pnpm install  # หรือ npm install
   pnpm run create-sheets
   ```

3. **ตรวจสอบการตั้งค่า**
   ```bash
   cd api
   pnpm run check-setup
   ```

4. **รันแอปพลิเคชัน**

   **ใช้ Docker:**
   ```bash
   docker-compose up --build
   ```

   **หรือรันแบบ Development:**
   ```bash
   # ใช้ Makefile
   make dev

   # หรือรันแยก
   cd api && pnpm run dev
   cd ui && pnpm run dev
   ```

## 📚 Documentation

- **`SETUP_GOOGLE_SHEETS.md`** - ⭐ คู่มือตั้งค่า Google Sheets แบบละเอียด (สำหรับอีเมล nattapong05032535@gmail.com)
- **`QUICK_SETUP.md`** - คู่มือติดตั้งแบบเร็ว
- **`QUICK_START.md`** - คู่มือเริ่มต้นใช้งานแบบเร็ว
- **`SETUP.md`** - คู่มือการตั้งค่าแบบละเอียด
- **`env.template`** - ตัวอย่างไฟล์ .env พร้อมคำอธิบาย

## 📁 Project Structure

```
restaurant-managent/
├── api/                # Express backend
│   ├── src/
│   │   ├── config/     # Google Sheets configuration
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
├── ui/                 # Next.js frontend
│   ├── app/            # Pages
│   ├── components/
│   ├── lib/            # API client
│   └── package.json
├── docker-compose.yml
└── .env
```

## 🌐 URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📝 API Endpoints

### Stock
- `GET /api/stock` - ดึงข้อมูลสต็อกทั้งหมด
- `POST /api/stock` - เพิ่มสต็อก
- `PUT /api/stock/:id` - แก้ไขสต็อก
- `DELETE /api/stock/:id` - ลบสต็อก

### Menu
- `GET /api/menu` - ดึงข้อมูลเมนูทั้งหมด
- `POST /api/menu` - เพิ่มเมนู
- `PUT /api/menu/:id` - แก้ไขเมนู
- `DELETE /api/menu/:id` - ลบเมนู

### Order
- `GET /api/order` - ดึงข้อมูลคำสั่งซื้อทั้งหมด
- `POST /api/order` - สร้างคำสั่งซื้อ
- `GET /api/order/dashboard` - ดึงข้อมูลแดชบอร์ด

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, TailwindCSS
- **Backend:** Express.js, Node.js, TypeScript
- **Database:** Google Sheets
- **Infrastructure:** Docker, Docker Compose

## 🛠️ Available Scripts

### Setup Scripts
- `npm run create-sheets` (ใน api/) - สร้างและ initialize Google Sheets
- `npm run check-setup` (ใน api/) - ตรวจสอบการตั้งค่า
- `./setup.sh` - Setup script แบบอัตโนมัติ

### Development
- `make dev` - รัน development mode ด้วย Docker
- `make check` - ตรวจสอบการตั้งค่า
- `make init-sheets` - Initialize Google Sheets

ดูคำสั่งทั้งหมด: `make help`

