import React from 'react';
import { Calendar } from 'lucide-react';
import { OpeningVerse } from '../../types/verse';

interface VerseCardProps {
  verse: OpeningVerse;
  onClick?: () => void;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse, onClick }) => {
  const { text, language, author, date, day } = verse;
  
  return (
    <div 
      className="card cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div 
        className={`p-6 ${
          language === 'English' ? 'bg-primary-600' : 
          language === 'Arabic' ? 'bg-accent-600' : 
          'bg-secondary-600'
        } text-white`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            <span className="font-medium">Day {day}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full">
            {language}
          </span>
        </div>
        
        <div className={`font-serif text-lg italic mb-4 ${
          language === 'Arabic' || language === 'Urdu' ? 'rtl text-right' : ''
        }`}>
          "{text}"
        </div>
        
        <div className="text-right text-sm text-white text-opacity-80">
          — {author}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-secondary-500">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default VerseCard;