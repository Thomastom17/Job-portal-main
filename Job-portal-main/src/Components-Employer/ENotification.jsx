import React, { useEffect, useRef } from "react";
import '../Components-Jobseeker/JNotification.css';
import bell from '../assets/header_bell.png';
import bell_dot from '../assets/header_bell_dot.png';
import { useJobs } from "../JobContext";

export const ENotification = ({ showNotification, setShowNotification }) => {
   
    const { 
        employerNotifications, 
        setEmployerNotifications, 
        activeMenuId, 
        setActiveMenuId 
    } = useJobs();
    
    const containerRef = useRef(null);

    // Filter unread count
    const newNotificationsCount = employerNotifications?.filter(n => !n.isRead).length || 0;

    // MARK AS READ
    const handleMarkAsRead = (id) => {
        setEmployerNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
        setActiveMenuId(null);
    };

    // MARK AS UNREAD
    const handleMarkAsUnread = (id) => {
        setEmployerNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: false } : n)
        );
        setActiveMenuId(null);
    };

    // DELETE SINGLE
    const handleDelete = (id) => {
        setEmployerNotifications(prev => prev.filter(n => n.id !== id));
        setActiveMenuId(null);
    };

    // CLEAR ALL
    const handleClearAll = () => {
        setEmployerNotifications([]);
        setActiveMenuId(null);
    };

    // TOGGLE MENU
    const toggleMenu = (id, event) => {
        event.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // OUTSIDE CLICK LOGIC
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
            className={`notifications-container ${showNotification ? "show" : "hide"}`}
        >
            {/* HEADER SECTION */}
            <div className="notifications-header">
                <div className="notifications-heading-container">
                    <img
                        src={newNotificationsCount > 0 ? bell_dot : bell}
                        alt="bell"
                        className="notification-header-icons"
                    />
                    <h2>Notifications</h2>
                </div>
                <button className="close-btn" onClick={() => setShowNotification(false)}>
                    &times;
                </button>
            </div>

            {/* SUB-HEADER SECTION */}
            <div className="notifications-subheader">
                <span>Stay Up to Date</span>
                {newNotificationsCount > 0 && (
                    <span className="new-notifications-count">
                        {newNotificationsCount} New Notifications
                    </span>
                )}
                <button className="clear-all-link" onClick={handleClearAll}>
                    Clear all
                </button>
            </div>

            {/* NOTIFICATIONS LIST */}
            <div className="notifications-list">
                {employerNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={notification.isRead ? "notification-old-item" : "notification-new-item"}
                    >
                        <div className="notification-content">
                            <p className="notification-text">{notification.text}</p>
                            <p className="notification-time">{notification.time}</p>
                        </div>

                        <div className="more-options-wrapper">
                            <button
                                className="more-options-btn"
                                onClick={(e) => toggleMenu(notification.id, e)}
                            >
                                ⋮
                            </button>

                            {activeMenuId === notification.id && (
                                <div className="overflow-menu">
                                    {notification.isRead ? (
                                        <button
                                            className="menu-item"
                                            onClick={() => handleMarkAsUnread(notification.id)}
                                        >
                                            Mark as unread
                                        </button>
                                    ) : (
                                        <button
                                            className="menu-item"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        className="menu-item delete-item"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {employerNotifications.length === 0 && (
                    <p style={{ padding: "20px", textAlign: "center", color: "#777" }}>
                        No notifications for you
                    </p>
                )}
            </div>
        </div>
    );
};