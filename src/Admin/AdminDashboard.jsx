import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, Ticket, Settings, 
  Search, Bell, ChevronDown, TrendingUp, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './AdminDashboard.css';

export function AdminDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink to={to} className="sidebar-link">
    <Icon size={18} /> <span>{label}</span>
  </NavLink>
);

const StatCard = ({ icon: Icon, label, value, growth, color }) => (
  <div className="main-stat-card">
    <div className="main-stat-left">
      <div className={`icon-box ${color}`}><Icon size={20} /></div>
      <div className="main-stat-info"><span className="main-stat-value">{value}</span><span className="main-stat-label">{label}</span></div>
    </div>
    <div className="growth-wrapper"><TrendingUp size={14} /><span>{growth}</span></div>
  </div>
);

  // Logic to generate years (e.g., 10 years back and 10 years forward)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Starts from Monday
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const days = [];

    // Specific dots for example
    const dots = [6, 21, 23];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push(<div key={`p-${i}`} className="day prev">{prevMonthDays - i}</div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isSelected = d === selectedDate.getDate() && 
                         month === selectedDate.getMonth() && 
                         year === selectedDate.getFullYear();
      
      days.push(
        <div 
          key={d} 
          className={`day ${isSelected ? 'active' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, d))}
        >
          {d}
          {dots.includes(d) && <span className="blue-dot"></span>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="dashboard-root">
      <aside className="sidebar-container">
        <div className="sidebar-logo"><h2>JOB PORTAL</h2></div>
        <nav className="sidebar-nav">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
          <SidebarItem icon={Users} label="Users" to="/users" />
          <SidebarItem icon={Briefcase} label="Jobs" to="/jobs" />
          <SidebarItem icon={Ticket} label="Tickets" to="/tickets" />
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </nav>
      </aside>

      <div className="main-viewport">
        <header className="header-navbar">
          <div className="welcome-banner">
            <h3>Welcome Back, Naveen 👋</h3>
            <p>Your Team's Success Starts Here!</p>
          </div>
          <div className="navbar-controls">
            <div className="search-box"><Search size={18} /><input type="text" placeholder="Search" /></div>
            <div className="notif-icon"><Bell size={22} fill="#FFD700" color="#FFD700" /></div>
            <div className="profile-pill"><span>Naveen</span><ChevronDown size={14} /></div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="content-grid">
            <div className="content-card experience-card">
              <h3>Top Experience Levels</h3>
              <p className="sub-text">Applicants by Experience Level</p>
              <div className="experience-list">
                {[{l:'Entry',p:70,c:'#4A76FD'},{l:'Junior',p:55,c:'#FFAC5F'},{l:'Mid',p:40,c:'#45CCE1'},{l:'Senior',p:20,c:'#A17DFF'}].map((item, index) => (
                  <div key={index} className="exp-item">
                    <span className="exp-label">{item.l} Level</span>
                    <div className="exp-bar-bg"><div className="exp-bar-fill" style={{ width: `${item.p}%`, backgroundColor: item.c }}></div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* FULLY FUNCTIONAL CALENDAR */}
            <div className="content-card calendar-card">
              <div className="calendar-header">
                <button className="nav-btn" onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button>
                
                <div className="selectors">
                  <select className="date-select" value={currentDate.getMonth()} onChange={handleMonthChange}>
                    {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
                  </select>
                  <select className="date-select" value={currentDate.getFullYear()} onChange={handleYearChange}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <button className="nav-btn" onClick={() => changeMonth(1)}><ChevronRight size={16} /></button>
              </div>
              <div className="calendar-grid">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d} className="weekday">{d}</div>)}
                {renderCalendar()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
