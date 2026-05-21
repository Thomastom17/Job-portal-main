import React, { useEffect, useState, useMemo } from 'react';
import './Escalation.css';
import { useJobs } from '../JobContext';
 
export const Escalation = () => {
    const { reports, setReports } = useJobs();

 
    const handleStatusChange = (ticketId, value) => {
        setReports((prev) =>
            prev.map((item) => item.id === ticketId ? { ...item, status: value } : item)
        );
        setAllEscalations((prev) =>
            prev.map((item) => item.id === ticketId ? { ...item, status: value } : item)
        );
    };
 
    return (
        <div className="Escalation-container">
            <div className="Escalation-header">
                <div>
                    <h2>Fraud Reports</h2>
                    <p>Review and manage escalated complaints</p>
                </div>
            </div>
            <div className="Escalation-table-wrapper">
                <table className="Escalation-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>MOBILE</th>
                            <th>EMAIL</th>
                            <th>REASON</th>
                            <th>PRIORITY</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName}{" "}{item.lastName}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.reason}</td>                                
                                    <td><button className={`Escalation-priority ${item.priority}`}>{item.priority}</button></td>
                                    <td>
                                        <select
                                            value={item.status}
                                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                            className={`Escalation-status ${item.status.replace(" ", "")}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td>{item.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{textAlign: "center", padding: "20px"}}> No Escalations Found </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
 