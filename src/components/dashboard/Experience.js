import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
import { Briefcase, Building, MapPin, Calendar, Trash2, User } from 'lucide-react';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const containerStyle = {
    width: '100%'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const experienceListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const experienceItemStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const companyNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const jobTitleStyle = {
    fontSize: '16px',
    color: '#8b5cf6',
    fontWeight: '500',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const locationStyle = {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dateRangeStyle = {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#d1d5db',
    marginBottom: '16px',
    lineHeight: '1.6',
    textAlign: 'left'
  };

  const deleteButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#9ca3af'
  };

  const emptyIconStyle = {
    width: '48px',
    height: '48px',
    color: '#6b7280',
    marginBottom: '16px'
  };

  if (!experience || experience.length === 0) {
    return (
      <>
        <style>
          {`
            .experience-item:hover {
              transform: translateY(-2px);
              background: rgba(255, 255, 255, 0.08);
              border-color: rgba(255, 255, 255, 0.2);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            }
            
            .delete-btn:hover {
              transform: translateY(-1px);
              box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
              background: linear-gradient(45deg, #dc2626, #b91c1c);
            }
            
            .delete-btn:active {
              transform: translateY(0);
            }
            
            .experience-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
              transition: left 0.5s;
            }
            
            .experience-item:hover::before {
              left: 100%;
            }
            
            @media (max-width: 768px) {
              .experience-item {
                padding: 16px;
              }
              
              .company-name {
                font-size: 16px;
              }
              
              .job-title {
                font-size: 14px;
              }
            }
          `}
        </style>
        
        <div style={containerStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>
              <Briefcase size={20} />
              Experience Credentials
            </h3>
          </div>
          
          <div style={emptyStateStyle}>
            <Briefcase style={emptyIconStyle} />
            <p style={{ margin: '0', fontSize: '16px' }}>No work experience added yet.</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
              Add your professional experience to showcase your career journey.
            </p>
          </div>
        </div>
      </>
    );
  }

  const experiences = experience.map(exp => (
    <div key={exp._id} style={experienceItemStyle} className="experience-item">
      <div style={companyNameStyle} className="company-name">
        <Building size={16} />
        {exp.company}
      </div>
      
      <div style={jobTitleStyle} className="job-title">
        <User size={14} />
        {exp.title}
      </div>

      {exp.location && (
        <div style={locationStyle}>
          <MapPin size={14} />
          {exp.location}
        </div>
      )}
      
      <div style={dateRangeStyle}>
        <Calendar size={14} />
        <Moment format="MMM YYYY">{exp.from}</Moment>
        {' - '}
        {exp.to === null ? (
          <span style={{ color: '#10b981', fontWeight: '500' }}>Current</span>
        ) : (
          <Moment format="MMM YYYY">{exp.to}</Moment>
        )}
      </div>
      
      {exp.description && (
        <div style={descriptionStyle}>
          {exp.description}
        </div>
      )}
      
      <button
        onClick={() => dispatch(deleteExperience(exp._id))}
        style={deleteButtonStyle}
        className="delete-btn"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  ));

  return (
    <>
      <style>
        {`
          .experience-item:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          }
          
          .delete-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
            background: linear-gradient(45deg, #dc2626, #b91c1c);
          }
          
          .delete-btn:active {
            transform: translateY(0);
          }
          
          .experience-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transition: left 0.5s;
          }
          
          .experience-item:hover::before {
            left: 100%;
          }
          
          @media (max-width: 768px) {
            .experience-item {
              padding: 16px;
            }
            
            .company-name {
              font-size: 16px;
            }
            
            .job-title {
              font-size: 14px;
            }
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>
            <Briefcase size={20} />
            Experience Credentials
          </h3>
        </div>
        
        <div style={experienceListStyle}>
          {experiences}
        </div>
      </div>
    </>
  );
};

export default Experience;