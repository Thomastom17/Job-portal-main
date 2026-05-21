import React, { useState } from 'react'
import './SupportHub.css'
import { AdminTickets } from './AdminTickets'
import { Enquiries } from './Enquiries'
import { AdminReportAJob } from './AdminReportAJob'
// import { Tickets } from './AdminTickets'
// import { Escalation } from './Escalation'
// import { Enquiries } from './Enquiries'
 
export const SupportHub = () => {
    const [activeTab, setActiveTab] = useState("Tickets")
 
    return (
        <div className="SupportHub-container">
            <div className="SupportHub-tabs">
                <button className={`Ad-Settings-select ${activeTab === "Tickets" ? "Ad-Settings-active": ""}`}
                    onClick={() => setActiveTab("Tickets")}
                >
                    Tickets
                </button>
               
                <button className={`Ad-Settings-select ${activeTab === "ReportAJob" ? "Ad-Settings-active": ""}`}
                    onClick={() => setActiveTab("ReportAJob") }
                >
                    Report A Job        {/* Escalation,Fraud Reports,Complaints,Flagged jobs, */}
                </button>
 
                <button className={`Ad-Settings-select ${activeTab === "Enquiries" ? "Ad-Settings-active": ""}`}
                    onClick={() => setActiveTab("Enquiries")}
                >
                    Enquiries
                </button>
            </div>
 
            <div className="SupportHub-content">
                {activeTab === "Tickets" && ( <AdminTickets/> )}
                {activeTab === "ReportAJob" && ( <AdminReportAJob/>)}
                {activeTab === "Enquiries" && ( <Enquiries/>)} 
            </div>
        </div>
    )
}
 