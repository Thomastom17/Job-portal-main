import React from 'react';
import { 
  LayoutDashboard, Users, UserCog, Briefcase, 
  Activity, ClipboardList, BarChart3, Settings, 
  Search, Bell 
} from 'lucide-react';
import './AdminAfterLogin.css';

export function AdminAfterLogin() {
  
  function SidebarItem({ icon: Icon, label, active }) {
    return (
      <div className={`sidebar-item ${active ? 'active' : ''}`}>
        <Icon size={20} />
        <span>{label}</span>
      </div>
    );
  }

  function StatCard({ icon: Icon, label, value, growth }) {
    return (
      <div className="stat-card">
        <div className="stat-info-wrapper">
          <Icon size={24} className="stat-icon" />
          <div className="stat-details">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        </div>
        <span className="stat-growth">{growth}</span>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* 1. TOP HEADER (Full Width) */}
      <header className="top-header">
        <div className="header-left">
          <h2 className="logo-text">job portal</h2>
          <span className="sub-logo">Administrator</span>
        </div>
        
        <div className="header-right">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search" />
          </div>
          <div className="icon-group">
            <div className="notification">
              <Bell size={20} />
              <span className="badge"></span>
            </div>
            <div className="admin-profile">
              <span>Administrator login</span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* 2. SIDEBAR (Below Header) */}
        <aside className="sidebar">
          <div className="sidebar-brand-box">
             <h3>Administrator</h3>
          </div>
          <nav className="sidebar-nav">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={Users} label="User Management" />
            <SidebarItem icon={UserCog} label="Role Management" />
            <SidebarItem icon={Briefcase} label="Job Monitoring" />
            <SidebarItem icon={Activity} label="Activity Monitoring" />
            <SidebarItem icon={ClipboardList} label="Reports" />
            <SidebarItem icon={BarChart3} label="Analytics" />
          </nav>
          <div className="sidebar-footer">
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </aside>

        {/* 3. CONTENT AREA */}
        <main className="content-area">
          <h2 className="page-heading">Dashboard</h2>

          <div className="stats-container">
            <StatCard icon={Users} value="15254" label="Total user" growth="+23%" />
            <StatCard icon={Briefcase} value="4321" label="Total Jobs" growth="+32%" />
            <StatCard icon={Users} value="1287" label="Active companies" growth="+30%" />
            <StatCard icon={ClipboardList} value="482" label="New Reports" growth="+23%" />
          </div>

          <div className="info-cards-stack">
            <div className="info-card">
              <h3>User Role & Management</h3>
              <p>Manage Users, Assign Roles, and Control access permissions</p>
            </div>
            <div className="info-card">
              <h3>Job & Activity Monitoring</h3>
              <p>Track Job Status, Monitor activities, and review system performance</p>
            </div>
            <div className="info-card">
              <h3>Reports & Analytics</h3>
              <p>Generate reports and analyze system data using charts and statistics</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
