import React, { useState } from 'react'
import './EHeader.css'
import search from '../assets/icon_search.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import profile from '../assets/header_profile.png'
import { Link, useLocation } from 'react-router-dom'
import { ENotification } from './ENotification' 

export const EHeader = () => {
    const [showNotification, setShowNotification] = useState(false);
    const location = useLocation(); 

    const notificationsData = [
        { id: 1, text: "Recruiter viewed your profile", time: "Today, 10:45 am", isRead: false },
        { id: 2, text: "You have an interview invitation", time: "Yesterday, 4:20 pm", isRead: false }
    ];

    const toggleNotification = (e) => {
        e.preventDefault();
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
                    
                    {/* ENotification pass pannumbodhu safety array kuduthuruken */}
                    {showNotification && (
                        <ENotification 
                            notificationsData={notificationsData || []} 
                            showNotification={showNotification} 
                            setShowNotification={setShowNotification} 
                        />
                    )}
                </div>

                {/* Profile Icon */}
                {/* <Link to="">
                    <img className='jheader-icons' src={profile} width={40} alt='Profile' />
                </Link> */}
            </div>
        </header>
    )
}