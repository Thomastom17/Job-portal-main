import React, { useState } from 'react'
import './JobsTab.css'
import { Footer } from '../Components-LandingPage/Footer'
import { useJobs } from '../JobContext';
import { OpportunitiesCard } from './OpportunitiesCard';
import { useNavigate } from "react-router-dom"
import { SearchBar } from './SearchBar'
import { Header } from '../Components-LandingPage/Header';

export const JobsTab = () => {
    const { jobs } = useJobs();

    const displayCount = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexofLastjob = currentPage * displayCount;
    const indexoffirstjob = indexofLastjob - displayCount;

    const currentJobCards = jobs.slice(indexoffirstjob, indexofLastjob);
    const totalpages = Math.ceil(jobs.length / displayCount);

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

    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('');

    const handleInitialSearch = () => {

        navigate('/Job-portal/jobseeker/searchresults', {
            state: {
                query: query,
                location: location,
                experience: experience
            }
        })
    }

    return (
        <>
            <Header />
            <div className='jobs-tab-search-bar'>
                <SearchBar searchQuery={query} setSearchQuery={setQuery} searchLocation={location} setSearchLocation={setLocation} searchExp={experience}
                    setSearchExp={setExperience} onSearch={handleInitialSearch} />
            </div>

            <section className='Opportunities-section'>
                <div className='Opportunities-section'>
                    <h2 className='Opportunities-title'>Jobs For You</h2>
                    <div className="Opportunities-job-list">
                        {currentJobCards.map((job) => (
                            <OpportunitiesCard key={jobs.id} job={job} />
                        ))}
                    </div>
                </div>
            </section>

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

            <Footer />
        </>
    )
}