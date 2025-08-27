import React from 'react';
import { User, CheckCircle, Star } from 'lucide-react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  const sectionHeaderStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#8b5cf6'
  };

  const bioStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#e5e7eb',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderLeft: '4px solid #8b5cf6'
  };

  const skillsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginTop: '20px'
  };

  const skillItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const dividerStyle = {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
    margin: '30px 0',
    borderRadius: '1px'
  };

  return (
    <>
      <style>
        {`
          .skill-item:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
          }
        `}
      </style>
      
      <div>
        {bio && (
          <>
            <h2 style={sectionHeaderStyle}>
              <User size={24} />
              {name.trim().split(' ')[0]}'s Bio
            </h2>
            <div style={bioStyle}>
              {bio}
            </div>
            <div style={dividerStyle}></div>
          </>
        )}
        
        <h2 style={sectionHeaderStyle}>
          <Star size={24} />
          Skill Set
        </h2>
        
        <div style={skillsGridStyle}>
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item"
              style={skillItemStyle}
            >
              <CheckCircle size={16} color="#10b981" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileAbout;