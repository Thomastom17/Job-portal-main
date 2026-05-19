import React, { useState, useEffect } from 'react';
import './Tier1Plan.css'; 
import Save from '../assets/AdminAssets/SaveDraft.png';

export const Tier1plan = ({ onBack, initialData }) => {
  const defaultFeatures = [
    { id: 1, label: "Number Of Jobs Post", val: "10", active: true },
    { id: 2, label: "Featured Job Listings", val: "1", active: true },
    { id: 3, label: "Resume Access Limit", val: "20", active: true },
    { id: 4, label: "Applicant View Limit", val: "20", active: true },
    { id: 5, label: "Priority Support", val: "No", active: false },
  ];

 
  const [formData, setFormData] = useState({
    tierType: "Tier1Plan",
    planName: initialData?.planName || "Basic Employer Plan",
    planType: initialData?.planType || "Starter Plan",
    description: initialData?.description || "A basic plan for small businesses starting out...",
    price: initialData?.price || "0",
    billingCycle: initialData?.billingCycle || "Monthly",
    duration: initialData?.duration || "30",
    discount: initialData?.discount || "5",
    tax: initialData?.tax || "18",
    planStatus: initialData?.planStatus || "Active",
    features: initialData?.features || defaultFeatures,
    isDefault: initialData?.isDefault ?? true,
    isTrialEnabled: initialData?.isTrialEnabled ?? false,
    TrailDuration: initialData?.TrailDuration || "0",
    GraceTime: initialData?.GraceTime || "",
    planTags: initialData?.planTags || ["Starter"],
    isAutoRenewal: initialData?.isAutoRenewal ?? false
  });
  console.log(formData);
  

  const [totalPayable, setTotalPayable] = useState(0);

  const [previewData, setPreviewData] = useState({
    planName: formData.planName,
    planType: formData.planType,
    billingCycle: formData.billingCycle,
    features: JSON.parse(JSON.stringify(formData.features)), // Deep copy
    payableAmount: "0.00"
  });


  useEffect(() => {
    const priceNum = parseFloat(formData.price) || 0;
    const discountNum = parseFloat(formData.discount) || 0;
    const taxNum = parseFloat(formData.tax) || 0;

    const priceAfterDiscount = priceNum - (priceNum * (discountNum / 100));
    const finalPrice = priceAfterDiscount + (priceAfterDiscount * (taxNum / 100));
    
    setTotalPayable(finalPrice.toFixed(2));
  }, [formData.price, formData.discount, formData.tax]);

  useEffect(() => {
    setPreviewData(prev => ({ ...prev, payableAmount: totalPayable }));
  }, [initialData, totalPayable && previewData.payableAmount === "0.00"]);

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
    setPreviewData({
      planName: formData.planName,
      planType: formData.planType,
      billingCycle: formData.billingCycle,
      features: JSON.parse(JSON.stringify(formData.features)),
      payableAmount: totalPayable
    });
  };


  const handleSaveDraft = () => {
    console.log("Final Saved Data Object (Tier 1 - Schema Matched):", formData);
    alert("Tier 1 Plan details saved successfully");
  };

  return (
    <div className="tier-plan-page">
      <button className="back-to-membership-btn" onClick={onBack}>← Back to Membership</button>
      
      <div className="membership-layout-flex">
        <div className="form-left-sections">
          
          {/* Section 1 */}
          <div className="section-card">
            <h3><span className="section-number">1</span> Basic plan details (Tier 1)</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Plan name*</label>
                <input type="text" name="planName" className="form-input" value={formData.planName} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Section 2 */}
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

          {/* Section 3 */}
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
                {formData.features.map((feat) => (
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

          {/* Section 4 */}
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

          {/* Section 5 */}
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

          {/* Action Buttons */}
          <div className="form-action-buttons">
            <button type="button" onClick={handleUpdatePreview} className="membership-cr-btn-preview">Update Preview</button>
            <button onClick={handleSaveDraft} className="membership-cr-btn-save">
                <img src={Save} alt="" className="membership-cr-btn-icon" /> Save Draft
            </button>
          </div>

        </div>

        {/* PREVIEW SIDEBAR */}
        <div className="preview-right-sidebar">
          <div className="preview-card-container">
            <div className="preview-card-banner">
              <h4>{previewData.planName.toUpperCase()}</h4>
            </div>
            <div className="preview-card-body">
              <h2 className="preview-price">₹ {previewData.payableAmount}<span>/{previewData.billingCycle.toLowerCase() === 'yearly' ? 'year' : 'month'}</span></h2>
              <span className="preview-type">{previewData.planType}</span>
              <hr className="preview-divider" />
              <ul className="preview-features-list">
                {previewData.features.map((feat) => (
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