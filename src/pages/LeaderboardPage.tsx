import React, { useState } from 'react';
import { Star, Trophy, Medal, Award } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';

const LeaderboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'individual' | 'full'>('individual');
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);

  // Get approved poems only and filter by type
  const approvedPoems = mockPoems.filter(poem => poem.approved && poem.rating > 0);
  const individualAbyat = approvedPoems
    .filter(poem => poem.type === 'individual')
    .sort((a, b) => b.rating - a.rating);
  const fullNazams = approvedPoems
    .filter(poem => poem.type === 'full')
    .sort((a, b) => b.rating - a.rating);

  const currentPoems = selectedCategory === 'individual' ? individualAbyat : fullNazams;
  
  const selectedPoem = selectedPoemId 
    ? approvedPoems.find(poem => poem.id === selectedPoemId) 
    : null;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} className="text-yellow-500" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Award size={24} className="text-amber-700" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-800 font-semibold text-sm">
            {rank}
          </div>
        );
    }
  };

  const renderStars = (rating: number) => {
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
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <AppLayout title="Leaderboard">
      <div className="max-w-6xl mx-auto">
        {/* Category selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'individual'
                  ? 'bg-accent-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
              onClick={() => setSelectedCategory('individual')}
            >
              Individual Abyat Leaderboard
            </button>
            <button
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'full'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
              onClick={() => setSelectedCategory('full')}
            >
              Full Nazam Leaderboard
            </button>
          </div>
        </div>
        
        {/* Selected category title */}
        <h2 className="text-2xl font-serif mb-6">
          {selectedCategory === 'individual' ? 'Top Individual Abyat' : 'Top Full Nazams'}
          <span className="text-secondary-500 text-lg ml-2">
            (Ranked by Admin Rating)
          </span>
        </h2>
        
        {/* Leaderboard */}
        {currentPoems.length > 0 ? (
          <div className="space-y-4">
            {currentPoems.map((poem, index) => (
              <div 
                key={poem.id} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer ${
                  index < 3 ? 'border-l-4' : ''
                } ${
                  index === 0 ? 'border-yellow-500' : 
                  index === 1 ? 'border-gray-400' : 
                  index === 2 ? 'border-amber-700' : ''
                }`}
                onClick={() => setSelectedPoemId(poem.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    {/* Poem info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          poem.type === 'individual' 
                            ? 'bg-accent-100 text-accent-700' 
                            : 'bg-primary-100 text-primary-700'
                        }`}>
                          {poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'}
                        </span>
                        <span className="text-xs px-2 py-1 bg-secondary-100 rounded-full text-secondary-700">
                          {poem.language}
                        </span>
                      </div>
                      
                      <div className={`poem-text text-sm mb-2 ${poem.language === 'Arabic' || poem.language === 'Urdu' ? 'rtl' : ''}`}>
                        {poem.content.split('\n').slice(0, 1).join('\n')}
                        {poem.content.split('\n').length > 1 && <span className="text-secondary-500">...</span>}
                      </div>
                      
                      <div className="flex items-center text-sm text-secondary-500">
                        <span className="font-medium text-secondary-700">{poem.author.name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(poem.entryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex-shrink-0">
                    {renderStars(poem.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No rated {selectedCategory === 'individual' ? 'abyat' : 'nazams'} yet</h3>
            <p className="text-secondary-600">
              {selectedCategory === 'individual' ? 'Individual abyat' : 'Full nazams'} will appear here once they are rated by admins.
            </p>
          </div>
        )}
        
        {/* Poem details modal */}
        {selectedPoem && (
          <PoemDetails
            poem={selectedPoem}
            onClose={() => setSelectedPoemId(null)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default LeaderboardPage;