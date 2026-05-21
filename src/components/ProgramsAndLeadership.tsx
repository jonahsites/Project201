import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Dumbbell, 
  Apple, 
  Shirt, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  User, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Calendar,
  Layers,
  Activity,
  Heart
} from 'lucide-react';

export default function ProgramsAndLeadership() {
  const [activeTab, setActiveTab] = useState<'programs' | 'standards' | 'leadership'>('programs');

  const programs = [
    {
      id: "mentorship",
      title: "YOUTH MENTORSHIP & DEVELOPMENT",
      icon: Users,
      color: "from-brand-blue/10 to-brand-light-blue/5",
      borderColor: "border-brand-blue/10 hover:border-brand-blue/30",
      points: [
        "One-on-one and group mentorship",
        "Leadership, accountability, and life skills",
        "Behavioral skill building and emotional regulation"
      ]
    },
    {
      id: "athletic",
      title: "ATHLETIC & PHYSICAL DEVELOPMENT",
      icon: Dumbbell,
      color: "from-amber-500/5 to-orange-500/5",
      borderColor: "border-orange-500/10 hover:border-orange-500/30",
      points: [
        "Free and low-cost youth sports opportunities",
        "Structured play and movement-based programming",
        "Multi-sport exposure to build confidence and physical literacy",
        "Boxing fundamentals used as a tool for discipline, fitness, and self-confidence",
        "Age-appropriate strength & conditioning"
      ]
    },
    {
      id: "health",
      title: "HEALTH, WELLNESS & NUTRITION",
      icon: Apple,
      color: "from-emerald-500/5 to-teal-500/5",
      borderColor: "border-emerald-500/10 hover:border-emerald-500/30",
      points: [
        "Youth nutrition education",
        "Healthy habits and lifestyle coaching",
        "Movement-based wellness programming"
      ]
    },
    {
      id: "creative",
      title: "CREATIVE & WORKFORCE SKILLS-DEV",
      icon: Shirt,
      color: "from-violet-500/5 to-fuchsia-500/5",
      borderColor: "border-violet-500/10 hover:border-violet-500/30",
      points: [
        "Custom apparel and design projects (vinyl heat press & embroidery exposure)",
        "Creativity with structure and accountability",
        "Focus, task completion, and responsibility-building"
      ]
    },
    {
      id: "family",
      title: "FAMILY & PARENT SUPPORT",
      icon: HeartHandshake,
      color: "from-rose-500/5 to-pink-500/5",
      borderColor: "border-rose-500/10 hover:border-rose-500/30",
      points: [
        "Family bonding activities and group experiences (family trips, community outings)",
        "Parent coaching and guidance",
        "Support with routines, structure, and accountability",
        "Collaboration with schools and care teams"
      ]
    }
  ];

  const whyWorks = [
    {
      title: "Consistent, Vetted Mentors",
      desc: "No rotating staff. Dedicated professionals build stable, long-term bonds with each individual."
    },
    {
      title: "Structure, Discipline & Accountability",
      desc: "Built organically into every movement-based and mentorship training session."
    },
    {
      title: "Confidence Through Movement",
      desc: "Youth learn self-restraint, respect, and emotional control by training through challenges."
    },
    {
      title: "Positive Role Models",
      desc: "Both male and female community leadership setting healthy, reliable paths forward."
    },
    {
      title: "Complementary Care Network",
      desc: "Fully designed to complement existing school systems, CMO groups, and clinical service tracks."
    },
    {
      title: "Proven Non-Traditional Engagement",
      desc: "Demonstrated success and real connection with youth who struggle in conventional settings."
    }
  ];

  const standards = [
    { text: "Programs led by certified and nationally recognized instructors and coaches", highlight: true },
    { text: "Rutgers Youth Sports Safety Council - Certified Instructor leadership" },
    { text: "USA Boxing-registered coaching credentials" },
    { text: "QPR Suicide Prevention Gatekeeper Instructor (New Jersey)" },
    { text: "Mental Health First Aid Certified" },
    { text: "Internal training standards for all Project 201 coaches and mentors" },
    { text: "Background checks and required clearances" },
    { text: "Age-appropriate, trauma-aware programming" }
  ];

  const credentialsList = [
    "Behavioral Assistant (CMO / PerformCare)",
    "Certified Personal Trainer & Nutritionist",
    "Strength & Conditioning Certified",
    "Rutgers Youth Sports Safety Council Certified Instructor",
    "QPR Suicide Prevention Gatekeeper Instructor"
  ];

  return (
    <section id="programs-leadership" className="py-24 border-t border-b border-slate-100 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3">
              Comprehensive Growth Directory
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 uppercase">
              PROGRAMS, STANDARDS <br className="hidden md:block"/>
              <span className="text-brand-light-blue">&amp; LEADERSHIP</span>
            </h2>
          </div>
          
          {/* Navigation Toggles */}
          <div className="flex flex-wrap gap-2 bg-slate-200/60 p-1.5 rounded-2xl self-start lg:self-end">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-5 py-2.5 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'programs'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Our Programs &amp; Services
            </button>
            <button
              onClick={() => setActiveTab('standards')}
              className={`px-5 py-2.5 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'standards'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Why It Works &amp; Standards
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`px-5 py-2.5 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'leadership'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Leadership Spotlight
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {programs.map((prog, index) => {
                const Icon = prog.icon;
                return (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-3xl p-8 border ${prog.borderColor} transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between`}
                  >
                    <div>
                      {/* Header icon + name */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-brand-blue mb-6 border border-brand-blue/5`}>
                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-slate-800 mb-6 uppercase tracking-tight leading-snug">
                        {prog.title}
                      </h3>

                      <ul className="space-y-4">
                        {prog.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex gap-3 items-start">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-light-blue shrink-0 animate-pulse" />
                            <span className="text-slate-600 text-sm font-light leading-relaxed">
                              {pt}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-brand-blue/60 group-hover:text-brand-blue font-display text-[10px] font-bold uppercase tracking-widest">
                      <span>PROJECT 201 APPROVED</span>
                      <Sparkles className="w-3.5 h-3.5 text-brand-light-blue" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'standards' && (
            <motion.div
              key="standards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Why Project 201 Works Section */}
              <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-0.5 w-8 bg-brand-light-blue"></span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 uppercase">
                    Why Project 201 Works
                  </h3>
                </div>
                <p className="text-slate-600 font-light mb-10 text-sm md:text-base leading-relaxed">
                  We built our framework around stable real-world relationships and functional skill-building. Contrast to standard programs, we are deep on consistency, and movement as a catalyst for behavior modification.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {whyWorks.map((work, idx) => (
                    <div key={idx} className="space-y-2 border-l border-brand-light-blue/20 pl-4 hover:border-brand-light-blue transition-colors duration-300">
                      <h4 className="font-display font-bold text-slate-800 text-sm uppercase tracking-tight">
                        {work.title}
                      </h4>
                      <p className="text-slate-500 font-light text-xs leading-relaxed">
                        {work.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Standards Section */}
              <div className="lg:col-span-5 bg-brand-blue text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-light-blue rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-8">
                    <ShieldCheck className="w-6 h-6 text-brand-light-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-light-blue">
                      TRUST &amp; COMPLIANCE
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-light text-white mb-6 uppercase tracking-tight">
                    PROGRAM STANDARDS <br/>
                    <span className="text-brand-light-blue font-bold">&amp; SAFETY</span>
                  </h3>

                  <ul className="space-y-4">
                    {standards.map((std, idx) => (
                      <li key={idx} className="flex gap-4 items-start py-2.5 border-b border-white/5 last:border-0">
                        <CheckCircle2 className="w-4 h-4 text-brand-light-blue mt-0.5 shrink-0" />
                        <span className={`text-sm ${std.highlight ? 'text-white font-bold' : 'text-white/80 font-light'} leading-snug`}>
                          {std.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-10 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-brand-light-blue font-display text-[11px] font-bold uppercase tracking-widest">
                    TRAUMA-AWARE &amp; CLEARANCE CHECKED
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leadership' && (
            <motion.div
              key="leadership"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light-blue/5 rounded-full blur-3xl" />
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  
                  {/* Photo Section */}
                  <div className="w-48 h-48 md:w-60 md:h-60 shrink-0 relative">
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-lg bg-slate-100 flex items-center justify-center relative">
                      <User className="absolute w-20 h-20 text-slate-350" strokeWidth={1} />
                      <div className="absolute inset-0 bg-brand-blue/5 flex items-center justify-center">
                        <span className="font-display font-bold text-3xl text-brand-blue opacity-45">S.K</span>
                      </div>
                    </div>
                    {/* Badge Decoration */}
                    <div className="absolute -bottom-4 -right-4 bg-brand-blue text-white w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg text-center p-2">
                      <Award className="w-5 h-5 text-brand-light-blue" />
                      <span className="text-[7.5px] font-bold uppercase tracking-wider block mt-0.5">FOUNDER</span>
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="space-y-6 flex-1 text-center md:text-left">
                    <div>
                      <span className="px-3.5 py-1.5 bg-brand-blue/5 text-brand-blue text-[10px] font-bold tracking-widest uppercase rounded-full inline-block mb-3">
                        Executive Leadership
                      </span>
                      <h3 className="font-display text-3xl font-bold text-slate-900 mb-1">
                        SHAWN KELLY
                      </h3>
                      <p className="text-brand-light-blue font-bold text-xs uppercase tracking-[0.2em]">
                        Founder &amp; Executive Director / Youth Development Specialist
                      </p>
                    </div>

                    <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                      Shawn Kelly oversees all operational planning and strategic coordination. Combining dynamic program development with a deeply structured, trauma-aware youth sports curriculum, Shawn ensures every session maximizes emotional regulation and character stability.
                    </p>

                    <div>
                      <h4 className="font-display text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 justify-center md:justify-start">
                        <Award className="w-4 h-4 text-brand-blue" />
                        Professional Credentials
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {credentialsList.map((cred, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-100 text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-light tracking-wide inline-block"
                          >
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
