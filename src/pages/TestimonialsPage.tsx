import React from 'react';
import Testimonials from '../components/Testimonials';
import usePageTitle from '../hooks/usePageTitle';

const TestimonialsPage: React.FC = () => {
  usePageTitle('Testimonials');

  return (
    <div className="min-h-screen bg-gray-50">
      <Testimonials />
    </div>
  );
};

export default TestimonialsPage; 