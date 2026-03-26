import React, { useState } from 'react'
import './JobsThroughCompany.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OpportunitiesCard } from './OpportunitiesCard';
import { Footer } from '../Components-LandingPage/Footer';
import starIcon from '../assets/Star_icon.png'
import { CompaniesList } from "../CompaniesList";
import { useJobs } from '../JobContext';
import { Header } from '../Components-LandingPage/Header';

export const JobsThroughCompany = () => {
    const { jobs } = useJobs();

    const { companyId } = useParams()

    const filteredJobs = jobs.filter(comp => comp.companyId === companyId);

    console.log(filteredJobs)

    const findbyCompaniesNameList = CompaniesList.slice(0, 8);
    const CompanyTitle = findbyCompaniesNameList.find(comp => comp.companyId === companyId);
    const navigate = useNavigate();

    const displayCount = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexofLastjob = currentPage * displayCount;
    const indexoffirstjob = indexofLastjob - displayCount;

    const currentJobCards = filteredJobs.slice(indexoffirstjob, indexofLastjob);
    const totalpages = Math.ceil(filteredJobs.length / displayCount);

    const HandlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    const HandleNext = () => {
        if (currentPage < totalpages) setCurrentPage(currentPage + 1);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const siblingCount = 1;

        if (totalpages <= 5) {
            for (let i = 1; i <= totalpages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - siblingCount);
            let endPage = Math.min(totalpages - 1, currentPage + siblingCount);


            if (currentPage <= 3) {
                endPage = 4;
            }

            if (currentPage >= totalpages - 2) {
                startPage = totalpages - 3;
            }

            if (startPage > 2) {
                pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalpages - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalpages);
        }

        return pageNumbers.map((number, index) => {
            if (number === '...') {
                return <span key={`dots-${index}`} className="dots">...</span>;
            }
            return (
                <button
                    key={number}
                    className={`page-btn ${currentPage === number ? "active" : ""}`}
                    onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            );
        });
    };

    return (

        <>
            <Header />
            <div className='job-search-companies'>
                <section className='Opportunities-section'>
                    <div className="company-header-container">

                        <div className="company-details-section">
                            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                            <div className='company-main-section'>
                                <div className='company-logo-container'>
                                    <img className='company-logo' src={CompanyTitle?.logo} alt="logo" />
                                </div>

                                <div className="company-info-card">
                                    <h2 className="company-name">{CompanyTitle?.companyName}</h2>
                                    <div className="company-title-container">
                                        <span className="star"><img src={starIcon} alt="star" />  {CompanyTitle?.ratings}</span> <span className="company-divider">|</span><span className="opp-reviews">{CompanyTitle?.reviewNo} reviews</span>
                                    </div>
                                </div>
                                <div className='job-by-company-moto'>
                                    <p className="company-moto">{CompanyTitle?.slogan}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Opportunities-job-list">
                        {currentJobCards.length > 0 ? (
                            currentJobCards.map((job) => (
                                <OpportunitiesCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="no-jobs-msg">No active jobs found for this company.</div>
                        )}
                    </div>

                    {filteredJobs.length > 0 && (
                        <div className="Navigation-job-Tab">
                            <button
                                onClick={HandlePrev}
                                disabled={currentPage === 1}
                                className='Navigation-btn'
                            >
                                Previous
                            </button>

                            <div className="page-numbers">
                                {renderPageNumbers()}
                            </div>

                            <button
                                onClick={HandleNext}
                                disabled={currentPage === totalpages}
                                className='Navigation-btn'
                            >
                                Next
                            </button>
                        </div>
                    )}

                </section>
            </div>

            <Footer />
        </>
    )
}