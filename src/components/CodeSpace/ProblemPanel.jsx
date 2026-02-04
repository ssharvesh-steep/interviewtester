import React from 'react';

const ProblemPanel = ({ problem }) => {
    if (!problem) {
        return <div style={{ color: 'var(--text-secondary)', padding: '1rem' }}>No problem data loaded.</div>;
    }

    const { description, examples = [], constraints = [] } = problem;

    return (
        <div className="problem-description" style={{ color: 'var(--text-primary)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Description</h3>
            <div className="markdown-body">
                {description ? (
                    description.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                            {paragraph}
                        </p>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No description available.</p>
                )}
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Examples</h3>
            <div className="examples-list">
                {examples.length > 0 ? (
                    examples.map((ex, idx) => (
                        <div key={idx} className="example-card" style={{
                            background: 'var(--surface-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <strong style={{ color: 'var(--text-secondary)' }}>Input:</strong>
                                <code style={{ marginLeft: '8px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{ex.input}</code>
                            </div>
                            <div style={{ marginBottom: ex.explanation ? '0.5rem' : '0' }}>
                                <strong style={{ color: 'var(--text-secondary)' }}>Output:</strong>
                                <code style={{ marginLeft: '8px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{ex.output}</code>
                            </div>
                            {ex.explanation && (
                                <div>
                                    <strong style={{ color: 'var(--text-secondary)' }}>Explanation:</strong>
                                    <span style={{ marginLeft: '8px', color: 'var(--text-primary)' }}>{ex.explanation}</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No examples available.</p>
                )}
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Constraints</h3>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                {constraints.length > 0 ? (
                    constraints.map((constraint, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>
                            <code style={{ color: '#ff79c6' }}>{constraint}</code>
                        </li>
                    ))
                ) : (
                    <li>No constraints specified.</li>
                )}
            </ul>
        </div>
    );
};

export default ProblemPanel;
