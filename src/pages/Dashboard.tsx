import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, BookOpen, Calendar, Award, Trophy, Sparkles, UserCheck, FileEdit, Star, CheckCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import FeatureCard from '../components/common/FeatureCard';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const userFeatures = [
    {
      title: 'Submit Nazm',
      description: 'Share your poetic creation with the world.',
      icon: <PenTool size={24} />,
      path: '/submit-poem',
      color: 'bg-primary-600',
    },
    {
      title: 'View Nazm',
      description: 'Explore poems submitted by other poets.',
      icon: <BookOpen size={24} />,
      path: '/view-poems',
      color: 'bg-secondary-800',
    },
    {
      title: 'Opening Verses',
      description: 'Get inspired by daily opening verses.',
      icon: <Calendar size={24} />,
      path: '/opening-verses',
      color: 'bg-accent-600',
    },
    {
      title: 'Leaderboard',
      description: 'See the top-ranking nazms of the event.',
      icon: <Award size={24} />,
      path: '/leaderboard',
      color: 'bg-secondary-700',
    },
    {
      title: 'Best Nazm',
      description: 'Discover the highest-rated nazms by category.',
      icon: <Trophy size={24} />,
      path: '/best-poem',
      color: 'bg-primary-700',
    },
    {
      title: 'Showcase',
      description: 'View featured nazms.',
      icon: <Sparkles size={24} />,
      path: '/showcase',
      color: 'bg-accent-700',
    },
  ];

  const adminFeatures = [
    {
      title: 'Review & Approve',
      description: 'Review and approve submitted nazms.',
      icon: <UserCheck size={24} />,
      path: '/admin/review',
      color: 'bg-accent-700',
    },
    {
      title: 'Manage Opening Verses',
      description: 'Upload and manage daily opening verses.',
      icon: <Calendar size={24} />,
      path: '/admin/opening-verses',
      color: 'bg-secondary-700',
    },
    {
      title: 'Featured Nazm Selection',
      description: 'Select and manage featured namzs of the day.',
      icon: <Star size={24} />,
      path: '/admin/featured-poem',
      color: 'bg-primary-600',
    },
    {
      title: 'Nazm Checking & Araz',
      description: 'Check nazms, upload araz versions, and manage status.',
      icon: <FileEdit size={24} />,
      path: '/admin/poem-checking',
      color: 'bg-secondary-800',
    },
  ];
  
  return (
    <AppLayout title="Dashboard">
      <div className="max-w-6xl mx-auto">
        <div className="bg-primary-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-serif mb-2">Insha Ul Nazm</h2>
          <p className="text-secondary-700">
            Join poets from around the globe in this 10-day celebration of poetry across multiple languages.
            Get inspired by daily opening verses, submit your own creations, and explore works by fellow poets.
          </p>
        </div>
        
        {/* User Features */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                path={feature.path}
                color={feature.color}
              />
            ))}
          </div>
        </div>

        {/* Admin Features */}
        {isAdmin() && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-error-700">Admin Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {adminFeatures.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  path={feature.path}
                  color={feature.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;