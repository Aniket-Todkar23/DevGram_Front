import React, { useState } from 'react';
import { Trash2, User, Calendar } from 'lucide-react';

// Mock components for demonstration - replace with your actual imports
const Link = ({ to, children, style, className }) => (
  <div style={{ ...style, cursor: 'pointer' }} className={className} onClick={() => console.log(`Navigate to ${to}`)}>
    {children}
  </div>
);

const Moment = ({ format, children }) => {
  const date = new Date(children);
  return <span>{date.toLocaleDateString()}</span>;
};

// Mock Redux hooks for demonstration - replace with your actual imports
const useDispatch = () => (action) => console.log('Dispatching:', action);
const useSelector = (selector) => ({
  loading: false,
  user: { _id: 'current-user-id' }
});

// Mock action for demonstration - replace with your actual import
const deleteComment = (postId, commentId) => ({
  type: 'DELETE_COMMENT',
  payload: { postId, commentId }
});

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date }
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteComment(postId, _id));
    setShowDeleteConfirm(false);
  };

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '0',
    margin: '12px 0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const contentStyle = {
    padding: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start'
  };

  const avatarSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    minWidth: '60px'
  };

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    objectFit: 'cover'
  };

  const avatarFallbackStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const nameStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
  };

  const commentContentStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const textStyle = {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0',
    fontWeight: '400',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word'
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  };

  const dateStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px',
    fontWeight: '500',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  };

  const deleteButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: showDeleteConfirm 
      ? 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)'
      : 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.2)',
    borderRadius: '8px',
    color: showDeleteConfirm ? 'white' : 'rgba(255, 71, 87, 0.8)',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: showDeleteConfirm 
      ? '0 4px 15px rgba(255, 71, 87, 0.3)' 
      : '0 2px 8px rgba(255, 71, 87, 0.1)',
    textShadow: showDeleteConfirm ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'
  };

  const decorativeGradientStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '40px',
    height: '40px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(15%, -15%)'
  };

  const linkStyle = {
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  };

  return (
    <>
      <style>
        {`
          .comment-item-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            border-color: rgba(255, 255, 255, 0.12);
          }

          .comment-avatar:hover {
            transform: scale(1.05);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }

          .comment-name:hover {
            color: rgba(255, 255, 255, 1);
            text-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          }

          .delete-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
            background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
            color: white;
          }

          .delete-btn:active {
            transform: translateY(0);
          }

          .comment-link:hover .comment-avatar {
            transform: scale(1.05);
            border-color: rgba(255, 255, 255, 0.25);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .comment-item-container {
            animation: fadeIn 0.4s ease-out forwards;
          }

          @media (max-width: 768px) {
            .comment-content {
              flex-direction: column;
              gap: 12px;
            }
            
            .comment-avatar-section {
              flex-direction: row;
              align-items: center;
              min-width: auto;
              gap: 12px;
            }
            
            .comment-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
            
            .delete-btn {
              align-self: flex-start;
            }
          }
        `}
      </style>

      <div style={containerStyle} className="comment-item-container">
        {/* Decorative Elements */}
        <div style={decorativeGradientStyle}></div>

        <div style={contentStyle} className="comment-content">
          {/* Avatar Section */}
          <div style={avatarSectionStyle} className="comment-avatar-section">
            <Link to={`/profile/${user}`} style={linkStyle} className="comment-link">
              {avatar ? (
                <img 
                  style={avatarStyle} 
                  className="comment-avatar"
                  src={avatar} 
                  alt={`${name}'s avatar`}
                />
              ) : (
                <div style={avatarFallbackStyle} className="comment-avatar">
                  <User size={20} color="white" />
                </div>
              )}
            </Link>
            <Link to={`/profile/${user}`} style={linkStyle}>
              <h4 style={nameStyle} className="comment-name">{name}</h4>
            </Link>
          </div>

          {/* Comment Content */}
          <div style={commentContentStyle}>
            <p style={textStyle}>{text}</p>
            
            <div style={metaStyle} className="comment-meta">
              <div style={dateStyle}>
                <Calendar size={12} />
                <span>
                  <Moment format="MMM DD, YYYY">{date}</Moment>
                </span>
              </div>

              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={showDeleteConfirm ? handleDelete : () => setShowDeleteConfirm(true)}
                  style={deleteButtonStyle}
                  className="delete-btn"
                >
                  <Trash2 size={12} />
                  {showDeleteConfirm ? 'Confirm' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;