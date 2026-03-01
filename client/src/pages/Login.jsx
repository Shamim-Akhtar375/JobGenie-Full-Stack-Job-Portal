import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, LogIn } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate(res.data.user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: '#eef2ff', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                        <LogIn size={40} color="#4f46e5" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>Welcome Back</h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{ padding: '1rem 1rem 1rem 3rem', width: '100%', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', transition: 'all 0.3s ease' }}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            style={{ padding: '1rem 1rem 1rem 3rem', width: '100%', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', transition: 'all 0.3s ease' }}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}>Sign In</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>Register Now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
