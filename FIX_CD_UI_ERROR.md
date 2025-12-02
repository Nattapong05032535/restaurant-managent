# 🔧 แก้ไข Error: `cd: ui: No such file or directory`

## ❌ ปัญหา

เมื่อ deploy ไป Vercel เกิด error:
```
sh: line 1: cd: ui: No such file or directory
Error: Command "cd ui && npm install" exited with 1
```

## ✅ สาเหตุ

**Root Directory ถูกตั้งค่าเป็น `ui` แล้ว** ใน Vercel Dashboard
- เมื่อ Root Directory = `ui` → Vercel จะทำงานจาก `ui/` directory โดยตรง
- แต่ `vercel.json` ยังมี `cd ui` → พยายาม `cd ui` จาก `ui/` directory อีกครั้ง
- ผลลัพธ์: ไม่เจอ directory `ui` เพราะอยู่ใน `ui/` แล้ว!

## 🔧 วิธีแก้ไข

### ✅ แก้ไขแล้ว: ลบ `cd ui` ออกจาก `vercel.json`

**ก่อน:**
```json
{
  "buildCommand": "cd ui && npm install && npm run build",
  "devCommand": "cd ui && npm run dev",
  "installCommand": "cd ui && npm install"
}
```

**หลัง:**
```json
{
  "buildCommand": "npm install && npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

## 📝 หลักการ

### เมื่อ Root Directory = `ui`:
- Vercel จะ `cd ui` ให้อัตโนมัติ
- Commands ใน `vercel.json` จะรันจาก `ui/` directory โดยตรง
- **ไม่ต้อง** `cd ui` ใน commands อีก

### เมื่อ Root Directory = `/` (root):
- ต้อง `cd ui &&` ใน commands ทุกตัว
- เพราะ Vercel เริ่มจาก root directory

---

## 🚀 ขั้นตอนต่อไป

1. ✅ Commit และ push การเปลี่ยนแปลง
2. Redeploy บน Vercel
3. Build ควรสำเร็จ!

---

**🎉 แก้ไขแล้ว!**

