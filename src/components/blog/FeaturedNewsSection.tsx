import React, { useState, useEffect, useRef } from 'react';
import ai1 from '../../assets/b1.png';
import ai2 from '../../assets/b2.png';
import ai3 from '../../assets/b3.png';

const newsItems = [
  {
    id: 1,
    title: 'Deepfake Scam Targets Global Bank',
    excerpt: 'A major international bank lost $25 million after scammers used AI-generated deepfake audio to impersonate a senior executive.',
    image: ai1,
    link: 'https://www.bbc.com/news/technology-56376016',
  },
  {
    id: 2,
    title: 'AI-Generated News Goes Viral',
    excerpt: 'A fake news story created by an AI system spread rapidly on social media, raising concerns about misinformation and digital trust.',
    image: ai2,
    link: 'https://www.nytimes.com/2023/07/10/technology/ai-fake-news.html',
  },
  {
    id: 3,
    title: 'Celebrity Deepfakes Spark Outrage',
    excerpt: 'Deepfake videos featuring celebrities in fabricated scenarios have gone viral, prompting calls for stricter AI regulations.',
    image: ai3,
    link: 'https://www.cnn.com/2023/05/15/tech/deepfake-celebrity-videos/index.html',
  },
  {
    id: 4,
    title: 'AI in Elections: Deepfake Threats',
    excerpt: 'Upcoming elections face new threats as deepfake videos are used to spread misinformation and sway public opinion.',
    image: ai2,
    link: 'https://www.reuters.com/technology/ai-election-deepfakes-2024-01-10/',
  },
  {
    id: 5,
    title: 'Synthetic Media and Social Trust',
    excerpt: 'Experts warn that synthetic media could erode public trust in online content, urging for new verification tools.',
    image: ai1,
    link: 'https://www.theverge.com/2023/03/22/synthetic-media-trust-ai',
  },
  {
    id: 5,
    title: 'Synthetic Media and Social Trust',
    excerpt: 'Experts warn that synthetic media could erode public trust in online content, urging for new verification tools.',
    image: ai1,
    link: 'https://www.theverge.com/2023/03/22/synthetic-media-trust-ai',
  },
];
  


const FeaturedNewsSection: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredNews = newsItems[featuredIndex];
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const [sideHeight, setSideHeight] = useState<number | undefined>(undefined);

  // Auto-shuffle featured news every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % newsItems.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
  }, [featuredIndex]);

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        AI & Deepfake Fraud News
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Stay updated on the latest AI fraud and deepfake misuse cases affecting society.
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
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover"
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
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
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