import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight,
  Waves,
  Apple,
  Activity,
  ExternalLink,
  Phone,
  Mail,
  Check,
  X,
  Clock,
  Compass,
  Building,
  Send,
  Calendar,
  Info
} from 'lucide-react';

interface ProgramsPageProps {
  onDonate?: () => void;
  onNavigate?: (page: 'home' | 'about' | 'programs' | 'hire' | 'youth-support' | 'partnerships' | 'sponsors' | 'donate' | 'contact') => void;
}

export default function ProgramsPage({ onDonate, onNavigate }: ProgramsPageProps) {
  // Modal state variables
  const [activeFlyer, setActiveFlyer] = useState<'bayonne' | 'keyport' | null>(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [interestChapter, setInterestChapter] = useState<'bayonne' | 'keyport' | null>(null);
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [showBayonneRegisterForm, setShowBayonneRegisterForm] = useState(false);

  // Form states
  const [interestData, setInterestData] = useState({
    name: '',
    parentName: '',
    email: '',
    phone: '',
    age: '14',
    questions: ''
  });

  const [communityData, setCommunityData] = useState({
    repName: '',
    orgType: 'school',
    orgName: '',
    city: '',
    email: '',
    phone: '',
    timeline: 'fall_2026',
    message: ''
  });

  const [registerData, setRegisterData] = useState({
    childName: '',
    age: '13',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    disclosures: '',
    rulesAccepted: false
  });

  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Save locally to simulate persistence
      const submissions = JSON.parse(localStorage.getItem('mentorship_interests') || '[]');
      submissions.push({ ...interestData, chapter: interestChapter, date: new Date().toISOString() });
      localStorage.setItem('mentorship_interests', JSON.stringify(submissions));

      setIsSubmitting(false);
      setSubmissionFeedback('interest_success');
      setInterestData({
        name: '',
        parentName: '',
        email: '',
        phone: '',
        age: '14',
        questions: ''
      });
    }, 1200);
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('community_circle_requests') || '[]');
      submissions.push({ ...communityData, date: new Date().toISOString() });
      localStorage.setItem('community_circle_requests', JSON.stringify(submissions));

      setIsSubmitting(false);
      setSubmissionFeedback('community_success');
      setCommunityData({
        repName: '',
        orgType: 'school',
        orgName: '',
        city: '',
        email: '',
        phone: '',
        timeline: 'fall_2026',
        message: ''
      });
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('bayonne_registrants') || '[]');
      submissions.push({ ...registerData, date: new Date().toISOString() });
      localStorage.setItem('bayonne_registrants', JSON.stringify(submissions));

      setIsSubmitting(false);
      setSubmissionFeedback('register_success');
      setRegisterData({
        childName: '',
        age: '13',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        disclosures: '',
        rulesAccepted: false
      });
    }, 1200);
  };

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
      title: "201 Swim Academy",
      sub: "Building Strong Swimmers for Life!",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
      bannerText: "SWIMMING ACADEMY",
      color: "from-blue-600 to-cyan-900",
      description: "Official private swimming safety and physical water competence lessons for all ages. We prioritize raw confidence, fundamental water safety, and survival skills to overcome water fears one single, supportive lesson at a time. Available in tailored 1-on-1, semi-private, and small group sessions.",
      highlights: [
        "Water safety focused instruction & protocols",
        "Water familiarization & confident swimming skills",
        "Beginner to advanced stroke style development",
        "Safety & active survival skills coaching",
        "Children & adults of all ages welcome",
        "Private, safe, supportive & comforting focus"
      ],
      isSwimming: true
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
      isMentorship: true
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
          {customPrograms.map((pRaw, idx) => {
            const prog = pRaw as any;
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

                  {prog.isMentorship && (
                    <div className="mt-8 space-y-8 text-left">
                      {/* Current Programs & Registration */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="h-0.5 w-8 bg-brand-light-blue" />
                          <h3 className="font-display text-xs font-black text-brand-light-blue uppercase tracking-[0.15em] select-none">
                            Current Chapters &amp; Registration
                          </h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-5">
                          {/* Bayonne Chapter */}
                          <div className="bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/40 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[9px] text-emerald-450 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider select-none">
                                  ✅ Active Program
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                                  Established 2021
                                </span>
                              </div>
                              
                              <h4 className="font-display font-black text-white text-lg uppercase leading-tight tracking-wide">
                                Bayonne Chapter
                              </h4>
                              <p className="text-slate-400 font-light text-xs mt-1.5 leading-relaxed">
                                Our flagship mentorship circle. Teens gather weekly to build character, set physical routines, and discuss real life solutions in a high-accountability format. Partnered and hosted by San Vito&apos;s!
                              </p>
                              
                              <div className="mt-5 space-y-2.5 text-slate-200 text-xs font-light bg-white/5 border border-white/5 p-4 rounded-xl font-sans">
                                <div className="flex items-center gap-2.5">
                                  <MapPin size={13} className="text-emerald-400 shrink-0" />
                                  <span>Hosted at <strong>San Vito&apos;s Restaurant &amp; Pizzeria</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <Users size={13} className="text-emerald-400 shrink-0" />
                                  <span>Target Cohort: <strong>Ages 12–18</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <Clock size={13} className="text-emerald-400 shrink-0" />
                                  <span>Schedule: <strong>Saturdays @ 12:30 PM</strong></span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 grid grid-cols-2 gap-3">
                              <button
                                onClick={() => {
                                  setSubmissionFeedback(null);
                                  setShowBayonneRegisterForm(true);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-505 text-white text-[10px] uppercase font-black font-display tracking-widest py-3 px-4 rounded-xl text-center transition-all cursor-pointer shadow-lg hover:shadow-emerald-600/10"
                              >
                                Register Now
                              </button>
                              <button
                                onClick={() => setActiveFlyer('bayonne')}
                                className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-250 hover:text-white text-[10px] uppercase font-black font-display tracking-widest py-3 px-4 rounded-xl text-center transition-all cursor-pointer select-none"
                              >
                                View Flyer
                              </button>
                            </div>
                          </div>

                          {/* Keyport Chapter */}
                          <div className="bg-slate-900 border border-brand-light-blue/20 hover:border-brand-light-blue/40 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[9px] text-cyan-400 font-bold bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider select-none animate-pulse">
                                  🌊 Launching July 2026
                                </span>
                                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                                  Bayshore Initiative
                                </span>
                              </div>
                              
                              <h4 className="font-display font-black text-white text-lg uppercase leading-tight tracking-wide">
                                Keyport Chapter
                              </h4>
                              <p className="text-slate-400 font-light text-xs mt-1.5 leading-relaxed">
                                Located on the scenic Raritan Bay. This circle introduces nature outings, maritime exploration, and fishing alongside mentorship, visual art expressions, and life-planning workshops.
                              </p>
                              
                              <div className="mt-5 space-y-2.5 text-slate-200 text-xs font-light bg-white/5 border border-white/5 p-4 rounded-xl font-sans">
                                <div className="flex items-center gap-2.5">
                                  <MapPin size={13} className="text-brand-light-blue shrink-0" />
                                  <span>Waterfront Marina / Bayfront Outings</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <Users size={13} className="text-brand-light-blue shrink-0" />
                                  <span>Target Cohort: <strong>Ages 12–18</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <Clock size={13} className="text-brand-light-blue shrink-0" />
                                  <span>Schedule: <strong>Saturdays @ 11:00 AM</strong></span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 grid grid-cols-2 gap-3">
                              <button
                                onClick={() => {
                                  setSubmissionFeedback(null);
                                  setInterestChapter('keyport');
                                  setShowInterestForm(true);
                                }}
                                className="bg-brand-light-blue hover:bg-white text-brand-blue text-[10px] uppercase font-black font-display tracking-widest py-3 px-4 rounded-xl text-center transition-all cursor-pointer shadow-lg hover:shadow-cyan-400/10"
                              >
                                Join Interest List
                              </button>
                              <button
                                onClick={() => setActiveFlyer('keyport')}
                                className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-250 hover:text-white text-[10px] uppercase font-black font-display tracking-widest py-3 px-4 rounded-xl text-center transition-all cursor-pointer select-none"
                              >
                                View Flyer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Help Sponsor A Youth CTA */}
                      <div className="bg-slate-900 border border-brand-light-blue/20 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-all duration-300 shadow-2xl text-left">
                        <div className="absolute top-0 right-10 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                          <div className="space-y-3 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-light-blue/15 border border-brand-light-blue/25 rounded-full select-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue animate-pulse" />
                              <span className="text-[9px] uppercase font-bold tracking-widest text-brand-light-blue font-display">Active Community Alignment</span>
                            </div>
                            <h3 className="font-display font-black text-white text-xl md:text-2xl uppercase tracking-tight leading-tight">
                              Help Sponsor A Youth
                            </h3>
                            <p className="text-slate-350 font-light text-xs md:text-sm leading-relaxed">
                              Donations help us provide direct mentorship, character training curriculums, healthy meals, and sports gears. Together we create long-term stability and accountability.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => onDonate?.()}
                            className="bg-brand-light-blue hover:bg-white hover:text-brand-blue text-brand-blue font-display text-[10px] uppercase font-black tracking-widest px-8 py-4 px-6 md:px-8 py-4 rounded-xl transition-all shadow-md shrink-0 cursor-pointer border border-cyan-400/50"
                          >
                            Support Mentorship
                          </button>
                        </div>
                      </div>

                      {/* Bring a Mentorship Circle to Your Community */}
                      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-white/5 hover:border-brand-light-blue/20 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-all duration-300 shadow-2xl text-left">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-light-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                        
                        <div className="relative z-10 space-y-4 max-w-2xl">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-light-blue/10 border border-brand-light-blue/20 rounded-full select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-light-blue font-display">Expand NJ Youth Anchor Links</span>
                          </div>
                          
                          <h3 className="font-display font-black text-white text-xl md:text-2xl uppercase tracking-tight leading-tight">
                            Bring a Mentorship Circle to Your Community
                          </h3>
                          
                          <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed">
                            Project 201 is actively looking for schools, restaurants, businesses, libraries, social groups, faith-based organizations, and community hubs interested in co-hosting or sponsoring a structured peer mentorship circle. Let&apos;s answer the question: <strong>&ldquo;How do we bring Project 201 to our town?&rdquo;</strong>
                          </p>
                          
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                setSubmissionFeedback(null);
                                setShowCommunityForm(true);
                              }}
                              className="w-full sm:w-auto bg-brand-light-blue hover:bg-white hover:text-brand-blue text-brand-blue font-display text-[10px] uppercase font-black tracking-widest px-7 py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/50"
                            >
                              <Compass size={13} />
                              Request a Mentorship Circle
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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

                  {prog.isSwimming && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-brand-blue via-sky-900 to-cyan-900 border border-brand-light-blue/20 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-light-blue/10 rounded-full blur-xl pointer-events-none" />
                      
                      {/* Logo header */}
                      <div className="flex justify-between items-start border-b border-white/10 pb-4 relative z-10">
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-cyan-350 tracking-[0.2em] font-mono block uppercase">201 SPORTS • EST. 2021</span>
                          <h4 className="font-display text-lg font-black uppercase text-white leading-none">201 SWIM ACADEMY</h4>
                          <span className="text-[9px] text-slate-350 font-light block italic">Building Strong Swimmers for Life!</span>
                        </div>
                        <div className="bg-amber-400 text-slate-950 font-display text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg shrink-0 tracking-widest shadow select-none animate-bounce">
                          5 SESSIONS
                        </div>
                      </div>

                      {/* Package details */}
                      <div className="grid md:grid-cols-12 gap-5 py-5 relative z-10 border-b border-white/10">
                        <div className="md:col-span-5 flex flex-col justify-center space-y-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                          <span className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider block">Program Package</span>
                          <span className="text-4xl font-black font-display text-white">$125</span>
                          <span className="text-[10px] text-slate-300 font-light block">5 Private Lessons • 30 Mins Each</span>
                          <span className="text-[8px] bg-red-500/20 text-red-305 font-bold tracking-wider px-2 py-0.5 rounded-full mt-2 self-center uppercase animate-pulse">Limited Spots Available!</span>
                        </div>

                        <div className="md:col-span-7 space-y-3">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Instruction Details</span>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="text-[11px] text-slate-200 font-light">Water Safety Focused Lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="text-[11px] text-slate-200 font-light">Water Familiarization &amp; Overcoming Fear</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="text-[11px] text-slate-200 font-light">Beginner to Advanced Stroke Coaching</span>
                            </div>
                          </div>
                          
                          <div className="pt-1 select-none">
                            <span className="inline-block text-[9px] font-bold bg-white/10 text-slate-200 border border-white/10 px-2.5 py-0.5 rounded uppercase tracking-wide mr-1.5 mb-1.5">Private</span>
                            <span className="inline-block text-[9px] font-bold bg-white/10 text-slate-200 border border-white/10 px-2.5 py-0.5 rounded uppercase tracking-wide mr-1.5 mb-1.5">Semi-Private</span>
                            <span className="inline-block text-[9px] font-bold bg-white/10 text-slate-200 border border-white/10 px-2.5 py-0.5 rounded uppercase tracking-wide mb-1.5">Small Group 1-on-1</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact and Sign Up */}
                      <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                        <div className="space-y-1 text-left self-start sm:self-center">
                          <span className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider block">Serious Inquiries Only</span>
                          <div className="flex flex-col text-[11px] text-slate-350 space-y-0.5 font-sans">
                            <span className="flex items-center gap-1.5 font-bold text-white">
                              <Phone className="w-3 h-3 text-cyan-400" /> 201-725-5062 <span className="text-[9px] font-light text-slate-400">(Call/Text)</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-cyan-400" /> project201inc@gmail.com
                            </span>
                          </div>
                        </div>

                        {onNavigate && (
                          <button 
                            onClick={() => onNavigate('hire')}
                            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-display text-[10px] uppercase font-black tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                          >
                            Register Spot Online <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* dotFIT Partnership Section */}
      <section className="py-24 bg-slate-950 border-t border-white/5 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-red-650/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-brand-light-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left side: branding & description */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full select-none">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 font-display">New Collaboration Partner</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Project 201 <span className="text-red-500">X dotFIT</span>
              </h2>
              <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
                Project 201 recently partnered with **dotFIT** to eliminate guesswork from your athletic health! This premium clinical nutritional platform creates a personalized supplement and nutrition plan tailored specifically to your active body and peak physical performance goals.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-xs text-white uppercase tracking-wide">Personalized Clinical Plans</h4>
                    <p className="text-slate-405 text-xs font-light">Customized nutrition guidelines, daily caloric profiles, and exact science-based supplementation recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <Apple className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-xs text-white uppercase tracking-wide">Goal-Driven Progress Tracking</h4>
                    <p className="text-slate-405 text-xs font-light">Whether you are building power, building endurance, speeding up agility, or conditioning for high-intensity athletics.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: interactive intake flyer box */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-left space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-550/15 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                  Get Your Personalized dotFIT Plan
                </h3>
                <p className="text-slate-400 font-light text-xs leading-relaxed">
                  Take exactly 2 to 3 minutes to complete your individual fitness/health profile. It's fast, free to formulate, and provides a clear nutrient blueprint.
                </p>

                {/* 1-2-3 Guide */}
                <div className="space-y-4 bg-white/5 rounded-2xl p-5 border border-white/10 font-sans">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <p className="text-[12px] text-slate-300 leading-relaxed font-light">
                      Complete your digital health profile at <a href="https://bit.ly/3WcD1Em" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline font-bold inline-flex items-center gap-0.5">dotFIT Portal <ExternalLink size={10} /></a>.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <p className="text-[12px] text-slate-300 leading-relaxed font-light">
                      Capture a quick <strong>screenshot</strong> of your customized nutrition recommendations at completion.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <p className="text-[12px] text-slate-300 leading-relaxed font-light">
                      Send the screenshot to us via text (<strong>201-725-5062</strong>) or email. We will review and incorporate it into your Project 201 training plan!
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="https://bit.ly/3WcD1Em" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full h-12 bg-red-650 hover:bg-red-600 text-white rounded-xl font-bold text-[10px] uppercase font-display tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-red-500/50"
                  >
                    Launch dotFIT Profile Portal
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section at bottom */}
      <section className="bg-slate-900 text-white py-16 border-t border-white/5">
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
      {/* ========================================================= */}
      {/* =============== INTERACTIVE DIGITAL FLYERS MODAL ========= */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFlyer(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveFlyer(null)}
                className="absolute top-4 right-4 z-50 bg-slate-950/50 hover:bg-slate-950 text-white p-2 rounded-full transition-all cursor-pointer border border-white/10"
              >
                <X size={16} />
              </button>

              {activeFlyer === 'keyport' ? (
                /* --- KEYPORT HIGH-FIDELITY DIGITAL FLYER --- */
                <div className="bg-gradient-to-b from-brand-blue via-sky-950 to-slate-950 text-white min-h-[600px] flex flex-col justify-between">
                  {/* Decorative glowing header dots */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500" />
                  
                  {/* Flyer Header Branding */}
                  <div className="p-6 pb-2 text-center relative">
                    <div className="absolute top-4 left-6 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[7px] font-mono tracking-wider text-cyan-300 uppercase">EST. 2021</span>
                    </div>
                    
                    {/* Floating circular seal */}
                    <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-brand-light-blue mx-auto flex flex-col items-center justify-center p-1 shadow-inner select-none mb-2">
                      <span className="text-[6px] font-black text-white leading-none">PROJECT</span>
                      <span className="text-sm font-black text-brand-light-blue leading-none tracking-tight">201</span>
                    </div>
                    
                    <span className="text-[8px] font-bold text-cyan-300 tracking-[0.3em] font-mono block uppercase">
                      BAYSHORE MENTORSHIP CIRCLE
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white leading-none tracking-tight mt-1.5">
                      KEYPORT DIVISION
                    </h2>
                    <p className="text-[9px] text-brand-light-blue uppercase font-bold tracking-[0.25em] italic mt-1 font-sans">
                      &ldquo;Connect. Create. Grow.&rdquo;
                    </p>
                  </div>

                  {/* Core Program Features & Timing Column */}
                  <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative">
                    {/* Left details */}
                    <div className="md:col-span-7 space-y-3 border-r md:border-white/10 pr-0 md:pr-4 text-left">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest block">
                        INCLUDED DEVELOPMENT MODULES:
                      </span>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <div className="bg-cyan-500/10 text-cyan-400 rounded p-0.5 mt-0.5 shrink-0">
                            <Users size={12} />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold text-white uppercase">Mentorship &amp; Leadership</h5>
                            <p className="text-[8px] text-slate-300">Consistent align-up coaching with role models.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-amber-500/10 text-amber-400 rounded p-0.5 mt-0.5 shrink-0">
                            <Sparkles size={12} />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold text-white uppercase">Art &amp; Creative Expression</h5>
                            <p className="text-[8px] text-slate-300">Visual, canvas, and drawing outlets.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-blue-500/10 text-blue-400 rounded p-0.5 mt-0.5 shrink-0">
                            <Waves size={12} />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold text-white uppercase">Outdoor Activities &amp; Fishing</h5>
                            <p className="text-[8px] text-slate-300">Waterfront outings, bayshore hikes &amp; fishing mechanics.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-red-500/10 text-red-400 rounded p-0.5 mt-0.5 shrink-0">
                            <Target size={12} />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold text-white uppercase">Goal Setting &amp; Life Skills</h5>
                            <p className="text-[8px] text-slate-300">Weekly progress journaling and micro-habits.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-emerald-500/10 text-emerald-400 rounded p-0.5 mt-0.5 shrink-0">
                            <ShieldCheck size={12} />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold text-white uppercase">Positive Peer Connections</h5>
                            <p className="text-[8px] text-slate-300">Healthy group structures and direct alignments.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right timing details */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                      {/* Interactive block 1 */}
                      <div className="bg-amber-400 text-slate-950 p-3 rounded-2xl text-center shadow-lg transform rotate-1 border border-white/20 select-none">
                        <span className="text-[7px] font-mono font-bold tracking-wider block uppercase opacity-75">WEEKLY ASSEMBLY</span>
                        <span className="text-base font-black font-display tracking-tight block">SATURDAYS</span>
                        <span className="text-sm font-black font-display block">AT 11:00 AM</span>
                      </div>

                      {/* Interactive block 2 */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
                        <span className="text-[7px] text-cyan-300 font-bold uppercase tracking-wider block">LAUNCH DATE</span>
                        <span className="text-[11px] text-white font-extrabold font-display uppercase tracking-widest block mt-0.5">JULY 2026</span>
                        <span className="text-[7px] text-slate-400 block font-light">LIMITED TO 10 youth slots</span>
                      </div>

                      {/* Status lock */}
                      <div className="bg-red-500/10 border border-red-500/20 text-red-405 font-bold uppercase text-[8px] py-1 rounded text-center animate-pulse">
                        ⚠️ REGISTRATION REQUIRED
                      </div>
                    </div>
                  </div>

                  {/* Partner Sponsors Footer */}
                  <div className="bg-slate-950 p-5 mt-4 border-t border-white/5 space-y-4 relative z-10 text-center">
                    <span className="text-[7px] font-mono text-slate-400 tracking-[0.2em] block uppercase">
                      PROUD BAYSHORE COMMUNITY PARTNERS:
                    </span>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Sponsor 1 */}
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                          <Activity size={14} className="animate-pulse" />
                        </div>
                        <div>
                          <h6 className="text-[9px] font-black uppercase text-white leading-none">Dawn&apos;s Auto Body</h6>
                          <span className="text-[7px] text-slate-400 block font-light mt-0.5">Sponsor &amp; Supporter</span>
                        </div>
                      </div>

                      {/* Sponsor 2 */}
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                          <Waves size={14} />
                        </div>
                        <div>
                          <h6 className="text-[9px] font-black uppercase text-white leading-none">Keyport Bait &amp; Tackle</h6>
                          <span className="text-[7px] text-slate-400 block font-light mt-0.5">Outing &amp; Gear Ally</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] text-slate-400 font-sans">
                      <span>PROJECT201.ORG</span>
                      <span>PROJECT201INC@GMAIL.COM</span>
                      <span>201-725-5062</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- BAYONNE HIGH-FIDELITY DIGITAL FLYER --- */
                <div className="bg-gradient-to-b from-emerald-900 via-teal-950 to-slate-950 text-white min-h-[580px] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-700" />
                  
                  {/* Header */}
                  <div className="p-6 pb-2 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-emerald-400 mx-auto flex items-center justify-center p-1 shadow-inner select-none mb-2">
                      <span className="text-xs font-black text-emerald-400 leading-none">201</span>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-300 tracking-[0.3em] font-mono block uppercase">
                      PEER MENTORSHIP COLLABORATIVE
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white leading-none mt-1 shadow-sm">
                      BAYONNE CHAPTER
                    </h2>
                    <p className="text-[9px] text-emerald-400 uppercase font-bold tracking-widest italic mt-1">
                      &ldquo;Character, Emotional Control &amp; Life Skills&rdquo;
                    </p>
                  </div>

                  {/* Flyer Info columns */}
                  <div className="px-6 py-4 space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">COHORT ASSEMBLY DETAILS</span>
                      <div className="grid md:grid-cols-2 gap-3 text-xs leading-relaxed font-light">
                        <div className="space-y-1 text-left">
                          <span className="text-[8px] text-emerald-400 block uppercase font-bold">MEETING HOST:</span>
                          <span className="text-white font-bold block">San Vito&apos;s Pizzeria</span>
                          <span className="text-[10px] text-slate-300 block">Bayonne, NJ</span>
                        </div>
                        <div className="space-y-1 text-left">
                          <span className="text-[8px] text-emerald-400 block uppercase font-bold">TIME SCHEDULE:</span>
                          <span className="text-white font-bold block">Saturdays @ 12:30 PM</span>
                          <span className="text-[10px] text-slate-300 block">Currently Active recruitment</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-white/10 pt-4 text-left">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">KEY FOCUSES FOR DEVELOPING TEENS:</span>
                      
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-light text-slate-200">
                        <div className="flex items-center gap-1.5">
                          <Check size={10} className="text-emerald-400" />
                          <span>Goal-Driven Progress Journals</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={10} className="text-emerald-400" />
                          <span>Consistent Mentor Profiles</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={10} className="text-emerald-400" />
                          <span>High Accountability Mechanics</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={10} className="text-emerald-400" />
                          <span>Peer cooperation sequences</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Host Partners Footer */}
                  <div className="bg-slate-950 p-5 mt-4 border-t border-white/5 space-y-3 text-center">
                    <span className="text-[7px] font-mono text-emerald-400 tracking-[0.2em] block uppercase">
                      HOST &amp; SPONSOR ACKNOWLEDGEMENT:
                    </span>
                    
                    <div className="bg-emerald-950/20 border border-emerald-500/25 p-3 rounded-2xl max-w-sm mx-auto flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/20 flex items-center justify-center font-display font-black text-rose-550 text-xs italic shrink-0">
                        🍕 S.V.
                      </div>
                      <div className="text-left">
                        <h6 className="text-[10px] font-black uppercase text-white leading-none">San Vito&apos;s Restaurant</h6>
                        <span className="text-[8px] text-slate-400 block mt-1 leading-snug font-light">Supporting community youth since 2021 by hosting our weekly circles and refreshing minds!</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] text-slate-400 font-sans">
                      <span>PROJECT201.ORG</span>
                      <span>PROJECT201INC@GMAIL.COM</span>
                      <span>201-725-5062</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action bar and Print button */}
              <div className="bg-slate-950 p-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-light select-none">
                  Press close to exit flyer view
                </span>
                <button
                  onClick={() => window.print()}
                  className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:bg-amber-300 font-display cursor-pointer"
                >
                  Print Flyer Circular
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* =============== KEYPORT INTEREST LIST FORM MODAL ======== */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showInterestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInterestForm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-8"
            >
              <button
                onClick={() => setShowInterestForm(false)}
                className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 rounded-full cursor-pointer transition-all border border-white/10"
              >
                <X size={16} />
              </button>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-light-blue/10 border border-brand-light-blue/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                  <span className="text-[8px] uppercase tracking-wider text-brand-light-blue font-bold font-mono">Bayshore Keyport Circular</span>
                </div>
                
                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">
                  Join Keyport Chapter Interest List
                </h3>
                <p className="text-slate-300 font-light text-xs">
                  Fill out this fast form. We are launching in **July 2026** and will restrict enrollment strictly to **10 young leaders**. Joining this queue guarantees early notification!
                </p>

                {submissionFeedback === 'interest_success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-6 text-center space-y-3.5 my-4 animate-fadeIn"
                  >
                    <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 font-bold text-lg select-none">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm uppercase">Interest Registered Successfully!</h4>
                      <p className="text-slate-350 text-[11px] mt-1 font-light leading-relaxed">
                        Thank you! We have logged your interest sequence. You are now placed in our Bayshore VIP queue, and Jonah or a Project 201 representative will email/text you with detailed flyer materials soon!
                      </p>
                    </div>
                    <button
                      onClick={() => setShowInterestForm(false)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-display text-[9px] uppercase font-bold tracking-wider px-6 py-2.5 rounded-xl cursor-pointer transition-all w-full"
                    >
                      Close Portal
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInterestSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Youth Name *</label>
                        <input
                          type="text"
                          required
                          value={interestData.name}
                          onChange={(e) => setInterestData({ ...interestData, name: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="Teenager Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Youth Age *</label>
                        <select
                          value={interestData.age}
                          onChange={(e) => setInterestData({ ...interestData, age: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                        >
                          {['12', '13', '14', '15', '16', '17', '18'].map((a) => (
                            <option key={a} value={a} className="bg-slate-900">{a} Years Old</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Parent/Guardian Name</label>
                      <input
                        type="text"
                        value={interestData.parentName}
                        onChange={(e) => setInterestData({ ...interestData, parentName: e.target.value })}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                        placeholder="Authorized Parent / Contact"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Contact Email *</label>
                        <input
                          type="email"
                          required
                          value={interestData.email}
                          onChange={(e) => setInterestData({ ...interestData, email: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="name@email.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Contact Phone *</label>
                        <input
                          type="tel"
                          required
                          value={interestData.phone}
                          onChange={(e) => setInterestData({ ...interestData, phone: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="555-555-5555"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Inquiries / Special Concerns</label>
                      <textarea
                        value={interestData.questions}
                        onChange={(e) => setInterestData({ ...interestData, questions: e.target.value })}
                        rows={2}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-brand-light-blue resize-none"
                        placeholder="Mention any questions, interest in fishing or art, etc..."
                      />
                    </div>

                    <div className="pt-2 font-display">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-light-blue hover:bg-white text-brand-blue font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>Connecting Register...</>
                        ) : (
                          <>
                            Submit Priority Interest Info
                            <Send size={11} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* =============== BAYONNE DIRECT REGISTRATION FORM ======== */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showBayonneRegisterForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBayonneRegisterForm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-8 my-8 animate-fadeIn"
            >
              <button
                onClick={() => setShowBayonneRegisterForm(false)}
                className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 rounded-full cursor-pointer transition-all border border-white/10"
              >
                <X size={16} />
              </button>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold font-mono">Bayonne Active Registry</span>
                </div>
                
                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">
                  Enroll in Bayonne Mentorship Circle
                </h3>
                <p className="text-slate-300 font-light text-xs">
                  Fill out this official participant form to request one of the remaining active group placements. Submissions generate an automated parent invoice.
                </p>

                {submissionFeedback === 'register_success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-6 text-center space-y-3.5 my-4"
                  >
                    <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 font-bold text-lg select-none">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm uppercase">Registration Submitted Successfully!</h4>
                      <p className="text-slate-350 text-[11px] mt-1 font-light leading-relaxed">
                        Excellent! Your registration for the **Bayonne Chapter at San Vito&apos;s** has been logged in our cohort tracking pool database. We will issue a parent registration packet and invoice statement details coordinates to your email soon.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBayonneRegisterForm(false)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-display text-[9px] uppercase font-bold tracking-wider px-6 py-2.5 rounded-xl cursor-pointer transition-all w-full"
                    >
                      Finished
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Youth Full Name *</label>
                        <input
                          type="text"
                          required
                          value={registerData.childName}
                          onChange={(e) => setRegisterData({ ...registerData, childName: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="First & Last Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Youth Age (12-18) *</label>
                        <select
                          value={registerData.age}
                          onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                        >
                          {['12', '13', '14', '15', '16', '17', '18'].map((a) => (
                            <option key={a} value={a} className="bg-slate-900">{a} Years Old</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Parent/Guardian Name *</label>
                      <input
                        type="text"
                        required
                        value={registerData.parentName}
                        onChange={(e) => setRegisterData({ ...registerData, parentName: e.target.value })}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                        placeholder="Mother / Father / Guardian"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Parent Email *</label>
                        <input
                          type="email"
                          required
                          value={registerData.parentEmail}
                          onChange={(e) => setRegisterData({ ...registerData, parentEmail: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="parent@email.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Parent Phone *</label>
                        <input
                          type="tel"
                          required
                          value={registerData.parentPhone}
                          onChange={(e) => setRegisterData({ ...registerData, parentPhone: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="201-555-5555"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Allergies / Medical Advisories</label>
                      <textarea
                        value={registerData.disclosures}
                        onChange={(e) => setRegisterData({ ...registerData, disclosures: e.target.value })}
                        rows={1.5}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-brand-light-blue resize-none animate-none"
                        placeholder="N/A (or list essential medical considerations)"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1.5 font-sans">
                      <input
                        type="checkbox"
                        required
                        id="parent-liability-rules"
                        checked={registerData.rulesAccepted}
                        onChange={(e) => setRegisterData({ ...registerData, rulesAccepted: e.target.checked })}
                        className="mt-0.5 w-4 h-4 rounded bg-slate-950 accent-emerald-500 border-white/10 shrink-0 cursor-pointer"
                      />
                      <label htmlFor="parent-liability-rules" className="text-[10px] text-slate-350 leading-relaxed cursor-pointer select-none">
                        I authorize my child to participate weekly in active character routines. I endorse standard accountability guidelines and permit Project 201 coordinators to align mentorship loops. *
                      </label>
                    </div>

                    <div className="pt-2 font-display">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>Processing Registration...</>
                        ) : (
                          <>
                            Submit Cohort Registration
                            <Send size={11} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* =============== BRING A CIRCLE REQUEST FORM MODAL ======== */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showCommunityForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommunityForm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-8 my-8 animate-fadeIn"
            >
              <button
                onClick={() => setShowCommunityForm(false)}
                className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 rounded-full cursor-pointer transition-all border border-white/10"
              >
                <X size={16} />
              </button>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-light-blue/10 border border-brand-light-blue/20 rounded-full">
                  <Building size={11} className="text-brand-light-blue" />
                  <span className="text-[8px] uppercase tracking-wider text-brand-light-blue font-bold font-mono">Statewide Community Expansion</span>
                </div>
                
                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">
                  Request a Mentorship Circle
                </h3>
                <p className="text-slate-300 font-light text-xs">
                  Provide details about your town, municipality or organization. Project 201 coordinates setups NJ-wide with local hosts and corporate sponsors!
                </p>

                {submissionFeedback === 'community_success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-light-blue/10 border border-brand-light-blue/25 rounded-2xl p-6 text-center space-y-3.5 my-4"
                  >
                    <div className="w-12 h-12 bg-brand-light-blue text-brand-blue rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-400/20 font-bold text-lg select-none">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm uppercase">Inquiry Received Perfectly!</h4>
                      <p className="text-slate-350 text-[11px] mt-1 font-light leading-relaxed">
                        Fantastic proposal details logged! Thank you for advocating for youth leaders in your area. We will analyze space hosting possibilities, connect regional sponsors, and email/call you to set up a scoping meeting ASAP.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCommunityForm(false)}
                      className="bg-brand-light-blue hover:bg-white hover:text-brand-blue text-brand-blue font-display text-[9px] uppercase font-bold tracking-wider px-6 py-2.5 rounded-xl cursor-pointer transition-all w-full"
                    >
                      Dismiss Portal
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCommunitySubmit} className="space-y-4 pt-2">
                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Representative Full Name *</label>
                      <input
                        type="text"
                        required
                        value={communityData.repName}
                        onChange={(e) => setCommunityData({ ...communityData, repName: e.target.value })}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Entity Type *</label>
                        <select
                          value={communityData.orgType}
                          onChange={(e) => setCommunityData({ ...communityData, orgType: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue font-light"
                        >
                          <option value="school" className="bg-slate-900">School / District</option>
                          <option value="restaurant" className="bg-slate-900">Restaurant / Business</option>
                          <option value="faith_group" className="bg-slate-900">Faith Organization</option>
                          <option value="library" className="bg-slate-900">Library / Civic Hub</option>
                          <option value="municipality" className="bg-slate-900">Local Municipality</option>
                          <option value="other" className="bg-slate-900">Other Group Type</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Institution Name *</label>
                        <input
                          type="text"
                          required
                          value={communityData.orgName}
                          onChange={(e) => setCommunityData({ ...communityData, orgName: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="e.g. Bayonne Library"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={communityData.email}
                          onChange={(e) => setCommunityData({ ...communityData, email: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="partner@email.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Contact Phone *</label>
                        <input
                          type="tel"
                          required
                          value={communityData.phone}
                          onChange={(e) => setCommunityData({ ...communityData, phone: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="e.g. 201-555-5555"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Location (City, NJ) *</label>
                        <input
                          type="text"
                          required
                          value={communityData.city}
                          onChange={(e) => setCommunityData({ ...communityData, city: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue"
                          placeholder="e.g. Keyport, NJ"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Preferred Launch *</label>
                        <select
                          value={communityData.timeline}
                          onChange={(e) => setCommunityData({ ...communityData, timeline: e.target.value })}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-light-blue font-light"
                        >
                          <option value="immediate" className="bg-slate-900">Summer 2026</option>
                          <option value="fall_2026" className="bg-slate-900">Fall 25 / Sept 2026</option>
                          <option value="winter_2027" className="bg-slate-900">Winter 2027 onwards</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Host Site details or Message</label>
                      <textarea
                        value={communityData.message}
                        onChange={(e) => setCommunityData({ ...communityData, message: e.target.value })}
                        rows={2}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-brand-light-blue resize-none"
                        placeholder="Outline potential space details, business locations, or district student alignment priorities..."
                      />
                    </div>

                    <div className="pt-2 font-display">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-light-blue hover:bg-white text-brand-blue font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>Deploying Proposal Inquiry...</>
                        ) : (
                          <>
                            Submit Partner Connection Circular
                            <Send size={11} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
