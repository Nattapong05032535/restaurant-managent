#!/bin/bash

# 🚀 Script สำหรับ Deploy ไป Vercel

echo "🚀 เริ่ม Deploy ไป Vercel..."
echo ""

# ตรวจสอบว่า Vercel CLI ติดตั้งแล้วหรือยัง
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI ยังไม่ได้ติดตั้ง"
    echo "📦 กำลังติดตั้ง Vercel CLI..."
    npm i -g vercel
    echo ""
fi

# Login
echo "🔐 Login Vercel..."
vercel login

echo ""
echo "📦 เริ่ม Deploy..."
echo "⚠️  เมื่อถาม Directory ให้ตอบ: ui"
echo ""

# Deploy
vercel

echo ""
echo "✅ Deploy เสร็จแล้ว!"
echo ""
echo "⚠️  อย่าลืมเพิ่ม Environment Variables ใน Vercel Dashboard:"
echo "   1. ไปที่ Vercel Dashboard → Project → Settings → Environment Variables"
echo "   2. เพิ่ม:"
echo "      - GOOGLE_SERVICE_ACCOUNT_EMAIL"
echo "      - GOOGLE_PRIVATE_KEY"
echo "      - GOOGLE_SPREADSHEET_ID"
echo "   3. Redeploy หลังจากเพิ่ม environment variables"
echo ""

