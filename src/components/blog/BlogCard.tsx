import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Edit, Trash2, Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { useBlogStore } from '../../store/blogStore';
import { supabase } from '../../lib/supabaseClient';

interface BlogCardProps {
  post: BlogPost;
  featuredPostId?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featuredPostId }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deletePost } = useBlogStore();
  const [authorAvatar, setAuthorAvatar] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  const formattedDate = post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Date not available';

  const isAuthor = user?.id === post.author_id;
  const isAdmin = user?.isAdmin;
  const canEdit = isAuthor || isAdmin;
  const canDelete = isAuthor || isAdmin;

  useEffect(() => {
    const fetchAuthorAvatar = async () => {
      try {
        const { data: authorData, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', post.author_id)
          .single();

        if (error) {
          console.error('Error fetching author avatar:', error);
          return;
        }

        if (authorData) {
          setAuthorAvatar(authorData.avatar_url);
        }
      } catch (error) {
        console.error('Error in fetchAuthorAvatar:', error);
      }
    };

    fetchAuthorAvatar();
  }, [post.author_id]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        // Optionally refresh the page or update the UI
        // window.location.reload(); // Removed as store update handles refresh
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    navigate(`/edit/${post.id}`);
  };

  const isFeatured = String(post.id) === String(featuredPostId);

  return (
    <article 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`} 
      style={{ backgroundColor: isFeatured ? '#F5F5FA' : '' }}
    >
      {post.cover_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.cover_image || ''}
            alt={post.title}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105 relative z-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.error('Error loading image:', target.src);
              // Remove any query parameters or optimized paths
              const baseUrl = target.src.split('?')[0].replace('/optimized/', '/');
              target.src = baseUrl;
            }}
          />
          <div className="absolute top-0 left-0 px-3 py-1 m-2 bg-[#3B3D87] text-white text-xs font-semibold rounded">
            {post.category}
          </div>
          {canEdit && (
            <div className="absolute top-0 right-0 m-2 flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1.5 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
              >
                <Edit size={14} />
              </button>
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h2 
          className="font-serif text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-[#3B3D87] transition-colors"
          onClick={() => navigate(`/voice-of-oak/post/${post.id}`)}
        >
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Link to={`/profile/${post.author_id}`} className="flex items-center">
              {authorAvatar && !avatarError ? (
                <img
                  src={authorAvatar}
                  alt={post.authorName || ''}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-[#3B3D87] bg-opacity-20 flex items-center justify-center">
                  <span className="text-[#3B3D87] font-medium">
                    {(post.authorName || '').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{post.authorName}</p>
                <p className="text-sm text-[#3B3D87]">{post.authorRole || 'Community Contributor'}</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        {post.hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {!featuredPostId && (
          <button 
            onClick={() => navigate(`/voice-of-oak/post/${post.id}`)}
            className="mt-auto px-6 py-3 bg-[#3B3D87] text-white rounded-lg hover:bg-[#2d2f66] transition-colors self-start"
          >
            Read More
          </button>
        )}
      </div>
    </article>
  );
};

export default BlogCard;