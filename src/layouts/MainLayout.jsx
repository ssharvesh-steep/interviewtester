import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children, candidateName, onLogout, showSidebar = true }) => {
    return (
        <div className="layout-wrapper">
            {showSidebar && <Sidebar candidateName={candidateName} onLogout={onLogout} />}
            <main className="main-content">
                <div className="content-inner custom-scroll">
                    {children}
                </div>
            </main>

            <style>{`
                .layout-wrapper {
                    display: flex;
                    height: 100vh;
                    overflow: hidden;
                    background: var(--bg-color);
                }

                .main-content {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .content-inner {
                    flex: 1;
                    overflow-y: auto;
                    padding: 2rem;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default MainLayout;
