import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Trash2, 
  User, 
  Clock,
  Heart,
  Sparkles,
  Eye
} from 'lucide-react';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [stars, setStars] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 20; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 3,
          size: Math.random() * 1.5 + 0.5,
        });
      }
      setStars(starArray);
    };
    generateStars();
    
    // Trigger entrance animation
    setTimeout(() => setAnimate(true), 100);

    // Check if current user liked the post
    if (likes && auth.user) {
      setIsLiked(likes.some(like => like.user === auth.user._id));
    }
  }, [likes, auth.user]);

  const containerStyle = {
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '20px',
    padding: '0',
    margin: '16px 0',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    opacity: animate ? '1' : '0',
    transform: animate ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%)',
    padding: '20px 24px',
    position: 'relative',
    overflow: 'hidden'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    zIndex: 2
  };

  const avatarStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '3px solid rgba(59, 130, 246, 0.5)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease'
  };

  const userDetailsStyle = {
    flex: 1
  };

  const userNameStyle = {
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    textDecoration: 'none'
  };

  const timestampStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#d1d5db',
    fontSize: '14px',
    fontWeight: '500'
  };

  const contentStyle = {
    padding: '24px',
    position: 'relative'
  };

  const postTextStyle = {
    color: 'white',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 20px 0',
    wordBreak: 'break-word'
  };

  const actionsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    paddingTop: '16px',
    borderTop: '1px solid rgba(139, 92, 246, 0.2)'
  };

  const actionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(15, 15, 35, 0.6)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none'
  };

  const likeButtonStyle = {
    ...actionButtonStyle,
    background: isLiked 
      ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)' 
      : 'rgba(15, 15, 35, 0.6)',
    border: isLiked 
      ? 'none' 
      : '1px solid rgba(139, 92, 246, 0.3)',
    color: isLiked ? 'white' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: isLiked 
      ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
      : 'none'
  };

  const discussionButtonStyle = {
    ...actionButtonStyle,
    background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
    border: 'none',
    color: 'white',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
    border: 'none',
    color: 'white',
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
  };

  const badgeStyle = {
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
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

  const decorativeGradientStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(30%, -30%)'
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

          @keyframes glow {
            0% { opacity: 0.5; }
            100% { opacity: 0.8; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }

          .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0.7;
            animation: twinkle 3s ease-in-out infinite;
          }

          .post-item-container:hover {
            transform: translateY(-3px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          }

          .post-item-container:hover .post-avatar {
            transform: scale(1.1);
            border-color: rgba(59, 130, 246, 0.8);
            box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
          }

          .post-item-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent);
            transition: left 0.5s;
          }

          .post-item-container:hover::before {
            left: 100%;
          }

          .header-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
            animation: glow 6s ease-in-out infinite alternate;
          }

          .action-btn:hover {
            background: rgba(59, 130, 246, 0.2);
            border-color: rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
          }

          .like-btn:hover {
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          .discussion-btn:hover {
            background: linear-gradient(45deg, #0891b2, #0e7490);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
          }

          .delete-btn:hover {
            background: linear-gradient(45deg, #dc2626, #b91c1c);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
          }

          .user-link:hover {
            color: #60a5fa;
            transform: translateX(2px);
          }

          .floating-sparkle {
            position: absolute;
            top: 20px;
            right: 20px;
            animation: pulse 2s ease-in-out infinite;
            opacity: 0.4;
          }

          @media (max-width: 768px) {
            .post-item-container {
              margin: 12px 0;
              border-radius: 16px;
            }
            
            .header-content {
              padding: 16px 20px;
            }
            
            .content-section {
              padding: 20px;
            }
            
            .actions-container {
              flex-direction: column;
              gap: 8px;
            }

            .actions-container > * {
              width: 100%;
              justify-content: center;
            }

            .user-info {
              gap: 12px;
            }

            .post-avatar {
              width: 48px;
              height: 48px;
            }

            .user-name {
              font-size: 16px;
            }
          }
        `}
      </style>

      <div style={containerStyle} className="post-item-container">
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
        <div className="floating-sparkle">
          <Sparkles size={14} color="rgba(255, 255, 255, 0.4)" />
        </div>

        {/* Header with user info */}
        <div style={headerStyle} className="header-container header-content">
          <div style={userInfoStyle} className="user-info">
            <Link to={`/profile/${user}`} style={{ textDecoration: 'none' }}>
              <img 
                style={avatarStyle} 
                className="post-avatar"
                src={avatar} 
                alt={`${name}'s avatar`}
              />
            </Link>
            <div style={userDetailsStyle}>
              <Link to={`/profile/${user}`} style={userNameStyle} className="user-link">
                <h4 style={userNameStyle}>{name}</h4>
              </Link>
              <p style={timestampStyle}>
                <Clock size={14} />
                <Moment format="MMM DD, YYYY">{date}</Moment>
              </p>
            </div>
            {!auth.loading && user === auth.user._id && (
              <div style={badgeStyle}>
                <User size={12} style={{ marginRight: '4px' }} />
                Your Post
              </div>
            )}
          </div>
        </div>

        {/* Post content */}
        <div style={contentStyle} className="content-section">
          <p style={postTextStyle}>{text}</p>

          {showActions && (
            <div style={actionsContainerStyle} className="actions-container">
              <button
                onClick={() => dispatch(addLike(_id))}
                style={likeButtonStyle}
                className="action-btn like-btn"
                title="Like this post"
              >
                <ThumbsUp size={16} />
                <span>
                  {likes.length > 0 ? likes.length : 'Like'}
                </span>
              </button>

              <button
                onClick={() => dispatch(removeLike(_id))}
                style={actionButtonStyle}
                className="action-btn"
                title="Unlike this post"
              >
                <ThumbsDown size={16} />
                <span>Unlike</span>
              </button>

              <Link 
                to={`/posts/${_id}`} 
                style={discussionButtonStyle}
                className="discussion-btn"
                title="View discussion"
              >
                <MessageCircle size={16} />
                <span>
                  Discussion {comments.length > 0 && `(${comments.length})`}
                </span>
              </Link>

              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => dispatch(deletePost(_id))}
                  style={deleteButtonStyle}
                  className="delete-btn"
                  title="Delete this post"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostItem;