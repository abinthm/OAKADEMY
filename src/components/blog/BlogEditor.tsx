import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types';
import { useBlogStore } from '../../store/blogStore';
import { useAuthStore } from '../../store/authStore';
import { uploadImage } from '../../lib/uploadImage';
import { Image } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import Notification from '../common/Notification';

interface BlogEditorProps {
  postId?: string;
  isDraft?: boolean;
}

const categories: Category[] = [
  'Latest Roots',
  'Culture & Identity',
  'Education & Opportunity',
  'Gender & Expression',
  'Climate & Planet',
  'Health & Hope',
  'Governance & Voice',
  'Justice & Rights',
  'Civic Spark'
];

const BlogEditor: React.FC<BlogEditorProps> = ({ postId, isDraft = false }) => {
  const navigate = useNavigate();
  const { addPost, updatePost, getPostById, saveDraft, publishDraft, fetchPosts } = useBlogStore();
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [cover_image, setCoverImage] = useState('');
  const [category, setCategory] = useState<Category>('Latest Roots');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  
  useEffect(() => {
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.cover_image || '');
        setCategory(post.category as Category);
        setHashtags(post.hashtags);
      }
    }
  }, [postId, getPostById]);
  
  const handleAddHashtag = () => {
    if (hashtagInput.trim() !== '' && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };
  
  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };
  
  const handleHashtagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      
      // Ensure the URL is absolute
      const absoluteUrl = imageUrl.startsWith('http') ? imageUrl : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/blog-images/${imageUrl.split('/').pop()}`;
      
      setCoverImage(absoluteUrl);
    } catch (error) {
      setError((error as Error).message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSave = async (publish: boolean = false) => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    if (!excerpt.trim()) {
      setError('Excerpt is required');
      return;
    }
    
    if (!user) {
      setError('You must be logged in to save a post');
      return;
    }
    
    setError(null);
    
    if (publish) {
      setIsPublishing(true);
    } else {
      setIsSaving(true);
    }
    
    try {
      const postData = {
        title,
        content,
        excerpt,
        cover_image,
        category,
        hashtags,
        published: publish,
        status: publish ? 'pending' as const : 'draft' as const
      };
      
      if (postId) {
        if (isDraft && publish) {
          await publishDraft(postId);
          setNotification({
            type: 'success',
            message: 'Your post has been submitted for approval. You can view its status in your pending posts.'
          });
          setTimeout(() => {
            navigate('/voice-of-oak/pending-posts');
          }, 2000);
        } else {
          await updatePost(postId, postData);
          setNotification({
            type: 'success',
            message: 'Post updated successfully'
          });
        }
      } else {
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .insert({
            title,
            content,
            excerpt,
            cover_image,
            category,
            published: false,
            status: publish ? 'pending' : 'draft',
            author_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select(`
            *,
            author:profiles!posts_author_id_fkey (
              id,
              name,
              avatar_url,
              role
            ),
            reviewer:profiles!posts_reviewed_by_fkey (
              id,
              name,
              role
            )
          `)
          .single();

        if (postError) throw postError;

        // Save hashtags
        if (hashtags.length > 0) {
          const hashtagData = hashtags.map(hashtag => ({
            post_id: postData.id,
            hashtag
          }));

          const { error: hashtagError } = await supabase
            .from('post_hashtags')
            .insert(hashtagData);

          if (hashtagError) {
            console.error('Error saving hashtags:', hashtagError);
          }
        }

        // Add the post to the store
        addPost({
          ...postData,
          hashtags,
          authorName: user.name
        });

        // Refresh posts in the store
        await fetchPosts();

        if (publish) {
          setNotification({
            type: 'success',
            message: 'Your post has been submitted for approval. You can view its status in your pending posts.'
          });
          setTimeout(() => {
            navigate('/voice-of-oak/pending-posts');
          }, 2000);
        } else {
          setNotification({
            type: 'success',
            message: 'Draft saved successfully'
          });
          setTimeout(() => {
            navigate(`/post/${postData.id}`);
          }, 2000);
        }
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      if (publish) {
        // Refresh posts and navigate to admin dashboard
        await fetchPosts();
        navigate('/voice-of-oak/admin');
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to save post. Please try again.');
      setNotification({
        type: 'error',
        message: (err as Error).message || 'Failed to save post. Please try again.'
      });
    } finally {
      setIsPublishing(false);
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {saved && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md text-sm animate-pulse">
          Your changes have been saved.
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Write a short description for your blog post"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                handleImageUpload(e.target.files[0]);
              }
            }}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isUploading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Image className="w-5 h-5 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
        {cover_image && (
          <div className="mt-2">
            <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={cover_image}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Error loading image:', target.src);
                  // Remove any query parameters or optimized paths
                  const baseUrl = target.src.split('?')[0].replace('/optimized/', '/');
                  target.src = baseUrl;
                }}
                loading="eager"
              />
              <button
                type="button"
                onClick={() => setCoverImage('')}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                ×
              </button>
            </div>
            <div className="mt-1 text-xs text-gray-500 break-all">
              {cover_image}
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          rows={15}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-1">
            Hashtags
          </label>
          <div className="flex">
            <input
              type="text"
              id="hashtags"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              placeholder="Add hashtags"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddHashtag}
              className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          
          {hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveHashtag(tag)}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaving ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={isPublishing}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isPublishing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;