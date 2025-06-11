import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Poem, Comment } from '../../types/poem';

interface PoemDetailsProps {
  poem: Poem;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isAdmin?: boolean;
}

const PoemDetails: React.FC<PoemDetailsProps> = ({ 
  poem, 
  onClose,
  onApprove,
  onReject,
  isAdmin = false
}) => {
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(poem.comments);
  const [localLikes, setLocalLikes] = useState(poem.likes);
  const [hasLiked, setHasLiked] = useState(false);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text: comment,
      author: { id: '2', name: 'You' },
      date: new Date().toISOString()
    };
    
    setLocalComments([...localComments, newComment]);
    setComment('');
  };
  
  const handleLike = () => {
    if (!hasLiked) {
      setLocalLikes(localLikes + 1);
      setHasLiked(true);
    } else {
      setLocalLikes(localLikes - 1);
      setHasLiked(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-secondary-200 flex justify-between items-center">
          <h2 className="text-2xl font-serif">{poem.title}</h2>
          <button 
            onClick={onClose}
            className="text-secondary-500 hover:text-secondary-700"
          >
            Close
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Poem metadata */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="font-medium">{poem.author.name}</span>
              <span className="mx-2 text-secondary-400">•</span>
              <span className="text-secondary-500">
                {formatDistanceToNow(new Date(poem.date), { addSuffix: true })}
              </span>
            </div>
            <span className="px-3 py-1 bg-secondary-100 rounded-full text-secondary-700 text-sm">
              {poem.language}
            </span>
          </div>
          
          {/* Poem content */}
          <div className={`poem-text mb-8 ${poem.language === 'Arabic' || poem.language === 'Urdu' ? 'rtl' : ''}`}>
            {poem.content}
          </div>
          
          {/* Admin actions */}
          {isAdmin && !poem.approved && (
            <div className="flex space-x-4 mb-8 p-4 bg-secondary-50 rounded-lg">
              <button 
                onClick={onApprove}
                className="btn bg-success-500 text-white hover:bg-success-600 flex items-center"
              >
                <ThumbsUp size={18} className="mr-2" />
                Approve Poem
              </button>
              <button 
                onClick={onReject}
                className="btn bg-error-500 text-white hover:bg-error-600 flex items-center"
              >
                <ThumbsDown size={18} className="mr-2" />
                Reject Poem
              </button>
            </div>
          )}
          
          {/* User actions */}
          <div className="flex space-x-4 mb-8">
            <button 
              className={`btn flex items-center ${hasLiked ? 'text-accent-600' : 'text-secondary-700'}`}
              onClick={handleLike}
            >
              <Heart size={18} className="mr-2" fill={hasLiked ? 'currentColor' : 'none'} />
              <span>{localLikes} Likes</span>
            </button>
            <button className="btn flex items-center text-secondary-700">
              <Share2 size={18} className="mr-2" />
              <span>Share</span>
            </button>
          </div>
          
          {/* Comments section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Comments ({localComments.length})</h3>
            
            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="mb-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-input min-h-20"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </div>
            </form>
            
            {/* Comments list */}
            <div className="space-y-4">
              {localComments.map((comment) => (
                <div key={comment.id} className="border-b border-secondary-100 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm text-secondary-500">
                      {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-secondary-800">{comment.text}</p>
                </div>
              ))}
              
              {localComments.length === 0 && (
                <p className="text-center text-secondary-500 py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemDetails;