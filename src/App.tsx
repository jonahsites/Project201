import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Dynamic sub-page loads
import AboutPage from './components/AboutPage';
import ProgramsPage from './components/ProgramsPage';
import HirePage from './components/HirePage';
import YouthSupportPage from './components/YouthSupportPage';
import SchoolsPartnershipsPage from './components/SchoolsPartnershipsPage';
import SponsorsPartnersPage from './components/SponsorsPartnersPage';
import EventsPage from './components/EventsPage';
import DonatePage from './components/DonatePage';
import ContactPage from './components/ContactPage';
import MerchPage from './components/MerchPage';

import { DonationCheckout } from './components/DonationCheckout';
import { SoftGlowBackground } from './components/ui/SoftGlowBackground';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  User, 
  Heart, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Award, 
  Zap, 
  ArrowRight,
  BookOpen,
  Star
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'programs' | 'hire' | 'youth-support' | 'partnerships' | 'sponsors' | 'events' | 'donate' | 'contact' | 'merch'>('home');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("50");

  const handleDonate = (amount?: string) => {
    window.open("https://www.zeffy.com/en-US/donation-form/support-project--201", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  useEffect(() => {
    if (showCheckout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showCheckout]);

  // Certifications list for the bottom of Home / Sections
  const certificationChips = [
    "USA Boxing Certified",
    "Rutgers Youth Sports Safety Certified",
    "Mental Health First Aid",
    "QPR Suicide Prevention",
    "Certified Personal Trainer",
    "CPR/First Aid"
  ];

  // Specific community photos from Drive requested by the user
  const communityPhotos = [
    "https://lh3.googleusercontent.com/d/14hMdGg2T_KhM39RFkARigPoNOlhZAt6h",
    "https://lh3.googleusercontent.com/d/1EWVVBgaSPHDlZH43LUxcZyCzdB2YFDbh",
    "https://lh3.googleusercontent.com/d/1LoZ5o-SsUKjPM82EkM_H286zxdRoOYi0",
    "https://lh3.googleusercontent.com/d/1O8rXfrSdLVQDNaLq9UphQcS3wNbLjdXP",
    "https://lh3.googleusercontent.com/d/1OJSszuwK2nd64braXEWTLuH4MsF6Ap9B",
    "https://lh3.googleusercontent.com/d/1ZdDx1k4tWuT_DZ6R2QrmBnbNwGIC9ywx",
    "https://lh3.googleusercontent.com/d/1_wWCoskagS7gXofuguJYWOebpUeHiBSV",
    "https://lh3.googleusercontent.com/d/1fZM9VMinL-zEooGvoSWp1kS7sgpuhMgT",
    "https://lh3.googleusercontent.com/d/1h2SdU22OyfnHHxVlUAV6TxEdVfQfUl6C",
    "https://lh3.googleusercontent.com/d/1ij0c6x2te4sYxY4gRI63zH84EmKJ2TzA",
    "https://lh3.googleusercontent.com/d/1kdjoEnKj7ITTgvZst4SBW2vxWJc815tH",
    "https://lh3.googleusercontent.com/d/1lbP930zRdCQzjdChwW7QG8Dr_sulYcma",
    "https://lh3.googleusercontent.com/d/1n7OB8UqGRZ92yFK5mgaO6dAi0i3HC_bg"
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-light-blue selection:text-brand-blue">
      {/* Dynamic Navbar */}
      <Navbar activePage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentPage === 'home' && (
            <main>
              {/* Hero Banner */}
              <Hero onDonate={() => handleDonate()} onLearnMore={() => setCurrentPage('programs')} onSupportClick={() => setCurrentPage('youth-support')} />

              <SoftGlowBackground>
                {/* The Umbrella Framework Section (Requested by user: 201 Sports, 201 Boxing, Mentorship, Schools, Summer) */}
                <section className="py-24 border-b border-slate-100">
                  <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                      <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
                        The Parent Umbrella Brand
                      </span>
                      <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 uppercase">
                        PROJECT <span className="text-brand-light-blue">201</span>
                      </h2>
                      <p className="text-slate-500 font-light text-sm">
                        Five core branches operating statewide under a centralized mission of athletic performance, routine accountability, and student-parent support coordinates.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Brand 1 */}
                      <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Branch 01</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-850">201 Sports</h3>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            Elite performance speed, body control, physical literacy, and strength agility coaching modeled on professional college athletic preps.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('programs')} className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none">
                          Explore athletics <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Brand 2 */}
                      <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Branch 02</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-850">201 Boxing</h3>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            Controlled, USA Boxing-registered coaching used specifically to build deep self-respect, active workout outlets, and cardiovascular discipline.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('programs')} className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none">
                          Explore boxing <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Brand 3 */}
                      <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Branch 03</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-850">Mentorship Circle</h3>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            Individualized counseling alignments huddling youth around weekly routine calendars, behavior regulation journals, and goal follow-ups.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('programs')} className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none">
                          Explore mentorship <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Brand 4 */}
                      <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Branch 04</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-850">School Programs</h3>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            In-school structured recesstimes, behavioral transition programs, and special athletic assemblies coordinated with teachers.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('programs')} className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none">
                          Explore schools <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Brand 5 */}
                      <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Branch 05</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-850">Summer Programs</h3>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            High frequency summer sports training camps coupled with group community outings, regular field trips, and healthy nutritionist habits coaching.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('programs')} className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none">
                          Explore summer <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Partner card */}
                      <div className="bg-brand-blue text-white p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl border border-brand-light-blue/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 blur-2xl rounded-full" />
                        <div className="space-y-3 z-10 relative">
                          <span className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display">Referrals</span>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white">Need Personal Mentoring?</h3>
                          <p className="text-white/70 font-light text-xs leading-relaxed">
                            Are you a parent seeking direct assistance with a child's structure, motivation, school routine, or behavior? Apply inside.
                          </p>
                        </div>
                        <button onClick={() => setCurrentPage('youth-support')} className="mt-6 w-full py-3 bg-brand-light-blue text-brand-blue rounded-xl font-bold font-display text-[9px] tracking-widest uppercase hover:bg-white transition-all z-10">
                          Parent support form
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Strong IMPACT Section (Stats, Testimonials, Live community files) */}
                <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
                  
                  <div className="container mx-auto px-4 max-w-6xl space-y-20 relative z-10">
                    
                    {/* Stats Ticker */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                      <div className="space-y-1">
                        <span className="block font-display text-4xl lg:text-5xl font-black text-brand-light-blue">250+</span>
                        <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-widest">Overall Reached</span>
                        <span className="block text-[9px] text-slate-500 font-semibold leading-tight">Youth Mentored &amp; Supported</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display text-4xl lg:text-5xl font-black text-brand-light-blue">20+</span>
                        <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-widest">1-on-1 Mentorship</span>
                        <span className="block text-[9px] text-slate-500 font-semibold leading-tight">Deep Personal Guidance</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display text-4xl lg:text-5xl font-black text-brand-light-blue">Multiple</span>
                        <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-widest">Off Home Monitoring</span>
                        <span className="block text-[9px] text-slate-500 font-semibold leading-tight">Successfully Transitioned</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display text-4xl lg:text-5xl font-black text-brand-light-blue">100%</span>
                        <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-widest">Vetted &amp; Screened</span>
                        <span className="block text-[9px] text-slate-500 font-semibold leading-tight">Coaches &amp; Mentors Vetted</span>
                      </div>
                    </div>

                    {/* Help Us Reach More Youth CTA */}
                    <div className="bg-gradient-to-r from-brand-blue/30 via-slate-900 to-brand-blue/30 border border-brand-light-blue/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light-blue/5 rounded-full blur-xl pointer-events-none" />
                      <div className="space-y-1.5 text-center md:text-left relative z-10">
                        <h4 className="font-display font-bold text-white text-base md:text-lg uppercase tracking-tight">Help Us Reach More Youth</h4>
                        <p className="text-slate-350 font-light text-xs max-w-xl leading-relaxed">
                          Every contribution expands our reach—providing program supplies, wholesome meals, and athletic coaching slots for local teens across New Jersey.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDonate()}
                        className="bg-brand-light-blue hover:bg-brand-light-blue/90 text-brand-blue px-6 py-3 rounded-xl font-bold font-display text-[11px] tracking-widest uppercase transition-all shadow-md shrink-0 cursor-pointer relative z-10 font-black border border-cyan-400/35"
                      >
                        SUPPORT OUR ATHLETES
                      </button>
                    </div>

                    {/* Headline and text */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-5 space-y-6">
                        <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
                          Real NJ Impact Tracking
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-light uppercase leading-tight text-white">
                          Proven outcomes in <br />
                          <span className="font-bold text-brand-light-blue">behavior &amp; performance</span>
                        </h2>
                        <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
                          Project 201 does not rely on simple athletic drills. We operate structured mentorship frameworks that hold students accountable to teachers, parents, and community trainers on a daily tracking coordinate.
                        </p>
                        
                        {/* High-Impact Real Life Story Snippet */}
                        <div className="bg-brand-blue/15 border border-brand-light-blue/20 rounded-3xl p-5 space-y-2.5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-light-blue/5 rounded-full blur-xl" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-light-blue font-display flex items-center gap-1.5 select-none">
                            <Sparkles className="w-3 w-3 animate-pulse text-brand-light-blue" />
                            Real Impact Highlight
                          </span>
                          <p className="text-slate-200 text-xs italic font-light leading-relaxed">
                            "One youth facing removal from their home became Student of the Month within one month of structured mentorship and support."
                          </p>
                        </div>

                        <div className="pt-2">
                          <button 
                            onClick={() => setCurrentPage('about')}
                            className="bg-white/10 hover:bg-white/20 border border-white/15 px-6 py-3 rounded-xl font-bold font-display text-[10px] tracking-widest uppercase text-white transition-all cursor-pointer"
                          >
                            Read Founder Story
                          </button>
                        </div>
                      </div>

                      {/* Testimonial Board cards - High Craftsmanship Google Reviews Showcase */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white uppercase tracking-wider font-display select-none">Google Reviews</span>
                            <span className="text-brand-light-blue text-xs font-bold bg-brand-blue/30 border border-brand-light-blue/20 px-2 py-0.5 rounded-full select-none">5.0 ★ Rating</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">Active Feedback</span>
                        </div>

                        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-3 scrollbar-thin scrollbar-thumb-brand-blue scrollbar-track-white/5">
                          {/* Review 1 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-display font-bold flex items-center justify-center select-none shadow">
                                  JF
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Jeanne Flores</h4>
                                  <span className="text-[9px] text-slate-400">Parent • 5 reviews</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "I can’t thank Coach Kellz enough for the impact he has had on my son’s life. Since starting weekly mentorship, I’ve watched my son grow into a more confident, determined, and happier version of himself, taking real accountability for his decisions."
                            </p>
                          </div>

                          {/* Review 2 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-light-blue/10 text-brand-light-blue border border-brand-light-blue/20 font-display font-bold flex items-center justify-center select-none shadow">
                                  BN
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Bishop Nichols</h4>
                                  <span className="text-[9px] text-slate-400">Student Athlete • 1 review</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "I met Coach Kellz in 2020 during my senior year of high school, right in the middle of COVID. While everything was shut down, I was still out on the field trying to get better, and he was the only person crazy enough like me to still be out there pushing me to my absolute limits, keeping me focused."
                            </p>
                          </div>

                          {/* Review 3 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-display font-bold flex items-center justify-center select-none shadow">
                                  AG
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Ariel Galan</h4>
                                  <span className="text-[9px] text-slate-400">Student Athlete • 1 review</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "The best mentorship with Project 201, it is amazing and fun to learn and develop leadership skills. I worked on my goals and learned true structure and personal growth. I am happy to be guided by coaches who care about our future!"
                            </p>
                          </div>

                          {/* Review 4 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-light-blue/10 text-brand-light-blue border border-brand-light-blue/20 font-display font-bold flex items-center justify-center select-none shadow">
                                  NW
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Natanya Wachtel</h4>
                                  <span className="text-[9px] text-slate-400">Community Leader • 5 reviews</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "Wonderful organization supporting youth through healthy participation in sports and community 💕 the mentorship is best in class…"
                            </p>
                          </div>

                          {/* Review 5 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-display font-bold flex items-center justify-center select-none shadow">
                                  IJ
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Ian Jones</h4>
                                  <span className="text-[9px] text-slate-400">Community Partner • 1 review</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "Shawn and Ana have a genuine passion for serving the kids of the community, providing structured activities to help them thrive."
                            </p>
                          </div>

                          {/* Review 6 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-light-blue/10 text-brand-light-blue border border-brand-light-blue/20 font-display font-bold flex items-center justify-center select-none shadow">
                                  SO
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Sarah Obaid</h4>
                                  <span className="text-[9px] text-slate-400">Local Guide • 23 reviews</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "A much needed program for the youth 🙏🏼 …"
                            </p>
                          </div>

                          {/* Review 7 */}
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-display font-bold flex items-center justify-center select-none shadow">
                                  AF
                                </div>
                                <div>
                                  <h4 className="text-white text-xs font-bold uppercase tracking-wide">Arian Flores</h4>
                                  <span className="text-[9px] text-slate-400">Student • Youth Participant</span>
                                </div>
                              </div>
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                              </div>
                            </div>
                            <p className="text-slate-300 font-light text-xs leading-relaxed italic">
                              "10/10 I have a lot of fun, and the coaches really help me build discipline and stay focused on my education."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Section Bottom CTA - Support Our Mission */}
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-center space-y-4 max-w-3xl mx-auto relative overflow-hidden backdrop-blur-md">
                      <div className="absolute top-0 left-0 w-24 h-24 bg-brand-light-blue/5 rounded-full blur-xl" />
                      <Heart className="w-8 h-8 text-brand-light-blue mx-auto animate-pulse" />
                      <div className="space-y-2">
                        <h4 className="font-display font-medium text-white text-lg uppercase tracking-wider">Help Us Build Stronger Youth, Stronger Families, and Stronger Communities</h4>
                        <p className="text-slate-350 font-light text-xs max-w-xl mx-auto leading-relaxed">
                          Your donations support direct 1-on-1 mentorship, leadership development, sports programming, educational opportunities, and positive role models for youth across New Jersey, helping them make positive life decisions.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button 
                          onClick={() => handleDonate()}
                          className="bg-brand-light-blue hover:bg-brand-blue hover:text-white text-brand-blue px-8 py-3.5 rounded-xl font-bold font-display text-[11px] tracking-widest uppercase transition-all shadow-md cursor-pointer inline-block font-black border border-cyan-400/40"
                        >
                          DONATE &amp; SPONSOR NOW
                        </button>
                      </div>
                    </div>

                    {/* Highly Polished drive images gallery */}
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Authentic Programming Media</span>
                        <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">Our Athletes in Action</h3>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {communityPhotos.slice(0, 6).map((img, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-brand-light-blue transition-all cursor-pointer group relative shadow-md"
                            onClick={() => {
                              setSelectedAmount("100");
                              setCurrentPage('programs');
                            }}
                          >
                            <img 
                              src={img} 
                              alt="Youth action focus" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none"
                            />
                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>

                {/* Highly Polished Certifications Section on Home */}
                <section className="py-20 border-b border-slate-100">
                  <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
                    <div className="space-y-2">
                      <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">Vetted Statewide Credentials</span>
                      <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-slate-900">Project 201 Safety Certifications</h3>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {certificationChips.map((c, idx) => (
                        <div 
                          key={idx}
                          className="px-4 py-2.5 bg-white border border-slate-150 rounded-xl flex items-center gap-2 shadow-sm text-xs font-bold text-slate-700 tracking-wide select-none"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQ section */}
                <FAQ />
              </SoftGlowBackground>
            </main>
          )}

          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'programs' && (
            <ProgramsPage onDonate={() => handleDonate()} onNavigate={(page) => setCurrentPage(page)} />
          )}
          {currentPage === 'hire' && <HirePage />}
          {currentPage === 'youth-support' && <YouthSupportPage />}
          {currentPage === 'partnerships' && <SchoolsPartnershipsPage />}
          {currentPage === 'sponsors' && <SponsorsPartnersPage />}
          {currentPage === 'events' && <EventsPage />}
          {currentPage === 'donate' && (
            <DonatePage onDonate={(amt) => handleDonate(amt)} />
          )}
          {currentPage === 'merch' && <MerchPage />}
          {currentPage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      {/* Global Footer */}
      <Footer onPageChange={setCurrentPage} />

      {/* Persistent General Donation checkout handler */}
      <DonationCheckout 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        initialAmount={selectedAmount}
      />

      {/* Floating Donate Assist button (kept in code but hidden for now) */}
      {false && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDonate()}
          className="fixed bottom-8 right-8 z-40 bg-brand-blue text-white px-6 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[9px] shadow-2xl shadow-brand-blue/30 flex items-center gap-2 border border-white/10 group cursor-pointer font-display"
        >
          <Heart className="w-3.5 h-3.5 text-brand-light-blue group-hover:fill-brand-light-blue transition-all" />
          Donate Now
        </motion.button>
      )}
    </div>
  );
}
