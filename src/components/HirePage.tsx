import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Mic, 
  Dumbbell, 
  Compass, 
  BookOpen, 
  Flame, 
  Award, 
  Brain, 
  Apple, 
  BookmarkCheck, 
  HelpCircle,
  Clock,
  Briefcase,
  Heart,
  FileCheck
} from 'lucide-react';

export default function HirePage() {
  const [formData, setFormData] = useState({
    clientName: '',
    organization: '',
    email: '',
    phone: '',
    city: '',
    servicesSelected: [] as string[],
    programScale: 'One-off Session / Class',
    startDate: '',
    additionalDetails: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Grouped services requested by the user
  const serviceCategories = [
    {
      category: "Mentorship & Presentations",
      description: "Direct behavioral coaching, interactive workups, and inspirational group dialogues.",
      items: [
        { name: "One-on-One Mentorship", desc: "Private, intensive routine-building and high-accountability focus loops.", icon: Compass },
        { name: "Group Mentorship", desc: "Structured cohort sessions centered around positive peer mechanics.", icon: Users },
        { name: "Motivational Speaking", desc: "High-impact keynote delivery on leadership, resilience, and personal determination.", icon: Mic },
        { name: "School Presentations", desc: "Assembly and classroom curriculum integrations for high-risk youth populations.", icon: BookOpen },
        { name: "Leadership Workshops", desc: "Team accountability, leadership principles, and corporate/youth mechanics.", icon: Flame }
      ]
    },
    {
      category: "Boxing & Sports Development",
      description: "Athletic-grade mechanics, heavy discipline, and group structure routines.",
      items: [
        { name: "Boxing Programs", desc: "Structured contact and training modules emphasizing emotional control.", icon: Award },
        { name: "Sports Training", desc: "Foundational, safe high-literacy practice plans for youth cohorts.", icon: Dumbbell },
        { name: "Baseball Lessons", desc: "Hitting, fielding, pitching, and sport-specific physical acceleration.", icon: BookmarkCheck },
        { name: "Basketball Training", desc: "Conditioning, shot mechanics, positioning, and ball handling instruction.", icon: Check },
        { name: "Flag Football Training", desc: "High-performance speed routes, playbook learning, and tactical conditioning.", icon: FileCheck },
        { name: "Speed & Agility Training", desc: "Explosive footwork, lateral acceleration, and deceleration mechanics.", icon: Sparkles }
      ]
    },
    {
      category: "Performance & Wellness",
      description: "Adult and youth physical conditioning and structural lifestyle guidance.",
      items: [
        { name: "Personal Training", desc: "Targeted individual body recomposition and tailored strength programs.", icon: Dumbbell },
        { name: "Strength & Conditioning", desc: "Athletic power, posture, stamina thresholds, and core stabilization.", icon: Brain },
        { name: "Nutrition Coaching", desc: "Systematic meal guide support, metabolic routines, and hydration coaching.", icon: Apple }
      ]
    }
  ];

  const handleToggleService = (serviceName: string) => {
    if (formData.servicesSelected.includes(serviceName)) {
      setFormData(prev => ({
        ...prev,
        servicesSelected: prev.servicesSelected.filter(s => s !== serviceName)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        servicesSelected: [...prev.servicesSelected, serviceName]
      }));
    }
  };

  const handleSelectCategoryGroup = (servicesList: string[]) => {
    // If all are selected, deselect; otherwise, select all
    const allSelected = servicesList.every(s => formData.servicesSelected.includes(s));
    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        servicesSelected: prev.servicesSelected.filter(s => !servicesList.includes(s))
      }));
    } else {
      setFormData(prev => {
        const unique = Array.from(new Set([...prev.servicesSelected, ...servicesList]));
        return { ...prev, servicesSelected: unique };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* Page Hero */}
      <section className="bg-brand-blue text-white py-16 md:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-light-blue rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3 font-display">
            Hire Project 201
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-5 leading-tight">
            Programs &amp; <span className="font-bold text-brand-light-blue">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Parents, schools, organizations, and community teams can hire Project 201 to host custom workshops, assemblies, athletic instruction, and structured youth mentoring campaigns. Let’s build your cohort.
          </p>

          {/* Core Framework Cleave: Donate vs Hire */}
          <div className="mt-12 max-w-3xl mx-auto bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-[2rem] backdrop-blur-md grid sm:grid-cols-2 gap-6 text-left">
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-6">
              <div className="flex items-center gap-2 text-brand-light-blue">
                <Heart className="w-4 h-4 text-brand-light-blue shrink-0" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">Donate &amp; Sponsor</span>
              </div>
              <p className="text-slate-300 font-light text-xs leading-relaxed">
                Supporting our organizational mission through financial backing. Keeps our programs accessible and provides scholarships for city youth.
              </p>
            </div>
            <div className="space-y-2 sm:pl-4">
              <div className="flex items-center gap-2 text-brand-light-blue">
                <Briefcase className="w-4 h-4 text-brand-light-blue shrink-0" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">Request Services</span>
              </div>
              <p className="text-slate-300 font-light text-xs leading-relaxed">
                Directly contracting our professional coaches, speakers, and coordinators to lead workouts, lessons, mental support workshops, or athletic training camps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Selection and Booking Setup */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Services Directory (7 Columns) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">Contract Options</span>
                <h2 className="font-display text-3xl font-extrabold text-slate-900 uppercase">
                  Service Directory
                </h2>
                <p className="text-slate-500 font-light text-xs leading-relaxed">
                  Toggle services below to automatically add them to your Custom Consultation Proposal on the right, or review individual descriptions.
                </p>
              </div>

              {/* Service Mapping */}
              <div className="space-y-10">
                {serviceCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div>
                        <h3 className="font-display font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                          {cat.category}
                        </h3>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tight">
                          {cat.description}
                        </p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleSelectCategoryGroup(cat.items.map(i => i.name))}
                        className="text-[9px] font-bold text-brand-blue uppercase tracking-widest hover:text-brand-light-blue transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-lg"
                      >
                        {cat.items.every(i => formData.servicesSelected.includes(i.name)) ? "Deselect All" : "Select Entire Group"}
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {cat.items.map((item, itemIdx) => {
                        const isChosen = formData.servicesSelected.includes(item.name);
                        const Icon = item.icon;
                        return (
                          <div 
                            key={itemIdx}
                            onClick={() => handleToggleService(item.name)}
                            className={`border rounded-2xl p-4 transition-all cursor-pointer select-none relative group overflow-hidden flex gap-4 text-left ${
                              isChosen 
                                ? 'bg-brand-blue/5 border-brand-light-blue shadow-sm' 
                                : 'bg-white border-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                              isChosen ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="space-y-1 flex-1">
                              <h4 className="font-display font-bold text-xs uppercase text-slate-800 tracking-tight leading-snug flex items-center gap-1.5">
                                {item.name}
                                {isChosen && <Check className="w-3.5 h-3.5 text-brand-light-blue shrink-0" />}
                              </h4>
                              <p className="text-slate-500 font-light text-[10px] leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Booking Guidelines */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">
                  Our Coaching &amp; Presentations Philosophy
                </h4>
                <p className="text-slate-500 font-light text-xs leading-relaxed">
                  Project 201 coordinates with athletic directors, caseworkers, municipal community leaders, and parents directly. For school contracts/presentations, we coordinate carefully with local care groups and districts to guarantee program delivery is aligned to proper educational and sports safety councils.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left select-none">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Athletics Safety</span>
                    <p className="text-slate-700 font-semibold text-xs uppercase tracking-tight">Rutgers Certified Safety</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Combat Sports Code</span>
                    <p className="text-slate-700 font-semibold text-xs uppercase tracking-tight">USA Boxing Registered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Consultation Form (5 Columns) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1.5 tracking-tight uppercase">
                  Service Request Booking
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 block">
                  Book a Consultation / Hire Us
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="booking-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                          Your Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                          placeholder="e.g. parent name or principal name"
                          className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Organization */}
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                          Organization / School Name (Optional)
                        </label>
                        <input 
                          type="text" 
                          value={formData.organization}
                          onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                          placeholder="e.g. Bayonne High School, or N/A"
                          className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Contact Channels */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                            Work Email *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="name@organization.com"
                            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                            Best Contact Phone *
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="732-555-0199"
                            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      {/* Location & Scale */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                            Location City/Town *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Bayonne, NJ"
                            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                            Program Scale Focus
                          </label>
                          <select
                            value={formData.programScale}
                            onChange={(e) => setFormData(prev => ({ ...prev, programScale: e.target.value }))}
                            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          >
                            <option value="One-off Session / Class">One-off Session / Class</option>
                            <option value="Multi-week Program Cohort">Multi-week Program Cohort</option>
                            <option value="School Assembly / Presentation">School Assembly / Presentation</option>
                            <option value="Ongoing Personal Coaching">Ongoing Personal Coaching</option>
                            <option value="Recurring Youth Mentorship">Recurring Youth Mentorship</option>
                          </select>
                        </div>
                      </div>

                      {/* Chosen indicators showcase */}
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                          Selected Services ({formData.servicesSelected.length})
                        </span>
                        {formData.servicesSelected.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center text-[10px] text-slate-450 italic bg-slate-50 selection:bg-transparent">
                            No services selected. Click options on the left to add them!
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto border border-slate-100 rounded-xl p-2.5 bg-slate-50/50">
                            {formData.servicesSelected.map((s, idx) => (
                              <span 
                                key={idx}
                                onClick={() => handleToggleService(s)}
                                className="inline-flex items-center gap-1 bg-brand-blue/10 border border-brand-blue/10 text-brand-blue text-[9px] font-extrabold px-2 py-0.5 rounded-md hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-colors select-none cursor-pointer uppercase tracking-tight"
                              >
                                {s} <Check className="w-3 h-3 text-brand-light-blue shrink-0" />
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Additional project descriptions */}
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                          Additional details, requested dates, or cohort numbers
                        </label>
                        <textarea
                          rows={2}
                          value={formData.additionalDetails}
                          onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                          placeholder="Tell us about the target age groups, schedule preferences, or venue details..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting ? 'Verifying Coordinates...' : 'Book Consultation / Request Services'}
                        <ArrowRight className="w-3.5 h-3.5 text-brand-light-blue shrink-0 animate-pulse" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="booking-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 px-4 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                          Consultation Requested
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for coordinating with Project 201! Coach Shawn Kelly and our team will review the services selected (**{formData.servicesSelected.join(', ') || 'General Consultation'}**). We will contact you or your representative at **{formData.phone}** / **{formData.email}** to configure pricing, licensing paperwork, and target goals.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            clientName: '',
                            organization: '',
                            email: '',
                            phone: '',
                            city: '',
                            servicesSelected: [],
                            programScale: 'One-off Session / Class',
                            startDate: '',
                            additionalDetails: ''
                          });
                        }} 
                        className="text-[10px] font-bold text-brand-blue uppercase tracking-widest border border-slate-200 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Safety Legal Bottom Frame */}
      <section className="bg-slate-950 text-white py-12 border-t border-white/5 select-none text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-slate-400 font-light text-[11px] md:text-xs leading-relaxed">
            Project 201 is a youth mentorship development and sports instruction agency. We do not provide licensed clinical therapy, psychiatric treatment, or certified medical services. Hiring us supports localized communities in expansion and scholarship operations.
          </p>
        </div>
      </section>
    </div>
  );
}
