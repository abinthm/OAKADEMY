import React from 'react';
import heroImage from '../assets/1.png';

const AboutHero = () => {
  return (
    <section className="bg-[#F5F0F0] relative overflow-hidden min-h-[80vh]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center relative h-full">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-['Poppins'] font-extrabold text-5xl md:text-6xl lg:text-7xl mb-8 text-white lg:text-[#3B3D87]">
                Our Story
              </h1>
              <div className="space-y-6 text-white lg:text-gray-700 text-lg md:text-xl">
                <p className="text-justify">
                Oakademy was born from a belief that technology must include everyone. In a world where AI often feels distant and inaccessible to rural communities, we saw an urgent need - not just to teach AI, but to bring it closer to those long left behind.
                <br /><br />
                Our goal is to empower rural youth to become creators of technology, not just consumers. We believe true innovation emerges when diverse voices, especially those shaped by struggle and resilience, are given the tools and confidence to lead.
                <br /><br />  
By blending inclusion, sustainability, and community-driven innovation, Oakademy is reimagining who shapes the future of AI. From small towns and villages, young minds are learning to solve real problems using AI -ensuring every voice has a place in building tomorrow.
<br /><br />  
                </p>


              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="absolute inset-0 lg:relative lg:w-1/2 h-full">
            <div className="relative w-full h-full overflow-hidden group">
              <img 
                src={heroImage} 
                alt="Oakademy Community" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-[#3B3D87] opacity-60 lg:opacity-50 transition-transform duration-700 group-hover:scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero; 