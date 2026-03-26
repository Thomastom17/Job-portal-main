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
  const { Alluser, currentUserId, currentUser, withdrawApplication, removeRejectedJob } = useJobs();


  const navigate = useNavigate();
  const job = Alluser.find(user => user.id === currentUserId)?.appliedJobs?.find(job => job.id === id);
  // const currentUser = Alluser.find(u => u.id === currentUserId);
  const liveJobData = currentUser?.appliedJobs?.find(aj => aj.id === id);
  const liveStatus = liveJobData?.status || "Application Submitted";;
  const [activeStep, setActiveStep] = useState(-1);

  const statusFlow = [
    { label: 'Application Submitted', sub: "Your profile has successfully entered the database." },
    { label: 'Resume Screening', sub: "Your resume is currently being reviewed." },
    { label: 'Recruiter Review', sub: "A hiring manager is manually reviewing your profile." },
    { label: 'Shortlisted', sub: "You have been flagged as a top contender." },
    { label: 'Interview Called', sub: "The hiring team has reached out to schedule a meeting." },
  ];
  const isRejected = liveStatus === "Rejected";

  const getFilteredSteps = () => {
    if (!isRejected) return statusFlow;
    const currentIndex = statusFlow.findIndex(s => s.label === liveJobData?.status);
    const cutoff = currentIndex === -1 ? 0 : currentIndex;
    const initialSteps = statusFlow.slice(0, cutoff + 1);
    return [
      ...initialSteps,
      { label: 'Rejected', sub: "Better luck next time!", isError: true }
    ];
  };

  const displaySteps = getFilteredSteps();


  useEffect(() => {
    if (liveJobData?.applicationStatus) {
      if (isRejected) {
        setActiveStep(displaySteps.length - 1);
      } else {
        const completedSteps = liveJobData.applicationStatus.filter(
          (step) => step.status === 'completed'
        ).length;
        setActiveStep(completedSteps - 1);
      }
    }
  }, [liveJobData, isRejected, displaySteps]);

  if (!job) return <div>Job not found!</div>;



  return (
    <div>
      <Header />

      <div className='appliedjobsO-job-card' style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h2 className="myjobs-job-title">{job.title}</h2>
          <div style={{ marginTop: "20px" }} className="myjobs-company-sub">
            <p className="myjobs-company-name">
              {job.company}
              <span className="Opportunities-divider">|</span>
              <span className="star">
                <img src={starIcon} alt="star" />
              </span>
              {job.ratings}
              <span className="Opportunities-divider">|</span>
              <span>{job.reviewNo} reviews</span>
            </p>
          </div>

          <div style={{ marginTop: "20px" }} className="Opportunities-job-details">
            <p className='Opportunities-detail-line'>
              <img src={time} className='card-icons' alt="time" /> {job.duration}
              <span className="Opportunities-divider">|</span>
              {job.salary} LPA
              <span className="Opportunities-divider">|</span>
              <img src={experience} className='card-icons' alt="exp" /> {job.experience} yrs
              <span className="Opportunities-divider">|</span>
              <img src={place} className='card-icons' alt="loc" /> {Array.isArray(job.location)
                ? job.location.join(", ")
                : job.location || "N/A"}
            </p>
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="Applied-job-tags">
              {job.tags?.map((tag, i) => (
                <span key={i} className={`Opportunities-job-tag ${tag.toLowerCase()}`}>
                  {tag}
                </span>
              ))}
            </div>

            <span className={`applied-application-status status-${job.jobStatus.type}`}>
              {job.jobStatus.text}
            </span>
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "end", paddingRight: "50px" }}>
          {job.logo
            ? <img width={120} src={job.logo} alt="logo" />
            : <div className="Opportunities-job-logo-placeholder">{job.company.charAt(0)}</div>
          }
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
            <p><strong>Location:</strong> {Array.isArray(job.location) ? job.location.join(", ") : job.location || "N/A"}</p>

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
            <h3> Application Status</h3>
          </div>

          <Box sx={{ width: '100%', mt: 3 }}>

            <Stepper orientation="vertical" activeStep={isRejected ? 3 : activeStep} connector={<AnimatedConnector />}>
              {displaySteps.map((step, index) => {
                const isStepRejected = step.label === 'Rejected';
                return (
                  <Step key={index} completed={isRejected ? index < 3 : index < activeStep}>
                    <StepLabel
                      error={isStepRejected}
                      optional={<Typography variant="caption">{step.sub}</Typography>}
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontWeight: (index === (isRejected ? 3 : activeStep)) ? 700 : 400,
                          color: isStepRejected ? '#d32f2f' : 'inherit'
                        }
                      }}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          <div style={{ marginTop: '40px' }}>
            {isRejected ? (
              <button onClick={() => removeRejectedJob(job)} className="btn-remove-red">
                Remove from Applied
              </button>
            ) : (
              <button onClick={() => withdrawApplication(job)} className="btn-withdraw-blue">
                Withdraw Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};