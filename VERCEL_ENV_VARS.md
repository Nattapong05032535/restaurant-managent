# 🔑 Environment Variables สำหรับ Vercel

คัดลอกข้อมูลเหล่านี้ไปตั้งค่าใน Vercel Dashboard → Settings → Environment Variables

---

## 📋 Environment Variables ที่ต้องเพิ่ม

### 1. GOOGLE_SERVICE_ACCOUNT_EMAIL
```
restaurant-api-service@restaurant-management-480003.iam.gserviceaccount.com
```

### 2. GOOGLE_PRIVATE_KEY
```
"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC62NWJNFXVT+yY\nQIkq7IKmIIGVI8vHR1NdD6ddjl+cCZZykbtq61q52ZM24HvyDab4L38tpzVJ6ZXB\n6A6simoo7QT6n1+l+GPS+R1zxu2iMf9z68o2bQdEZQGFsNulUBilFDBmCutWq96S\nAWb1fumJiVKXZnTzIvrtXJWfNnjQp22iezebT9mQXA9tTCExVvcdyiQfM+JzcOcw\nnO4WpppAztgGH6fcYr1IWShXw03tfShEFQuGbQXXK/86+i2XfATcnhauW8k0O9m4\nBFtCMTbzHE5fVEayDKKSoCEjAfRnjJBXqekjeBr5sgDmyMt/w3xxHZWKqY+NH/r+\nMYlmntjlAgMBAAECggEANzVfrwlQPVW+1mPnQ9AbcIPVViB8E1dfafV4ofuyA3SP\nyC2IX7jIF3cS+RmOdgCTr+y02uP3qm3DCscLIu9JG+ug137k77D7qfhiu/Vw/MZi\nMTngB4HirlJcB0kxNWD7zzcub9BVJkhlXOXeKrbDwZhaV5L2Bmt1ElKTgTZCr3/v\n3yU0pLjBxZIHPhU5Gi8IkopTfkpMzZafqrw6gPT6h1swgjImGx0VKSWIiF+s4H5b\nrR45M5T639UzX3gpJhFgRztnH6l2EUdq8sxnrezNyvmhmd3Ng7ShDgrJtNNevDWC\nXB5JKTnQPfz6r980wOUZxikrGFAztmylIWXeU4ixhwKBgQDi44+msH7XCGGH3qxx\n1EcXFB24mi+Hyl4SfDpLwObs1F44M9nWoxO6iZRovaFXphjWJwRF1OEIvjKOKSuZ\ni6n1E+CZdftdNk4RmfwTzT0yAYmyjpUpZhH/V3nvDW4hAZl6Dd2cBRTBmEqpq7X0\nJJ1j6j5+E81yQAd9TyHInoiOEwKBgQDS0gxwyW40BCM1y9A08mn3bgIw/Hg7wN7i\nx31a9saoZvNiwmgUZ59l+NQZ5ynKpoHVEmRCZPeZwFAhKkvzAm8ZJ96RUgrTUsnk\nkGT8Mn8DIPloKiYFYa87yCFNCdtaJjtyOb2H3lgDa2vrT4ooRKTBSm/J3Nyn+KyY\nOqpb2QB8JwKBgQC2UNF/yldCB1QHz+CV31P4sYtoaU1EOlL5W6Wkda+aItRLKS8k\nkAosXJ1KxQY+3hMbEmMWkgb59Yu+PEryqQ27B2v1JJ8Fubtl3Wx3pPZFloLFXllx\n2Lkhi3NJqmsSTqy7LSUkV9jj77IfQQGG2101imcI/HScF+NsyAeHpAxqzQKBgQCC\nc5lhHTOFGl5TRofSi4JIqhjPCRq5FtKUj46g//zTbckC/nr6zVgT+FH+qUzx6fCC\n0Tua3fFcgWTT8OFIQORQM5yEXbj3JM5rEXJ7oB955yiNbS9Tuyt8mY0Jp6TE9s1o\nFBSUg2AA1bLUy8YYvskYFiBwT6t2gOkD1aFe7jtflwKBgHL/cl1VdqbqaWvNKkxy\nf9B8/2zdekrowI+taeCfUNto/HlRiqO2oCcO/SxzDzR6Z16D2geTujm292uKVKH+\nLkWwKC1SpNrwN5WJgIOIHWW9eGniZJukF4U0bmjwJsd9t1iQdgs07DIuJycb/o3W\nysE5Et5P7+/gB/A/344+6I22\n-----END PRIVATE KEY-----\n"
```

**⚠️ สำคัญ:** ต้องคัดลอกทั้งบรรทัด รวมถึง `"..."` และ `\n` ด้วย

### 3. GOOGLE_SPREADSHEET_ID
```
1_3pbkw3F7oayXKyY518n9LBKe6T-lXcBiXid5c_MNJk
```

---

## 📝 วิธีการตั้งค่าใน Vercel

1. ไปที่ **Vercel Dashboard** → เลือก Project → **Settings** → **Environment Variables**
2. คลิก **"Add New"**
3. ใส่:
   - **Name:** `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - **Value:** คัดลอกจากด้านบน
   - **Environment:** เลือก **Production**, **Preview**, **Development** ทั้งหมด
4. คลิก **"Save"**
5. ทำซ้ำสำหรับอีก 2 ตัว
6. **สำคัญ:** หลังจากเพิ่ม environment variables แล้ว ต้อง **Redeploy**

---

## ✅ ตรวจสอบ

หลังจาก Redeploy แล้ว:
1. เปิด URL ของเว็บไซต์: `https://your-app.vercel.app/api/health`
2. ควรเห็น response: `{"status":"ok"}`
3. ทดสอบ Stock API: `https://your-app.vercel.app/api/stock`
4. ควรดึงข้อมูลจาก Google Sheets ได้

---

**🎉 เสร็จแล้ว!**

