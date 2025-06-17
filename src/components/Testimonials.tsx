import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    location: 'Rural Community, Kenya',
    testimonial: 'Oakademy\'s AI workshops transformed my understanding of technology. I never thought I could learn about AI, but their approach made it accessible and exciting. Now I\'m working on a project to help local farmers predict weather patterns!',
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Community Leader',
    location: 'Mexico City',
    testimonial: 'The impact Oakademy has had on our community is remarkable. Their focus on sustainable AI practices has inspired our youth to think about technology in a way that benefits both people and the planet.',
  },
  {
    name: 'Priya Sharma',
    role: 'Teacher',
    location: 'Rural School, India',
    testimonial: 'As an educator, I\'ve seen firsthand how Oakademy\'s programs bridge the digital divide. Their culturally relevant content and hands-on approach have made AI education accessible to students who previously had limited exposure to technology.',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + 3);
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(...testimonialsData.slice(0, 3 - visibleTestimonials.length));
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">VOICES OF IMPACT</p>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          What People Say
        </h2>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Hear from our community members about how Oakademy is making a difference in their lives
          and communities through accessible AI education.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
              <p className="text-gray-700 text-base mb-4">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 