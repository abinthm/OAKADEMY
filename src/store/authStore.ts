import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
}

// Helper function to fetch or create user profile
const fetchOrCreateProfile = async (sessionUser: any): Promise<User> => {
  console.log('AuthStore Helper: Fetching/creating profile for user:', sessionUser.id);
  let userProfile;
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single();

    if (profileError && profileError.code === 'PGRST116') { // No rows found
      console.log('AuthStore Helper: Profile not found, creating for user:', sessionUser.id);
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: sessionUser.id,
            name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0],
            avatar_url: sessionUser.user_metadata?.avatar_url,
            role: 'Community Contributor', // Default role for new users
            is_admin: false,
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('AuthStore Helper: Profile creation error:', insertError);
        throw insertError;
      }
      if (!insertData) {
        throw new Error('AuthStore Helper: No profile data returned after creation');
      }
      userProfile = insertData;
      console.log('AuthStore Helper: Profile created successfully:', userProfile);
    } else if (profileError) {
      console.error('AuthStore Helper: Error fetching profile:', profileError);
      throw profileError;
    } else {
      userProfile = profile;
      console.log('AuthStore Helper: Existing profile found:', userProfile);
    }

    return {
      id: sessionUser.id,
      email: sessionUser.email!,
      name: userProfile.name,
      bio: userProfile.bio || undefined,
      avatar: userProfile.avatar_url || undefined,
      role: userProfile.role || 'Community Contributor',
      createdAt: new Date(userProfile.created_at),
      isAdmin: userProfile.is_admin || false,
    };
  } catch (error) {
    console.error('AuthStore Helper: Error in fetchOrCreateProfile:', error);
    throw error;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      initializeAuth: () => {
        console.log('AuthStore: Initializing auth listener.');
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('AuthStore Listener: Auth state changed:', event, session);
          if (session) {
            try {
              const user = await fetchOrCreateProfile(session.user);
              set({ user, isAuthenticated: true });
              console.log('AuthStore Listener: User state set based on session.', user);
            } catch (error) {
              console.error('AuthStore Listener: Error processing session user:', error);
              set({ user: null, isAuthenticated: false });
            }
          } else {
            set({ user: null, isAuthenticated: false });
            console.log('AuthStore Listener: User state cleared.');
          }
        });

        // Cleanup function for the listener (will be called when store is destroyed)
        // This might be tricky with persist, but the idea is to prevent multiple listeners
        // if the store somehow re-initializes without being destroyed.
        // For most React apps, this listener should be set up once and persist.
        (get() as any)._authSubscription = subscription; // Store subscription to unsubscribe later if needed
      },
      
      login: async (email: string, password: string) => {
        console.log('AuthStore: Starting email/password login for:', email);
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          console.error('AuthStore: Email/password login error:', authError);
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error('AuthStore: No user data returned after email/password login');
        }
        
        console.log('AuthStore: Email/password login successful, session will be handled by listener.');
        // No explicit set here, as the onAuthStateChange listener will handle fetching/creating the profile and setting state.
        // We return a dummy user as the actual user will be set asynchronously.
        return {} as User;
      },
      
      register: async (name: string, email: string, password: string) => {
        console.log('AuthStore: Starting registration for:', email);
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) {
          console.error('AuthStore: Registration auth error:', authError);
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error('AuthStore: No user data returned after registration');
        }

        console.log('AuthStore: Registration successful, session will be handled by listener.');
        // No explicit set here, as the onAuthStateChange listener will handle fetching/creating the profile and setting state.
        // We return a dummy user as the actual user will be set asynchronously.
        return {} as User;
      },

      loginWithGoogle: async () => {
        console.log('AuthStore: Initiating Google login...');
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/voice-of-oak/auth/callback`
          }
        });

        if (error) {
          console.error('AuthStore: Google auth initiation error:', error);
          throw new Error(error.message);
        }
        console.log('AuthStore: Redirecting to Google for OAuth...');
        // No direct return here as it's a redirect flow. State will be updated by listener.
      },
      
      logout: async () => {
        console.log('AuthStore: Logging out...');
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('AuthStore: Logout error:', error);
          throw new Error('Failed to log out');
        }
        set({ user: null, isAuthenticated: false });
        console.log('AuthStore: User logged out.');
      },
      
      updateProfile: async (userData: Partial<User>): Promise<User> => {
        const { user: currentUser } = get();
        
        if (!currentUser) {
          throw new Error('AuthStore: No user logged in for profile update');
        }

        console.log('AuthStore: Starting profile update with:', userData);

        try {
          const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (fetchError) {
            console.error('AuthStore: Error fetching current profile:', fetchError);
            throw new Error('Failed to fetch current profile');
          }

          console.log('AuthStore: Current profile in DB:', currentProfile);

          const updateData = {
            name: userData.name ?? currentProfile.name,
            bio: userData.bio ?? currentProfile.bio,
            avatar_url: userData.avatar ?? currentProfile.avatar_url,
            role: userData.role ?? currentProfile.role,
            updated_at: new Date().toISOString()
          };

          console.log('AuthStore: Updating profile with:', updateData);

          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', currentUser.id)
            .select()
            .single();

          if (updateError) {
            console.error('AuthStore: Error updating profile:', updateError);
            throw new Error('Failed to update profile: ' + updateError.message);
          }

          if (!updatedProfile) {
            throw new Error('AuthStore: No profile data returned after update');
          }

          console.log('AuthStore: Profile updated in DB:', updatedProfile);

          const newUserState: User = {
            id: currentUser.id,
            email: currentUser.email,
            name: updatedProfile.name,
            bio: updatedProfile.bio || undefined,
            avatar: updatedProfile.avatar_url || undefined,
            role: updatedProfile.role,
            isAdmin: updatedProfile.is_admin || false,
            createdAt: new Date(updatedProfile.created_at)
          };

          console.log('AuthStore: Setting new user state:', newUserState);
          set({ user: newUserState });

          return newUserState;
        } catch (error) {
          console.error('AuthStore: Profile update failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user ? {
          ...state.user,
          isAdmin: state.user.isAdmin // Ensure admin status is persisted
        } : null
      }),
      // Removed onRehydrateStorage logic for listener setup.
    }
  )
);