# 🔧 แก้ไขปัญหา: Vercel ดึงข้อมูลจาก Google Sheets ไม่ได้

## ❌ ปัญหา

- ✅ บนเครื่อง local ดึงข้อมูลจาก Google Sheets ได้
- ❌ บน Vercel ดึงข้อมูลจาก Google Sheets ไม่ได้

## ✅ สาเหตุ

**Environment Variables บน Vercel ไม่ถูกตั้งค่าหรือตั้งค่าไม่ถูกต้อง**

---

## 🔍 วิธีตรวจสอบ

### 1. ตรวจสอบ Environment Variables บน Vercel

1. ไปที่ **Vercel Dashboard**: https://vercel.com
2. เลือก Project: `restaurant-managent`
3. ไปที่ **Settings** → **Environment Variables**
4. ตรวจสอบว่ามี 3 ตัวนี้หรือไม่:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SPREADSHEET_ID`

### 2. ใช้ API Test Endpoint

เปิด URL นี้ในเบราว์เซอร์:
```
https://your-app.vercel.app/api/test-env
```

**ควรเห็น response แบบนี้ (ถ้าตั้งค่าถูกต้อง):**
```json
{
  "hasServiceAccountEmail": true,
  "hasPrivateKey": true,
  "hasSpreadsheetId": true,
  "serviceAccountEmail": "restaurant-api-service@restaurant...",
  "spreadsheetId": "1_3pbkw3F7oayXKyY518n9LBKe6..."
}
```

**ถ้าเห็น `false` หรือ `"Not set"`** → ต้องตั้งค่า Environment Variables

---

## 🔧 วิธีแก้ไข

### ขั้นตอนที่ 1: เพิ่ม Environment Variables ใน Vercel

1. ไปที่ **Vercel Dashboard** → Project → **Settings** → **Environment Variables**
2. คลิก **"Add New"**

#### ตัวที่ 1: GOOGLE_SERVICE_ACCOUNT_EMAIL
- **Name:** `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value:** `restaurant-api-service@restaurant-management-480003.iam.gserviceaccount.com`
- **Environment:** เลือก **Production**, **Preview**, **Development** ทั้งหมด ✅
- คลิก **"Save"**

#### ตัวที่ 2: GOOGLE_PRIVATE_KEY ⚠️ **สำคัญมาก!**
- **Name:** `GOOGLE_PRIVATE_KEY`
- **Value:** คัดลอกทั้งนี้ (รวม `"..."` และ `\n`):

```
"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC62NWJNFXVT+yY\nQIkq7IKmIIGVI8vHR1NdD6ddjl+cCZZykbtq61q52ZM24HvyDab4L38tpzVJ6ZXB\n6A6simoo7QT6n1+l+GPS+R1zxu2iMf9z68o2bQdEZQGFsNulUBilFDBmCutWq96S\nAWb1fumJiVKXZnTzIvrtXJWfNnjQp22iezebT9mQXA9tTCExVvcdyiQfM+JzcOcw\nnO4WpppAztgGH6fcYr1IWShXw03tfShEFQuGbQXXK/86+i2XfATcnhauW8k0O9m4\nBFtCMTbzHE5fVEayDKKSoCEjAfRnjJBXqekjeBr5sgDmyMt/w3xxHZWKqY+NH/r+\nMYlmntjlAgMBAAECggEANzVfrwlQPVW+1mPnQ9AbcIPVViB8E1dfafV4ofuyA3SP\nyC2IX7jIF3cS+RmOdgCTr+y02uP3qm3DCscLIu9JG+ug137k77D7qfhiu/Vw/MZi\nMTngB4HirlJcB0kxNWD7zzcub9BVJkhlXOXeKrbDwZhaV5L2Bmt1ElKTgTZCr3/v\n3yU0pLjBxZIHPhU5Gi8IkopTfkpMzZafqrw6gPT6h1swgjImGx0VKSWIiF+s4H5b\nrR45M5T639UzX3gpJhFgRztnH6l2EUdq8sxnrezNyvmhmd3Ng7ShDgrJtNNevDWC\nXB5JKTnQPfz6r980wOUZxikrGFAztmylIWXeU4ixhwKBgQDi44+msH7XCGGH3qxx\n1EcXFB24mi+Hyl4SfDpLwObs1F44M9nWoxO6iZRovaFXphjWJwRF1OEIvjKOKSuZ\ni6n1E+CZdftdNk4RmfwTzT0yAYmyjpUpZhH/V3nvDW4hAZl6Dd2cBRTBmEqpq7X0\nJJ1j6j5+E81yQAd9TyHInoiOEwKBgQDS0gxwyW40BCM1y9A08mn3bgIw/Hg7wN7i\nx31a9saoZvNiwmgUZ59l+NQZ5ynKpoHVEmRCZPeZwFAhKkvzAm8ZJ96RUgrTUsnk\nkGT8Mn8DIPloKiYFYa87yCFNCdtaJjtyOb2H3lgDa2vrT4ooRKTBSm/J3Nyn+KyY\nOqpb2QB8JwKBgQC2UNF/yldCB1QHz+CV31P4sYtoaU1EOlL5W6Wkda+aItRLKS8k\nkAosXJ1KxQY+3hMbEmMWkgb59Yu+PEryqQ27B2v1JJ8Fubtl3Wx3pPZFloLFXllx\n2Lkhi3NJqmsSTqy7LSUkV9jj77IfQQGG2101imcI/HScF+NsyAeHpAxqzQKBgQCC\nc5lhHTOFGl5TRofSi4JIqhjPCRq5FtKUj46g//zTbckC/nr6zVgT+FH+qUzx6fCC\n0Tua3fFcgWTT8OFIQORQM5yEXbj3JM5rEXJ7oB955yiNbS9Tuyt8mY0Jp6TE9s1o\nFBSUg2AA1bLUy8YYvskYFiBwT6t2gOkD1aFe7jtflwKBgHL/cl1VdqbqaWvNKkxy\nf9B8/2zdekrowI+taeCfUNto/HlRiqO2oCcO/SxzDzR6Z16D2geTujm292uKVKH+\nLkWwKC1SpNrwN5WJgIOIHWW9eGniZJukF4U0bmjwJsd9t1iQdgs07DIuJycb/o3W\nysE5Et5P7+/gB/A/344+6I22\n-----END PRIVATE KEY-----\n"
```

