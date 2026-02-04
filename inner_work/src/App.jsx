import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, LogOut, Shield } from 'lucide-react';

import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Proctoring from './components/Proctoring';
import Login from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import SuperAdminDashboard from './components/Admin/SuperAdminDashboard';
import PreTestCheck from './components/PreTestCheck';
import CodeSpace from './components/CodeSpace/CodeSpace';
import Compiler from './components/Compiler/Compiler';
import { cProblems } from './data/cProblems';

// --- Animation Components ---
const pageVariants = {
  initial: { opacity: 0, y: 15 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -15 }
};
const pageTransition = { type: 'tween', ease: 'easeOut', duration: 0.3 };

const PageTransition = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
);

// --- CodeSpace Wrapper ---
const CodeSpaceWrapper = ({ candidateName }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const problemIndex = parseInt(index, 10) || 0;
  const problem = cProblems[problemIndex];

  const { ipcRenderer } = window.require ? window.require('electron') : {};

  // Lock Kiosk Mode
  useEffect(() => {
    if (problem && ipcRenderer) {
      ipcRenderer.send('enter-kiosk');
    }
    return () => {
      // Unlock when leaving this component
      if (ipcRenderer) ipcRenderer.send('exit-kiosk');
    };
  }, [problem, ipcRenderer]);

  if (!problem) return <Navigate to="/" />;

  const handleNext = () => {
    if (problemIndex + 1 < cProblems.length) {
      navigate(`/practice/c/${problemIndex + 1}`);
    } else {
      alert("Congratulations! You have completed the C Programming Course.");
      localStorage.removeItem('c_course_progress');
      navigate('/');
    }
  };

  const enhancedProblem = {
    ...problem,
    onNext: handleNext
  };

  return (
    <CodeSpace
      key={problem.id}
      problemData={enhancedProblem}
      candidateName={candidateName}
      onExit={() => navigate('/')}
    />
  );
};

// --- Main App Component ---
function App() {
  const [candidateName, setCandidateName] = useState('Test Candidate');
  const [score, setScore] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { ipcRenderer } = window.require ? window.require('electron') : {};

  // --- Initial Setup ---
  useEffect(() => {
    console.log("%c[System] Interview Tester loaded securely.", "color: #00f2ff; font-weight: bold;");
  }, []);

  // --- Global Key Handler ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Only confirm exit if not on specific pages? 
        // Original app had global escape to exit.
        if (window.confirm("Are you sure you want to exit the application?")) {
          if (ipcRenderer) ipcRenderer.send('exit-app');
          else window.close();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ipcRenderer]);

  // --- Handlers ---
  const handleLogin = (role, name) => {
    if (role === 'super_admin') navigate('/super-admin');
    else if (role === 'sub_admin') navigate('/admin');
    else {
      setCandidateName(name);
      navigate('/');
    }
  };

  const handlePracticeStart = (type, index = 0) => {
    if (type === 'c-programming') {
      if (index === 0) {
        const saved = localStorage.getItem('c_course_progress');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && window.confirm(`Resume from Question ${parsed + 1}?`)) {
            index = parsed;
          }
        }
      }
      localStorage.setItem('c_course_progress', index.toString());
      navigate(`/practice/c/${index}`);
    } else {
      navigate('/compiler');
    }
  };

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
    navigate('/result');
    if (ipcRenderer) ipcRenderer.send('exit-kiosk');
  };

  // --- Global Navbar ---
  const showNavbar = location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/compiler';
  // Don't show navbar in CodeSpace or Login usually, to maximize space. 
  // Original app showed it everywhere but Login?
  // Let's mimic original behavior: visible mostly everywhere.

  const handleAppExit = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      if (ipcRenderer) ipcRenderer.send('exit-app');
      else window.close();
    }
  };

  return (
    <div className="app-wrapper">
      {/* Universal Navbar */}
      <nav className="glass" style={{
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderRadius: '0 0 16px 16px',
        zIndex: 100,
        position: 'sticky',
        top: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Terminal color="var(--primary)" size={28} />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Interview<span style={{ color: 'var(--primary)' }}>Tester</span>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {location.pathname === '/' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-purple" style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} />
                {candidateName}
              </span>
              <button
                className="btn-icon"
                onClick={handleAppExit}
                title="Exit Application"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Dashboard */}
          <Route path="/" element={
            <PageTransition>
              <Dashboard
                candidateName={candidateName}
                onStart={() => navigate('/pre-check')}
                onPractice={handlePracticeStart}
              />
            </PageTransition>
          } />

          {/* Login */}
          <Route path="/login" element={
            <PageTransition>
              <Login onLogin={handleLogin} />
            </PageTransition>
          } />

          {/* Admin */}
          <Route path="/admin" element={
            <PageTransition><AdminDashboard /></PageTransition>
          } />
          <Route path="/super-admin" element={
            <PageTransition>
              <SuperAdminDashboard onLogout={() => navigate('/login')} />
            </PageTransition>
          } />

          {/* Quiz Flow */}
          <Route path="/pre-check" element={
            <PageTransition>
              <PreTestCheck
                onProceed={() => navigate('/quiz')}
                onBack={() => navigate('/')}
              />
            </PageTransition>
          } />

          <Route path="/quiz" element={
            <PageTransition>
              {/* Reuse Proctoring logic inside Quiz or here? 
                      Original had <Proctoring> rendered separately for video overlay.
                      We can add it here as a fragment.
                  */}
              <>
                <Proctoring candidateName={candidateName} score={score} isFinished={false} />
                <Quiz onFinish={handleFinishQuiz} />
              </>
            </PageTransition>
          } />

          <Route path="/result" element={
            <PageTransition>
              <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center' }}>
                <Proctoring candidateName={candidateName} score={score} isFinished={true} />
                <h1 className="text-gradient">Test Completed</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '1rem 0' }}>
                  Your performance has been logged to the secure central server.
                </p>
                <div className="glass card" style={{ padding: '3rem', margin: '2rem 0', minWidth: '300px' }}>
                  <div style={{ color: 'var(--text-secondary)', letterSpacing: '2px', fontSize: '0.9rem' }}>FINAL SCORE</div>
                  <div style={{ fontSize: '5rem', color: 'var(--primary)', fontWeight: 'bold', textShadow: '0 0 30px var(--primary-glow)' }}>{score} / 10</div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Return to Dashboard</button>
              </div>
            </PageTransition>
          } />

          {/* Practice / Coding */}
          <Route path="/compiler" element={
            <PageTransition>
              <Compiler onExit={() => navigate('/')} />
            </PageTransition>
          } />

          <Route path="/practice/c/:index" element={
            <PageTransition>
              <CodeSpaceWrapper candidateName={candidateName} />
            </PageTransition>
          } />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
