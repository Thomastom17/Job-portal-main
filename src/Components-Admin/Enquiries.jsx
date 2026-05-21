import React, { useEffect, useState } from 'react'
import './Enquiries.css'
import { useJobs } from '../JobContext';
 
export const Enquiries = () => {
        const {enquiries, setEnquiries} = useJobs()

        const sortedEnquiries =enquiries.sort((a, b) => {
            if (a.status === "Pending" && b.status !== "Pending") {
                return -1;
            }
            if (a.status !== "Pending" && b.status === "Pending") {
                return 1;
            }                
            return 0;
        }); setEnquiries(sortedEnquiries)

 
    const handleStatusChange = (index,value) => {
        const updatedEnquiries =[...enquiries];
        updatedEnquiries[index].status =value;
 
        const sortedEnquiries =updatedEnquiries.sort((a, b) => {
            if (a.status === "Pending" && b.status !== "Pending") {
                return -1;
            }
            if (a.status !== "Pending" && b.status === "Pending") {
                return 1;
            }
            return 0;
        });
 
        const dynamicEnquiries = sortedEnquiries.filter(
            (item) =>item.id !== "#ENQ1001" && item.id !== "#ENQ1002"
        );
    };
 
    return (
        <div className="Enquiries-container">
            <div className="Enquiries-header">
                <div>
                    <h2>Jobseeker's Enquiries</h2>
                    <p>Manage all user contact requests</p>
                </div>
            </div>
 
            {/* Table */}
            <div className="Enquiries-table-wrapper">
                <table className="Enquiries-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                            <th>MESSAGE</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEnquiries.length > 0 ? (
                            sortedEnquiries.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        <select value={item.status}
                                            onChange={(e) =>handleStatusChange(index,e.target.value)}
                                            className={`Enquiries-status ${item.status.replace(" ", "")}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                        </select>
                                    </td>
                                    <td>{item.date}</td>
 
                                </tr>
                            ))
 
                        ) : (
                            <tr>
                                <td colSpan="7" style={{textAlign: "center", padding: "20px"}}>
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
 