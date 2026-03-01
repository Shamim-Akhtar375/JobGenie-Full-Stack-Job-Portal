import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Briefcase } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="glass-card" style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={32} color="#4f46e5" />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>JobGenie</span>
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Browse Jobs</Link>
                {user ? (
                    <>
                        <Link to={user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard'} style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Dashboard</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: '600' }}>
                            <User size={18} />
                            {user.name} ({user.role})
                        </div>
                        <button onClick={handleLogout} className="btn" style={{ background: '#fee2e2', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: '600' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
