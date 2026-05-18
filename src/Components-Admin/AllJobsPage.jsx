import React, { useState } from 'react';
import { useJobs } from '../JobContext';
import { EHeader } from '../Components-Employer/EHeader';
import './AllJobsPage.css';
 
export const AllJobsPage = () => {
    const { jobs } = useJobs();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const jobsPerPage = 6;
 
    const totalJobsCount = jobs?.length || 0;
    const totalPages = Math.ceil(totalJobsCount / jobsPerPage);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob) || [];
 
    const getPageNumbers = () => {
    let maxVisiblePages = Math.min(4, totalPages); 
    
    let start = Math.max(1, currentPage - 1);
    
    if (start + maxVisiblePages - 1 > totalPages) {
        start = Math.max(1, totalPages - maxVisiblePages + 1);
    }
    
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);  
    }
    return pages;
};
   const renderSkills = (skillsData) => {
    if (!skillsData) return <span className="aljobpg-no-skills">No specific skills listed</span>;
    
    let skillsArray = [];
    
    if (Array.isArray(skillsData)) {
        skillsArray = skillsData;
    } else if (typeof skillsData === 'string') {
        if (skillsData.includes(',')) {
            skillsArray = skillsData.split(',').map(s => s.trim());
        } 
        else {
            skillsArray = skillsData.split(/(?=[A-Z][a-z])|\s+/).map(s => s ? s.trim() : '');
        }
    }

    // Empty components checking
    const finalSkills = skillsArray.filter(Boolean);

    if (finalSkills.length === 0) return <span className="aljobpg-no-skills">No specific skills listed</span>;

    return finalSkills.map((skill, index) => (
        <span key={index} className="aljobpg-skill-chip">{skill}</span>
    ));
};
    const renderEducation = (eduData) => {
    if (!eduData) return <span className="aljobpg-no-skills">No specific education listed</span>;
    
    let eduArray = [];
    
    if (Array.isArray(eduData)) {
        eduArray = eduData;
    } else if (typeof eduData === 'string') {
        // Step 1: / moolama slash string irundha split panni, clean pannuvom
        // Step 2: "B.E.M.TechMCAMS" nu regex camel-case parsing panni separate pannuvom
        const formattedStr = eduData.replace(/\//g, ' / ');
        eduArray = formattedStr.split(/(?=[A-Z][a-z])|\s*\/\s*/).map(e => e ? e.trim() : '');
    }

    const finalEdu = eduArray.filter(Boolean);

    if (finalEdu.length === 0) return <span className="aljobpg-no-skills">No specific education listed</span>;

    return finalEdu.map((edu, index) => (
        <span key={index} className="aljobpg-edu-chip">{edu}</span>
    ));
};

 
    return (
        <div className="aljobpg-Full-Page-Wrapper">
            <EHeader />
            <div className="aljobpg-Main-Content">
                {selectedJob ? (
                    /* --- DETAIL VIEW --- */
                    <div className="aljobpg-Job-Detail-View-Layout">
                        <div className="aljobpg-Detail-Nav-Bar">
                            <button className="aljobpg-back-to-list-btn" onClick={() => setSelectedJob(null)}>
                                ← Back to Job Ads
                            </button>
                            <span className="aljobpg-job-post-date">Posted on: {selectedJob.posted}</span>
                        </div>
 
                        <div className="aljobpg-Detailed-Info-Card">

                         <div className='aljobpg-Detailed-Text_context'>
                            <div className="aljobpg-Detail-Text-Content">
                             <h1 className="aljobpg-detail-title">{selectedJob.company}</h1>
                             <p className="aljobpg-detail-company">{selectedJob.title}</p>
                             {/* <span className="aljobpg-status-pill">Active</span> */}
                            </div>

                        {/* Right Side: Logo Container */}
                           <div className="aljobpg-Detail-Logo-Wrapper">
                            <img 
                            src={selectedJob.logo}
                            alt={`${selectedJob.company} Logo`} 
                            className="aljobpg-Detail-Logo"
                        //     onError={(e) => {
                        //     e.target.src = 'https://via.placeholder.com/60?text=Job';
                        //   }}
                           />
                          </div>
                        </div>
 
                            <div className="aljobpg-Data-Metrics-Grid">
                                <div className="aljobpg-Data-Box"><label>LOCATION</label><p>{selectedJob.location}</p></div>
                                <div className="aljobpg-Data-Box"><label>EXPERIENCE</label><p>{selectedJob.experience}</p></div>
                                <div className="aljobpg-Data-Box"><label>SALARY</label><p className="aljobpg-salary-highlight">{selectedJob.salary}</p></div>
                                <div className="aljobpg-Data-Box"><label>OPENINGS</label><p>{selectedJob.openings || '0'}</p></div>
                                <div className="aljobpg-Data-Box"><label>APPLICANTS</label><p className="aljobpg-app-count">{selectedJob.applicants}</p></div>
                            </div>
 
                            <div className="aljobpg-Job-Full-Description-Area">
                                
                                <div className="aljobpg-Info-Section">
                                    <h3 className="aljobpg-sec-title">Job Description</h3>
                                    <p>{selectedJob.jobDescription}</p>
                                </div>
                                <div className="aljobpg-Info-Section">
                                    <h3 className="aljobpg-sec-title">Responsibilities</h3>
                                    <p>{selectedJob.Responsibilities}</p>
                                </div>
                                <div className="aljobpg-Info-Section">
                                   <h3 className="aljobpg-sec-title">Education Required</h3>
                                 <div className="aljobpg-Education-List">
                                    {renderEducation(selectedJob.EducationRequired || selectedJob.education)}
                                 </div>
                                </div>
                               <div className="aljobpg-Info-Section">
                                    <h3 className="aljobpg-sec-title">Required Skills</h3>
                                <div className="aljobpg-Skills-List">
                                {renderSkills(selectedJob.KeySkills || selectedJob.skills)}
                                </div>
                            </div>
                            </div>
 
                            <div className="aljobpg-Detail-Footer-Actions">
                                <button className="aljobpg-primary-action-btn">Manage Applicants</button>
                                <button className="aljobpg-secondary-action-btn">Edit Details</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* --- LIST VIEW --- */
                    <>
                        <div className="aljobpg-Glass-Header">
                            <div className="aljobpg-Title-Section">
                                <h2>Your Job Ads</h2>
                                <p>Managing <strong>{totalJobsCount}</strong> listings</p>
                            </div>
                            <button onClick={() => window.history.back()} className="aljobpg-back-btn-outline">Back to Dashboard</button>
                        </div>
 
                        <div className="aljobpg-Jobs-List-Grid">
                         {currentJobs.length > 0 ? (
                          currentJobs.map((job) => (
                          <div key={job.id} className="aljobpg-Job-Bar-Card">
                           
                            {/* 1. Job Logo */}
                            <div className="aljobpg-Job-Logo-Wrapper">
                                <img
                                    src={job.logo}
                                    alt={`${job.company} Logo`}
                                    className="aljobpg-Job-Logo"
                                    // onError={(e) => {
                                    //     e.target.src = 'https://via.placeholder.com/50?text=Job';
                                    // }}
                                />
                            </div>
 
                            {/* 2. Job Info */}
                            <div className="aljobpg-Job-Main-Info">
                                <h3>{job.role || job.company}</h3>
                                <p className="company-name">{job.company}</p>
                                <p className="job-location">{job.location}</p>
                            </div>
 
                            {/* 3. Applicants Count */}
                            <div className="aljobpg-Job-Applicants-Straight">
                                <span className="aljobpg-app-num">{job.applicants}</span>
                                <span className="aljobpg-app-text">Applicants</span>
                            </div>
 
                            {/* 4. Action Button */}
                            <button
                                className="aljobpg-view-details-btn"
                                onClick={() => setSelectedJob(job)}
                            >
                                View Details
                            </button>
                           
                         </div>
                          ))
                         ) : (
                          <p>No Jobs Available At the Moment!</p>
                         )}
                       </div>
 
                        <div className="aljobpg-Modern-Pagination">
    
                         <button 
                           className="aljobpg-p-nav-btn" 
                           disabled={currentPage === 1} 
                           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                           >
                           Prev
                         </button>
    
                        <div className="aljobpg-Page-Numbers-Wrapper">
                         {getPageNumbers().map(number => (
                         <button
                          key={number}
                          className={currentPage === number ? 'aljobpg-p-num-btn active' : 'aljobpg-p-num-btn'}
                          onClick={() => setCurrentPage(number)}
                         >
                        {number}
                         </button>
                        ))}
                       </div>
    
                      <button 
                        className="aljobpg-p-nav-btn" 
                        disabled={currentPage === totalPages || totalPages <= 1} 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                         >
                        Next
                      </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};
 