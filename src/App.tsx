import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SubmitPoemPage from './pages/SubmitPoemPage';
import ViewPoemsPage from './pages/ViewPoemsPage';
import OpeningVersesPage from './pages/OpeningVersesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import BestPoemPage from './pages/BestPoemPage';
import ShowcasePage from './pages/ShowcasePage';
import AdminReviewPage from './pages/AdminReviewPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/submit-poem" element={<SubmitPoemPage />} />
            <Route path="/view-poems" element={<ViewPoemsPage />} />
            <Route path="/opening-verses" element={<OpeningVersesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/best-poem" element={<BestPoemPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/admin/review" element={<AdminReviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;