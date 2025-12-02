#!/bin/bash

echo "🚀 Starting Restaurant Management System"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Use memory storage (no Google Sheets needed)
USE_MEMORY_STORAGE=true

# API Configuration
PORT=3001

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
    echo "✅ .env file created with memory storage mode"
fi

# Add USE_MEMORY_STORAGE if not present
if ! grep -q "USE_MEMORY_STORAGE" .env; then
    echo "USE_MEMORY_STORAGE=true" >> .env
    echo "✅ Enabled memory storage mode"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install backend dependencies
if [ ! -d "api/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd api
    pnpm install || npm install
    cd ..
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

# Install frontend dependencies
if [ ! -d "ui/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd ui
    pnpm install || npm install
    cd ..
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🎉 Setup complete! Starting servers..."
echo ""
echo "📝 Note: Running in MEMORY STORAGE mode (no Google Sheets needed)"
echo "   Data will be stored in memory and reset when server restarts"
echo ""
echo "🌐 Access the app at: http://localhost:3000"
echo "🔧 API running at: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start backend
cd api
pnpm run dev || npm run dev &
API_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd ../ui
pnpm run dev || npm run dev &
UI_PID=$!

# Wait for user interrupt
trap "kill $API_PID $UI_PID 2>/dev/null; exit" INT TERM

wait

