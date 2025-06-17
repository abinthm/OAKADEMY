import React, { useEffect } from 'react';
import { useBlogStore } from '../../store/blogStore';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const LatestPostsSection: React.FC = () => {
  const { posts, fetchPosts } = useBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts, fetchPosts]);

  // Filter for approved and published posts only
  const approvedAndPublishedPosts = posts.filter(post => post.status === 'approved' && post.published);

  // Get the latest post as the featured post
  const featuredPost = approvedAndPublishedPosts.length > 0 ? approvedAndPublishedPosts[0] : null;
  // Get the remaining latest posts for the list
  const otherLatestPosts = approvedAndPublishedPosts.slice(1, 5); // Take up to 4 other latest posts

  if (!featuredPost && otherLatestPosts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No approved and published posts available yet.
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">AI & Deepfake Fraud News</h2>
        
        <p className="text-center text-gray-600 mb-12">Stay updated on the latest AI fraud and deepfake misuse cases affecting society.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post (Left Column) */}
          {featuredPost && (
            <div className="lg:col-span-2 bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
              <img 
                src={featuredPost.image_url || 'https://via.placeholder.com/600x400?text=Featured+Image'} 
                alt={featuredPost.title} 
                className="w-full h-80 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 cursor-pointer hover:text-[#3B3D87] transition-colors"
                    onClick={() => navigate(`/voice-of-oak/post/${featuredPost.id}`)}>
                  {featuredPost.title}
                </h3>
                <p className="text-gray-700 mb-4 flex-grow">
                  {featuredPost.content ? `${featuredPost.content.substring(0, 200)}...` : ''}
                </p>
                <button 
                  onClick={() => navigate(`/voice-of-oak/post/${featuredPost.id}`)}
                  className="mt-auto px-6 py-3 bg-[#3B3D87] text-white rounded-lg hover:bg-[#2d2f66] transition-colors self-start"
                >
                  Read More
                </button>
              </div>
            </div>
          )}

          {/* Other Latest Posts (Right Column) */}
          <div className="lg:col-span-1 space-y-6">
            {otherLatestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Optional: Add a button to view all posts if more than 5 exist */}
        {approvedAndPublishedPosts.length > 5 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/voice-of-oak/blog-archive')} // You might need a dedicated all blogs page
              className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              View All Posts
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestPostsSection; 