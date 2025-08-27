import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  User, 
  ArrowRight,
  Star,
  Code2
} from 'lucide-react';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 12px 40px rgba(139, 92, 246, 0.3); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
          }
          
          .profile-card {
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 58, 0.6));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 24px;
            padding: 32px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            color: white;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .profile-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(139, 92, 246, 0.05) 50%, 
              rgba(236, 72, 153, 0.1) 100%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .profile-card:hover::before {
            opacity: 1;
          }
          
          .profile-card:hover {
            transform: translateY(-12px) scale(1.02);
            border-color: rgba(139, 92, 246, 0.4);
            animation: glow 2s ease-in-out infinite;
          }
          
          .profile-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .profile-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 24px;
          }
          
          .profile-avatar {
            position: relative;
          }
          
          .profile-avatar img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid rgba(139, 92, 246, 0.5);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
          }
          
          .profile-card:hover .profile-avatar img {
            border-color: rgba(139, 92, 246, 0.8);
            box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
            animation: float 3s ease-in-out infinite;
          }
          
          .profile-info h2 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(45deg, #ffffff, #a78bfa);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .status-info {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
            color: #d1d5db;
            font-size: 16px;
            font-weight: 500;
          }
          
          .location-info {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #9ca3af;
            font-size: 14px;
          }
          
          .skills-section {
            margin: 20px 0;
            flex-grow: 1;
          }
          
          .skills-title {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            color: #d1d5db;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          .skill-tag {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 20px;
            color: #e5e7eb;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .skill-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: -200px;
            width: 200px;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.1), 
              transparent
            );
            transition: left 0.6s;
          }
          
          .profile-card:hover .skill-tag::before {
            left: 100%;
          }
          
          .skill-tag:hover {
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
            border-color: rgba(139, 92, 246, 0.5);
            transform: scale(1.05);
            color: white;
          }
          
          .view-profile-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px 28px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            margin-top: auto;
            position: relative;
            overflow: hidden;
          }
          
          .view-profile-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.2), 
              transparent
            );
            transition: left 0.5s;
          }
          
          .view-profile-btn:hover::before {
            left: 100%;
          }
          
          .view-profile-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
            background: linear-gradient(45deg, #2563eb, #7c3aed);
          }
          
          .online-indicator {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 20px;
            height: 20px;
            background: #10b981;
            border: 3px solid rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          
          @media (max-width: 768px) {
            .profile-card {
              padding: 24px;
            }
            
            .profile-header {
              flex-direction: column;
              text-align: center;
              gap: 16px;
            }
            
            .profile-info h2 {
              font-size: 20px;
            }
            
            .skills-list {
              justify-content: center;
            }
          }
        `}
      </style>
      
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={avatar} alt={`${name}'s avatar`} />
              <div className="online-indicator"></div>
            </div>
            
            <div className="profile-info">
              <h2>{name}</h2>
              
              <div className="status-info">
                <Briefcase size={16} />
                <span>{status}</span>
                {company && <span>at {company}</span>}
              </div>
              
              {location && (
                <div className="location-info">
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="skills-section">
            <div className="skills-title">
              <Code2 size={16} />
              <span>Top Skills</span>
            </div>
            
            <ul className="skills-list">
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="skill-tag">
                  <CheckCircle size={12} />
                  <span>{skill}</span>
                </li>
              ))}
              {skills.length > 4 && (
                <li className="skill-tag" style={{ 
                  background: 'rgba(107, 114, 128, 0.2)', 
                  border: '1px solid rgba(107, 114, 128, 0.3)' 
                }}>
                  <span>+{skills.length - 4} more</span>
                </li>
              )}
            </ul>
          </div>

          <Link to={`/profile/${_id}`} className="view-profile-btn">
            <User size={16} />
            <span>View Profile</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;