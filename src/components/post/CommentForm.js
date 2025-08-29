import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';
import { MessageCircle, Send, Sparkles } from 'lucide-react';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addComment(postId, { text }));
      setText('');
      setIsFocused(false);
    }
  };

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    margin: '16px 0 0 0',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%)',
    padding: '16px 20px',
    position: 'relative',
    overflow: 'hidden'
  };

  const headerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
    zIndex: 2
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)'
  };

  const headerTitleStyle = {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    margin: '0'
  };

  const formStyle = {
    padding: '20px'
  };

  const textareaWrapperStyle = {
    position: 'relative',
    marginBottom: '16px'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: isFocused ? '100px' : '80px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(10px)',
    border: isFocused ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4',
    resize: 'none',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxShadow: isFocused ? '0 4px 20px rgba(102, 126, 234, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const submitButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: text.trim() 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    borderRadius: '10px',
    color: text.trim() ? 'white' : 'rgba(255, 255, 255, 0.5)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: text.trim() ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s ease',
    boxShadow: text.trim() 
      ? '0 4px 15px rgba(102, 126, 234, 0.25)' 
      : '0 2px 6px rgba(0, 0, 0, 0.1)',
    textShadow: text.trim() ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
    width: '100%'
  };

  const characterCountStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '12px',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '11px',
    fontWeight: '500'
  };

  const decorativeGradientStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '60px',
    height: '60px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(20%, -20%)'
  };

  return (
    <>
      <style>
        {`
          .comment-form-container:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          }

          .comment-textarea::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-style: italic;
          }

          .comment-submit:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
          }

          .comment-submit:active:not(:disabled) {
            transform: translateY(0);
          }

          .comment-textarea:focus {
            background: rgba(255, 255, 255, 0.08);
          }

          .comment-icon {
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @media (max-width: 768px) {
            .comment-form-container {
              margin: 12px 0 0 0;
              border-radius: 14px;
            }
            
            .comment-form-content {
              padding: 16px;
            }
            
            .comment-header {
              padding: 14px 16px;
            }
            
            .comment-submit {
              padding: 12px 16px;
              font-size: 13px;
            }
          }
        `}
      </style>

      <div style={containerStyle} className="comment-form-container">
        {/* Decorative Elements */}
        <div style={decorativeGradientStyle}></div>

        {/* Header */}
        <div style={headerStyle} className="comment-header">
          <div style={headerContentStyle}>
            <div style={iconStyle} className="comment-icon">
              <MessageCircle size={16} color="white" />
            </div>
            <h3 style={headerTitleStyle}>Leave A Comment</h3>
          </div>
        </div>

        {/* Form */}
        <div style={formStyle} className="comment-form-content">
          <div style={textareaWrapperStyle}>
            <textarea
              name="text"
              placeholder="Share your thoughts on this post... 💭"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={textareaStyle}
              className="comment-textarea"
              maxLength={300}
              rows="3"
              required
            />
            {text.length > 0 && (
              <div style={characterCountStyle}>
                {text.length}/300
              </div>
            )}
          </div>

          <button
            type="button"
            style={submitButtonStyle}
            className="comment-submit"
            disabled={!text.trim()}
            onClick={onSubmit}
          >
            <Send size={16} />
            Submit Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentForm;