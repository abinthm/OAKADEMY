import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b-2 border-black ${
      isScrolled ? 'bg-[#f4d1d1] shadow-md' : 'bg-[#f4d1d1]'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-[#7b3737] font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight">
          Dear Asian Youth
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">ABOUT DAY</NavLink>
          <NavLink href="#involved">GET INVOLVED</NavLink>
          <NavLink href="#merchandise">MERCHANDISE</NavLink>
          <DonateButton />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#7b3737]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden bg-[#f4d1d1] absolute w-full transition-all duration-300 ease-in-out overflow-hidden border-b-2 border-black
        ${mobileMenuOpen ? 'max-h-[300px] opacity-100 py-4' : 'max-h-0 opacity-0'}
      `}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLink href="#about" mobile>ABOUT DAY</NavLink>
          <NavLink href="#involved" mobile>GET INVOLVED</NavLink>
          <NavLink href="#merchandise" mobile>MERCHANDISE</NavLink>
          <DonateButton mobile />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink = ({ href, children, mobile }: NavLinkProps) => (
  <a 
    href={href} 
    className={`
      text-[#7b3737] font-medium tracking-wide hover:text-[#561f1f] transition-colors
      ${mobile ? 'text-base py-2 border-b border-[#e6bcbc]' : 'text-sm'}
    `}
  >
    {children}
  </a>
);

interface DonateButtonProps {
  mobile?: boolean;
}

const DonateButton = ({ mobile }: DonateButtonProps) => (
  <a 
    href="#donate" 
    className={`
      bg-[#7b3737] text-white px-4 py-2 font-medium flex items-center
      hover:bg-[#561f1f] transition-colors tracking-wide border-2 border-black
      ${mobile ? 'text-base w-full justify-center' : 'text-sm rounded'}
    `}
  >
    DONATE <span className="ml-1">→</span>
  </a>
);

export default Header;