import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const achievementsData = [
  {
    title: 'Hult Prize MAHE 2025: Third Place Achieved',
    description: 'Secured 3rd place at the Hult Prize MAHE 2025 On-Campus Finals! Axory AI\'s innovative deepfake detection solution stood out among top competitors addressing global challenges.',
  },
  {
    title: 'Pioneira 2025: Runner-Up at VIT Vellore',
    description: 'Runner-Up at Pioneira 2025, VIT Vellore\'s national entrepreneurship summit! Axory AI showcased DetectifAI among India\'s leading student startups.',
  },
  {
    title: 'Smart India Hackathon 2024 Finalists',
    description: 'Tarini and Akshita, co-founders of Axory AI, finalists at Smart India Hackathon 2024 with their flagship product, DetectifAI.',
  },
];

const Achievements: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? achievementsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === achievementsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleAchievements = achievementsData.slice(currentIndex, currentIndex + 3);
  if (visibleAchievements.length < 3) {
    visibleAchievements.push(...achievementsData.slice(0, 3 - visibleAchievements.length));
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">RECOGNITION & AWARDS</p>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          Our Achievements
        </h2>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Every recognition we receive reaffirms our commitment to create technology that protects
          authenticity in our digital world. Here are some milestones on our journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {visibleAchievements.map((achievement, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{achievement.title}</h3>
              <p className={`text-gray-700 text-base mb-4 ${expandedIndex === index ? '' : 'line-clamp-3'}`}>
                {achievement.description}
              </p>
              <button
                onClick={() => toggleExpanded(index)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-auto self-start"
              >
                Read More <span className="ml-1 inline-block transform transition-transform duration-200">{expandedIndex === index ? '\u25B2' : '\u25BC'}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4">
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

export default Achievements; 