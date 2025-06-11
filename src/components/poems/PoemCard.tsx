import React from 'react';
import { Star, Calendar, FileText, Mic, Upload, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Poem } from '../../types/poem';

interface PoemCardProps {
  poem: Poem;
  onClick?: () => void;
  showAuthor?: boolean; // For leaderboard vs personal view
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, onClick, showAuthor = false }) => {
  const {
    type,
    content,
    author,
    language,
    entryDate,
    rating,
    status,
    approved,
    submissionMethod,
    fileName,
    audioFileName,
  } = poem;

  // Only show the first few lines of the poem
  const previewContent = content.split('\n').slice(0, 2).join('\n');
  
  // Get submission method icon
  const getSubmissionIcon = () => {
    switch (submissionMethod) {
      case 'upload':
        return <Upload size={16} className="text-secondary-500" />;
      case 'recording':
        return <Mic size={16} className="text-accent-500" />;
      default:
        return <FileText size={16} className="text-primary-500" />;
    }
  };

  // Render star rating
  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= Math.round(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-secondary-700">
          {rating > 0 ? rating.toFixed(1) : 'Not rated'}
        </span>
      </div>
    );
  };
  
  return (
    <div 
      className={`card cursor-pointer ${!approved ? 'border border-warning-500' : ''}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              type === 'individual' 
                ? 'bg-accent-100 text-accent-700' 
                : 'bg-primary-100 text-primary-700'
            }`}>
              {type === 'individual' ? 'Individual Abyat' : 'Full Nazam'}
            </span>
            {getSubmissionIcon()}
          </div>
          <span className="text-xs px-2 py-1 bg-secondary-100 rounded-full text-secondary-700">
            {language}
          </span>
        </div>
        
        <div className={`poem-text mb-4 text-base ${language === 'Arabic' || language === 'Urdu' ? 'rtl' : ''}`}>
          {previewContent}
          {content.split('\n').length > 2 && <span className="text-secondary-500">...</span>}
        </div>
        
        {/* Entry Date */}
        <div className="flex items-center text-sm text-secondary-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{formatDistanceToNow(new Date(entryDate), { addSuffix: true })}</span>
          
          {showAuthor && (
            <>
              <span className="mx-2">•</span>
              <span className="font-medium text-secondary-700">{author.name}</span>
            </>
          )}
          
          {!approved && (
            <>
              <span className="mx-2">•</span>
              <span className="text-warning-600 font-medium">Pending approval</span>
            </>
          )}
        </div>
        
        {/* Rating */}
        <div className="mb-3">
          {renderStars()}
        </div>
        
        {/* Status and File Info */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {status === 'araz_done' ? (
              <div className="flex items-center text-success-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">Araz Done</span>
              </div>
            ) : (
              <div className="flex items-center text-warning-600">
                <Clock size={16} className="mr-1" />
                <span className="text-sm font-medium">Araz Pending</span>
              </div>
            )}
          </div>
          
          {(fileName || audioFileName) && (
            <div className="text-xs text-secondary-500">
              {fileName || audioFileName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoemCard;