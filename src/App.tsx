import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
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
import ComingSoon from './pages/ComingSoon';
import VoiceOfOakLayout from './components/layout/VoiceOfOakLayout';

const NotFound = () => (
  <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <Link
      to="/"
      className="px-4 py-2 bg-[#3B3D87] text-white rounded-md hover:bg-[#2d2f66] transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

// Create a wrapper component for the routes
const AppRoutes = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate()

  // Uncomment to show coming soon page
  // useEffect(() => {
  //   navigate(`/coming-soon`);
  // }, []);

  return (
      <div className="min-h-screen">
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
        <Route path="/voice-of-oak" element={<VoiceOfOakLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={
            user ? <Navigate to="/voice-of-oak" replace /> : <LoginPage />
            } />
          <Route path="register" element={
            user ? <Navigate to="/voice-of-oak" replace /> : <RegisterPage />
            } />
          <Route path="post/:id" element={<ViewBlogPage />} />
            
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
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;