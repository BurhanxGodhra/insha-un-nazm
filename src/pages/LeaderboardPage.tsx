import React, { useState } from 'react';
import { Star } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { motion } from 'framer-motion';

interface Poet {
  id: string;
  name: string;
  avatar: string;
  poemTitle: string;
  rating: number;
}

const mockPoets: Poet[] = [
  {
    id: '1',
    name: 'Elias Thorne',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32',
    poemTitle: 'Whispers of the Dusk',
    rating: 98.5
  },
  {
    id: '2',
    name: 'Sophia Reed',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32',
    poemTitle: 'Silent Rhymes of the Forest',
    rating: 96.2
  },
  // Add more mock data as needed
];

const LeaderboardPage: React.FC = () => {
  const [selectedPoet, setSelectedPoet] = useState<string | null>(null);

  return (
    <AppLayout title="Poet Leaderboard">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Rank</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Poet / Poem</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Score</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockPoets.map((poet, index) => (
                  <motion.tr
                    key={poet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={poet.avatar}
                          alt={poet.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{poet.name}</div>
                          <div className="text-sm text-gray-500">{poet.poemTitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{poet.rating}</span>
                        <div className="ml-2 flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= Math.round(poet.rating / 20)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedPoet(poet.id)}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        View Poem
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LeaderboardPage;