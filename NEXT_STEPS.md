# ✅ ขั้นตอนต่อไป: Deploy ไป Vercel

## 🎯 สิ่งที่ต้องทำ (เรียงตามลำดับ)

### ขั้นตอนที่ 1: ไปที่ Vercel Dashboard

1. เปิดเบราว์เซอร์ไปที่: **https://vercel.com**
2. **Sign in** หรือ **Sign up** ด้วย GitHub account ของคุณ

---

### ขั้นตอนที่ 2: Import Git Repository

1. คลิกปุ่ม **"+ Add New..."** (มุมขวาบน)
2. เลือก **"Project"**
3. คลิก **"Import Git Repository"**
4. เลือก **GitHub** และ authorize Vercel (ถ้ายังไม่ได้ authorize)
5. ค้นหา repository: **`restaurant-managent`**
   - หรือ paste URL: `https://github.com/Nattapong05032535/restaurant-managent`
6. คลิก **"Import"**

---

### ขั้นตอนที่ 3: ตั้งค่า Project (สำคัญมาก!)

**⚠️ ตั้งค่าตามนี้:**

1. **Project Name:** `restaurant-managent` (หรือชื่ออื่นที่ต้องการ)
2. **Framework Preset:** Next.js (จะ auto-detect อัตโนมัติ)
3. **Root Directory:** 
   - คลิก **"Edit"** ตรง Root Directory
   - เปลี่ยนจาก `/` เป็น **`ui`** ⚠️ **สำคัญมาก!**
   - นี่คือการบอก Vercel ว่าโปรเจกต์ Next.js อยู่ใน folder `ui/`
4. **Build Command:** จะถูก auto-fill จาก `vercel.json` (เว้นว่างไว้ก็ได้)
5. **Output Directory:** `.next` (หรือเว้นว่างไว้)
6. **Install Command:** จะถูก auto-fill จาก `vercel.json` (เว้นว่างไว้ก็ได้)

---

### ขั้นตอนที่ 4: เพิ่ม Environment Variables (สำคัญ!)

**⚠️ ต้องทำก่อน Deploy!**

1. ในหน้า Configure Project ให้เลื่อนลงมา
2. คลิก **"Environment Variables"**
3. เพิ่ม 3 ตัวต่อไปนี้:

   **ตัวที่ 1: GOOGLE_SERVICE_ACCOUNT_EMAIL**
   - Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: `restaurant-api-service@restaurant-management-480003.iam.gserviceaccount.com`
   - Environment: เลือก **Production**, **Preview**, **Development** ทั้งหมด
   - คลิก **"Add"**

   **ตัวที่ 2: GOOGLE_PRIVATE_KEY** ⚠️ **ระวัง!**
   - Name: `GOOGLE_PRIVATE_KEY`
   - Value: คัดลอกทั้งนี้ (รวม `"..."` และ `\n`):
     ```
     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC62NWJNFXVT+yY\nQIkq7IKmIIGVI8vHR1NdD6ddjl+cCZZykbtq61q52ZM24HvyDab4L38tpzVJ6ZXB\n6A6simoo7QT6n1+l+GPS+R1zxu2iMf9z68o2bQdEZQGFsNulUBilFDBmCutWq96S\nAWb1fumJiVKXZnTzIvrtXJWfNnjQp22iezebT9mQXA9tTCExVvcdyiQfM+JzcOcw\nnO4WpppAztgGH6fcYr1IWShXw03tfShEFQuGbQXXK/86+i2XfATcnhauW8k0O9m4\nBFtCMTbzHE5fVEayDKKSoCEjAfRnjJBXqekjeBr5sgDmyMt/w3xxHZWKqY+NH/r+\nMYlmntjlAgMBAAECggEANzVfrwlQPVW+1mPnQ9AbcIPVViB8E1dfafV4ofuyA3SP\nyC2IX7jIF3cS+RmOdgCTr+y02uP3qm3DCscLIu9JG+ug137k77D7qfhiu/Vw/MZi\nMTngB4HirlJcB0kxNWD7zzcub9BVJkhlXOXeKrbDwZhaV5L2Bmt1ElKTgTZCr3/v\n3yU0pLjBxZIHPhU5Gi8IkopTfkpMzZafqrw6gPT6h1swgjImGx0VKSWIiF+s4H5b\nrR45M5T639UzX3gpJhFgRztnH6l2EUdq8sxnrezNyvmhmd3Ng7ShDgrJtNNevDWC\nXB5JKTnQPfz6r980wOUZxikrGFAztmylIWXeU4ixhwKBgQDi44+msH7XCGGH3qxx\n1EcXFB24mi+Hyl4SfDpLwObs1F44M9nWoxO6iZRovaFXphjWJwRF1OEIvjKOKSuZ\ni6n1E+CZdftdNk4RmfwTzT0yAYmyjpUpZhH/V3nvDW4hAZl6Dd2cBRTBmEqpq7X0\nJJ1j6j5+E81yQAd9TyHInoiOEwKBgQDS0gxwyW40BCM1y9A08mn3bgIw/Hg7wN7i\nx31a9saoZvNiwmgUZ59l+NQZ5ynKpoHVEmRCZPeZwFAhKkvzAm8ZJ96RUgrTUsnk\nkGT8Mn8DIPloKiYFYa87yCFNCdtaJjtyOb2H3lgDa2vrT4ooRKTBSm/J3Nyn+KyY\nOqpb2QB8JwKBgQC2UNF/yldCB1QHz+CV31P4sYtoaU1EOlL5W6Wkda+aItRLKS8k\nkAosXJ1KxQY+3hMbEmMWkgb59Yu+PEryqQ27B2v1JJ8Fubtl3Wx3pPZFloLFXllx\n2Lkhi3NJqmsSTqy7LSUkV9jj77IfQQGG2101imcI/HScF+NsyAeHpAxqzQKBgQCC\nc5lhHTOFGl5TRofSi4JIqhjPCRq5FtKUj46g//zTbckC/nr6zVgT+FH+qUzx6fCC\n0Tua3fFcgWTT8OFIQORQM5yEXbj3JM5rEXJ7oB955yiNbS9Tuyt8mY0Jp6TE9s1o\nFBSUg2AA1bLUy8YYvskYFiBwT6t2gOkD1aFe7jtflwKBgHL/cl1VdqbqaWvNKkxy\nf9B8/2zdekrowI+taeCfUNto/HlRiqO2oCcO/SxzDzR6Z16D2geTujm292uKVKH+\nLkWwKC1SpNrwN5WJgIOIHWW9eGniZJukF4U0bmjwJsd9t1iQdgs07DIuJycb/o3W\nysE5Et5P7+/gB/A/344+6I22\n-----END PRIVATE KEY-----\n"
     ```
   - Environment: เลือก **Production**, **Preview**, **Development** ทั้งหมด
   - คลิก **"Add"**

   **ตัวที่ 3: GOOGLE_SPREADSHEET_ID**
   - Name: `GOOGLE_SPREADSHEET_ID`
   - Value: `1_3pbkw3F7oayXKyY518n9LBKe6T-lXcBiXid5c_MNJk`
   - Environment: เลือก **Production**, **Preview**, **Development** ทั้งหมด
   - คลิก **"Add"**

