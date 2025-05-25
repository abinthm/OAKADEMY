import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import WhatWeDo from './components/WhatWeDo';
import OurImpact from './components/OurImpact';
import OurTeam from './components/OurTeam';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

function App() {
  // State to manage mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
        <Hero />
        <WhoWeAre />
        <WhatWeDo />
        <OurImpact />
        <OurTeam />
        <ContactUs />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;