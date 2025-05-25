import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './components/ContactUs';

function App() {
  // State to manage mobile menu and hero section detection
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  // Function to check if we're in the hero section
  const handleScroll = () => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsInHero(heroBottom > 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          isInHero={isInHero}
        />
        
        <main className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <ContactUs />
        </main>
      </div>
    </Router>
  );
}

export default App;