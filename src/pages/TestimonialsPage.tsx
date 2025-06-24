import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import b6 from '../assets/b6.png';
import b7 from '../assets/b7.png';
import b8 from '../assets/b8.png';
import b9 from '../assets/b9.png';

const trustedLogos = [b1, b2, b3, b4, b5, b6, b7, b8, b9];

const TestimonialsPage = () => {
  const testimonials = [
    {
      quote: "Oakademy's AI program opened my eyes to possibilities I never imagined existed in my village. Now I'm using AI to help solve our local agricultural challenges.",
      author: "Priya S.",
      role: "Student",
      location: "Rural Karnataka, India"
    },
    {
      quote: "The practical, hands-on approach to teaching AI made complex concepts accessible. I've gone from being intimidated by technology to teaching others in my community.",
      author: "James M.",
      role: "Community Leader",
      location: "Nairobi, Kenya"
    },
    {
      quote: "Thanks to Oakademy, our village now has an AI-powered water quality monitoring system. It's amazing to see technology solving real problems in our community.",
      author: "Maria R.",
      role: "Project Lead",
      location: "Cusco, Peru"
    },
    {
      quote: "The mentorship and support from Oakademy helped me develop an AI solution for local healthcare access. This experience changed my life and my community.",
      author: "Anh N.",
      role: "Student Developer",
      location: "Mekong Delta, Vietnam"
    },
    {
      quote: "Seeing young people in our village learn and apply AI has brought hope and inspiration. Oakademy's program is truly transformative for rural communities.",
      author: "Dr. Sarah K.",
      role: "Education Partner",
      location: "Western Cape, South Africa"
    },
    {
      quote: "The confidence and skills I gained through Oakademy's program helped me start a tech initiative in my community. Now I'm helping others learn AI too.",
      author: "Ahmed H.",
      role: "Program Graduate",
      location: "Alexandria, Egypt"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-[#3B3D87] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-['Poppins'] font-extrabold text-5xl md:text-6xl lg:text-7xl mb-8 text-white">
            Voices of Impact
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Stories from our community members who are transforming their lives and communities through AI education.
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#3B3D87]" />
              </div>
              <blockquote className="text-gray-600 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <div className="font-bold text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-[#3B3D87]">
                  {testimonial.role}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted by Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-8">
            Trusted by leading organizations worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {trustedLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Trusted organization ${idx + 1}`}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsPage; 