import React from 'react';
import { Award, BookOpen, Heart } from 'lucide-react';
import { Poet } from '../../types/poet';

interface PoetRankCardProps {
  poet: Poet;
  rank: number;
}

const PoetRankCard: React.FC<PoetRankCardProps> = ({ poet, rank }) => {
  const { name, points, poemsCount, likesReceived, country } = poet;
  
  // Determine medal color based on rank
  const getMedalColor = () => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-700';
      default: return 'text-secondary-500';
    }
  };
  
  return (
    <div className={`card p-4 ${rank <= 3 ? 'border-l-4' : ''} ${
      rank === 1 ? 'border-yellow-500' : 
      rank === 2 ? 'border-gray-400' : 
      rank === 3 ? 'border-amber-700' : ''
    }`}>
      <div className="flex items-center">
        {/* Rank */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
          {rank <= 3 ? (
            <Award size={28} className={getMedalColor()} />
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-800 font-semibold">
              {rank}
            </div>
          )}
        </div>
        
        {/* Poet info */}
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
              <span className="font-bold">{points}</span>
              <span className="ml-1 text-sm">pts</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-secondary-500 mt-1">
            <span>{country}</span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1" />
              <span>{poemsCount} poems</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Heart size={14} className="mr-1" />
              <span>{likesReceived} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetRankCard;