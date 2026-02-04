import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, LogOut, Shield } from 'lucide-react';

import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Proctoring from './components/Proctoring';
import Login from './components/Login';
import AdminDashboard from './components/Admin/Dashboard';
import SuperAdminDashboard from './components/Admin/SuperAdminDashboard';
import PreTestCheck from './components/PreTestCheck';
import CodeSpace from './components/CodeSpace/CodeSpace';
import Compiler from './components/Compiler/Compiler';
import { cProblems } from './data/cProblems';
import { pythonProblems } from './data/pythonProblems';
import ErrorBoundary from './components/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import { Challenges, History, Profile, Settings } from './components/Placeholders';

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

// --- CodeSpace Wrapper (Generic) ---
const CodeSpaceWrapper = ({ candidateName, problems, courseType }) => {
  const { index } = useParams();
  const navigate = useNavigate();

  // Resolve index param: support numeric index or problem id string
  let problemIndex = 0;
  if (typeof index === 'string' && index.length > 0) {
    const parsed = parseInt(index, 10);
    if (!isNaN(parsed) && parsed.toString() === index) {
      problemIndex = parsed;
    } else {
      // try finding by id
      const found = problems.findIndex(p => String(p.id) === index);
      problemIndex = found >= 0 ? found : 0;
    }
  }

  // Safe data access with bounds checking
  const problem = (Array.isArray(problems) && problemIndex >= 0 && problemIndex < problems.length)
    ? problems[problemIndex]
    : null;

  // Secure data access
  const electronAPI = window.electronAPI;

  // Lock Kiosk Mode
  useEffect(() => {
    if (problem && electronAPI) {
      electronAPI.send('enter-kiosk');
    }
    return () => {
      // Unlock when leaving this component
      if (electronAPI) electronAPI.send('exit-kiosk');
    };
  }, [problem, electronAPI]);

  const handleNext = () => {
    try {
      console.log('[App] handleNext called', { problemIndex, total: problems.length });
      if (problem && problemIndex + 1 < problems.length) {
        const nextIndex = problemIndex + 1;
        const storageKey = `${courseType}_progress`;
        localStorage.setItem(storageKey, nextIndex.toString());
        navigate(`/practice/${courseType}/${nextIndex}`, { replace: false });
      } else {
        localStorage.removeItem(`${courseType}_progress`);
        navigate('/');
      }
    } catch (err) {
      console.error('[App] navigate failed in handleNext', err);
    }
  };

  const handlePrevious = () => {
    if (problemIndex > 0) {
      const prevIndex = problemIndex - 1;
      const storageKey = `${courseType}_progress`;
      localStorage.setItem(storageKey, prevIndex.toString());
      navigate(`/practice/${courseType}/${prevIndex}`, { replace: false });
    }
  };

  // 1. DATA LOADING CHECK
  if (!problem) {
    // If problemIndex is invalid, redirect to first problem
    if (problemIndex < 0 || problemIndex >= problems.length) {
      console.warn('[App] Invalid problemIndex:', problemIndex, 'for param index:', index);
      return <Navigate to={`/practice/${courseType}/0`} replace />;
    }
    // Render loading state
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        background: '#030304'
      }}>
        <h2>Loading Problem...</h2>
      </div>
    );
  }

  const enhancedProblem = {
    ...problem,
    onNext: handleNext,
    onPrevious: problemIndex > 0 ? handlePrevious : null
  };

  return (
    <ErrorBoundary>
      <CodeSpace
        key={problem.id}
        problemData={enhancedProblem}
        candidateName={candidateName}
        onExit={() => navigate('/')}
      />
    </ErrorBoundary>
  );
};

// --- Main App Component ---
function App() {
  const [candidateName, setCandidateName] = useState(null);
  const [score, setScore] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  // Secure IPC Access
  const electronAPI = window.electronAPI;

  console.log('App Rendering. Location:', location.pathname, 'Candidate:', candidateName);

  // --- Initial Setup ---
  useEffect(() => {
    console.log("%c[System] Interview Tester loaded securely.", "color: #00f2ff; font-weight: bold;");

    // Auth Check
    if (!candidateName && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [candidateName, location, navigate]);

  // --- Global Key Handler ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (electronAPI) electronAPI.send('exit-app');
        else window.close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [electronAPI]);

  // --- Handlers ---
  const handleLogin = (role, name) => {
    setCandidateName(name); // Set auth state for all roles
    if (role === 'super_admin') navigate('/super-admin');
    else if (role === 'sub_admin') navigate('/admin');
    else {
      navigate('/');
    }
  };

  const handlePracticeStart = (type, index = 0) => {
    if (type === 'c-programming') {
      if (index === 0) {
        const saved = localStorage.getItem('c_progress');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed)) index = parsed;
        }
      }
      navigate(`/practice/c/${index}`);
    } else if (type === 'python') {
      if (index === 0) {
        const saved = localStorage.getItem('python_progress');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed)) index = parsed;
        }
      }
      navigate(`/practice/python/${index}`);
    } else {
      navigate('/compiler');
    }
  };

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
    navigate('/result');
    if (electronAPI) electronAPI.send('exit-kiosk');
  };

  // --- Global Navbar ---
  const showNavbar = location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/compiler';
  // Don't show navbar in CodeSpace or Login usually, to maximize space. 
  // Original app showed it everywhere but Login?
  // Let's mimic original behavior: visible mostly everywhere.

  const handleAppExit = () => {
    if (electronAPI) electronAPI.send('exit-app');
    else window.close();
  };

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Dashboard */}
          <Route path="/" element={
            <MainLayout candidateName={candidateName} onLogout={handleAppExit}>
              <PageTransition>
                <Dashboard
                  candidateName={candidateName}
                  onStart={() => navigate('/pre-check')}
                  onPractice={handlePracticeStart}
                />
              </PageTransition>
            </MainLayout>
          } />

          {/* Sidebar Routes */}
          <Route path="/challenges" element={
            <MainLayout candidateName={candidateName} onLogout={handleAppExit}>
              <PageTransition><Challenges /></PageTransition>
            </MainLayout>
          } />
          <Route path="/history" element={
            <MainLayout candidateName={candidateName} onLogout={handleAppExit}>
              <PageTransition><History /></PageTransition>
            </MainLayout>
          } />
          <Route path="/profile" element={
            <MainLayout candidateName={candidateName} onLogout={handleAppExit}>
              <PageTransition><Profile /></PageTransition>
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout candidateName={candidateName} onLogout={handleAppExit}>
              <PageTransition><Settings /></PageTransition>
            </MainLayout>
          } />

          {/* Login */}
          <Route path="/login" element={
            <PageTransition>
              <Login onLogin={handleLogin} />
            </PageTransition>
          } />

          {/* Admin */}
          <Route path="/admin" element={
            <MainLayout candidateName="Admin" onLogout={() => navigate('/login')} showSidebar={false}>
              <PageTransition><AdminDashboard /></PageTransition>
            </MainLayout>
          } />
          <Route path="/super-admin" element={
            <MainLayout candidateName="Super Admin" onLogout={() => navigate('/login')} showSidebar={false}>
              <PageTransition>
                <SuperAdminDashboard onLogout={() => navigate('/login')} />
              </PageTransition>
            </MainLayout>
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
            <CodeSpaceWrapper key={`c-${location.pathname}`} candidateName={candidateName} problems={cProblems} courseType="c" />
          } />
          <Route path="/practice/python/:index" element={
            <CodeSpaceWrapper key={`py-${location.pathname}`} candidateName={candidateName} problems={pythonProblems} courseType="python" />
          } />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
