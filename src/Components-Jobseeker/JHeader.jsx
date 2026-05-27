import { React, useEffect, useState } from 'react'
import './JHeader.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import { JNotification } from './JNotification';
import bell_dot from '../assets/header_bell_dot.png'
import { AvatarMenu } from './AvatarMenu';
import home_icon from '../assets/home_icon.png'

//Remove after back end integration
const notificationsData = [
    {
        id: 1,
        text: 'Recruiter viewed your profile',
        time: 'Today, 10:45 am',
        isRead: false,
    },
    {
        id: 2,
        text: 'You have an interview invitation from XYZ Pvt Ltd',
        time: 'Yesterday, 4:20 pm',
        isRead: false,
    },
    {
        id: 3,
        text: 'Application submitted successfully for UI/UX Designer',
        time: 'Yesterday, 4:20 pm',
        isRead: true,
    },
    {
        id: 4,
        text: 'Your profile is 90% complete — finish to get more calls',
        time: 'Yesterday, 4:20 pm',
        isRead: true,
    },
    {
        id: 5,
        text: '5 new jobs match your preferences',
        time: '17 Aug 2025, 9:30 am',
        isRead: true,
    },
    {
        id: 6,
        text: '5 new jobs match your preferences',
        time: '17 Aug 2025, 9:30 am',
        isRead: true,
    },
];


export const JHeader = () => {
    const [showNotification, setShowNotification] = useState(false);
    const newNotificationsCount = notificationsData.filter(n => !n.isRead).length;

    const Location = useLocation();

    const NavLinks = [
        { name: 'Home', path: '/Job-portal/jobseeker/' },
        { name: 'Jobs', path: '/Job-portal/jobseeker/jobs' },
        { name: 'Companies', path: '/Job-portal/jobseeker/companies' },
    ];
    const NavIcons = [
        { image: breifcase, path: "/Job-portal/jobseeker/myjobs" },
        { image: chat, path: "" }
    ]

    return (
        <header className="header">
            <div className="logo">job portal</div>
            <nav className="jheader-nav-links">
                {NavLinks.map((n) => {
                    const isActive = Location.pathname === n.path
                    return (
                        <NavLink key={n.name} to={n.path} className={isActive ? 'jheader-nav-active' : 'jheader-nav-items'}>{n.name}</NavLink >)
                })}
            </nav>

            <div className="auth-links">
                {NavIcons.map((n) => {
                    const isActive = Location.pathname === n.path
                    return (
                        <Link className='nav-icons' to={n.path}><img className={isActive ? 'jheader-icons-active' : 'jheader-icons'} src={n.image} alt='My Jobs' /></Link>
                    )
                })}
                <div onClick={() => setShowNotification(!showNotification)}><img className='jheader-icons' src={newNotificationsCount > 0 ? bell_dot : bell} alt='Notifications' /></div>
                <AvatarMenu />
            </div>
            <JNotification notificationsData={notificationsData} showNotification={showNotification} setShowNotification={setShowNotification} />
        </header>
    )
}
