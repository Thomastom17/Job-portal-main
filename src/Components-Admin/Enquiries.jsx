import React, { useState } from 'react'
import './Enquiries.css'
import Enquiry from '../assets/AdminAssets/Enquires.png';
import Delete from '../assets/AdminAssets/DeleteIcon.png';
import { useJobs } from '../JobContext';

export const Enquiries = () => {
    const { enquiries, setEnquiries } = useJobs()
    const [selectedEnquiry, setSelectedEnquiry] = useState(null)

    const formatDate = (dateStr) => {
        if (!dateStr) return "May 15, 2026";
        try {
            if (isNaN(Number(dateStr.split('/')[0])) && isNaN(Number(dateStr.split('-')[0]))) {
                return dateStr;
            }

            let parsedDate;
            if (dateStr.includes('/')) {
                const [day, month, year] = dateStr.split('/');
                parsedDate = new Date(`${year}-${month}-${day}`);
            } else {
                parsedDate = new Date(dateStr);
            }

            if (isNaN(parsedDate.getTime())) return dateStr;

            return parsedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    const getSortedEnquiries = () => {
        if (!enquiries || enquiries.length === 0) return [];
        return [...enquiries].sort((a, b) => {
            if (a.status === "Pending" && b.status !== "Pending") return -1;
            if (a.status !== "Pending" && b.status === "Pending") return 1;
            return 0;
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            const updatedEnquiries = enquiries.filter(item => item.id !== id);
            setEnquiries(updatedEnquiries);
            setSelectedEnquiry(null);
        }
    };

    const sortedData = getSortedEnquiries();
    if (selectedEnquiry) {
        return (
            <div className="Enquiries-container">
                <div className="Enquiries-header">
                    <div>
                        <h2>Enquiry Details</h2>
                    </div>
                </div>
                <div className="enq-details-actions-bar">
                    <button className="enq-back-to-contact-btn" onClick={() => setSelectedEnquiry(null)}>
                        ← Back to Contact Us
                    </button>
                    <button className="enq-delete-action-btn" onClick={() => handleDelete(selectedEnquiry.id)}>
                        <img src={Delete} alt="Delete" /> Delete
                    </button>
                </div>

                <div className="enq-details-main-content">
                    <div className="enq-details-left-pane">
                        <div className="enq-ticket-meta-box">
                            <img src={Enquiry} alt="Enquiry" className="enq-details-status-img" />
                            <div>
                                <h3 className="enq-details-id-title">
                                    {selectedEnquiry.id?.startsWith('#ENQ') ? `CT-2026-001` : selectedEnquiry.id}
                                </h3>
                                <p className="enq-details-created-on">
                                    Created on : {selectedEnquiry.date && selectedEnquiry.time
                                        ? `${selectedEnquiry.date}, ${selectedEnquiry.time}`
                                        : (selectedEnquiry.date)}
                                </p>
                            </div>
                        </div>

                        <div className="enq-details-msg-block">
                            <h4>Enquiry details</h4>
                            <p className="enq-details-msg-text">{selectedEnquiry.message || selectedEnquiry.explanation}</p>
                        </div>

                        <div className="enq-details-user-block">
                            <h4>User Information</h4>
                            <div className="enq-details-user-grid">
                                <span className="enq-grid-label">Name</span>
                                <span className="enq-grid-value blue-name">
                                    : {selectedEnquiry.name || `${selectedEnquiry.firstName || ''} ${selectedEnquiry.lastName || ''}`.trim()}
                                </span>

                                <span className="enq-grid-label">Mobile number</span>
                                <span className="enq-grid-value">: {selectedEnquiry.contact || selectedEnquiry.mobile}</span>

                                <span className="enq-grid-label">Mail ID</span>
                                <span className="enq-grid-value">: {selectedEnquiry.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="Enquiries-container">
            <div className="Enquiries-header" style={{ marginTop: '30px' }}>
                <div>
                    <h2>Newly received enquiry</h2>
                    <p>List of newly received enquiries on this portal</p>
                </div>
            </div>

            <div className="Enquiries-table-wrapper">
                <table className="Enquiries-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Enquiry</th>
                            <th>User</th>
                            <th>Received at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td style={{ fontWeight: '600' }}>
                                        {item.id?.startsWith('#ENQ') ? `CT-2026-00${index + 1}` : item.id}
                                    </td>
                                    <td>{item.message || item.reason}</td>
                                    <td style={{ fontWeight: '600' }}>
                                        {item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim()}
                                    </td>

                                    <td>
                                        <div style={{ fontWeight: '500', color: '#111827' }}>
                                            {formatDate(item.date)}
                                        </div>
                                        <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '3px' }}>
                                            {item.time || "10:15 PM"}
                                        </div>
                                    </td>

                                    <td>
                                        <button
                                            className="enq-table-view-action-btn"
                                            style={{
                                                    background: "#1E88E5", color: "white", borderRadius: "5px",
                                                    padding: "7px 10px", outline: "none", border: "none"
                                                }} 
                                            onClick={() => setSelectedEnquiry(item)}
                                        >
                                         View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                    No Enquiries Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}