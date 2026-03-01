import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, Briefcase, MapPin, DollarSign, User } from 'lucide-react';

const EmployeeDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [user, setUser] = useState(null);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/applications/employee', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchApplications();
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={20} color="#d97706" />;
            case 'shortlisted': return <CheckCircle size={20} color="#059669" />;
            case 'rejected': return <XCircle size={20} color="#dc2626" />;
            default: return <Clock size={20} color="#64748b" />;
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b' }}>Candidate Dashboard</h1>
                    <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Track your applications and manage your profile.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>
                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                        <div style={{ padding: '2rem', background: '#eef2ff', borderRadius: 'full', border: '5px solid #f8fafc', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.1)' }}>
                            <User size={64} color="#4f46e5" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user?.name || 'Candidate Name'}</h2>
                            <p style={{ color: '#64748b', fontSize: '1rem' }}>Software Engineer Intern</p>
                        </div>

                        <div style={{ width: '100%', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>Skill Highlights</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['React.js', 'Node.js', 'MySQL', 'Full-stack'].map(skill => (
                                        <span key={skill} style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="btn" style={{ background: '#f1f5f9', color: '#4f46e5', width: '100%', fontSize: '0.875rem' }}>Edit Profile</button>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Briefcase size={24} color="#4f46e5" /> Your Applications ({applications.length})
                    </h2>

                    {applications.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>You haven't applied to any jobs yet.</p>
                            <a href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>Browse Jobs</a>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {applications.map(app => (
                                <div key={app.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                        <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '1rem' }}>
                                            <Briefcase size={24} color="#64748b" />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>{app.job_title}</h3>
                                            <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {app.location}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {new Date(app.applied_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '2rem', background: app.status === 'pending' ? '#fef3c7' : app.status === 'shortlisted' ? '#d1fae5' : '#fee2e2' }}>
                                            {getStatusIcon(app.status)}
                                            <span style={{ color: app.status === 'pending' ? '#b45309' : app.status === 'shortlisted' ? '#065f46' : '#991b1b', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase' }}>{app.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
