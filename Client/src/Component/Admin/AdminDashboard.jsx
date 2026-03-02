import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaChartLine, FaShieldAlt, FaTrophy } from 'react-icons/fa';
import GuildLoading from '../Dashboard/GuildLoading';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [systemStats, setSystemStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [usersRes, statsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', { withCredentials: true }),
                    axios.get('http://localhost:5000/api/admin/stats', { withCredentials: true })
                ]);

                setUsers(usersRes.data);
                setSystemStats(statsRes.data);
            } catch (err) {
                console.error("Admin Fetch Error:", err);
                setError("Failed to load admin data. You might not have permission.");
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) return <GuildLoading />;
    if (error) return <div className="rpg-dashboard" style={{ textAlign: 'center', padding: '50px', color: 'red' }}><h2>{error}</h2></div>;

    return (
        <div className="rpg-dashboard" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <header className="char-header" style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                <h1 style={{ fontFamily: "'Cinzel', serif", color: '#ffd700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaShieldAlt /> Game Master Console
                </h1>
                <p style={{ color: '#a0a0a0' }}>Manage the realm and oversee all heroes.</p>
            </header>

            {/* System Stats Cards */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '40px' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1e1e2f, #161621)', border: '1px solid #ffd70044' }}>
                    <div className="stat-icon" style={{ color: '#ffd700' }}><FaUsers /></div>
                    <div className="stat-content">
                        <span className="stat-label">Total Heroes</span>
                        <span className="stat-value">{systemStats?.totalUsers || 0}</span>
                    </div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1e1e2f, #161621)', border: '1px solid #00d4ff44' }}>
                    <div className="stat-icon" style={{ color: '#00d4ff' }}><FaChartLine /></div>
                    <div className="stat-content">
                        <span className="stat-label">Total Steps Tracked</span>
                        <span className="stat-value">{systemStats?.totalSteps?.toLocaleString() || 0}</span>
                    </div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1e1e2f, #161621)', border: '1px solid #ff4b4b44' }}>
                    <div className="stat-icon" style={{ color: '#ff4b4b' }}><FaTrophy /></div>
                    <div className="stat-content">
                        <span className="stat-label">Total XP Distributed</span>
                        <span className="stat-value">{systemStats?.totalXP?.toLocaleString() || 0}</span>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="dashboard-section" style={{ background: 'rgba(20, 20, 30, 0.6)', padding: '20px', borderRadius: '12px' }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: '#e0e0e0', marginBottom: '20px' }}>Hero Roster</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e0e0e0' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
                                <th style={{ padding: '12px', color: '#ffd700' }}>Hero Name</th>
                                <th style={{ padding: '12px', color: '#ffd700' }}>Email</th>
                                <th style={{ padding: '12px', color: '#ffd700' }}>Level</th>
                                <th style={{ padding: '12px', color: '#ffd700' }}>Role</th>
                                <th style={{ padding: '12px', color: '#ffd700' }}>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.name}</td>
                                    <td style={{ padding: '12px', opacity: 0.8 }}>{user.email}</td>
                                    <td style={{ padding: '12px' }}><span className="level-badge" style={{ fontSize: '0.8rem' }}>LVL {user.level}</span></td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            background: user.role === 'admin' ? '#ffd70022' : '#333',
                                            color: user.role === 'admin' ? '#ffd700' : '#a0a0a0',
                                            border: user.role === 'admin' ? '1px solid #ffd700' : 'none',
                                            fontSize: '0.8rem'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', opacity: 0.6 }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
