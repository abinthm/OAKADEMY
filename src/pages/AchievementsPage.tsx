import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe2, BookOpen, Target, Lightbulb } from 'lucide-react';

const AchievementsPage = () => {
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Global Recognition",
      description: "Recognized by UNESCO for innovative rural AI education initiatives",
      year: "2023"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Successfully trained over 1,000 rural youth in AI fundamentals",
      year: "2023"
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: "International Reach",
      description: "Expanded to 10+ countries with active local chapters",
      year: "2023"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Excellence",
      description: "Developed comprehensive AI curriculum tailored for rural contexts",
      year: "2023"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Project Success",
      description: "Launched 25+ community-driven AI projects addressing local challenges",
      year: "2023"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation Leadership",
      description: "Pioneered low-resource AI teaching methodologies",
      year: "2023"
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Achievements
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Celebrating milestones in our journey to make AI education accessible and impactful in rural communities worldwide.
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#3B3D87]/10 rounded-full flex items-center justify-center mb-4">
                <div className="text-[#3B3D87]">{achievement.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {achievement.description}
              </p>
              <div className="text-sm text-[#3B3D87] font-medium">
                {achievement.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementsPage; 