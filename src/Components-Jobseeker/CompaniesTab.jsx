import React, { useState } from 'react'
import './CompaniesTab.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Footer } from '../Components-LandingPage/Footer';
import search from '../assets/icon_search.png'
import location from '../assets/icon_location.png'
import tick from '../assets/icon_tick.png'
import starIcon from '../assets/Star_icon.png'
import { CompaniesList } from '../CompaniesList';
import { SearchBar } from './SearchBar'
import { Header } from '../Components-LandingPage/Header';

/* Below Code is removed after backend integration*/
const companiesList = CompaniesList.slice(0, 8)

export const CompaniesTab = () => {
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

      <div className="companies-tab-container">
        <h2 className="carousel-title">Companies for you</h2>
        <div className="companies-tab-grid">
          {companiesList.map((company) => (
            <div key={company.companyId} className="companies-tab-card">
              <div className="companies-tab-logo-container">
                <img src={company.logo} alt={`${company.companyName} logo`} className="companies-tab-logo" />
              </div>
              <h3 className="companies-tab-name">{company.companyName}</h3>
              <div className="companies-tab-rating-reviews">
                <span className="star companies-tab-rating-star"><img src={starIcon} /></span>
                <span className="companies-tab-rating">{company.ratings}</span>
                <span className="companies-tab-separator">|</span>
                <span className="companies-tab-reviews">{company.reviewNo} reviews</span>
              </div>
              <p className="companies-tab-desc">{company.slogan}</p>
              <button className="companies-tab-view-jobs-btn" onClick={() => navigate(`/Job-portal/jobseeker/companies/${company.companyId}`)}>View Jobs</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
