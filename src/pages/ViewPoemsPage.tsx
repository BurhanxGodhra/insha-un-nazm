import React, { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';
import { useAuth } from '../contexts/AuthContext';

const ViewPoemsPage: React.FC = () => {
  const { user } = useAuth();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Initialize with user's poems only
  useEffect(() => {
    // Filter poems to show only current user's submissions
    const userPoems = mockPoems.filter(poem => poem.author.id === user?.id);
    setPoems(userPoems);
    setFilteredPoems(userPoems);
  }, [user]);
  
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
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(poem => poem.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        poem => 
          poem.content.toLowerCase().includes(query) ||
          poem.language.toLowerCase().includes(query)
      );
    }
    
    setFilteredPoems(filtered);
  }, [poems, searchQuery, typeFilter, languageFilter, statusFilter]);
  
  const selectedPoem = selectedPoemId 
    ? poems.find(poem => poem.id === selectedPoemId) 
    : null;
  
  return (
    <AppLayout title="My Poems">
      <div className="max-w-6xl mx-auto">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary-400" />
              </div>
              <input
                type="text"
                placeholder="Search your poems by content"
                className="form-input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
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
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                className="form-input py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="araz_done">Araz Done</option>
                <option value="araz_pending">Araz Pending</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results info */}
        <div className="mb-6">
          <p className="text-secondary-600">
            Showing {filteredPoems.length} {filteredPoems.length === 1 ? 'submission' : 'submissions'}
            {typeFilter !== 'all' ? ` — ${typeFilter === 'individual' ? 'Individual Abyat' : 'Full Nazam'}` : ''}
            {languageFilter !== 'all' ? ` in ${languageFilter}` : ''}
            {statusFilter !== 'all' ? ` — ${statusFilter === 'araz_done' ? 'Araz Done' : 'Araz Pending'}` : ''}
          </p>
        </div>
        
        {/* Poems grid */}
        {filteredPoems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoems.map((poem) => (
              <PoemCard 
                key={poem.id} 
                poem={poem} 
                onClick={() => setSelectedPoemId(poem.id)}
                showAuthor={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No submissions found</h3>
            <p className="text-secondary-600">
              {poems.length === 0 
                ? "You haven't submitted any poems yet. Start by submitting your first poem!"
                : "Try adjusting your search or filters to find what you're looking for."
              }
            </p>
          </div>
        )}
        
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

export default ViewPoemsPage;