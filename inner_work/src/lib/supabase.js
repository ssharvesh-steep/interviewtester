import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all active problems
 * @param {string} difficulty - Optional filter by difficulty
 * @returns {Promise<Array>} List of problems
 */
export const getProblems = async (difficulty = null) => {
    let query = supabase
        .from('problems')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

    if (difficulty) {
        query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

/**
 * Fetch a single problem by ID
 * @param {number} problemId
 * @returns {Promise<Object>} Problem details
 */
export const getProblemById = async (problemId) => {
    const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', problemId)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Fetch public test cases for a problem
 * @param {number} problemId
 * @returns {Promise<Array>} Public test cases
 */
export const getPublicTestCases = async (problemId) => {
    const { data, error } = await supabase
        .from('test_cases')
        .select('*')
        .eq('problem_id', problemId)
        .eq('is_public', true)
        .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * Fetch all test cases for a problem (admin only)
 * @param {number} problemId
 * @returns {Promise<Array>} All test cases
 */
export const getAllTestCases = async (problemId) => {
    const { data, error } = await supabase
        .from('test_cases')
        .select('*')
        .eq('problem_id', problemId)
        .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
};

/**
 * Fetch code templates for a problem
 * @param {number} problemId
 * @returns {Promise<Object>} Templates by language
 */
export const getCodeTemplates = async (problemId) => {
    const { data, error } = await supabase
        .from('code_templates')
        .select('*')
        .eq('problem_id', problemId);

    if (error) throw error;

    // Convert array to object keyed by language
    const templates = {};
    (data || []).forEach(template => {
        templates[template.language] = template.template_code;
    });

    return templates;
};

/**
 * Save a submission to the database
 * @param {Object} submission - Submission data
 * @returns {Promise<Object>} Saved submission
 */
export const saveSubmission = async (submission) => {
    const { data, error } = await supabase
        .from('submissions')
        .insert([submission])
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get user's submissions
 * @param {string} username
 * @param {number} problemId - Optional filter by problem
 * @returns {Promise<Array>} List of submissions
 */
export const getUserSubmissions = async (username, problemId = null) => {
    let query = supabase
        .from('submissions')
        .select('*')
        .eq('username', username)
        .order('submitted_at', { ascending: false });

    if (problemId) {
        query = query.eq('problem_id', problemId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

/**
 * Get or create user statistics
 * @param {string} username
 * @returns {Promise<Object>} User stats
 */
export const getUserStats = async (username) => {
    const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('username', username)
        .single();

    if (error) {
        // If stats don't exist, create them
        if (error.code === 'PGRST116') {
            const { data: newStats, error: insertError } = await supabase
                .from('user_stats')
                .insert([{ username }])
                .select()
                .single();

            if (insertError) throw insertError;
            return newStats;
        }
        throw error;
    }

    return data;
};

/**
 * Update user statistics after a submission
 * @param {string} username
 * @param {string} verdict
 * @param {string} difficulty
 * @param {string} language
 * @param {number} problemId
 * @returns {Promise<Object>} Updated stats
 */
export const updateUserStats = async (username, verdict, difficulty, language, problemId) => {
    // Get current stats
    const stats = await getUserStats(username);

    // Update stats
    const updates = {
        total_submissions: stats.total_submissions + 1,
        updated_at: new Date().toISOString()
    };

    if (verdict === 'Accepted') {
        updates.accepted_submissions = stats.accepted_submissions + 1;

        // Check if this is a new problem solved
        const previousSubmissions = await getUserSubmissions(username, problemId);
        const previouslyAccepted = previousSubmissions.some(s => s.verdict === 'Accepted' && s.id !== stats.id);

        if (!previouslyAccepted) {
            updates.problems_solved = stats.problems_solved + 1;

            // Update difficulty-specific count
            if (difficulty === 'Easy') {
                updates.easy_solved = stats.easy_solved + 1;
            } else if (difficulty === 'Medium') {
                updates.medium_solved = stats.medium_solved + 1;
            } else if (difficulty === 'Hard') {
                updates.hard_solved = stats.hard_solved + 1;
            }
        }

        // Update language usage
        const languagesUsed = stats.languages_used || {};
        languagesUsed[language] = (languagesUsed[language] || 0) + 1;
        updates.languages_used = languagesUsed;
    }

    const { data, error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('username', username)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Create a new problem (admin only)
 * @param {Object} problem - Problem data
 * @returns {Promise<Object>} Created problem
 */
export const createProblem = async (problem) => {
    const { data, error } = await supabase
        .from('problems')
        .insert([problem])
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Update a problem (admin only)
 * @param {number} problemId
 * @param {Object} updates
 * @returns {Promise<Object>} Updated problem
 */
export const updateProblem = async (problemId, updates) => {
    const { data, error } = await supabase
        .from('problems')
        .update(updates)
        .eq('id', problemId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Delete a problem (admin only)
 * @param {number} problemId
 * @returns {Promise<void>}
 */
export const deleteProblem = async (problemId) => {
    const { error } = await supabase
        .from('problems')
        .delete()
        .eq('id', problemId);

    if (error) throw error;
};

/**
 * Add test cases to a problem (admin only)
 * @param {Array} testCases - Array of test case objects
 * @returns {Promise<Array>} Created test cases
 */
export const addTestCases = async (testCases) => {
    const { data, error } = await supabase
        .from('test_cases')
        .insert(testCases)
        .select();

    if (error) throw error;
    return data;
};

/**
 * Add code templates to a problem (admin only)
 * @param {Array} templates - Array of template objects
 * @returns {Promise<Array>} Created templates
 */
export const addCodeTemplates = async (templates) => {
    const { data, error } = await supabase
        .from('code_templates')
        .insert(templates)
        .select();

    if (error) throw error;
    return data;
};
