import React from 'react';
import Moment from 'react-moment';
import { GraduationCap, Calendar, BookOpen, FileText } from 'lucide-react';

const ProfileEducation = ({ 
  education: { 
    school, 
    degree, 
    fieldofstudy, 
    current, 
    to, 
    from, 
    description 
  } 
}) => {
  const headerStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dateStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#a3a3a3',
    fontSize: '14px',
    marginBottom: '16px',
    padding: '8px 12px',
    background: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    width: 'fit-content'
  };

  const detailStyle = {
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#d1d5db',
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px'
  };

  const valueStyle = {
    color: '#e5e7eb',
    fontSize: '14px',
    lineHeight: '1.5',
    flex: 1
  };

  return (
    <div>
      <h3 style={headerStyle}>
        <GraduationCap size={20} />
        {school}
      </h3>
      
      <div style={dateStyle}>
        <Calendar size={14} />
        <Moment format="YYYY/MM/DD">{from}</Moment> 
        {' - '} 
        {!to ? 'Present' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </div>

      <div style={detailStyle}>
        <div style={labelStyle}>
          <GraduationCap size={14} />
          Degree:
        </div>
        <div style={valueStyle}>{degree}</div>
      </div>

      <div style={detailStyle}>
        <div style={labelStyle}>
          <BookOpen size={14} />
          Field of Study:
        </div>
        <div style={valueStyle}>{fieldofstudy}</div>
      </div>

      {description && (
        <div style={detailStyle}>
          <div style={labelStyle}>
            <FileText size={14} />
            Description:
          </div>
          <div style={valueStyle}>{description}</div>
        </div>
      )}
    </div>
  );
};

export default ProfileEducation;