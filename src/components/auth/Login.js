import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { User, Lock, Github, Mail, Eye, EyeOff, Globe, Shield, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [stars, setStars] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { email, password } = formData;

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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

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

          .login-container {
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

          .login-container::before {
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

          .login-form {
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

          .form-options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }

          .remember-me {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
          }

          .checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(139, 92, 246, 0.3);
            border-radius: 4px;
            background: transparent;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
          }

          .checkbox.checked {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-color: #3b82f6;
          }

          .checkbox.checked::after {
            content: '✓';
            position: absolute;
            color: white;
            font-size: 12px;
            font-weight: bold;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .forgot-link {
            color: #8b5cf6;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .forgot-link:hover {
            color: #a78bfa;
            text-decoration: underline;
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

          .register-link {
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

          .register-link:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.5);
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

          @media (max-width: 640px) {
            .login-container {
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

            .form-options {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
          }
        `}
      </style>
      
      <div className="login-container">
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
              Connect with developers worldwide
            </p>
          </div>

          {/* Login form */}
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">
                <User size={18} />
                Sign in to your developer account
              </p>
            </div>

            <form onSubmit={onSubmit} className="login-form">
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
                    className={`form-input ${password ? 'valid' : ''}`}
                    placeholder="Enter your password"
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
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <div 
                    className={`checkbox ${rememberMe ? 'checked' : ''}`}
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-button">
                Sign In
              </button>
            </form>

            {/* Features */}
            <div className="features-grid">
              <div className="feature-item">
                <Users size={16} className="feature-icon" />
                <span>Global community</span>
              </div>
              <div className="feature-item">
                <TrendingUp size={16} className="feature-icon" />
                <span>Career growth</span>
              </div>
              <div className="feature-item">
                <Zap size={16} className="feature-icon" />
                <span>Fast networking</span>
              </div>
              <div className="feature-item">
                <Shield size={16} className="feature-icon" />
                <span>Secure platform</span>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">New to DevConnector?</span>
            </div>

            {/* Register link */}
            <Link to="/register" className="register-link">
              Create your account
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

export default Login;