import React, { useState, useEffect } from 'react';
import ProblemPanel from './ProblemPanel';
import EditorPanel from './EditorPanel';
import OutputPanel from './OutputPanel';
import { Play, ArrowLeft, Send, RotateCcw, SkipForward, SkipBack, LogOut } from 'lucide-react';
import { executeCode, submitCode } from '../../lib/compiler';
import { getPublicTestCases, getAllTestCases, getCodeTemplates, saveSubmission, updateUserStats } from '../../lib/supabase';

const SAMPLE_PROBLEM = {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    input_format: "First line contains n (size of array)\nSecond line contains n space-separated integers (the array)\nThird line contains the target integer",
    output_format: "Two space-separated integers representing the indices",
    constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists"
    ],
    examples: [
        {
            input: "4\n2 7 11 15\n9",
            output: "0 1",
            explanation: "nums[0] + nums[1] = 2 + 7 = 9"
        },
        {
            input: "3\n3 2 4\n6",
            output: "1 2",
            explanation: "nums[1] + nums[2] = 2 + 4 = 6"
        }
    ],
    time_limit: 2000,
    memory_limit: 256
};

// Default templates for all languages
const DEFAULT_TEMPLATES = {
    c: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Write your code here\n    // Example:\n    // int a, b;\n    // scanf("%d %d", &a, &b);\n    // printf("%d", a + b);\n    return 0;\n}`,
    cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
    java: `import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
    python: `# Write your code here\n`,
    javascript: `// Write your code here\n`,
    typescript: `// Write your code here\n`
};

