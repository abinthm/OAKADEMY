import React from 'react';
import { motion } from 'framer-motion';
import ContactUs from '../components/ContactUs';

const AchievementsPage = () => {
  const achievements = [
    {
      title: 'beVisioneers Mercedes-Benz Fellowship',
      description: 'Selected for the beVisioneers Fellowship – a global program by Mercedes-Benz empowering sustainability pioneers. Part of Cohort 3, representing inclusive AI education for underserved communities.',
      year: '2025',
    },
    {
      title: 'World Bank Youth Summit Invitee',
      description: 'Selected to attend the World Bank Group\'s Youth Summit 2025: New Horizons – Youth-led Innovation for a Livable Planet, showcasing youth-driven, climate-aligned tech solutions.',
      year: '2025',
    },
    {
      title: 'Millennium Fellowship Finalist',
      description: 'Advanced to the final selection round of the Millennium Fellowship by United Nations Academic Impact and MCN, recognizing student-led social impact initiatives in higher education.',
      year: '2025',
    },
    {
      title: 'Global Social Impact Award – GEB Paris (Nominee)',
      description: 'Nominated for the prestigious Global Social Impact Award by the Global Entrepreneurship Bootcamp (GEB), Paris, recognizing Oakademy’s grassroots innovation in rural AI education.',
      year: '2025',
    },
    {
      title: 'Harvard x HPAIR Selection',
      description: 'Officially selected as a delegate for the Harvard Project for Asian and International Relations (HPAIR) 2024 Conference, held at Chulalongkorn University, Thailand — spotlighting Oakademy\'s mission on an Ivy League platform.',
      year: '2024',
    },
    {
      title: 'Startup Incubation at IEDC',
      description: 'Oakademy is currently incubated under the Innovation & Entrepreneurship Development Centre (IEDC), Sacred Heart College (Autonomous), fostering early-stage innovation and sustainable scaling.',
      year: '2024',
    },
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
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">
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
      <ContactUs />
    </motion.div>
  );
};

export default AchievementsPage; 