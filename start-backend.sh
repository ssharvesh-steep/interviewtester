#!/bin/bash

echo "🔥 Starting Backend Execution Service..."
echo ""

cd "$(dirname "$0")/execution-service"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install express cors dotenv axios
    echo ""
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "PORT=8000" > .env
fi

echo "✅ Starting server on port 8000..."
echo "📡 Health check: http://localhost:8000/health"
echo ""

node server.js
