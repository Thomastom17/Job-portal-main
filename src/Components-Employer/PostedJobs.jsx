import React, { useState } from 'react';
import './PostedJobs.css';
import place from '../assets/opportunity_location.png'
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../JobContext';

export const PostedJobs = ({ onViewApplicants }) => {
  const navigate = useNavigate();

  const { jobs, setJobs, getJobStats, currentEmployer, deleteJob, setCurrentEmployer, setAlluser } = useJobs();

  const [activeMenu, setActiveMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const PostedJob = currentEmployer.jobPosted

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditClick = (job) => {
    setActiveMenu(null);
    navigate('/Job-portal/Employer/EditJob', { state: job });
  };

  const handleDeleteClick = (id) => {
    setSelectedJobId(id);
    setShowDeleteModal(true);
    setActiveMenu(null);
    setJobs(jobs.filter(job => job.id !== selectedJobId));
    setAlluser((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        savedJobs: user.savedJobs.filter((job) => job.id !== job),
        appliedJobs: user.appliedJobs.filter((job) => job.id !== job),
      }))
    );
    setCurrentEmployer(prev => ({
      ...prev,
      jobPosted: prev.jobPosted.filter(job => job.id !== selectedJobId)
    }));
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (

    <div className="postedjobs-container">
      <h2 className="postedjobs-header">Jobs posted by you</h2>
      {PostedJob.length > 0 ? <>
        <div className="postedjobs-grid-layout postedjobs-table-header">
          <div />
          <span className="postedjobs-label">Applicants</span>
          <span className="postedjobs-label">New</span>
          <span className="postedjobs-label">Screening</span>
          <span className="postedjobs-label">Interview</span>
          <span className="postedjobs-label">Rejected</span>
          <div />
        </div>

        <div className="postedjobs-list">
          {PostedJob.map((job) => {
            const stats = getJobStats(job.id);

            return (
              <div key={job.id} className="postedjobs-grid-layout postedjobs-card">
                <div className="postedjobs-info">
                  <h3>{job.jobTitle || job.title}</h3>
                  <p className="postedjobs-loc flex items-center gap-2">
                    <img src={place} alt="location" className="post-job-locationicon" />
                    {Array.isArray(job.location)
                      ? job.location.join(", ")
                      : job.location || "N/A"}
                  </p>
                  <small>Created on: {job.postedDate || job.posted}</small>
                </div>


                <span className="postedjobs-badge">{stats.total}</span>
                <span className="postedjobs-badge">{stats.new}</span>
                <span className="postedjobs-badge">{stats.screening}</span>
                <span className="postedjobs-badge">{stats.interview}</span>
                <span className="postedjobs-badge">{stats.rejected}</span>

                <div className="postedjobs-actions">
                  <button
                    className="postedjobs-view-btn"
                    onClick={() => onViewApplicants(job)}
                  >
                    View applicants
                  </button>
                  <div className="postedjobs-menu-wrapper">
                    <button onClick={() => toggleMenu(job.id)} className="postedjobs-dots">⋮</button>
                    {activeMenu === job.id && (
                      <div className="postedjobs-dropdown">
                        <button onClick={() => handleEditClick(job)}>Edit Status</button>
                        <button onClick={() => handleDeleteClick(job.id)} className="delete-opt">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
        : <>
          <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '50vh' }}>No Jobs posted by you</h2>
        </>
      }
      {showDeleteModal && (
        <div className="postedjobs-modal-overlay">
          <div className="postedjobs-modal">
            <p>Do you want to remove this job post?</p>
            <div className="postedjobs-modal-btns">
              <button onClick={() => setShowDeleteModal(false)} className="postedjobs-btn-cancel">Cancel</button>
              <button onClick={confirmDelete} className="postedjobs-btn-delete">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="postedjobs-toast">
          Your job post has been removed <span className="close-icon" onClick={() => setShowSuccessToast(false)}>X</span>
        </div>
      )}
    </div>
  );
};