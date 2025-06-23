import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';

interface FeaturedNewsSectionProps {
  posts: BlogPost[];
}

const getAbsoluteImageUrl = (url: string | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/blog-images/${url.split('/').pop()}`;
};

const FeaturedNewsSection: React.FC<FeaturedNewsSectionProps> = ({ posts }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredPost = posts[featuredIndex];

  // Auto-shuffle featured post every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % posts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [posts.length]);

  if (!featuredPost || posts.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        AI & Deepfake Fraud News
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Stay updated on the latest AI fraud and deepfake misuse cases affecting society.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Post - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <Link 
            to={`/voice-of-oak/post/${featuredPost.id}`}
            className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {featuredPost.cover_image && (
              <div className="relative h-[400px]">
                <img
                  src={getAbsoluteImageUrl(featuredPost.cover_image)}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600">
                {featuredPost.excerpt}
              </p>
              <div className="mt-4 text-[#3B3D87] font-medium">
                Read More
              </div>
            </div>
          </Link>
        </div>

        {/* Related Posts - Takes up 1 column with scroll */}
        <div className="h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-4 pr-2">
            {posts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => setFeaturedIndex(index)}
                className={`w-full text-left block rounded-lg overflow-hidden transition-all
                  ${index === featuredIndex 
                    ? 'bg-[#3B3D87] text-white shadow-md transform scale-[1.02]' 
                    : 'bg-[#F0FFFF] hover:bg-[#E0FFFF]'
                  }`}
              >
                <div className="flex gap-4">
                  {post.cover_image && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={getAbsoluteImageUrl(post.cover_image)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-grow">
                    <h3 className={`font-bold mb-2 ${index === featuredIndex ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${index === featuredIndex ? 'text-white/90' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewsSection; 