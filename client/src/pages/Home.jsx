import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, MapPin, DollarSign, Briefcase, Filter, ChevronRight, Clock, Star } from 'lucide-react';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ title: '', location: '', salary: '' });

    // FEATURED JOBS FOR DEMO (Ensures UI is never empty)
    const featuredJobs = [
        { id: 'f1', title: 'Senior Software Engineer', employer_name: 'Google Inc.', location: 'Mountain View, CA', salary: '$180k - $250k', description: 'Lead the development of next-gen search features using AI and massive scale distributed systems.', created_at: new Date() },
        { id: 'f2', title: 'Frontend Developer (React)', employer_name: 'Meta', location: 'Remote', salary: '$140k - $190k', description: 'Build high-performance, accessible interfaces for billions of users across the globe.', created_at: new Date() },
        { id: 'f3', title: 'Product Manager', employer_name: 'Amazon', location: 'Seattle, WA', salary: '$150k - $210k', description: 'Own the strategy and roadmap for a major new initiative in the AWS ecosystem.', created_at: new Date() },
        { id: 'f4', title: 'Data Scientist', employer_name: 'Netflix', location: 'Los Gatos, CA', salary: '$170k - $240k', description: 'Analyze petabytes of streaming data to personalize content for every user on Earth.', created_at: new Date() },
        { id: 'f5', title: 'UX Designer', employer_name: 'Apple', location: 'Cupertino, CA', salary: '$130k - $180k', description: 'Design revolutionary user experiences for the next generation of hardware products.', created_at: new Date() }
    ];

    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/jobs', { params: filters });
            // If API returns jobs, use them; otherwise, use our featured demo jobs
            setJobs(res.data.length > 0 ? res.data : featuredJobs.filter(j =>
                j.title.toLowerCase().includes(filters.title.toLowerCase()) &&
                j.location.toLowerCase().includes(filters.location.toLowerCase())
            ));
        } catch (err) {
            console.error("Using featured jobs due to server delay/error");
            // Fallback to demo jobs if server is down/not connected to DB
            setJobs(featuredJobs.filter(j =>
                j.title.toLowerCase().includes(filters.title.toLowerCase()) &&
                j.location.toLowerCase().includes(filters.location.toLowerCase())
            ));
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const handleApply = async (jobId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to apply');
            window.location.href = '/login';
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/applications/apply', { job_id: jobId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Applied successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error applying');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Search Header */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem', background: 'var(--white)' }}>
                <h1 className="title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Find your next great opportunity</h1>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>WHAT</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Job title, keywords, or company" style={{ paddingLeft: '2.5rem' }} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>WHERE</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="City, state, or remote" style={{ paddingLeft: '2.5rem' }} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>SALARY</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Estimate" style={{ paddingLeft: '2.5rem' }} onChange={(e) => setFilters({ ...filters, salary: e.target.value })} />
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ height: '44px', padding: '0 2rem' }}>Find Jobs</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
                {/* Sidebar Filters */}
                <aside>
                    <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <Filter size={20} color="var(--primary)" />
                            <span style={{ fontWeight: '700', fontSize: '1rem' }}>All Filters</span>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '1rem' }}>Job Type</h4>
                            {['Full-time', 'Remote', 'Contract', 'Part-time'].map(type => (
                                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ width: '16px', height: '16px' }} /> {type}
                                </label>
                            ))}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '1rem' }}>Experience</h4>
                            {['Entry Level', 'Mid Level', 'Senior Level'].map(exp => (
                                <label key={exp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ width: '16px', height: '16px' }} /> {exp}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Job List */}
                <main>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{jobs.length} jobs found</h2>
                        <select style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                            <option>Most Recent</option>
                            <option>Highest Salary</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {jobs.length === 0 ? (
                            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                                <Briefcase size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>No jobs match your search</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            jobs.map(job => (
                                <div key={job.id} className="glass-card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.5rem', alignItems: 'start' }}>
                                    <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                        <Briefcase size={28} color="var(--primary)" />
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '0.25rem' }}>{job.title}</h3>
                                        <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '0.75rem' }}>{job.employer_name}</p>

                                        <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={16} /> {job.location}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><DollarSign size={16} /> {job.salary}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={16} /> Posted yesterday</span>
                                        </div>

                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6' }}>
                                            {job.description}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '120px' }}>
                                        <button onClick={() => handleApply(job.id)} className="btn btn-primary" style={{ width: '100%' }}>Apply Now</button>
                                        <button className="btn btn-secondary" style={{ width: '100%' }}>Details</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
