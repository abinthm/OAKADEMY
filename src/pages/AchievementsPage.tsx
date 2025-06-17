import React from 'react';
import Achievements from '../components/Achievements';
import usePageTitle from '../hooks/usePageTitle';

const AchievementsPage: React.FC = () => {
  usePageTitle('Our Achievements');

  return (
    <div className="min-h-screen bg-gray-50">
      <Achievements />
    </div>
  );
};

export default AchievementsPage; 