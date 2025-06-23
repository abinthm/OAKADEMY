import React, { useState } from 'react';

const achievements = [
  {
    title: 'Pioneira 2025: Runner-Up at VIT Vellore',
    description: `Runner-Up at Pioneira 2025, VIT Vellore's national entrepreneurship summit! Axory AI showcased DetectifAI among India's...`,
    link: '#',
  },
  {
    title: 'Smart India Hackathon 2024 Finalists',
    description: `Tarini and Akshita, co-founders of Axory AI, finalists at Smart India Hackathon 2024 with their flagship product, DetectifAI.`,
    link: '#',
  },
  {
    title: 'Hult Prize MAHE 2025: Third Place Achieved',
    description: `Secured 3rd place at the Hult Prize MAHE 2025 On-Campus Finals! Axory AI's innovative deepfake detection solution...`,
    link: '#',
  },
];

const Achievements: React.FC = () => {
  const [startIdx, setStartIdx] = useState(0);
  const visible = 3;
  const total = achievements.length;

  const prev = () => setStartIdx((prev) => (prev - 1 + total) % total);
  const next = () => setStartIdx((prev) => (prev + 1) % total);

  // Get visible cards, wrap around if needed
  const cards = Array.from({ length: visible }, (_, i) => achievements[(startIdx + i) % total]);

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-center text-lg font-semibold text-gray-600 mb-2 tracking-widest">RECOGNITION & AWARDS</h2>
      <h1 className="text-center text-4xl font-extrabold mb-4">Our Achievements</h1>
      <p className="text-center text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
        Every recognition we receive reaffirms our commitment to create technology that protects authenticity in our digital world. Here are some milestones on our journey.
      </p>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-6">
          {cards.map((ach, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="text-xl font-bold mb-2">{ach.title}</h3>
                <p className="text-gray-600 mb-4">{ach.description}</p>
              </div>
              <a href={ach.link} className="text-blue-700 font-medium hover:underline text-sm flex items-center">Read More <span className="ml-1">▼</span></a>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={prev} className="bg-white rounded-full shadow p-3 hover:bg-gray-100 focus:outline-none">
            <span className="sr-only">Previous</span>
            <span className="text-2xl">&#8592;</span>
          </button>
          <button onClick={next} className="bg-white rounded-full shadow p-3 hover:bg-gray-100 focus:outline-none">
            <span className="sr-only">Next</span>
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 