import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import frame1 from '../assets/Frame 1.svg';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsScrolled(currentScrollPos > 20);
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 transform
        ${isScrolled ? 'bg-[#3B3D87] shadow-sm' : 'bg-[#3B3D87]'}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container mx-auto px-4 py-1 flex items-center justify-between max-w-5xl">
        {/* Logo */}
        <Link to="/" className="flex items-center -my-2">
          <img 
            src={frame1} 
            alt="Dear Asian Youth Logo" 
            className="h-14 md:h-16 lg:h-20 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink href="https://oakademy-blogs.vercel.app/" target="_blank" rel="noopener noreferrer">VOICE OF THE OAK</NavLink>
          <NavLink href="#contact">CONTACT US</NavLink>
          <JoinButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`
          ${mobileMenuOpen ? 'block' : 'hidden'} 
          md:hidden bg-[#3B3D87] absolute w-full 
          transition-all duration-300 ease-in-out overflow-hidden 
          ${mobileMenuOpen ? 'max-h-[300px] opacity-100 py-3' : 'max-h-0 opacity-0'}
        `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3 max-w-5xl">
          <NavLink to="/about" mobile>ABOUT US</NavLink>
          <NavLink href="https://oakademy-blogs.vercel.app/" target="_blank" rel="noopener noreferrer" mobile>VOICE OF THE OAK</NavLink>
          <NavLink href="#contact" mobile>CONTACT US</NavLink>
          <JoinButton mobile />
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  mobile?: boolean;
  target?: string;
  rel?: string;
}

const NavLink = ({ href, to, children, mobile, target, rel }: NavLinkProps) => {
  const className = `
    text-white font-medium tracking-wide hover:text-gray-200 transition-colors text-xs
    ${mobile ? 'text-sm py-2 border-b border-white/15' : ''}
  `;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a 
      href={href}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
};

interface JoinButtonProps {
  mobile?: boolean;
}

const JoinButton = ({ mobile }: JoinButtonProps) => (
  <a 
    href="#join" 
    className={`
      bg-white text-[#3B3D87] px-3 py-1.5 font-medium flex items-center
      hover:bg-gray-100 transition-colors tracking-wide border border-white text-xs
      ${mobile ? 'text-sm w-full justify-center py-2' : 'rounded'}
    `}
  >
    JOIN US <span className="ml-1">→</span>
  </a>
);

export default Navbar; 