import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../store/authStore';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          await loginWithGoogle();
          navigate('/voice-of-oak');
        } else {
          navigate('/voice-of-oak/login');
        }
      } catch (error) {
        console.error('Error handling auth callback:', error);
        navigate('/voice-of-oak/login');
      }
    };

    handleCallback();
  }, [navigate, loginWithGoogle]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback; 