import React, { useState } from 'react';
import { Play, Terminal, X } from 'lucide-react';
import Editor from '@monaco-editor/react';

const Compiler = ({ onExit }) => {
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const languageMap = {
        'c': { id: 50, name: 'C', extension: 'c' },
        'cpp': { id: 54, name: 'C++', extension: 'cpp' },
        'python': { id: 71, name: 'Python', extension: 'py' },
        'javascript': { id: 63, name: 'JavaScript', extension: 'js' },
        'typescript': { id: 74, name: 'TypeScript', extension: 'ts' },
        'html': { id: null, name: 'HTML + CSS', extension: 'html' }
    };

    const handleRun = async () => {
        if (!code.trim()) {
            setOutput({ error: 'No code to execute' });
            return;
        }

        setIsRunning(true);
        setOutput(null);

        try {
            // Special handling for HTML + CSS
            if (language === 'html') {
                setOutput({ html: code });
                setIsRunning(false);
                return;
            }

            // Execute code via backend
            const apiUrl = import.meta.env.VITE_EXECUTION_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/compile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language,
                    code,
                    input
                })
            });

            const result = await response.json();
            setOutput(result);

        } catch (error) {
            setOutput({ error: error.message || 'Execution failed' });
        } finally {
            setIsRunning(false);
        }
    };

    const handleClear = () => {
        setOutput(null);
    };

    return (
        <div className="compiler-container">
            {/* Header */}
            <header className="compiler-header glass">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={onExit} className="btn-icon" title="Back">
                        <X size={20} />
                    </button>
                    <Terminal size={24} color="var(--primary)" />
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Code Compiler</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <select
                        className="language-selector"
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                            setCode('');
                            setOutput(null);
                        }}
                    >
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML + CSS</option>
                    </select>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleRun}
                        disabled={isRunning}
                    >
                        <Play size={16} />
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="compiler-body">
                {/* Left: Editor */}
                <div className="editor-panel glass">
                    <div className="panel-header">
                        <span>Code Editor</span>
                        <span className="language-badge">{languageMap[language].name}</span>
                    </div>
                    <Editor
                        height="100%"
                        language={language === 'cpp' ? 'cpp' : language}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 4
                        }}
                    />
                </div>

                {/* Right: Input/Output */}
                <div className="io-panel">
                    {/* Input Section */}
                    <div className="input-section glass">
                        <div className="panel-header">
                            <span>Input (stdin)</span>
                        </div>
                        <textarea
                            className="input-area"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter input here (if required)..."
                        />
                    </div>

                    {/* Output Section */}
                    <div className="output-section glass">
                        <div className="panel-header">
                            <span>Output</span>
                            {output && (
                                <button onClick={handleClear} className="btn-icon-sm">
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="output-content">
                            {isRunning ? (
                                <div className="status-message">
                                    <div className="spinner"></div>
                                    <span>Running...</span>
                                </div>
                            ) : !output ? (
                                <div className="status-message empty">
                                    <Terminal size={32} color="var(--glass-border)" />
                                    <span>Click Run to execute your code</span>
                                </div>
                            ) : output.html ? (
                                <iframe
                                    srcDoc={output.html}
                                    className="html-preview"
                                    title="HTML Preview"
                                    sandbox="allow-scripts"
                                />
                            ) : (
                                <div className="output-text">
                                    {output.error && (
                                        <div className="error-output">
                                            <strong>Error:</strong>
                                            <pre>{output.error}</pre>
                                        </div>
                                    )}
                                    {output.compile_error && (
                                        <div className="error-output">
                                            <strong>Compilation Error:</strong>
                                            <pre>{output.compile_error}</pre>
                                        </div>
                                    )}
                                    {output.stdout && (
                                        <div className="stdout-output">
                                            <strong>Output:</strong>
                                            <pre>{output.stdout}</pre>
                                        </div>
                                    )}
                                    {output.stderr && (
                                        <div className="stderr-output">
                                            <strong>Runtime Error:</strong>
                                            <pre>{output.stderr}</pre>
                                        </div>
                                    )}
                                    {output.status && (
                                        <div className="status-info">
                                            Status: {output.status}
                                            {output.time && ` | Time: ${output.time}s`}
                                            {output.memory && ` | Memory: ${output.memory}KB`}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .compiler-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: var(--bg-color);
                    padding: 1rem;
                    gap: 1rem;
                }

                .compiler-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                }

                .language-selector {
                    background: var(--surface-color);
                    color: var(--text-primary);
                    border: 1px solid var(--glass-border);
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    outline: none;
                    cursor: pointer;
                    font-size: 0.9rem;
                }

                .compiler-body {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 1rem;
                    flex: 1;
                    min-height: 0;
                }

                .editor-panel {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                }

                .io-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .input-section, .output-section {
                    display: flex;
                    flex-direction: column;
                    border-radius: var(--border-radius);
                    overflow: hidden;
                }

                .input-section {
                    flex: 0 0 200px;
                }

                .output-section {
                    flex: 1;
                    min-height: 0;
                }

                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    background: rgba(0,0,0,0.3);
                    border-bottom: 1px solid var(--glass-border);
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .language-badge {
                    background: rgba(80, 250, 123, 0.2);
                    color: #50fa7b;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                .input-area {
                    flex: 1;
                    background: var(--surface-color);
                    color: var(--text-primary);
                    border: none;
                    padding: 1rem;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9rem;
                    resize: none;
                    outline: none;
                }

                .output-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .status-message {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    gap: 1rem;
                    color: var(--text-secondary);
                }

                .status-message.empty {
                    opacity: 0.5;
                }

                .spinner {
                    width: 24px;
                    height: 24px;
                    border: 3px solid var(--glass-border);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .output-text {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9rem;
                }

                .error-output, .stdout-output, .stderr-output {
                    padding: 1rem;
                    border-radius: 6px;
                }

                .error-output, .stderr-output {
                    background: rgba(255, 85, 85, 0.1);
                    border-left: 3px solid #ff5555;
                }

                .error-output strong, .stderr-output strong {
                    color: #ff5555;
                }

                .stdout-output {
                    background: rgba(80, 250, 123, 0.05);
                    border-left: 3px solid #50fa7b;
                }

                .stdout-output strong {
                    color: #50fa7b;
                }

                .output-text pre {
                    margin: 0.5rem 0 0 0;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }

                .status-info {
                    padding: 0.5rem 1rem;
                    background: rgba(189, 147, 249, 0.1);
                    border-radius: 6px;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                }

                .html-preview {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: white;
                    border-radius: 4px;
                }

                .btn-icon-sm {
                    background: none;
                    border: 1px solid var(--glass-border);
                    color: var(--text-secondary);
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.75rem;
                    transition: all 0.2s;
                }

                .btn-icon-sm:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: var(--primary);
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default Compiler;
