# Scripts Directory

สคริปต์ช่วยเหลือสำหรับการตั้งค่าและใช้งานโปรเจกต์

## 📁 ไฟล์ในโฟลเดอร์นี้

### 1. `setup-google-sheets.sh`
Helper script สำหรับตั้งค่า Google Sheets อัตโนมัติ

**การใช้งาน:**
```bash
chmod +x scripts/setup-google-sheets.sh
./scripts/setup-google-sheets.sh <path-to-json-file>
```

**ตัวอย่าง:**
```bash
./scripts/setup-google-sheets.sh ~/Downloads/restaurant-management-xxxxx.json
```

**สิ่งที่ script ทำ:**
- อ่านข้อมูลจาก JSON key file
- แปลง private key เป็น format ที่ถูกต้อง
- ถาม Spreadsheet ID
- สร้างไฟล์ `.env` อัตโนมัติ

---

### 2. `convert-private-key.js`
Helper script สำหรับแปลง private key จาก JSON format เป็น .env format

**การใช้งาน:**
```bash
node scripts/convert-private-key.js <path-to-json-file>
```

**ตัวอย่าง:**
```bash
node scripts/convert-private-key.js ~/Downloads/restaurant-management-xxxxx.json
```

**สิ่งที่ script ทำ:**
- อ่าน JSON key file
- แปลง private key format
- แสดงค่าที่พร้อมใช้ในไฟล์ `.env`

---

## 📖 ดูรายละเอียดเพิ่มเติม

- **คู่มือตั้งค่า Google Sheets:** `../SETUP_GOOGLE_SHEETS.md`
- **Quick Setup Guide:** `../QUICK_SETUP.md`
- **Setup Guide:** `../SETUP.md`

