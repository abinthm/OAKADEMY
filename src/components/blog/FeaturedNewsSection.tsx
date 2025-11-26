import React, { useState, useEffect, useRef } from 'react';
import { useNewsStore } from '../../store/newsStore';

const FeaturedNewsSection: React.FC = () => {
  const { newsItems, fetchNewsItems, isLoading } = useNewsStore();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const [sideHeight, setSideHeight] = useState<number | undefined>(undefined);

  // Fetch news items on mount
  useEffect(() => {
    fetchNewsItems();
  }, [fetchNewsItems]);

  // Auto-shuffle featured news every 10 seconds
  useEffect(() => {
    if (newsItems.length === 0) return;
    
    const interval = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % newsItems.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Sync sidebar height to featured post
  useEffect(() => {
    function updateHeight() {
      if (featuredRef.current) {
        setSideHeight(featuredRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [featuredIndex, newsItems.length]);

  // Don't render if loading or no news items
  if (isLoading && newsItems.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          The Oak Observer
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Curated stories shaping the world we're building - from tech to youth impact.
        </p>
        <div className="text-center py-8">
          <div className="animate-pulse text-gray-500">Loading news...</div>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          The Oak Observer
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Curated stories shaping the world we're building - from tech to youth impact.
        </p>
        <div className="text-center py-8 text-gray-500">
          No news items available at the moment.
        </div>
      </div>
    );
  }

  const featuredNews = newsItems[featuredIndex];

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        The Oak Observer
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Curated stories shaping the world we're building - from tech to youth impact.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured News - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <a
            ref={featuredRef}
            href={featuredNews.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[400px] md:h-[480px] lg:h-[520px]">
              <img
                src={featuredNews.image_url}
                alt={featuredNews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {featuredNews.title}
              </h3>
              <p className="text-gray-600">
                {featuredNews.excerpt}
              </p>
              <div className="mt-4 text-[#3B3D87] font-medium">
                Read More
              </div>
            </div>
          </a>
        </div>
        {/* Related News - Takes up 1 column with scroll */}
        <div
          className={`pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${newsItems.length >= 5 ? 'overflow-y-auto' : ''}`}
          style={sideHeight ? { height: sideHeight } : {}}
        >
          <div className="space-y-4">
            {newsItems.map((news, index) => (
              <button
                key={news.id}
                onClick={() => setFeaturedIndex(index)}
                className={`w-full text-left block rounded-lg overflow-hidden transition-all
                  ${index === featuredIndex 
                    ? 'bg-[#3B3D87] text-white shadow-md transform scale-[1.02]' 
                    : 'bg-[#F0FFFF] hover:bg-[#E0FFFF]'
                  }`}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={news.image_url}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Image';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className={`font-bold mb-2 ${index === featuredIndex ? 'text-white' : 'text-gray-900'}`}>
                      {news.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${index === featuredIndex ? 'text-white/90' : 'text-gray-600'}`}>
                      {news.excerpt}
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