import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, Info, Upload, PenTool, BookOpen, Mic, FileText, Volume2 } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { mockOpeningVerses } from '../data/mockData';

type PoemType = 'individual' | 'full' | null;
type SubmissionMethod = 'upload' | 'recording' | 'manual' | null;

const SubmitPoemPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [poemType, setPoemType] = useState<PoemType>(null);
  const [language, setLanguage] = useState<'English' | 'French' | 'Arabic' | 'Lisan al-Dawah' | 'Urdu'>('English');
  const [inspiredByVerse, setInspiredByVerse] = useState('');
  const [submissionMethod, setSubmissionMethod] = useState<SubmissionMethod>(null);
  const [content, setContent] = useState('');
  const [currentVerses, setCurrentVerses] = useState(mockOpeningVerses);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    content?: string;
    file?: string;
    audio?: string;
    verse?: string;
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
      audio?: string;
      verse?: string;
    } = {};
    
    if (!inspiredByVerse) {
      newErrors.verse = 'Please select an opening verse for inspiration';
    }
    
    if (submissionMethod === 'manual' && !content.trim()) {
      newErrors.content = 'Poem content is required';
    } else if (submissionMethod === 'manual' && content.trim().length < 20) {
      newErrors.content = 'Poem is too short (minimum 20 characters)';
    }
    
    if (submissionMethod === 'upload' && !selectedFile) {
      newErrors.file = 'Please select a file to upload';
    }
    
    if (submissionMethod === 'recording' && !audioFile) {
      newErrors.audio = 'Please select an audio file to upload';
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
      poemType,
      content: submissionMethod === 'manual' ? content : submissionMethod === 'upload' ? selectedFile : audioFile,
      language,
      inspiredByVerse,
      submissionMethod,
      author: user?.id,
    });
    
    // Show success message
    setSubmitSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setPoemType(null);
      setLanguage('English');
      setInspiredByVerse('');
      setSubmissionMethod(null);
      setContent('');
      setSelectedFile(null);
      setAudioFile(null);
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setPoemType(null);
    setLanguage('English');
    setInspiredByVerse('');
    setSubmissionMethod(null);
    setContent('');
    setSelectedFile(null);
    setAudioFile(null);
    setErrors({});
  };
  
  return (
    <AppLayout title="Submit a Poem">
      <div className="max-w-4xl mx-auto">
        {submitSuccess ? (
          <div className="bg-success-500 text-white p-6 rounded-lg mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">Thank you for your submission!</h3>
            <p>Your {poemType === 'individual' ? 'Individual Abyat' : 'Full Nazam'} has been sent for review. Our poetry experts will evaluate it soon.</p>
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
            {/* Step 1: Poem Type Selection */}
            {!poemType && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Submission Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className="bg-white p-8 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary-500 group"
                    onClick={() => setPoemType('individual')}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <BookOpen size={48} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">Individual Abyat</h3>
                    <p className="text-center text-secondary-600">
                      Submit individual verses or couplets with multiple submission options
                    </p>
                  </div>
                  
                  <div
                    className="bg-white p-8 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary-500 group"
                    onClick={() => setPoemType('full')}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <FileText size={48} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">Full Nazam</h3>
                    <p className="text-center text-secondary-600">
                      Submit a complete poem or nazam
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Language and Opening Verse Selection */}
            {poemType && !submissionMethod && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {poemType === 'individual' ? 'Individual Abyat' : 'Full Nazam'} - Language & Inspiration
                  </h3>
                  
                  <div className="mb-6">
                    <label htmlFor="language" className="form-label">Select Language</label>
                    <select
                      id="language"
                      className="form-input"
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value as 'English' | 'Arabic' | 'Urdu');
                        setInspiredByVerse(''); // Reset verse selection when language changes
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </div>
                </div>

                {/* Opening Verses Selection */}
                <div className="bg-primary-50 p-6 rounded-lg mb-6">
                  <div className="flex items-start mb-4">
                    <Info size={20} className="text-primary-600 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-primary-800">Select Opening Verse for Inspiration</h3>
                      <p className="text-primary-700 text-sm">
                        Choose one of the opening verses in {language} to inspire your {poemType === 'individual' ? 'abyat' : 'nazam'}.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {currentVerses.map((verse) => (
                      <div 
                        key={verse.id}
                        className={`p-4 bg-white rounded-md cursor-pointer hover:shadow-md transition-all border-2 ${
                          inspiredByVerse === verse.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent hover:border-primary-300'
                        }`}
                        onClick={() => setInspiredByVerse(verse.id)}
                      >
                        <div className={`font-serif italic text-lg mb-2 ${textDirection === 'rtl' ? 'text-right' : ''}`} dir={textDirection}>
                          "{verse.text}"
                        </div>
                        <div className="flex justify-between items-center text-sm text-secondary-600">
                          <span>— {verse.author}</span>
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full">Day {verse.day}</span>
                        </div>
                      </div>
                    ))}
                    
                    {currentVerses.length === 0 && (
                      <p className="text-center text-secondary-500 py-4">
                        No opening verses available for the selected language.
                      </p>
                    )}
                  </div>
                  
                  {errors.verse && (
                    <p className="mt-2 text-sm text-error-600">{errors.verse}</p>
                  )}
                </div>

                {/* Submission Method Selection */}
                {inspiredByVerse && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Choose Submission Method</h3>
                    <div className={`grid gap-6 ${poemType === 'individual' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                      <div
                        className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary-500 group"
                        onClick={() => setSubmissionMethod('upload')}
                      >
                        <div className="flex items-center justify-center mb-4">
                          <Upload size={40} className="text-primary-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="text-lg font-semibold text-center mb-2">Upload File</h4>
                        <p className="text-center text-secondary-600 text-sm">
                          Upload your {poemType === 'individual' ? 'abyat' : 'nazam'} from a text file
                        </p>
                      </div>
                      
                      {poemType === 'individual' && (
                        <div
                          className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary-500 group"
                          onClick={() => setSubmissionMethod('recording')}
                        >
                          <div className="flex items-center justify-center mb-4">
                            <Mic size={40} className="text-accent-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <h4 className="text-lg font-semibold text-center mb-2">Upload Recording</h4>
                          <p className="text-center text-secondary-600 text-sm">
                            Upload an audio recording of your abyat
                          </p>
                        </div>
                      )}
                      
                      <div
                        className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary-500 group"
                        onClick={() => setSubmissionMethod('manual')}
                      >
                        <div className="flex items-center justify-center mb-4">
                          <PenTool size={40} className="text-secondary-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="text-lg font-semibold text-center mb-2">Type Manually</h4>
                        <p className="text-center text-secondary-600 text-sm">
                          Write your {poemType === 'individual' ? 'abyat' : 'nazam'} directly in the editor
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 3: Content Submission */}
            {submissionMethod && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">
                    {poemType === 'individual' ? 'Individual Abyat' : 'Full Nazam'} - 
                    {submissionMethod === 'upload' ? ' File Upload' : 
                     submissionMethod === 'recording' ? ' Audio Recording' : ' Manual Entry'}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4">
                    Language: {language} | Inspired by: {currentVerses.find(v => v.id === inspiredByVerse)?.author}
                  </p>
                </div>

                {submissionMethod === 'manual' && (
                  <div>
                    <label htmlFor="content" className="form-label">
                      {poemType === 'individual' ? 'Abyat' : 'Nazam'} Content
                    </label>
                    <textarea
                      id="content"
                      className={`form-input min-h-[300px] font-serif text-lg leading-relaxed ${
                        errors.content ? 'border-error-500 ring-1 ring-error-500' : ''
                      }`}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      dir={textDirection}
                      placeholder={`Write your ${poemType === 'individual' ? 'abyat' : 'nazam'} here...`}
                    ></textarea>
                    {errors.content && (
                      <p className="mt-1 text-sm text-error-600">{errors.content}</p>
                    )}
                  </div>
                )}
                
                {submissionMethod === 'upload' && (
                  <div>
                    <label htmlFor="file" className="form-label">Upload {poemType === 'individual' ? 'Abyat' : 'Nazam'} File</label>
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

                {submissionMethod === 'recording' && (
                  <div>
                    <label htmlFor="audio" className="form-label">Upload Audio Recording</label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.audio ? 'border-error-500' : 'border-accent-300'
                    }`}>
                      <input
                        type="file"
                        id="audio"
                        accept=".mp3,.wav,.m4a,.ogg"
                        onChange={handleAudioChange}
                        className="hidden"
                      />
                      <label htmlFor="audio" className="cursor-pointer">
                        <Volume2 size={32} className="mx-auto mb-2 text-accent-500" />
                        <p className="text-secondary-600">
                          {audioFile ? audioFile.name : 'Click to upload your audio recording'}
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          Supported formats: MP3, WAV, M4A, OGG
                        </p>
                      </label>
                      {errors.audio && (
                        <p className="mt-2 text-sm text-error-600">{errors.audio}</p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary flex items-center"
                  >
                    <X size={18} className="mr-2" />
                    Start Over
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center"
                  >
                    <Send size={18} className="mr-2" />
                    Submit {poemType === 'individual' ? 'Abyat' : 'Nazam'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </AppLayout>
  );
};

export default SubmitPoemPage;