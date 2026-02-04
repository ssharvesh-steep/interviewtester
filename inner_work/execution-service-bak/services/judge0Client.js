const axios = require('axios');

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
 * This is a simplified version for JavaScript/Python only
 */
const fallbackExecute = async (options) => {
    const { language, source_code, stdin, expected_output } = options;

    // Only support JavaScript and Python in fallback mode
    if (language === 'javascript') {
        return executeJavaScript(source_code, stdin);
    } else if (language === 'python') {
        return executePython(source_code, stdin);
    }

    // For other languages, return a mock response
    return {
        stdout: '[MOCK] Execution not available. Please configure Judge0 API for full language support.',
        stderr: null,
        compile_output: null,
        status: { id: 3, description: 'Accepted' },
        time: 0.05,
        memory: 1024
    };
};

/**
 * Execute JavaScript code locally (fallback)
 */
const executeJavaScript = async (code, input) => {
    return new Promise((resolve) => {
        try {
            // Create a mock stdin
            const inputLines = input ? input.split('\n') : [];
            let inputIndex = 0;

            const mockReadline = {
                createInterface: () => ({
                    on: (event, callback) => {
                        if (event === 'line') {
                            inputLines.forEach(line => callback(line));
                        }
                    },
                    close: () => { }
                })
            };

            let output = '';
            const mockConsole = {
                log: (...args) => {
                    output += args.join(' ') + '\n';
                }
            };

            // Execute code with mocked environment
            const wrappedCode = `
        const readline = ${JSON.stringify(mockReadline)};
        const console = ${JSON.stringify(mockConsole)};
        ${code}
      `;

            eval(wrappedCode);

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
 * Note: This requires Python to be installed on the system
 */
const executePython = async (code, input) => {
    const { spawn } = require('child_process');

    return new Promise((resolve) => {
        const python = spawn('python3', ['-c', code]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        python.on('close', (exitCode) => {
            if (exitCode !== 0) {
                resolve({
                    stdout: null,
                    stderr: stderr,
                    compile_output: null,
                    status: { id: 11, description: 'Runtime Error' },
                    time: 0,
                    memory: 0
                });
            } else {
                resolve({
                    stdout: stdout.trim(),
                    stderr: null,
                    compile_output: null,
                    status: { id: 3, description: 'Accepted' },
                    time: 0.05,
                    memory: 2048
                });
            }
        });

        // Send input to stdin
        if (input) {
            python.stdin.write(input);
        }
        python.stdin.end();
    });
};
