import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';
import { Send, Sparkles, Heart, Camera, Smile, MessageSquare, Zap } from 'lucide-react';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [stars, setStars] = useState([]);
  const [animate, setAnimate] = useState(false);

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 3,
          size: Math.random() * 2 + 0.5,
        });
      }
      setStars(starArray);
    };
    generateStars();
    
    // Trigger entrance animation
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addPost({ text }));
      setText('');
      setIsFocused(false);
    }
  };

  const containerStyle = {
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '20px',
    padding: '0',
    margin: '20px auto',
    maxWidth: '700px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    opacity: animate ? '1' : '0',
    transform: animate ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden'
  };

  const headerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    zIndex: 2
  };

  const sparkleIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
    animation: 'pulse 3s ease-in-out infinite'
  };

  const headerTitleStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '700',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    margin: '0',
    background: 'linear-gradient(45deg, #ffffff, #a78bfa, #60a5fa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const headerSubtitleStyle = {
    color: '#d1d5db',
    fontSize: '14px',
    margin: '4px 0 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const formStyle = {
    padding: '32px'
  };

  const textareaWrapperStyle = {
    position: 'relative',
    marginBottom: '24px'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: isFocused ? '140px' : '100px',
    padding: '20px',
    background: 'rgba(15, 15, 35, 0.6)',
    backdropFilter: 'blur(10px)',
    border: isFocused ? '2px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '16px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.6',
    resize: 'none',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    boxShadow: isFocused 
      ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1)' 
      : '0 4px 15px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  };

  const actionBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '20px'
  };

  const quickActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const quickActionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(15, 15, 35, 0.6)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const submitButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 28px',
    background: text.trim() 
      ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)' 
      : 'rgba(15, 15, 35, 0.6)',
    border: text.trim() 
      ? 'none'
      : '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '12px',
    color: text.trim() ? 'white' : 'rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: text.trim() ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: text.trim() 
      ? '0 8px 25px rgba(59, 130, 246, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    textShadow: text.trim() ? '0 1px 3px rgba(0, 0, 0, 0.2)' : 'none',
    position: 'relative',
    overflow: 'hidden'
  };

  const characterCountStyle = {
    position: 'absolute',
    bottom: '16px',
    right: '20px',
    color: text.length > 450 ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    fontWeight: '500',
    background: 'rgba(15, 15, 35, 0.8)',
    padding: '4px 8px',
    borderRadius: '6px',
    backdropFilter: 'blur(10px)'
  };

  const decorativeGradientStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(40%, -40%)'
  };

  const shimmerStyle = {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)',
    animation: 'shimmer 3s linear infinite'
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes glow {
            0% { opacity: 0.5; }
            100% { opacity: 0.8; }
          }

          .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0.7;
            animation: twinkle 3s ease-in-out infinite;
          }

          .post-form-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
          }

          .post-textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
          }

          .post-textarea:focus {
            background: rgba(15, 15, 35, 0.9);
            transform: translateY(-1px);
          }

          .quick-action:hover {
            background: rgba(59, 130, 246, 0.2);
            border-color: rgba(59, 130, 246, 0.5);
            color: rgba(255, 255, 255, 0.9);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
          }

          .quick-action:active {
            transform: translateY(0);
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
          }

          .submit-btn:hover:not(:disabled)::before {
            left: 100%;
          }

          .submit-btn:active:not(:disabled) {
            transform: translateY(-1px);
          }

          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .floating-hearts {
            position: absolute;
            top: 24px;
            right: 24px;
            animation: float 3s ease-in-out infinite;
            opacity: 0.4;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          .header-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
            animation: glow 6s ease-in-out infinite alternate;
          }

          @media (max-width: 768px) {
            .post-form-container {
              margin: 16px;
              border-radius: 16px;
            }
            
            .form-content {
              padding: 24px;
            }
            
            .header-content {
              padding: 20px;
              flex-direction: column;
              text-align: center;
              gap: 12px;
            }
            
            .action-bar {
              flex-direction: column;
              gap: 16px;
            }
            
            .submit-btn {
              width: 100%;
              justify-content: center;
            }

            .quick-actions {
              justify-content: center;
            }

            .header-title {
              font-size: 20px;
            }
          }
        `}
      </style>

      <div style={containerStyle} className="post-form-container">
        {/* Animated stars background */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`
            }}
          />
        ))}

        {/* Shimmer effect */}
        <div style={shimmerStyle}></div>

        {/* Decorative Elements */}
        <div style={decorativeGradientStyle}></div>
        <div className="floating-hearts">
          <Heart size={16} color="rgba(255, 255, 255, 0.4)" />
        </div>

        {/* Header */}
        <div style={headerStyle} className="header-container">
          <div style={headerContentStyle} className="header-content">
            <div style={sparkleIconStyle} className="header-sparkle">
              <MessageSquare size={22} color="white" />
            </div>
            <div>
              <h3 style={headerTitleStyle} className="header-title">Share Your Thoughts</h3>
              <p style={headerSubtitleStyle}>
                <Zap size={14} />
                What's on your developer mind today?
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form style={formStyle} className="form-content" onSubmit={onSubmit}>
          <div style={textareaWrapperStyle}>
            <textarea
              name="text"
              placeholder="Share your coding journey, insights, or ask the community... ✨"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={textareaStyle}
              className="post-textarea"
              maxLength={500}
              required
            />
            {text.length > 0 && (
              <div style={characterCountStyle}>
                {text.length}/500
              </div>
            )}
          </div>

          <div style={actionBarStyle} className="action-bar">
            <div style={quickActionsStyle} className="quick-actions">
              <button
                type="button"
                style={quickActionButtonStyle}
                className="quick-action"
                title="Add photo"
              >
                <Camera size={18} />
              </button>
              <button
                type="button"
                style={quickActionButtonStyle}
                className="quick-action"
                title="Add emoji"
              >
                <Smile size={18} />
              </button>
              <button
                type="button"
                style={quickActionButtonStyle}
                className="quick-action"
                title="Add sparkle"
              >
                <Sparkles size={18} />
              </button>
            </div>

            <button
              type="submit"
              style={submitButtonStyle}
              className="submit-btn"
              disabled={!text.trim()}
            >
              <Send size={18} />
              Share Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostForm;