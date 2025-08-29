import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { Users, Sparkles, Loader } from 'lucide-react';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '0',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundOverlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    zIndex: '1'
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: '2',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    position: 'relative'
  };

  const titleStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '30px 40px',
    margin: '0 auto 20px',
    maxWidth: '600px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    overflow: 'hidden'
  };

  const mainTitleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 16px 0',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px'
  };

  const subtitleStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
    fontWeight: '400',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    margin: '20px auto',
    maxWidth: '400px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem',
    fontWeight: '500'
  };

  const postsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '30px'
  };

  const decorativeElementStyle = {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '80px',
    height: '80px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 3s ease-in-out infinite'
  };

  const sparkleIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
    animation: 'pulse 2s ease-in-out infinite'
  };

  const userIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={backgroundOverlayStyle}></div>
        <div style={contentWrapperStyle}>
          <div style={loadingStyle}>
            <div style={{ animation: 'spin 1s linear infinite' }}>
              <Loader size={32} color="rgba(255, 255, 255, 0.8)" />
            </div>
            <span>Loading amazing posts...</span>
          </div>
        </div>

        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .title-container:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }

          .posts-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .main-title {
              fontSize: '2.2rem !important';
              flexDirection: 'column !important';
              gap: '12px !important';
            }
            
            .content-wrapper {
              padding: '20px 16px !important';
            }
            
            .title-container {
              padding: '24px 20px !important';
              borderRadius: '16px !important';
            }
            
            .subtitle {
              fontSize: '1rem !important';
              flexDirection: 'column !important';
              gap: '8px !important';
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={backgroundOverlayStyle}></div>
        
        <div style={contentWrapperStyle} className="content-wrapper">
          {/* Header Section */}
          <div style={headerStyle}>
            <div style={titleStyle} className="title-container">
              <div style={decorativeElementStyle}></div>
              
              <h1 style={mainTitleStyle} className="main-title">
                <div style={sparkleIconStyle}>
                  <Sparkles size={24} color="white" />
                </div>
                Posts
              </h1>
              
              <p style={subtitleStyle} className="subtitle">
                <div style={userIconStyle}>
                  <Users size={16} color="white" />
                </div>
                Welcome to the community
              </p>
            </div>
          </div>

          {/* Post Form */}
          <PostForm />

          {/* Posts Container */}
          <div style={postsContainerStyle} className="posts-fade-in">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;