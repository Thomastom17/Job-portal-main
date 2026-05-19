import React, { useState } from 'react';
import './Membership.css';
import { Tier1plan } from './Tier1Plan'; 
import { Tier2plan } from './Tier2Plan';
import { Tier3plan } from './Tier3Plan';
import { MembershipPlanSchema } from '../Components-Admin/MembershipPlanSchema'; 

export const Membership = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedPlanData, setSelectedPlanData] = useState(null);

  const handlePlanSelect = (tierName) => {
    setActiveTab(tierName);
    
    const matchedData = MembershipPlanSchema.find(plan => plan.tierType === tierName);
    setSelectedPlanData(matchedData);
  };

  const goBackToMembership = () => {
    setActiveTab("Home");
    setSelectedPlanData(null);
  };

  const renderPlanPage = () => {
    if (!selectedPlanData) {
      return (
        <div className="error-container">
          <p>Machi, data fetch aagula! Enna aachunu check pannu.</p>
          <button className="back-to-membership-btn" onClick={goBackToMembership}>Go Back</button>
        </div>
      );
    }

    switch (activeTab) {
      case "Tier1Plan": 
        return <Tier1plan onBack={goBackToMembership} initialData={selectedPlanData} />;
      case "Tier2Plan": 
        return <Tier2plan onBack={goBackToMembership} initialData={selectedPlanData} />;
      case "Tier3Plan": 
        return <Tier3plan onBack={goBackToMembership} initialData={selectedPlanData} />;
      default: 
        return null;
    }
  };

  return (
    <div className="membership-main-wrapper">
      {activeTab === "Home" ? (
        <div className="membership-selection-container">
          <h2 className="membership-title">Membership Tiers</h2>
          <div className="membership-grid-layouts">
            
            <div className="membership-plan-card" onClick={() => handlePlanSelect("Tier1Plan")}>
              <span className="membership-card-text">Tier 1 Plan</span>
            </div>

            <div className="membership-plan-card" onClick={() => handlePlanSelect("Tier2Plan")}>
              <span className="membership-card-text">Tier 2 Plan</span>
            </div>

            <div className="membership-plan-card" onClick={() => handlePlanSelect("Tier3Plan")}>
              <span className="membership-card-text">Tier 3 Plan</span>
            </div>

          </div>
        </div>
      ) : (
        <div className="membership-form-content">
          {renderPlanPage()}
        </div>
      )}
    </div>
  );
};