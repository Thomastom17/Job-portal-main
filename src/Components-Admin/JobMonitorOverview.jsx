import React from 'react'
import { useJobs } from '../JobContext';
import starIcon from '../assets/Star_icon.png'
import time from '../assets/opportunity_time.png'
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import { useNavigate } from 'react-router-dom';

export const JobMonitorOverview = ({ jobId, setSelectedJobId }) => {
  const { jobs, deleteJob, setJobs } = useJobs();
  const currentId = jobId;
  const selectedJob = jobs.find(Job => Job.id === currentId);
  const navigate = useNavigate();

  if (!selectedJob) {
    return (
      <div className='opp-overview-main'>
        <button onClick={() => setSelectedJobId(null)} style={{ background: '#a09f9f', padding: "7px 11px", border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '5px' }}>Back to Monitoring</button>
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Job not found or already deleted.</p>
      </div>
    );
  }

  // 1. DELETE ACTION WITH REDIRECT
  const handleDelete = () => {
    const confirmAction = window.confirm("Are you sure you want to delete this job permanently?");
    if (confirmAction) {
      deleteJob(currentId);
      setSelectedJobId(null); // Clear panni main list-uku redirect aagum
    }
  };

  // 2. APPROVE ACTION WITH REDIRECT
  const handleApprove = () => {
    const confirmAction = window.confirm("Are you sure you want to approve this job?");
    if (confirmAction) {
      setJobs(prev => prev.map(j => j.id === currentId ? { ...j, status: 'Approved' } : j));
      setSelectedJobId(null);
    }
  };

  // 3. REJECT ACTION WITH REDIRECT
  const handleReject = () => {
    const confirmAction = window.confirm("Are you sure you want to reject this job?");
    if (confirmAction) {
      setJobs(prev => prev.map(j => j.id === currentId ? { ...j, status: 'Rejected' } : j));
      setSelectedJobId(null);
    }
  };

  // 4. FLAG / UNFLAG ACTION WITH REDIRECT
  const handleToggleFlag = () => {
    const actionText = selectedJob.isFlagged ? "unflag" : "flag";
    const confirmAction = window.confirm(`Are you sure you want to ${actionText} this job?`);
    if (confirmAction) {
      setJobs(prev => prev.map(j => j.id === currentId ? { ...j, isFlagged: !j.isFlagged } : j));
      setSelectedJobId(null);
    }
  };

  // 5. HOLD ACTION WITH REDIRECT
  const handleHold = () => {
    const confirmAction = window.confirm("Are you sure you want to put this job on hold?");
    if (confirmAction) {
      setJobs(prev => prev.map(j => j.id === currentId ? { ...j, status: 'Hold' } : j));
      setSelectedJobId(null);
    }
  };

  return (
    <div className='opp-overview-main'>
      {/* Back button on top for easy navigation */}
      <div style={{ marginBottom: '15px' }}>
      </div>

      <div className="opp-job-main">
        <div className="opp-overview-job-card">
          <div className="Opportunities-job-header">
            <div>
              <h2 className="opp-topcard-job-title">
                <span style={{ color: '#007bff', marginRight: '8px' }}>#{selectedJob.id}</span>
                {selectedJob.title} {selectedJob.isFlagged && <span style={{ fontSize: '18px' }}>🚩</span>}
              </h2>
              <h5 className="Opportunities-job-company">
                {selectedJob.company} <span className="Opportunities-divider">|</span>
                <span className="star"><img src={starIcon} alt="star" /></span> {selectedJob.ratings} 
                <span className="Opportunities-divider">|</span>
                <span className="opp-reviews"> {selectedJob.reviewNo} Reviews</span>
                <span className="Opportunities-divider">|</span>
                <span style={{ textTransform: 'uppercase', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: '#e0e0e0', color: '#333' }}>
                  Current Status: {selectedJob.status || 'Posted'}
                </span>
              </h5>
            </div>
            {selectedJob.logo ? (
              <img src={selectedJob.logo} alt={selectedJob.company} className="Opportunities-job-logo" />
            ) : (
              <div className="Opportunities-job-logo-placeholder">{selectedJob.company?.charAt(0).toUpperCase()}</div>
            )}
          </div>

          <div className="Opportunities-job-details">
            <p className='Opportunities-detail-line'><img src={time} className='card-icons' alt="time" />{selectedJob.duration}<span className="Opportunities-divider">|</span>₹ {selectedJob.salary} Lpa</p>
            <p className='Opportunities-detail-line'><img src={experience} className='card-icons' alt="exp" />{selectedJob.experience} years of experience</p>
            <p className='Opportunities-detail-line'><img src={place} className='card-icons' alt="loc" />{selectedJob.location}</p>
          </div>

          <div className='Opportunities-details-bottom'>
            <div className="Opportunities-job-tags">
              {selectedJob.tags?.map((tag, index) => (
                <span key={index} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="Opportunities-job-type">
              {selectedJob.WorkType}
            </div>
          </div>
          
          <hr className="Opportunities-separator" />
          
          <div className="opp-job-highlights">
            <h3>Job Highlights</h3>
            <ul>
              {selectedJob.JobHighlights?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <h3>Company Overview</h3>
          <p>{selectedJob.companyOverview}</p>

          <h3>Job Description</h3>
          <p>{selectedJob.jobDescription}</p>

          <h3>Responsibilities</h3>
          <ul>
            {selectedJob.Responsibilities?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h3>Key Details:</h3>
          <p><strong>Job ID:</strong> {selectedJob.id}</p>
          <p><strong>Role:</strong> {selectedJob.title}</p>
          <p><strong>Industry Type:</strong> {selectedJob.IndustryType?.join(", ")}</p>
          <p><strong>Department:</strong> {selectedJob.Department?.join(", ")}</p>
          <p><strong>Job Type:</strong> {selectedJob.WorkType}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
          <p><strong>Shift:</strong> {selectedJob.Shift}</p>

          <h3>Key Skills</h3>
          <div className="opp-key-skills-container">
            {selectedJob.KeySkills?.map((item, i) => <span key={i}>{item}</span>)}
          </div> 

          {/* ACTIONS ROW WITH CONFIRMATION AND AUTOMATIC REDIRECT */}
          <div className='Monitoring-Overview-Action' style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            
            <button onClick={handleDelete} style={{ background: "#f44d4d", color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
              Delete
            </button>
            
            <button onClick={handleToggleFlag} style={{ background: "#fdc01b", color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
              {selectedJob.isFlagged ? "Unflag" : "Flag"}
            </button>
            
            <button onClick={handleHold} style={{ background: "#b7b7b6", color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
              Hold
            </button>

            {selectedJob.status !== 'Rejected' && (
              <button onClick={handleReject} style={{ background: "#dc3545", color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                Reject
              </button>
            )}
            
            {selectedJob.status !== 'Approved' && (
              <button onClick={handleApprove} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                Approve
              </button>
            )}

          </div>              
        </div>
      </div>
    </div>
  )
}