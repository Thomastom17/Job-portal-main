import React, { useState, useEffect } from 'react'
import starIcon from '../assets/Star_icon.png'
import time from '../assets/opportunity_time.png'
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import breifcase from '../assets/header_case.png';
import { Header } from '../Components-LandingPage/Header'
import twitter from '../assets/socials-x.png'
import linkedin from '../assets/socials-linkedin.png'
import facebook from '../assets/socials-facebook.png'
import './AppliedJobsOverview.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useJobs } from '../JobContext'
import { Stepper, Step, StepLabel, StepConnector, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles';

const AnimatedConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: '#eaeaf0',
    borderLeftWidth: 3,
    minHeight: 40,
    transition: 'border-color 1.50s ease-in',
  },
  '&.Mui-active .MuiStepConnector-line': {
    borderColor: '#1976d2',

  },
  '&.Mui-completed .MuiStepConnector-line': {
    borderColor: '#1976d2',
  },
}));

export const AppliedJobsOverview = () => {

  const { id } = useParams();
  const { appliedJobs, setJobs, setAppliedJobs } = useJobs();
  const navigate = useNavigate();
  const job = appliedJobs.find(job => job.id === id)


  const [activeStep, setActiveStep] = useState(-1);

  const applicationStatus = [
    { label: 'Application Submitted', sub: "Your profile, resume, and cover letter have successfully entered the company's database, and an acknowledgment has been sent.", status: 'completed' },
    { label: 'Resume Screening', sub: "Your resume is currently being reviewed (either by an automated system or a screener) to ensure your skills and qualifications match the core job requirements.", status: 'completed' },
    { label: 'Recruiter Review', sub: "A hiring manager manually reviews your specific experience, portfolio, and background to determine potential fit for the role.", status: 'completed' },
    { label: 'Shortlisted', sub: "You have passed the initial review stages and have been flagged as a top contender among the applicant pool.", status: 'rejected' },
    { label: 'Interview Called', sub: "The hiring team has officially reached out to schedule a meeting, moving your status from 'Review' to active 'Engagement.'", status: 'pending' },
  ];
  const rejectedIndex = applicationStatus.findIndex(step => step.status.toLowerCase() === 'rejected');
  const isRejected = rejectedIndex !== -1;

  const filteredStatus = isRejected
    ? applicationStatus.slice(0, rejectedIndex + 1)
    : applicationStatus;

  const withdrawApplication = (jobId) => {
    const jobToRestore = appliedJobs.find(j => j.id === jobId);

    if (jobToRestore) {
      const isConfirmed = window.confirm("Are you sure, you want to withdraw this application?");
      if (isConfirmed) {
        navigate('/Job-portal/jobseeker/withdrawn')
        const { appliedDate, status, applicationStatus, ...restoredJob } = jobToRestore;
        setAppliedJobs((prev) => prev.filter((j) => j.id !== jobId));
        setJobs((prev) => {
          if (prev.some(j => j.id === jobId)) return prev;
          return [...prev, restoredJob];

        });

        alert("Application withdrawn successfully.");

      }
    }
  };

  const removeRejectedJob = (jobId) => {
    const isConfirmed = window.confirm("This application was rejected. Do you want to remove it from your history?");
    if (isConfirmed) {
        setAppliedJobs((prev) => prev.filter((j) => j.id !== jobId)); 
        navigate('/Job-portal/jobseeker/myjobs'); // Redirect panni vittudalam
        alert("Application removed from your list.");
    }
};



  useEffect(() => {
    const completedCount = job.applicationStatus.filter(step =>
      ['completed', 'complete'].includes(step.status.toLowerCase())
    ).length;

    const timer = setTimeout(() => {
      setActiveStep(isRejected ? rejectedIndex : completedCount);
    }, 500);
    return () => clearTimeout(timer);
  }, [isRejected, rejectedIndex]);
  return (

    <div >
      <Header />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className='appliedjobsO-job-card'>
        <div >
          <div className="myjobs-card-header">
            <div><h2 className="myjobs-job-title">{job.title}</h2></div>

          </div>
          <div style={{ marginTop: "20px" }} className="myjobs-company-sub">
            <p className="myjobs-company-name"> {job.company} <span className="Opportunities-divider">|</span><span className="star"><img src={starIcon} /></span> {job.ratings} <span className="Opportunities-divider">|</span><span>{job.reviewNo}</span></p>
          </div>
          <div style={{ marginTop: "20px" }} className="Opportunities-job-details">
            <p className='Opportunities-detail-line'><img src={time} className='card-icons' />{job.duration} <span className="Opportunities-divider">|</span> <span>{job.salary} LPA</span><span className="Opportunities-divider">|</span> <img src={experience} className='card-icons' />{job.experience} years of experience <span className="Opportunities-divider">|</span><img src={place} className='card-icons' /> Coimbatore </p>
          </div>
          <div style={{ marginTop: "20px", alignItems: "center", display: "flex", justifyContent: "space-between" }} className="Applied-job-tags">
            {job.tags.map((tag, i) => (
              <div ><span key={i} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>
                {tag}
              </span></div>))}
            <span className={`applied-application-status status-${job.status.type}`}>{job.status.text}</span>
          </div>
          <hr className="Opportunities-separator" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "end", paddingRight: "50px" }}>

          {job.logo ? (<img width={150} style={{ marginTop: "50px" }} src={job.logo} alt={job.company} />) : (<div className="Opportunities-job-logo-placeholder">{job.company.charAt(0).toUpperCase()}</div>)}
        </div>
      </div>

      <div className='AppliedJobs-overview-main'>
        <div className='opp-job-main'>
          <div className="opp-job-details-card">
            {/* Job Highlights */}
            <div className="opp-job-highlights">
              <h3>Job Highlights</h3>
              <ul>
                {job.JobHighlights.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <h3>Company Overview</h3>
            <p>
              {job.companyOverview}
            </p>

            <h3>Job Description</h3>
            <p>
              {job.jobDescription}
            </p>

            <h3>Responsibilities</h3>
            <ul>
              {job.Responsibilities.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h3>Key Details:</h3>
            <p><strong>Role:</strong> {job.title}</p>
            <p><strong>Industry Type:</strong> {job.IndustryType}</p>
            <p><strong>Department:</strong> {job.Department}</p>
            <p><strong>Job Type:</strong> {job.WorkType}</p>
            <p><strong>Location:</strong> {job.location}</p>

            <h3>Key Skills</h3>
            <div className="opp-key-skills-container">
              {job.KeySkills.map((item, i) => <span key={i}>{item}</span>)}
            </div>

            <hr className="Opportunities-separator" />

            <div className="opp-share-job">
              <div>
                <p>Share This job</p>
                <div className='opp-socials'>
                  <div><img src={linkedin} className='opp-socials-icon' alt="linkedin" /></div>
                  <div><img src={facebook} className='opp-socials-icon' alt="facebook" /></div>
                  <div><img src={twitter} className='opp-socials-icon' alt="twitter" /></div>
                </div>
              </div>
              <button className="opp-report-btn">Report this job</button>
            </div>
          </div>
        </div>
        <div className="status-container">
          <div className="status-header">
            <img src={breifcase} className='card-icons' alt="status-icon" />
            <h3>Application status</h3>
          </div>

          <Box sx={{ width: '100%' }}>
            <Stepper
              orientation="vertical"
              activeStep={activeStep}
              connector={<AnimatedConnector />}
            >
              {filteredStatus.map((step, index) => {
                const isStepRejected = step.status.toLowerCase() === 'rejected';

                return (
                  <Step key={index}>
                    <StepLabel
                      StepIconProps={{
                        sx: isStepRejected ? {
                          '&.Mui-active': { color: '#d32f2f' },
                          '& .MuiStepIcon-text': { fill: '#fff' }
                        } : {}
                      }}
                      // Logic: Rejected step-ah irundha 'null' return pannum, so 'sub' text kaataadhu
                      optional={
                        !isStepRejected ? (
                          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                            {step.sub}
                          </Typography>
                        ) : <Typography variant="caption" sx={{ display: 'block', color: 'red' }}>
                            better Luck Next Time
                          </Typography>
                      }
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontWeight: index <= activeStep ? 700 : 400,
                          color: isStepRejected ? '#d32f2f !important' : (index <= activeStep ? '#1976d2' : 'inherit'),
                          transition: 'color 1.50s ease'
                        }
                      }}
                    >
                      {/* Step name: Rejected step-na "Rejected" mattum thaan varum */}
                      {isStepRejected ? "Rejected" : step.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {/* Withdraw button: Only if not rejected */}
          {isRejected ? (
    // Rejected-ah irundha 'Remove' button mattum kaatu
    <button 
      style={{
        border: "none", outline: "none", marginTop: "50px",
        padding: "10px 20px", borderRadius: "10px", background: "#d32f2f", color: "snow", cursor: "pointer"
      }}
      onClick={(e) => {
        e.stopPropagation();
        removeRejectedJob(job.id);
      }}
    >
      Remove from Applied
    </button>
  ) : (
    // Rejected illai na normal 'Withdraw' button kaatu
    <button 
      style={{
        border: "none", outline: "none", marginTop: "50px",
        padding: "10px 20px", borderRadius: "10px", background: "#1976d2", color: "snow", cursor: "pointer"
      }}
      onClick={(e) => {
        e.stopPropagation();
        withdrawApplication(job.id);
      }}
    >
      Withdraw
    </button>
  )}
        </div>

      </div>
    </div>

  );
};
