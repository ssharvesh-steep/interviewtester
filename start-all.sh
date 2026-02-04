#!/bin/bash

echo "🚀 Starting Interview Tester Application..."
echo "=========================================="
echo ""

# Kill any existing processes on ports 5173 and 8000
echo "🧹 Cleaning up existing processes..."
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:8000 | xargs kill -9 2>/dev/null
sleep 1

# Navigate to project directory
cd "$(dirname "$0")"

# Install backend dependencies if needed
if [ ! -d "execution-service/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd execution-service
    npm install
    cd ..
    echo ""
fi

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

# Create .env for backend if it doesn't exist
if [ ! -f "execution-service/.env" ]; then
    echo "PORT=8000" > execution-service/.env
fi

# Start backend in background
echo "🔥 Starting Backend (port 8000)..."
cd execution-service
node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 2

# Check if backend started
if lsof -ti:8000 > /dev/null; then
    echo "✅ Backend running on http://localhost:8000"
else
    echo "❌ Backend failed to start. Check backend.log"
    cat backend.log
    exit 1
fi

# Start frontend in background
echo "🎨 Starting Frontend (port 5173)..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 3

# Check if frontend started
if lsof -ti:5173 > /dev/null; then
    echo "✅ Frontend running on http://localhost:5173"
else
    echo "❌ Frontend failed to start. Check frontend.log"
    cat frontend.log
    exit 1
fi

echo ""
echo "=========================================="
echo "✨ Application Started Successfully!"
echo "=========================================="
echo ""
echo "📱 Frontend:  http://localhost:5173"
echo "🔧 Backend:   http://localhost:8000"
echo ""
echo "📊 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop both services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   or press Ctrl+C and run: lsof -ti:5173,8000 | xargs kill -9"
echo ""
echo "=========================================="

# Keep script running and show logs
echo "Press Ctrl+C to stop all services..."
echo ""
tail -f frontend.log backend.log
