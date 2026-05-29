import React, { useState, useMemo, useEffect, useRef } from 'react';
import './JobMonitoring.css';
import { JobPreviewModal } from './JobPreviewModal';
import { useJobs } from '../JobContext';
import { JobMonitorOverview } from './JobMonitorOverview';

export const JobMonitoring = () => {
    const { jobs, setJobs, deleteJob } = useJobs();
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);
    const [filterType, setFilterType] = useState('Newest');
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenu !== null && menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeMenu]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const filteredJobs = useMemo(() => {
        let result = [...jobs];
        const now = new Date();

        const getDaysDiff = (dateStr) => {
            const date = new Date(dateStr);
            return (now - date) / (1000 * 60 * 60 * 24);
        };

        switch (filterType) {
            case 'Recent': case 'Newest':
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Last 10': result = result.slice(0, 10); break;
            case 'Last 20': result = result.slice(0, 20); break;
            case 'Flagged': result = result.filter(j => j.isFlagged); break;
            case 'Rejected': result = result.filter(j => j.status?.toLowerCase() === 'rejected'); break;
            case 'Approved': result = result.filter(j => j.status?.toLowerCase() === 'approved'); break;
            case 'Posted': result = result.filter(j => j.status?.toLowerCase() === 'posted'); break;
            case 'Updated': result = result.filter(j => j.status?.toLowerCase() === 'updated'); break;
            case '1 Day': result = result.filter(j => getDaysDiff(j.date) <= 1); break;
            case '1 Week': result = result.filter(j => getDaysDiff(j.date) <= 7); break;
            case '2 Week': result = result.filter(j => getDaysDiff(j.date) <= 8); break;
            case '1 Month': result = result.filter(j => getDaysDiff(j.date) <= 30); break;
            case '1 Year': result = result.filter(j => getDaysDiff(j.date) <= 365); break;
            default: break;
        }
        return result;
    }, [jobs, filterType]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredJobs.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredJobs.length / postsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterType]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActiveMenu(null);
    };

    const handleApprove = (id) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Approved' } : j));
        setActiveMenu(null); // Instantly closes control drop context
    };

    const handleReject = (id) => {
        if (window.confirm("Reject this job?")) {
            setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Rejected' } : j));
        }
        setActiveMenu(null);
    };

    const handleToggleFlag = (id) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, isFlagged: !j.isFlagged } : j));
        setActiveMenu(null);
    };

    const handleDeleteRow = (id) => {
        if (window.confirm("Permanent delete?")) {
            if (deleteJob) {
                deleteJob(id); // Connecting to your global Context implementation
            } else {
                setJobs(prev => prev.filter(j => j.id !== id));
            }
        }
        setActiveMenu(null);
    };

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        // If same clicked -> close, else shift menu container reference to target row item
        setActiveMenu(prev => prev === id ? null : id);
    };

    return(
        <>
        {!selectedJobId ? (
        <div className="job-monitoring-component">
            <div className="monitoring-header-top">
                <div className="header-text-group">
                    <h1 className="main-title">Job Monitoring</h1>
                    <p className="sub-title">Monitor and manage all job postings, application activity, and overall platform performance</p>
                </div>
            
            </div>

            <div className="monitoring-container">
                <div className="table-header">
                    <div>Id</div>
                    <div>Roles</div>
                    <div>Companies</div>
                    <div>Status</div>
                    <div>Posted Date</div>
                    <div>Actions</div>
                </div>

                {currentPosts.length > 0 ? (
                    currentPosts.map((job) => {
                        const currentStatus = (job.status || 'posted').toLowerCase();
                        return (
                            <div key={job.id} className={`job-row ${job.isFlagged ? 'flagged-row' : ''}`}>
                                <div className="cell id-col text-id">
                                    {job.id}
                                </div>

                                <div className="cell role-col">
                                    <span className="text-role">{job.title}</span>
                                    {job.isFlagged && <span className="flag-indicator" style={{ marginLeft: '6px' }}>🚩</span>}
                                </div>
                                <div className="cell company-col text-company">{job.company}</div>
                                
                                <div className="cell status-col">
                                    
                                    <span className={`status-pill ${currentStatus}`}>
                                        {currentStatus}
                                    </span>
                                </div>
                                
                                <div className="cell date-col text-date">{job.posted}</div>
                                
                                <div className="cell actions-col">
                                    <div className="action-icons-container" style={{ gap: '8px', position: 'relative' }}>
                                        <button 
                                            style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '13px' }}
                                            onClick={() => setSelectedJobId(job.id)}
                                        >
                                            View Detail
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-results">No jobs match this filter.</div>
                )}
                
                {/* Pagination Section */}
                {totalPages > 0 && (
                    <div className="pagination-bar">
                        <button
                            className="page-nav-btn"
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                        > &lt; </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`page-num-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="page-nav-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                        > &gt; </button>
                    </div>
                )}
            </div>
        </div>
        ) : (
            <>
                <div style={{ display: 'flex', marginBottom: '10px', padding: '0 30px' }}>
                    <button 
                        onClick={() => setSelectedJobId(null)} 
                        style={{ background: '#64748b', borderRadius:"6px", padding:"8px 16px", border: 'none', fontSize: '14px', cursor: 'pointer', fontWeight: '600', color: '#fff', transition: 'background 0.2s' }}
                    >← Back to Monitoring</button>
                </div>
                <JobMonitorOverview jobId={selectedJobId} setSelectedJobId={setSelectedJobId} />
            </>
        )}
    </>
    )
};