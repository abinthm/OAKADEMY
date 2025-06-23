import React from 'react';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import b6 from '../assets/b6.png';
import b7 from '../assets/b7.png';
import b8 from '../assets/b8.png';
import b9 from '../assets/b9.png';

const testimonials = [
  {
    quote: 'The next YC cohort members from Manipal!',
    name: 'Zuber Mohammed',
    role: 'Chief Innovation Officer, MAHE',
  },
  {
    quote: 'This is the need of the hour.',
    name: 'Atul Batra',
    role: 'Startup Advisor and Mentor',
  },
  {
    quote: 'Great Product, with great Potential',
    name: 'Dr. Srinivas Padmanabhuni',
    role: 'CTO, Alensured',
  },
  {
    quote: 'Team with high potential, product of the hour!',
    name: 'Neelima Vobugari',
    role: 'CIO, Alensured',
  },
  {
    quote: 'This is a Good Product',
    name: 'Shri Chanchal Kumar',
    role: 'IAS, Secretary, Ministry of DoNER, GOI',
  },
  {
    quote: 'Apt solution for current-day scenarios',
    name: 'Jai Prakash Govindraj',
    role: 'Cyber Security Expert',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-center text-md font-semibold text-gray-600 mb-2 tracking-widest uppercase">Testimonials</h2>
      <h1 className="text-center text-4xl font-extrabold mb-4">Trusted by Industry Leaders</h1>
      <p className="text-center text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
        See how organizations around the world are leveraging Axory AI's deepfake detection technology to protect their digital presence.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-8 flex flex-col min-h-[180px]">
            <span className="text-3xl text-black mb-4">&ldquo;</span>
            <p className="text-gray-800 mb-6">{t.quote}</p>
            <div>
              <div className="font-bold text-black mb-1">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Trusted by logos section */}
      <div className="mt-12">
        <p className="text-center text-sm text-gray-500 mb-6">Trusted by leading organizations worldwide</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center max-w-4xl mx-auto">
          {[b1, b2, b3, b4, b5, b6, b7, b8, b9].map((img, idx) => (
            <img key={idx} src={img} alt={`Trusted logo ${idx + 1}`} className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 