import React from 'react';
import Editor from '@monaco-editor/react';

const EditorPanel = ({ language, code, onChange, theme }) => {

    const handleEditorChange = (value, event) => {
        onChange(value);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                padding: '0.5rem 1rem',
                borderBottom: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.2)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
            }}>
                Code Editor
            </div>
            <div style={{ flex: 1 }}>
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    theme={theme}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        fontFamily: "'Fira Code', 'Consolas', monospace",
                        padding: { top: 16, bottom: 16 },
                    }}
                    loading={<div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading Editor...</div>}
                />
            </div>
        </div>
    );
};

export default EditorPanel;
