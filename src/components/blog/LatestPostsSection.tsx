import React, { useEffect, useState } from 'react';
import { useBlogStore } from '../../store/blogStore';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const LatestPostsSection: React.FC = () => {
  const { posts, fetchPosts } = useBlogStore();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Always fetch posts when the component mounts or fetchPosts changes
    fetchPosts();
  }, [fetchPosts]);

  // Filter for approved and published posts only
  const approvedAndPublishedPosts = posts.filter(post => post.status === 'approved' && post.published);

  // Set up the slideshow interval
  useEffect(() => {
    if (approvedAndPublishedPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlideIndex(prevIndex => 
          (prevIndex + 1) % approvedAndPublishedPosts.length
        );
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [approvedAndPublishedPosts]);

  // Get the featured post based on the current slide index
  const featuredPost = approvedAndPublishedPosts.length > 0 
    ? approvedAndPublishedPosts[currentSlideIndex] 
    : null;
  
  // Get the remaining latest posts for the list (always the top 3 latest)
  const otherLatestPosts = approvedAndPublishedPosts.slice(0, 3);

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
            <div className="lg:col-span-2 bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col relative">
              <img 
                src={featuredPost.image_url || ''} 
                alt={featuredPost.title} 
                className="w-full h-80 object-cover relative z-0"
              />
              <div className="p-6 flex flex-col flex-grow relative z-10">
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
          <div className="lg:col-span-1 space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {console.log("LatestPostsSection: otherLatestPosts:", otherLatestPosts)}
            {otherLatestPosts.map((post) => (
              <BlogCard key={post.id} post={post} featuredPostId={featuredPost?.id} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LatestPostsSection; 