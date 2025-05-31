import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  // Demo login helper function
  const handleDemoLogin = async (userType: 'admin' | 'user') => {
    try {
      setLoading(true);
      const demoEmail = userType === 'admin' ? 'admin@poetry.com' : 'user@poetry.com';
      await login(demoEmail, 'password123');
      navigate('/dashboard');
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
              <PenTool className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-white font-serif">INSHA UN NAZM</h1>
            <p className="text-primary-100 mt-1">1447</p>
          </div>
          
          {/* Form */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-6">Sign in to your account</h2>
            
            {error && (
              <div className="bg-error-100 text-error-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="form-input pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-input pl-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="text-center text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-800 font-medium">
                  Sign up
                </Link>
              </div>
            </form>
            
            {/* Demo account section */}
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <h3 className="text-sm font-medium text-secondary-700 mb-4 text-center">Demo Accounts</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDemoLogin('user')}
                  className="btn btn-secondary text-sm"
                  disabled={loading}
                >
                  Login as Poet
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="btn btn-accent text-sm text-white"
                  disabled={loading}
                >
                  Login as Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;