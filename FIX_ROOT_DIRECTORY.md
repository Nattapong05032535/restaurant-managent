# 🔧 แก้ไข Error: Invalid request: should NOT have additional property `rootDirectory`

## ❌ ปัญหา

เมื่อ deploy ไป Vercel เกิด error:
```
Invalid request: should NOT have additional property `rootDirectory`
```

## ✅ สาเหตุ

Vercel **ไม่รองรับ** `rootDirectory` property ในไฟล์ `vercel.json`

สำหรับ monorepo ที่มี subdirectory (`ui/`):
- **ต้องตั้งค่า `rootDirectory` ใน Vercel Dashboard เท่านั้น** ❌ ไม่ใช่ใน `vercel.json`
- หรือย้าย `vercel.json` ไปไว้ใน `ui/` directory

## 🔧 วิธีแก้ไข

### วิธีที่ 1: ตั้งค่า Root Directory ใน Dashboard (แนะนำ)

✅ **แก้ไขแล้ว:** ลบ `rootDirectory` ออกจาก `vercel.json`

ตอนนี้ `vercel.json` มีแค่:
```json
{
  "buildCommand": "cd ui && pnpm install && pnpm build",
  "devCommand": "cd ui && pnpm dev",
  "installCommand": "cd ui && pnpm install",
  "framework": null
}
```

**ขั้นตอน Deploy:**
1. ไปที่ Vercel Dashboard
2. Import Git Repository
3. **ตั้งค่า Root Directory:** คลิก "Edit" และเปลี่ยนเป็น `ui` ⚠️ **สำคัญมาก!**
4. Build Command, Install Command จะถูก auto-fill จาก `vercel.json`
5. Deploy

---

### วิธีที่ 2: ย้าย vercel.json ไปไว้ใน ui/ (Alternative)

ถ้าต้องการใช้วิธีนี้:

1. ย้าย `vercel.json` ไปไว้ใน `ui/` directory:
   ```bash
   mv vercel.json ui/vercel.json
   ```

2. แก้ไข `ui/vercel.json` ให้ลบ `cd ui &&` ออก:
   ```json
   {
     "buildCommand": "pnpm install && pnpm build",
     "devCommand": "pnpm dev",
     "installCommand": "pnpm install",
     "framework": null
   }
   ```

3. Deploy จาก Dashboard โดยตั้ง Root Directory เป็น `ui`

---

## ✅ แก้ไขแล้ว

- ✅ ลบ `rootDirectory` ออกจาก `vercel.json`
- ✅ อัพเดทคู่มือให้ชัดเจน

---

## 🚀 Deploy อีกครั้ง

ตอนนี้ควร deploy ได้แล้ว:

1. ไปที่ Vercel Dashboard
2. Import Project (หรือ Redeploy)
3. **ตั้งค่า Root Directory เป็น `ui`** ใน Dashboard
4. Deploy

---

**🎉 พร้อม Deploy แล้ว!**

