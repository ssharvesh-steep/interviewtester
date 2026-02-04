const judge0Service = require('../services/judge0Client');

/**
 * Compile and execute raw code (no test cases)
 */
exports.compileCode = async (req, res) => {
    try {
        const { language, code, input } = req.body;

        if (!language || !code) {
            return res.status(400).json({ error: 'Missing required fields: language and code' });
        }

        // Execute code with stdin
        const result = await judge0Service.executeRaw({
            language,
            source_code: code,
            stdin: input || '',
            time_limit: 5, // 5 seconds max
            memory_limit: 256000 // 256MB
        });

        // Format response
        const response = {
            stdout: result.stdout || '',
            stderr: result.stderr || '',
            compile_error: result.compile_output || null,
            status: result.status?.description || 'Completed',
            time: result.time,
            memory: result.memory
        };

        // If there's an error, prioritize showing it
        if (result.compile_output) {
            response.error = result.compile_output;
        } else if (result.stderr && !result.stdout) {
            response.error = result.stderr;
        }

        res.json(response);

    } catch (error) {
        console.error('Compilation error:', error);
        res.status(500).json({
            error: 'Execution failed',
            message: error.message
        });
    }
};
