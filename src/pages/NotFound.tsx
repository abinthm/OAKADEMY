import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <Link
      to="/"
      className="px-4 py-2 bg-[#3B3D87] text-white rounded-md hover:bg-[#2d2f66] transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound; 