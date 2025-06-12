import React, { useState, useEffect } from 'react';
import { Download, Upload, Printer, CheckCircle, Clock, Filter, Eye, Save } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import PoemCard from '../components/poems/PoemCard';
import PoemDetails from '../components/poems/PoemDetails';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types/poem';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPoemCheckingPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [showArazUploadModal, setShowArazUploadModal] = useState(false);
  const [arazContent, setArazContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = poems;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(poem => poem.status === statusFilter);
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
  
  const handleDownloadPoem = (poem: Poem) => {
    const content = `${poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'} by ${poem.author.name}
Language: ${poem.language}
Entry Date: ${new Date(poem.entryDate).toLocaleDateString()}

Content:
${poem.content}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${poem.type}_${poem.author.name}_${poem.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handlePrintArazVersion = (poem: Poem) => {
    if (!poem.arazContent) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Araz Version - ${poem.author.name}</title>
            <style>
              body { font-family: serif; line-height: 1.6; margin: 40px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .content { white-space: pre-line; font-size: 16px; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
              ${poem.language === 'Arabic' || poem.language === 'Urdu' ? '.content { direction: rtl; text-align: right; }' : ''}
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${poem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'} - Araz Version</h1>
              <p>By ${poem.author.name} | Language: ${poem.language}</p>
              <p>Entry Date: ${new Date(poem.entryDate).toLocaleDateString()}</p>
            </div>
            <div class="content">${poem.arazContent}</div>
            <div class="footer">
              <p>Insha Un Nazm - Poetry Festival 1447</p>
              <p>Printed on: ${new Date().toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };
  
  const handleStatusUpdate = (poemId: string, newStatus: 'araz_done' | 'araz_pending') => {
    setPoems(poems.map(poem => 
      poem.id === poemId 
        ? { ...poem, status: newStatus }
        : poem
    ));
  };
  
  const handleArazUpload = () => {
    if (!selectedPoemId || (!arazContent.trim() && !selectedFile)) return;
    
    let finalArazContent = arazContent;
    
    // If file is selected, use file name as reference
    if (selectedFile) {
      finalArazContent = `[Araz file uploaded: ${selectedFile.name}]\n\n${arazContent}`;
    }
    
    setPoems(poems.map(poem => 
      poem.id === selectedPoemId 
        ? { 
            ...poem, 
            arazContent: finalArazContent,
            status: 'araz_done'
          }
        : poem
    ));
    
    setShowArazUploadModal(false);
    setArazContent('');
    setSelectedFile(null);
    setSelectedPoemId(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  return (
    <AppLayout title="Poem Checking & Araz Management">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Poem Checking & Araz Management</h2>
          <p className="text-secondary-600">
            Download original poems, upload araz versions, manage status, and print final versions.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-secondary-500" />
              <select
                className="form-input py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="araz_pending">Araz Pending</option>
                <option value="araz_done">Araz Done</option>
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
              </select>
            </div>
          </div>
        </div>
        
        {/* Results info */}
        <div className="mb-6">
          <p className="text-secondary-600">
            Showing {filteredPoems.length} approved {filteredPoems.length === 1 ? 'poem' : 'poems'}
            {statusFilter !== 'all' ? ` — ${statusFilter === 'araz_done' ? 'Araz Done' : 'Araz Pending'}` : ''}
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
                <div className="absolute -top-2 -right-2 z-10 flex flex-col space-y-1">
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoemId(poem.id);
                    }}
                    title="View Details"
                  >
                    <Eye size={16} className="text-primary-500 hover:text-primary-600" />
                  </button>
                  
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadPoem(poem);
                    }}
                    title="Download Original"
                  >
                    <Download size={16} className="text-blue-500 hover:text-blue-600" />
                  </button>
                  
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoemId(poem.id);
                      setArazContent(poem.arazContent || '');
                      setShowArazUploadModal(true);
                    }}
                    title="Upload Araz Version"
                  >
                    <Upload size={16} className="text-green-500 hover:text-green-600" />
                  </button>
                  
                  {poem.arazContent && (
                    <button
                      className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrintArazVersion(poem);
                      }}
                      title="Print Araz Version"
                    >
                      <Printer size={16} className="text-purple-500 hover:text-purple-600" />
                    </button>
                  )}
                  
                  <button
                    className="bg-white rounded-full p-1 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newStatus = poem.status === 'araz_done' ? 'araz_pending' : 'araz_done';
                      handleStatusUpdate(poem.id, newStatus);
                    }}
                    title={`Mark as ${poem.status === 'araz_done' ? 'Pending' : 'Done'}`}
                  >
                    {poem.status === 'araz_done' ? (
                      <Clock size={16} className="text-warning-500 hover:text-warning-600" />
                    ) : (
                      <CheckCircle size={16} className="text-success-500 hover:text-success-600" />
                    )}
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
            <h3 className="text-xl font-semibold mb-2">No approved poems available</h3>
            <p className="text-secondary-600">
              Approved poems will appear here for checking and araz management.
            </p>
          </div>
        )}
        
        {/* Poem details modal */}
        {selectedPoem && !showArazUploadModal && (
          <PoemDetails
            poem={selectedPoem}
            onClose={() => setSelectedPoemId(null)}
            isAdmin={true}
          />
        )}
        
        {/* Araz Upload Modal */}
        {showArazUploadModal && selectedPoem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-secondary-200">
                <h3 className="text-xl font-semibold">Upload Araz Version</h3>
                <p className="text-secondary-600 mt-1">
                  {selectedPoem.type === 'individual' ? 'Individual Abyat' : 'Full Nazam'} by {selectedPoem.author.name}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {/* Original Content */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Original Content:</h4>
                  <div className={`bg-secondary-50 p-4 rounded-lg poem-text ${
                    selectedPoem.language === 'Arabic' || selectedPoem.language === 'Urdu' ? 'rtl' : ''
                  }`}>
                    {selectedPoem.content}
                  </div>
                </div>
                
                {/* File Upload Option */}
                <div className="mb-6">
                  <label className="form-label">Upload Araz File (Optional)</label>
                  <div className="border-2 border-dashed border-secondary-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="araz-file"
                    />
                    <label htmlFor="araz-file" className="cursor-pointer">
                      <Upload size={24} className="mx-auto mb-2 text-secondary-400" />
                      <p className="text-secondary-600">
                        {selectedFile ? selectedFile.name : 'Click to upload araz file'}
                      </p>
                      <p className="text-sm text-secondary-500 mt-1">
                        Supported formats: TXT, DOC, DOCX, PDF
                      </p>
                    </label>
                  </div>
                </div>
                
                {/* Araz Content */}
                <div className="mb-6">
                  <label className="form-label">Araz Version Content</label>
                  <textarea
                    className={`form-input min-h-[300px] font-serif text-lg leading-relaxed ${
                      selectedPoem.language === 'Arabic' || selectedPoem.language === 'Urdu' ? 'text-right' : ''
                    }`}
                    value={arazContent}
                    onChange={(e) => setArazContent(e.target.value)}
                    dir={selectedPoem.language === 'Arabic' || selectedPoem.language === 'Urdu' ? 'rtl' : 'ltr'}
                    placeholder="Enter the checked araz version here..."
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-secondary-200 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowArazUploadModal(false);
                    setArazContent('');
                    setSelectedFile(null);
                    setSelectedPoemId(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleArazUpload}
                  className="btn btn-primary flex items-center"
                  disabled={!arazContent.trim() && !selectedFile}
                >
                  <Save size={18} className="mr-2" />
                  Save Araz Version
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminPoemCheckingPage;