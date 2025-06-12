import React, { useState, useEffect } from 'react';
import { Star, Trophy, Eye, Filter } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminFeaturedPoemPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [featuredPoem, setFeaturedPoem] = useState<Poem | null>(null);
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  // Initialize with approved poems only
  useEffect(() => {
    const approvedPoems = mockPoems.filter(poem => poem.approved);
    setPoems(approvedPoems);
    setFeaturedPoem(approvedPoems.find(poem => poem.featured) || null);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = poems;
    
    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(poem => poem.type === typeFilter);
    }
    
    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(poem => poem.language === languageFilter);
    }
    
    // Sort by rating (highest first)
    filtered = filtered.sort((a, b) => b.rating - a.rating);
    
    setFilteredPoems(filtered);
  }, [poems, typeFilter, languageFilter]);
  
  const selectedPoem = selectedPoemId 
    ? poems.find(poem => poem.id === selectedPoemId) 
    : null;
  
  const handleFeaturePoem = (poemId: string) => {
    setPoems(poems.map(poem => ({
      ...poem,
      featured: poem.id === poemId ? true : false
    })));
    
    const newFeaturedPoem = poems.find(poem => poem.id === poemId);
    setFeaturedPoem(newFeaturedPoem || null);
  };
  
  const handleUnfeaturePoem = () => {
    setPoems(poems.map(poem => ({
      ...poem,
      featured: false
    })));
    setFeaturedPoem(null);
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
    <AppLayout title="Featured Poem Selection">
      <div className="max-w-6xl mx-auto">
        {/* Current Featured Poem */}
        {featuredPoem && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Trophy size={24} className="text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Current Featured Poem</h3>
              </div>
              <button
                onClick={handleUnfeaturePoem}
                className="btn bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Remove Feature
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    featuredPoem.type === 'individual' 
                      ? 'bg-accent-100 text-accent-700' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {featuredPoem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'}
                  </span>
                  <span className="text-xs px-2 py-1 bg-secondary-100 rounded-full text-secondary-700">
                    {featuredPoem.language}
                  </span>
                </div>
                {renderStars(featuredPoem.rating)}
              </div>
              
              <div className={`poem-text text-sm mb-2 ${featuredPoem.language === 'Arabic' || featuredPoem.language === 'Urdu' ? 'rtl' : ''}`}>
                {featuredPoem.content.split('\n').slice(0, 2).join('\n')}
                {featuredPoem.content.split('\n').length > 2 && <span className="text-secondary-500">...</span>}
              </div>
              
              <div className="text-sm text-secondary-600">
                By {featuredPoem.author.name}
              </div>
            </div>
          </div>
        )}
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-secondary-500" />
              <select
                className="form-input py-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="individual">Individual Abyat</option>
                <option value="full">Full Nazam</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                className="form-input py-2"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Urdu">Urdu</option>
                <option value="Lisan al-Dawah">Lisan al-Dawah</option>
                <option value="French">French</option>
              </select>
            </div>
            
            <div className="text-sm text-secondary-600">
              Showing approved poems sorted by rating
            </div>
          </div>
        </div>
        
        {/* Results info */}
        <div className="mb-6">
          <p className="text-secondary-600">
            Showing {filteredPoems.length} approved {filteredPoems.length === 1 ? 'poem' : 'poems'}
            {typeFilter !== 'all' ? ` — ${typeFilter === 'individual' ? 'Individual Abyat' : 'Full Nazam'}` : ''}
            {languageFilter !== 'all' ? ` in ${languageFilter}` : ''}
          </p>
        </div>
        
        {/* Poems grid */}
        {filteredPoems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoems.map((poem) => (
              <div key={poem.id} className="relative">
                {/* Admin action buttons */}
                <div className="absolute -top-2 -right-2 z-10 flex space-x-1">
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoemId(poem.id);
                    }}
                    title="View Details"
                  >
                    <Eye size={20} className="text-primary-500 hover:text-primary-600" />
                  </button>
                  
                  {!poem.featured && (
                    <button
                      className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeaturePoem(poem.id);
                      }}
                      title="Feature This Poem"
                    >
                      <Trophy size={20} className="text-yellow-500 hover:text-yellow-600" />
                    </button>
                  )}
                  
                  {poem.featured && (
                    <div className="bg-yellow-500 rounded-full p-1 shadow-md">
                      <Trophy size={20} className="text-white" />
                    </div>
                  )}
                </div>
                
                <PoemCard 
                  poem={poem} 
                  onClick={() => setSelectedPoemId(poem.id)}
                  showAuthor={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Trophy size={48} className="mx-auto text-secondary-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No approved poems available</h3>
            <p className="text-secondary-600">
              Poems will appear here once they are approved and rated.
            </p>
          </div>
        )}
        
        {/* Poem details modal */}
        {selectedPoem && (
          <PoemDetails
            poem={selectedPoem}
            onClose={() => setSelectedPoemId(null)}
            isAdmin={true}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default AdminFeaturedPoemPage;