import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { User, Briefcase, Globe, MapPin, Code, Github, FileText, Twitter, Facebook, Linkedin, Youtube, Instagram, ArrowLeft, Save } from 'lucide-react';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector(state => state.profile);

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [stars, setStars] = useState([]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  useEffect(() => {
    dispatch(getCurrentProfile());
    setStars(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      size: Math.random() * 2 + 1,
    })));
  }, [dispatch]);

  useEffect(() => {
    if (!loading && profile) {
      setFormData({
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: profile.skills ? profile.skills.join(',') : '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || '',
        twitter: profile.social?.twitter || '',
        facebook: profile.social?.facebook || '',
        linkedin: profile.social?.linkedin || '',
        youtube: profile.social?.youtube || '',
        instagram: profile.social?.instagram || ''
      });
    }
  }, [loading, profile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, navigate, true));
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px'
  };

  const starStyle = (star) => ({
    position: 'absolute',
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    backgroundColor: 'white',
    borderRadius: '50%',
    opacity: 0.3,
    animation: `twinkle 4s ease-in-out infinite`,
    animationDelay: `${star.animationDelay}s`
  });

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '700px',
    margin: '0 auto'
  };

  const formCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    padding: '40px',
    marginBottom: '30px',
    color: 'white'
  };

  const formGroupStyle = {
    marginBottom: '24px'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#e5e7eb',
    marginBottom: '8px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '32px'
  };

  const submitButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
    textDecoration: 'none'
  };

  const backButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    backdropFilter: 'blur(10px)'
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
      <div style={containerStyle}>
        {stars.map((star) => (
          <div key={star.id} style={starStyle(star)} />
        ))}

        <div style={contentWrapperStyle}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
              <User size={48} /> Edit Your Profile
            </h1>
            <p style={{ fontSize: '18px', color: '#e5e7eb' }}>
              Add some changes to your profile
            </p>
            <small style={{ fontSize: '14px', color: '#fbbf24' }}>* = required field</small>
          </div>

          <div style={formCardStyle}>
            <form onSubmit={onSubmit}>
              {/* Status */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><Briefcase size={16} /> Professional Status *</label>
                <select name="status" value={status} onChange={onChange} style={inputStyle}>
                  <option>* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">Student or Learning</option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Company */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><Briefcase size={16} /> Company</label>
                <input type="text" name="company" value={company} onChange={onChange} style={inputStyle} />
              </div>

              {/* Website */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><Globe size={16} /> Website</label>
                <input type="text" name="website" value={website} onChange={onChange} style={inputStyle} />
              </div>

              {/* Location */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><MapPin size={16} /> Location</label>
                <input type="text" name="location" value={location} onChange={onChange} style={inputStyle} />
              </div>

              {/* Skills */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><Code size={16} /> Skills *</label>
                <input type="text" name="skills" value={skills} onChange={onChange} style={inputStyle} />
              </div>

              {/* Github */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><Github size={16} /> Github Username</label>
                <input type="text" name="githubusername" value={githubusername} onChange={onChange} style={inputStyle} />
              </div>

              {/* Bio */}
              <div style={formGroupStyle}>
                <label style={labelStyle}><FileText size={16} /> Bio</label>
                <textarea name="bio" value={bio} onChange={onChange} style={{ ...inputStyle, minHeight: '120px' }} />
              </div>

              {/* Social toggle */}
              <div style={formGroupStyle}>
                <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)} style={backButtonStyle}>
                  Add Social Network Links (Optional)
                </button>
              </div>

              {displaySocialInputs && (
                <>
                  {[{icon: <Twitter size={16}/>, name:'twitter', label:'Twitter'},
                    {icon: <Facebook size={16}/>, name:'facebook', label:'Facebook'},
                    {icon: <Youtube size={16}/>, name:'youtube', label:'YouTube'},
                    {icon: <Linkedin size={16}/>, name:'linkedin', label:'LinkedIn'},
                    {icon: <Instagram size={16}/>, name:'instagram', label:'Instagram'}
                  ].map(s => (
                    <div key={s.name} style={formGroupStyle}>
                      <label style={labelStyle}>{s.icon} {s.label} URL</label>
                      <input type="text" name={s.name} value={formData[s.name]} onChange={onChange} style={inputStyle} />
                    </div>
                  ))}
                </>
              )}

              {/* Buttons */}
              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle}>
                  <Save size={20} /> Save Changes
                </button>
                <Link to="/dashboard" style={backButtonStyle}>
                  <ArrowLeft size={20} /> Go Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
