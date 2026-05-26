import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { BentoPricing } from './ui/bento-pricing';

interface DonatePageProps {
  onDonate: (amount?: string) => void;
}

export default function DonatePage({ onDonate }: DonatePageProps) {
  const previousDonations = [
    { name: "Anonymous Support", amount: 500, time: "2 hours ago", focus: "Sports Equipment" },
    { name: "Jersey City Local Sponsor", amount: 250, time: "1 day ago", focus: "Recess Programs" },
    { name: "Community Ally", amount: 150, time: "3 days ago", focus: "Mentorship Support" },
    { name: "Family Advocate", amount: 100, time: "4 days ago", focus: "Boxing Materials" }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* Page Hero */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-light-blue rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block mb-3 font-display">
            Invest in Statewide Growth
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            SUPPORT PROJECT 201 <br />
            <span className="font-bold text-brand-light-blue">&amp; SHAPE LIVES</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Your generous tax-deductible sponsorship directly guarantees structured movement, 1-on-1 counselor coordinate mentorship, and safe sports environments for NJ youth.
          </p>
        </div>
      </section>

      {/* Main Campaign tracking & Bento grid options */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Bento Tiers Grid (8 Columns code block) */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex flex-col gap-3">
                <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
                  Sponsorship Level Select
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-slate-900 tracking-tight leading-none">
                  Select Your Impact Level
                </h2>
                <p className="text-slate-650 font-light text-xs md:text-sm leading-relaxed">
                  Every level corresponds with verified support deliverables. Hover and tap an option to begin.
                </p>
              </div>

              {/* Bento Grid layout */}
              <BentoPricing onSelect={onDonate} />

              {/* Direct message card */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-105 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Heart className="w-5 h-5 text-brand-light-blue" />
                  </div>
                  <h3 className="font-display font-medium text-slate-850 text-base uppercase tracking-wider">
                    How We Allocate Your Subscriptions
                  </h3>
                </div>
                <p className="text-slate-600 font-light text-xs md:text-sm leading-relaxed">
                  At Project 201, transparency is fundamental. 100% of all public contributions go directly toward coordinating direct youth support, maintaining state Rutgers safety certifications, provisioning boxing fundamentals equipment, and funding annual family group trips. None of our mentors rotate—we ensure stability.
                </p>
              </div>
            </div>

            {/* Campaign details & live progress tracker (4 Columns) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              
              {/* Progress Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  PROJECT 201 SPONSORSHIP
                </h3>
                
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-bold uppercase tracking-widest font-display">Statewide</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-bold uppercase tracking-widest font-display">Charity</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-end justify-between font-display">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">SUPPORT RAISED</span>
                      <span className="text-3xl font-black text-brand-blue">$5,420</span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold font-display">of $25,500 goal</span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-light-blue rounded-full w-[21%]" />
                  </div>
                </div>

                <p className="text-slate-450 text-xs font-bold uppercase tracking-widest mb-8 block font-display">
                  21% Raised • 14 Donations
                </p>

                <div className="space-y-4">
                  <button 
                    onClick={() => onDonate()}
                    className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-brand-blue/15"
                  >
                    Sponsor via Custom Amount
                  </button>
                </div>
              </div>

              {/* Live donor huddling list */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg">
                <h4 className="text-slate-800 font-bold text-xs uppercase tracking-widest mb-4 font-display flex items-center justify-between">
                  <span>Recent Advocates</span>
                  <Clock className="w-3.5 h-3.5 text-brand-light-blue animate-spin-slow" />
                </h4>

                <div className="space-y-4">
                  {previousDonations.map((d, dIdx) => (
                    <div key={dIdx} className="flex justify-between items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold font-display uppercase shrink-0">
                          {d.name.substring(0, 1)}
                        </div>
                        <div>
                          <span className="block text-slate-755 font-bold text-xs leading-none">{d.name}</span>
                          <span className="text-[10px] text-brand-light-blue font-bold tracking-tight block mt-1">Focus: {d.focus}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-brand-blue text-xs">${d.amount}</span>
                        <span className="text-slate-400 text-[9px] font-light">{d.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust standards */}
      <section className="bg-slate-900 text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-2">
          <ShieldCheck className="w-6 h-6 text-brand-light-blue mx-auto mb-2" />
          <p className="text-slate-400 font-light text-[11px] leading-relaxed">
            Project 201 guarantees full regulatory security. All payment methods, records, and billing entities are processed under state-vetted, SSL-encrypted systems. Your supporting details are private and secure.
          </p>
        </div>
      </section>
    </div>
  );
}
