import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../store/authStore';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const authSubscription = useRef<any>(null);

  useEffect(() => {
    // Listener for auth state changes
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change detected:', event, session);
      if (session) {
        // Session exists, user is authenticated via Supabase
        // The profile creation/fetching logic should already be handled by the useAuthStore's login/register flow
        // if this is a first-time Google sign-in.
        console.log('Session found in AuthCallback, navigating to /voice-of-oak');
        navigate('/voice-of-oak', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        // User signed out or session expired
        console.log('No session found or signed out, navigating to login');
        navigate('/voice-of-oak/login', { replace: true });
      } else if (event === 'INITIAL_SESSION' && !session) {
        // No initial session, likely not logged in
        console.log('No initial session, navigating to login');
        navigate('/voice-of-oak/login', { replace: true });
      }
    });

    authSubscription.current = data?.subscription;

    // Initial check (in case onAuthStateChange doesn't fire immediately on first load)
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('Initial session found via getSession, navigating to /voice-of-oak');
        navigate('/voice-of-oak', { replace: true });
      }
    };

    checkInitialSession();

    return () => {
      if (authSubscription.current) {
        authSubscription.current.unsubscribe();
      }
    };
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