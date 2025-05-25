import React from 'react';
import { MapPin, Users2, Share2, Handshake, Brain, Users } from 'lucide-react';

const Stats = () => {
  return (
    <section className="bg-[#3B3D87] text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h3 className="font-['Poppins'] text-4xl md:text-5xl mb-12">Oakademy in Numbers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Chapters */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">25</h4>
            <p className="text-lg text-white/80">Chapters in 10+ Countries</p>
          </div>

          {/* Team Members */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <Users2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">100+</h4>
            <p className="text-lg text-white/80">Volunteers</p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <Share2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">10,000+</h4>
            <p className="text-lg text-white/80">Social Media Followers</p>
          </div>

          {/* Conferences */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <Handshake className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">10+</h4>
            <p className="text-lg text-white/80">Webinars / Conferences Hosted</p>
          </div>

          {/* AI Workshops */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">25+</h4>
            <p className="text-lg text-white/80">AI Workshops</p>
          </div>

          {/* Ambassadors */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-2">10+</h4>
            <p className="text-lg text-white/80">Global Ambassadors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 