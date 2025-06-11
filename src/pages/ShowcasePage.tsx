import React, { useState } from 'react';
import { Star, Calendar } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { motion } from "framer-motion";

interface FeaturedPoem {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  language: string;
  date: string;
}

const featuredPoem: FeaturedPoem = {
  id: '1',
  title: 'Whispers of the Dusk',
  content: `In fields of gold where breezes sigh,
secrets whispered to the sky.
A dance of leaves, a song untold,
stories of a time of old.`,
  author: {
    name: 'Elias Thorne',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32'
  },
  rating: 4.8,
  language: 'English',
  date: new Date().toISOString()
};

const ShowcasePage: React.FC = () => {
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
                <Calendar className="h-5 w-5 text-primary-500" />
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(featuredPoem.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                {featuredPoem.language}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-serif text-gray-900 mb-4">{featuredPoem.title}</h2>
            
            <div className="flex items-center mb-6">
              <img
                src={featuredPoem.author.avatar}
                alt={featuredPoem.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{featuredPoem.author.name}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= Math.round(featuredPoem.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {featuredPoem.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="font-serif text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                {featuredPoem.content}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ShowcasePage;