const CodeSpace = ({ onExit, problemId = null, username = 'guest', problemData = null }) => {
    const [activeTab, setActiveTab] = useState('description');

    // Helper to resolve Problem ID securely
    const currentProblemId = problemData?.id || problemId || SAMPLE_PROBLEM.id;
    const storageKey = `interview_tester_state_${currentProblemId}`;

    // --- 1. Lazy State Initialization (Restores state synchronously) ---
    const getSavedState = () => {
        try {
            const saved = sessionStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to load state", e);
            return null;
        }
    };

    const savedState = getSavedState();

    // Determine default language based on problem type
    let defaultLang = 'python'; // Default fallback
    if (problemData?.type === 'c-course') {
        defaultLang = 'c';
    } else if (problemData?.type === 'python-course') {
        defaultLang = 'python';
    } else if (problemData?.lockMode) {
        defaultLang = 'c'; // Fallback for legacy lockMode usage
    }

    const [language, setLanguage] = useState(() => savedState?.language || defaultLang);
    const [code, setCode] = useState(() => savedState?.code || DEFAULT_TEMPLATES[savedState?.language || defaultLang]);
    const [originalCode, setOriginalCode] = useState(() => DEFAULT_TEMPLATES[savedState?.language || defaultLang]);

    const [output, setOutput] = useState(() => savedState?.output || null);
    const [verdict, setVerdict] = useState(() => savedState?.verdict || null);

    const [isRunning, setIsRunning] = useState(false);
    const [problem, setProblem] = useState(problemData || SAMPLE_PROBLEM);
    const [publicTestCases, setPublicTestCases] = useState([]);
    const [allTestCases, setAllTestCases] = useState([]);
    const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
    const [mounted, setMounted] = useState(false);

    // Update problem when problemData changes
    useEffect(() => {
        if (problemData) {
            setProblem(problemData);
            console.log("Problem updated:", problemData.id);
        }
    }, [problemData]);

    useEffect(() => {
        setMounted(true);
        console.log("CodeSpace Mounted with Problem:", problemData?.id);
        // Load problem data when component mounts or problem changes
        if (problemData) {
            loadProblemData();
        }
    }, [problemData?.id]);

    // --- 2. Persist State on Change ---
    useEffect(() => {
        if (!mounted) return;
        const stateToSave = {
            code,
            language,
            output,
            verdict,
            timestamp: Date.now()
        };
        sessionStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }, [code, language, output, verdict, storageKey, mounted]);

    // Safety check for critical data
    if (!problem) return (
        <div className="codespace-container" style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Loading Challenge Data...</h2>
        </div>
    );

    // --- 3. Explicit Language Handler (Replaces buggy useEffect) ---
    const handleLanguageChange = (newContextLanguage) => {
        // Save current work for previous language? (Optional, skipping for now per storing 'current' state only)

        const newTemplate = templates[newContextLanguage] || DEFAULT_TEMPLATES[newContextLanguage] || '';

        // Update functionality
        setLanguage(newContextLanguage);
        setCode(newTemplate);
        setOriginalCode(newTemplate);
        setOutput(null);
        setVerdict(null);
    };

    const loadProblemData = async () => {
        try {
            // Simulate loading test cases logic
            const samplePublicTests = problem.examples.map((ex, idx) => ({
                id: idx + 1,
                input: ex.input,
                expected_output: ex.output,
                is_public: true,
                order_index: idx
            }));

            setPublicTestCases(samplePublicTests);
            setAllTestCases(samplePublicTests);

        } catch (error) {
            console.error('Error loading problem data:', error);
        }
    };

    const handleRun = async () => {
        setIsRunning(true);
        setOutput(null);
        setVerdict(null);

        try {
            // Execute with public test cases only
            const testCases = publicTestCases.map(tc => ({
                input: tc.input,
                expected_output: tc.expected_output,
                is_public: true
            }));

            const result = await executeCode(
                language,
                code,
                testCases,
                problem.time_limit / 1000,
                problem.memory_limit * 1000
            );

            if (result.verdict === 'error') {
                setVerdict('error');
                setOutput({ error: result.error });
            } else {
                setVerdict(result.verdict);
                setOutput({ testCases: result.testCases });
            }

        } catch (error) {
            setVerdict('error');
            setOutput({ error: error.message });
        } finally {
            setIsRunning(false);
        }
    };

    const handleNextProblem = () => {
        console.log('[CodeSpace] Next clicked', { hasOnNext: !!problemData?.onNext, problemId: problem.id });
        try {
            if (typeof problemData?.onNext === 'function') {
                problemData.onNext();
                return;
            }
            // Fallback: attempt to navigate using stored progress index if present
            const savedIndex = sessionStorage.getItem('c_course_progress');
            const idx = savedIndex ? parseInt(savedIndex, 10) : null;
            if (idx !== null && !isNaN(idx)) {
                const next = idx + 1;
                console.warn('[CodeSpace] onNext missing; using fallback navigation to index', next);
                try { window.location.href = `/practice/c/${next}`; } catch (e) { console.error(e); }
            } else {
                console.warn('[CodeSpace] onNext missing and no progress saved; cannot navigate');
            }
        } catch (err) {
            console.error('[CodeSpace] error calling onNext', err);
        }
    };

    const handlePreviousProblem = () => {
        console.log('[CodeSpace] Previous clicked', { hasOnPrevious: !!problemData?.onPrevious, problemId: problem.id });
        try {
            if (typeof problemData?.onPrevious === 'function') {
                problemData.onPrevious();
                return;
            }
            const savedIndex = sessionStorage.getItem('c_course_progress');
            const idx = savedIndex ? parseInt(savedIndex, 10) : null;
            if (idx !== null && !isNaN(idx) && idx > 0) {
                const prev = idx - 1;
                console.warn('[CodeSpace] onPrevious missing; using fallback navigation to index', prev);
                try { window.location.href = `/practice/c/${prev}`; } catch (e) { console.error(e); }
            } else {
                console.warn('[CodeSpace] onPrevious missing and no valid progress; cannot navigate');
            }
        } catch (err) {
            console.error('[CodeSpace] error calling onPrevious', err);
        }
    };

    const handleSubmit = async () => {
        setIsRunning(true);
        setVerdict('running');

        try {
            const testCasesToRun = problemData?.testCases ? problemData.testCases : allTestCases;

            const finalTestCases = testCasesToRun.map(tc => ({
                input: tc.input,
                expected_output: tc.expected_output,
                is_public: !!tc.is_public
            }));

            const result = await submitCode(
                language,
                code,
                finalTestCases,
                problem.id,
                problem.time_limit / 1000,
                problem.memory_limit * 1000
            );

            setVerdict(result.verdict);
            setOutput({
                testCases: result.public_results || [],
                summary: {
                    verdict: result.verdict,
                    testCasesPassed: result.test_cases_passed,
                    totalTestCases: result.total_test_cases,
                    executionTime: result.execution_time,
                    memoryUsed: result.memory_used
                },
                error: result.error_message
            });

            if (result.verdict === 'Accepted') {
                // Success logic
            }

            try {
                await saveSubmission({
                    username,
                    problem_id: problem.id,
                    language,
                    code,
                    verdict: result.verdict,
                    test_cases_passed: result.test_cases_passed,
                    total_test_cases: result.total_test_cases,
                    execution_time: result.execution_time,
                    memory_used: result.memory_used,
                    error_message: result.error_message
                });

                await updateUserStats(username, result.verdict, problem.difficulty, language, problem.id);
            } catch (dbError) {
                console.error('Error saving submission:', dbError);
            }

        } catch (error) {
            setVerdict('error');
            setOutput({ error: error.message });
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(originalCode);
        setOutput(null);
        setVerdict(null);
    };

    return (
        <div className="codespace-container fade-in">
            {/* Top Bar */}
            <header className="glass codespace-header">
                <div className="header-left">
                    <button onClick={() => {
                        onExit();
                    }} className="btn-icon" title="Back to Dashboard">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="problem-title">
                        <h2>{problem.id}. {problem.title}</h2>
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </span>
                    </div>
                </div>

                <div className="header-controls">
                    <button
                        className="btn-icon"
                        onClick={() => {
                            if (window.electronAPI) window.electronAPI.send('exit-app');
                        }}
                        title="Exit App (Kiosk Mode)"
                        style={{ marginRight: '1rem', borderColor: 'var(--error)', color: 'var(--error)' }}
                    >
                        <LogOut size={18} />
                    </button>

                    <select
                        className="language-selector"
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        disabled={problemData?.lockMode}
                        style={problemData?.lockMode ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                    >
                        {problemData?.lockMode ? (
                            <option value={language}>
                                {language === 'c' ? 'C (Restricted)' :
                                    language === 'python' ? 'Python (Restricted)' :
                                        `${language} (Restricted)`}
                            </option>
                        ) : (
                            <>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                            </>
                        )}
                    </select>

                    <button
                        className="btn-icon"
                        onClick={handleReset}
                        disabled={isRunning}
                        title="Reset Code"
                    >
                        <RotateCcw size={16} />
                    </button>

                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleRun}
                        disabled={isRunning}
                    >
                        <Play size={16} /> Run
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleSubmit}
                        disabled={isRunning}
                    >
                        <Send size={16} /> {isRunning ? 'Submitting...' : 'Submit'}
                    </button>
                    {problemData?.onPrevious && (
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={handlePreviousProblem}
                            style={{ marginLeft: '10px' }}
                            title="Previous Problem"
                        >
                            <SkipBack size={16} /> Previous
                        </button>
                    )}
                    {problemData?.onNext && (
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={handleNextProblem}
                            style={{ marginLeft: '10px' }}
                            title="Next Problem"
                        >
                            <SkipForward size={16} /> Next
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="codespace-body">
                {/* Left Panel: Problem Description */}
                <div className="panel left-panel glass">
                    <div className="panel-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'solution' ? 'active' : ''}`}
                            onClick={() => setActiveTab('solution')}
                        >
                            Solution
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('submissions')}
                        >
                            Submissions
                        </button>
                    </div>
                    <div className="panel-content custom-scroll">
                        {activeTab === 'description' ? (
                            <ProblemPanel problem={problem} />
                        ) : activeTab === 'solution' ? (
                            <div className="placeholder-content">Solution is locked.</div>
                        ) : (
                            <div className="placeholder-content">Submissions history coming soon...</div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="panel right-panel">
                    <div className="editor-section glass">
                        {mounted ? (
                            <EditorPanel
                                language={language}
                                code={code}
                                onChange={setCode}
                                theme="vs-dark"
                            />
                        ) : (
                            <div className="placeholder-content">Loading Editor...</div>
                        )}
                    </div>
                    <div className="output-section glass">
                        <OutputPanel
                            output={output}
                            verdict={verdict}
                            isRunning={isRunning}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .codespace-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background-color: var(--bg-color);
                    padding: 1rem;
                    gap: 1rem;
                }
                
                .codespace-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 1.5rem;
                }
                
                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .problem-title {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .problem-title h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0;
                }
                
                .difficulty-badge {
                    font-size: 0.75rem;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-weight: 600;
                }
                .difficulty-badge.easy { background: rgba(80, 250, 123, 0.2); color: #50fa7b; }
                .difficulty-badge.medium { background: rgba(255, 184, 108, 0.2); color: #ffb86c; }
                .difficulty-badge.hard { background: rgba(255, 85, 85, 0.2); color: #ff5555; }
                
                .header-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .language-selector {
                    background: var(--surface-color);
                    color: var(--text-primary);
                    border: 1px solid var(--glass-border);
                    padding: 0.5rem;
                    border-radius: 6px;
                    outline: none;
                    cursor: pointer;
                }
                
                .btn-sm {
                    padding: 8px 16px;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .codespace-body {
                    display: grid;
                    grid-template-columns: 400px 1fr;
                    gap: 1rem;
                    flex: 1;
                    min-height: 0;
                }
                
                .panel {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                }
                
                .panel-tabs {
                    display: flex;
                    border-bottom: 1px solid var(--glass-border);
                    background: rgba(0,0,0,0.2);
                }
                
                .tab-btn {
                    flex: 1;
                    padding: 1rem;
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                    border-bottom: 2px solid transparent;
                }
                
                .tab-btn.active {
                    color: var(--text-primary);
                    border-bottom-color: var(--primary);
                    background: rgba(255,255,255,0.02);
                }
                
                .panel-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                }
                
                .right-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: none;
                }
                
                .editor-section {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                }
                
                .output-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                    min-height: 200px;
                }
                
                .placeholder-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
};

export default CodeSpace;
