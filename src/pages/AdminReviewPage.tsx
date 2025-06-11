import React, { useState, useEffect } from 'react';
import { Filter, CheckCircle, XCircle } from 'lucide-react';
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
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  // Initialize with mock data
  useEffect(() => {
    // In a real app, this would fetch from an API
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
    
    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(poem => poem.language === languageFilter);
    }
    
    setFilteredPoems(filtered);
  }, [poems, statusFilter, languageFilter]);
  
  const selectedPoem = selectedPoemId 
    ? poems.find(poem => poem.id === selectedPoemId) 
    : null;
  
  const handleApprove = () => {
    if (!selectedPoemId) return;
    
    // Update the poems list (in a real app, this would call an API)
    setPoems(poems.map(poem => 
      poem.id === selectedPoemId 
        ? { ...poem, approved: true } 
        : poem
    ));
    
    // Close the modal
    setSelectedPoemId(null);
  };
  
  const handleReject = () => {
    if (!selectedPoemId) return;
    
    // Remove the poem (in a real app, this might flag it as rejected)
    setPoems(poems.filter(poem => poem.id !== selectedPoemId));
    
    // Close the modal
    setSelectedPoemId(null);
  };
  
  return (
    <AppLayout title="Review Poems">
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
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-secondary-600">
            Showing {filteredPoems.length} {filteredPoems.length === 1 ? 'poem' : 'poems'}
            {statusFilter !== 'all' ? ` — ${statusFilter === 'pending' ? 'pending review' : 'approved'}` : ''}
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
                {!poem.approved && (
                  <div className="absolute -top-2 -right-2 z-10 bg-white rounded-full">
                    <CheckCircle
                      size={32}
                      className="cursor-pointer text-success-500 hover:text-success-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoemId(poem.id);
                        handleApprove();
                      }}
                    />
                  </div>
                )}
                <PoemCard 
                  poem={poem} 
                  onClick={() => setSelectedPoemId(poem.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No poems to review</h3>
            <p className="text-secondary-600">
              {statusFilter === 'pending' 
                ? 'All poems have been reviewed!' 
                : 'No poems match your filters.'}
            </p>
          </div>
        )}
        
        {/* Poem details modal */}
        {selectedPoem && (
          <PoemDetails
            poem={selectedPoem}
            onClose={() => setSelectedPoemId(null)}
            onApprove={handleApprove}
            onReject={handleReject}
            isAdmin={true}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default AdminReviewPage;