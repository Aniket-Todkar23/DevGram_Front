import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Briefcase, GraduationCap, User, Plus } from 'lucide-react';

const DashboardActions = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    margin: '20px 0'
  };

  const actionLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
  };

  const actions = [
    {
      to: '/edit-profile',
      icon: Edit3,
      label: 'Edit Profile',
      gradient: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
      shadowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      to: '/add-experience',
      icon: Briefcase,
      label: 'Add Experience',
      gradient: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
      shadowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      to: '/add-education',
      icon: GraduationCap,
      label: 'Add Education',
      gradient: 'linear-gradient(45deg, #06b6d4, #0891b2)',
      shadowColor: 'rgba(6, 182, 212, 0.3)'
    }
  ];

  return (
    <>
      <style>
        {`
          .dashboard-action-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
          }
          
          .dashboard-action-link:hover .icon-wrapper {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          }
          
          .dashboard-action-link:active {
            transform: translateY(-1px);
          }
          
          .dashboard-action-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s;
          }
          
          .dashboard-action-link:hover::before {
            left: 100%;
          }
          
          @media (max-width: 768px) {
            .dashboard-actions-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      
      <div style={containerStyle} className="dashboard-actions-container">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.to}
              style={actionLinkStyle}
              className="dashboard-action-link"
            >
              <div 
                style={{
                  ...iconWrapperStyle,
                  background: action.gradient,
                  boxShadow: `0 2px 8px ${action.shadowColor}`
                }}
                className="icon-wrapper"
              >
                <Icon size={16} color="white" />
              </div>
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DashboardActions;