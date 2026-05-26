import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero({ onDonate, onLearnMore }: { onDonate?: () => void, onLearnMore?: () => void }) {
  const logos = [
    { name: '201 Sports', logo: '201 SPORTS' },
    { name: '201 Boxing', logo: '201 BOXING' },
    { name: 'Mentorship', logo: 'MENTORSHIP' },
    { name: 'Schools', logo: 'SCHOOLS' },
    { name: 'Summer Acad', logo: 'SUMMER ACAD' },
    { name: 'NJ Dev', logo: 'NJ STATEWIDE' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1_wWCoskagS7gXofuguJYWOebpUeHiBSV" 
          alt="Youth sports training" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-[11vw] md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            Empowering youth.<br />
            <span className="opacity-90">Building leaders.</span>
          </h1>
          
          <div className="w-24 h-1 bg-white/20 mb-8" />

          <p className="max-w-xl text-xl md:text-2xl text-slate-200 mb-10 font-medium leading-tight tracking-tight opacity-80">
            For dedicated student-athletes, ambitious youth, and the communities that support them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onDonate?.()}
              className="bg-brand-light-blue hover:bg-white text-brand-blue px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-display uppercase tracking-wider"
            >
              Donate Now
            </button>
            <button 
              onClick={() => onLearnMore?.()}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-4 rounded-2xl font-bold text-lg transition-all border border-white/20 text-center cursor-pointer font-display uppercase tracking-wider"
            >
              Our Programs
            </button>
          </div>
        </motion.div>
      </div>

      {/* Logo Strip - following the 11x image design */}
      <div className="absolute bottom-12 left-0 right-0 z-10 overflow-hidden py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {logos.map((logo) => (
              <span key={logo.name} className="font-display font-bold text-white text-xl md:text-2xl tracking-tighter">
                {logo.logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 right-6 text-white/30 hidden lg:flex items-center gap-4"
      >
        <span className="text-xs font-bold uppercase tracking-widest font-display">Scroll to explore</span>
        <div className="w-px h-12 bg-white/20" />
      </motion.div>
    </section>
  );
}
