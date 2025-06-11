import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, BookOpen, Calendar, Award, Trophy, Sparkles, UserCheck } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import FeatureCard from '../components/common/FeatureCard';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const features = [
    {
      title: 'Submit Poem',
      description: 'Share your poetic creation with the world.',
      icon: <PenTool size={24} />,
      path: '/submit-poem',
      color: 'bg-primary-600',
    },
    {
      title: 'View Poems',
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
      description: 'See the top-ranking poets of the event.',
      icon: <Award size={24} />,
      path: '/leaderboard',
      color: 'bg-secondary-700',
    },
    {
      title: 'Best Poem',
      description: 'Discover the highest-rated poems by category.',
      icon: <Trophy size={24} />,
      path: '/best-poem',
      color: 'bg-primary-700',
    },
    {
      title: 'Showcase',
      description: 'View featured poems selected by our experts.',
      icon: <Sparkles size={24} />,
      path: '/showcase',
      color: 'bg-accent-700',
    },
  ];
  
  // Add admin review feature if user is admin
  if (isAdmin()) {
    features.push({
      title: 'Review Poems',
      description: 'Review and approve submitted poems.',
      icon: <UserCheck size={24} />,
      path: '/admin/review',
      color: 'bg-error-600',
    });
  }
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
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
    </AppLayout>
  );
};

export default Dashboard;