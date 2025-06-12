import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { mockOpeningVerses } from '../data/mockData';
import { OpeningVerse } from '../types/verse';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOpeningVersesPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [verses, setVerses] = useState<OpeningVerse[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    language: 'English' as 'English' | 'Arabic' | 'Urdu',
    day: 1,
  });
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  // Initialize with mock data
  useEffect(() => {
    setVerses(mockOpeningVerses);
  }, []);
  
  // Group verses by day
  const versesByDay = verses.reduce((acc, verse) => {
    if (!acc[verse.day]) {
      acc[verse.day] = [];
    }
    acc[verse.day].push(verse);
    return acc;
  }, {} as Record<number, OpeningVerse[]>);
  
  const sortedDays = Object.keys(versesByDay)
    .map(Number)
    .sort((a, b) => a - b);
  
  const resetForm = () => {
    setFormData({
      text: '',
      author: '',
      language: 'English',
      day: 1,
    });
    setShowAddForm(false);
    setEditingId(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim() || !formData.author.trim()) {
      return;
    }
    
    if (editingId) {
      // Update existing verse
      setVerses(verses.map(verse => 
        verse.id === editingId 
          ? {
              ...verse,
              text: formData.text,
              author: formData.author,
              language: formData.language,
              day: formData.day,
            }
          : verse
      ));
    } else {
      // Add new verse
      const newVerse: OpeningVerse = {
        id: `ov${Date.now()}`,
        text: formData.text,
        author: formData.author,
        language: formData.language,
        day: formData.day,
        date: new Date().toISOString(),
      };
      setVerses([...verses, newVerse]);
    }
    
    resetForm();
  };
  
  const handleEdit = (verse: OpeningVerse) => {
    setFormData({
      text: verse.text,
      author: verse.author,
      language: verse.language,
      day: verse.day,
    });
    setEditingId(verse.id);
    setShowAddForm(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this opening verse?')) {
      setVerses(verses.filter(verse => verse.id !== id));
    }
  };
  
  return (
    <AppLayout title="Manage Opening Verses">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Opening Verses Management</h2>
            <p className="text-secondary-600 mt-1">
              Upload and manage daily opening verses for all languages
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Opening Verse
          </button>
        </div>
        
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Opening Verse' : 'Add New Opening Verse'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Language</label>
                  <select
                    className="form-input"
                    value={formData.language}
                    onChange={(e) => setFormData({
                      ...formData,
                      language: e.target.value as 'English' | 'Arabic' | 'Urdu'
                    })}
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Urdu">Urdu</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Day (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="form-input"
                    value={formData.day}
                    onChange={(e) => setFormData({
                      ...formData,
                      day: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.author}
                  onChange={(e) => setFormData({
                    ...formData,
                    author: e.target.value
                  })}
                  placeholder="Enter author name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="form-label">Verse Text</label>
                <textarea
                  className={`form-input min-h-[120px] ${
                    formData.language === 'Arabic' || formData.language === 'Urdu' ? 'text-right' : ''
                  }`}
                  value={formData.text}
                  onChange={(e) => setFormData({
                    ...formData,
                    text: e.target.value
                  })}
                  placeholder="Enter the opening verse"
                  dir={formData.language === 'Arabic' || formData.language === 'Urdu' ? 'rtl' : 'ltr'}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary flex items-center"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingId ? 'Update Verse' : 'Add Verse'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Verses by Day */}
        {sortedDays.length > 0 ? (
          <div className="space-y-8">
            {sortedDays.map((day) => (
              <div key={day} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Calendar size={20} className="text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Day {day} Verses</h3>
                  <span className="ml-2 text-sm text-secondary-500">
                    ({versesByDay[day].length} verse{versesByDay[day].length !== 1 ? 's' : ''})
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {versesByDay[day].map((verse) => (
                    <div key={verse.id} className="border border-secondary-200 rounded-lg p-4 relative">
                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => handleEdit(verse)}
                          className="p-1 text-primary-600 hover:text-primary-700"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(verse.id)}
                          className="p-1 text-error-600 hover:text-error-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      {/* Language badge */}
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {verse.language}
                        </span>
                      </div>
                      
                      {/* Verse content */}
                      <div className={`font-serif italic text-base mb-3 ${
                        verse.language === 'Arabic' || verse.language === 'Urdu' ? 'text-right' : ''
                      }`} dir={verse.language === 'Arabic' || verse.language === 'Urdu' ? 'rtl' : 'ltr'}>
                        "{verse.text}"
                      </div>
                      
                      {/* Author */}
                      <div className="text-sm text-secondary-600">
                        — {verse.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Calendar size={48} className="mx-auto text-secondary-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Opening Verses</h3>
            <p className="text-secondary-600 mb-4">
              Start by adding opening verses for each day of the festival.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              Add First Opening Verse
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminOpeningVersesPage;