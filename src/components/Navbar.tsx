import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: 'home' | 'about' | 'programs' | 'hire' | 'youth-support' | 'partnerships' | 'sponsors' | 'donate' | 'contact' | 'merch' | 'holiday-drop') => void;
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
    { name: 'Holiday Drop', id: 'holiday-drop' as const, isDrop: true },
    { name: 'Merch', id: 'merch' as const },
    { name: 'Donate', id: 'donate' as const, isVanCampaign: true },
    { name: 'Contact', id: 'contact' as const },
  ];

  const showSolidNavBar = isScrolled || activePage !== 'home';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Pizzeria Partnership & Van Fund Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-brand-blue to-slate-950 text-white text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4 border-b border-brand-light-blue/20 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => onPageChange('donate')}
            className="flex items-center gap-2 text-left bg-transparent border-0 p-0 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap group focus:outline-none"
          >
            <span className="bg-amber-400 text-slate-950 font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 font-display flex items-center gap-1 group-hover:bg-amber-300 transition-colors">
              <span>🍕</span>
              <span>Pizzeria Partner</span>
            </span>
            <span className="font-semibold text-slate-200 text-[10px] sm:text-xs truncate group-hover:text-white transition-colors">
              Help Project 201 acquire a passenger van for our youth!
            </span>
          </button>
          
          <button 
            onClick={() => onPageChange('donate')}
            className="bg-brand-light-blue hover:bg-white text-brand-blue font-black px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] uppercase tracking-wider shrink-0 font-display transition-all cursor-pointer shadow-sm flex items-center gap-1"
          >
            <span>Scan QR / Zeffy</span>
            <span className="hidden sm:inline">→</span>
          </button>
        </div>
      </div>

      <nav 
        className={`transition-all duration-300 ${
          showSolidNavBar ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-transparent py-4'
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
                  src="https://cdn.prod.website-files.com/676454c7900c0070c4219d2a/67a1e7a94e7d4cbcfd580329_uc.png" 
                  alt="Project 201 Logo" 
                  className="h-9 sm:h-10 w-auto transition-transform group-hover:scale-110"
                />
                <span className={`font-display font-bold text-lg sm:text-xl tracking-tight ${showSolidNavBar ? 'text-brand-blue' : 'text-white'}`}>
                  PROJECT 201
                </span>
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-5">
              {navLinks.filter(link => link.id !== 'donate').map((link) => (
                <button
                  key={link.name}
                  onClick={() => onPageChange(link.id)}
                  className={`text-[10px] uppercase font-bold tracking-widest transition-all hover:text-brand-light-blue cursor-pointer focus:outline-none p-1 flex items-center gap-1.5 ${
                    activePage === link.id
                      ? 'text-brand-light-blue border-b-2 border-brand-light-blue'
                      : showSolidNavBar ? 'text-slate-700' : 'text-white'
                  }`}
                >
                  {link.name}
                  {'isDrop' in link && (link as any).isDrop && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-500 font-black text-[7px] tracking-normal border border-amber-400/40 animate-pulse">
                      NEW
                    </span>
                  )}
                </button>
              ))}
              <div className={`flex items-center space-x-3 border-l ml-2 pl-4 ${showSolidNavBar ? 'border-slate-350' : 'border-white/20'}`}>
                <a href="https://www.instagram.com/project201nj?utm_source=qr" target="_blank" rel="noopener noreferrer" className={showSolidNavBar ? 'text-slate-600 hover:text-brand-blue' : 'text-white hover:text-brand-light-blue'}><Instagram size={16} /></a>
                <a href="https://www.facebook.com/project201nj" target="_blank" rel="noopener noreferrer" className={showSolidNavBar ? 'text-slate-600 hover:text-brand-blue' : 'text-white hover:text-brand-light-blue'}><Facebook size={16} /></a>
              </div>
              {/* Donate button with Van Fund highlight */}
              <button
                onClick={() => onPageChange('donate')}
                className="bg-brand-light-blue hover:bg-brand-blue hover:text-white text-brand-blue px-5 py-2.5 rounded-xl font-bold text-[10px] transition-all transform hover:scale-105 active:scale-95 shadow font-display uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border border-cyan-400/40"
              >
                <span>DONATE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${showSolidNavBar ? 'text-slate-900' : 'text-white'} p-2 cursor-pointer focus:outline-none`}
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
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
                {/* Mobile Pizzeria Van Campaign Link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onPageChange('donate');
                  }}
                  className="w-full text-left px-4 py-3 mb-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all bg-gradient-to-r from-amber-500/10 to-brand-blue/10 border border-amber-400/30 text-slate-900 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍕</span>
                    <span>Pizzeria Van Campaign</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[8px]">
                    ZEFFY LIVE
                  </span>
                </button>

                {navLinks.filter(link => link.id !== 'donate').map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsOpen(false);
                      onPageChange(link.id);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all focus:outline-none flex items-center justify-between ${
                      activePage === link.id
                        ? 'bg-brand-blue/5 text-brand-light-blue'
                        : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {'isDrop' in link && (link as any).isDrop && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 text-[8px] font-black tracking-normal border border-amber-400/40">
                        DECEMBER DROP
                      </span>
                    )}
                  </button>
                ))}
                
                <div className="pt-4 flex justify-between items-center px-4 border-t border-slate-100 mt-3">
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
    </header>
  );
}
