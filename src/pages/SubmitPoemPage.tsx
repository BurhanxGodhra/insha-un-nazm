import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, Info, Upload, PenTool, BookOpen } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { mockOpeningVerses } from '../data/mockData';

const SubmitPoemPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState<'English' | 'Arabic' | 'Urdu'>('English');
  const [inspiredByVerse, setInspiredByVerse] = useState('');
  const [currentVerses, setCurrentVerses] = useState(mockOpeningVerses);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionType, setSubmissionType] = useState<'upload' | 'manual' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    content?: string;
    file?: string;
  }>({});

  // Set writing direction based on language
  const textDirection = language === 'Arabic' || language === 'Urdu' ? 'rtl' : 'ltr';
  
  // Filter opening verses by selected language
  useEffect(() => {
    setCurrentVerses(mockOpeningVerses.filter(verse => verse.language === language));
  }, [language]);
  
  const validateForm = () => {
    const newErrors: {
      content?: string;
      file?: string;
    } = {};
    
    if (submissionType === 'manual' && !content.trim()) {
      newErrors.content = 'Poem content is required';
    } else if (submissionType === 'manual' && content.trim().length < 20) {
      newErrors.content = 'Poem is too short (minimum 20 characters)';
    }
    
    if (submissionType === 'upload' && !selectedFile) {
      newErrors.file = 'Please select a file to upload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would send data to the server
    console.log({
      content: submissionType === 'manual' ? content : selectedFile,
      language,
      inspiredByVerse,
      author: user?.id,
    });
    
    // Show success message
    setSubmitSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setContent('');
      setLanguage('English');
      setInspiredByVerse('');
      setSubmissionType(null);
      setSelectedFile(null);
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  return (
    <AppLayout title="Submit a Poem">
      <div className="max-w-4xl mx-auto">
        {submitSuccess ? (
          <div className="bg-success-500 text-white p-6 rounded-lg mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">Thank you for your submission!</h3>
            <p>Your poem has been sent for review. Our poetry experts will evaluate it soon.</p>
            <div className="mt-4 flex space-x-4">
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="btn bg-white text-success-700 hover:bg-success-50"
              >
                Submit Another Poem
              </button>
              <button 
                onClick={() => navigate('/view-poems')}
                className="btn bg-success-600 text-white hover:bg-success-700"
              >
                View Submitted Poems
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Submission Type Selection */}
            {!submissionType && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                  className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary-500"
                  onClick={() => setSubmissionType('upload')}
                >
                  <div className="flex items-center justify-center mb-4">
                    <Upload size={48} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Upload File</h3>
                  <p className="text-center text-secondary-600">
                    Upload your poem from a text file
                  </p>
                </div>
                
                <div
                  className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary-500"
                  onClick={() => setSubmissionType('manual')}
                >
                  <div className="flex items-center justify-center mb-4">
                    <PenTool size={48} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Type Manually</h3>
                  <p className="text-center text-secondary-600">
                    Write your poem directly in the editor
                  </p>
                </div>
              </div>
            )}

            {submissionType && (
              <>
                {/* Inspiration panel */}
                <div className="bg-primary-50 p-6 rounded-lg mb-6">
                  <div className="flex items-start mb-4">
                    <Info size={20} className="text-primary-600 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-primary-800">Daily Inspiration</h3>
                      <p className="text-primary-700 text-sm">
                        Draw inspiration from today's opening verses in your chosen language.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {currentVerses.map((verse) => (
                      <div 
                        key={verse.id}
                        className={`p-4 bg-white rounded-md cursor-pointer hover:shadow-md transition-shadow border-l-4 border-primary-400 ${
                          inspiredByVerse === verse.id ? 'ring-2 ring-primary-500' : ''
                        }`}
                        onClick={() => setInspiredByVerse(verse.id)}
                      >
                        <div className={`font-serif italic text-lg ${textDirection === 'rtl' ? 'text-right' : ''}`} dir={textDirection}>
                          "{verse.text}"
                        </div>
                        <div className="mt-2 text-sm text-secondary-600 flex justify-between">
                          <span>— {verse.author}</span>
                          <span>Day {verse.day}</span>
                        </div>
                      </div>
                    ))}
                    
                    {currentVerses.length === 0 && (
                      <p className="text-center text-secondary-500 py-4">
                        No opening verses available for the selected language.
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Poem form */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="language" className="form-label">Language</label>
                    <select
                      id="language"
                      className="form-input"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'English' | 'Arabic' | 'Urdu')}
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </div>
                  
                  {submissionType === 'manual' && (
                    <div>
                      <label htmlFor="content" className="form-label">Poem Content</label>
                      <textarea
                        id="content"
                        className={`form-input min-h-[300px] font-serif text-lg leading-relaxed ${
                          errors.content ? 'border-error-500 ring-1 ring-error-500' : ''
                        }`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        dir={textDirection}
                      ></textarea>
                      {errors.content && (
                        <p className="mt-1 text-sm text-error-600">{errors.content}</p>
                      )}
                    </div>
                  )}
                  
                  {submissionType === 'upload' && (
                    <div>
                      <label htmlFor="file" className="form-label">Upload Poem</label>
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        errors.file ? 'border-error-500' : 'border-secondary-300'
                      }`}>
                        <input
                          type="file"
                          id="file"
                          accept=".txt,.doc,.docx,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="file" className="cursor-pointer">
                          <Upload size={32} className="mx-auto mb-2 text-secondary-400" />
                          <p className="text-secondary-600">
                            {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-sm text-secondary-500 mt-1">
                            Supported formats: TXT, DOC, DOCX, PDF
                          </p>
                        </label>
                        {errors.file && (
                          <p className="mt-2 text-sm text-error-600">{errors.file}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setContent('');
                        setLanguage('English');
                        setInspiredByVerse('');
                        setSubmissionType(null);
                        setSelectedFile(null);
                        setErrors({});
                      }}
                      className="btn btn-secondary flex items-center"
                    >
                      <X size={18} className="mr-2" />
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                    >
                      <Send size={18} className="mr-2" />
                      Submit Poem
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </AppLayout>
  );
};

export default SubmitPoemPage;