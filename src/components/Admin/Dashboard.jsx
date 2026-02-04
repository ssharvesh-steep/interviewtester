import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Play, Clipboard, User, Award, Plus, Trash2, CheckCircle, LogOut, Code } from 'lucide-react';

const AdminDashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], answer_index: 0 });
    const [activeTab, setActiveTab] = useState('candidates');

    // CODING PROBLEMS STATE
    const [codingProblems, setCodingProblems] = useState([]);
    const [newProblem, setNewProblem] = useState({
        title: '',
        description: '',
        difficulty: 'Simple',
        input_format: '',
        output_format: '',
        language: 'python'
    });
    const [newTestCases, setNewTestCases] = useState([{ input: '', expected_output: '', is_public: false }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Sessions (Fail gracefully if table missing)
                let sessData = [];
                try {
                    const { data, error } = await supabase.from('sessions').select('*').order('created_at', { ascending: false });
                    if (!error) sessData = data;
                } catch (e) {
                    console.warn("Sessions table missing or inaccessible:", e);
                }

                // Fetch Questions
                let qData = [];
                try {
                    const { data, error } = await supabase.from('questions').select('*').order('created_at', { ascending: true });
                    if (!error) qData = data;
                } catch (e) {
                    console.warn("Questions table fetch error:", e);
                }

                setSessions(sessData || []);
                setQuestions(qData || []);

                // Fetch Coding Problems
                let cpData = [];
                try {
                    const { data, error } = await supabase.from('problems').select('*').order('created_at', { ascending: false });
                    if (!error) cpData = data;
                } catch (e) {
                    console.warn("Problems table fetch error:", e);
                }
                setCodingProblems(cpData || []);
            } catch (err) {
                console.error("Critical Dashboard Error:", err);
                // Only alert if something fundamental fails, otherwise silent fail for missing tables
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const sessSub = supabase.channel('sess-sub').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sessions' }, payload => {
            setSessions(prev => [payload.new, ...prev]);
        }).subscribe();

        const qSub = supabase.channel('q-sub').on('postgres_changes', { event: '*', schema: 'public', table: 'questions' }, () => {
            fetchData();
        }).subscribe();

        return () => {
            supabase.removeChannel(sessSub);
            supabase.removeChannel(qSub);
        };
    }, []);

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        // Filter out empty options
        const finalOptions = newQuestion.options.map(o => o.trim()).filter(o => o !== "");

        if (!newQuestion.text.trim()) {
            alert("Please enter the question text.");
            return;
        }

        if (finalOptions.length < 2) {
            alert("Please provide at least 2 non-empty options.");
            return;
        }

        const answerIndex = parseInt(newQuestion.answer_index);
        if (answerIndex >= finalOptions.length) {
            alert("The selected correct answer index is no longer valid for the number of options provided.");
            return;
        }

        const { error } = await supabase.from('questions').insert({
            text: newQuestion.text,
            options: finalOptions,
            answer_index: answerIndex
        });

        if (error) {
            console.error("DB Error:", error);
            alert("Database Error: " + error.message + "\n\nPlease ensure the 'questions' table exists in Supabase with JSONB 'options'.");
        } else {
            setNewQuestion({ text: '', options: ['', '', '', ''], answer_index: 0 });
            alert("Question added successfully!");
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("Delete question?")) return;
        await supabase.from('questions').delete().eq('id', id);
    };

    const [newUser, setNewUser] = useState(null);
    const [genError, setGenError] = useState('');
    const [customUsername, setCustomUsername] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const generateCredential = async () => {
        let username = customUsername.trim() || `cand_${Math.random().toString(36).substr(2, 5)}`;

        // CHECK UNIQUENESS
        const { data: existingUser, error: checkError } = await supabase
            .from('candidates')
            .select('id')
            .eq('username', username)
            .maybeSingle();

        if (checkError) {
            setGenError("Error checking username availability: " + checkError.message);
            return;
        }

        if (existingUser) {
            setGenError(`The username '${username}' is already taken. Please choose another.`);
            return;
        }

        const password = Math.random().toString(36).substr(2, 8);
        const { error } = await supabase.from('candidates').insert({ username, password });
        if (error) setGenError(error.message);
        else {
            setNewUser({ username, password });
            setGenError('');
            setCustomUsername('');
        }
    };

    const [recentCandidates, setRecentCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false }).limit(20);
            setRecentCandidates(data || []);
        };

        fetchCandidates();

        // REAL-TIME SUBSCRIPTION
        const channel = supabase
            .channel('candidates-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'candidates' }, () => {
                fetchCandidates();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [newUser, refreshTrigger]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied!');
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete candidate?")) return;

        const { error } = await supabase.from('candidates').delete().eq('id', id);

        if (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete candidate: " + error.message);
        } else {
            setRefreshTrigger(prev => prev + 1);
        }
    };

    const handleBan = async (id, currentStatus) => {
        await supabase.from('candidates').update({ banned: !currentStatus }).eq('id', id);
        setRefreshTrigger(prev => prev + 1);
    };

    // --- CODING PROBLEM HANDLERS ---
    const handleAddTestCaseField = () => {
        setNewTestCases([...newTestCases, { input: '', expected_output: '', is_public: false }]);
    };

    const handleTestCaseChange = (index, field, value) => {
        const updated = [...newTestCases];
        updated[index][field] = value;
        setNewTestCases(updated);
    };

    const handleRemoveTestCase = (index) => {
        const updated = newTestCases.filter((_, i) => i !== index);
        setNewTestCases(updated.length ? updated : [{ input: '', expected_output: '', is_public: false }]);
    };

    const handleCreateProblem = async (e) => {
        e.preventDefault();
        try {
            // 1. Create Problem
            const { data: probData, error: probError } = await supabase
                .from('problems')
                .insert([newProblem])
                .select()
                .single();

            if (probError) throw probError;

            // 2. Create Test Cases
            const testCasesToInsert = newTestCases
                .filter(tc => tc.input.trim() || tc.expected_output.trim())
                .map(tc => ({
                    problem_id: probData.id,
                    input: tc.input,
                    expected_output: tc.expected_output,
                    is_public: tc.is_public
                }));

            if (testCasesToInsert.length > 0) {
                const { error: tcError } = await supabase.from('test_cases').insert(testCasesToInsert);
                if (tcError) throw tcError;
            }

            alert('Coding Problem Added Successfully!');
            setNewProblem({
                title: '',
                description: '',
                difficulty: 'Simple',
                input_format: '',
                output_format: '',
                language: 'python'
            });
            setNewTestCases([{ input: '', expected_output: '', is_public: false }]);

            // Refresh
            const { data } = await supabase.from('problems').select('*').order('created_at', { ascending: false });
            setCodingProblems(data || []);

        } catch (err) {
            console.error("Error creating problem:", err);
            alert("Failed to create problem: " + err.message);
        }
    };

    const handleDeleteProblem = async (id) => {
        if (!window.confirm("Delete this coding problem?")) return;
        const { error } = await supabase.from('problems').delete().eq('id', id);
        if (error) alert(error.message);
        else {
            const { data } = await supabase.from('problems').select('*').order('created_at', { ascending: false });
            setCodingProblems(data || []);
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm("ARE YOU SURE? This will PERMANENTLY delete ALL candidates from the database. This action cannot be undone.")) return;

        const { error } = await supabase.from('candidates').delete().gt('id', 0);
        if (error) {
            console.error("Delete All Error:", error);
            alert("Failed to delete all candidates: " + error.message);
        } else {
            alert("All candidates have been deleted.");
            setRefreshTrigger(prev => prev + 1);
        }
    };

    return (
        <div className="container fade-in" style={{ padding: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Play size={40} color="var(--primary)" />
                        Interviewer Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage candidates and assessment content</p>
                </div>
            </header>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '15px', width: 'fit-content' }}>
                {[
                    { id: 'candidates', label: 'Candidates', icon: <User size={18} /> },
                    { id: 'questions', label: 'Questions', icon: <Clipboard size={18} /> },
                    { id: 'coding', label: 'Coding Problems', icon: <Code size={18} /> },
                    { id: 'results', label: 'Results', icon: <Award size={18} /> }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="btn"
                        style={{
                            background: activeTab === tab.id ? 'var(--glass-border)' : 'transparent',
                            color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: activeTab === tab.id ? 700 : 400
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Panels */}
            {activeTab === 'candidates' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem' }}>
                        <div className="glass card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent)', height: 'fit-content' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Add Candidate</h3>
                            <div className="input-group" style={{ marginBottom: '1.2rem' }}>
                                <input
                                    type="text"
                                    placeholder="Username (Optional)"
                                    value={customUsername}
                                    onChange={(e) => setCustomUsername(e.target.value)}
                                />
                            </div>
                            <button onClick={generateCredential} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Create Access
                            </button>
                            {genError && (
                                <div style={{ color: '#ff5555', marginTop: '1rem', fontSize: '0.9rem' }}>
                                    {genError}
                                </div>
                            )}
                            {newUser && (
                                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,121,198,0.1)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px' }}>CREDENTIALS:</div>
                                    <code style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>{newUser.username} / {newUser.password}</code>
                                </div>
                            )}
                        </div>
                        <div className="glass card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0 }}>Active Candidates</h3>
                                <button
                                    onClick={handleDeleteAll}
                                    className="btn"
                                    style={{
                                        background: 'rgba(255, 85, 85, 0.15)',
                                        color: '#ff5555',
                                        border: '1px solid #ff5555',
                                        fontSize: '0.8rem',
                                        padding: '5px 12px'
                                    }}
                                >
                                    Delete All
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '500px', overflowY: 'auto' }}>
                                {recentCandidates.map(cand => (
                                    <div key={cand.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', opacity: cand.banned ? 0.4 : 1 }}>
                                        <div>
                                            <div style={{ fontWeight: 600, textDecoration: cand.banned ? 'line-through' : 'none' }}>{cand.username}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PWD: {cand.password}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => copyToClipboard(`${cand.username}/${cand.password}`)} className="btn-icon" title="Copy"><Clipboard size={14} /></button>
                                            <button onClick={() => handleBan(cand.id, cand.banned)} className="btn-icon" title={cand.banned ? "Unban" : "Ban"}>{cand.banned ? <CheckCircle size={14} /> : '⊘'}</button>
                                            <button onClick={() => handleDelete(cand.id)} className="btn-icon" style={{ borderColor: '#ff5555', color: '#ff5555' }} title="Delete">×</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'questions' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '2rem' }}>
                        <div className="glass card" style={{ padding: '2rem', borderLeft: '4px solid var(--secondary)', height: 'fit-content' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>New Question</h3>
                            <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Question Text"
                                        value={newQuestion.text}
                                        onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                        required
                                    />
                                </div>
                                {newQuestion.options.map((opt, i) => (
                                    <div key={i} className="input-group">
                                        <input
                                            type="text"
                                            placeholder={`Option ${i + 1}`}
                                            value={opt}
                                            onChange={e => {
                                                const next = [...newQuestion.options];
                                                next[i] = e.target.value;
                                                setNewQuestion({ ...newQuestion, options: next });
                                            }}
                                            required
                                        />
                                    </div>
                                ))}
                                <select
                                    value={newQuestion.answer_index}
                                    onChange={e => setNewQuestion({ ...newQuestion, answer_index: e.target.value })}
                                    style={{ padding: '12px', background: 'var(--glass)', color: 'white', borderRadius: '10px', border: '1px solid var(--glass-border)' }}
                                >
                                    {newQuestion.options.map((_, i) => (
                                        <option key={i} value={i}>Correct: Option {i + 1}</option>
                                    ))}
                                </select>
                                <button type="submit" className="btn btn-secondary" style={{ justifyContent: 'center' }}>Add Question</button>
                            </form>
                        </div>
                        <div className="glass card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Question Bank ({questions.length})</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                                {questions.map((q, idx) => (
                                    <div key={q.id} style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, marginBottom: '8px' }}>{idx + 1}. {q.text}</div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                                                {q.options.map((opt, i) => (
                                                    <div key={i} style={{ fontSize: '0.85rem', color: i === q.answer_index ? 'var(--primary)' : 'var(--text-secondary)' }}>
                                                        • {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteQuestion(q.id)} className="btn-icon" style={{ borderColor: '#ff5555', color: '#ff5555' }}><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'coding' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                        {/* FORM */}
                        <div className="glass card" style={{ padding: '2rem', borderLeft: '4px solid #f1fa8c', height: 'fit-content' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Add Coding Problem</h3>
                            <form onSubmit={handleCreateProblem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input type="text" placeholder="Title (e.g. Sum of Array)" value={newProblem.title} onChange={e => setNewProblem({ ...newProblem, title: e.target.value })} required className="input-field" style={{ padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <select value={newProblem.difficulty} onChange={e => setNewProblem({ ...newProblem, difficulty: e.target.value })} style={{ padding: '10px', borderRadius: '8px', flex: 1 }}>
                                        <option value="Simple">Simple</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Tough">Tough</option>
                                    </select>
                                    <select value={newProblem.language} onChange={e => setNewProblem({ ...newProblem, language: e.target.value })} style={{ padding: '10px', borderRadius: '8px', flex: 1 }}>
                                        <option value="python">Python</option>
                                        <option value="c">C</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                    </select>
                                </div>

                                <textarea placeholder="Problem Description..." value={newProblem.description} onChange={e => setNewProblem({ ...newProblem, description: e.target.value })} required style={{ minHeight: '80px', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}></textarea>
                                <input type="text" placeholder="Input Format" value={newProblem.input_format} onChange={e => setNewProblem({ ...newProblem, input_format: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} />
                                <input type="text" placeholder="Output Format" value={newProblem.output_format} onChange={e => setNewProblem({ ...newProblem, output_format: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} />

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>Test Cases</h4>
                                    {newTestCases.map((tc, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                                <input type="text" placeholder="Input" value={tc.input} onChange={e => handleTestCaseChange(idx, 'input', e.target.value)} style={{ flex: 1, padding: '5px', borderRadius: '4px' }} />
                                                <input type="text" placeholder="Expected Output" value={tc.expected_output} onChange={e => handleTestCaseChange(idx, 'expected_output', e.target.value)} style={{ flex: 1, padding: '5px', borderRadius: '4px' }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <input type="checkbox" checked={tc.is_public} onChange={e => handleTestCaseChange(idx, 'is_public', e.target.checked)} />
                                                    Public Test Case
                                                </label>
                                                {newTestCases.length > 1 && <span onClick={() => handleRemoveTestCase(idx)} style={{ color: '#ff5555', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</span>}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddTestCaseField} style={{ background: 'none', border: '1px dashed var(--text-secondary)', color: 'var(--text-secondary)', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', width: '100%' }}>+ Add Test Case</button>
                                </div>

                                <button type="submit" className="btn btn-secondary" style={{ justifyContent: 'center' }}>Create Problem</button>
                            </form>
                        </div>

                        {/* LIST */}
                        <div className="glass card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Problem Bank ({codingProblems.length})</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
                                {codingProblems.map(prob => (
                                    <div key={prob.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prob.title}</div>
                                                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                                                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{prob.difficulty}</span>
                                                    <span style={{ background: 'rgba(189, 147, 249, 0.2)', color: '#bd93f9', padding: '2px 8px', borderRadius: '4px' }}>{prob.language}</span>
                                                </div>
                                                <div style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8, maxHeight: '60px', overflow: 'hidden' }}>{prob.description}</div>
                                            </div>
                                            <button onClick={() => handleDeleteProblem(prob.id)} className="btn-icon" style={{ color: '#ff5555', borderColor: '#ff5555' }}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'results' && (
                <div className="fade-in">
                    <h3 style={{ marginBottom: '2rem' }}>Performance Results</h3>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading results...</div>
                    ) : (
                        <div className="grid" style={{ marginTop: 0 }}>
                            {sessions.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center', gridColumn: '1/-1' }}>No results recorded yet.</p>
                            ) : (
                                sessions.map(session => (
                                    <div key={session.id} className="glass card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                                            <span style={{ fontWeight: 600 }}>{session.candidate_name || 'Anonymous'}</span>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(session.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Final Score</span>
                                                <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '1.2rem' }}>{session.score} / 10</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>System Warnings</span>
                                                <span style={{ fontWeight: 700, color: session.warnings_count > 0 ? '#ff5555' : 'var(--primary)', fontSize: '1rem' }}>
                                                    {session.warnings_count || 0}
                                                </span>
                                            </div>
                                        </div>
                                        {session.recording_url && (
                                            <a href={session.recording_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                                <Play size={16} fill="currentColor" />
                                                View Recording
                                            </a>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
