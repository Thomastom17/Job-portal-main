import React, { useState, useEffect } from 'react';
import starIcon from '../assets/Star_icon.png';
import time from '../assets/opportunity_time.png';
import experience from '../assets/opportunity_bag.png';
import place from '../assets/opportunity_location.png';
import breifcase from '../assets/header_case.png';
import { Header } from '../Components-LandingPage/Header';
import twitter from '../assets/socials-x.png';
import linkedin from '../assets/socials-linkedin.png';
import facebook from '../assets/socials-facebook.png';
import './AppliedJobsOverview.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../JobContext';
import { Stepper, Step, StepLabel, StepConnector, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const AnimatedConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: '#eaeaf0',
    borderLeftWidth: 3,
    minHeight: 40,
    transition: 'border-color 0.8s ease-in',
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
  const { appliedJobs, setJobs, setAppliedJobs,withdrawJobFromUser,setAlluser, Alluser } = useJobs();
  const navigate = useNavigate();

  // 1. Current Job fetching from local state
  const job = appliedJobs.find(job => job.id === id);

  // 2. Getting LIVE STATUS from Alluser context (logged in user id "2")
  const currentUser = Alluser.find(u => u.id === "2");
  const liveJobData = currentUser?.appliedJobs?.find(aj => aj.id === id);
  const liveStatus = liveJobData?.status || "Application Submitted";

  const [activeStep, setActiveStep] = useState(-1);

  // Status mapping for Stepper
  const statusFlow = [
    { label: 'Application Submitted', sub: "Your profile has successfully entered the database." },
    { label: 'Resume Screening', sub: "Your resume is currently being reviewed." },
    { label: 'Recruiter Review', sub: "A hiring manager is manually reviewing your profile." },
    { label: 'Shortlisted', sub: "You have been flagged as a top contender." },
    { label: 'Interview Called', sub: "The hiring team has reached out to schedule a meeting." },
  ];

  // Logic to find current index
  const currentStepIndex = statusFlow.findIndex(s => s.label === liveStatus);
  const isRejected = liveStatus === "Rejected";

  useEffect(() => {
    // Small delay for animation feel
    const timer = setTimeout(() => {
      if (isRejected) {
        setActiveStep(2); 
      } else {
        setActiveStep(currentStepIndex);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [liveStatus, currentStepIndex, isRejected]);

  if (!job) return <div>Job not found!</div>;

    const withdrawApplication = (jobId) => {
 
    if (window.confirm("Are you sure you want to withdraw?")) {
      // remove from applied jobs list
      setAppliedJobs(prev => prev.filter(j => j.id !== jobId));
      // remove from user applied jobs
      const updatedUsers = Alluser.map(user => {
        if (user.id === "2") {
          return {
            ...user,
            appliedJobs: user.appliedJobs?.filter(j => j.id !== jobId)
          };
        }
        return user;
      });
      setAlluser(updatedUsers);
      navigate('/Job-portal/jobseeker/withdrawn');
    }
  };

  const removeRejectedJob = (jobId) => {
    if (window.confirm("Remove this rejected application from history?")) {
      setAppliedJobs(prev => prev.filter(j => j.id !== jobId));
      navigate('/Job-portal/jobseeker/myjobs');
    }
  };

  return (
    <div>
      <Header />

      <div className='appliedjobsO-job-card' style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h2 className="myjobs-job-title">{job.title}</h2>
          <div style={{ marginTop: "20px" }} className="myjobs-company-sub">
            <p className="myjobs-company-name">
              {job.company} <span className="Opportunities-divider">|</span>
              <span className="star"><img src={starIcon} alt="star" /></span> {job.ratings} 
              <span className="Opportunities-divider">|</span><span>{job.reviewNo} reviews</span>
            </p>
          </div>
          <div style={{ marginTop: "20px" }} className="Opportunities-job-details">
            <p className='Opportunities-detail-line'>
              <img src={time} className='card-icons' alt="time" /> {job.duration} 
              <span className="Opportunities-divider">|</span> {job.salary} LPA
              <span className="Opportunities-divider">|</span> 
              <img src={experience} className='card-icons' alt="exp" /> {job.experience} yrs
              <span className="Opportunities-divider">|</span> 
              <img src={place} className='card-icons' alt="loc" /> {job.location}
            </p>
          </div>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="Applied-job-tags">
              {job.tags?.map((tag, i) => (
                <span key={i} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>{tag}</span>
              ))}
            </div>
           <span className={`applied-application-status status-${job.status.type}`}>{job.status.text}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "end", paddingRight: "50px" }}>
          {job.logo ? <img width={120} src={job.logo} alt="logo" /> : <div className="Opportunities-job-logo-placeholder">{job.company.charAt(0)}</div>}
        </div>
      </div>

      <div className='AppliedJobs-overview-main'>
        <div className='opp-job-main'>
          <div className="opp-job-details-card">
            <h3>Job Description</h3>
            <p>{job.jobDescription || "No description available."}</p>
            
            <h3>Key Skills</h3>
            <div className="opp-key-skills-container">
              {job.KeySkills?.map((skill, i) => <span key={i}>{skill}</span>)}
            </div>

            <div className="opp-share-job" style={{ marginTop: '30px' }}>
              <p>Share This job</p>
              <div className='opp-socials'>
                <img src={linkedin} className='opp-socials-icon' alt="linkedin" />
                <img src={facebook} className='opp-socials-icon' alt="facebook" />
                <img src={twitter} className='opp-socials-icon' alt="twitter" />
              </div>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC STEPPER SIDEBAR --- */}
        <div className="status-container">
          <div className="status-header">
            <img src={breifcase} className='card-icons' alt="status-icon" />
            <h3>Application Status</h3>
          </div>

          <Box sx={{ width: '100%', mt: 3 }}>
            <Stepper orientation="vertical" activeStep={activeStep} connector={<AnimatedConnector />}>
              {statusFlow.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    optional={<Typography variant="caption">{step.sub}</Typography>}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: index <= activeStep ? 700 : 400,
                        color: index <= activeStep ? '#1976d2' : 'inherit'
                      }
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}

              {/* Only show Rejected Step if status is Rejected */}
              {isRejected && (
                <Step active={true}>
                  <StepLabel
                    StepIconProps={{ sx: { '&.Mui-active': { color: '#d32f2f' } } }}
                    optional={<Typography variant="caption" sx={{ color: '#d32f2f' }}>Better luck next time!</Typography>}
                  >
                    <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Rejected</span>
                  </StepLabel>
                </Step>
              )}
            </Stepper>
          </Box>

          <div style={{ marginTop: '40px' }}>
            {isRejected ? (
              <button onClick={() => removeRejectedJob(job.id)} className="btn-remove-red">Remove Application</button>
            ) : (
              <button onClick={() => withdrawApplication(job.id)} className="btn-withdraw-blue">Withdraw Application</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};