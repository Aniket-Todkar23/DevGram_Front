import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { User, Mail, Lock, Github, UserPlus, Shield, CheckCircle, Eye, EyeOff, Globe } from 'lucide-react';

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    githubUsername: ''
  });

  const [stars, setStars] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [animate, setAnimate] = useState(false);

  const { name, email, password, password2, githubUsername } = formData;

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
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
    
    // Trigger entrance animation
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = (pass) => {
      let strength = 0;
      if (pass.length >= 8) strength += 25;
      if (/[a-z]/.test(pass)) strength += 25;
      if (/[A-Z]/.test(pass)) strength += 25;
      if (/[0-9]/.test(pass)) strength += 15;
      if (/[^A-Za-z0-9]/.test(pass)) strength += 10;
      return Math.min(strength, 100);
    };
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password, githubUsername }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return '#ef4444';
    if (passwordStrength < 60) return '#f59e0b';
    if (passwordStrength < 80) return '#eab308';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }

          .register-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .register-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 70%);
            pointer-events: none;
            animation: glow 6s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { opacity: 0.5; }
            100% { opacity: 0.8; }
          }

          .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0.7;
            animation: twinkle 3s ease-in-out infinite;
          }

          .content-wrapper {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 450px;
            opacity: 0;
            animation: slideUp 0.8s ease-out 0.2s forwards;
          }

          .content-wrapper.animate {
            opacity: 1;
          }

          .header-section {
            text-align: center;
            margin-bottom: 32px;
            animation: fadeIn 1s ease-out 0.5s both;
          }

          .logo-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
            animation: pulse 3s ease-in-out infinite;
          }

          .main-title {
            font-size: 32px;
            font-weight: 800;
            margin: 0 0 8px 0;
            background: linear-gradient(45deg, #ffffff, #a78bfa, #60a5fa);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
          }

          .main-subtitle {
            color: #d1d5db;
            font-size: 16px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .form-container {
            background: rgba(15, 15, 35, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            padding: 40px;
            color: white;
            position: relative;
            overflow: hidden;
          }

          .form-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent);
            animation: shimmer 3s linear infinite;
          }

          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .form-header {
            text-align: center;
            margin-bottom: 32px;
          }

          .form-title {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 12px 0;
            color: white;
          }

          .form-subtitle {
            color: #d1d5db;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 16px;
          }

          .register-form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .form-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .field-label {
            font-size: 14px;
            font-weight: 600;
            color: #e5e7eb;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .input-container {
            position: relative;
          }

          .form-input {
            width: 100%;
            padding: 16px 16px 16px 48px;
            background: rgba(15, 15, 35, 0.6);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            color: white;
            font-size: 16px;
            outline: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-sizing: border-box;
          }

          .form-input::placeholder {
            color: #9ca3af;
          }

          .form-input:focus {
            background: rgba(15, 15, 35, 0.9);
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1);
            transform: translateY(-1px);
          }

          .form-input.error {
            border-color: #ef4444;
            animation: shake 0.5s ease-in-out;
          }

          .form-input.valid {
            border-color: #10b981;
          }

          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            transition: all 0.3s ease;
            z-index: 1;
          }

          .form-input:focus + .input-icon {
            color: #3b82f6;
            transform: translateY(-50%) scale(1.1);
          }

          .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
          }

          .password-toggle:hover {
            color: #3b82f6;
            transform: translateY(-50%) scale(1.1);
          }

          .password-strength {
            margin-top: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .strength-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
          }

          .strength-fill {
            height: 100%;
            border-radius: 2px;
            transition: all 0.3s ease;
            background: linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #10b981);
          }

          .strength-text {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .form-text {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 6px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .submit-button {
            width: 100%;
            padding: 16px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
          }

          .submit-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
          }

          .submit-button:hover::before {
            left: 100%;
          }

          .submit-button:active {
            transform: translateY(0);
          }

          .divider {
            margin: 32px 0;
            position: relative;
            text-align: center;
          }

          .divider-line {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
          }

          .divider-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(15, 15, 35, 0.8);
            padding: 0 16px;
            color: #d1d5db;
            font-size: 14px;
            font-weight: 500;
          }

          .login-link {
            display: inline-block;
            width: 100%;
            padding: 16px;
            text-align: center;
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            color: white;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: transparent;
            font-weight: 500;
          }

          .login-link:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.5);
            transform: translateY(-1px);
          }

          .footer-section {
            margin-top: 40px;
            text-align: center;
            animation: fadeIn 1s ease-out 1.2s both;
          }

          .footer-links {
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
          }

          .footer-link {
            color: #9ca3af;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 6px;
          }

          .footer-link:hover {
            color: white;
            background: rgba(139, 92, 246, 0.1);
            transform: translateY(-1px);
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 24px;
            padding: 24px;
            background: rgba(15, 15, 35, 0.3);
            border-radius: 16px;
            border: 1px solid rgba(139, 92, 246, 0.2);
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #d1d5db;
            font-size: 14px;
          }

          .feature-icon {
            color: #10b981;
            flex-shrink: 0;
          }

          @media (max-width: 640px) {
            .register-container {
              padding: 16px;
            }

            .content-wrapper {
              max-width: 100%;
            }

            .form-container {
              padding: 24px;
              border-radius: 16px;
            }

            .main-title {
              font-size: 24px;
            }

            .form-title {
              font-size: 22px;
            }

            .logo-container {
              width: 60px;
              height: 60px;
            }

            .footer-links {
              flex-direction: column;
              gap: 12px;
            }

            .features-grid {
              grid-template-columns: 1fr;
              gap: 12px;
              padding: 16px;
            }
          }
        `}
      </style>
      
      <div className="register-container">
        {/* Animated stars background */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`
            }}
          />
        ))}

        <div className={`content-wrapper ${animate ? 'animate' : ''}`}>
          {/* Header */}
          <div className="header-section">
            <div className="logo-container">
              <Github size={40} color="white" />
            </div>
            <h1 className="main-title">DevConnector</h1>
            <p className="main-subtitle">
              <Globe size={16} />
              Join the developer community
            </p>
          </div>

          {/* Registration form */}
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">
                <UserPlus size={18} />
                Start your developer journey today
              </p>
            </div>

            <form onSubmit={onSubmit} className="register-form">
              <div className="form-field">
                <label htmlFor="name" className="field-label">
                  <User size={14} />
                  Full Name
                </label>
                <div className="input-container">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    className={`form-input ${name ? 'valid' : ''}`}
                    placeholder="Enter your full name"
                  />
                  <User size={18} className="input-icon" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  <Mail size={14} />
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className={`form-input ${email ? 'valid' : ''}`}
                    placeholder="Enter your email address"
                  />
                  <Mail size={18} className="input-icon" />
                </div>
                <div className="form-text">
                  <Shield size={12} />
                  We use Gravatar for profile images
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="githubUsername" className="field-label">
                  <Github size={14} />
                  GitHub Username
                </label>
                <div className="input-container">
                  <input
                    id="githubUsername"
                    type="text"
                    name="githubUsername"
                    value={githubUsername}
                    onChange={onChange}
                    required
                    className={`form-input ${githubUsername ? 'valid' : ''}`}
                    placeholder="Enter your GitHub username"
                  />
                  <Github size={18} className="input-icon" />
                </div>
                <div className="form-text">
                  <CheckCircle size={12} />
                  Used for portfolio integration and project showcase
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password" className="field-label">
                  <Lock size={14} />
                  Password
                </label>
                <div className="input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength="6"
                    className={`form-input ${password ? (passwordStrength >= 60 ? 'valid' : '') : ''}`}
                    placeholder="Create a strong password"
                  />
                  <Lock size={18} className="input-icon" />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{ 
                          width: `${passwordStrength}%`,
                          background: getPasswordStrengthColor()
                        }}
                      />
                    </div>
                    <div className="strength-text">
                      <span style={{ color: getPasswordStrengthColor() }}>
                        {getPasswordStrengthText()}
                      </span>
                      <span>{passwordStrength}/100</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="password2" className="field-label">
                  <Shield size={14} />
                  Confirm Password
                </label>
                <div className="input-container">
                  <input
                    id="password2"
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    required
                    minLength="6"
                    className={`form-input ${password2 ? (password === password2 ? 'valid' : 'error') : ''}`}
                    placeholder="Confirm your password"
                  />
                  <Shield size={18} className="input-icon" />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password2 && password !== password2 && (
                  <div className="form-text" style={{ color: '#ef4444' }}>
                    Passwords do not match
                  </div>
                )}
                {password2 && password === password2 && (
                  <div className="form-text" style={{ color: '#10b981' }}>
                    <CheckCircle size={12} />
                    Passwords match
                  </div>
                )}
              </div>

              <button type="submit" className="submit-button">
                Create Account
              </button>
            </form>

            {/* Features */}
            <div className="features-grid">
              <div className="feature-item">
                <CheckCircle size={16} className="feature-icon" />
                <span>Free forever</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} className="feature-icon" />
                <span>Global network</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} className="feature-icon" />
                <span>Skill sharing</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} className="feature-icon" />
                <span>Project collaboration</span>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">Already have an account?</span>
            </div>

            {/* Login link */}
            <Link to="/login" className="login-link">
              Sign in to your account
            </Link>
          </div>

          {/* Footer */}
          <div className="footer-section">
            <div className="footer-links">
              <a href="/terms" className="footer-link">Terms of Service</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/docs" className="footer-link">Documentation</a>
              <a href="/support" className="footer-link">Support</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;