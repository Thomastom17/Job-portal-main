import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eye from '../assets/show_password.png';
import eyeHide from '../assets/eye-hide.png';
import './AdminLogin.css';

export function AdminLogin() {
  const [passwordShow, setPasswordShow] = useState(true);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  function togglePasswordView() {
    setPasswordShow(function(prev) { return !prev; });
  }

  function handleForm(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validateForm() {
    const newErrors = {};
    if (!formValues.username.trim()) newErrors.username = "Username is required";
    if (!formValues.password.trim()) newErrors.password = "Password is required";

    // Admin Validation
    if (formValues.username && formValues.password) {
      if (formValues.username !== "Admin" || formValues.password !== "Admin@123") {
        newErrors.auth = "Invalid Admin Credentials!";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    if (validateForm()) {
      alert("Login Success!");
      navigate('/Job-portal/Admin/AdminLogin');
    }
  }

  return (
    <div className="admin-login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        
        {errors.auth && <div className="auth-error">{errors.auth}</div>}

        <label>User name</label>
        <input 
          type="text" 
          name="username" 
          placeholder="Enter Admin username" 
          value={formValues.username} 
          onChange={handleForm} 
          className={errors.username ? "input-error" : ""} 
        />
        {errors.username && <span className="error-msg">{errors.username}</span>}

        <label>Password</label>
        <div className="password-wrapper">
          <input 
            type={passwordShow ? "password" : "text"} 
            placeholder="Admin password" 
            name='password' 
            value={formValues.password} 
            onChange={handleForm} 
            className={errors.password ? "input-error" : ""} 
          />
          {/* Inga dhaan eye icon input kulla varudhu */}
          <span className="eye-icon" onClick={togglePasswordView}>
            <img src={passwordShow ? eye : eyeHide} alt='toggle view' />
          </span>
        </div>
        {errors.password && <span className="error-msg">{errors.password}</span>}

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" className="j-login-btn">Login</button>
      </form>
    </div>
  );
}
