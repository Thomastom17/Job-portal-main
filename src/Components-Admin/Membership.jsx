import React, { useState } from 'react';
import './Membership.css';
import { Tier1plan } from './Tier1Plan'; 
import { Tier2plan } from './Tier2Plan';
import { Tier3plan } from './Tier3Plan';

export const Membership = () => {
  const [activeTab, setActiveTab] = useState("Tier1Plan");

  const renderPlanPage = () => {
    switch (activeTab) {
      case "Tier1Plan": 
        return <Tier1plan />;
      case "Tier2Plan": 
        return <Tier2plan />;
      case "Tier3Plan": 
        return <Tier3plan />;
      default: 
        return <div className="membership-no-plan">Please select a membership plan.</div>;
    }
  };

  return (
    
    <div className="membership-main-wrapper">
      
      
      <div className="membership-sidebar-grid">
        <h2 className="membership-sidebar-title">Membership Tiers</h2>
        
        {/* Tier 1 Box */}
        <div className={`membership-plan-card ${activeTab === "Tier1Plan" ? "active-card" : ""}`}>
          <button className="membership-select-btn" onClick={() => setActiveTab("Tier1Plan")}>
            Tier 1 Plan
          </button>
        </div>

        {/* Tier 2 Box */}
        <div className={`membership-plan-card ${activeTab === "Tier2Plan" ? "active-card" : ""}`}>
          <button className="membership-select-btn" onClick={() => setActiveTab("Tier2Plan")}>
            Tier 2 Plan
          </button>
        </div>

        {/* Tier 3 Box */}
        <div className={`membership-plan-card ${activeTab === "Tier3Plan" ? "active-card" : ""}`}>
          <button className="membership-select-btn" onClick={() => setActiveTab("Tier3Plan")}>
            Tier 3 Plan
          </button>
        </div>
      </div>

      <div className="membership-form-content">
        {renderPlanPage()}
      </div>

    </div>
  );
};