import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { ArrowLeft, Edit3, Star, User, Briefcase, BookOpen } from 'lucide-react';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, loading } = useSelector(state => state.profile);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  // Generate stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 80; i++) {
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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px 0'
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

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    padding: '30px',
    marginBottom: '30px',
    color: 'white',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    textDecoration: 'none',
    marginRight: '16px'
  };

  const lightButtonStyle = {
    ...buttonStyle,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    gap: '20px'
  };

  const sectionHeaderStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#8b5cf6'
  };

  const noDataStyle = {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '18px',
    fontStyle: 'italic',
    padding: '40px 0'
  };

  if (profile === null || loading) {
    return (
      <>
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.8; }
            }
            
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={containerStyle}>
          {stars.map((star) => (
            <div key={star.id} style={starStyle(star)} />
          ))}
          <div style={contentWrapperStyle}>
            <div style={loadingStyle}>
              <div style={cardStyle}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Star style={{ 
                    width: '48px', 
                    height: '48px', 
                    color: '#8b5cf6', 
                    marginBottom: '20px',
                    animation: 'spin 2s linear infinite' 
                  }} />
                  <div style={{ fontSize: '20px', color: '#e5e7eb' }}>Loading profile...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
          
          .profile-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
          }
          
          .profile-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }
          
          .light-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <div style={containerStyle}>
        {/* Animated stars background */}
        {stars.map((star) => (
          <div key={star.id} style={starStyle(star)} />
        ))}

        <div style={contentWrapperStyle}>
          {/* Navigation Buttons */}
          <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/profiles" 
              className="light-button" 
              style={lightButtonStyle}
            >
              <ArrowLeft size={16} />
              Back To Profiles
            </Link>
            {isAuthenticated &&
              loading === false &&
              user._id === profile.user._id && (
                <Link 
                  to="/edit-profile" 
                  className="profile-button" 
                  style={buttonStyle}
                >
                  <Edit3 size={16} />
                  Edit Profile
                </Link>
              )}
          </div>

          {/* Profile Grid */}
          <div style={{ display: 'grid', gap: '30px' }}>
            {/* Profile Top */}
            <div className="profile-card" style={cardStyle}>
              <ProfileTop profile={profile} />
            </div>

            {/* Profile About */}
            <div className="profile-card" style={cardStyle}>
              <ProfileAbout profile={profile} />
            </div>

            {/* Experience Section */}
            <div className="profile-card" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>
                <Briefcase size={24} />
                Experience
              </h2>
              {profile.experience.length > 0 ? (
                <div style={{ display: 'grid', gap: '24px' }}>
                  {profile.experience.map(experience => (
                    <div key={experience._id} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <ProfileExperience experience={experience} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={noDataStyle}>
                  <User size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <div>No experience credentials available</div>
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="profile-card" style={cardStyle}>
              <h2 style={sectionHeaderStyle}>
                <BookOpen size={24} />
                Education
              </h2>
              {profile.education.length > 0 ? (
                <div style={{ display: 'grid', gap: '24px' }}>
                  {profile.education.map(education => (
                    <div key={education._id} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <ProfileEducation education={education} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={noDataStyle}>
                  <BookOpen size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <div>No education credentials available</div>
                </div>
              )}
            </div>

            {/* GitHub Section */}
            {profile.githubusername && (
              <div className="profile-card" style={cardStyle}>
                <ProfileGithub username={profile.githubusername} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;