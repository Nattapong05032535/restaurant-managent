#!/bin/bash

echo "🔍 กำลังตรวจสอบสถานะโปรเจกต์..."
echo ""

# Check API dependencies
echo "=== 📦 API Dependencies ==="
if [ -d "api/node_modules" ]; then
    echo "✅ ติดตั้งแล้ว"
else
    echo "❌ ยังไม่ได้ติดตั้ง"
    echo "   รัน: cd api && pnpm install"
fi
echo ""

# Check UI dependencies
echo "=== 📦 UI Dependencies ==="
if [ -d "ui/node_modules" ]; then
    echo "✅ ติดตั้งแล้ว"
else
    echo "❌ ยังไม่ได้ติดตั้ง"
    echo "   รัน: cd ui && pnpm install"
fi
echo ""

# Check .env file
echo "=== ⚙️  ไฟล์ .env ==="
if [ -f ".env" ]; then
    echo "✅ มีไฟล์ .env"
    
    # Check if required variables are set
    if grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL" .env && \
       grep -q "GOOGLE_PRIVATE_KEY" .env && \
       grep -q "GOOGLE_SPREADSHEET_ID" .env; then
        echo "✅ มี environment variables ที่จำเป็น"
        
        # Check if values are not empty/template values
        if ! grep -q "your-service-account@" .env && \
           ! grep -q "your-spreadsheet-id-here" .env; then
            echo "✅ ค่า environment variables ดูเหมือนจะตั้งค่าแล้ว"
        else
            echo "⚠️  ค่า environment variables อาจยังไม่ได้ตั้งค่า (พบ template values)"
        fi
    else
        echo "❌ ขาด environment variables ที่จำเป็น"
    fi
else
    echo "❌ ไม่มีไฟล์ .env"
    echo "   รัน: cp env.template .env"
fi
echo ""

# Check Google Sheets setup (only if dependencies installed)
echo "=== 📊 Google Sheets Setup ==="
if [ -d "api/node_modules" ]; then
    echo "กำลังตรวจสอบการเชื่อมต่อ..."
    cd api
    if command -v pnpm &> /dev/null; then
        pnpm run check-setup 2>&1 | head -20
    elif command -v npm &> /dev/null; then
        npm run check-setup 2>&1 | head -20
    else
        echo "⚠️  ไม่พบ pnpm หรือ npm"
    fi
    cd ..
else
    echo "⚠️  ต้องติดตั้ง dependencies ก่อน (รัน: cd api && pnpm install)"
fi
echo ""

echo "=== 📝 สรุป ==="
echo "ดูรายละเอียดเพิ่มเติมใน: STATUS_CHECK.md"
