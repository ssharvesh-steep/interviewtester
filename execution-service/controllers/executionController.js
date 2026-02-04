const judge0Service = require('../services/judge0Client');

/**
 * Execute code with public test cases only (RUN workflow)
 */
exports.executeCode = async (req, res) => {
    try {
        const { language, source_code, test_cases, time_limit, memory_limit } = req.body;

        if (!language || !source_code || !test_cases) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const results = [];
        let hasError = false;
        let errorMessage = null;

        for (const testCase of test_cases) {
            const result = await judge0Service.execute({
                language,
                source_code,
                stdin: testCase.input,
                expected_output: testCase.expected_output,
                time_limit: time_limit || 2,
                memory_limit: memory_limit || 256000
            });

            if (result.compile_output || result.stderr) {
                hasError = true;
                errorMessage = result.compile_output || result.stderr;
                break;
            }

            const actual = (result.stdout || '').trim();
            const expected = testCase.expected_output.trim();
            const passed = actual === expected;

            results.push({
                input: testCase.input,
                expected: expected,
                actual: actual,
                status: passed ? 'Passed' : 'Failed',
                execution_time: result.time,
                memory_used: result.memory
            });
        }

        if (hasError) {
            return res.json({
                verdict: 'error',
                error: errorMessage,
                testCases: []
            });
        }

        const allPassed = results.every(r => r.status === 'Passed');

        res.json({
            verdict: allPassed ? 'pass' : 'fail',
            testCases: results
        });

    } catch (error) {
        console.error('Execution error:', error);
        res.status(500).json({ error: 'Execution failed', message: error.message });
    }
};

/**
 * Submit code with all test cases (SUBMIT workflow)
 */
exports.submitCode = async (req, res) => {
    try {
        const { language, source_code, test_cases, time_limit, memory_limit } = req.body;

        if (!language || !source_code || !test_cases) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let verdict = 'Accepted';
        let testCasesPassed = 0;
        const totalTestCases = test_cases.length;
        let maxExecutionTime = 0;
        let maxMemoryUsed = 0;
        let errorMessage = null;
        const publicResults = [];

        for (let i = 0; i < test_cases.length; i++) {
            const testCase = test_cases[i];

            const result = await judge0Service.execute({
                language,
                source_code,
                stdin: testCase.input,
                expected_output: testCase.expected_output,
                time_limit: time_limit || 2,
                memory_limit: memory_limit || 256000
            });

            // Track execution metrics
            maxExecutionTime = Math.max(maxExecutionTime, result.time || 0);
            maxMemoryUsed = Math.max(maxMemoryUsed, result.memory || 0);

            // Check for compilation errors
            if (result.compile_output) {
                verdict = 'Compilation Error';
                errorMessage = result.compile_output;
                break;
            }

            // Check for runtime errors
            if (result.stderr && !result.stdout) {
                verdict = 'Runtime Error';
                errorMessage = result.stderr;
                break;
            }

            // Check for time limit exceeded
            if (result.status && result.status.id === 5) {
                verdict = 'Time Limit Exceeded';
                break;
            }

            // Check for memory limit exceeded
            if (result.status && result.status.id === 6) {
                verdict = 'Memory Limit Exceeded';
                break;
            }

            // Compare output
            const actual = (result.stdout || '').trim();
            const expected = testCase.expected_output.trim();
            const passed = actual === expected;

            if (passed) {
                testCasesPassed++;
            } else if (verdict === 'Accepted') {
                verdict = 'Wrong Answer';
            }

            // Only show public test case results
            if (testCase.is_public) {
                publicResults.push({
                    input: testCase.input,
                    expected: expected,
                    actual: actual,
                    status: passed ? 'Passed' : 'Failed'
                });
            }
        }

        res.json({
            verdict,
            test_cases_passed: testCasesPassed,
            total_test_cases: totalTestCases,
            execution_time: Math.round(maxExecutionTime * 1000), // Convert to ms
            memory_used: maxMemoryUsed,
            error_message: errorMessage,
            public_results: publicResults
        });

    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Submission failed', message: error.message });
    }
};
