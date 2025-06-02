import React from 'react';
import heroImage from '../assets/3.png';

const Hero = () => {
  return (
    <section className="bg-[#F5F0F0] relative overflow-hidden h-[calc(100vh-4rem)] flex items-stretch">
      <div className="container mx-auto h-full lg:max-w-none lg:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center relative h-full flex-1 justify-between">
          {/* Mobile Background Image */}
          <div className="lg:hidden absolute inset-0">
            <div className="relative w-full h-full overflow-hidden group">
              <img 
                src={heroImage} 
                alt="Dear Asian Youth Community" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-[#3B3D87] opacity-60 transition-transform duration-700 group-hover:scale-110"></div>
            </div>
          </div>

          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 px-4 lg:px-8 flex flex-col justify-start lg:justify-center h-full lg:h-auto relative z-20 pt-20 lg:pt-8">
            {/* Heading */}
            <h1 className="font-['Poppins'] font-extrabold text-[2.5rem] md:text-5xl lg:text-7xl leading-[1.05] mb-2 sm:mb-8 text-white lg:text-[#3B3D87]">
              <span className="whitespace-nowrap">Decoding</span>
              <br />
              <span className="block mt-2 whitespace-nowrap">Inclusivity</span>
            </h1>
            <p className="block lg:hidden"><br /><br /></p>


            {/* Description */}
            <p className="text-white lg:text-[#3B3D87] lg:text-opacity-80 text-l sm:text-sm md:text-base mb-4 max-w-sm sm:max-w-lg md:max-w-2xl break-words text-justify pr-0">
              Bridging the digital divide by bringing AI education to marginalized communities - empowering rural youth with the knowledge, tools, and confidence to become creators of technology, not just consumers, and ensuring that the future of AI includes voices from every corner of society.
            </p>

            <p className="text-white lg:text-[#3B3D87] lg:text-opacity-80 text-l sm:text-sm md:text-base mb-4 max-w-sm sm:max-w-lg md:max-w-2xl break-words text-justify pr-0">
              If you believe in rewriting the future with purpose and ensuring no voice is left behind in the age of AI - your journey starts here.
            </p>
            <p className="block lg:hidden"><br /><br /></p>
            {/* CTA Button */}
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeDgu9Xg07SzVRLhM9SOD1LgXB8Fa4-98H1Ljk7w5S5rFFMxA/viewform?usp=header" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent text-white border-2 border-white lg:text-[#3B3D87] lg:border-[#3B3D87] px-6 py-2 font-medium text-base hover:bg-white hover:text-[#3B3D87] lg:hover:bg-[#3B3D87] lg:hover:text-white transition-colors duration-300 w-fit mt-4"
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

          {/* Desktop Image */}
          <div className="hidden lg:block lg:relative lg:w-1/2 h-full">
            <div className="relative w-full h-full overflow-hidden group">
              <img 
                src={heroImage} 
                alt="Dear Asian Youth Community" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-[#3B3D87] opacity-50 transition-transform duration-700 group-hover:scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;