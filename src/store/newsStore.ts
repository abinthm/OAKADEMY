import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import type { Database } from '../lib/database.types';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  link: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface NewsState {
  newsItems: NewsItem[];
  isLoading: boolean;
  error: string | null;
  fetchNewsItems: () => Promise<void>;
  createNewsItem: (newsItem: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => Promise<NewsItem>;
  deleteNewsItem: (id: string) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  newsItems: [],
  isLoading: false,
  error: null,

  fetchNewsItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      set({ newsItems: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching news items:', error);
      set({ 
        error: (error as Error).message, 
        isLoading: false 
      });
    }
  },

  createNewsItem: async (newsItem) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('news_items')
        .insert([{
          ...newsItem,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from news item creation');
      }

      set((state) => ({
        newsItems: [data, ...state.newsItems],
        isLoading: false,
      }));

      return data;
    } catch (error) {
      console.error('Error creating news item:', error);
      set({ 
        error: (error as Error).message, 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteNewsItem: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('news_items')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      set((state) => ({
        newsItems: state.newsItems.filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting news item:', error);
      set({ 
        error: (error as Error).message, 
        isLoading: false 
      });
      throw error;
    }
  },
}));

