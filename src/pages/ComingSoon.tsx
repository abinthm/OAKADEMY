import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <div className="w-24 h-1 bg-[#3B3D87] mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-[#3B3D87] border-t-transparent rounded-full mx-auto animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon; 