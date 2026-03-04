import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import manSitting from '../assets/Illustration_1.png'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import './Elogin.css'

export const Elogin = () => {
  const [passwordShow, setPasswordShow] = useState(true)
  const navigate = useNavigate();
  const togglePasswordView = () => {
    setPasswordShow((prev) => !prev)
  }

  const initialValues = { username: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues)

  const [errors, setErrors] = useState({})

  const handleForm = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formValues.username.trim()) {
      newErrors.username = "Username or Company name is required"
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(formData) {
    if (!validateForm()) {
      return false // stops form submit if errors
    }
    navigate('/Job-portal/Employer/Dashboard')
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
          <span className='subtext'>for Employers</span>
        </Link>
        <div className="header-links">
          <span className='no-account'>Don’t have an account?</span>
          <Link to="/Job-portal/employer/signup" className="signup-btn">Create</Link>
          <div className="separator"></div>
          <Link to="/Job-portal/jobseeker/login" className="employer-redirect-link">Job seekers Login</Link>
        </div>
      </header>

      <div className="login-body">
        <div className="login-illustration">
          <img src={manSitting} alt="Login Illustration" />
        </div>

        <form action={handleSubmit} className="login-form">
          <h2>Login to continue</h2>

          <label>User name / Company name</label>
          <input type="text" name="username" placeholder="Enter your User name / Company name" value={formValues.username} onChange={handleForm} className={errors.username ? "input-error" : ""} />
          {errors.username && <span className="error-msg">{errors.username}</span>}

          <label>Password</label>
          <div className="password-wrapper">
            <input type={passwordShow ? "password" : "text"} placeholder="Enter your password" name='password' value={formValues.password} onChange={handleForm} className={errors.password ? "input-error" : ""} />
            <span className="eye-icon" onClick={togglePasswordView}><img src={passwordShow ? eye : eyeHide} className='show-icon' alt='show' /></span>
          </div>
          {errors.password && <span className="error-msg">{errors.password}</span>}

          <div className="form-options">
            <label><input type="checkbox" /> Remember me</label>
            <Link to="/Job-portal/employer/login/forgotpassword" className='forgot-password'>Forgot Password?</Link>
          </div>

          <button className="j-login-btn">Login</button>
        </form>
      </div>
    </div>
  )
}