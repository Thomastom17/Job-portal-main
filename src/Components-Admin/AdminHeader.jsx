import React, { useState, useRef, useEffect } from 'react'
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from "../assets/icon_profile.png"
import Arrow from "../assets/AdminAssets/DownArrow.png"
import Settings from "../assets/icon_settings.png"
import AdminLogout from '../assets/AdminAssets/Logout.png'
 
export const AdminHeader = ({ setActiveTab }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()
    const today = new Date()
    const day = today.toLocaleDateString('en-US', {weekday: 'long'})
    const date = `${today.getDate()}${getDaySuffix(today.getDate())} ${today.toLocaleString('en-US', {month: 'long'})} ${today.getFullYear()}`
 
    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }
 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {document.removeEventListener("mousedown", handleClickOutside)}
    }, [])
 
    return (
        <div className="Admin-header">
            <div className="Admin-header-left">
                <div className="logo">Job Portal</div>
            </div>
 
            <div className="Admin-header-right">
                <div className="Admin-date-section">
                    <div className="Admin-header-day">
                        {day}, {date}
                    </div>
                </div>
 
                <div className="Admin-profile-section" ref={dropdownRef}>
                    <img onClick={() => setShowDropdown(!showDropdown)} src={ProfileIcon} alt="Profile" className="Admin-profile-icon"/>
 
                    <div className="Admin-profile-text">
                        {/* <p className="Admin-welcome-text">Welcome,</p> */}
                        {/* <h4 className="admin-name">Admin</h4> */}
                    </div>
 
                    {/* <div className="Admin-dropdown-arrow" onClick={() => setShowDropdown(!showDropdown)}>
                        <img src={Arrow} alt="Dropdown" />
                    </div> */}
 
                    {showDropdown && (
                        <div className="Admin-profile-dropdown">
                            <div className="Admin-dropdown-item">
                                <img src={Settings}  alt="Settings"/>
                                <span>Settings</span>
                            </div>
 
                            <div className="Admin-dropdown-item Admin-logout"
                                onClick={() => navigate('/Job-portal/employer/dashboard')}
                            >
                                <img src={AdminLogout} alt="Logout"/>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
 
        </div>
    )
}
 