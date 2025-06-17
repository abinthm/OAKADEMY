import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-medium text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound; 