import React, { useState, useEffect } from 'react';
import { Star, Calendar, Trophy } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { motion } from "framer-motion";
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';

const ShowcasePage: React.FC = () => {
  const [featuredPoem, setFeaturedPoem] = useState<Poem | null>(null);

  useEffect(() => {
    // Find the featured poem
    const featured = mockPoems.find(poem => poem.featured && poem.approved);
    setFeaturedPoem(featured || null);
  }, []);

  if (!featuredPoem) {
    return (
      <AppLayout title="Featured Poem of the Day">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 bg-white rounded-lg shadow-card">
            <Trophy size={48} className="mx-auto text-secondary-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Featured Poem Today</h3>
            <p className="text-secondary-600">
              Check back later for today's featured poem selection.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= Math.round(featuredPoem.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium text-secondary-700">
          {featuredPoem.rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <AppLayout title="Featured Poem of the Day">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy size={24} className="text-yellow-500 mr-2" />
                <span className="text-lg font-semibold text-primary-600">Featured Poem</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  featuredPoem.type === 'individual' 
                    ? 'bg-accent-100 text-accent-700' 
                    : 'bg-primary-100 text-primary-700'
                }`}>
                  {featuredPoem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'}
                </span>
                <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
                  {featuredPoem.language}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-serif text-gray-900 mb-2">
                  {featuredPoem.type === 'individual' ? 'Featured Individual Abyat' : 'Featured Full Nazam'}
                </h2>
                <div className="flex items-center text-secondary-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    Featured on {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900 mb-1">By {featuredPoem.author.name}</p>
                <div className="flex items-center">
                  {renderStars()}
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <div className={`font-serif text-xl leading-relaxed text-gray-700 whitespace-pre-line p-6 bg-secondary-50 rounded-lg ${
                featuredPoem.language === 'Arabic' || featuredPoem.language === 'Urdu' ? 'rtl' : ''
              }`}>
                {featuredPoem.content}
              </div>
            </div>

            <div className="text-center text-secondary-600">
              <p className="italic">
                "This {featuredPoem.type === 'individual' ? 'abyat' : 'nazam'} has been selected as today's featured piece."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ShowcasePage;