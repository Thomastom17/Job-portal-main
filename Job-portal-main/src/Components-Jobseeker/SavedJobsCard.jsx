import React from 'react'
import starIcon from '../assets/Star_icon.png'
import time from '../assets/opportunity_time.png'
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import calender from '../assets/calender_card.png'
import './SavedJobsCard.css'
import { useJobs } from '../JobContext';
import { Link, useNavigate } from 'react-router-dom' 

export const SavedJobsCard = ({ job }) => {
    const { applyForJob, toggleSaveJob, appliedJobs } = useJobs();

    const isApplied = appliedJobs.some(j => j.id === job.id);

    const navigate = useNavigate()
        const HandleClick = () => {
            navigate(`/Job-portal/jobseeker/OpportunityOverview/${job.id}`)
        }

    return (
        <div className="myjobs-job-card">
            <div onClick={() => HandleClick()}>
                <div className="myjobs-card-header">
                    <div>
                        <h2 className="myjobs-job-title">{job.title}</h2>
                    </div>
                </div>
                <div className="myjobs-company-sub">
                    <p className="myjobs-company-name">{job.company}<span className="Opportunities-divider">|</span><span className="star"><img src={starIcon} alt="star" /></span> {job.ratings}<span className="Opportunities-divider">|</span><span>{job.reviewNo}</span> reviews</p>
                </div>

                <div className="Opportunities-job-details">
                    <p className='Opportunities-detail-line'><img src={time} className='card-icons' alt="type" />{job.WorkType}<span className="Opportunities-divider">|</span>{job.salary} Lpa</p>
                    <p className='Opportunities-detail-line'><img src={experience} className='card-icons' alt="exp" />{job.experience} years</p>
                    <p className='Opportunities-detail-line'><img src={place} className='card-icons' alt="loc" />{job.location}</p>
                    <p className='Opportunities-detail-line'><img src={calender} className='card-icons' alt="date" />{job.posted}<span className="Opportunities-divider">|</span>Openings: {job.openings}<span className="Opportunities-divider">|</span>Applicants: {job.applicants}</p>
                </div>

                <div className="Opportunities-job-tags">
                    {job.tags && job.tags.map((tag, index) => (
                        <span key={index} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <hr className="Opportunities-separator" />

            <div className="Opportunities-job-footer">
                <p className='myjobs-saved-date'>{job.savedDate}</p>

                <div className="Opportunities-job-actions">
                    <button
                        className="myjobs-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveJob(job);
                        }}
                    >
                        Saved 
                    </button>

                    <button
                        className="myjobs-btn"
                        disabled={isApplied}
                        style={{
                            opacity: isApplied ? 0.6 : 1,
                            cursor: isApplied ? 'not-allowed' : 'pointer',
                            backgroundColor: isApplied ? '#ccc' : ''
                        }}
                        onClick={(e) => {
                             navigate (`/Job-portal/jobseeker/jobapplication/${job.id}`)
                        }}
                    >
                        {isApplied ? "Applied" : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    );
};