import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Users, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', description: '', location: '', salary: '' });
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [applications, setApplications] = useState([]);

    const token = localStorage.getItem('token');

    const fetchEmployerJobs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/jobs/employer', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/jobs', newJob, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Job posted successfully!');
            setShowPostForm(false);
            setNewJob({ title: '', description: '', location: '', salary: '' });
            fetchEmployerJobs();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to post job');
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchEmployerJobs();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete job');
        }
    };

    const fetchApplications = async (jobId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(res.data);
            setSelectedJobId(jobId);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateStatus = async (appId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/applications/${appId}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchApplications(selectedJobId);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update status');
        }
    };

    useEffect(() => {
        fetchEmployerJobs();
    }, []);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b' }}>Employer Dashboard</h1>
                    <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Manage your job listings and track applicants.</p>
                </div>
                {!showPostForm && (
                    <button onClick={() => setShowPostForm(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
                        <Plus size={20} /> Post New Job
                    </button>
                )}
            </div>

            {showPostForm && (
                <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Create New Job Posting</h2>
                    <form onSubmit={handlePostJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '500', color: '#64748b' }}>Job Title</label>
                                <input type="text" placeholder="e.g. Senior Backend Developer" style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '500', color: '#64748b' }}>Location</label>
                                <input type="text" placeholder="e.g. Remote, San Francisco" style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} required />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: '#64748b' }}>Salary Range</label>
                            <input type="text" placeholder="e.g. $80k - $120k / year" style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: '#64748b' }}>Detailed Description</label>
                            <textarea rows="5" placeholder="Include responsibilities, requirements, and benefits..." style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'none' }} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} required />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Publish Posting</button>
                            <button type="button" onClick={() => setShowPostForm(false)} className="btn" style={{ background: '#f1f5f9', color: '#64748b' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Briefcase size={24} color="#4f46e5" /> Your Active Postings
                    </h2>
                    {jobs.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem 0' }}>No jobs posted yet.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {jobs.map(job => (
                                <div key={job.id} onClick={() => fetchApplications(job.id)} className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer', border: selectedJobId === job.id ? '2px solid #4f46e5' : '1px solid #e2e8f0', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1e293b' }}>{job.title}</h3>
                                            <div style={{ display: 'flex', gap: '1rem', color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {job.location}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14} /> {job.salary}</span>
                                            </div>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteJob(job.id); }} style={{ padding: '0.5rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Users size={24} color="#4f46e5" /> {selectedJobId ? 'Job Applicants' : 'Select a Job to view applications'}
                    </h2>
                    {selectedJobId && applications.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem 0' }}>No candidates have applied yet.</p>
                    )}
                    {selectedJobId && applications.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {applications.map(app => (
                                <div key={app.id} className="glass-card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{app.applicant_name}</h4>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{app.applicant_email}</p>
                                        </div>
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold', background: app.status === 'pending' ? '#fef3c7' : app.status === 'shortlisted' ? '#d1fae5' : '#fee2e2', color: app.status === 'pending' ? '#d97706' : app.status === 'shortlisted' ? '#059669' : '#dc2626' }}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                        <button onClick={() => handleUpdateStatus(app.id, 'shortlisted')} className="btn" style={{ flex: 1, background: '#10b981', color: 'white', fontSize: '0.875rem', padding: '0.6rem' }}>Shortlist</button>
                                        <button onClick={() => handleUpdateStatus(app.id, 'rejected')} className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', fontSize: '0.875rem', padding: '0.6rem' }}>Reject</button>
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

export default EmployerDashboard;
