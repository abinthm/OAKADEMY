import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ContactUs from '../components/ContactUs';
import usePageTitle from '../hooks/usePageTitle';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import b6 from '../assets/b6.png';
import b7 from '../assets/b7.png';
import b8 from '../assets/b8.png';
import b9 from '../assets/b9.png';

const trustedLogos = [b1, b2, b3, b4, b5, b6, b7, b8, b9];

const Home = () => {
  usePageTitle('Home');
  
  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <Hero />
      <Stats />
      {/* Trusted by Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-8">
            Trusted by leading organizations worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {trustedLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Trusted organization ${idx + 1}`}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
      <section className="relative bg-[#f9fafb] py-16 border-t border-b border-gray-100 overflow-hidden">
        {/* Subtle SVG pattern background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" className="opacity-10" style={{ minHeight: '400px' }}>
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#3B3D87" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        <div className="container mx-auto max-w-2xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative border-l-8 border-[#3B3D87]"
          >
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-[#3B3D87] opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 15.59C7.06 15.86 7 16.17 7 16.5A2.5 2.5 0 0 0 9.5 19c1.38 0 2.5-1.12 2.5-2.5 0-1.38-1.12-2.5-2.5-2.5-.34 0-.65.06-.92.17C8.7 11.7 10.5 9.5 13 9.5V7c-3.87 0-7 3.13-7 7 0 .21.01.42.03.62.09.01.18.02.27.02.32 0 .63-.06.9-.17zm9 0c-.11.27-.17.58-.17.91A2.5 2.5 0 0 0 18.5 19c1.38 0 2.5-1.12 2.5-2.5 0-1.38-1.12-2.5-2.5-2.5-.34 0-.65.06-.92.17C17.7 11.7 19.5 9.5 22 9.5V7c-3.87 0-7 3.13-7 7 0 .21.01.42.03.62.09.01.18.02.27.02.32 0 .63-.06.9-.17z"/></svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">Founder's Note</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-center">
              When people hear "artificial intelligence," they often think of machines, algorithms, or distant tech hubs buzzing with data. But at Oakademy, we see something else: villages, unheard voices, and minds ready to reimagine the future.
              <br /><br />
              I founded Oakademy not just to teach AI—but to humanize it. To take a system often built without us, and rebuild it with us, for us. In a world rushing toward digitization, we asked a different question: What does it mean to build technology that remembers the soil it stands on?
              <br /><br />
              We teach AI in the language of the land. We talk sustainability when no one is counting tech's carbon cost. We invite young people from rural and underrepresented communities to not just consume innovation, but co-create it. Oakademy is where code meets culture, where innovation meets inclusion, and where the digital future learns to be kinder, slower, and more just.
              <br /><br />
              If you're here, maybe you're also done with the usual. The flashy, the exclusive, the extractive. Maybe you're looking for something rooted. So are we.
              <br /><br />
              This isn't just an academy. It's a quiet rebellion.
              <br /><br />
              Welcome to Oakademy.
            </p>
            <hr className="my-6 border-gray-200" />
            <div className="text-right mt-4">
              <p className="font-semibold text-[#3B3D87] italic" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2rem', lineHeight: '2.5rem' }}>Gautham Krishnan B</p>
              <p className="text-gray-700 italic">Founder, Oakademy</p>
            </div>
          </motion.div>
        </div>
      </section>
      <ContactUs />
    </motion.main>
  );
};

export default Home; 