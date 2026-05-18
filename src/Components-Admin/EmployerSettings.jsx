import React, { useState } from "react";
import "./EmployerSettings.css";
import Info from '../assets/AdminAssets/Circle-Info.png'
import Savechanges from '../assets/AdminAssets/Save-White.png'
 
export const EmployerSettings = () => {

  const [settings, setSettings] = useState({
    employerRegistration: false,
    emailVerification: false,
    mobileVerification: false,
    approvalType: 'Manual Type',
    requiredDocs: {
      companyCert: false,
      gstCert: false,
      businessEmail: false,
      companyWebsite: false,
    },
    preferences: {
      multipleCompany: false,
      multipleUsers: false,
      companyReviews: false,
      companyBranding: false,
      featuredEmployer: false,
    },
    notifications: {
      email: false,
      newSignups: false,
      alerts: false,
      announcements: false,
      weeklySummary: false,
    },
    defaultPlan: 'Free plan',
    accountStatus: 'Pending approval',
    jobExpireDays: 30,
    maxJobPosts: 10,
    featuredJobLimit: 3,
    allowEditAfterApproval: false,
  });

  const handleChange = (category, field, value, isNested = false) => {
    if (isNested) {
      setSettings(prev => ({
        ...prev,
        [category]: { ...prev[category], [field]: value }
      }));
    } else {
      setSettings(prev => ({ ...prev, [field]: value }));
    }
  };
  console.log(settings)

  const handleSave = () => {
    console.log("Saving all settings to Database:", settings);
    alert("Settings saved successfully!");
  };

  return (
    // <div className="Jobseeker-Set-registration-wrapper" >
    <div className="Jobseeker-Set-main-wrapper">
      <div className="Jobseeker-Set-registration">
        <div className="Jobseeker-Set-registration-left">
          <h2>Registration & Access</h2>
          <p className="Jobseeker-Set-subtitle">Configure how employers can register and access the platform</p>
          
          {/* Toggle Switches */}
          {[
            { label: 'Employer Registration', desc: 'Allow new users to register', field: 'employerRegistration' },
            { label: 'Email Verification', desc: 'Require email verification', field: 'emailVerification' },
            { label: 'Mobile Verification', desc: 'Require mobile number verification', field: 'mobileVerification' }
          ].map(item => (
            <div className="Jobseeker-Set-details" key={item.field}>
              <div className="Jobseeker-Set-details-content">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
              <label className="Jobseeker-Set-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings[item.field]} 
                  onChange={(e) => handleChange(null, item.field, e.target.checked)}
                />
                <span className="Jobseeker-Set-toggle-slider"></span>
              </label>
            </div>
          ))}

          <div className="Jobseeker-Set-details">
            <div className="Jobseeker-Set-details-content">
              <h4>Approval Type</h4>
              <p>Choose how new employer accounts are approved</p>
            </div>
            <select 
              className="Jobseeker-Set-approval"
              value={settings.approvalType}
              onChange={(e) => handleChange(null, 'approvalType', e.target.value)}
            >
              <option>Manual Type</option>
              <option>Automatic</option>
            </select>
          </div>
        </div>

        <div className="Jobseeker-Set-registration-right">
          <h2>Required Documents</h2>
          <p className="Jobseeker-Set-subtitle">Select documents required during registration</p>
          <div className="Jobseeker-Set-checkbox-group">
            {[
              { label: 'Company registration certificate', id: 'companyCert' },
              { label: 'GST certificate', id: 'gstCert' },
              { label: 'Business email', id: 'businessEmail' },
              { label: 'Company website', id: 'companyWebsite' }
            ].map(doc => (
              <label className="Jobseeker-Set-checkbox-item" key={doc.id}>
                <input 
                  type="checkbox" 
                  checked={settings.requiredDocs[doc.id]}
                  onChange={(e) => handleChange('requiredDocs', doc.id, e.target.checked, true)}
                />
                <span>{doc.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="Jobseeker-Set-preferences-container">
        {/* Preferences Column */}
        <div className="Jobseeker-Set-preferences-column">
          <h2>Other Preferences</h2>
          {[
            { label: 'Allow Multiple Company', id: 'multipleCompany' },
            { label: 'Allow Multiple Users', id: 'multipleUsers' },
            { label: 'Show Company Reviews', id: 'companyReviews' },
            { label: 'Enable Company Branding', id: 'companyBranding' },
            { label: 'Feature Employer Option', id: 'featuredEmployer' }
          ].map(pref => (
            <label className="Jobseeker-Set-checkbox-item" key={pref.id}>
              <input 
                type="checkbox" 
                checked={settings.preferences[pref.id]}
                onChange={(e) => handleChange('preferences', pref.id, e.target.checked, true)}
              />
              <span>{pref.label}</span>
            </label>
          ))}
        </div>

        {/* Notifications Column */}
        <div className="Jobseeker-Set-preferences-column">
          <h2>Notification settings</h2>
          {[
            { label: 'Email Notifications', id: 'email' },
            { label: 'New employer signups', id: 'newSignups' },
            { label: 'Approval / Rejection alerts', id: 'alerts' },
            { label: 'System Announcements', id: 'announcements' },
            { label: 'Weekly summary', id: 'weeklySummary' }
          ].map(notif => (
            <label className="Jobseeker-Set-checkbox-item" key={notif.id}>
              <input 
                type="checkbox" 
                checked={settings.notifications[notif.id]}
                onChange={(e) => handleChange('notifications', notif.id, e.target.checked, true)}
              />
              <span>{notif.label}</span>
            </label>
          ))}
        </div>

        <div className="Jobseeker-Set-preferences-column Jobseeker-Set-right-section">
          <div className="Jobseeker-Set-select-group">
            <h2>Default Plan</h2>
            <select value={settings.defaultPlan} onChange={(e) => handleChange(null, 'defaultPlan', e.target.value)}>
              <option>Free plan</option>
              <option>Premium plan</option>
              <option>Enterprise plan</option>
            </select>
          </div>
          <div className="Jobseeker-Set-select-group">
            <h2>Account status</h2>
            <select value={settings.accountStatus} onChange={(e) => handleChange(null, 'accountStatus', e.target.value)}>
              <option>Pending approval</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="Jobseeker-Set-job-posting-container">
        <h2>Job Posting Settings</h2>
        <div className="Jobseeker-Set-job-settings-grid">         
          <div className="Jobseeker-Set-job-setting-box"> 
            <h3>Job Expire(Days)</h3> 
            <input type="number" value={settings.jobExpireDays} onChange={(e) => handleChange(null, 'jobExpireDays', e.target.value)} />
          </div>
          <div className="Jobseeker-Set-job-setting-box"> 
            <h3>Max Job Posts</h3> 
            <input type="number" value={settings.maxJobPosts} onChange={(e) => handleChange(null, 'maxJobPosts', e.target.value)} />
          </div>
          <div className="Jobseeker-Set-job-setting-box"> 
            <h3>Featured Job Limit</h3> 
            <input type="number" value={settings.featuredJobLimit} onChange={(e) => handleChange(null, 'featuredJobLimit', e.target.value)} />
          </div>
          <div className="Jobseeker-Set-job-setting-box"> 
            <h3>Job Edit After Approval</h3> 
            <div className="Jobseeker-Set-allowed-toggle">
              <label className="Jobseeker-Set-toggle-switch">
                <input type="checkbox" checked={settings.allowEditAfterApproval} onChange={(e) => handleChange(null, 'allowEditAfterApproval', e.target.checked)} />
                <span className="Jobseeker-Set-toggle-slider"></span>
              </label>
              <span className="Jobseeker-Set-allowed-text">{settings.allowEditAfterApproval ? "Allowed" : "Not Allowed"}</span> 
            </div> 
          </div>
        </div>
      </div>

      <div className="Jobseeker-Set-save-section">
        <div className="Jobseeker-Set-info-message">
          <img src={Info}  width="19" alt="CircleI" />Changes will apply to all Employers users on the platform
        </div>
        <button className="Jobseeker-Set-save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};