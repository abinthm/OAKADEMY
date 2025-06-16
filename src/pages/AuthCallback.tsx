import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthCallback: Error getting session:', error);
          navigate('/voice-of-oak/login', { replace: true });
          return;
        }

        if (session) {
          console.log('AuthCallback: Session found after redirect, navigating to /voice-of-oak');
          // The useAuthStore listener will pick up this session and update global state.
          navigate('/voice-of-oak', { replace: true });
        } else {
          console.log('AuthCallback: No session found, navigating to login.');
          navigate('/voice-of-oak/login', { replace: true });
        }
      } catch (err) {
        console.error('AuthCallback: Unexpected error during session handling:', err);
        navigate('/voice-of-oak/login', { replace: true });
      }
    };

    handleSession();

  }, [navigate]);

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