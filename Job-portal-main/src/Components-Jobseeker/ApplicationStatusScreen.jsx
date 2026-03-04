import React, { useEffect } from "react";
import Success from "../assets/application_success.png";
import { Footer } from "../Components-LandingPage/Footer";
import './ApplicationStatusScreen.css'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../Components-LandingPage/Header";
import { useJobs } from '../JobContext'

export const ApplicationStatusScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { jobs, appliedJobs }= useJobs();
  const job = jobs.find(singleJob => singleJob.id === id) || appliedJobs.find(job => job.id === id)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Job-portal/jobseeker");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="success-page">
      <Header />

      <div className="success-container">
        <img
          src={Success}
          alt="Applied-successfully"
          className="success-image"
        />

        <h2 className="success-title">Congratulations!</h2>

        <p className="success-text">
          You have successfully applied to the{" "}
          <span className="job-title">
            {job.title || "this job"}
          </span>{" "}
          position on {job.company}
        </p>
        <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
          Redirecting to home in 3 seconds...
        </p>
      </div>

      <Footer />
    </div>
  );
}