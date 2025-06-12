import React, { useState } from 'react';
import { Star, Calendar, FileText, Mic, Upload, CheckCircle, Clock, ThumbsUp, ThumbsDown, Download, Play, Eye, FileCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Poem } from '../../types/poem';

interface PoemDetailsProps {
  poem: Poem;
  viewMode?: 'original' | 'araz';
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isAdmin?: boolean;
}

const PoemDetails: React.FC<PoemDetailsProps> = ({ 
  poem, 
  viewMode = 'original',
  onClose,
  onApprove,
  onReject,
  isAdmin = false
}) => {
  const [currentViewMode, setCurrentViewMode] = useState(viewMode);
  
  // Get submission method icon and text
  const getSubmissionInfo = () => {
    switch (poem.submissionMethod) {
      case 'upload':
        return {
          icon: <Upload size={18} className="text-secondary-500" />,
          text: 'File Upload',
          fileName: poem.fileName
        };
      case 'recording':
        return {
          icon: <Mic size={18} className="text-accent-500" />,
          text: 'Audio Recording',
          fileName: poem.audioFileName
        };
      default:
        return {
          icon: <FileText size={18} className="text-primary-500" />,
          text: 'Manual Entry',
          fileName: null
        };
    }
  };

  const submissionInfo = getSubmissionInfo();

  // Render star rating
  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= Math.round(poem.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium text-secondary-700">
          {poem.rating > 0 ? `${poem.rating.toFixed(1)} / 5.0` : 'Not rated yet'}
        </span>
      </div>
    );
  };

  // Get content to display based on view mode
  const getDisplayContent = () => {
    if (currentViewMode === 'araz' && poem.arazContent) {
      return poem.arazContent;
    }
    return poem.content;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-secondary-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  poem.type === 'individual' 
                    ? 'bg-accent-100 text-accent-700' 
                    : 'bg-primary-100 text-primary-700'
                }`}>
                  {poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'}
                </span>
                <span className="px-3 py-1 bg-secondary-100 rounded-full text-secondary-700 text-sm">
                  {poem.language}
                </span>
                {poem.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
                {currentViewMode === 'araz' && (
                  <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                    Araz Version
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif">
                {poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'} by {poem.author.name}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-700 text-lg font-medium"
            >
              ✕
            </button>
          </div>

          {/* View Mode Toggle */}
          {poem.arazContent && poem.status === 'araz_done' && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setCurrentViewMode('original')}
                className={`btn btn-sm flex items-center ${
                  currentViewMode === 'original' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <Eye size={16} className="mr-1" />
                Original Version
              </button>
              <button
                onClick={() => setCurrentViewMode('araz')}
                className={`btn btn-sm flex items-center ${
                  currentViewMode === 'araz' 
                    ? 'bg-success-600 text-white' 
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <FileCheck size={16} className="mr-1" />
                Araz Version
              </button>
            </div>
          )}
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Poem metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar size={18} className="text-secondary-500 mr-2" />
                <span className="text-secondary-600">Entry Date:</span>
                <span className="ml-2 font-medium">
                  {formatDistanceToNow(new Date(poem.entryDate), { addSuffix: true })}
                </span>
              </div>
              
              <div className="flex items-center">
                {submissionInfo.icon}
                <span className="text-secondary-600 ml-2">Submission Method:</span>
                <span className="ml-2 font-medium">{submissionInfo.text}</span>
              </div>
              
              {submissionInfo.fileName && (
                <div className="flex items-center">
                  <FileText size={18} className="text-secondary-500 mr-2" />
                  <span className="text-secondary-600">File:</span>
                  <span className="ml-2 font-medium text-primary-600">{submissionInfo.fileName}</span>
                  {poem.submissionMethod === 'recording' && (
                    <button className="ml-2 p-1 text-accent-600 hover:text-accent-700">
                      <Play size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-secondary-600">Rating:</span>
                <div className="mt-1">
                  {renderStars()}
                </div>
              </div>
              
              <div className="flex items-center">
                {poem.status === 'araz_done' ? (
                  <>
                    <CheckCircle size={18} className="text-success-500 mr-2" />
                    <span className="text-success-600 font-medium">Araz Done</span>
                  </>
                ) : (
                  <>
                    <Clock size={18} className="text-warning-500 mr-2" />
                    <span className="text-warning-600 font-medium">Araz Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Poem content */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              {currentViewMode === 'araz' ? 'Araz Version Content' : 'Original Content'}
            </h3>
            <div className={`poem-text bg-secondary-50 p-6 rounded-lg ${poem.language === 'Arabic' || poem.language === 'Urdu' ? 'rtl' : ''}`}>
              {getDisplayContent()}
            </div>
          </div>
          
          {/* Admin actions */}
          {isAdmin && !poem.approved && (
            <div className="flex space-x-4 mb-8 p-4 bg-secondary-50 rounded-lg">
              <button 
                onClick={onApprove}
                className="btn bg-success-500 text-white hover:bg-success-600 flex items-center"
              >
                <ThumbsUp size={18} className="mr-2" />
                Approve {poem.type === 'individual' ? 'Abyat' : 'Nazam'}
              </button>
              <button 
                onClick={onReject}
                className="btn bg-error-500 text-white hover:bg-error-600 flex items-center"
              >
                <ThumbsDown size={18} className="mr-2" />
                Reject {poem.type === 'individual' ? 'Abyat' : 'Nazam'}
              </button>
            </div>
          )}
          
          {/* File download for uploaded content */}
          {(poem.fileName || poem.audioFileName) && (
            <div className="p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium mb-2">Attached File</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">
                  {poem.fileName || poem.audioFileName}
                </span>
                <button className="btn btn-primary btn-sm flex items-center">
                  <Download size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoemDetails;