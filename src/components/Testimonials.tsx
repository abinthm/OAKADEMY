import React from 'react';

const testimonialsData = [
  {
    quote: 'The next YC cohort members from Manipal!',
    name: 'Zuber Mohammed',
    title: 'Chief Innovation Officer, MAHE',
  },
  {
    quote: 'This is the need of the hour.',
    name: 'Atul Batra',
    title: 'Startup Advisor and Mentor',
  },
  {
    quote: 'Great Product, with great Potential',
    name: 'Dr. Srinivas Padmanabhuni',
    title: 'CTO, Alensured',
  },
  {
    quote: 'Team with high potential, product of the hour!',
    name: ' ',
    title: ' ',
  },
  {
    quote: 'This is a Good Product',
    name: 'Shri Chanchal Kumar',
    title: 'IAS Secretary, Ministry of DoNER, GOI',
  },
  {
    quote: 'Apt solution for current-day scenarios',
    name: ' ',
    title: ' ',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">TESTIMONIALS</p>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12">
          Trusted by Industry Leaders
        </h2>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          See how organizations around the world are leveraging Axory AI's deepfake detection
          technology to protect their digital presence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <span className="text-4xl text-gray-400 font-serif leading-none block mb-4">&#8220;</span>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 