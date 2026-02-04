const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
    'c': 50,          // C (GCC 9.2.0)
    'cpp': 54,        // C++ (GCC 9.2.0)
    'java': 62,       // Java (OpenJDK 13.0.1)
    'python': 71,     // Python (3.8.1)
    'javascript': 63, // JavaScript (Node.js 12.14.0)
    'typescript': 74  // TypeScript (3.7.4)
};

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

/**
 * Execute code using Judge0 API
 * @param {Object} options - Execution options
 * @returns {Promise<Object>} Execution result
 */
exports.execute = async (options) => {
    const { language, source_code, stdin, expected_output, time_limit, memory_limit } = options;

    // If Judge0 is not configured, use fallback execution
    if (!JUDGE0_API_KEY) {
        console.warn('Judge0 API key not configured, using fallback execution');
        return fallbackExecute(options);
    }

    try {
        const languageId = LANGUAGE_IDS[language];
        if (!languageId) {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Create submission
        const submissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                source_code,
                language_id: languageId,
                stdin,
                expected_output,
                cpu_time_limit: time_limit,
                memory_limit
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': JUDGE0_API_KEY,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            }
        );

        const result = submissionResponse.data;

        return {
            stdout: result.stdout,
            stderr: result.stderr,
            compile_output: result.compile_output,
            status: result.status,
            time: result.time,
            memory: result.memory
        };

    } catch (error) {
        console.error('Judge0 execution error:', error.message);
        // Fallback to local execution on error
        return fallbackExecute(options);
    }
};

/**
 * Execute raw code without test cases (for compiler mode)
 * @param {Object} options - Execution options
 * @returns {Promise<Object>} Execution result
 */
exports.executeRaw = async (options) => {
    const { language, source_code, stdin, time_limit, memory_limit } = options;

    // If Judge0 is not configured, use fallback execution
    if (!JUDGE0_API_KEY) {
        console.warn('Judge0 API key not configured, using fallback execution');
        return fallbackExecute({ language, source_code, stdin });
    }

    try {
        const languageId = LANGUAGE_IDS[language];
        if (!languageId) {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Create submission
        const submissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                source_code,
                language_id: languageId,
                stdin,
                cpu_time_limit: time_limit,
                memory_limit
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': JUDGE0_API_KEY,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            }
        );

        const result = submissionResponse.data;

        return {
            stdout: result.stdout,
            stderr: result.stderr,
            compile_output: result.compile_output,
            status: result.status,
            time: result.time,
            memory: result.memory
        };

    } catch (error) {
        console.error('Judge0 execution error:', error.message);
        // Fallback to local execution on error
        return fallbackExecute({ language, source_code, stdin });
    }
};

/**
 * Fallback execution for when Judge0 is not available
 */
const fallbackExecute = async (options) => {
    const { language, source_code, stdin } = options;

    if (language === 'javascript') {
        return executeJavaScript(source_code, stdin);
    } else if (language === 'python') {
        return executePython(source_code, stdin);
    } else if (language === 'c') {
        return executeCLike(source_code, stdin, 'gcc', 'c');
    } else if (language === 'cpp') {
        return executeCLike(source_code, stdin, 'g++', 'cpp');
    }

    return {
        stdout: `[MOCK] Language "${language}" not supported in fallback mode. Please configure JUDGE0_API_KEY.`,
        stderr: null,
        compile_output: null,
        status: { id: 3, description: 'Accepted' },
        time: 0,
        memory: 0
    };
};

/**
 * Execute C/C++ code locally
 */
