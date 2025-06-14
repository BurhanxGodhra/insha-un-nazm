import React, { useState, useEffect } from 'react';
import { Filter, CheckCircle, XCircle, Star, Eye } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminReviewPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'all'>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  // Initialize with mock data
  useEffect(() => {
    setPoems(mockPoems);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = poems;
    
    // Filter by status
    if (statusFilter === 'pending') {
      filtered = filtered.filter(poem => !poem.approved);
    } else if (statusFilter === 'approved') {
      filtered = filtered.filter(poem => poem.approved);
    }
    
    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(poem => poem.type === typeFilter);
    }
    
    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(poem => poem.language === languageFilter);
    }
    
    setFilteredPoems(filtered);
  }, [poems, statusFilter, typeFilter, languageFilter]);
  
  const selectedPoem = selectedPoemId 
    ? poems.find(poem => poem.id === selectedPoemId) 
    : null;
  
  const handleApprove = () => {
    if (!selectedPoemId) return;
    
    setPoems(poems.map(poem => 
      poem.id === selectedPoemId 
        ? { ...poem, approved: true } 
        : poem
    ));
    
    setSelectedPoemId(null);
  };
  
  const handleReject = () => {
    if (!selectedPoemId) return;
    
    setPoems(poems.filter(poem => poem.id !== selectedPoemId));
    setSelectedPoemId(null);
  };

  const handleRatePoem = () => {
    if (!selectedPoemId || currentRating === 0) return;
    
    setPoems(poems.map(poem => 
      poem.id === selectedPoemId 
        ? { ...poem, rating: currentRating } 
        : poem
    ));
    
    setShowRatingModal(false);
    setCurrentRating(0);
    setHoverRating(0);
    setSelectedPoemId(null);
  };

  const handleStarClick = (rating: number) => {
    setCurrentRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderInteractiveStarRating = () => {
    const stars = [];
    const displayRating = hoverRating || currentRating;
    
    for (let i = 1; i <= 5; i++) {
      // Check for full star, half star, or empty star
      const isFull = i <= displayRating;
      const isHalf = i - 0.5 === displayRating;
      
      stars.push(
        <div key={i} className="relative cursor-pointer">
          {/* Full star background */}
          <Star
            size={32}
            className={`transition-colors ${
              isFull ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            onMouseLeave={handleStarLeave}
          />
          
          {/* Half star overlay */}
          <div
            className="absolute inset-0 w-1/2 overflow-hidden cursor-pointer"
            onClick={() => handleStarClick(i - 0.5)}
            onMouseEnter={() => handleStarHover(i - 0.5)}
            onMouseLeave={handleStarLeave}
          >
            <Star
              size={32}
              className={`transition-colors ${
                isHalf || (displayRating >= i - 0.5 && displayRating < i) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-transparent'
              }`}
            />
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1">
        {stars}
      </div>
    );
  };

  const openRatingModal = (poemId: string) => {
    const poem = poems.find(p => p.id === poemId);
    setSelectedPoemId(poemId);
    setCurrentRating(poem?.rating || 0);
    setHoverRating(0);
    setShowRatingModal(true);
  };
  
  return (
    <AppLayout title="Review & Approve Poems">
      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-secondary-500" />
              <select
                className="form-input py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'pending' | 'approved' | 'all')}
              >
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="all">All Poems</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
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
          </div>
        </div>
        
        {/* Results info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-secondary-600">
            Showing {filteredPoems.length} {filteredPoems.length === 1 ? 'submission' : 'submissions'}
            {statusFilter !== 'all' ? ` — ${statusFilter === 'pending' ? 'pending review' : 'approved'}` : ''}
            {typeFilter !== 'all' ? ` — ${typeFilter === 'individual' ? 'Individual Abyat' : 'Full Nazam'}` : ''}
            {languageFilter !== 'all' ? ` in ${languageFilter}` : ''}
          </p>
          
          <div className="flex space-x-4">
            <div className="flex items-center text-secondary-700">
              <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center text-secondary-700">
              <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
              <span>Approved</span>
            </div>
          </div>
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
                  
                  {!poem.approved && (
                    <button
                      className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoemId(poem.id);
                        handleApprove();
                      }}
                      title="Approve"
                    >
                      <CheckCircle size={20} className="text-success-500 hover:text-success-600" />
                    </button>
                  )}
                  
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      openRatingModal(poem.id);
                    }}
                    title="Rate Poem"
                  >
                    <Star size={20} className="text-yellow-500 hover:text-yellow-600" />
                  </button>
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
            <h3 className="text-xl font-semibold mb-2">No submissions to review</h3>
            <p className="text-secondary-600">
              {statusFilter === 'pending' 
                ? 'All submissions have been reviewed!' 
                : 'No submissions match your filters.'}
            </p>
          </div>
        )}
        
        {/* Poem details modal */}
        {selectedPoem && !showRatingModal && (
          <PoemDetails
            poem={selectedPoem}
            onClose={() => setSelectedPoemId(null)}
            onApprove={handleApprove}
            onReject={handleReject}
            isAdmin={true}
          />
        )}

        {/* Rating modal */}
        {showRatingModal && selectedPoem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Rate This {selectedPoem.type === 'individual' ? 'Abyat' : 'Nazam'}</h3>
              
              <div className="mb-6">
                <p className="text-secondary-600 mb-4">Select a rating from 0.5 to 5 stars:</p>
                <div className="flex justify-center mb-4">
                  {renderInteractiveStarRating()}
                </div>
                <p className="text-sm text-secondary-500 text-center">
                  Current rating: {currentRating > 0 ? `${currentRating} star${currentRating > 1 ? 's' : ''}` : 'No rating selected'}
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowRatingModal(false);
                    setCurrentRating(0);
                    setHoverRating(0);
                    setSelectedPoemId(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRatePoem}
                  className="btn btn-primary"
                  disabled={currentRating === 0}
                >
                  Save Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminReviewPage;