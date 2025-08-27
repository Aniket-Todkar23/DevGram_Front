import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { User, Plus, BookOpen, Briefcase, Trash2, Star, Github, Settings, LogOut } from 'lucide-react';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);
  const [stars, setStars] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

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

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px 0'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 10px 0',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-1px'
  };

  const welcomeStyle = {
    fontSize: '24px',
    color: '#e5e7eb',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
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
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const profileCardStyle = {
    ...cardStyle,
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  };

  const actionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const actionCardStyle = {
    ...cardStyle,
    textAlign: 'center',
    cursor: 'pointer',
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
    textDecoration: 'none'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '30px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    color: 'white'
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    setShowDeleteConfirm(false);
  };

  if (loading && profile === null) {
    return (
      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ ...cardStyle, textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '18px', color: '#e5e7eb' }}>Loading your dashboard...</div>
              <div style={{ marginTop: '20px' }}>
                <Star style={{ width: '32px', height: '32px', color: '#8b5cf6', animation: 'spin 2s linear infinite' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
          }
          
          .action-card:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.15);
          }
          
          .dashboard-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }
          
          .danger-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
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
            <h1 style={titleStyle}>Dashboard</h1>
            <p style={welcomeStyle}>
              <User size={24} />
              Welcome back, {user && user.name}!
            </p>
          </div>

          {profile !== null ? (
            <>
              {/* Profile Summary Card */}
              <div className="dashboard-card" style={profileCardStyle}>
                <div style={{ marginBottom: '20px' }}>
                  <Github style={{ width: '48px', height: '48px', color: '#8b5cf6', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Profile Active</h3>
                  <p style={{ color: '#d1d5db', margin: '0' }}>Your developer profile is set up and ready!</p>
                </div>
                <DashboardActions />
              </div>

              {/* Experience & Education Grid */}
              <div style={actionGridStyle}>
                <div className="dashboard-card" style={cardStyle}>
                  <h3 style={{ fontSize: '20px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={20} />
                    Experience
                  </h3>
                  <Experience experience={profile.experience} />
                </div>

                <div className="dashboard-card" style={cardStyle}>
                  <h3 style={{ fontSize: '20px', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} />
                    Education
                  </h3>
                  <Education education={profile.education} />
                </div>
              </div>

              {/* Danger Zone */}
              <div className="dashboard-card" style={{
                ...cardStyle,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <h3 style={{ fontSize: '20px', margin: '0 0 16px 0', color: '#fca5a5' }}>Danger Zone</h3>
                <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  className="danger-button"
                  style={dangerButtonStyle}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={16} />
                  Delete My Account
                </button>
              </div>
            </>
          ) : (
            <div className="dashboard-card" style={profileCardStyle}>
              <div style={{ marginBottom: '30px' }}>
                <User style={{ width: '64px', height: '64px', color: '#8b5cf6', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '28px', margin: '0 0 12px 0' }}>Welcome to DevConnector!</h3>
                <p style={{ color: '#d1d5db', fontSize: '18px', marginBottom: '0' }}>
                  You haven't set up a profile yet. Let's get started by adding some information about yourself.
                </p>
              </div>
              
              <Link
                to="/create-profile"
                className="dashboard-button"
                style={buttonStyle}
              >
                <Plus size={20} />
                Create Your Profile
              </Link>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <Trash2 style={{ width: '48px', height: '48px', color: '#ef4444', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', margin: '0 0 16px 0' }}>Delete Account</h3>
              <p style={{ color: '#d1d5db', marginBottom: '30px' }}>
                Are you absolutely sure? This action cannot be undone and will permanently delete your account and all associated data.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    ...buttonStyle,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  style={dangerButtonStyle}
                >
                  <Trash2 size={16} />
                  Yes, Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;