# 🚀 Quick Start Guide

## Start Both Frontend and Backend

### Single Command (Recommended)
```bash
cd ~/interview-tester
./start-all.sh
```

This will:
- ✅ Install all dependencies
- ✅ Start backend on port 8000
- ✅ Start frontend on port 5173
- ✅ Show live logs from both services

---

## Manual Start (Two Terminals)

### Terminal 1 - Backend
```bash
cd ~/interview-tester/execution-service
npm install
node server.js
```

### Terminal 2 - Frontend
```bash
cd ~/interview-tester
npm run dev
```

---

## Stop Services

### Stop All
```bash
lsof -ti:5173,8000 | xargs kill -9
```

### Or use Ctrl+C in the terminal where services are running

---

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend Health Check**: http://localhost:8000/health

---

## Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 5173 and 8000
lsof -ti:5173 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

### View Logs
```bash
# If using start-all.sh
tail -f ~/interview-tester/backend.log
tail -f ~/interview-tester/frontend.log
```

### Clean Restart
```bash
cd ~/interview-tester
rm -rf node_modules execution-service/node_modules
npm install
cd execution-service && npm install && cd ..
./start-all.sh
```
