import React, { useState } from 'react';
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
  Clock,
  Mail,
  Copy,
  Check,
  Building2,
  MapPin,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { BentoPricing } from './ui/bento-pricing';

interface DonatePageProps {
  onDonate: (amount?: string) => void;
}

export default function DonatePage({ onDonate }: DonatePageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const text = "Project 201\n576 Avenue A\nBayonne, NJ 07002";
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
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
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            Help Us Build Stronger Youth, <br />
            <span className="text-brand-light-blue font-light">Stronger Families, and Stronger Communities.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-350 font-light text-xs md:text-sm leading-relaxed">
            Donations support mentorship, leadership development, sports programming, educational opportunities, and positive role models for youth across New Jersey, helping them make positive life decisions. At Project 201, we believe sports are just one of the tools we use to guide the next generation.
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

              {/* Donate by Check / Mail Section */}
              <div className="bg-gradient-to-br from-brand-blue to-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 border border-brand-light-blue/20 shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-light-blue/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-light-blue animate-pulse" />
                      <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
                        Offline Giving &amp; Check Contributions
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                      Donate by Mail or Check
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyAddress}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/10 cursor-pointer shrink-0"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Address Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-brand-light-blue" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Text & Address details */}
                  <div className="md:col-span-7 space-y-5">
                    <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed">
                      If you would like to donate to <strong className="text-white font-semibold">Project 201</strong>, please send a check made payable to <strong className="text-brand-light-blue font-bold">Project 201</strong> to:
                    </p>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-1.5 shadow-inner">
                      <div className="flex items-center gap-2 text-brand-light-blue mb-2 font-display text-xs font-bold uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        <span>Mailing Address Coordinates</span>
                      </div>
                      <p className="font-display text-lg md:text-xl font-black text-white tracking-wide uppercase">
                        Project 201
                      </p>
                      <p className="font-sans text-base text-slate-100 font-medium tracking-wide">
                        576 Avenue A
                      </p>
                      <p className="font-sans text-base text-slate-100 font-medium tracking-wide">
                        Bayonne, NJ 07002
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="text-brand-light-blue font-display text-sm md:text-base font-bold tracking-wide uppercase flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
                        We thank you for your support!
                      </p>
                      <p className="text-slate-400 text-xs font-light mt-1">
                        Checks will be processed promptly and an official tax-deductible donor acknowledgment letter will be issued to your return address.
                      </p>
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div className="md:col-span-5">
                    <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-brand-light-blue/50 transition-all min-h-[220px]">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-brand-light-blue mb-3 group-hover:scale-110 transition-transform shadow-lg">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-light-blue uppercase tracking-widest font-display mb-1 block">
                        Image Placeholder
                      </span>
                      <h4 className="font-display font-bold text-white text-sm uppercase tracking-tight">
                        Project 201
                      </h4>
                      <p className="text-slate-350 text-[11px] font-light mt-0.5">
                        576 Avenue A, Bayonne, NJ 07002
                      </p>
                      <div className="mt-3 px-3 py-1 bg-white/10 rounded-full text-[9px] font-mono text-slate-300">
                        Facility / Mailing Center Asset
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporters & Community Partners Section */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-105 shadow-sm space-y-6">
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
                    Our Backers &amp; Allies
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-slate-900 tracking-tight">
                    Supporters &amp; Community Partners
                  </h3>
                  <p className="text-slate-650 font-light text-xs md:text-sm leading-relaxed">
                    We are deeply grateful to the corporate foundations, local businesses, and anonymous patrons whose generous sponsorships empower our daily youth operations.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Partner 1 */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-brand-blue/10 transition-all">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider font-display">Grant Ally</span>
                      </div>
                      <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">
                        New York Giants
                      </h4>
                      <p className="text-slate-500 font-light text-[11px] mt-1 leading-relaxed">
                        NFL Foundation &amp; youth development grant support coordinates.
                      </p>
                    </div>
                  </div>

                  {/* Partner 2 */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-brand-blue/10 transition-all">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider font-display">Local Sponsor</span>
                      </div>
                      <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">
                        Dawn’s Auto Body
                      </h4>
                      <p className="text-slate-500 font-light text-[11px] mt-1 leading-relaxed">
                        Jersey City community youth sponsorships and local athletic support.
                      </p>
                    </div>
                  </div>

                  {/* Partner 3: Anonymous Support option */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-brand-blue/10 transition-all">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-display">Patron Support</span>
                      </div>
                      <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">
                        Anonymous Donors
                      </h4>
                      <p className="text-slate-500 font-light text-[11px] mt-1 leading-relaxed">
                        Honoring the parents, individuals, and families choosing to support privately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secure / Option description */}
                <div className="bg-brand-blue/5 border border-brand-light-blue/20 p-4 rounded-xl flex items-start gap-3 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-brand-light-blue shrink-0 mt-0.5" />
                  <p className="text-[11px] font-light leading-relaxed">
                    <strong>Would your organization like to support?</strong> You can choose to be recognized on our official donor board or opt to remain completely anonymous when processing your donation via our secure Zeffy platform.
                  </p>
                </div>
              </div>

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
              
              {/* Direct Sponsor Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">
                  Sponsor Project 201
                </h3>
                
                <div className="flex gap-2 mb-5">
                  <span className="px-3 py-1 bg-brand-blue/5 text-brand-blue rounded-full text-[9px] font-bold uppercase tracking-widest font-display">100% Direct</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest font-display">State-Vetted</span>
                </div>

                <p className="text-slate-600 font-light text-xs leading-relaxed mb-6">
                  Your direct financial sponsorship funds active 1-on-1 accountability plans, meals, safety-qualified training, and group community outings.
                </p>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-brand-light-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Direct Delivery</h4>
                      <p className="text-[10px] text-slate-550">Every dollar equips the Keyport and Bayonne programs directly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-brand-light-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Safety First</h4>
                      <p className="text-[10px] text-slate-550">Coaches hold current Rutgers Safety &amp; CPR qualifications.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-brand-light-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Reliable Stability</h4>
                      <p className="text-[10px] text-slate-550">Constant check-ins create dependable structure for youth.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => onDonate()}
                    className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-brand-blue/15 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
