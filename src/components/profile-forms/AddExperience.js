import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Briefcase, Building, User, MapPin, Calendar, FileText, ArrowLeft, Plus, AlertTriangle, CheckCircle, X } from 'lucide-react';

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const [stars, setStars] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  // Generate stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 3,
          size: Math.random() * 2 + 1,
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Job Title is required';
    }
    
    if (!company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!from) {
      newErrors.from = 'From date is required';
    }
    
    if (!current && !to) {
      newErrors.to = 'To date is required (or check Current Job)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKeys = Object.keys(errors);
      if (firstErrorKeys.length > 0) {
        const firstErrorField = firstErrorKeys[0];
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
      return;
    }
    
    dispatch(addExperience(formData, navigate));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px'
  };

  const starStyle = (star) => ({
    position: 'absolute',
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    backgroundColor: 'white',
    borderRadius: '50%',
    opacity: 0.3,
    animation: `twinkle 4s ease-in-out infinite`,
    animationDelay: `${star.animationDelay}s`
  });

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '700px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 16px 0',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px'
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#e5e7eb',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const requiredTextStyle = {
    fontSize: '14px',
    color: '#fbbf24',
    margin: '0'
  };

  const formCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    padding: '40px',
    marginBottom: '30px',
    color: 'white'
  };

  const formGroupStyle = {
    marginBottom: '24px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#e5e7eb',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    boxSizing: 'border-box'
  };

  const inputErrorStyle = {
    ...inputStyle,
    border: '1px solid rgba(239, 68, 68, 0.8)',
    background: 'rgba(239, 68, 68, 0.1)',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    accentColor: '#8b5cf6',
    cursor: 'pointer'
  };

  const checkboxLabelStyle = {
    color: '#e5e7eb',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0'
  };

  const alertStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(239, 68, 68, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#fecaca',
    fontSize: '14px',
    marginTop: '6px',
    animation: 'slideInAlert 0.3s ease-out'
  };

  const successAlertStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'rgba(16, 185, 129, 0.15)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '12px',
    color: '#86efac',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
    zIndex: 1000,
    animation: 'slideInFromRight 0.4s ease-out',
    cursor: 'pointer'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '32px'
  };

  const submitButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
    textDecoration: 'none'
  };

  const backButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    backdropFilter: 'blur(10px)'
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
          
          @keyframes slideInAlert {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInFromRight {
            0% {
              opacity: 0;
              transform: translateX(100px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .form-input:focus {
            outline: none;
            border-color: rgba(139, 92, 246, 0.5);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          .form-input-error:focus {
            outline: none;
            border-color: rgba(239, 68, 68, 0.8);
            background: rgba(239, 68, 68, 0.15);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .checkbox-container:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
            background: linear-gradient(45deg, #2563eb, #7c3aed);
          }
          
          .back-btn:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
          }
          
          .form-card {
            position: relative;
            overflow: hidden;
          }
          
          .form-card::before {
            content: '';
            position: 'absolute';
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transition: left 0.8s;
          }
          
          .form-card:hover::before {
            left: 100%;
          }
          
          .date-input {
            color-scheme: dark;
          }
          
          .date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
          
          @media (max-width: 768px) {
            .title {
              font-size: 36px;
            }
            
            .form-card {
              padding: 24px;
            }
            
            .button-container {
              flex-direction: column;
            }
            
            .submit-btn, .back-btn {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        {/* Animated stars background */}
        {stars.map((star) => (
          <div key={star.id} style={starStyle(star)} />
        ))}

        <div style={contentWrapperStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h1 style={titleStyle} className="title">
              <Briefcase size={48} />
              Add Your Experience
            </h1>
            <p style={subtitleStyle}>
              <Building size={20} />
              Add any developer/programming positions that you have had in the past
            </p>
            <small style={requiredTextStyle}>* = required field</small>
          </div>

          {/* Form Card */}
          <div style={formCardStyle} className="form-card">
            <form onSubmit={onSubmit}>
              {/* Job Title */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <User size={16} />
                  Job Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter job title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                  style={errors.title ? inputErrorStyle : inputStyle}
                  className={errors.title ? "form-input-error" : "form-input"}
                />
                {errors.title && (
                  <div style={alertStyle}>
                    <AlertTriangle size={16} />
                    {errors.title}
                  </div>
                )}
              </div>

              {/* Company */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <Building size={16} />
                  Company *
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  name="company"
                  value={company}
                  onChange={onChange}
                  required
                  style={errors.company ? inputErrorStyle : inputStyle}
                  className={errors.company ? "form-input-error" : "form-input"}
                />
                {errors.company && (
                  <div style={alertStyle}>
                    <AlertTriangle size={16} />
                    {errors.company}
                  </div>
                )}
              </div>

              {/* Location */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <MapPin size={16} />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  style={inputStyle}
                  className="form-input"
                />
              </div>

              {/* From Date */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <Calendar size={16} />
                  From Date *
                </label>
                <input
                  type="date"
                  name="from"
                  value={from}
                  onChange={onChange}
                  required
                  style={errors.from ? inputErrorStyle : inputStyle}
                  className={errors.from ? "form-input-error date-input" : "form-input date-input"}
                />
                {errors.from && (
                  <div style={alertStyle}>
                    <AlertTriangle size={16} />
                    {errors.from}
                  </div>
                )}
              </div>

              {/* Current Job Checkbox */}
              <div style={formGroupStyle}>
                <div
                  style={checkboxContainerStyle}
                  className="checkbox-container"
                  onClick={() => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                >
                  <input
                    type="checkbox"
                    name="current"
                    checked={current}
                    onChange={() => {}} // Controlled by parent div
                    style={checkboxStyle}
                  />
                  <label style={checkboxLabelStyle}>
                    Current Job
                  </label>
                </div>
              </div>

              {/* To Date */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <Calendar size={16} />
                  To Date
                </label>
                <input
                  type="date"
                  name="to"
                  value={to}
                  onChange={onChange}
                  disabled={toDateDisabled}
                  style={{
                    ...(errors.to ? inputErrorStyle : inputStyle),
                    opacity: toDateDisabled ? 0.5 : 1,
                    cursor: toDateDisabled ? 'not-allowed' : 'pointer'
                  }}
                  className={errors.to ? "form-input-error date-input" : "form-input date-input"}
                />
                {errors.to && !toDateDisabled && (
                  <div style={alertStyle}>
                    <AlertTriangle size={16} />
                    {errors.to}
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>
                  <FileText size={16} />
                  Job Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us about your role, responsibilities, achievements..."
                  value={description}
                  onChange={onChange}
                  style={textareaStyle}
                  className="form-input"
                />
              </div>

              {/* Buttons */}
              <div style={buttonContainerStyle} className="button-container">
                <button
                  type="submit"
                  style={submitButtonStyle}
                  className="submit-btn"
                >
                  <Plus size={20} />
                  Add Experience
                </button>
                
                <Link
                  to="/dashboard"
                  style={backButtonStyle}
                  className="back-btn"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div 
            style={successAlertStyle}
            onClick={() => setShowSuccess(false)}
          >
            <CheckCircle size={20} />
            <span>Experience added successfully!</span>
            <X size={16} style={{ marginLeft: '8px', opacity: 0.7 }} />
          </div>
        )}
      </div>
    </>
  );
};

export default AddExperience;