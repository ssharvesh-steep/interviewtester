import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Code, History, User, Settings, LogOut, Terminal } from 'lucide-react';

const Sidebar = ({ candidateName, onLogout }) => {
    const location = useLocation();

    const NavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
            }
        >
            <Icon size={20} />
            <span className="nav-label">{label}</span>
        </NavLink>
    );

    return (
        <aside className="sidebar glass">
            <div className="sidebar-header">
                <Terminal size={28} color="var(--primary)" />
                <span className="brand-name">CodeStream</span>
            </div>

            <nav className="sidebar-nav">
                <NavItem to="/" icon={Home} label="Dashboard" />
                <NavItem to="/challenges" icon={Code} label="Challenges" />
                <NavItem to="/history" icon={History} label="History" />
                <NavItem to="/profile" icon={User} label="Profile" />
                <NavItem to="/settings" icon={Settings} label="Settings" />
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">{candidateName ? candidateName.charAt(0) : '?'}</div>
                    <div className="user-details">
                        <span className="user-name">{candidateName || 'Guest'}</span>
                        <span className="user-role">Developer</span>
                    </div>
                </div>
                <button onClick={onLogout} className="btn-icon logout-btn" title="Exit">
                    <LogOut size={18} />
                </button>
            </div>

            <style>{`
                .sidebar {
                    width: 250px;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    border-right: 1px solid var(--border-color);
                    background: rgba(10, 10, 12, 0.95);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .sidebar-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 2.5rem;
                    padding-left: 0.5rem;
                }

                .brand-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    flex: 1;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0.85rem 1rem;
                    border-radius: 12px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: all 0.2s;
                    font-weight: 500;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-primary);
                }

                .nav-item.active {
                    background: rgba(0, 242, 255, 0.1);
                    color: var(--primary);
                }

                .sidebar-footer {
                    margin-top: auto;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    background: var(--bg-gradient);
                    border: 1px solid var(--primary);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: var(--primary);
                }

                .user-details {
                    display: flex;
                    flex-direction: column;
                }

                .user-name {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .user-role {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                }

                .logout-btn:hover {
                    color: var(--error);
                    background: rgba(255, 85, 85, 0.1);
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;
