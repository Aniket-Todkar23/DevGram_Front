import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import { Github, Star, Eye, GitFork, ExternalLink, Code2, Loader2 } from 'lucide-react';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const { repos } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);

  const sectionHeaderStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#8b5cf6'
  };

  const repoCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const repoHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '12px',
    gap: '16px'
  };

  const repoTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  };

  const repoDescriptionStyle = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '16px',
    minHeight: '20px'
  };

  const statsContainerStyle = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  };

  const statBadgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const starsBadgeStyle = {
    ...statBadgeStyle,
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    color: '#1f2937'
  };

  const watchersBadgeStyle = {
    ...statBadgeStyle,
    background: 'linear-gradient(45deg, #10b981, #059669)',
    color: 'white'
  };

  const forksBadgeStyle = {
    ...statBadgeStyle,
    background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
    color: 'white'
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    flexDirection: 'column',
    gap: '16px'
  };

  const noReposStyle = {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '16px',
    fontStyle: 'italic',
    padding: '40px 0'
  };

  return (
    <>
      <style>
        {`
          .repo-card:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
          }
          
          .repo-card:hover .repo-title {
            color: #60a5fa;
          }
          
          .repo-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .repo-card:hover::before {
            opacity: 1;
          }
          
          .stat-badge:hover {
            transform: scale(1.05);
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div>
        <h2 style={sectionHeaderStyle}>
          <Github size={24} />
          GitHub Repositories
        </h2>
        
        {repos === null ? (
          <div style={loadingStyle}>
            <Loader2 
              size={32} 
              color="#8b5cf6" 
              style={{ animation: 'spin 2s linear infinite' }}
            />
            <div style={{ color: '#d1d5db', fontSize: '16px' }}>
              Loading repositories...
            </div>
          </div>
        ) : repos.length === 0 ? (
          <div style={noReposStyle}>
            <Github size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
            <div>No public repositories found</div>
          </div>
        ) : (
          <div>
            {repos.map(repo => (
              <div 
                key={repo.id} 
                className="repo-card"
                style={repoCardStyle}
              >
                <div style={repoHeaderStyle}>
                  <div style={{ flex: 1 }}>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="repo-title"
                      style={repoTitleStyle}
                    >
                      <Code2 size={16} />
                      {repo.name}
                      <ExternalLink size={14} style={{ opacity: 0.7 }} />
                    </a>
                  </div>
                </div>
                
                <div style={repoDescriptionStyle}>
                  {repo.description || 'No description available'}
                </div>
                
                <div style={statsContainerStyle}>
                  <div 
                    className="stat-badge"
                    style={starsBadgeStyle}
                  >
                    <Star size={12} fill="currentColor" />
                    {repo.stargazers_count}
                  </div>
                  
                  <div 
                    className="stat-badge"
                    style={watchersBadgeStyle}
                  >
                    <Eye size={12} />
                    {repo.watchers_count}
                  </div>
                  
                  <div 
                    className="stat-badge"
                    style={forksBadgeStyle}
                  >
                    <GitFork size={12} />
                    {repo.forks_count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileGithub;