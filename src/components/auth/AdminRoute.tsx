import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabaseClient';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log('AdminRoute rendered - Initial state:', { user, isLoading, isAdmin });

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('checkAdminStatus called - User state:', user);

      if (!user) {
        console.log('No user found, setting isLoading to false');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching admin status for user:', user.id);
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsLoading(false);
          return;
        }

        console.log('Profile data received:', profileData);
        setIsAdmin(profileData.is_admin || false);
      } catch (error) {
        console.error('Error in checkAdminStatus:', error);
      } finally {
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (isLoading) {
    console.log('Rendering loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/voice-of-oak/login" replace />;
  }

  if (!isAdmin) {
    console.log('User is not admin, redirecting to home');
    return <Navigate to="/voice-of-oak" replace />;
  }

  console.log('User is admin, rendering protected content');
  return <>{children}</>;
};

export default AdminRoute; 