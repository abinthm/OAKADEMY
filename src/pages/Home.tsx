import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ContactUs from '../components/ContactUs';
import usePageTitle from '../hooks/usePageTitle';

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
      <ContactUs />
    </motion.main>
  );
};

export default Home; 