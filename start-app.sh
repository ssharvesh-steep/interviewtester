#!/bin/bash

echo "🚀 Starting Interview Tester Application..."
echo ""

# Start execution service in background
echo "📡 Starting execution service on port 8000..."
cd execution-service
node server.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend on port 5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo "   - Backend PID: $BACKEND_PID"
echo "   - Frontend PID: $FRONTEND_PID"
echo ""
echo "📱 Open http://localhost:5173 in your browser"
echo ""
echo "To stop the services, run:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Keep script running
wait
