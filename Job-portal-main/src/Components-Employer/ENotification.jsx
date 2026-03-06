import React, { useEffect, useRef } from "react";
import '../Components-Jobseeker/JNotification.css'; 
import bell from '../assets/header_bell.png';
import bell_dot from '../assets/header_bell_dot.png';
import { useJobs } from "../JobContext";

export const ENotification = () => {
    const { employerNotifications, setEmployerNotifications, activeMenuId, setActiveMenuId, showNotification, setShowNotification } = useJobs();
    
    const containerRef = useRef(null);
    const newNotificationsCount = employerNotifications?.filter(n => !n.isRead).length || 0;

    const handleMarkAsRead = (id) => {
        setEmployerNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        setActiveMenuId(null);
    };

    const handleMarkAsUnread = (id) => {
        setEmployerNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: false } : n));
        setActiveMenuId(null);
    };
    
    const handleBoxClick = (e) => {
    e.stopPropagation(); 
   };

    const handleDelete = (id) => {
        setEmployerNotifications(prev => prev.filter(n => n.id !== id));
        setActiveMenuId(null);
    };

    const handleClearAll = () => {
        setEmployerNotifications([]);
        setActiveMenuId(null);
    };

    const toggleMenu = (id, event) => {
        event.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                
                setShowNotification(false);
                setActiveMenuId(null);
            }
        }; 

        if (showNotification) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showNotification, setShowNotification, setActiveMenuId]);

    return (
        <div 
            ref={containerRef} 
            className={`notifications-container ${showNotification ? 'show' : ''}`}
            style={{ display: showNotification ? 'block' : 'none' }} 
            onClick={handleBoxClick} 
        >
            <div className="notifications-header">
                <div className="notifications-heading-container">
                    <img className="notification-header-icons" src={newNotificationsCount > 0 ? bell_dot : bell} alt="Notification" />
                    <h2>Notification</h2>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} className="notifications-close-btn">&times;</button>
            </div>

            <div className="notifications-subheader">
                <div>
                    <span>Stay up to date</span>
                    {newNotificationsCount > 0 && <span className="new-notifications-count"> {newNotificationsCount} New</span>}
                </div>
                <button className="clear-all-btn" onClick={handleClearAll}>Clear all</button>
            </div>

            <div className="notifications-list">
                {employerNotifications.map((notification) => (
                    <div key={notification.id} className={notification.isRead ? "notification-old-item" : "notification-new-item"}>
                        <div className="notification-content">
                            <p className="notification-text">{notification.text}</p>
                            <p className="notification-time">{notification.time}</p>
                        </div>
                        <div className="more-options-wrapper">
                            <button className="more-options-btn" onClick={(e) => toggleMenu(notification.id, e)}>⋮</button>
                            {activeMenuId === notification.id && (
                                <div className="overflow-menu">
                                    {notification.isRead ? (
                                        <button className="menu-item" onClick={() => handleMarkAsUnread(notification.id)}>Mark as Unread</button>
                                    ) : (
                                        <button className="menu-item" onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                                    )}
                                    <button className="menu-item delete-item" onClick={() => handleDelete(notification.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {employerNotifications.length === 0 && (
                    <p style={{ padding: "20px", textAlign: "center", color: "#777" }}>No notifications yet</p>
                )}
            </div>
        </div>
    );
};