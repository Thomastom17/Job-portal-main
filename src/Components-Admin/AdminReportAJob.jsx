import React, { useState } from 'react';
import './AdminReportAJob.css';
import { useJobs } from '../JobContext';
import pencil from '../assets/ic_outline-edit.png';
import backIcon from '../assets/ic_round-arrow-back.png';
import victor from '../assets/victor.png'; 
import docIcon from '../assets/ri_progress-5-line.png'; 
import deleteIcon from '../assets/lsicon_delete-outline.png';
import eye from '../assets/mdi-light_eye.png';

export const AdminReportAJob = () => {
    const { reports, setReports } = useJobs();
    const [selectedReport, setSelectedReport] = useState(null);
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    const handleStatusChange = (ticketId, value) => {
        setReports((prev) =>
            prev.map((item) => item.id === ticketId ? { ...item, status: value } : item)
        );
        if (selectedReport && selectedReport.id === ticketId) {
            setSelectedReport((prev) => ({ ...prev, status: value }));
        }
        setIsEditingStatus(false);
    };

    const handleDeleteReport = (ticketId) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            setReports((prev) => prev.filter((item) => item.id !== ticketId));
            setSelectedReport(null);
            setIsEditingStatus(false);
        }
    };

    // 1. DETAIL VIEW SCREEN
    if (selectedReport) {
        const currentStatus = selectedReport.status || 'In Progress';
        const currentPriority = selectedReport.priority || 'Medium';

        return (
            <div className="RepAJob-detail-container">
                <h2 className="RepAJob-main-title">Report Information</h2>

                <div className="RepAJob-detail-actions">
                    <button className="RepAJob-btn-back" onClick={() => { setSelectedReport(null); setIsEditingStatus(false); }}>
                        <img src={backIcon} alt="back" className="btn-icon-img" />
                        Back to Reports
                    </button>
                    
                    <div className="RepAJob-action-group">
                        {isEditingStatus ? (
                            <select 
                                value={currentStatus} 
                                onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                                className="RepAJob-status-dropdown-select"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        ) : (
                            <div className="RepAJob-status-pill" data-status={currentStatus.toLowerCase().replace(" ", "")}>
                                <img src={docIcon} alt="status-doc" className="status-pill-icon" /> 
                                {currentStatus}
                            </div>
                        )}

                        <button className="RepAJob-btn-secondary" onClick={() => setIsEditingStatus(!isEditingStatus)}>
                            <img src={pencil} alt="edit-icon" className="btn-icon-img" />
                            Edit Status
                        </button>

                        <button className="RepAJob-btn-secondary RepAJob-delete" onClick={() => handleDeleteReport(selectedReport.id)}>
                            <img src={deleteIcon} alt="delete-icon" className="btn-icon-img" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="RepAJob-detail-card">
                    <div className="RepAJob-card-left">
                        <div className="RepAJob-doc-icon-box">
                            <img src={victor} alt="document" className="RepAJob-svg-icon" />
                        </div>
                        <div className="RepAJob-ticket-header">
                            <h3>{selectedReport.reason || "Unable to submit the project status"}</h3>
                            <span className="RepAJob-ticket-id">{selectedReport.id}</span>
                            <p className="RepAJob-timestamp">Created on : {selectedReport.date || "May 15, 2026, 12:15 PM"}</p>
                        </div>
                    </div>

                    <div className="RepAJob-card-right">
                        <div className="RepAJob-meta-row">
                            <span className="meta-label">
                             Priority
                            </span>
                            <span className="meta-separator">:</span>
                            <span className="meta-value-priority" data-priority={currentPriority.toLowerCase()}>
                                {currentPriority}
                            </span>
                        </div>
                        <div className="RepAJob-meta-row">
                            <span className="meta-label">
                             Status
                            </span>
                            <span className="meta-separator">:</span>
                            <span className="meta-value status-text">Opened</span>
                        </div>
                    </div>
                </div>

                <div className="RepAJob-grid-details">
                    <div className="RepAJob-section">
                        <h4>Report details</h4>
                        <p className="RepAJob-description-text">
                            An online job profile is like your own shop window. You can show employers what you have to offer, and make it easy for them to find you.
                        </p>
                    </div>

                    <div className="RepAJob-section">
                        <h4>User Information</h4>
                        <div className="RepAJob-user-info-table">
                            <div className="user-row">
                                <span className="user-label">Name</span>
                                <span className="user-sep">:</span>
                                <span className="user-value highlight-name">
                                    {selectedReport.firstName} {selectedReport.lastName}
                                </span>
                            </div>
                            <div className="user-row">
                                <span className="user-label">Mobile number</span>
                                <span className="user-sep">:</span>
                                <span className="user-value">{selectedReport.mobile || '+91 9876543210'}</span>
                            </div>
                            <div className="user-row">
                                <span className="user-label">Mail ID</span>
                                <span className="user-sep">:</span>
                                <span className="user-value highlight-email">{selectedReport.email || 'jobportal@gmail.com'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. MAIN TABLE SCREEN
    return (
        <div className="RepAJob-container">
            <div className="RepAJob-header">
                <div>
                    <h2>Newly received reports</h2>
                    <p>List of newly received reports for the job</p>
                </div>
            </div>
            <div className="RepAJob-table-wrapper">
                <table className="RepAJob-table">
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Subject</th>
                            <th>User</th>
                            <th>Priority</th>
                            <th>Received at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports && reports.length > 0 ? (
                            reports.map((item, index) => {
                                const itemPriority = item.priority || 'Medium';
                                return (
                                    <tr key={item.id || index}>
                                        <td className="bold-id">{item.id}</td>
                                        <td className="subject-cell">{item.reason || "Progress, project & status reports"}</td>
                                        <td className="user-name-cell">{item.firstName} {item.lastName}</td>
                                        <td>
                                            <span className="RepAJob-priority-badge" data-priority={itemPriority.toLowerCase()}>
                                                {itemPriority}
                                            </span>
                                        </td>
                                        <td className="date-cell">
                                            <div>{item.date?.split(',')[0] || "May 15, 2026"}</div>
                                            <div className="time-subtext">{item.date?.split(',')[1] || "12:15 PM"}</div>
                                        </td>
                                        <td>
                                            <button className="RepAJob-btn-view" onClick={() => setSelectedReport(item)}>
                                                <img src={eye} alt="eye-icon" className="view-btn-icon" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-reports-cell">
                                    No Reports Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};