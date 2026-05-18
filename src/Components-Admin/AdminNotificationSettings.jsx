import React, { useState } from 'react'
import UsermanageSet from '../assets/AdminAssets/UserManageSetting.png'
import JobManageSetting from '../assets/AdminAssets/JobManageSetting.png'
import ApplicationSet from '../assets/AdminAssets/ApplicationSet.png'
import CompanySetting from '../assets/AdminAssets/CompanySetting.png'
import ReportsandAnalytics from '../assets/AdminAssets/Reports and Analytics.png'
import GeneralSetting from '../assets/AdminAssets/GeneralSetting.png'
import EmailNotif from '../assets/AdminAssets/EmailNotif.png'
import InAppNotify from '../assets/AdminAssets/InAppNotify.png'
import SmsNotify from '../assets/AdminAssets/SmsNotify.png'
import PushNotify from '../assets/AdminAssets/PushNotify.png'
import Clock from '../assets/AdminAssets/Clock.png'
import UpArrow from '../assets/UpArrow.png'


export const AdminNotificationSettings = () => {

  const notificationTypes = [
    { id: 'user_mgmt', title: 'User Management', description: 'New user signups, role changes, user updates and deactivations', iconClass: UsermanageSet },
    { id: 'job_mgmt', title: 'Job Management', description: 'New jobs, job updates, expirations and approval requests', iconClass: JobManageSetting },
    { id: 'apps', title: 'Applications', description: 'New applications, Application update and status changes', iconClass: ApplicationSet },
    { id: 'companies', title: 'Companies', description: 'New Company registration and company updates', iconClass: CompanySetting },
    { id: 'reports', title: 'Reports & Analytics', description: 'Daily/weekly reports and important analytics update', iconClass: ReportsandAnalytics },
    { id: 'general', title: 'General Updates', description: 'Product updates, new features and announcement', iconClass: GeneralSetting }
  ];

  const mainChannels = ['Email', 'In-App', 'SMS', 'Push'];

  const quickChannels = [
    { id: 'email_notif', title: 'Email Notifications', description: 'Receive notification via email', iconClass: EmailNotif },
    { id: 'inapp_notif', title: 'In-App Notification', description: 'Receive notification in admin panel', iconClass: InAppNotify },
    { id: 'sms_notif', title: 'SMS Notification', description: 'Receive important alerts via SMS', iconClass: SmsNotify },
    { id: 'push_notif', title: 'Push Notification', description: 'Receive push notification in browser', iconClass: PushNotify }
  ];
  const toggleDay = (day) => {
    setActiveDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [startTime, setStartTime] = useState("22:00");
  const [endTime, setEndTime] = useState("07:00");
  const [activeDays, setActiveDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [timezone, setTimezone] = useState("(UTC +05:30) Asia/Kolkata");


  const [tablePreferences, setTablePreferences] = useState(
    notificationTypes.reduce((acc, type) => {
      acc[type.id] = mainChannels.reduce((chAcc, channel) => {
        chAcc[channel] = false;
        return chAcc;
      }, {});
      return acc;
    }, {})
  );


  const [quickSetup, setQuickSetup] = useState(
    quickChannels.reduce((acc, channel) => {
      acc[channel.id] = false;
      return acc;
    }, {})
  );

  const handleSave = () => {
  const finalData = {
    preferences: tablePreferences, 
    globalChannels: quickSetup,
    quietHours: {
      start: startTime,
      end: endTime,
      days: activeDays
    },
    timezone: timezone
  };

  console.log("Current Notification Settings:", finalData);
  alert("Settings saved successfully!");
};

  const handleTableChange = (typeId, channelName) => {
    setTablePreferences(prev => ({
      ...prev,
      [typeId]: {
        ...prev[typeId],
        [channelName]: !prev[typeId][channelName]
      }
    }));
  };


  const handleQuickChange = (channelId) => {
    setQuickSetup(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  return (
    <div className="Adm-Not-container">
      <header className="Adm-Not-header">
        <div className="Adm-Not-header-text">
          <h1 className="Adm-Not-title">Notification preferences</h1>
          <p className="Adm-Not-subtitle">Choose what notification you want to receive and how.</p>
        </div>
        <button className="Adm-Not-save-btn" onClick={handleSave}>Save changes</button>
      </header>

      <div className="Adm-Not-main-content">
        <div className="Adm-Not-table-section">
          <table className="Adm-Not-table">
            <thead>
              <tr>
                <th className="Adm-Not-th-type">Notification type</th>
                {mainChannels.map(channel => (
                  <th key={channel} className="Adm-Not-th-channel">{channel}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notificationTypes.map(type => (
                <tr key={type.id} className="Adm-Not-row">
                  <td className="Adm-Not-td-type">
                    <div >
                      <div style={{ display: "flex", alignItems: "center" }} className="Adm-Not-type-info">
                        <img src={type.iconClass} width={30} height={30} alt="" />
                        <div>
                          <div className="Adm-Not-item-title">{type.title}</div>
                          <div className="Adm-Not-item-desc">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  {mainChannels.map(channel => (
                    <td key={channel} className="Adm-Not-td-switch">
                      <label className="Adm-Not-switch">
                        <input type="checkbox" checked={tablePreferences[type.id][channel]} onChange={() => handleTableChange(type.id, channel)} />
                        <span className="Adm-Not-slider"></span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Adm-Not-sidebar">
          <div className="Adm-Not-panel Adm-Not-channels-panel">
            <h2 className="Adm-Not-panel-title">Notification Channels</h2>
            <p className="Adm-Not-panel-subtitle">Choose your preferred communication channel</p>
            <div className="Adm-Not-channel-list">
              {quickChannels.map(channel => (
                <div key={channel.id} className="Adm-Not-channel-item">
                  <div style={{ display: "flex", alignItems: "center" }} className="Adm-Not-item-info">
                    <img src={channel.iconClass} alt="" width={25} height={25} />
                    <div>
                      <div className="Adm-Not-item-title">{channel.title}</div>
                      <div className="Adm-Not-item-desc">{channel.description}</div>
                    </div>
                  </div>
                  <label className="Adm-Not-switch">
                    <input type="checkbox" checked={quickSetup[channel.id]} onChange={() => handleQuickChange(channel.id)} />
                    <span className="Adm-Not-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="Adm-Not-panel Adm-Not-quiet-hours-panel">
            <h2 className="Adm-Not-panel-title">Quiet Hours</h2>
            <p className="Adm-Not-panel-subtitle">Set quiet hours to avoid notification at certain times</p>

            <div className="Adm-Not-time-inputs">
              <div className="Adm-Not-time-group">
                <label>Start time</label>
                <div className="Adm-Not-time-select-wrapper">
                  <img src={Clock} alt="" className="Adm-Not-input-icon icon-clock" />
                  <input className="Adm-Not-time-select" type='time' onChange={(e) => setStartTime(e.target.value)} value={startTime} />
                </div>
              </div>
              <div className="Adm-Not-time-group">
                <label>End time</label>
                <div className="Adm-Not-time-select-wrapper">
                  <img src={Clock} width={25} alt="" className="Adm-Not-input-icon icon-clock" />
                  <input className="Adm-Not-time-select" type='time' onChange={(e) => setEndTime(e.target.value)} value={endTime} />
                </div>
              </div>
            </div>

            <div className="Adm-Not-day-picker">
              {daysOfWeek.map(day => (
                <button key={day} className={activeDays.includes(day) ? "day-btn active" : "day-btn"} onClick={() => toggleDay(day)}>
                  {day}
                </button>
              ))}
            </div>

            <div className="Adm-Not-timezone-select-wrapper">
              <select className="Adm-Not-timezone-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option>(UTC +05:30) Asia/Kolkata</option>
                <option>(UTC -08:00) America/Los_Angeles</option>
                <option>(UTC +00:00) UTC</option>
                <option>(UTC +01:00) Europe/London</option>
                <option>(UTC +02:00) Europe/Berlin</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
