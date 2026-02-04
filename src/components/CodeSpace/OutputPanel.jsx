import React from 'react';
import { AlertCircle, CheckCircle, Terminal } from 'lucide-react';

const OutputPanel = ({ output, verdict, isRunning }) => {
    if (isRunning) {
        return (
            <div className="output-container loading">
                <div className="spinner"></div>
                <p>Running code...</p>
            </div>
        );
    }

    if (!output && !verdict) {
        return (
            <div className="output-container placeholder">
                <Terminal size={48} color="var(--glass-border)" />
                <p>Run your code to see the output</p>
            </div>
        );
    }

    return (
        <div className="output-container content">
            <div style={{
                padding: '0.5rem 1rem',
                borderBottom: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.2)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ color: '#fff' }}>Output</span>
                {verdict && (
                    <span className={`verdict-badge ${verdict}`}>
                        {verdict === 'pass' && <CheckCircle size={14} />}
                        {verdict === 'fail' && <AlertCircle size={14} />}
                        {verdict === 'error' && <AlertCircle size={14} />}
                        {verdict.toUpperCase()}
                    </span>
                )}
            </div>

            <div className="output-scroll custom-scroll">
                {output?.summary && (
                    <div className="submission-summary">
                        <div className="summary-header">
                            <span className={`verdict-large ${output.summary.verdict.toLowerCase().replace(' ', '-')}`}>
                                {output.summary.verdict}
                            </span>
                        </div>
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="stat-label">Test Cases</span>
                                <span className="stat-value">{output.summary.testCasesPassed} / {output.summary.totalTestCases}</span>
                            </div>
                            {output.summary.executionTime && (
                                <div className="stat">
                                    <span className="stat-label">Execution Time</span>
                                    <span className="stat-value">{output.summary.executionTime}ms</span>
                                </div>
                            )}
                            {output.summary.memoryUsed && (
                                <div className="stat">
                                    <span className="stat-label">Memory Used</span>
                                    <span className="stat-value">{(output.summary.memoryUsed / 1024).toFixed(2)}MB</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {output?.error ? (
                    <div className="error-message">
                        <pre>{output.error}</pre>
                    </div>
                ) : output?.testCases ? (
                    <div className="test-cases">
                        {output.testCases.map((tc, idx) => (
                            <div key={idx} className={`test-case-card ${tc.status.toLowerCase()}`}>
                                <div className="tc-header">
                                    <span className="tc-title">Test Case {idx + 1}</span>
                                    <span className={`tc-status ${tc.status === 'Passed' ? 'pass' : 'fail'}`}>
                                        {tc.status}
                                    </span>
                                </div>
                                <div className="tc-details">
                                    <div className="tc-row">
                                        <span className="label">Input:</span>
                                        <code className="value">{tc.input}</code>
                                    </div>
                                    <div className="tc-row">
                                        <span className="label">Expected:</span>
                                        <code className="value">{tc.expected}</code>
                                    </div>
                                    <div className="tc-row">
                                        <span className="label">Actual:</span>
                                        <code className="value">{tc.actual}</code>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="stdout">
                        <pre>{output?.stdout || 'No output'}</pre>
                    </div>
                )}
            </div>

            <style>{`
                .output-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                }
                
                .output-container.placeholder, .output-container.loading {
                    justify-content: center;
                    align-items: center;
                    color: var(--text-secondary);
                    gap: 1rem;
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
                
                .verdict-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-weight: 700;
                }
                .verdict-badge.pass { background: rgba(80, 250, 123, 0.2); color: #50fa7b; }
                .verdict-badge.fail { background: rgba(255, 85, 85, 0.2); color: #ff5555; }
                .verdict-badge.error { background: rgba(255, 184, 108, 0.2); color: #ffb86c; }
                
                .output-scroll {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }
                
                .error-message {
                    color: #ff5555;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9rem;
                    background: rgba(255, 85, 85, 0.1);
                    padding: 1rem;
                    border-radius: 6px;
                }
                
                .stdout {
                    color: var(--text-primary);
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9rem;
                }
                
                .test-cases {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .test-case-card {
                    background: var(--surface-color);
                    border: 1px solid var(--glass-border);
                    border-radius: 6px;
                    overflow: hidden;
                }
                
                .tc-header {
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .tc-status {
                    font-weight: 700;
                    font-size: 0.8rem;
                }
                .tc-status.pass { color: #50fa7b; }
                .tc-status.fail { color: #ff5555; }
                
                .tc-details {
                    padding: 1rem;
                    font-size: 0.9rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .tc-row {
                    display: flex;
                    gap: 1rem;
                }
                
                .label {
                    color: var(--text-secondary);
                    min-width: 60px;
                }
                
                .value {
                    font-family: 'Fira Code', monospace;
                    color: var(--text-primary);
                }
                
                .submission-summary {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .summary-header {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                
                .verdict-large {
                    font-size: 1.5rem;
                    font-weight: 700;
                    padding: 8px 16px;
                    border-radius: 8px;
                    display: inline-block;
                }
                .verdict-large.accepted { background: rgba(80, 250, 123, 0.2); color: #50fa7b; }
                .verdict-large.wrong-answer { background: rgba(255, 85, 85, 0.2); color: #ff5555; }
                .verdict-large.time-limit-exceeded { background: rgba(255, 184, 108, 0.2); color: #ffb86c; }
                .verdict-large.runtime-error { background: rgba(255, 85, 85, 0.2); color: #ff5555; }
                .verdict-large.compilation-error { background: rgba(255, 85, 85, 0.2); color: #ff5555; }
                .verdict-large.memory-limit-exceeded { background: rgba(255, 184, 108, 0.2); color: #ffb86c; }
                
                .summary-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                }
                
                .stat {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: rgba(0,0,0,0.2);
                    border-radius: 6px;
                }
                
                .stat-label {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .stat-value {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default OutputPanel;
