import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import VerseCard from '../components/opening-verses/VerseCard';
import { mockOpeningVerses } from '../data/mockData';
import { OpeningVerse } from '../types/verse';

const OpeningVersesPage: React.FC = () => {
  // Group verses by day
  const versesByDay = mockOpeningVerses.reduce((acc, verse) => {
    if (!acc[verse.day]) {
      acc[verse.day] = [];
    }
    acc[verse.day].push(verse);
    return acc;
  }, {} as Record<number, OpeningVerse[]>);
  
  // Sort days in descending order (most recent first)
  const sortedDays = Object.keys(versesByDay)
    .map(Number)
    .sort((a, b) => b - a);
  
  return (
    <AppLayout title="Opening Verses">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Daily Inspiration</h2>
          <p className="text-secondary-700">
            Each day of our 10-day poetry festival features opening verses in English, Arabic, and Urdu.
            These verses are designed to inspire your own poetic creations. Use them as a starting point
            for your submissions.
          </p>
        </div>
        
        {sortedDays.map((day) => (
          <div key={day} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 border-b border-secondary-200 pb-2">
              Day {day} Verses
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {versesByDay[day].map((verse) => (
                <VerseCard 
                  key={verse.id} 
                  verse={verse} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default OpeningVersesPage;