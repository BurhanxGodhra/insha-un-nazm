import React from 'react';
import { Heart, MessageSquare, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Poem } from '../../types/poem';

interface PoemCardProps {
  poem: Poem;
  onClick?: () => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, onClick }) => {
  const {
    title,
    content,
    author,
    language,
    date,
    likes,
    comments,
    views,
    approved,
  } = poem;

  // Only show the first few lines of the poem
  const previewContent = content.split('\n').slice(0, 3).join('\n');
  
  return (
    <div 
      className={`card cursor-pointer ${!approved ? 'border border-warning-500' : ''}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif">{title}</h3>
          <span className="text-xs px-2 py-1 bg-secondary-100 rounded-full text-secondary-700">
            {language}
          </span>
        </div>
        
        <div className={`poem-text mb-4 ${language === 'Arabic' || language === 'Urdu' ? 'rtl' : ''}`}>
          {previewContent}
          {content.split('\n').length > 3 && <span className="text-secondary-500">...</span>}
        </div>
        
        <div className="flex items-center text-sm text-secondary-500 mb-4">
          <span className="font-medium text-secondary-700">{author.name}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
          
          {!approved && (
            <>
              <span className="mx-2">•</span>
              <span className="text-warning-600 font-medium">Pending approval</span>
            </>
          )}
        </div>
        
        <div className="flex space-x-4 text-sm text-secondary-500">
          <div className="flex items-center">
            <Heart size={16} className="mr-1" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={16} className="mr-1" />
            <span>{comments.length}</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-1" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;