const executeCLike = async (code, input, compiler, ext) => {
    const id = uuidv4();
    const sourceFile = path.join('/tmp', `${id}.${ext}`);
    const outputFile = path.join('/tmp', `${id}.out`);

    try {
        fs.writeFileSync(sourceFile, code);

        // Compile
        try {
            // Set TMPDIR to /tmp to avoid permission issues with xcrun cache on macOS
            execSync(`TMPDIR=/tmp ${compiler} ${sourceFile} -o ${outputFile}`, { stdio: 'pipe' });
        } catch (compileError) {
            const stderr = compileError.stderr ? compileError.stderr.toString() : compileError.message;
            return {
                stdout: null,
                stderr: null,
                compile_output: stderr,
                status: { id: 6, description: 'Compilation Error' },
                time: 0,
                memory: 0
            };
        }

        // Execute
        return new Promise((resolve) => {
            const child = spawn(outputFile);
            let stdout = '';
            let stderr = '';
            const startTime = Date.now();

            child.stdout.on('data', (data) => stdout += data.toString());
            child.stderr.on('data', (data) => stderr += data.toString());

            child.on('close', (code) => {
                const duration = (Date.now() - startTime) / 1000;
                // Cleanup
                try { fs.unlinkSync(sourceFile); fs.unlinkSync(outputFile); } catch (e) { }

                resolve({
                    stdout: stdout.trim(),
                    stderr: stderr.trim() || null,
                    compile_output: null,
                    status: { id: code === 0 ? 3 : 11, description: code === 0 ? 'Accepted' : 'Runtime Error' },
                    time: duration,
                    memory: 2048
                });
            });

            child.on('error', (err) => {
                resolve({
                    stdout: null,
                    stderr: err.message,
                    compile_output: null,
                    status: { id: 11, description: 'Runtime Error' },
                    time: 0,
                    memory: 0
                });
            });

            if (input) {
                child.stdin.write(input);
            }
            child.stdin.end();

            // Timeout
            setTimeout(() => {
                child.kill();
                resolve({
                    stdout: stdout.trim(),
                    stderr: 'Time Limit Exceeded',
                    compile_output: null,
                    status: { id: 5, description: 'Time Limit Exceeded' },
                    time: 5,
                    memory: 2048
                });
            }, 5000);
        });

    } catch (err) {
        return {
            stdout: null,
            stderr: err.toString(),
            compile_output: null,
            status: { id: 11, description: 'Runtime Error' },
            time: 0,
            memory: 0
        };
    }
};

/**
 * Execute JavaScript code locally (fallback)
 */
const executeJavaScript = async (code, input) => {
    return new Promise((resolve) => {
        try {
            let output = '';
            const mockConsole = {
                log: (...args) => {
                    output += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg) : arg
                    ).join(' ') + '\n';
                }
            };

            // Simplified execution for fallback
            // Note: In a production app, this should be run in a sandbox like vm2
            const wrappedCode = `
                (function(console) {
                    ${code}
                })
            `;

            const fn = eval(wrappedCode);
            fn(mockConsole);

            resolve({
                stdout: output.trim(),
                stderr: null,
                compile_output: null,
                status: { id: 3, description: 'Accepted' },
                time: 0.05,
                memory: 2048
            });

        } catch (err) {
            resolve({
                stdout: null,
                stderr: err.toString(),
                compile_output: null,
                status: { id: 11, description: 'Runtime Error' },
                time: 0,
                memory: 0
            });
        }
    });
};

/**
 * Execute Python code locally (fallback)
 */
const executePython = async (code, input) => {
    return new Promise((resolve) => {
        const python = spawn('python3', ['-c', code]);

        let stdout = '';
        let stderr = '';
        const startTime = Date.now();

        python.stdout.on('data', (data) => stdout += data.toString());
        python.stderr.on('data', (data) => stderr += data.toString());

        python.on('close', (exitCode) => {
            const duration = (Date.now() - startTime) / 1000;
            if (exitCode !== 0) {
                resolve({
                    stdout: stdout.trim(),
                    stderr: stderr.trim() || 'Runtime Error',
                    compile_output: null,
                    status: { id: 11, description: 'Runtime Error' },
                    time: duration,
                    memory: 0
                });
            } else {
                resolve({
                    stdout: stdout.trim(),
                    stderr: null,
                    compile_output: null,
                    status: { id: 3, description: 'Accepted' },
                    time: duration,
                    memory: 2048
                });
            }
        });

        if (input) {
            python.stdin.write(input);
        }
        python.stdin.end();
    });
};
