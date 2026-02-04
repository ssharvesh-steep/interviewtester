/**
 * API client for backend execution service
 */

const EXECUTION_API_URL = import.meta.env.VITE_EXECUTION_API_URL || 'http://localhost:8000';

/**
 * Execute code with public test cases only (RUN workflow)
 * @param {string} language - Programming language
 * @param {string} sourceCode - Source code to execute
 * @param {Array} testCases - Array of test cases with {input, expected_output, is_public}
 * @param {number} timeLimit - Time limit in seconds
 * @param {number} memoryLimit - Memory limit in KB
 * @returns {Promise<Object>} Execution result
 */
export const executeCode = async (language, sourceCode, testCases, timeLimit = 2, memoryLimit = 256000) => {
    try {
        const response = await fetch(`${EXECUTION_API_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language,
                source_code: sourceCode,
                test_cases: testCases,
                time_limit: timeLimit,
                memory_limit: memoryLimit
            })
        });

        if (!response.ok) {
            throw new Error(`Execution failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Execution API error:', error);
        throw error;
    }
};

/**
 * Submit code with all test cases (SUBMIT workflow)
 * @param {string} language - Programming language
 * @param {string} sourceCode - Source code to submit
 * @param {Array} testCases - Array of all test cases
 * @param {number} problemId - Problem ID
 * @param {number} timeLimit - Time limit in seconds
 * @param {number} memoryLimit - Memory limit in KB
 * @returns {Promise<Object>} Submission result
 */
export const submitCode = async (language, sourceCode, testCases, problemId, timeLimit = 2, memoryLimit = 256000) => {
    try {
        const response = await fetch(`${EXECUTION_API_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language,
                source_code: sourceCode,
                test_cases: testCases,
                problem_id: problemId,
                time_limit: timeLimit,
                memory_limit: memoryLimit
            })
        });

        if (!response.ok) {
            throw new Error(`Submission failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Submission API error:', error);
        throw error;
    }
};

/**
 * Check if execution service is available
 * @returns {Promise<boolean>}
 */
export const checkServiceHealth = async () => {
    try {
        const response = await fetch(`${EXECUTION_API_URL}/health`);
        return response.ok;
    } catch (error) {
        console.error('Execution service health check failed:', error);
        return false;
    }
};