4. ตรวจสอบว่าเพิ่มครบ 3 ตัวแล้ว

---

### ขั้นตอนที่ 5: Deploy!

1. ตรวจสอบอีกครั้งว่า:
   - ✅ Root Directory = `ui`
   - ✅ Environment Variables ครบ 3 ตัว
2. คลิกปุ่ม **"Deploy"**
3. รอให้ build เสร็จ (ประมาณ 2-5 นาที)

---

### ขั้นตอนที่ 6: ตรวจสอบหลังจาก Deploy

1. หลังจาก deploy เสร็จ Vercel จะให้ URL เช่น:
   - `https://restaurant-managent.vercel.app`
   - หรือ `https://restaurant-managent-xxxxx.vercel.app`

2. ทดสอบว่าเว็บทำงาน:
   - เปิด URL ที่ Vercel ให้มา
   - ควรเห็นหน้าเว็บ Restaurant Management

3. ทดสอบ API:
   - เปิด: `https://your-app.vercel.app/api/health`
   - ควรเห็น: `{"status":"ok"}`

4. ทดสอบ Google Sheets:
   - เปิดหน้า Stock หรือ Menu
   - ลองเพิ่มข้อมูล แล้วตรวจสอบใน Google Sheet ว่าบันทึกหรือไม่

---

## ⚠️ ถ้า Deploy แล้ว แต่ Environment Variables ไม่ทำงาน

ถ้าเพิ่ม Environment Variables หลังจาก deploy แล้ว:

1. ไปที่ Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. ตรวจสอบว่าเพิ่มครบแล้ว
3. ไปที่ **Deployments** tab
4. คลิก **"..."** (สามจุด) ของ deployment ล่าสุด
5. เลือก **"Redeploy"**
6. รอให้ redeploy เสร็จ

---

## ✅ Checklist

- [ ] Sign in Vercel ด้วย GitHub
- [ ] Import Git Repository `restaurant-managent`
- [ ] ตั้งค่า Root Directory = `ui`
- [ ] เพิ่ม Environment Variables:
  - [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL
  - [ ] GOOGLE_PRIVATE_KEY
  - [ ] GOOGLE_SPREADSHEET_ID
- [ ] คลิก Deploy
- [ ] ทดสอบเว็บไซต์
- [ ] ทดสอบ API: `/api/health`
- [ ] ทดสอบ Google Sheets connection

---

## 🎉 เสร็จแล้ว!

เมื่อ deploy สำเร็จ คุณจะมี:
- **Frontend:** `https://your-app.vercel.app`
- **API:** `https://your-app.vercel.app/api/*`
- **Google Sheets:** เชื่อมต่ออัตโนมัติ

---

## 📚 เอกสารเพิ่มเติม

- `DEPLOY_TO_VERCEL_NOW.md` - คู่มือแบบละเอียด
- `VERCEL_ENV_VARS.md` - รายละเอียด Environment Variables
- `FIX_ROOT_DIRECTORY.md` - แก้ไขปัญหา rootDirectory

---

**🚀 เริ่ม Deploy ได้เลย!**

