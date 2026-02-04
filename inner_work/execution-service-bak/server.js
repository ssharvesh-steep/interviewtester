const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const executionController = require('./controllers/executionController');
const compilerController = require('./controllers/compilerController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Execution service is running' });
});

app.post('/execute', executionController.executeCode);
app.post('/submit', executionController.submitCode);
app.post('/compile', compilerController.compileCode);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Execution service running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
});
