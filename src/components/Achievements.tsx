import React, { useState } from 'react';

const achievements = [
  {
    title: 'beVisioneers Mercedes-Benz Fellowship',
    description: `Selected for the beVisioneers Fellowship – a global program by Mercedes-Benz empowering sustainability pioneers. Part of Cohort 3, representing inclusive AI education for underserved communities.`,
    year: '2025',
  },
  {
    title: 'Harvard x HPAIR Selection',
    description: `Officially selected as a delegate for the Harvard Project for Asian and International Relations (HPAIR) 2024 Conference, held at Chulalongkorn University, Thailand — spotlighting Oakademy's mission on an Ivy League platform.`,
    year: '2024',
  },
  {
    title: 'World Bank Youth Summit Invitee',
    description: `Selected to attend the World Bank Group's Youth Summit 2025: New Horizons – Youth-led Innovation for a Livable Planet, showcasing youth-driven, climate-aligned tech solutions.`,
    year: '2025',
  },
  {
    title: 'Millennium Fellowship Finalist',
    description: `Advanced to the final selection round of the Millennium Fellowship by United Nations Academic Impact and MCN, recognizing student-led social impact initiatives in higher education.`,
    year: '2025',
  },
  {
    title: 'Global Footprint in 10+ Nations',
    description: `Established connections with ambassadors, supporters, and collaborators across 10+ countries* — expanding Oakademy's vision of inclusive digital education beyond borders. *Estimate based on informal engagement and early-stage outreach data.`,
    year: '2025',
  },
  {
    title: 'Startup Incubation at IEDC',
    description: `Oakademy is currently incubated under the Innovation & Entrepreneurship Development Centre (IEDC), Sacred Heart College (Autonomous), fostering early-stage innovation and sustainable scaling.`,
    year: '2024',
  },
  {
    title: 'Global Social Impact Award – GEB Paris (Nominee)',
    description: `Nominated for the prestigious Global Social Impact Award by the Global Entrepreneurship Bootcamp (GEB), Paris, recognizing Oakademy's grassroots innovation in rural AI education.`,
    year: '2024',
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
                <span className="text-sm font-semibold text-blue-600">{ach.year}</span>
              </div>
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



