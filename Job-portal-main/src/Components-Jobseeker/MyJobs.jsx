import React, { useState } from 'react'
import './MyJobs.css'
import { Footer } from '../Components-LandingPage/Footer';
import { SavedJobsCard } from './SavedJobsCard';
import { AppliedJobCard } from './AppliedJobCard';
import { Header } from '../Components-LandingPage/Header';
import { useJobs } from '../JobContext';

export const MyJobs = () => {
    const { savedJobs, appliedJobs } = useJobs();

    const [activeTab, setActiveTab] = useState("saved");

    return (
        <>
            <Header />
            <main>
                <div className='myjobs-main-info'>
                    <h1>My Jobs</h1>
                    <p>View and manage the jobs you've saved, applied for, or shortlisted—all in one place.</p>
                </div>

                <div>
                    <div className="toggle-myjobs-main">
                        <button
                            className={`myjobs-select ${activeTab === "saved" ? "active" : ""}`}
                            onClick={() => setActiveTab("saved")}
                        >
                            Saved ({savedJobs.length})
                        </button>
                        <button
                            className={`myjobs-select ${activeTab === "applied" ? "active" : ""}`}
                            onClick={() => setActiveTab("applied")}
                        >
                            Applied ({appliedJobs.length})
                        </button>
                    </div>

                    {activeTab === "saved" ? (
                        <div className="my-jobs-common-container">
                            {savedJobs.map((job) => (
                                <SavedJobsCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className="my-jobs-common-container">
                            {appliedJobs.map((opp) => (
                                <AppliedJobCard key={opp.id} opp={opp} />
                            ))}
                        </div>
                    )}

                    {(activeTab === "saved" && savedJobs.length === 0) && (
                        <div className='toggle-no-my-jobs'>
                            <h2>No jobs saved yet</h2>
                            <p>Jobs you save appear here</p>
                        </div>
                    )}

                    {(activeTab === "applied" && appliedJobs.length === 0) && (
                        <div className='toggle-no-my-jobs'>
                            <h2>No jobs applied yet</h2>
                            <p>Jobs you apply appear here</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};