import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavbarTwo: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-[#3B3D87]">
        <img src={logo} alt="Logo" className="h-12" />
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/voice-of-oak" className="text-[#3B3D87] hover:text-[#3B3D87]/80 transition-colors">
          Voice of the Oak
        </Link>
        <Link to="/voice-of-oak/about" className="text-[#3B3D87] hover:text-[#3B3D87]/80 transition-colors">
          About
        </Link>
        <Link to="/voice-of-oak/contact" className="text-[#3B3D87] hover:text-[#3B3D87]/80 transition-colors">
          Contact
        </Link>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeDgu9Xg07SzVRLhM9SOD1LgXB8Fa4-98H1Ljk7w5S5rFFMxA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="ml-6 bg-white text-[#3B3D87] px-6 py-2 rounded font-semibold transition-colors duration-300 hover:bg-[#3B3D87] hover:text-white">
          JOIN US →
        </a>
      </div>
    </div>
  );
};

export default NavbarTwo; 