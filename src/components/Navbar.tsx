import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Navbar({ onHudsonGivesClick }: { onHudsonGivesClick?: () => void }) {
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
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Donations', href: '#donations' },
    { name: 'Blog', href: '#' },
    { name: 'Shop', href: '#' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <img 
                src="https://lh3.googleusercontent.com/d/1O9W1-AkWLdXANr6KOYuVfeSMT1Zf2zbf" 
                alt="Project 201 Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-110"
              />
              <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? 'text-brand-blue' : 'text-white'}`}>
                PROJECT 201
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-light-blue ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 border-l border-slate-300 ml-4 pl-4">
              <a href="#" className={isScrolled ? 'text-slate-600' : 'text-white'}><Instagram size={18} /></a>
              <a href="#" className={isScrolled ? 'text-slate-600' : 'text-white'}><Facebook size={18} /></a>
            </div>
            <a
              href="#donations"
              className="bg-brand-light-blue hover:bg-white hover:text-brand-blue text-brand-blue px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              BOOK NOW
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? 'text-slate-900' : 'text-white'} p-2`}
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
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex justify-between items-center px-3">
                 <div className="flex space-x-4">
                  <a href="#" className="text-slate-600"><Instagram size={24} /></a>
                  <a href="#" className="text-slate-600"><Facebook size={24} /></a>
                  <a href="#" className="text-slate-600"><Youtube size={24} /></a>
                </div>
                <a
                  href="#donations"
                  onClick={() => setIsOpen(false)}
                  className="bg-brand-light-blue text-brand-blue px-6 py-2 rounded-full font-bold text-sm"
                >
                  BOOK NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
