import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: 'home' | 'about' | 'programs' | 'hire' | 'youth-support' | 'partnerships' | 'sponsors' | 'donate' | 'contact' | 'merch') => void;
}

export default function Navbar({ activePage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' as const },
    { name: 'About', id: 'about' as const },
    { name: 'Programs', id: 'programs' as const },
    { name: 'Hire Project 201', id: 'hire' as const },
    { name: 'Youth Support', id: 'youth-support' as const },
    { name: 'Schools & Partnerships', id: 'partnerships' as const },
    { name: 'Sponsors & Partners', id: 'sponsors' as const },
    { name: 'Merch', id: 'merch' as const },
    { name: 'Donate', id: 'donate' as const },
    { name: 'Contact', id: 'contact' as const },
  ];

  const showSolidNavBar = isScrolled || activePage !== 'home';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidNavBar ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => onPageChange('home')} 
              className="flex items-center gap-2 group bg-transparent border-0 text-left focus:outline-none p-0 cursor-pointer"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1O9W1-AkWLdXANr6KOYuVfeSMT1Zf2zbf" 
                alt="Project 201 Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-110"
              />
              <span className={`font-display font-bold text-xl tracking-tight ${showSolidNavBar ? 'text-brand-blue' : 'text-white'}`}>
                PROJECT 201
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.filter(link => link.id !== 'donate').map((link) => (
              <button
                key={link.name}
                onClick={() => onPageChange(link.id)}
                className={`text-[10px] uppercase font-bold tracking-widest transition-all hover:text-brand-light-blue cursor-pointer focus:outline-none p-1 ${
                  activePage === link.id
                    ? 'text-brand-light-blue border-b-2 border-brand-light-blue'
                    : showSolidNavBar ? 'text-slate-700' : 'text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className={`flex items-center space-x-3 border-l ml-2 pl-4 ${showSolidNavBar ? 'border-slate-350' : 'border-white/20'}`}>
              <a href="https://www.instagram.com/project201nj?utm_source=qr" target="_blank" rel="noopener noreferrer" className={showSolidNavBar ? 'text-slate-600 hover:text-brand-blue' : 'text-white hover:text-brand-light-blue'}><Instagram size={16} /></a>
              <a href="https://www.facebook.com/project201nj" target="_blank" rel="noopener noreferrer" className={showSolidNavBar ? 'text-slate-600 hover:text-brand-blue' : 'text-white hover:text-brand-light-blue'}><Facebook size={16} /></a>
            </div>
            {/* Donate button */}
            <button
              onClick={() => onPageChange('donate')}
              className="bg-brand-light-blue hover:bg-brand-blue hover:text-white text-brand-blue px-5 py-2.5 rounded-xl font-bold text-[10px] transition-all transform hover:scale-105 active:scale-95 shadow font-display uppercase tracking-wider cursor-pointer"
            >
              DONATE
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${showSolidNavBar ? 'text-slate-900' : 'text-white'} p-2 cursor-pointer focus:outline-none`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.filter(link => link.id !== 'donate').map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsOpen(false);
                    onPageChange(link.id);
                  }}
                  className={`block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all focus:outline-none ${
                    activePage === link.id
                      ? 'bg-brand-blue/5 text-brand-light-blue'
                      : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex justify-between items-center px-4 border-t border-slate-100 mt-4">
                 <div className="flex space-x-4">
                  <a href="https://www.instagram.com/project201nj?utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-blue"><Instagram size={20} /></a>
                  <a href="https://www.facebook.com/project201nj" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-blue"><Facebook size={20} /></a>
                </div>
                {/* Mobile Donate Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onPageChange('donate');
                  }}
                  className="bg-brand-light-blue text-brand-blue px-5 py-2.5 rounded-xl font-bold text-[10px] font-display uppercase tracking-widest cursor-pointer"
                >
                  DONATE NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
