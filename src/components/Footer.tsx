import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onPageChange?: (page: 'home' | 'about' | 'programs' | 'hire' | 'youth-support' | 'partnerships' | 'sponsors' | 'donate' | 'contact' | 'merch') => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/d/1O9W1-AkWLdXANr6KOYuVfeSMT1Zf2zbf" 
                alt="Project 201 Logo" 
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-xl tracking-tight">
                PROJECT 201
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-xs">
              Project 201 is a professional statewide youth organization. We combine structured athletic development and mental health gatekeeper frameworks to guide the next generation of NJ leaders.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/project201nj?utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/project201nj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">Navigation</h4>
            <div className="flex flex-col space-y-4 text-left items-start">
              <button onClick={() => onPageChange?.('home')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Home</button>
              <button onClick={() => onPageChange?.('about')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">About Us</button>
              <button onClick={() => onPageChange?.('programs')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Our Branches</button>
              <button onClick={() => onPageChange?.('merch')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left text-cyan-400 font-semibold">Save Our Youth Merch</button>
              <button onClick={() => onPageChange?.('hire')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left font-semibold text-brand-light-blue">Hire Project 201</button>
              <button onClick={() => onPageChange?.('youth-support')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Get Support</button>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">Connect</h4>
            <div className="flex flex-col space-y-4 text-left items-start">
              <button onClick={() => onPageChange?.('partnerships')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Schools &amp; CMOs</button>
              <button onClick={() => onPageChange?.('sponsors')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Sponsors &amp; Partners</button>
              <button onClick={() => onPageChange?.('contact')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left">Contact Direct</button>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">Coordinated by</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-brand-light-blue/10 rounded-xl flex items-center justify-center text-brand-light-blue">
                   <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm">Shawn Kelly</span>
                  <span className="text-slate-500 text-[10px] font-bold tracking-wider uppercase">Executive Director</span>
                </div>
              </div>
              <a href="mailto:project201inc@gmail.com" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors text-xs">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                   <Mail className="w-4 h-4" />
                </div>
                project201inc@gmail.com
              </a>
              <a href="tel:2017255062" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors text-xs">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                   <Phone className="w-4 h-4" />
                </div>
                201-725-5062
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Area */}
        <div className="py-8 my-8 border-t border-b border-white/5 text-center">
          <p className="text-slate-450 text-xs font-light max-w-3xl mx-auto leading-relaxed">
            Project 201 is a youth mentorship and development organization. We do not provide licensed clinical therapy, psychiatric treatment, or medical services.
          </p>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
          <p className="text-slate-500 text-xs font-light">
            © 2026 Project 201. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-slate-650 text-[10px] font-bold uppercase tracking-widest">Apparel Powered by</span>
            <a 
              href="https://www.instagram.com/201customsllc?utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-light-blue hover:text-white transition-colors font-bold tracking-tight text-xs uppercase border border-brand-light-blue/20 bg-brand-light-blue/5 px-2.5 py-1 rounded-lg"
            >
              201 Customs LLC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
