# 🔧 แก้ไข Error: Cannot find module 'tailwindcss'

## ❌ ปัญหา

เมื่อ deploy ไป Vercel เกิด error:
```
Error: Cannot find module 'tailwindcss'
```

## ✅ สาเหตุ

1. **`tailwindcss`, `postcss`, `autoprefixer`** อยู่ใน `devDependencies`
2. บน Vercel production build อาจจะไม่ติดตั้ง devDependencies บางตัว
3. Next.js ต้องการ tailwindcss ตอน build time (ไม่ใช่แค่ development)

## 🔧 วิธีแก้ไข

### ✅ แก้ไขแล้ว: ย้าย TailwindCSS ไป dependencies

**ก่อน:**
```json
"devDependencies": {
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.32",
  "autoprefixer": "^10.4.16"
}
```

**หลัง:**
```json
"dependencies": {
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.32",
  "autoprefixer": "^10.4.16"
}
```

### ✅ แก้ไข vercel.json

**ก่อน:**
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": ".next"
}
```

**หลัง:**
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

**เหตุผล:**
- `installCommand` จะรัน `npm install` อัตโนมัติแล้ว
- ไม่ต้อง `npm install` ซ้ำใน `buildCommand`
- ลบ `outputDirectory` เพราะ Next.js จัดการเอง

---

## 📝 หลักการ

### Dependencies vs DevDependencies

**Dependencies (ต้องใช้ตอน runtime/build):**
- Packages ที่จำเป็นสำหรับ production
- Packages ที่ใช้ตอน build time (เช่น tailwindcss, postcss)
- Next.js ใช้ tailwindcss ตอน build → ต้องอยู่ใน dependencies

**DevDependencies (ใช้แค่ development):**
- TypeScript types (`@types/*`)
- Linting tools (eslint)
- Testing frameworks
- Development-only tools

---

## 🚀 ขั้นตอนต่อไป

1. ✅ Commit และ push การเปลี่ยนแปลง
2. Redeploy บน Vercel
3. Build ควรสำเร็จ!

---

**🎉 แก้ไขแล้ว!**

