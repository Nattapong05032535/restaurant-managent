# 🔧 แก้ไข Error: ERR_PNPM_META_FETCH_FAIL บน Vercel

## ❌ ปัญหา

เมื่อ deploy ไป Vercel เกิด error:
```
ERR_PNPM_META_FETCH_FAIL  GET https://registry.npmjs.org/typescript: Value of "this" must be of type URLSearchParams
WARN  Ignoring not compatible lockfile at /vercel/path0/ui/pnpm-lock.yaml
```

## ✅ สาเหตุ

1. **pnpm lockfile ไม่ compatible** กับ Vercel build environment
2. **pnpm version บน Vercel** อาจไม่ตรงกับ local
3. **Network error** ระหว่าง fetch packages

## 🔧 วิธีแก้ไข

### แก้ไขแล้ว: เปลี่ยนจาก pnpm เป็น npm

✅ **แก้ไข `vercel.json`** ให้ใช้ **npm** แทน **pnpm**:

```json
{
  "buildCommand": "cd ui && npm install && npm run build",
  "devCommand": "cd ui && npm run dev",
  "installCommand": "cd ui && npm install",
  "framework": null
}
```

---

## 🚀 ขั้นตอนต่อไป

### 1. ✅ Commit และ Push แล้ว

การเปลี่ยนแปลงถูก push ไป Git แล้ว

### 2. Redeploy บน Vercel

**วิธีที่ 1: Auto-deploy (ถ้าเชื่อมต่อแล้ว)**
- Vercel จะ auto-deploy จาก commit ใหม่อัตโนมัติ
- รอสักครู่ (ประมาณ 1-2 นาที)
- ตรวจสอบใน Vercel Dashboard

**วิธีที่ 2: Manual Redeploy**
1. ไปที่ Vercel Dashboard
2. เลือก Project → **Deployments** tab
3. คลิก **"..."** (สามจุด) ของ deployment ล่าสุด
4. เลือก **"Redeploy"**
5. รอ build เสร็จ

---

## ✅ ตรวจสอบผลลัพธ์

หลังจาก redeploy:

1. **ดู Build Logs:**
   - ควรเห็น: `npm install` แทน `pnpm install`
   - ไม่ควรมี error `ERR_PNPM_META_FETCH_FAIL`

2. **ทดสอบเว็บไซต์:**
   - เปิด URL: `https://your-app.vercel.app`
   - ควรโหลดหน้าเว็บได้ปกติ

3. **ทดสอบ API:**
   - `https://your-app.vercel.app/api/health`
   - ควรเห็น: `{"status":"ok"}`

---

## 📝 หมายเหตุ

- ✅ **Local development:** ยังใช้ `pnpm` ได้ตามปกติ
- ✅ **Vercel deployment:** ใช้ `npm` (แก้ไขใน `vercel.json`)
- ✅ **ไม่จำเป็นต้องเปลี่ยน:** `package.json` หรือ `pnpm-lock.yaml`

---

## 🎉 เสร็จแล้ว!

ตอนนี้ควร deploy สำเร็จแล้ว 🚀

