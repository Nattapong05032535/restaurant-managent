#!/bin/bash

echo "🚀 Installing all dependencies for Restaurant Management System"
echo "สำหรับอีเมล: nattapong05032535@gmail.com"
echo "================================================================"
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm globally..."
    npm install -g pnpm
    echo "✅ pnpm installed"
else
    echo "✅ pnpm already installed: $(which pnpm)"
fi

echo ""
echo "📦 Installing backend dependencies..."
echo ""

# Install backend dependencies
if [ -d "api" ]; then
    cd api
    if [ ! -d "node_modules" ]; then
        echo "Installing API dependencies (this may take a few minutes)..."
        pnpm install
        echo "✅ Backend dependencies installed"
    else
        echo "✅ Backend dependencies already installed (skipping)"
    fi
    cd ..
else
    echo "❌ Error: api directory not found"
    exit 1
fi

echo ""
echo "📦 Installing frontend dependencies..."
echo ""

# Install frontend dependencies
if [ -d "ui" ]; then
    cd ui
    if [ ! -d "node_modules" ]; then
        echo "Installing UI dependencies (this may take a few minutes)..."
        pnpm install
        echo "✅ Frontend dependencies installed"
    else
        echo "✅ Frontend dependencies already installed (skipping)"
    fi
    cd ..
else
    echo "❌ Error: ui directory not found"
    exit 1
fi

echo ""
echo "✅ All dependencies installed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Configure Google Sheets credentials in .env file"
echo "   2. Run: cd api && pnpm run create-sheets"
echo "   3. Run: docker-compose up --build"
echo ""

