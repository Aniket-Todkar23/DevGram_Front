import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { ArrowLeft, MessageSquare, Loader } from 'lucide-react';

const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, loading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // === Reuse dashboard styles ===
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px 0'
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
    color: 'white'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    padding: '24px',
    marginBottom: '24px',
    color: 'white',
    position: 'relative'
  };

  const backButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    marginBottom: '24px',
    cursor: 'pointer'
  };

  const commentsHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const commentsIconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
  };

  const commentsTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white'
  };

  const commentsCountStyle = {
    marginLeft: 'auto',
    fontSize: '14px',
    color: '#d1d5db'
  };

  const commentsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const emptyCommentsStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#d1d5db',
    fontSize: '16px'
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    ...cardStyle
  };

  if (loading || post === null) {
    return (
      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <div style={loadingContainerStyle}>
            <Loader
              size={32}
              color="#8b5cf6"
              style={{ animation: 'spin 2s linear infinite', marginBottom: '16px' }}
            />
            <div style={{ fontSize: '18px', color: '#e5e7eb' }}>Loading post...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59,130,246,0.4);
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <Link to="/posts" style={backButtonStyle} className="back-btn">
            <ArrowLeft size={20} />
            Back To Posts
          </Link>

          {/* Post */}
          <div style={cardStyle}>
            <PostItem post={post} showActions={false} />
          </div>

          {/* Comment Form */}
          <div style={cardStyle}>
            <CommentForm postId={post._id} />
          </div>

          {/* Comments */}
          <div style={cardStyle}>
            <div style={commentsHeaderStyle}>
              <div style={commentsIconWrapperStyle}>
                <MessageSquare size={18} color="white" />
              </div>
              <div style={commentsTitleStyle}>Comments</div>
              <div style={commentsCountStyle}>
                {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
              </div>
            </div>

            {post.comments.length > 0 ? (
              <div style={commentsListStyle}>
                {post.comments.map(comment => (
                  <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
              </div>
            ) : (
              <div style={emptyCommentsStyle}>
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
