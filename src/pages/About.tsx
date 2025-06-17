import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/AboutHero';
import WhoWeAre from '../components/WhoWeAre';
import WhatWeDo from '../components/WhatWeDo';
import WhereWeWork from '../components/WhereWeWork';
import ContactUs from '../components/ContactUs';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';

const About = () => {
  usePageTitle('About Us');
  
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>About Oakademy - Our Mission, Vision & Team</title>
        <meta name="description" content="Learn more about Oakademy, our mission to empower learners, our vision for education, and the dedicated team behind our online learning platform." />
      </Helmet>
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <WhereWeWork />
      <ContactUs />
    </motion.main>
  );
};

export default About; 