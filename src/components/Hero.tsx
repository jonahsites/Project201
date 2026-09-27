import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero({ 
  onDonate, 
  onLearnMore, 
  onSupportClick,
  onHolidayDropClick,
  onVanCampaignClick
}: { 
  onDonate?: () => void;
  onLearnMore?: () => void;
  onSupportClick?: () => void;
  onHolidayDropClick?: () => void;
  onVanCampaignClick?: () => void;
}) {
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
          src="https://lh3.googleusercontent.com/d/17g5VEHcANuRmly8jBswRPBmp6lrgupXq" 
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
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {onVanCampaignClick && (
              <motion.button
                type="button"
                onClick={onVanCampaignClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-display font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer group shadow-lg"
              >
                <span>🍕</span>
                <span>Pizzeria Partner Van Campaign</span>
                <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full ml-1">
                  ZEFFY LIVE
                </span>
                <span className="text-white/60 group-hover:translate-x-0.5 transition-transform">→</span>
              </motion.button>
            )}

            {onHolidayDropClick && (
              <motion.button
                type="button"
                onClick={onHolidayDropClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light-blue/20 hover:bg-brand-light-blue/30 border border-brand-light-blue/40 text-brand-light-blue text-xs sm:text-sm font-display font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>201 EST. 1947 Holiday Drop</span>
                <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full ml-1">
                  DECEMBER DROP
                </span>
                <span className="text-white/60 group-hover:translate-x-0.5 transition-transform">→</span>
              </motion.button>
            )}
          </div>

          <h1 className="font-display text-[11vw] md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            Empowering youth.<br />
            <span className="opacity-90">Building leaders.</span>
          </h1>
          
          <div className="w-24 h-1 bg-white/20 mb-8" />

          <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-slate-200 mb-10 font-normal leading-relaxed opacity-95">
            Project 201 is a New Jersey-based youth mentorship and development organization using mentorship, sports, leadership, and community support to empower the next generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onVanCampaignClick?.()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 rounded-2xl font-black text-base sm:text-lg transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-display uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-300"
            >
              <span>🚐 Support Van Fund</span>
              <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded-full font-bold">Zeffy</span>
            </button>
            <button 
              onClick={() => onLearnMore?.()}
              className="bg-brand-light-blue hover:bg-white text-brand-blue px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-display uppercase tracking-wider text-center"
            >
              Our Branches
            </button>
            <button 
              onClick={() => onSupportClick?.()}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all border border-white/20 text-center cursor-pointer font-display uppercase tracking-wider"
            >
              Get Support
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
