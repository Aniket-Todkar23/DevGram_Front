import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
import { GraduationCap, Trash2, Calendar, School, Award } from 'lucide-react';

const Education = ({ education }) => {
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

  const educationListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const educationItemStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const schoolNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const degreeStyle = {
    fontSize: '16px',
    color: '#d1d5db',
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

  if (!education || education.length === 0) {
    return (
      <>
        <style>
          {`
            .education-item:hover {
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
            
            .education-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
              transition: left 0.5s;
            }
            
            .education-item:hover::before {
              left: 100%;
            }
            
            @media (max-width: 768px) {
              .education-item {
                padding: 16px;
              }
              
              .school-name {
                font-size: 16px;
              }
              
              .degree-text {
                font-size: 14px;
              }
            }
          `}
        </style>
        
        <div style={containerStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>
              <GraduationCap size={20} />
              Education Credentials
            </h3>
          </div>
          
          <div style={emptyStateStyle}>
            <GraduationCap style={emptyIconStyle} />
            <p style={{ margin: '0', fontSize: '16px' }}>No education credentials added yet.</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
              Add your educational background to showcase your qualifications.
            </p>
          </div>
        </div>
      </>
    );
  }

  const educations = education.map(edu => (
    <div key={edu._id} style={educationItemStyle} className="education-item">
      <div style={schoolNameStyle} className="school-name">
        <School size={16} />
        {edu.school}
      </div>
      
      <div style={degreeStyle} className="degree-text">
        <Award size={14} />
        {edu.degree}
        {edu.fieldofstudy && (
          <span style={{ color: '#8b5cf6' }}>
            • {edu.fieldofstudy}
          </span>
        )}
      </div>
      
      <div style={dateRangeStyle}>
        <Calendar size={14} />
        <Moment format="MMM YYYY">{edu.from}</Moment>
        {' - '}
        {edu.to === null ? (
          <span style={{ color: '#10b981', fontWeight: '500' }}>Current</span>
        ) : (
          <Moment format="MMM YYYY">{edu.to}</Moment>
        )}
      </div>
      
      {edu.description && (
        <div style={{
          fontSize: '14px',
          color: '#d1d5db',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          {edu.description}
        </div>
      )}
      
      <button
        onClick={() => dispatch(deleteEducation(edu._id))}
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
          .education-item:hover {
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
          
          .education-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transition: left 0.5s;
          }
          
          .education-item:hover::before {
            left: 100%;
          }
          
          @media (max-width: 768px) {
            .education-item {
              padding: 16px;
            }
            
            .school-name {
              font-size: 16px;
            }
            
            .degree-text {
              font-size: 14px;
            }
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>
            <GraduationCap size={20} />
            Education Credentials
          </h3>
        </div>
        
        <div style={educationListStyle}>
          {educations}
        </div>
      </div>
    </>
  );
};

export default Education;