import React from 'react'
import './EHeader.css'
import search from '../assets/icon_search.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import { Link, useLocation } from 'react-router-dom'
import { ENotification } from './ENotification' 
import { useJobs } from '../JobContext' // Context import pannu machi

export const EHeader = () => {
    // Local state-ah remove pannitu context use pannu
    const { showNotification, setShowNotification } = useJobs();
    const location = useLocation(); 

    const toggleNotification = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Indha click mela pogama thadukum
        setShowNotification(!showNotification);
    };

    return (
        <header className="header">
            <div className="logo">job portal</div>
            
            <div className='search'>
                <img className="searchicon" src={search} alt="search icon" />
                <input className="input" type="text" placeholder='Search for jobs and applicants' />
            </div>

            <div className="auth-links">
                {/* Chat Icon */}
                <Link to="/Job-portal/Employer/Chat">
                    <img 
                        className={location.pathname === "/Job-portal/Employer/Chat" ? 'jheader-icons-active' : 'jheader-icons'} 
                        src={chat} 
                        width={40} 
                        alt='Chat' 
                    />
                </Link>

                {/* Notification Bell Icon */}
                <div className="notification-wrapper" style={{ position: 'relative' }}>
                    <Link to="#" onClick={toggleNotification}>
                        <img 
                            className={showNotification ? 'jheader-icons-active' : 'jheader-icons'} 
                            src={bell} 
                            width={40} 
                            alt='Notifications' 
                        />
                    </Link>
                    
                    {/* ENotification kulla ippo context moolama data pogum, props thevai illa */}
                    {showNotification && <ENotification />}
                </div>
            </div>
        </header>
    )
}