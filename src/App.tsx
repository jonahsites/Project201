import React, { useState, useEffect, useCallback } from 'react';
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
import DonatePage from './components/DonatePage';
import ContactPage from './components/ContactPage';
import MerchPage from './components/MerchPage';
import HolidayDropSection from './components/HolidayDropSection';
import VanCampaignSection from './components/VanCampaignSection';

import ConsoleWorkspace from './components/cms/ConsoleWorkspace';
import CustomTemplatePage from './components/cms/CustomTemplatePage';
import { EditableImage, EditableText } from './components/cms/Editable';
import { useSiteContent } from './context/SiteContentContext';
import { BUILTIN_PAGES } from './types/cms';

import { DonationCheckout } from './components/DonationCheckout';
import { SoftGlowBackground } from './components/ui/SoftGlowBackground';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  ArrowRight,
  Star,
} from 'lucide-react';

const KNOWN_STATIC_ROUTES = new Set<string>([...BUILTIN_PAGES, 'console']);

function getRawSlugFromUrl(): string {
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  if (path) return path;
  const hash = window.location.hash.replace(/^#\/?|\/$/g, '').toLowerCase();
  if (hash) return hash;
  return 'home';
}

export default function App() {
  const {
    setIsConsoleMode,
    consoleEditMode,
    activeCustomPages,
    isPageHidden,
    getPageLabel,
  } = useSiteContent();

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const raw = getRawSlugFromUrl();
    if (KNOWN_STATIC_ROUTES.has(raw)) return raw;
    // Allow raw slug to remain so custom pages loaded from Firestore can match once ready
    return raw || 'home';
  });

  const [consolePreviewSlug, setConsolePreviewSlug] = useState<string>('home');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('50');

  // Toggle console draft editing context whenever /console is active
  useEffect(() => {
    setIsConsoleMode(currentPage === 'console');
  }, [currentPage, setIsConsoleMode]);

  // Sync state to URL pathname whenever currentPage updates
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    const targetPath = currentPage === 'home' ? '' : currentPage;

    if (currentPath !== targetPath) {
      const newUrl = currentPage === 'home' ? '/' : `/${currentPage}`;
      window.history.pushState({ page: currentPage }, '', newUrl);
    }
  }, [currentPage]);

  // Sync back from browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getRawSlugFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleDonate = useCallback((_amount?: string) => {
    window.open(
      'https://www.zeffy.com/en-US/donation-form/support-project--201',
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  const handleVanCampaignClick = useCallback(
    (onNavigate: (slug: string) => void) => {
      const el = document.getElementById('youth-van-campaign');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('donate');
      }
    },
    []
  );

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

  const certificationChips = [
    'USA Boxing Certified',
    'Rutgers Youth Sports Safety Certified',
    'Mental Health First Aid',
    'QPR Suicide Prevention',
    'Certified Personal Trainer',
    'CPR/First Aid',
  ];

  const communityPhotos = [
    'https://lh3.googleusercontent.com/d/10NdIV7FeIt5tIMhFOWKsiMuM-uyhI_Db',
    'https://lh3.googleusercontent.com/d/13aND3E8KNJgCn80zUh8EdNjXop5E3HEH',
    'https://lh3.googleusercontent.com/d/13zHLJ8oTLd-goOxDLITydzZfFCmCABlk',
    'https://lh3.googleusercontent.com/d/14Bbiwk_VYTyHK4mIsDK6GoPHe7HNYARh',
    'https://lh3.googleusercontent.com/d/17g5VEHcANuRmly8jBswRPBmp6lrgupXq',
    'https://lh3.googleusercontent.com/d/1Ds-o_Hg5Qm2fA0sS7ybSnlHCI8dlMCpt',
  ];

  const reviewsList = [
    {
      initials: 'JF',
      altStyle: false,
      name: 'Jeanne Flores',
      meta: 'Parent • 5 reviews',
      quote:
        'I can’t thank Coach Kellz enough for the impact he has had on my son’s life. Since starting weekly mentorship, I’ve watched my son grow into a more confident, determined, and happier version of himself, taking real accountability for his decisions.',
    },
    {
      initials: 'BN',
      altStyle: true,
      name: 'Bishop Nichols',
      meta: 'Student Athlete • 1 review',
      quote:
        'I met Coach Kellz in 2020 during my senior year of high school, right in the middle of COVID. While everything was shut down, I was still out on the field trying to get better, and he was the only person crazy enough like me to still be out there pushing me to my absolute limits, keeping me focused.',
    },
    {
      initials: 'AG',
      altStyle: false,
      name: 'Ariel Galan',
      meta: 'Student Athlete • 1 review',
      quote:
        'The best mentorship with Project 201, it is amazing and fun to learn and develop leadership skills. I worked on my goals and learned true structure and personal growth. I am happy to be guided by coaches who care about our future!',
    },
    {
      initials: 'NW',
      altStyle: true,
      name: 'Natanya Wachtel',
      meta: 'Community Leader • 5 reviews',
      quote:
        'Wonderful organization supporting youth through healthy participation in sports and community 💕 the mentorship is best in class…',
    },
    {
      initials: 'IJ',
      altStyle: false,
      name: 'Ian Jones',
      meta: 'Community Partner • 1 review',
      quote:
        'Shawn and Ana have a genuine passion for serving the kids of the community, providing structured activities to help them thrive.',
    },
    {
      initials: 'SO',
      altStyle: true,
      name: 'Sarah Obaid',
      meta: 'Local Guide • 23 reviews',
      quote: 'A much needed program for the youth 🙏🏼 …',
    },
    {
      initials: 'AF',
      altStyle: false,
      name: 'Arian Flores',
      meta: 'Student • Youth Participant',
      quote:
        '10/10 I have a lot of fun, and the coaches really help me build discipline and stay focused on my education.',
    },
  ];

  const renderHomePage = (onNavigate: (slug: string) => void, embeddedInConsole: boolean) => (
    <main>
      {/* Hero Banner */}
      <Hero
        onDonate={() => handleDonate()}
        onLearnMore={() => onNavigate('programs')}
        onSupportClick={() => onNavigate('youth-support')}
        onHolidayDropClick={() => onNavigate('holiday-drop')}
        onVanCampaignClick={() => handleVanCampaignClick(onNavigate)}
      />

      <SoftGlowBackground>
        {/* The Umbrella Framework Section */}
        <section className="py-24 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <EditableText
                id="home.umbrella.eyebrow"
                as="span"
                label="Umbrella Section Eyebrow"
                defaultText="The Parent Umbrella Brand"
                className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display"
              />
              <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 uppercase">
                <EditableText
                  id="home.umbrella.title1"
                  label="Umbrella Title Word 1"
                  defaultText="PROJECT"
                />{' '}
                <EditableText
                  id="home.umbrella.title2"
                  label="Umbrella Title Accent"
                  defaultText="201"
                  className="text-brand-light-blue"
                />
              </h2>
              <EditableText
                id="home.umbrella.subtitle"
                as="p"
                multiline
                label="Umbrella Description"
                defaultText="Five core branches operating statewide under a centralized mission of athletic performance, routine accountability, and student-parent support coordinates."
                className="text-slate-500 font-light text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 'branch1',
                  tag: 'Branch 01',
                  title: '201 Sports',
                  desc: 'Elite performance speed, body control, physical literacy, and strength agility coaching modeled on professional college athletic preps.',
                  cta: 'Explore athletics',
                },
                {
                  id: 'branch2',
                  tag: 'Branch 02',
                  title: '201 Boxing',
                  desc: 'Controlled, USA Boxing-registered coaching used specifically to build deep self-respect, active workout outlets, and cardiovascular discipline.',
                  cta: 'Explore boxing',
                },
                {
                  id: 'branch3',
                  tag: 'Branch 03',
                  title: 'Mentorship Circle',
                  desc: 'Individualized counseling alignments huddling youth around weekly routine calendars, behavior regulation journals, and goal follow-ups.',
                  cta: 'Explore mentorship',
                },
                {
                  id: 'branch4',
                  tag: 'Branch 04',
                  title: 'School Programs',
                  desc: 'In-school structured recesstimes, behavioral transition programs, and special athletic assemblies coordinated with teachers.',
                  cta: 'Explore schools',
                },
                {
                  id: 'branch5',
                  tag: 'Branch 05',
                  title: 'Summer Programs',
                  desc: 'High frequency summer sports training camps coupled with group community outings, regular field trips, and healthy nutritionist habits coaching.',
                  cta: 'Explore summer',
                },
              ].map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-blue/20 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <EditableText
                      id={`home.${branch.id}.tag`}
                      as="span"
                      label={`${branch.title} Tag`}
                      defaultText={branch.tag}
                      className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display block"
                    />
                    <EditableText
                      id={`home.${branch.id}.title`}
                      as="h3"
                      label={`${branch.title} Title`}
                      defaultText={branch.title}
                      className="font-display font-bold text-xl uppercase tracking-tight text-slate-850"
                    />
                    <EditableText
                      id={`home.${branch.id}.desc`}
                      as="p"
                      multiline
                      label={`${branch.title} Description`}
                      defaultText={branch.desc}
                      className="text-slate-500 font-light text-xs leading-relaxed"
                    />
                  </div>
                  <button
                    onClick={() => onNavigate('programs')}
                    className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2 hover:text-brand-light-blue transition-colors focus:outline-none cursor-pointer"
                  >
                    <EditableText
                      id={`home.${branch.id}.cta`}
                      label={`${branch.title} Link Text`}
                      defaultText={branch.cta}
                    />{' '}
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}

              {/* Partner card */}
              <div className="bg-brand-blue text-white p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl border border-brand-light-blue/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 blur-2xl rounded-full" />
                <div className="space-y-3 z-10 relative">
                  <EditableText
                    id="home.referralCard.tag"
                    as="span"
                    label="Referral Card Tag"
                    defaultText="Referrals"
                    className="text-[9px] font-bold tracking-widest text-brand-light-blue uppercase font-display block"
                  />
                  <EditableText
                    id="home.referralCard.title"
                    as="h3"
                    label="Referral Card Title"
                    defaultText="Need Personal Mentoring?"
                    className="font-display font-bold text-xl uppercase tracking-tight text-white"
                  />
                  <EditableText
                    id="home.referralCard.desc"
                    as="p"
                    multiline
                    label="Referral Card Description"
                    defaultText="Are you a parent seeking direct assistance with a child's structure, motivation, school routine, or behavior? Apply inside."
                    className="text-white/70 font-light text-xs leading-relaxed"
                  />
                </div>
                <button
                  onClick={() => onNavigate('youth-support')}
                  className="mt-6 w-full py-3 bg-brand-light-blue text-brand-blue rounded-xl font-bold font-display text-[9px] tracking-widest uppercase hover:bg-white transition-all z-10 cursor-pointer"
                >
                  <EditableText
                    id="home.referralCard.cta"
                    label="Referral Card Button"
                    defaultText="Parent support form"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pizzeria Partner & Youth Transportation Van Campaign */}
        <VanCampaignSection onNavigateContact={() => onNavigate('contact')} />

        {/* 201 EST. 1947 Holiday Drop Section */}
        <HolidayDropSection standalone={false} />

        {/* Strong IMPACT Section */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-6xl space-y-20 relative z-10">
            {/* Stats Ticker */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
              {[
                { id: 'stat1', num: '250+', label: 'Overall Reached', sub: 'Youth Mentored & Supported' },
                { id: 'stat2', num: '20+', label: '1-on-1 Mentorship', sub: 'Deep Personal Guidance' },
                { id: 'stat3', num: 'Multiple', label: 'Off Home Monitoring', sub: 'Successfully Transitioned' },
                { id: 'stat4', num: '100%', label: 'Vetted & Screened', sub: 'Coaches & Mentors Vetted' },
              ].map((st) => (
                <div key={st.id} className="space-y-1">
                  <EditableText
                    id={`home.${st.id}.num`}
                    as="span"
                    label={`${st.label} Number`}
                    defaultText={st.num}
                    className="block font-display text-4xl lg:text-5xl font-black text-brand-light-blue"
                  />
                  <EditableText
                    id={`home.${st.id}.label`}
                    as="span"
                    label={`${st.label} Title`}
                    defaultText={st.label}
                    className="block text-[10px] text-slate-450 font-bold uppercase tracking-widest"
                  />
                  <EditableText
                    id={`home.${st.id}.sub`}
                    as="span"
                    label={`${st.label} Subtitle`}
                    defaultText={st.sub}
                    className="block text-[9px] text-slate-500 font-semibold leading-tight"
                  />
                </div>
              ))}
            </div>

            {/* Help Us Reach More Youth CTA */}
            <div className="bg-gradient-to-r from-brand-blue/30 via-slate-900 to-brand-blue/30 border border-brand-light-blue/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light-blue/5 rounded-full blur-xl pointer-events-none" />
              <div className="space-y-1.5 text-center md:text-left relative z-10">
                <EditableText
                  id="home.reachCta.title"
                  as="h4"
                  label="Reach Youth CTA Heading"
                  defaultText="Help Us Reach More Youth"
                  className="font-display font-bold text-white text-base md:text-lg uppercase tracking-tight"
                />
                <EditableText
                  id="home.reachCta.desc"
                  as="p"
                  multiline
                  label="Reach Youth CTA Description"
                  defaultText="Every contribution expands our reach—providing program supplies, wholesome meals, and athletic coaching slots for local teens across New Jersey."
                  className="text-slate-350 font-light text-xs max-w-xl leading-relaxed"
                />
              </div>
              <button
                onClick={() => handleDonate()}
                className="bg-brand-light-blue hover:bg-brand-light-blue/90 text-brand-blue px-6 py-3 rounded-xl font-bold font-display text-[11px] tracking-widest uppercase transition-all shadow-md shrink-0 cursor-pointer relative z-10 font-black border border-cyan-400/35"
              >
                <EditableText
                  id="home.reachCta.btn"
                  label="Reach Youth Button"
                  defaultText="SUPPORT OUR ATHLETES"
                />
              </button>
            </div>

            {/* Headline and text */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <EditableText
                  id="home.outcomes.eyebrow"
                  as="span"
                  label="Outcomes Eyebrow"
                  defaultText="Real NJ Impact Tracking"
                  className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display"
                />
                <h2 className="font-display text-3xl md:text-4xl font-light uppercase leading-tight text-white">
                  <EditableText
                    id="home.outcomes.title1"
                    label="Outcomes Heading Line 1"
                    defaultText="Proven outcomes in"
                  />{' '}
                  <br />
                  <EditableText
                    id="home.outcomes.title2"
                    label="Outcomes Heading Line 2"
                    defaultText="behavior & performance"
                    className="font-bold text-brand-light-blue"
                  />
                </h2>
                <EditableText
                  id="home.outcomes.desc"
                  as="p"
                  multiline
                  label="Outcomes Paragraph"
                  defaultText="Project 201 does not rely on simple athletic drills. We operate structured mentorship frameworks that hold students accountable to teachers, parents, and community trainers on a daily tracking coordinate."
                  className="text-slate-400 font-light text-xs md:text-sm leading-relaxed"
                />

                {/* High-Impact Real Life Story Snippet */}
                <div className="bg-brand-blue/15 border border-brand-light-blue/20 rounded-3xl p-5 space-y-2.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-light-blue/5 rounded-full blur-xl" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-light-blue font-display flex items-center gap-1.5 select-none">
                    <Sparkles className="w-3 w-3 animate-pulse text-brand-light-blue" />
                    <EditableText
                      id="home.outcomes.highlightLabel"
                      label="Highlight Box Label"
                      defaultText="Real Impact Highlight"
                    />
                  </span>
                  <EditableText
                    id="home.outcomes.highlightQuote"
                    as="p"
                    multiline
                    label="Highlight Box Quote"
                    defaultText='"One youth facing removal from their home became Student of the Month within one month of structured mentorship and support."'
                    className="text-slate-200 text-xs italic font-light leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('about')}
                    className="bg-white/10 hover:bg-white/20 border border-white/15 px-6 py-3 rounded-xl font-bold font-display text-[10px] tracking-widest uppercase text-white transition-all cursor-pointer"
                  >
                    <EditableText
                      id="home.outcomes.cta"
                      label="Founder Story Button"
                      defaultText="Read Founder Story"
                    />
                  </button>
                </div>
              </div>

              {/* Testimonial Board cards */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <EditableText
                      id="home.reviews.title"
                      as="span"
                      label="Reviews Section Title"
                      defaultText="Google Reviews"
                      className="text-sm font-bold text-white uppercase tracking-wider font-display select-none"
                    />
                    <EditableText
                      id="home.reviews.ratingBadge"
                      as="span"
                      label="Reviews Rating Badge"
                      defaultText="5.0 ★ Rating"
                      className="text-brand-light-blue text-xs font-bold bg-brand-blue/30 border border-brand-light-blue/20 px-2 py-0.5 rounded-full select-none"
                    />
                  </div>
                  <EditableText
                    id="home.reviews.statusLabel"
                    as="span"
                    label="Reviews Status Label"
                    defaultText="Active Feedback"
                    className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none"
                  />
                </div>

                <div className="max-h-[500px] overflow-y-auto space-y-4 pr-3 scrollbar-thin scrollbar-thumb-brand-blue scrollbar-track-white/5">
                  {reviewsList.map((rev, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-white/5 border border-white/10 rounded-3xl p-6 relative hover:border-brand-light-blue/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full font-display font-bold flex items-center justify-center select-none shadow ${
                              rev.altStyle
                                ? 'bg-brand-light-blue/10 text-brand-light-blue border border-brand-light-blue/20'
                                : 'bg-brand-blue text-white'
                            }`}
                          >
                            {rev.initials}
                          </div>
                          <div>
                            <EditableText
                              id={`home.review.${rIdx}.name`}
                              as="h4"
                              label={`Reviewer ${rIdx + 1} Name`}
                              defaultText={rev.name}
                              className="text-white text-xs font-bold uppercase tracking-wide"
                            />
                            <EditableText
                              id={`home.review.${rIdx}.meta`}
                              as="span"
                              label={`Reviewer ${rIdx + 1} Role`}
                              defaultText={rev.meta}
                              className="text-[9px] text-slate-400 block"
                            />
                          </div>
                        </div>
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <EditableText
                        id={`home.review.${rIdx}.quote`}
                        as="p"
                        multiline
                        label={`Reviewer ${rIdx + 1} Quote`}
                        defaultText={`"${rev.quote}"`}
                        className="text-slate-300 font-light text-xs leading-relaxed italic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Section Bottom CTA */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-center space-y-4 max-w-3xl mx-auto relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-24 h-24 bg-brand-light-blue/5 rounded-full blur-xl" />
              <Heart className="w-8 h-8 text-brand-light-blue mx-auto animate-pulse" />
              <div className="space-y-2">
                <EditableText
                  id="home.donateCta.title"
                  as="h4"
                  label="Donate CTA Title"
                  defaultText="Help Us Build Stronger Youth, Stronger Families, and Stronger Communities"
                  className="font-display font-medium text-white text-lg uppercase tracking-wider"
                />
                <EditableText
                  id="home.donateCta.desc"
                  as="p"
                  multiline
                  label="Donate CTA Description"
                  defaultText="Your donations support direct 1-on-1 mentorship, leadership development, sports programming, educational opportunities, and positive role models for youth across New Jersey, helping them make positive life decisions."
                  className="text-slate-350 font-light text-xs max-w-xl mx-auto leading-relaxed"
                />
              </div>
              <div className="pt-2">
                <button
                  onClick={() => handleDonate()}
                  className="bg-brand-light-blue hover:bg-brand-blue hover:text-white text-brand-blue px-8 py-3.5 rounded-xl font-bold font-display text-[11px] tracking-widest uppercase transition-all shadow-md cursor-pointer inline-block font-black border border-cyan-400/40"
                >
                  <EditableText
                    id="home.donateCta.btn"
                    label="Donate CTA Button"
                    defaultText="DONATE & SPONSOR NOW"
                  />
                </button>
              </div>
            </div>

            {/* Athletes in Action Photo Gallery */}
            <div className="space-y-6">
              <div>
                <EditableText
                  id="home.gallery.eyebrow"
                  as="span"
                  label="Gallery Eyebrow"
                  defaultText="Authentic Programming Media"
                  className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1"
                />
                <EditableText
                  id="home.gallery.title"
                  as="h3"
                  label="Gallery Heading"
                  defaultText="Our Athletes in Action"
                  className="font-display font-bold text-lg text-white uppercase tracking-tight"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {communityPhotos.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-brand-light-blue transition-all cursor-pointer group relative shadow-md"
                    onClick={() => {
                      if (embeddedInConsole && consoleEditMode) return;
                      setSelectedAmount('100');
                      onNavigate('programs');
                    }}
                  >
                    <EditableImage
                      id={`home.gallery.${idx}`}
                      defaultSrc={img}
                      alt={`Youth athlete gallery ${idx + 1}`}
                      label={`Athletes in Action Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section on Home */}
        <section className="py-20 border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
            <div className="space-y-2">
              <EditableText
                id="home.certs.eyebrow"
                as="span"
                label="Certifications Eyebrow"
                defaultText="Vetted Statewide Credentials"
                className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display"
              />
              <EditableText
                id="home.certs.title"
                as="h3"
                label="Certifications Heading"
                defaultText="Project 201 Safety Certifications"
                className="font-display text-2xl font-bold uppercase tracking-tight text-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {certificationChips.map((c, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 bg-white border border-slate-150 rounded-xl flex items-center gap-2 shadow-sm text-xs font-bold text-slate-700 tracking-wide select-none"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <EditableText
                    id={`home.cert.${idx}`}
                    label={`Certification ${idx + 1}`}
                    defaultText={c}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <FAQ />
      </SoftGlowBackground>
    </main>
  );

  const renderPageBody = (
    slug: string,
    onNavigate: (target: string) => void,
    embeddedInConsole: boolean
  ) => {
    const customPage = activeCustomPages.find((p) => p.slug === slug);
    const hidden = isPageHidden(slug);

    // On live public site, hidden pages fall back gracefully
    if (!embeddedInConsole && hidden && slug !== 'home') {
      return (
        <div className="pt-36 pb-24 text-center container mx-auto px-4 max-w-xl space-y-4">
          <h1 className="font-display text-3xl font-bold text-slate-900 uppercase">
            Page Unavailable
          </h1>
          <p className="text-slate-600 text-sm">
            The page &ldquo;{getPageLabel(slug)}&rdquo; is currently hidden or not published.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      );
    }

    if (customPage) {
      return <CustomTemplatePage page={customPage} onNavigate={onNavigate} />;
    }

    switch (slug) {
      case 'about':
        return <AboutPage />;
      case 'programs':
        return <ProgramsPage onDonate={() => handleDonate()} onNavigate={onNavigate} />;
      case 'hire':
        return <HirePage />;
      case 'youth-support':
        return <YouthSupportPage />;
      case 'partnerships':
        return <SchoolsPartnershipsPage />;
      case 'sponsors':
        return <SponsorsPartnersPage />;
      case 'donate':
        return (
          <DonatePage
            onDonate={(amt) => handleDonate(amt)}
            onNavigateContact={() => onNavigate('contact')}
          />
        );
      case 'holiday-drop':
        return <HolidayDropSection standalone={true} />;
      case 'merch':
        return <MerchPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return renderHomePage(onNavigate, embeddedInConsole);
    }
  };

  const renderWebsitePreview = (
    pageSlug: string,
    onNavigate: (target: string) => void,
    embeddedInConsole: boolean
  ) => (
    <div className="bg-white text-slate-900 selection:bg-brand-light-blue selection:text-brand-blue flex flex-col min-h-screen">
      <Navbar
        activePage={pageSlug}
        onPageChange={onNavigate}
        embeddedInConsole={embeddedInConsole}
      />

      <div className="flex-1">
        {embeddedInConsole ? (
          renderPageBody(pageSlug, onNavigate, true)
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={pageSlug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderPageBody(pageSlug, onNavigate, false)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <Footer onPageChange={onNavigate} embeddedInConsole={embeddedInConsole} />
    </div>
  );

  // /console duplicate website studio workspace
  if (currentPage === 'console') {
    return (
      <ConsoleWorkspace
        previewSlug={consolePreviewSlug}
        onSelectPreviewSlug={setConsolePreviewSlug}
        onExitConsole={(target) => {
          setIsConsoleMode(false);
          setCurrentPage(target || 'home');
        }}
        renderWebsitePreview={() =>
          renderWebsitePreview(consolePreviewSlug, setConsolePreviewSlug, true)
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-light-blue selection:text-brand-blue">
      {renderWebsitePreview(currentPage, setCurrentPage, false)}

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
