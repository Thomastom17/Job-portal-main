import React, { useState, useEffect } from 'react';
import './Membership.css';
import { MembershipPlanSchema } from '../Components-Admin/MembershipPlanSchema'; 
import Save from '../assets/AdminAssets/SaveDraft.png';

export const Membership = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  

  const [plansList, setPlansList] = useState(MembershipPlanSchema);

  const defaultFeatures = [
    { id: 1, label: "Number Of Jobs Post", val: "10", active: true },
    { id: 2, label: "Featured Job Listings", val: "1", active: true },
    { id: 3, label: "Resume Access Limit", val: "20", active: true },
    { id: 4, label: "Applicant View Limit", val: "20", active: true },
    { id: 5, label: "Priority Support", val: "No", active: false },
  ];

  const [formData, setFormData] = useState({
    tierType: "",
    planName: "",
    planType: "",
    description: "",
    price: "0",
    billingCycle: "Monthly",
    duration: "30",
    discount: "0",
    tax: "18",
    planStatus: "Active",
    features: [],
    isDefault: false,
    isTrialEnabled: false,
    TrailDuration: "0",
    GraceTime: "",
    planTags: [],
    isAutoRenewal: false
  });

  const [totalPayable, setTotalPayable] = useState(0);

  const [previewData, setPreviewData] = useState({
    planName: "",
    planType: "",
    billingCycle: "Monthly",
    features: [],
    payableAmount: "0.00"
  });

  const calculatePayable = (price, discount, tax) => {
    const priceNum = parseFloat(price) || 0;
    const discountNum = parseFloat(discount) || 0;
    const taxNum = parseFloat(tax) || 0;

    const priceAfterDiscount = priceNum - (priceNum * (discountNum / 100));
    const finalPrice = priceAfterDiscount + (priceAfterDiscount * (taxNum / 100));
    return finalPrice.toFixed(2);
  };

  const handlePlanSelect = (plan) => {
    setActiveTab(plan.tierType); 
    setSelectedPlanData(plan);

    const initialFeatures = plan.features || defaultFeatures;
    const initialPayable = calculatePayable(plan.price || "0", plan.discount || "0", plan.tax || "18");

    const mappedData = {
      tierType: plan.tierType,
      planName: plan.planName || plan.tierType || "Custom Plan",
      planType: plan.planType || "Starter Plan",
      description: plan.description || "Plan details and description...",
      price: plan.price || "0",
      billingCycle: plan.billingCycle || "Monthly",
      duration: plan.duration || "30",
      discount: plan.discount || "0",
      tax: plan.tax || "18",
      planStatus: plan.planStatus || "Active",
      features: initialFeatures,
      isDefault: plan.isDefault ?? true,
      isTrialEnabled: plan.isTrialEnabled ?? false,
      TrailDuration: plan.TrailDuration || "0",
      GraceTime: plan.GraceTime || "",
      planTags: plan.planTags || ["Starter"],
      isAutoRenewal: plan.isAutoRenewal ?? false
    };

    setFormData(mappedData);
    setTotalPayable(initialPayable);

    setPreviewData({
      planName: mappedData.planName,
      planType: mappedData.planType,
      billingCycle: mappedData.billingCycle,
      features: JSON.parse(JSON.stringify(initialFeatures)), 
      payableAmount: initialPayable
    });
  };

  const goBackToMembership = () => {
    setActiveTab("Home");
    setSelectedPlanData(null);
  };

  useEffect(() => {
    if (activeTab !== "Home") {
      const livePayable = calculatePayable(formData.price, formData.discount, formData.tax);
      setTotalPayable(livePayable);
    }
  }, [formData.price, formData.discount, formData.tax, activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleChange = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
  };

  const handleFeatureValChange = (id, newVal) => {
    const updatedFeatures = formData.features.map(f => f.id === id ? { ...f, val: newVal } : f);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleFeatureToggle = (id) => {
    const updatedFeatures = formData.features.map(f => f.id === id ? { ...f, active: !f.active } : f);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleDeleteFeature = (id) => {
    setFormData({ ...formData, features: formData.features.filter(f => f.id !== id) });
  };

  const handleUpdatePreview = () => {
    const finalizedPayable = calculatePayable(formData.price, formData.discount, formData.tax);

    setPreviewData({
      planName: formData.planName,
      planType: formData.planType,
      billingCycle: formData.billingCycle,
      features: JSON.parse(JSON.stringify(formData.features)), 
      payableAmount: finalizedPayable
    });

    alert("Preview card updated with latest changes!");
  };

  const handleSaveDraft = () => {

    const updatedSchemaList = plansList.map((item) => {
      if (item.tierType === formData.tierType) {
        return {
          ...item,
          planName: formData.planName,
          planType: formData.planType,
          description: formData.description,
          price: formData.price,
          billingCycle: formData.billingCycle,
          duration: formData.duration,
          discount: formData.discount,
          tax: formData.tax,
          planStatus: formData.planStatus,
          features: JSON.parse(JSON.stringify(formData.features)), 
          isDefault: formData.isDefault,
          isTrialEnabled: formData.isTrialEnabled,
          TrailDuration: formData.TrailDuration,
          GraceTime: formData.GraceTime,
          planTags: formData.planTags,
          isAutoRenewal: formData.isAutoRenewal
        };
      }
      return item;
    });

  
    setPlansList(updatedSchemaList);

  

    console.log("Updated Schema Master List Database View:", updatedSchemaList);
    alert(`${formData.tierType.replace("Plan", " Plan")} schema changes saved successfully!`);
    
    // Auto back to main menu after save
    setActiveTab("Home");
    setSelectedPlanData(null);
  };

  const renderPlanPage = () => {
    return (
      <div className="tier-plan-page">
        <button className="back-to-membership-btn" onClick={goBackToMembership}>← Back to Membership</button>
        
        <div className="membership-layout-flex">
          <div className="form-left-sections">
            
            {/* Section 1: Basic details */}
            <div className="section-card">
              <h3><span className="section-number">1</span> Basic plan details ({formData.tierType.replace("Plan", " Plan")})</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Plan name*</label>
                  <input type="text" name="planName" className="form-input" value={formData.planName} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Section 2: Pricing mapping */}
            <div className="section-card">
              <h3><span className="section-number">2</span> Pricing & Duration</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Price (₹)*</label>
                  <input type="number" name="price" className="form-input" value={formData.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Billing Cycle*</label>
                  <input type="text" name="billingCycle" className="form-input" value={formData.billingCycle} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Duration (Days)*</label>
                  <input type="number" name="duration" className="form-input" value={formData.duration} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-grid-3" style={{ marginTop: '15px', alignItems: 'center' }}>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input type="number" name="discount" className="form-input" value={formData.discount} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Tax (%)</label>
                  <input type="number" name="tax" className="form-input" value={formData.tax} onChange={handleInputChange} />
                </div>
                <div className="total-payable-badge">
                  <span style={{ fontSize: '12px', color: '#16a34a', display: 'block' }}>Total Payable</span>
                  <strong className="payable-amount">₹ {totalPayable}</strong>
                  <span style={{ fontSize: '12px', color: '#16a34a'}}> /{formData.billingCycle.toLowerCase()}</span>
                </div>
              </div>
            </div>

            {/* Section 3: Features table list */}
            <div className="section-card">
              <h3><span className="section-number">3</span> Features & Limits</h3>
              <table className="features-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>FEATURE NAME</th>
                    <th style={{ textAlign: 'center' }}>VALUE</th>
                    <th style={{ textAlign: 'center' }}>INCLUDED</th>
                    <th style={{ textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.features && formData.features.map((feat) => (
                    <tr key={feat.id}>
                      <td style={{ textAlign: 'left' }}>⋮⋮ {feat.label}</td>
                      <td style={{ textAlign: 'center' }}>
                        <input type="text" className="table-input-val" style={{ width: '60px', padding: '5px', textAlign: 'center', border: '1px solid #cbd5e1', borderRadius: '4px' }} value={feat.val} onChange={(e) => handleFeatureValChange(feat.id, e.target.value)} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <label className="switch-toggle">
                          <input type="checkbox" checked={feat.active} onChange={() => handleFeatureToggle(feat.id)} />
                          <span className="slider-round"></span>
                        </label>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" onClick={() => handleDeleteFeature(feat.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 4: Trial Settings */}
            <div className="section-card">
              <h3><span className="section-number">4</span> Trial Settings</h3>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <div className="form-group">
                  <label>Free Trial Available</label>
                  <label className="switch-toggle" style={{ marginTop: '5px' }}>
                    <input type="checkbox" checked={formData.isTrialEnabled} onChange={() => handleToggleChange('isTrialEnabled')} />
                    <span className="slider-round"></span>
                  </label>
                </div>
                {formData.isTrialEnabled && (
                  <div className="form-group">
                    <label>Total Duration (Days)</label>
                    <input type="number" name="TrailDuration" className="form-input" value={formData.TrailDuration} onChange={handleInputChange} style={{ width: '120px' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Section 5: Advanced Options */}
            <div className="section-card">
              <h3><span className="section-number">5</span> Advanced Settings</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Auto Renewal</label>
                  <label className="switch-toggle" style={{ marginTop: '5px' }}>
                    <input type="checkbox" checked={formData.isAutoRenewal} onChange={() => handleToggleChange('isAutoRenewal')} />
                    <span className="slider-round"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-action-buttons">
              <button type="button" onClick={handleUpdatePreview} className="membership-cr-btn-preview">Update Preview</button>
              <button onClick={handleSaveDraft} className="membership-cr-btn-save">
                  <img src={Save} alt="" className="membership-cr-btn-icon" /> Save Draft
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR PREVIEW */}
          <div className="preview-right-sidebar">
            <div className="preview-card-container">
              <div className="preview-card-banner">
                <h4>{previewData.planName ? previewData.planName.toUpperCase() : ""}</h4>
              </div>
              <div className="preview-card-body">
                <h2 className="preview-price">₹ {previewData.payableAmount}<span>/{previewData.billingCycle.toLowerCase() === 'yearly' ? 'year' : 'month'}</span></h2>
                <span className="preview-type">{previewData.planType}</span>
                <hr className="preview-divider" />
                <ul className="preview-features-list">
                  {previewData.features && previewData.features.map((feat) => (
                    <li key={feat.id} className="preview-feature-item" style={{ color: feat.active ? '#334155' : '#94a3b8', textDecoration: feat.active ? 'none' : 'line-through' }}>
                      <span style={{ color: feat.active ? '#22c55e' : '#cbd5e1' }}>{feat.active ? "✔" : "✖"}</span>
                      <span>{feat.val} {feat.label}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-get-started">Get started</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="membership-main-wrapper">
      {activeTab === "Home" ? (
        <div className="membership-selection-container">
          <h2 className="membership-title">Membership Tiers</h2>
          <div className="membership-grid-layouts">
            {/* 3. CORE CHANGE: Loop moolama map panna static variable-ah state variables-ah maathunadhu */}
            {plansList.map((plan, index) => (
              <div 
                key={plan.id || plan.tierType || index} 
                className="membership-plan-card" 
                onClick={() => handlePlanSelect(plan)}
              >
                <span className="membership-card-text">
                  {plan.tierType.replace("Plan", " Plan")}
                </span>
              </div>
            ))}
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