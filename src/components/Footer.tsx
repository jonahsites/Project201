import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="https://lh3.googleusercontent.com/d/1O9W1-AkWLdXANr6KOYuVfeSMT1Zf2zbf" 
                alt="Project 201 Logo" 
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-xl tracking-tight">
                PROJECT 201
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed mb-8">
              Empowering youth through mentorship and sports excellence. Shaping well-rounded individuals who are prepared to excel both on and off the field.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-8 uppercase text-brand-light-blue tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#donations" className="text-slate-400 hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-8 uppercase text-brand-light-blue tracking-widest">Hours</h4>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <span className="block text-xl font-bold font-display uppercase tracking-widest mb-1">All Day</span>
              <span className="text-brand-light-blue font-bold uppercase tracking-[0.2em] text-xs">Every Single Day</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-8 uppercase text-brand-light-blue tracking-widest">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-brand-light-blue/10 rounded-xl flex items-center justify-center text-brand-light-blue">
                   <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold">Shawn Kelly</span>
                  <span className="text-slate-500 text-sm">Founder & Coach</span>
                </div>
              </div>
              <a href="mailto:skelly201sports@yahoo.com" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                   <Mail className="w-5 h-5" />
                </div>
                skelly201sports@yahoo.com
              </a>
              <a href="tel:2017255062" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                   <Phone className="w-5 h-5" />
                </div>
                201-725-5062
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-light">
            © 2026 Project 201 Sports. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">Powered by</span>
            <span className="text-brand-light-blue font-bold tracking-tight">BONTERRA</span>
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
  )
}
