import React, { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, Loader, ShieldCheck, Terminal, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    // Dynamic background effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate minimum loading time for better UX
        const minLoad = new Promise(resolve => setTimeout(resolve, 800));

        try {
            // 1. Check Admin
            const { data: adminData } = await supabase
                .from('admins')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            if (adminData) {
                await minLoad;
                onLogin(adminData.role, adminData.username);
                return;
            }

            // FALLBACK: Removed hardcoded admin fallback to enforce database auth.
            /* 
            if (username === 'admin' && password === 'admin123') {
                console.warn('Using offline admin login fallback');
                await minLoad;
                onLogin('sub_admin', 'admin');
                return;
            }
            */

            // 2. Check Candidate
            const { data: candidateData } = await supabase
                .from('candidates')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            await minLoad;

            if (candidateData) {
                onLogin('candidate', username);
            } else if (username === 'Test Candidate' && password === 'test123') {
                // FALLBACK: Offline candidate
                console.warn('Using offline candidate login fallback');
                onLogin('candidate', 'Test Candidate');
            } else {
                setError('Access Denied: Invalid Credentials');
            }
        } catch (err) {
            setError('System Error: Unable to verify credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#030304',
            perspective: '1000px'
        }}>
            {/* Animated Background Grid */}
            <div style={{
                position: 'absolute',
                inset: '-50%',
                width: '200%',
                height: '200%',
                background: `
                    linear-gradient(rgba(3, 3, 4, 0.9), rgba(3, 3, 4, 0.95)),
                    repeating-linear-gradient(0deg, transparent 0, transparent 1px, rgba(0, 242, 255, 0.03) 1px, rgba(0, 242, 255, 0.03) 2px),
                    repeating-linear-gradient(90deg, transparent 0, transparent 1px, rgba(0, 242, 255, 0.03) 1px, rgba(0, 242, 255, 0.03) 2px)
                `,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px',
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.1, 0.5, 0.1, 1)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Floating Orbs */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.8, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
                    zIndex: 0,
                    filter: 'blur(40px)'
                }}
            />
            <motion.div
                animate={{
                    x: [0, -70, 70, 0],
                    y: [0, 70, -70, 0],
                    scale: [1, 1.1, 0.9, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(188, 19, 254, 0.08) 0%, transparent 70%)',
                    zIndex: 0,
                    filter: 'blur(50px)'
                }}
            />

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    padding: '3.5rem',
                    background: 'rgba(10, 10, 12, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    maxWidth: '440px',
                    width: '100%',
                    zIndex: 10,
                    position: 'relative'
                }}
            >
                {/* Header Decoration */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
                        style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(188, 19, 254, 0.1))',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 0 30px rgba(0, 242, 255, 0.2)'
                        }}
                    >
                        <Terminal size={32} color="var(--primary)" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}
                    >
                        Secure access to your workspace
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            animate={{
                                borderColor: focusedField === 'username' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                                boxShadow: focusedField === 'username' ? '0 0 0 4px rgba(0, 242, 255, 0.1)' : 'none'
                            }}
                            style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '12px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                <User size={18} color={focusedField === 'username' ? 'var(--primary)' : 'var(--text-tertiary)'} style={{ transition: 'color 0.3s' }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField(null)}
                                required
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '16px 16px 16px 48px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </motion.div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <motion.div
                            animate={{
                                borderColor: focusedField === 'password' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                                boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(0, 242, 255, 0.1)' : 'none'
                            }}
                            style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '12px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                                <Lock size={18} color={focusedField === 'password' ? 'var(--primary)' : 'var(--text-tertiary)'} style={{ transition: 'color 0.3s' }} />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                required
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '16px 16px 16px 48px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    background: 'rgba(255, 85, 85, 0.1)',
                                    border: '1px solid rgba(255, 85, 85, 0.2)',
                                    borderRadius: '8px',
                                    padding: '10px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#ff5555',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <ShieldCheck size={14} /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        style={{
                            marginTop: '0.5rem',
                            background: 'linear-gradient(135deg, var(--primary) 0%, #00c3cc 100%)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            position: 'relative',
                            overflow: 'hidden',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader size={20} className="spin-animation" />
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin-animation { animation: spin 1s linear infinite; }`}</style>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <>
                                <span>Initialize Session</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </motion.button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        Protected by <span style={{ color: 'var(--text-secondary)' }}>CodeStream Secure Auth</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
