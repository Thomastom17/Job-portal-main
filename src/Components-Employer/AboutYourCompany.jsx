import React, { useState } from "react";
import { Footer } from "../Components-LandingPage/Footer";
import { EHeader } from "./EHeader";
import "./AboutYourCompany.css";
import fileIcon from "../assets/Employer/fileIcon.png"
import { useNavigate } from "react-router-dom";
import { useJobs } from "../JobContext";
 
export const AboutYourCompany = ({ hideNavigation = false, setActiveTab  }) => {
 
    const navigate = useNavigate();
    const { setCompanyProfile } = useJobs();
 
    const [formData, setFormData] = useState({
        companyName: "",
        companyMoto: "",
        contactPerson: "",
        contactNumber: "",
        companyMail: "",
        website: "",
        companySize: "",
        address1: "",
        address2: "",
        about: "",
        companyLogo: null
    });
 
    const [errors, setErrors] = useState({});
 
    const validateForm = () => {
        const newErrors = {};
 
        if (!formData.companyName?.trim()) newErrors.companyName = "Company Name is required";
        if (!formData.companyMoto?.trim()) newErrors.companyMoto = "Company Moto is required";
        if (!formData.contactPerson?.trim()) newErrors.contactPerson = "Contact Person is required";
        if (!formData.contactNumber?.trim()) newErrors.contactNumber = "Contact Number is required";
        if (!formData.companyMail?.trim()) newErrors.companyMail = "Company Mail Id is required";
        if (!formData.website?.trim()) newErrors.website = "Company Website is required";
        if (!formData.companySize?.trim()) newErrors.companySize = "Company Size is required";
        if (!formData.address1?.trim()) newErrors.address1 = "Company Address is required";
        if (!formData.about?.trim()) newErrors.about = "About Company is required";
        if (!formData.companyLogo) newErrors.companyLogo = "Company Logo is required";
 
        setErrors(newErrors);
       
        console.log("Validation Errors detected: ", newErrors);
        return Object.keys(newErrors).length === 0;
    };
 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
       
        // Clear error when user starts interacting
        setErrors(prev => ({ ...prev, [name]: "" }));
 
        if (files) {
            const file = files[0];
 
            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/webp"
            ];
 
            if (!allowedTypes.includes(file.type)) {
                alert("Only image files (PNG, JPG, JPEG, WEBP) are allowed!");
                return;
            }
 
            setFormData({
                ...formData,
                [name]: file
            });
 
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        const isValid = validateForm();
        if (!isValid) {
            console.log("Form has errors. Stopping navigation.");
            return;
        }
 
        console.log("Form Data Ready for Backend:", formData);
        navigate('/Job-portal/Employer/about-your-company/company-verification');
    };
 
    const handleSave = (e) => {
        e.preventDefault();
 
        const isValid = validateForm();
        if (!isValid) {
            console.log("Form has errors. Stopping to save.");
            return;
        }
 
        console.log("Saving Company Profile:", formData);
        setCompanyProfile(formData);
        setActiveTab("Dashboard");
    };
 
    const handleNext = (e) => {
    e.preventDefault();
 
        const isValid = validateForm();
        if (!isValid) {
            console.log("Form has errors. Stopping navigation.");
            return;
        }
 
        console.log("Form Data Ready for Backend:", formData);
 
        setCompanyProfile(formData);
        navigate('/Job-portal/Employer/about-your-company/company-verification');
    };
 
    return (
        <>
            {!hideNavigation && <EHeader />}
 
            <div className="aboutcompany-container">
                <h2 className="aboutcompany-title">About Your Company</h2>
 
                <form className="aboutcompany-form" onSubmit={handleSubmit}>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Name</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.companyName ? "input-error" : ""}
                                type="text"
                                name="companyName"
                                placeholder="e.g., job portal"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Moto</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.companyMoto ? "input-error" : ""}
                                type="text"
                                name="companyMoto"
                                value={formData.companyMoto}
                                onChange={handleChange}
                            />
                            {errors.companyMoto && <span className="error-msg">{errors.companyMoto}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Contact Person</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.contactPerson ? "input-error" : ""}
                                type="text"
                                name="contactPerson"
                                placeholder="e.g., vijay"
                                value={formData.contactPerson}
                                onChange={handleChange}
                            />
                            {errors.contactPerson && <span className="error-msg">{errors.contactPerson}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Contact Number</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.contactNumber ? "input-error" : ""}
                                type="text"
                                name="contactNumber"
                                placeholder="e.g., 9145******"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                            {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Mail Id</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.companyMail ? "input-error" : ""}
                                type="email"
                                name="companyMail"
                                placeholder="e.g., hr@example.com"
                                value={formData.companyMail}
                                onChange={handleChange}
                            />
                            {errors.companyMail && <span className="error-msg">{errors.companyMail}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Web Site</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.website ? "input-error" : ""}
                                type="text"
                                name="website"
                                placeholder="e.g., https://example.com"
                                value={formData.website}
                                onChange={handleChange}
                            />
                            {errors.website && <span className="error-msg">{errors.website}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Logo</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className={`aboutcompany-file-upload-box ${errors.companyLogo ? "input-error" : ""}`} style={errors.companyLogo ? { borderColor: '#d93025' } : {}}>
 
                                {/* Hidden Input */}
                                <input
                                    type="file"
                                    name="companyLogo"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    id="logoUpload"
                                    onChange={handleChange}
                                    hidden
                                />
 
                                {/* If No File */}
                                {!formData.companyLogo && (
                                    <label htmlFor="logoUpload" className="aboutcompany-upload-placeholder">
                                        Click to Upload Logo
                                    </label>
                                )}
 
                                {/* If File Selected */}
                                {formData.companyLogo && (
                                    <div className="aboutcompany-file-preview">
 
                                        <label htmlFor="logoUpload" className="aboutcompany-file-left clickable-area">
                                            <img src={fileIcon} alt="file" />
 
                                            <div>
                                                <p>{formData.companyLogo.name}</p>
                                                <span>
                                                    {(formData.companyLogo.size / 1024 / 1024).toFixed(2)} MB
                                                </span>
                                            </div>
                                        </label>
 
                                    </div>
                                )}
 
                            </div>
                            {errors.companyLogo && <span className="error-msg">{errors.companyLogo}</span>}
                        </div>
                    </div>
 
 
                    <div className="aboutcompany-form-group">
                        <label>Company Size</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.companySize ? "input-error" : ""}
                                type="text"
                                name="companySize"
                                placeholder="e.g., startup"
                                value={formData.companySize}
                                onChange={handleChange}
                            />
                            {errors.companySize && <span className="error-msg">{errors.companySize}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Address</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                className={errors.address1 ? "input-error" : ""}
                                type="text"
                                name="address1"
                                placeholder="e.g., India"
                                value={formData.address1}
                                onChange={handleChange}
                            />
                            {errors.address1 && <span className="error-msg">{errors.address1}</span>}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>Company Address 2</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input
                                type="text"
                                name="address2"
                                placeholder="e.g., India"
                                value={formData.address2}
                                onChange={handleChange}
                            />
                            {/* Typically optional, no validation error shown here */}
                        </div>
                    </div>
 
                    <div className="aboutcompany-form-group">
                        <label>About Company</label>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <textarea
                                className={errors.about ? "input-error" : ""}
                                rows="5"
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                            />
                            {errors.about && <span className="error-msg">{errors.about}</span>}
                        </div>
                    </div>
 
                    {!hideNavigation && (
                    <div className="aboutcompany-form-buttons">
                        <button type="button" className="aboutcompany-back-btn"
                        onClick={() => navigate(-1)}>Back</button>
                        <button type="button" className="aboutcompany-next-btn"onClick={handleNext}>Next</button>
                    </div>)}
 
                    {hideNavigation && (
                    <div>
                        <button type="button" className="aboutcompany-save-btn"
                        onClick={handleSave}> Save </button>
                    </div>)}
 
                </form>
            </div>
 
            {!hideNavigation && <Footer />}
        </>
    );
};
 