import React, { useMemo, useState } from 'react';
import './FindTalent.css';
import UserIcon from '../assets/Employer/User.png'
import { EHeader } from './EHeader';
import { useJobs } from '../JobContext';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from './ProfileCard';


export const FindTalent = () => {
  // States for Filters
  const { Alluser } = useJobs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedEdu, setSelectedEdu] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [maxExp, setMaxExp] = useState(10);

  // States for "View More" toggles
  const [showAllLangs, setShowAllLangs] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // --- Dynamic Data Extraction ---
  const filterOptions = useMemo(() => {
    const languages = new Set();
    const education = new Set();
    const skills = new Set();

    Alluser.forEach(user => {
      if (user.preferences[0]?.jobType)
        user.languages?.forEach(lang => languages.add(lang.name));
      user.education?.graduations?.forEach(grad => {
      if (grad.degree) education.add(grad.degree);
    });
    
    // Skills
    user.skills?.forEach(skill => skills.add(skill));
  });
    return {
      languages: Array.from(languages),
      education: Array.from(education),
      skills: Array.from(skills),
    };
  }, []);

  const handleFilterChange = (value, state, setState) => {
    setState(state.includes(value) ? state.filter(i => i !== value) : [...state, value]);
  };

  const filteredTalent = useMemo(() => {
    return Alluser.filter((user) => {
      const searchLower = searchTerm.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchesSearch = searchTerm === '' ||
        user.skills.some(s => s.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchLower)) ||
        user.education?.graduations?.some(g => g.degree.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchLower));

      const matchesLanguage = selectedLanguages.length === 0 ||
        user.languages.some(lang => selectedLanguages.includes(lang.name));

      const matchesEducation = selectedEdu.length === 0 ||
        user.education?.graduations?.some(g => selectedEdu.includes(g.degree));

      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.every(skill => user.skills.includes(skill));

      const expNumber = user.currentDetails.experience === "Fresher" ? 0 : parseFloat(user.currentDetails.experience);
      const matchesExperience = expNumber <= maxExp;

      return matchesSearch && matchesLanguage && matchesEducation && matchesSkills && matchesExperience; 
    });
  }, [searchTerm, selectedLanguages, selectedEdu, selectedSkills, maxExp]);



  const getVisibleItems = (items, showAll) => showAll ? items : items.slice(0, 3);

  return (
    <>
      {/* <EHeader /> */}
      <div className="talent-page-container">
        <section  className="FindTalent-search-section"> 
          <div className="FindTalent-search-wrapper">
            <input
              type="text"
              placeholder="Search by Skills and Education"
              className="FindTalent-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="FindTalent-search-button">Search</button>
          </div>
          <h1 style={{ marginTop: "40px" }} className="FindTalent-results-title">Jobseekers based on your search</h1>
        </section>

        <div className="FindTalent-layout-body">
          <div className="FindTalent-filters-sidebar">
            <div className="FindTalent-filter-top">
              <span className="FindTalent-filter-label">Apply filters</span>
              <span className="FindTalent-clear-btn" onClick={() => {
                 setSelectedLanguages([]); setSelectedEdu([]); setSelectedSkills([]); setMaxExp(10); setSearchTerm('');
              }}>Clear filter</span>
            </div>

            {/* Languages with View More */}
            <div className="FindTalent-filter-category">
              <h3>Languages</h3>
              {getVisibleItems(filterOptions.languages, showAllLangs).map(lang => (
                <div key={lang} className="FindTalent-checkbox-item">
                  <input type="checkbox" checked={selectedLanguages.includes(lang)} onChange={() => handleFilterChange(lang, selectedLanguages, setSelectedLanguages)} /> {lang}
                </div>
              ))}
              {filterOptions.languages.length > 3 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllLangs(!showAllLangs)}>
                  {showAllLangs ? "View Less" : "View More"}
                </span>
              )}
            </div>

            <div className="FindTalent-filter-category">
              <h3>Experiance</h3>
              <input type="range" min="0" max="10" value={maxExp} onChange={(e) => setMaxExp(e.target.value)} className="FindTalent-exp-slider" />
            </div>

            {/* Education with View More */}
            <div className="FindTalent-filter-category">
              <h3>Education</h3>
              {getVisibleItems(filterOptions.education, showAllEdu).map(edu => (
                <div key={edu} className="FindTalent-checkbox-item">
                  <input type="checkbox" checked={selectedEdu.includes(edu)} onChange={() => handleFilterChange(edu, selectedEdu, setSelectedEdu)} /> {edu}
                </div>
              ))}
              {filterOptions.education.length > 3 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllEdu(!showAllEdu)}>
                  {showAllEdu ? "View Less" : "View More"}
                </span>
              )}
            </div>

            {/* Skills with View More */}
            <div className="FindTalent-filter-category">
              <h3>Skills</h3>
              {getVisibleItems(filterOptions.skills, showAllSkills).map(skill => (
                <div key={skill} className="FindTalent-checkbox-item">
                  <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => handleFilterChange(skill, selectedSkills, setSelectedSkills)} /> {skill}
                </div>
              ))}
              {filterOptions.skills.length > 3 && (
                <span className="FindTalent-view-more-link" onClick={() => setShowAllSkills(!showAllSkills)}>
                  {showAllSkills ? "View Less" : "View More"}
                </span>
              )}
            </div>
          </div>

          <div className="FindTalent-talent-list">
            {filteredTalent.map((user, index) => (
              <ProfileCard key={index} user={user} showActions='true' />)
              )}
            {filteredTalent.length > 0 && <button className="FindTalent-load-more-btn">View more</button>}
          </div>
        </div>
      </div>
    </>
  );
};

