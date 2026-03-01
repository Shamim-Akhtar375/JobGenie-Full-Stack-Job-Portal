import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserPlus, Briefcase, UserCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '480px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: '#eef2ff', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                        <UserPlus size={40} color="#4f46e5" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>Create Account</h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Join the community and explore opportunities.</p>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input type="text" placeholder="Full Name" style={{ padding: '0.875rem 1rem 0.875rem 3rem', width: '100%', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc' }} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input type="email" placeholder="Email address" style={{ padding: '0.875rem 1rem 0.875rem 3rem', width: '100%', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc' }} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input type="password" placeholder="Password" style={{ padding: '0.875rem 1rem 0.875rem 3rem', width: '100%', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc' }} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={() => setFormData({ ...formData, role: 'employee' })} style={{ flex: 1, padding: '1rem', border: '2px solid', borderColor: formData.role === 'employee' ? '#4f46e5' : '#e2e8f0', borderRadius: '1rem', background: formData.role === 'employee' ? '#eef2ff' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', color: formData.role === 'employee' ? '#4f46e5' : '#64748b' }}>
                            <UserCheck size={20} /> Job Seeker
                        </button>
                        <button type="button" onClick={() => setFormData({ ...formData, role: 'employer' })} style={{ flex: 1, padding: '1rem', border: '2px solid', borderColor: formData.role === 'employer' ? '#4f46e5' : '#e2e8f0', borderRadius: '1rem', background: formData.role === 'employer' ? '#eef2ff' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', color: formData.role === 'employer' ? '#4f46e5' : '#64748b' }}>
                            <Briefcase size={20} /> Employer
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', marginTop: '1.5rem' }}>Get Started</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
                    Already have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
