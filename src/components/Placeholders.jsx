import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div className="glass card" style={{ padding: '2rem', height: '100%' }}>
        <h2>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            This module is currently under development.
        </p>
    </div>
);

export const Challenges = () => <PlaceholderPage title="Challenge Library" />;
export const History = () => <PlaceholderPage title="Submission History" />;
export const Profile = () => <PlaceholderPage title="User Profile" />;
export const Settings = () => <PlaceholderPage title="Application Settings" />;
