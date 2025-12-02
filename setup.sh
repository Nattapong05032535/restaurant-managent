#!/bin/bash

echo "🚀 Restaurant Management Setup Script"
echo "สำหรับอีเมล: nattapong05032535@gmail.com"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    if [ -f env.template ]; then
        cp env.template .env
        echo "✅ .env file created from env.template"
        echo ""
        echo "⚠️  IMPORTANT: Please configure your Google Sheets credentials in .env file"
        echo ""
        echo "📖 Quick setup options:"
        echo "   1. Use helper script: ./scripts/setup-google-sheets.sh <json-file-path>"
        echo "   2. Manual setup: See SETUP_GOOGLE_SHEETS.md for detailed instructions"
        echo ""
        echo "Required values:"
        echo "   - GOOGLE_SERVICE_ACCOUNT_EMAIL"
        echo "   - GOOGLE_PRIVATE_KEY"
        echo "   - GOOGLE_SPREADSHEET_ID"
        echo ""
        read -p "Press Enter after you've configured .env file (or Ctrl+C to exit and run helper script)..."
    else
        echo "📝 Creating basic .env file..."
        cat > .env << EOF
# Google Sheets API Configuration
# สำหรับอีเมล: nattapong05032535@gmail.com
# ดูคู่มือ: SETUP_GOOGLE_SHEETS.md

GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SPREADSHEET_ID=

# API Configuration
PORT=3001

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
        echo "✅ Basic .env file created. Please fill in your credentials."
        echo "📖 See SETUP_GOOGLE_SHEETS.md for detailed setup instructions"
    fi
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
fi

# Install backend dependencies
if [ -d "api" ]; then
    echo "Installing backend dependencies..."
    cd api
    if [ ! -d "node_modules" ]; then
        pnpm install
        echo "✅ Backend dependencies installed"
    else
        echo "✅ Backend dependencies already installed"
    fi
    cd ..
fi

# Install frontend dependencies
if [ -d "ui" ]; then
    echo "Installing frontend dependencies..."
    cd ui
    if [ ! -d "node_modules" ]; then
        pnpm install
        echo "✅ Frontend dependencies installed"
    else
        echo "✅ Frontend dependencies already installed"
    fi
    cd ..
fi

echo ""
echo "🔧 Setting up Google Sheets..."
echo ""

# Check if credentials are set
if grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=" .env && ! grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=$" .env; then
    echo "Attempting to initialize Google Sheets..."
    cd api
    pnpm run create-sheets || echo "⚠️  Could not initialize sheets. Please check your credentials."
    cd ..
else
    echo "⚠️  Google Sheets credentials not set. Skipping sheet initialization."
    echo ""
    echo "📖 Please follow these steps:"
    echo "   1. Read the setup guide: SETUP_GOOGLE_SHEETS.md"
    echo "   2. Or use helper script: ./scripts/setup-google-sheets.sh <json-file-path>"
    echo "   3. After setting up credentials, run: cd api && pnpm run create-sheets"
    echo ""
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Make sure .env file has correct Google Sheets credentials"
echo "   2. If not done yet, initialize sheets: cd api && pnpm run create-sheets"
echo "   3. Verify setup: cd api && pnpm run check-setup"
echo "   4. Start the application:"
echo "      - Using Docker: docker-compose up --build"
echo "      - Or manually:"
echo "        * Backend: cd api && pnpm run dev"
echo "        * Frontend: cd ui && pnpm run dev"
echo ""
echo "🌐 Access the app at: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Google Sheets Setup: SETUP_GOOGLE_SHEETS.md"
echo "   - Full Setup Guide: SETUP.md"
echo ""

