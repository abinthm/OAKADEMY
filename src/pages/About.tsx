import React from 'react';
import AboutHero from '../components/AboutHero';
import WhoWeAre from '../components/WhoWeAre';
import WhatWeDo from '../components/WhatWeDo';
import WhereWeWork from '../components/WhereWeWork';
import ContactUs from '../components/ContactUs';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <WhereWeWork />
      <ContactUs />
    </motion.main>
  );
};

export default About; 