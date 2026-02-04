import { executeCode as apiExecuteCode, submitCode as apiSubmitCode } from './api';

/**
 * Execute code with public test cases only (RUN workflow)
 * @param {string} language - Programming language
 * @param {string} code - Source code
 * @param {Array} testCases - Public test cases
 * @param {number} timeLimit - Time limit in seconds
 * @param {number} memoryLimit - Memory limit in KB
 * @returns {Promise<Object>} Execution result
 */
export const executeCode = async (language, code, testCases, timeLimit = 2, memoryLimit = 256000) => {
    try {
        const result = await apiExecuteCode(language, code, testCases, timeLimit, memoryLimit);
        return result;
    } catch (error) {
        console.error('Code execution error:', error);
        return {
            verdict: 'error',
            error: error.message || 'Execution failed',
            testCases: []
        };
    }
};

/**
 * Submit code with all test cases (SUBMIT workflow)
 * @param {string} language - Programming language
 * @param {string} code - Source code
 * @param {Array} testCases - All test cases (public + hidden)
 * @param {number} problemId - Problem ID
 * @param {number} timeLimit - Time limit in seconds
 * @param {number} memoryLimit - Memory limit in KB
 * @returns {Promise<Object>} Submission result
 */
export const submitCode = async (language, code, testCases, problemId, timeLimit = 2, memoryLimit = 256000) => {
    try {
        const result = await apiSubmitCode(language, code, testCases, problemId, timeLimit, memoryLimit);
        return result;
    } catch (error) {
        console.error('Code submission error:', error);
        return {
            verdict: 'Runtime Error',
            test_cases_passed: 0,
            total_test_cases: testCases.length,
            error_message: error.message || 'Submission failed',
            public_results: []
        };
    }
};
