import React from 'react';

const ProblemPanel = ({ problem }) => {
    return (
        <div className="problem-description">
            <h3 style={{ marginBottom: '1rem' }}>Description</h3>
            <div className="markdown-body">
                {problem.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{paragraph}</p>
                ))}
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Examples</h3>
            <div className="examples-list">
                {problem.examples.map((ex, idx) => (
                    <div key={idx} className="example-card" style={{
                        background: 'var(--surface-color)',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong style={{ color: 'var(--text-secondary)' }}>Input:</strong>
                            <code style={{ marginLeft: '8px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{ex.input}</code>
                        </div>
                        <div style={{ marginBottom: ex.explanation ? '0.5rem' : '0' }}>
                            <strong style={{ color: 'var(--text-secondary)' }}>Output:</strong>
                            <code style={{ marginLeft: '8px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{ex.output}</code>
                        </div>
                        {ex.explanation && (
                            <div>
                                <strong style={{ color: 'var(--text-secondary)' }}>Explanation:</strong>
                                <span style={{ marginLeft: '8px' }}>{ex.explanation}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Constraints</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
                {problem.constraints.map((constraint, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <code>{constraint}</code>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProblemPanel;
