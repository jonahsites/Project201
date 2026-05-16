import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Trophy, Clock, Users, Target } from 'lucide-react';
import { BentoPricing } from './ui/bento-pricing';

interface HudsonGivesDetailProps {
  onBack: () => void;
}

export const HudsonGivesDetail = ({ onBack }: HudsonGivesDetailProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs hover:text-brand-light-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <img 
            src="https://gg-day-of-giving.s3.amazonaws.com/njhudson2026/app/images/day-of-giving-logo-horizontal.svg" 
            alt="Hudson Gives" 
            className="h-10"
          />
          <div className="hidden md:block">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Jersey City Foundation</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-[#14b8a6] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tight mb-6">
              Sponsor a Youth
            </h1>
            <p className="text-xl md:text-2xl font-light italic mb-12 opacity-90">
              Strengthen the Community • Build Relationships • Change Lives
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="space-y-2">
                  <span className="block text-5xl font-bold">$825</span>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">Raised of $15,000</span>
                </div>
                <div className="space-y-4">
                   <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6%" }}
                        className="h-full bg-[#f97316]"
                      />
                   </div>
                   <span className="text-2xl font-bold">6% Progress</span>
                </div>
                <div className="space-y-2">
                  <span className="block text-5xl font-bold">7</span>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">Passionate Donors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://static.wixstatic.com/media/11062b_e31e7af5f57e45deabe91d4c2b0e697b~mv2.jpg/v1/fill/w_1448,h_965,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_e31e7af5f57e45deabe91d4c2b0e697b~mv2.jpg" 
                    alt="Project 201 Team Huddle" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Our Story */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#14b8a6]/10 rounded-2xl flex items-center justify-center text-[#14b8a6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-blue uppercase tracking-tight">Our Story</h2>
                </div>
                
                <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
                  <h3 className="text-2xl font-bold text-slate-800 italic">It Started With One Parent</h3>
                  <p>Project 201 started with a simple request. A parent reached out and asked, <span className="font-bold text-brand-blue">“Can you mentor my son?”</span></p>
                  <p>There was no program. No funding. No organization. Just one young person who needed guidance—and a decision to show up.</p>
                  
                  <h3 className="text-2xl font-bold text-slate-800 italic mt-10">From One to Many</h3>
                  <p>That one relationship turned into another. Then another. Families began reaching out. Kids needed structure, discipline, and someone who believed in them.</p>
                  <p>What started with one child quickly became something bigger.</p>

                  <h3 className="text-2xl font-bold text-slate-800 italic mt-10">Why It Matters</h3>
                  <p>Too many kids today are: Falling through the cracks, Misunderstood instead of guided, Lacking consistent role models.</p>
                  <p>We step in to provide what’s missing—structure, accountability, and belief.</p>

                  <h3 className="text-2xl font-bold text-slate-800 italic mt-10">Real Impact</h3>
                  <p>We’ve worked with youth who successfully came off probation, improved behavior at home and school, and built confidence, discipline, and direction.</p>
                  <p>This is real impact happening in our communities.</p>

                  <h3 className="text-2xl font-bold text-slate-800 italic mt-10">Where You Come In</h3>
                  <p>Your donation helps us reach more youth and families, provide safe, structured programs, expand mentorship opportunities, and continue showing up—every single day.</p>
                </div>
              </div>

              {/* What We Do */}
              <div className="space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-blue uppercase tracking-tight">What We Do</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "One-on-one mentorship",
                    "Athletics and fitness-based development",
                    "Sports training and life skills",
                    "Support for youth facing behavioral and life challenges"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#14b8a6] shrink-0 mt-1" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-brand-blue font-bold italic text-lg text-center mt-6">
                  We don’t just run programs. We build relationships.
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="space-y-12">
                 <h2 className="text-3xl font-bold text-brand-blue uppercase tracking-tight text-center">Support the Mission</h2>
                 <BentoPricing />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Matches */}
              <div className="bg-[#f97316]/5 border border-[#f97316]/10 p-8 rounded-[2.5rem] space-y-6">
                <div className="flex items-center gap-4 text-[#f97316]">
                  <Trophy className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-widest">Active Matches</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f97316]/20">
                    <span className="block text-xs font-bold text-[#f97316] uppercase mb-2">Exchange Place Alliance</span>
                    <h4 className="font-bold text-brand-blue mb-2">2:01 Match Minute</h4>
                    <p className="text-sm text-slate-500 mb-4 font-light">Donations made at exactly 2:01 PM will be doubled up to $250!</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">$10,000 Match</span>
                      <span className="text-xs font-bold text-[#f97316]">$95 Remaining</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f97316]/20 opacity-60">
                    <span className="block text-xs font-bold text-[#f97316] uppercase mb-2">Exchange Place Alliance</span>
                    <h4 className="font-bold text-brand-blue mb-2">5:51 Match Minute</h4>
                    <p className="text-sm text-slate-500 font-light">All donations matched up to $250.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">$10,000 Match</span>
                      <span className="text-xs font-bold text-[#f97316]">$25 Remaining</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Fundraisers */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-brand-blue uppercase tracking-widest text-sm">Top Fundraisers</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center font-bold text-brand-blue">1</div>
                      <span className="font-medium text-slate-700">Coach Fischer</span>
                    </div>
                    <span className="font-bold text-brand-blue">$100.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center font-bold text-brand-blue">2</div>
                      <span className="font-medium text-slate-700">Shawn Kelly</span>
                    </div>
                    <span className="font-bold text-slate-400">$0.00</span>
                  </div>
                </div>
              </div>

              {/* Recent Donors */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Recent Donors</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { name: "Istvan Fulop", amount: "$100" },
                    { name: "Monica Harwell", amount: "$25" },
                    { name: "Edith Nolan", amount: "$25" },
                    { name: "SHARON RICCARDI", amount: "$25" },
                    { name: "Mark Fischer", amount: "$100" }
                  ].map((donor, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600 italic">"{donor.name}"</span>
                      <span className="font-bold text-[#14b8a6]">{donor.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white/50 text-sm">
        <div className="container mx-auto px-4 text-center space-y-4">
          <img 
            src="https://gg-day-of-giving.s3.amazonaws.com/njhudson2026/app/images/day-of-giving-logo-horizontal.svg" 
            alt="Hudson Gives" 
            className="h-8 mx-auto mb-8 invert opacity-50"
          />
          <p>Hudson Gives 2026 | Hudson County (NJ) Chamber Foundation</p>
          <div className="flex justify-center gap-8 font-bold uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Toolkit</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <p className="pt-8 border-t border-white/5">Powered by Bonterra</p>
        </div>
      </footer>
    </div>
  );
};
