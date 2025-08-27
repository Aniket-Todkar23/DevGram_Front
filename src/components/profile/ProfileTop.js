import React from 'react';
import { Globe, Twitter, Facebook, Linkedin, Youtube, Instagram, MapPin, Building, Briefcase, ExternalLink, Sparkles } from 'lucide-react';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)'
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2
  };

  const avatarContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '24px'
  };

  const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid rgba(139, 92, 246, 0.5)',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2
  };

  const avatarGlowStyle = {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
    zIndex: 1,
    opacity: 0.6,
    animation: 'rotate 3s linear infinite'
  };

  const nameStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const statusContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };

  const statusStyle = {
    fontSize: '18px',
    color: '#a78bfa',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const companyStyle = {
    fontSize: '16px',
    color: '#c4b5fd',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const locationStyle = {
    fontSize: '16px',
    color: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '24px'
  };

  const socialContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  };

  const socialLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const websiteLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #10b981, #059669)'
  };

  const twitterLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #1da1f2, #0d8bd4)'
  };

  const facebookLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #1877f2, #1565c0)'
  };

  const linkedinLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #0077b5, #005885)'
  };

  const youtubeLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #ff0000, #cc0000)'
  };

  const instagramLinkStyle = {
    ...socialLinkStyle,
    background: 'linear-gradient(45deg, #e4405f, #833ab4)'
  };

  return (
    <>
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .profile-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
          }
          
          .social-link:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          }
          
          .sparkle-icon {
            animation: pulse 2s ease-in-out infinite;
          }
          
          .profile-name {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div style={backgroundPatternStyle}></div>
        
        <div style={contentStyle}>
          {/* Avatar Section */}
          <div style={avatarContainerStyle}>
            <div style={avatarGlowStyle}></div>
            <img 
              className="profile-avatar"
              style={avatarStyle}
              src={avatar} 
              alt={`${name}'s avatar`}
            />
          </div>

          {/* Name with floating animation */}
          <h1 className="profile-name" style={nameStyle}>
            {name}
            <Sparkles 
              size={24} 
              style={{ 
                marginLeft: '8px', 
                color: '#fbbf24',
                animation: 'pulse 2s ease-in-out infinite'
              }} 
            />
          </h1>

          {/* Status and Company */}
          <div style={statusContainerStyle}>
            <div style={statusStyle}>
              <Briefcase size={18} />
              {status}
            </div>
            {company && (
              <div style={companyStyle}>
                <Building size={16} />
                at {company}
              </div>
            )}
          </div>

          {/* Location */}
          {location && (
            <div style={locationStyle}>
              <MapPin size={16} />
              {location}
            </div>
          )}

          {/* Social Links */}
          <div style={socialContainerStyle}>
            {website && (
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={websiteLinkStyle}
                title="Website"
              >
                <Globe size={20} />
              </a>
            )}
            
            {social && social.twitter && (
              <a 
                href={social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={twitterLinkStyle}
                title="Twitter"
              >
                <Twitter size={20} />
              </a>
            )}
            
            {social && social.facebook && (
              <a 
                href={social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={facebookLinkStyle}
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
            )}
            
            {social && social.linkedin && (
              <a 
                href={social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={linkedinLinkStyle}
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            
            {social && social.youtube && (
              <a 
                href={social.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={youtubeLinkStyle}
                title="YouTube"
              >
                <Youtube size={20} />
              </a>
            )}
            
            {social && social.instagram && (
              <a 
                href={social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={instagramLinkStyle}
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;