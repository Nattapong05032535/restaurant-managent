#!/bin/bash

echo "🎯 Preparing Restaurant Management System to be ready to run"
echo "สำหรับอีเมล: nattapong05032535@gmail.com"
echo "=============================================================="
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing all dependencies..."
echo ""
if [ -f "install-all.sh" ]; then
    chmod +x install-all.sh
    ./install-all.sh
else
    echo "Running inline installation..."
    
    # Check if pnpm is installed
    if ! command -v pnpm &> /dev/null; then
        echo "📦 Installing pnpm..."
        npm install -g pnpm
    fi
    
    # Install API dependencies
    if [ -d "api" ] && [ ! -d "api/node_modules" ]; then
        echo "Installing API dependencies..."
        cd api && pnpm install && cd ..
    fi
    
    # Install UI dependencies
    if [ -d "ui" ] && [ ! -d "ui/node_modules" ]; then
        echo "Installing UI dependencies..."
        cd ui && pnpm install && cd ..
    fi
fi

echo ""
echo "🔧 Step 2: Setting up environment..."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    if [ -f "env.template" ]; then
        cp env.template .env
        echo "✅ .env file created from env.template"
    else
        cat > .env << 'EOF'
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
        echo "✅ Basic .env file created"
    fi
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📝 Step 3: Checking setup status..."
echo ""

# Check if credentials are set
if grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=" .env && ! grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=$" .env; then
    echo "✅ Google Sheets credentials found in .env"
    echo ""
    echo "🔧 Step 4: Initializing Google Sheets..."
    cd api
    if [ -d "node_modules" ]; then
        echo "Running create-sheets script..."
        pnpm run create-sheets || echo "⚠️  Could not initialize sheets. Please check your credentials."
    else
        echo "⚠️  Dependencies not installed. Please run ./install-all.sh first"
    fi
    cd ..
else
    echo "⚠️  Google Sheets credentials not set in .env file"
    echo ""
    echo "📖 To complete setup, you need to:"
    echo "   1. Read: SETUP_GOOGLE_SHEETS.md"
    echo "   2. Or use helper script: ./scripts/setup-google-sheets.sh <json-file-path>"
    echo "   3. After setting credentials, run: cd api && pnpm run create-sheets"
fi

echo ""
echo "=============================================================="
echo "✅ Preparation complete!"
echo "=============================================================="
echo ""
echo "📋 Summary:"
echo "   ✓ Dependencies installed"
echo "   ✓ .env file ready"
if grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=" .env && ! grep -q "GOOGLE_SERVICE_ACCOUNT_EMAIL=$" .env; then
    echo "   ✓ Google Sheets credentials configured"
    echo ""
    echo "🚀 Ready to run! Use one of these commands:"
    echo ""
    echo "   Option 1 (Docker - Recommended):"
    echo "   $ docker-compose up --build"
    echo ""
    echo "   Option 2 (Manual):"
    echo "   Terminal 1: cd api && pnpm run dev"
    echo "   Terminal 2: cd ui && pnpm run dev"
else
    echo "   ⚠️  Google Sheets credentials needed"
    echo ""
    echo "📖 Next steps:"
    echo "   1. Configure Google Sheets (see SETUP_GOOGLE_SHEETS.md)"
    echo "   2. Run: cd api && pnpm run create-sheets"
    echo "   3. Then run: docker-compose up --build"
fi
echo ""
echo "🌐 Once running, access at: http://localhost:3000"
echo ""

