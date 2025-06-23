import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './components/ContactUs';
import { useAuthStore } from './store/authStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WriteBlogPage from './pages/WriteBlogPage';
import ViewBlogPage from './pages/ViewBlogPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import PendingPostsPage from './pages/PendingPostsPage';
import AchievementsPage from './pages/AchievementsPage';
import TestimonialsPage from './pages/TestimonialsPage';

// Route protection
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Footer from './components/Footer';
import NavbarTwo from './components/layout/NavbarTwo';
import ContactPage from './pages/ContactPage';
import AuthCallback from './pages/AuthCallback';
import VoiceOfOakLayout from './components/layout/VoiceOfOakLayout';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
      <div className="min-h-screen">
        <Helmet>
          <title>Oakademy - Online Learning Platform</title>
          <meta name="description" content="Oakademy is an online learning platform offering a variety of courses and blog content to empower learners and enhance skills." />
        </Helmet>
      <Routes>
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/" element={
          <>
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
              <Home />
        </main>
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
              <About />
            </main>
          </>
        } />
        <Route path="/voice-of-oak" element={<VoiceOfOakLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={
            user ? <Navigate to="/voice-of-oak" replace /> : <LoginPage />
            } />
          <Route path="register" element={
            user ? <Navigate to="/voice-of-oak" replace /> : <RegisterPage />
            } />
          <Route path="post/:id" element={<ViewBlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="auth/callback" element={<AuthCallback />} />
            
            {/* Protected Routes */}
          <Route path="write" element={<ProtectedRoute><WriteBlogPage /></ProtectedRoute>} />
          <Route path="edit/:id" element={<ProtectedRoute><WriteBlogPage /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="pending-posts" element={<ProtectedRoute><PendingPostsPage /></ProtectedRoute>} />
            
            {/* Admin Routes */}
          <Route path="admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Route>
        <Route path="/achievements" element={
          <>
            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
              <AchievementsPage />
            </main>
          </>
        } />
        <Route path="/testimonials" element={
          <>
            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
              <TestimonialsPage />
            </main>
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;