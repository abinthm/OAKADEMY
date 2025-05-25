import React from 'react';
import heroImage from '../assets/3.png';

const Hero = () => {
  return (
    <section className="bg-[#F5F0F0] relative overflow-hidden h-[calc(100vh-4rem)]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center relative h-full">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:px-12 py-8 relative z-10">
            {/* Heading */}
            <h1 className="font-['Poppins'] font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[0.8] mb-4 text-white lg:text-[#3B3D87] flex flex-col">
              <span className="whitespace-nowrap">Tech&nbsp;&nbsp;belongs</span>
              <span className="whitespace-nowrap">to everyone.</span>
              <span className="whitespace-nowrap mt-3">We make sure</span>
              <span className="whitespace-nowrap">it does.</span>
            </h1>

            {/* Description */}
            <p className="text-white lg:text-[#3B3D87] lg:text-opacity-80 text-base md:text-lg mb-6 max-w-xl">
              Bridging the digital divide by bringing AI education to marginalized communities - empowering rural youth with the knowledge, tools, and confidence to become creators of technology, not just consumers, and ensuring that the future of AI includes voices from every corner of society.
            </p>

            {/* CTA Button */}
            <a 
              href="#join" 
              className="inline-flex items-center bg-transparent text-white border-2 border-white lg:text-[#3B3D87] lg:border-[#3B3D87] px-6 py-2 
                font-medium text-base hover:bg-white hover:text-[#3B3D87] lg:hover:bg-[#3B3D87] lg:hover:text-white transition-colors duration-300"
            >
              JOIN US
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
          </div>

          {/* Right Side - Image */}
          <div className="absolute inset-0 lg:relative lg:w-1/2 h-full">
            <div className="relative w-full h-full overflow-hidden group">
              <img 
                src={heroImage} 
                alt="Dear Asian Youth Community" 
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

export default Hero;