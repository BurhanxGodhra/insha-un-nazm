import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';

const BestPoemPage: React.FC = () => {
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('mostLiked');
  
  // Get approved poems only
  const approvedPoems = mockPoems.filter(poem => poem.approved);
  
  // Categories and their filter functions
  const categories = {
    mostLiked: {
      title: 'Most Liked Poems',
      poems: [...approvedPoems].sort((a, b) => b.likes - a.likes).slice(0, 3),
    },
    mostViewed: {
      title: 'Most Viewed Poems',
      poems: [...approvedPoems].sort((a, b) => b.views - a.views).slice(0, 3),
    },
    mostCommented: {
      title: 'Most Discussed Poems',
      poems: [...approvedPoems].sort((a, b) => b.comments.length - a.comments.length).slice(0, 3),
    },
    byLanguage: {
      title: 'Best Poems by Language',
      poems: [
        // Best English poem
        [...approvedPoems]
          .filter(poem => poem.language === 'English')
          .sort((a, b) => b.likes - a.likes)[0],
        // Best Arabic poem
        [...approvedPoems]
          .filter(poem => poem.language === 'Arabic')
          .sort((a, b) => b.likes - a.likes)[0],
        // Best Urdu poem
        [...approvedPoems]
          .filter(poem => poem.language === 'Urdu')
          .sort((a, b) => b.likes - a.likes)[0],
      ].filter(Boolean),
    },
  };
  
  const selectedPoem = selectedPoemId 
    ? approvedPoems.find(poem => poem.id === selectedPoemId) 
    : null;
  
  return (
    <AppLayout title="Best Poems">
      <div className="max-w-6xl mx-auto">
        {/* Category selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Selected category title */}
        <h2 className="text-2xl font-serif mb-6">
          {categories[selectedCategory as keyof typeof categories].title}
        </h2>
        
        {/* Poems grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories[selectedCategory as keyof typeof categories].poems.map((poem, index) => (
            <div key={poem.id} className="relative">
              {index === 0 && selectedCategory !== 'byLanguage' && (
                <div className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">1st</span>
                </div>
              )}
              <PoemCard 
                poem={poem} 
                onClick={() => setSelectedPoemId(poem.id)}
              />
            </div>
          ))}
        </div>
        
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

export default BestPoemPage;