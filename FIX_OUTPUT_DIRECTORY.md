# 🔧 แก้ไข Error: No Output Directory named "public" found

## ❌ ปัญหา

เมื่อ deploy ไป Vercel เกิด error:
```
Error: No Output Directory named "public" found after the Build completed.
```

## ✅ สาเหตุ

Vercel คาดหวัง directory `public` แต่ Next.js ใช้ `.next` เป็น output directory สำหรับ production build

## 🔧 วิธีแก้ไข

### แก้ไขแล้ว: เพิ่ม `framework` และ `outputDirectory` ใน `vercel.json`

**ก่อน:**
```json
{
  "buildCommand": "npm install && npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": null
}
```

**หลัง:**
```json
{
  "buildCommand": "npm install && npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

---

## 📝 หมายเหตุ

### Framework Detection
- **Next.js** จะ auto-detect แต่ระบุ `"framework": "nextjs"` เพื่อความชัดเจน
- Next.js ใช้ `.next` directory เป็น build output

### Output Directory
- **`.next`** - Next.js build output (สำหรับ production)
- **`public`** - Static files directory (ไม่ใช่ build output)

---

## 🚀 ขั้นตอนต่อไป

1. ✅ Commit และ push การเปลี่ยนแปลง
2. Redeploy บน Vercel
3. Build ควรสำเร็จ!

---

**🎉 แก้ไขแล้ว!**

