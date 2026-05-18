import React, { useState, useRef } from "react";
import "./RightNotSettings.css";
import mailIcon from "../assets/AdminAssets/mdi-light_email.png";
import notIcon from "../assets/AdminAssets/hugeicons_chat-notification-01.png";
import smsIcon from "../assets/AdminAssets/ix_sms.png";
import bellIcon from "../assets/AdminAssets/mdi_bell-outline.png";
import clockImg from "../assets/AdminAssets/iconamoon_clock-thin.png"; 
import arrowDownImg from "../assets/AdminAssets/iconamoon_arrow-down-2-thin.png";

export const RightNotSettings = () => {
  const [channels, setChannels] = useState({
    email: false, inApp: false, sms: false, push: false,
  });

  const [activeDays, setActiveDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const zoneRef = useRef(null);

  const toggleDay = (day) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleDropdownArrowClick = (e, ref) => {
    e.stopPropagation(); 
    if (ref.current) {
      ref.current.showPicker?.(); 
    }
  };

  const notificationData = [
    { id: 'email', title: 'Email Notifications', desc: 'Receive notification via email', iconImg: mailIcon, color: 'pink' },
    { id: 'inApp', title: 'In-App Notification', desc: 'Receive notification in admin panel', iconImg: notIcon, color: 'green' },
    { id: 'sms', title: 'SMS Notification', desc: 'Receive important alerts via SMS', iconImg: smsIcon, color: 'blue' },
    { id: 'push', title: 'Push Notification', desc: 'Receive push notification in browser', iconImg: bellIcon, color: 'orange' },
  ];

  return (
    <div className="rightnot-container">
      
      {/* 1. NOTIFICATION CHANNEL HEADER */}
      <div className="rightnot-section-header">
        <h3 className="rightnot-title">Notification Channels</h3>
        <p className="rightnot-subtitle">Choose your preferred communication channel</p>
      </div>

      {/* 2. CHANNELS LIST */}
      <div className="rightnot-channels-bordered-div">
        <div className="rightnot-list">
          {notificationData.map((item) => (
            <div key={item.id} className="rightnot-row">
              <div className="rightnot-left">
                <div className={`rightnot-icon-box rightnot-${item.color}-bg`}>
                  <img src={item.iconImg} alt={item.id} className="rightnot-channel-icon-img" />
                </div>
                <div className="rightnot-text">
                  <h4 className="rightnot-item-title">{item.title}</h4>
                  <p className="rightnot-item-desc">{item.desc}</p>
                </div>
              </div>
              <label className="rightnot-switch">
                <input
                  type="checkbox"
                  checked={channels[item.id]}
                  onChange={() => setChannels({...channels, [item.id]: !channels[item.id]})}
                />
                <span className="rightnot-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 3. QUIET HOURS */}
      <div className="rightnot-quiet-hours-div">
        <h3 className="rightnot-title">Quiet Hours</h3>
        <p className="rightnot-subtitle">Set quiet hours to avoid notification at certain times</p>

        <div className="rightnot-time-inputs-row">
          <div className="rightnot-time-group">
            <label className="rightnot-label">Start time</label>
            <div className="rightnot-select-shadow-box">
              <img src={clockImg} className="rightnot-input-icon" alt="clock" />
              <select ref={startRef} className="rightnot-select-element">
                <option>10:00 PM</option>
                <option>11:00 PM</option>
                <option>12:00 PM</option>
                <option>01:00 AM</option>
                <option>02:00 AM</option>
              </select>
              <img 
                src={arrowDownImg} 
                className="rightnot-arrow-icon" 
                alt="arrow" 
                onClick={(e) => handleDropdownArrowClick(e, startRef)}
              />
            </div>
          </div>

          <div className="rightnot-time-group">
            <label className="rightnot-label">End time</label>
            <div className="rightnot-select-shadow-box">
              <img src={clockImg} className="rightnot-input-icon" alt="clock" />
              <select ref={endRef} className="rightnot-select-element">
                <option>07:00 AM</option>
                <option>08:00 AM</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
              </select>
              <img 
                src={arrowDownImg} 
                className="rightnot-arrow-icon" 
                alt="arrow" 
                onClick={(e) => handleDropdownArrowClick(e, endRef)}
              />
            </div>
          </div>
        </div>

        <div className="rightnot-days-row">
           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <button 
           key={day}
           type="button" 
           className={`rightnot-day-btn ${activeDays.includes(day) ? 'rightnot-active' : ''}`}
           onClick={() => toggleDay(day)}
           >
          {day}
         </button>
          ))}
        </div>

        <div className="rightnot-select-shadow-box rightnot-full-width">
          <img src={clockImg} className="rightnot-input-icon" alt="clock" />
          <select ref={startRef} className="rightnot-select-element">
            <option>Time zone: (UTC+05:30) Asia/Kolkata</option>
            <option>Time zone: (UTC+00:00) GMT</option>
          </select>
          <img 
            src={arrowDownImg} 
            className="rightnot-arrow-icon" 
            alt="arrow" 
            onClick={(e) => handleDropdownArrowClick(e, startRef)}
          />
        </div>
      </div>
    </div>
  );
};