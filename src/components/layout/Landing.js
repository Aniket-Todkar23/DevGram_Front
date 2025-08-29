import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Code2, 
  Users, 
  MessageCircle, 
  Star, 
  Github, 
  Briefcase, 
  BookOpen,
  Heart,
  Share2,
  Eye,
  Trophy,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const Landing = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [stars, setStars] = useState([]);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    // Generate stars for background
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 100; i++) {
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

    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '100px'
  };

  const starStyle = (star) => ({
    position: 'absolute',
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    backgroundColor: 'white',
    borderRadius: '50%',
    opacity: 0.4,
    animation: `twinkle 4s ease-in-out infinite`,
    animationDelay: `${star.animationDelay}s`
  });

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const heroSectionStyle = {
    textAlign: 'center',
    padding: '80px 0 60px 0',
    marginBottom: '80px'
  };

  const titleStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '24px',
    background: 'linear-gradient(45deg, #ffffff, #a78bfa, #60a5fa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lineHeight: '1.1'
  };

  const subtitleStyle = {
    fontSize: '24px',
    color: '#d1d5db',
    marginBottom: '16px',
    fontWeight: '600'
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#9ca3af',
    marginBottom: '48px',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 48px auto'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '60px'
  };

  const primaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
    textDecoration: 'none'
  };

  const secondaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none'
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '80px'
  };

  const featureCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    padding: '40px 30px',
    color: 'white',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    marginBottom: '80px'
  };

  const statCardStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    padding: '30px 20px',
    textAlign: 'center',
    color: 'white'
  };

  const features = [
    {
      icon: <Users size={48} />,
      title: "Connect & Network",
      description: "Like LinkedIn for developers - build your professional network, connect with peers, and discover opportunities.",
      color: '#3b82f6'
    },
    {
      icon: <MessageCircle size={48} />,
      title: "Share & Discuss",
      description: "Instagram-style feed for code! Share your projects, get feedback, and engage with the developer community.",
      color: '#8b5cf6'
    },
    {
      icon: <Trophy size={48} />,
      title: "Showcase Skills",
      description: "GitHub-powered portfolios that highlight your experience, education, and repositories in a beautiful format.",
      color: '#10b981'
    }
  ];

  const stats = [
    { icon: <Users size={32} />, number: "10K+", label: "Developers" },
    { icon: <MessageCircle size={32} />, number: "50K+", label: "Posts Shared" },
    { icon: <Star size={32} />, number: "100K+", label: "Connections Made" },
    { icon: <Github size={32} />, number: "25K+", label: "Projects Showcased" }
  ];

  const highlights = [
    "Create stunning developer portfolios",
    "Share code snippets and projects",
    "Get feedback from experienced developers",
    "Discover job opportunities",
    "Join coding discussions",
    "Showcase your GitHub repositories"
  ];

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px 0 rgba(31, 38, 135, 0.5);
            background: rgba(255, 255, 255, 0.15);
          }
          
          .primary-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
            animation: glow 2s ease-in-out infinite;
          }
          
          .secondary-button:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
          }
          
          .stat-card:hover {
            transform: scale(1.05);
          }
          
          .floating-element {
            animation: float 3s ease-in-out infinite;
          }
          
          .highlight-item {
            animation: slideIn 0.6s ease-out forwards;
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 48px !important;
            }
            
            .button-container {
              flex-direction: column;
              align-items: center;
            }
            
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      
      <div style={containerStyle}>
        {/* Animated stars background */}
        {stars.map((star) => (
          <div key={star.id} style={starStyle(star)} />
        ))}

        <div style={contentStyle}>
          {/* Hero Section */}
          <div style={heroSectionStyle}>
            <h1 className="hero-title floating-element" style={titleStyle}>
              Developer Connector
              <Sparkles size={48} style={{ marginLeft: '16px', color: '#fbbf24' }} />
            </h1>
            
            <p style={subtitleStyle}>
              The Instagram for Developers 🚀
            </p>
            
            <p style={descriptionStyle}>
              Create stunning portfolios, share your code, connect with developers worldwide, 
              and showcase your journey. Think LinkedIn meets GitHub meets Instagram - 
              all designed specifically for the developer community.
            </p>

            <div className="button-container" style={buttonContainerStyle}>
              <Link 
                to="/register" 
                className="primary-button"
                style={primaryButtonStyle}
              >
                <Zap size={20} />
                Join the Community
                <ArrowRight size={20} />
              </Link>
              
              <Link 
                to="/login" 
                className="secondary-button"
                style={secondaryButtonStyle}
              >
                <Users size={20} />
                Sign In
              </Link>
            </div>

            {/* Quick Highlights */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="highlight-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#d1d5db',
                    fontSize: '14px',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CheckCircle size={16} color="#10b981" />
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div style={statsGridStyle}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={statCardStyle}>
                <div style={{ color: '#8b5cf6', marginBottom: '12px' }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {stat.number}
                </div>
                <div style={{ color: '#d1d5db', fontSize: '16px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="features-grid" style={featuresGridStyle}>
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={featureCardStyle}>
                <div style={{ 
                  color: feature.color, 
                  marginBottom: '24px',
                  animation: `float ${3 + index}s ease-in-out infinite`
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  color: '#d1d5db', 
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Social Proof Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '24px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '60px 40px',
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px'
            }}>
              Join Thousands of Developers
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#d1d5db',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px auto'
            }}>
              From junior developers to senior engineers, DevGram is where the coding community 
              comes together to share, learn, and grow. Your next opportunity or collaboration is just one connection away.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                <Heart size={20} fill="currentColor" />
                <span>Loved by developers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6' }}>
                <Globe size={20} />
                <span>Global community</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6' }}>
                <Zap size={20} />
                <span>Fast growing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;