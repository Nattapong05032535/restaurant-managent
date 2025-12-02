#!/bin/bash

echo "🚀 Preparing Restaurant Management System to Run"
echo "=================================================="
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
echo ""

if [ ! -d "api/node_modules" ]; then
    echo "Installing API dependencies..."
    cd api
    pnpm install || npm install
    cd ..
    echo "✅ API dependencies installed"
else
    echo "✅ API dependencies already installed"
fi

if [ ! -d "ui/node_modules" ]; then
    echo "Installing UI dependencies..."
    cd ui
    pnpm install || npm install
    cd ..
    echo "✅ UI dependencies installed"
else
    echo "✅ UI dependencies already installed"
fi

echo ""
echo "🔧 Step 2: Initializing Google Sheets..."
echo ""

# Check if credentials are set
if grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=" .env && ! grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=$" .env; then
    echo "✅ Google Sheets credentials found"
    cd api
    if [ -d "node_modules" ]; then
        echo "Creating Google Sheets (Stock, Menu, Orders)..."
        pnpm run create-sheets || npm run create-sheets
        echo ""
        echo "Checking setup..."
        pnpm run check-setup || npm run check-setup
    else
        echo "❌ Dependencies not installed yet"
    fi
    cd ..
else
    echo "⚠️  Google Sheets credentials not configured"
fi

echo ""
echo "=================================================="
echo "✅ Preparation complete!"
echo "=================================================="
echo ""
echo "🚀 Now you can run the application:"
echo ""
echo "   Option 1 (Docker - Recommended):"
echo "   $ docker-compose up --build"
echo ""
echo "   Option 2 (Manual):"
echo "   Terminal 1: cd api && pnpm run dev"
echo "   Terminal 2: cd ui && pnpm run dev"
echo ""
echo "🌐 Access at: http://localhost:3000"
echo ""