**⚠️ ระวัง:**
- ต้องคัดลอกทั้งบรรทัด
- ต้องมี `"..."` ครอบคลุมทั้งค่า
- ต้องมี `\n` สำหรับ newline

- **Environment:** เลือก **Production**, **Preview**, **Development** ทั้งหมด ✅
- คลิก **"Save"**

#### ตัวที่ 3: GOOGLE_SPREADSHEET_ID
- **Name:** `GOOGLE_SPREADSHEET_ID`
- **Value:** `1_3pbkw3F7oayXKyY518n9LBKe6T-lXcBiXid5c_MNJk`
- **Environment:** เลือก **Production**, **Preview**, **Development** ทั้งหมด ✅
- คลิก **"Save"**

---

### ขั้นตอนที่ 2: Redeploy (สำคัญมาก!)

⚠️ **หลังจากเพิ่ม Environment Variables แล้ว ต้อง Redeploy**

1. ไปที่ **Vercel Dashboard** → Project → **Deployments**
2. คลิก **"..."** (สามจุด) ของ deployment ล่าสุด
3. เลือก **"Redeploy"**
4. รอให้ deploy เสร็จ (2-5 นาที)

---

### ขั้นตอนที่ 3: ตรวจสอบอีกครั้ง

1. เปิด: `https://your-app.vercel.app/api/test-env`
   - ควรเห็น `"hasServiceAccountEmail": true` และอื่นๆ เป็น `true`

2. เปิด: `https://your-app.vercel.app/api/stock`
   - ควรดึงข้อมูลจาก Google Sheets ได้

3. เปิดหน้าเว็บ: `https://your-app.vercel.app/stock`
   - ควรเห็นข้อมูล Stock จาก Google Sheets

---

## ⚠️ ปัญหาที่พบบ่อย

### 1. GOOGLE_PRIVATE_KEY ผิดรูปแบบ

**ปัญหาที่เจอ:**
- ไม่มี `"..."` ครอบคลุม
- ไม่มี `\n` สำหรับ newline
- Copy-paste แล้ว format ผิด

**วิธีแก้:**
- คัดลอกจาก `VERCEL_ENV_VARS.md` ทั้งบรรทัด
- ตรวจสอบว่ามี `"..."` และ `\n` ทั้งหมด

### 2. Environment ไม่ได้เลือก Production

**ปัญหาที่เจอ:**
- เลือกแค่ Development
- ไม่ได้เลือก Production

**วิธีแก้:**
- เลือก **Production**, **Preview**, **Development** ทั้งหมด ✅

### 3. ยังไม่ได้ Redeploy

**ปัญหาที่เจอ:**
- เพิ่ม Environment Variables แล้ว
- แต่ยังไม่ได้ Redeploy

**วิธีแก้:**
- ต้อง **Redeploy** หลังจากเพิ่ม Environment Variables

---

## ✅ Checklist

- [ ] ตรวจสอบ Environment Variables ใน Vercel Dashboard
- [ ] เพิ่ม `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- [ ] เพิ่ม `GOOGLE_PRIVATE_KEY` (มี `"..."` และ `\n`)
- [ ] เพิ่ม `GOOGLE_SPREADSHEET_ID`
- [ ] เลือก Environment: Production, Preview, Development ทั้งหมด
- [ ] **Redeploy** หลังจากเพิ่ม Environment Variables
- [ ] ทดสอบด้วย `/api/test-env`
- [ ] ทดสอบดึงข้อมูลจาก `/api/stock`

---

## 🎉 เมื่อแก้ไขสำเร็จ

คุณจะสามารถ:
- ✅ ดึงข้อมูลจาก Google Sheets บน Vercel ได้
- ✅ เพิ่ม/แก้ไข/ลบข้อมูลใน Google Sheets ได้
- ✅ ใช้งานระบบได้เหมือนบนเครื่อง local

---

**📚 ดูรายละเอียดเพิ่มเติม:**
- `VERCEL_ENV_VARS.md` - Environment Variables ทั้งหมด

