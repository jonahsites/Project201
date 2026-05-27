import React from 'react';
import { motion } from 'motion/react';
import { 
  Dumbbell, 
  Users, 
  School, 
  Sun, 
  ShieldCheck, 
  Zap, 
  Target, 
  Sparkles, 
  Award,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function ProgramsPage({ onDonate }: { onDonate?: () => void }) {
  const customPrograms = [
    {
      title: "201 Sports",
      sub: "Athletic Excellence & Fundamentals",
      icon: Dumbbell,
      image: "https://lh3.googleusercontent.com/d/1kdjoEnKj7ITTgvZst4SBW2vxWJc815tH",
      bannerText: "ATHLETICS",
      color: "from-brand-blue to-blue-900",
      description: "Comprehensive athletic performance training designed to cultivate high physical literacy, speed, agility, and overall body coordination. We prep young athletes with elite physical instruction and solid mechanics.",
      highlights: [
        "Speed & agility performance drills",
        "Fundamentals of team & individual sports",
        "D1 collegiate preparatory guidance",
        "Coaches trained in Rutgers Youth Safety Council standards"
      ]
    },
    {
      title: "201 Boxing",
      sub: "Discipline, Endurance & Respect",
      icon: Target,
      image: "https://lh3.googleusercontent.com/d/1ROHQVD1Y3HSF7tsmNQHt5cX_t3zaM6G3",
      bannerText: "COMBAT SPORTS",
      color: "from-amber-600 to-orange-850",
      description: "Boxing fundamentals utilized specifically as a powerful tool for self-discipline, inner confidence, cardiovascular endurance, and physical control. Youth learn self-restraint alongside hard physical training.",
      highlights: [
        "USA Boxing registered coaching curriculum",
        "No-contact & light-contact controlled training environments",
        "Emotional regulation & anger-outlet coaching",
        "Focus, hand-eye coordination, and heavy bag drills"
      ]
    },
    {
      title: "Mentorship Circle",
      sub: "Character, Emotional Control & Life Skills",
      icon: Users,
      image: "https://lh3.googleusercontent.com/d/1fZM9VMinL-zEooGvoSWp1kS7sgpuhMgT",
      bannerText: "MESSENGER CIRCLES",
      color: "from-emerald-750 to-teal-900",
      description: "A structured, high-energy Peer Mentor sequence focused on leadership and real emotional confidence. Our circles operate group-wide accountability, allowing teens to support and challenge each other to grow.",
      highlights: [
        "Individual mentor alignments (consistent role models)",
        "Weekly group development and progress journaling",
        "Cooperation on task completion and personal work responsibility",
        "Support with emotional processing & self-control patterns"
      ],
      specialPanel: {
        title: "Project 201 Mentorship Circle — Bayonne Chapter",
        locationText: "Hosted in Bayonne at San Vito's — Partnered & Sponsored by San Vito’s Restaurant & Pizzeria",
        stats: { current: 4, goal: 10 },
        focus: ["Leadership", "Accountability", "Communication", "Confidence", "Positive Peer Support", "Mentorship and Life Skills"],
        expansionText: "Project 201 is actively looking to partner with schools, restaurants, businesses, and community organizations to bring Mentorship Circles to additional cities and communities across New Jersey.",
        ctaText: "Interested in bringing a Project 201 Mentorship Circle to your town or organization?"
      }
    },
    {
      title: "School Programs",
      sub: "Direct Educational Collaborations",
      icon: School,
      image: "https://lh3.googleusercontent.com/d/1lbP930zRdCQzjdChwW7QG8Dr_sulYcma",
      bannerText: "DISTRICTS & SCHOOLS",
      color: "from-violet-850 to-purple-950",
      description: "Direct on-campus playground engagement, physical literacy recess workshops, and specialized afterschool programs. We partner directly with counselors to match curriculum goals and target concerns.",
      highlights: [
        "Recess support & structured physical movement programs",
        "Direct tracking coordination with school social services",
        "Mentorship sessions on-site for custom groups",
        "Classroom reintegration prep and routine management"
      ]
    },
    {
      title: "Summer Programs",
      sub: "High Impact Summer Camps & Activities",
      icon: Sun,
      image: "https://lh3.googleusercontent.com/d/1_wWCoskagS7gXofuguJYWOebpUeHiBSV",
      bannerText: "SUMMER ACADEMY",
      color: "from-rose-600 to-pink-900",
      description: "Project 201 coordinates highly specialized athletic courses and leadership-building outings. Here are the core development programs we currently operate and the full suite of community-tailored activities we can introduce:",
      highlights: [
        "Boxing Fundamentals",
        "Flag Football & Baseball",
        "Basketball Development",
        "Speed & Agility Instruction",
        "Strategic Chess Coaching",
        "Mentorship Circles & Life Skills",
        "Youth Leadership Activities",
        "Structured Team Building",
        "Fitness & Body Conditioning"
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* Hero */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3 font-display">
            The Project 201 Core Framework
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            Our Core <br />
            <span className="font-bold text-brand-light-blue">Programs &amp; branches</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Project 201 operates as the parent umbrella organization. We provide dynamic, movement-based programming designed to build resilient, empathetic, and fully disciplined leaders.
          </p>
        </div>
      </section>

      {/* Program list */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          {customPrograms.map((prog, idx) => {
            const IconComponent = prog.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image panel */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative z-10">
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute inset-0 bg-slate-950/25 mix-blend-multiply" />
                  </div>
                  {/* Decorative tag */}
                  <div className="absolute -top-4 -right-4 z-20 bg-brand-light-blue text-brand-blue font-display text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow">
                    {prog.bannerText}
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-light-blue/5 rounded-full blur-3xl -z-10" />
                </div>

                {/* Info panel */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                      <IconComponent className="w-5 h-5 text-brand-light-blue" />
                    </div>
                    <span className="text-xs font-bold text-brand-light-blue uppercase tracking-widest font-display">
                      {prog.sub}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 uppercase">
                    {prog.title}
                  </h2>

                  <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <h4 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Program Pillars &amp; Standards
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {prog.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex gap-2 items-start">
                          <ShieldCheck className="w-4 h-4 text-brand-light-blue mt-0.5 shrink-0" />
                          <span className="text-slate-700 font-light text-xs leading-snug">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prog.specialPanel && (
                    <div className="mt-8 p-6 bg-slate-900 border border-white/5 rounded-[2rem] space-y-5 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light-blue/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="space-y-1.5 relative z-10">
                        <span className="text-brand-light-blue font-bold uppercase tracking-[0.2em] text-[8px] block font-display">
                          Active Community Initiative
                        </span>
                        <h4 className="font-display text-sm font-bold uppercase tracking-tight text-white leading-tight">
                          {prog.specialPanel.title}
                        </h4>
                        <div className="flex gap-1.5 items-start text-[11px] text-slate-300 font-light">
                          <MapPin className="w-3.5 h-3.5 text-brand-light-blue shrink-0 mt-0.5" />
                          <span>{prog.specialPanel.locationText}</span>
                        </div>
                      </div>

                      {/* Cohort tracker bar */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 relative z-10">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium select-none">Active Cohort Recruitment:</span>
                          <span className="text-white font-bold font-display">{prog.specialPanel.stats.current} / {prog.specialPanel.stats.goal} Youth Enrolled</span>
                        </div>
                        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-brand-light-blue h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${(prog.specialPanel.stats.current / prog.specialPanel.stats.goal) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider pt-0.5 select-none animate-pulse">
                          <span>Current group: {prog.specialPanel.stats.current} youth</span>
                          <span>Inquire for remaining slots: {prog.specialPanel.stats.goal - prog.specialPanel.stats.current} available</span>
                        </div>
                      </div>

                      {/* Expansion appeal */}
                      <div className="space-y-3 relative z-10">
                        <p className="text-slate-400 font-light text-xs leading-relaxed">
                          {prog.specialPanel.expansionText}
                        </p>
                        <p className="text-[11px] font-bold text-brand-light-blue tracking-wide">
                          {prog.specialPanel.ctaText} Please contact us to coordinate.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA section at bottom */}
      <section className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <Award className="w-10 h-10 text-brand-light-blue mx-auto animate-pulse" />
          <h2 className="font-display text-2xl md:text-3xl font-light">
            WANT TO INTRODUCE THESE PROGRAMS TO YOUR CITY OR SCHOOL?
          </h2>
          <p className="text-slate-400 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Project 201 coordinates statewide collaborations. Apply through our partners intake portal to customize athletic training or life mentorship sequences in your community.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => onDonate?.()}
              className="bg-brand-light-blue hover:bg-white text-brand-blue px-8 py-3 rounded-xl font-bold font-display text-xs tracking-wider uppercase transition-all shadow"
            >
              Donation options
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
