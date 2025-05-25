import React from 'react';
import heroImage from '../assets/1.png';

const AboutHero = () => {
  return (
    <section className="bg-[#F5F0F0] relative overflow-hidden min-h-[80vh]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center relative h-full">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:px-12 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-['Poppins'] font-extrabold text-5xl md:text-6xl lg:text-7xl mb-8 text-white lg:text-[#3B3D87]">
                Our Story
              </h1>
              <div className="space-y-6 text-white lg:text-gray-700 text-lg md:text-xl">
                <p>
                Oakademy is a social innovation initiative dedicated to redefining AI education by making it accessible and relevant to rural youth. We recognize the current barriers that limit AI learning to urban centers and elite institutions. Our approach is rooted in inclusivity, sustainability, and real-world application - ensuring that young people from small towns and villages have the knowledge and tools to become creators and problem-solvers in their own communities.
                </p>
                <p>
                  
Our commitment is to foster an AI ecosystem that is environmentally responsible and socially equitable, where rural perspectives contribute to shaping the future of technology.
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