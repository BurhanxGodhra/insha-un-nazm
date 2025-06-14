import React from 'react';
import { X, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Poem } from '../../types/poem';

interface SimplePoemViewProps {
  poem: Poem;
  onClose: () => void;
}

const SimplePoemView: React.FC<SimplePoemViewProps> = ({ poem, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
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
              </div>
              <h2 className="text-2xl font-serif">
                {poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'} by {poem.author.name}
              </h2>
              <div className="flex items-center text-secondary-600 mt-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">
                  {formatDistanceToNow(new Date(poem.entryDate), { addSuffix: true })}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-700 text-lg font-medium"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Body - Only the poem content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className={`poem-text bg-secondary-50 p-6 rounded-lg text-center ${
            poem.language === 'Arabic' || poem.language === 'Urdu' ? 'rtl' : ''
          }`}>
            {poem.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePoemView;