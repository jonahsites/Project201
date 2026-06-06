import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
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
  FileCheck,
  ShieldAlert,
  FileText,
  CreditCard,
  Printer,
  Download,
  MailCheck,
  PenTool
} from 'lucide-react';

export default function HirePage() {
  const [activeTab, setActiveTab] = useState<'consultation' | 'registration'>('consultation');

  // Consultation Tab Form State
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

  // Parent Registration Tab State
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [regData, setRegData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    city: '',
    childName: '',
    childAge: '',
    childSchool: '',
    childGrade: '',
    selectedProgram: 'Boxing Programs & Mentorship Circle',
    sessionBatchCount: 'Monthly Routine Subscription',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    medicalConcerns: '',
    insuranceProvider: '',
    waiverConsent: false,
    mediaConsent: false,
    typedSignature: '',
    invoiceId: 'P201-INV-2026-TBD',
    issueDate: '',
  });

  const [regSubmitting, setRegSubmitting] = useState(false);

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

  // Specific programs pricing structure for parents
  const individualPrograms = [
    { id: 'boxing', name: "Boxing Programs & Mentorship Circle", price: 120, unit: "Monthly Routine", category: "Boxing" },
    { id: 'baseball', name: "Baseball Lessons & Athletic Acceleration", price: 75, unit: "Per Private Session", category: "Baseball" },
    { id: 'swimming', name: "201 Swim Academy (5 Private Lessons)", price: 125, unit: "Per 5-Session Program", category: "Swimming" },
    { id: 'basketball', name: "Basketball Skills & Position Conditioning", price: 65, unit: "Per Class", category: "Basketball" },
    { id: 'speed_agility', name: "Speed & Agility Performance Training", price: 70, unit: "Per Session", category: "Athletics" },
    { id: 'one_one_mentor', name: "One-on-One Intimate Youth Coaching & Mentoring", price: 95, unit: "Per Mentorship Hour", category: "Mentorship" },
    { id: 'personal_training', name: "Strength & Conditioning (Personal Training)", price: 85, unit: "Per Session", category: "Wellness" }
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

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  // Switch to Tab B Registration helper
  const handleStartDirectRegistration = (programName?: string) => {
    setActiveTab('registration');
    setRegStep(1);
    if (programName) {
      setRegData(prev => ({
        ...prev,
        selectedProgram: programName
      }));
    }
  };

  // Submit Parent Registration and Advance to Step 3 (Invoice)
  const handleSubmitRegistrationStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.waiverConsent || !regData.typedSignature.trim()) {
      alert("Please accept the Athletic Liability Waiver and type your signature to continue.");
      return;
    }
    
    setRegSubmitting(true);
    setTimeout(() => {
      const generatedInvId = `P201-INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const activeDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setRegData(prev => ({
        ...prev,
        invoiceId: generatedInvId,
        issueDate: activeDate
      }));
      setRegSubmitting(false);
      setRegStep(3); // Go to step 3: Invoice Sent
    }, 1500);
  };

  const selectedProgramDetails = individualPrograms.find(p => p.name === regData.selectedProgram) || individualPrograms[0];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* Page Hero */}
      <section className="bg-brand-blue text-white py-16 md:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-light-blue rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3 font-display">
            Project 201 Intake &amp; Booking
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-5 leading-tight">
            Work with <span className="font-bold text-brand-light-blue">Project 201</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Choose your path: Schools/Agencies can contract customized community lectures, assemblies, or training programs. Parents can register their youth directly for sports lessons, mentorship, and clinical sports preparation.
          </p>

          {/* Interactive Navigation Switcher */}
          <div className="mt-12 max-w-2xl mx-auto flex p-1.5 bg-slate-900/60 rounded-2xl border border-white/10 relative z-20">
            <button
              onClick={() => setActiveTab('consultation')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider font-display rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'consultation' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              School / Agency Consultation
            </button>
            <button
              onClick={() => {
                setActiveTab('registration');
                setRegStep(1);
              }}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider font-display rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'registration' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              Parent &amp; Youth Registration
            </button>
          </div>
        </div>
      </section>

      {/* Main Container Switch */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <AnimatePresence mode="wait">
            {activeTab === 'consultation' ? (
              <motion.div 
                key="consultation-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                
                {/* Left Side: Service Directory (7 Columns) */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">Contract Options</span>
                    <h2 className="font-display text-3xl font-extrabold text-slate-900 uppercase">
                      Contract Directory
                    </h2>
                    <p className="text-slate-500 font-light text-xs leading-relaxed">
                      Select custom program blocks below to auto-populate your booking query. Our coordinators will compile logistics and pricing schedules for organizational review.
                    </p>
                  </div>

                  {/* Program selection logic */}
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
                            className="text-[9px] font-bold text-brand-blue uppercase tracking-widest hover:text-brand-light-blue transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-lg cursor-pointer"
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

                  {/* Direct Swim & Specific Sports registration redirect */}
                  <div className="bg-brand-blue rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-brand-blue/15">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-4 max-w-xl text-left">
                      <span className="text-brand-light-blue font-bold uppercase tracking-widest text-[9px]">Are you a parent registering a child?</span>
                      <h3 className="font-display font-extrabold text-white text-xl uppercase tracking-wide leading-tight">
                        Register Directly for Boxing, Swim Academy, Baseball &amp; Personal Training
                      </h3>
                      <p className="text-slate-300 font-light text-xs leading-relaxed">
                        Rather than requesting a customized corporate consultation, sign your children up instantly online! Fill out medical info, sign digital safety waivers, and receive an active invoice statement details for billing schedules immediately.
                      </p>
                      <button 
                        onClick={() => handleStartDirectRegistration("201 Swim Academy (5 Private Lessons)")}
                        className="bg-brand-light-blue hover:bg-brand-light-blue/90 text-brand-blue font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        Launch Direct Registration Portal
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Consultation Enquiry Builder (5 Columns) */}
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-1.5 tracking-tight uppercase">
                      Service Request Booking
                    </h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 block">
                      Enquire for organization or municipality
                    </p>

                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.form 
                          key="consult-form"
                          onSubmit={handleSubmitConsultation}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                              Coordinator / Representative Name *
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formData.clientName}
                              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                              placeholder="e.g. John Doe, Lead Clinician"
                              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                              Organization / School Name *
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formData.organization}
                              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                              placeholder="e.g. Bayonne Board of Education"
                              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                                Official Email *
                              </label>
                              <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="name@district.org"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                                Contact Phone *
                              </label>
                              <input 
                                type="tel" 
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                placeholder="201-555-0100"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                                Service City/Town *
                              </label>
                              <input 
                                type="text" 
                                required
                                value={formData.city}
                                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                placeholder="Jersey City, NJ"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                                Proposed Program Scale
                              </label>
                              <select
                                value={formData.programScale}
                                onChange={(e) => setFormData(prev => ({ ...prev, programScale: e.target.value }))}
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              >
                                <option value="One-off Session / Class">One-off Session / Class</option>
                                <option value="Multi-week Program Cohort">Multi-week Program Cohort</option>
                                <option value="School Assembly / Presentation">School Assembly / Presentation</option>
                                <option value="Municipal Youth Recreation Program">Municipal Recreation Setup</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                              Attached Directory Selections ({formData.servicesSelected.length})
                            </span>
                            {formData.servicesSelected.length === 0 ? (
                              <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center text-[10px] text-slate-450 italic bg-slate-50">
                                Click target block listings on the left to include them!
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1 bg-slate-50 p-2 border border-slate-100 rounded-xl">
                                {formData.servicesSelected.map((s, idx) => (
                                  <span key={idx} className="bg-brand-blue/10 text-brand-blue border border-brand-blue/15 text-[8px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-tight flex items-center gap-1">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">
                              Cohort specifics / Target demographics
                            </label>
                            <textarea
                              rows={2}
                              value={formData.additionalDetails}
                              onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                              placeholder="Please specify age thresholds, average caseload sizes, and preferred startup schedules."
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/10 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {submitting ? 'Transmitting Data...' : 'Submit Proposals Inquiry'}
                            <ArrowRight className="w-3.5 h-3.5 text-brand-light-blue shrink-0 animate-pulse" />
                          </button>
                        </motion.form>
                      ) : (
                        <motion.div 
                          key="consult-success"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center py-10 space-y-6"
                        >
                          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                            <Check className="w-8 h-8" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                              Consultation Sent
                            </h4>
                            <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                              Your school system/agency proposal has been received! Our director Ana Gleny and Shawn Kelly will coordinate response materials and reach out to **{formData.organization}** directly via **{formData.email}**.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            ) : (
              // Direct Parent & Individual Participant Registration Wizard Module (Tabs B)
              <motion.div 
                key="registration-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl mx-auto"
              >
                {/* Wizard Stage Headers */}
                <div className="mb-12 max-w-2xl mx-auto select-none">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 z-0" />
                    
                    {[
                      { step: 1, label: "Youth Info" },
                      { step: 2, label: "Safety Waivers" },
                      { step: 3, label: "Invoice Issued" }
                    ].map((st) => (
                      <div key={st.step} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all border ${
                          regStep === st.step 
                            ? 'bg-brand-blue text-white border-brand-light-blue shadow-md shadow-brand-blue/20 scale-110' 
                            : regStep > st.step 
                              ? 'bg-emerald-500 text-white border-emerald-400' 
                              : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          {regStep > st.step ? <Check className="w-5 h-5" /> : st.step}
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${
                          regStep === st.step ? 'text-brand-blue' : 'text-slate-400'
                        }`}>
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: Parent Contacts, Child Stats & Program selection */}
                  {regStep === 1 && (
                    <motion.div 
                      key="reg-step-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-xl text-left space-y-8"
                    >
                      <div className="space-y-2 border-b border-slate-100 pb-5">
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">Step 1 of 3</span>
                        <h2 className="font-display text-2xl font-extrabold text-slate-900 uppercase">
                          Participant &amp; Lesson Enrollment
                        </h2>
                        <p className="text-slate-500 font-light text-xs leading-relaxed">
                          Enter emergency billing coordinates and specify the precise training disciplines or lesson classes you are custom commissioning for your child.
                        </p>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); setRegStep(2); }} className="space-y-6">
                        
                        {/* Parent Information Section */}
                        <div className="space-y-4">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Parent / Guardian Verification
                          </h3>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Parent/Guardian Name *</label>
                              <input 
                                type="text" 
                                required
                                value={regData.parentName}
                                onChange={(e) => setRegData(prev => ({ ...prev, parentName: e.target.value }))}
                                placeholder="Jane Doe"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Contact Email *</label>
                              <input 
                                type="email" 
                                required
                                value={regData.parentEmail}
                                onChange={(e) => setRegData(prev => ({ ...prev, parentEmail: e.target.value }))}
                                placeholder="jane.doe@family.com"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Parent Phone Number *</label>
                              <input 
                                type="tel" 
                                required
                                value={regData.parentPhone}
                                onChange={(e) => setRegData(prev => ({ ...prev, parentPhone: e.target.value }))}
                                placeholder="201-555-0188"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Home Street Address *</label>
                            <input 
                              type="text" 
                              required
                              value={regData.parentAddress}
                              onChange={(e) => setRegData(prev => ({ ...prev, parentAddress: e.target.value }))}
                              placeholder="123 Broadway Avenue, Suite A"
                              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>
                        </div>

                        {/* Child Participant Statistics */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Youth Participant Profile
                          </h3>
                          <div className="grid sm:grid-cols-4 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Youth Full Name *</label>
                              <input 
                                type="text" 
                                required
                                value={regData.childName}
                                onChange={(e) => setRegData(prev => ({ ...prev, childName: e.target.value }))}
                                placeholder="E.g. Jayson Doe"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Youth Age / DOB *</label>
                              <input 
                                type="text" 
                                required
                                value={regData.childAge}
                                onChange={(e) => setRegData(prev => ({ ...prev, childAge: e.target.value }))}
                                placeholder="Age (e.g. 14 / Nov 12)"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Active School &amp; Grade</label>
                              <input 
                                type="text" 
                                value={regData.childSchool}
                                onChange={(e) => setRegData(prev => ({ ...prev, childSchool: e.target.value }))}
                                placeholder="e.g. Lincoln Middle (8th)"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Program Specific Class Selection and Billing Rate Showcase */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Select Program Class Setup
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Target Program Selection *</label>
                              <select
                                value={regData.selectedProgram}
                                onChange={(e) => setRegData(prev => ({ ...prev, selectedProgram: e.target.value }))}
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              >
                                {individualPrograms.map(item => (
                                  <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Enrollment Class Volume</label>
                              <select
                                value={regData.sessionBatchCount}
                                onChange={(e) => setRegData(prev => ({ ...prev, sessionBatchCount: e.target.value }))}
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              >
                                <option value="Monthly Routine Subscription">Monthly Routine Subscription</option>
                                <option value="Single 1-Hour Class / Assessment">Single Evaluation Class / Assessment</option>
                                <option value="5-Session Packet Acceleration">5-Session Block Packet (Discounts applied)</option>
                                <option value="10-Session Block Master Setup">10-Session Block Master Routine</option>
                              </select>
                            </div>
                          </div>

                          {/* Instant live price preview */}
                          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                                $
                              </div>
                              <div className="text-left">
                                <span className="text-[10px] text-slate-450 font-bold uppercase block">Enrollment Standard Rate</span>
                                <span className="text-slate-850 font-display font-extrabold text-xs uppercase">{selectedProgramDetails.name}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-brand-blue text-xl font-black font-display">${selectedProgramDetails.price}</span>
                              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">{selectedProgramDetails.unit}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/15 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Continue to Safety &amp; Legal Waivers
                          <ArrowRight className="w-3.5 h-3.5 text-brand-light-blue shrink-0" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 2: Safety, Medical contact and digital waiver consent */}
                  {regStep === 2 && (
                    <motion.div 
                      key="reg-step-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-xl text-left space-y-8"
                    >
                      <div className="space-y-2 border-b border-slate-100 pb-5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block">Step 2 of 3</span>
                          <h2 className="font-display text-2xl font-extrabold text-slate-900 uppercase">
                            Emergency Protocols &amp; Waivers
                          </h2>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            Complete health disclosures and sign the athletic and swimming safety release waivers to issue parent invoices and billing schedules.
                          </p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setRegStep(1)}
                          className="text-slate-450 hover:text-slate-850 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-100 p-2.5 rounded-lg select-none"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Back
                        </button>
                      </div>

                      <form onSubmit={handleSubmitRegistrationStep2} className="space-y-6">
                        
                        {/* Emergency Contact Coordinates */}
                        <div className="space-y-4">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Emergency Medical Contact Info
                          </h3>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Emergency Contact Name *</label>
                              <input 
                                type="text" 
                                required
                                value={regData.emergencyName}
                                onChange={(e) => setRegData(prev => ({ ...prev, emergencyName: e.target.value }))}
                                placeholder="E.g. Arthur Pendelton"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Relation to Participant *</label>
                              <input 
                                type="text" 
                                required
                                value={regData.emergencyRelation}
                                onChange={(e) => setRegData(prev => ({ ...prev, emergencyRelation: e.target.value }))}
                                placeholder="e.g. Uncle / Neighbor / Physician"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Emergency Contact Phone *</label>
                              <input 
                                type="tel" 
                                required
                                value={regData.emergencyPhone}
                                onChange={(e) => setRegData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                                placeholder="201-555-0199"
                                className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Medical Disclosures & Health Statements */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Crucial Health &amp; Allergy Statements
                          </h3>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">List allergies, medicine limitations, asthma historical codes, or write "NONE" *</label>
                            <textarea
                              rows={2}
                              required
                              value={regData.medicalConcerns}
                              onChange={(e) => setRegData(prev => ({ ...prev, medicalConcerns: e.target.value }))}
                              placeholder="Describe allergies, inhaler guidelines, or write 'NONE'"
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 select-none">Primary Medical Insurance Provider (Optional)</label>
                            <input 
                              type="text" 
                              value={regData.insuranceProvider}
                              onChange={(e) => setRegData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                              placeholder="e.g. Horizon Blue Cross Blue Shield, Policy #..."
                              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />
                          </div>
                        </div>

                        {/* Project 201 Digital Liability Waiver Text Panel */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue" />
                            Project 201 Waiver Consensus
                          </h3>

                          {/* Scrollable legal release block */}
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-40 overflow-y-auto text-[10px] text-slate-500 font-light leading-relaxed space-y-2 select-none">
                            <p className="font-bold text-slate-800 text-[11px] uppercase">
                              SECTION I — ATHLETICS &amp; COMBAT LIABILITY CODES
                            </p>
                            <p>
                              As the parent/legal guardian of the youth participant name entered, I hereby authorize participation in structural programs hosted by Project 201 (including boxing training, swimming modules, baseball routines, physical conditioning, and mentor events). I recognize that physical athletic practices, non-contact/contact sports, and community travel involve minor and major physical risks.
                            </p>
                            <p>
                              I agree that Project 201, Coach Shawn Kelly, Coach Ana Gleny, and partnering municipal community gyms, schools, and coaches are entirely indemnified against liabilities, medical expenses, accidental injuries, or physical damages stemming in any form from active lessons.
                            </p>
                            <p className="font-bold text-slate-800 text-[11px] uppercase pt-2">
                              SECTION II — PUBLIC COMMUNITY MEDIA RELEASES
                            </p>
                            <p>
                              I further grant Project 201 authorization to publish, document, stream, or utilize photography, film footage, or progress audio logs of youth participants during athletics instruction to support community outreach, web updates, and sponsorship program transparency.
                            </p>
                          </div>

                          {/* Interactive checkboxes */}
                          <div className="space-y-2.5">
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                required
                                checked={regData.waiverConsent}
                                onChange={(e) => setRegData(prev => ({ ...prev, waiverConsent: e.target.checked }))}
                                className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-light-blue w-4 h-4 cursor-pointer"
                              />
                              <span className="text-slate-650 text-[11px] font-medium leading-relaxed">
                                I confirm I am the legal guardian. I have read, understood, and accept Section I: Project 201 Athletic &amp; Swimming Liability Release Agreement *
                              </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={regData.mediaConsent}
                                onChange={(e) => setRegData(prev => ({ ...prev, mediaConsent: e.target.checked }))}
                                className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-light-blue w-4 h-4 cursor-pointer"
                              />
                              <span className="text-slate-650 text-[11px] font-medium leading-relaxed">
                                I authorize Section II: Community Marketing Media Permission (Allows posting participant progress updates)
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Digital Signature Signing Block */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 select-none">
                            Type Parent/Guardian Name (Electronic Legal Signature) *
                          </label>
                          
                          <div className="grid sm:grid-cols-2 gap-4 items-center">
                            <input 
                              type="text" 
                              required
                              value={regData.typedSignature}
                              onChange={(e) => setRegData(prev => ({ ...prev, typedSignature: e.target.value }))}
                              placeholder="Type First &amp; Last Name to sign"
                              className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            />

                            {/* Digital cursive font style placeholder */}
                            <div className="border border-slate-200/50 bg-white h-11 rounded-xl px-4 flex items-center justify-between pointer-events-none relative overflow-hidden select-none">
                              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Active Signature:</span>
                              {regData.typedSignature ? (
                                <span className="font-serif italic text-brand-blue text-sm pr-2 select-none border-b border-brand-light-blue">
                                  {regData.typedSignature}
                                </span>
                              ) : (
                                <span className="text-[9px] text-slate-400 italic font-mono uppercase">E-SIGNATURE PAD</span>
                              )}
                              <PenTool className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={regSubmitting}
                          className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/15 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {regSubmitting ? "Verifying Digital Waivers..." : "Submit Registration & Assemble Invoice"}
                          <ArrowRight className="w-3.5 h-3.5 text-brand-light-blue shrink-0" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 3: Live interactive generated Parent Invoice Receipt slip */}
                  {regStep === 3 && (
                    <motion.div 
                      key="reg-step-3"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-8"
                    >
                      {/* Top success alert */}
                      <div className="bg-emerald-550 mr-auto ml-auto max-w-2xl bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-emerald-800 text-left flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 shrink-0 select-none">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm uppercase tracking-wide">Registration Submission Finalized Successfully!</h4>
                          <p className="text-slate-600 font-light text-[11px] leading-relaxed">
                            Your child **{regData.childName}** is officially rostered setup. Digital liability codes are validated under electronic signature hash **{regData.typedSignature}**.
                          </p>
                        </div>
                      </div>

                      {/* Main Printable Ticket Invoice block */}
                      <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200/80 shadow-2xl relative text-left">
                        {/* Decorative Top Invoice Cut Line */}
                        <div className="absolute top-0 left-10 right-10 h-1 bg-brand-blue rounded-b-full" />
                        
                        {/* Top Invoice Metadata Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-8 border-b border-dashed border-slate-200">
                          <div className="space-y-1">
                            <span className="text-xs font-black text-slate-900 tracking-tight font-display">PROJECT 201</span>
                            <span className="text-brand-light-blue text-[9px] font-bold uppercase bg-brand-blue px-2.5 py-1 rounded-md block select-none">COMMUNITY PARTNER</span>
                            <p className="text-[10px] text-slate-400 font-light">
                              NJ Youth Development &amp; Athletics Safety
                            </p>
                          </div>
                          <div className="text-right sm:text-right font-mono">
                            <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-tight">{regData.invoiceId}</h3>
                            <p className="text-[10px] text-slate-400">Issue Date: {regData.issueDate || 'Today'}</p>
                            <span className="inline-block mt-1.5 bg-rose-50 border border-rose-200/60 text-rose-600 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider select-none animate-pulse">
                              Pending Initial Review
                            </span>
                          </div>
                        </div>

                        {/* Customer Information Block */}
                        <div className="py-6 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Billed &amp; Roster To</span>
                            <h4 className="text-slate-800 text-xs font-bold uppercase leading-tight">{regData.parentName}</h4>
                            <p className="text-[10px] text-slate-500 font-light leading-snug">{regData.parentAddress}</p>
                            <p className="text-[10px] text-slate-500 font-light leading-snug">{regData.parentPhone} • {regData.parentEmail}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Youth Participant Roster</span>
                            <h4 className="text-slate-800 text-xs font-bold uppercase leading-tight">{regData.childName}</h4>
                            <p className="text-[10px] text-slate-500 font-light">Age Code: {regData.childAge}</p>
                            <p className="text-[10px] text-slate-500 font-light">Target School: {regData.childSchool || 'Rostered Active'}</p>
                          </div>
                        </div>

                        {/* Invoice Table Grid */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden mb-6">
                          <table className="w-full text-xs text-left select-none">
                            <thead className="bg-slate-50 border-b border-slate-100 text-[9px] font-bold uppercase text-slate-450 tracking-wider">
                              <tr>
                                <th className="px-5 py-3">Scheduled Class Program</th>
                                <th className="px-5 py-3 text-center">Batch Vol</th>
                                <th className="px-5 py-3 text-right">Unit Price</th>
                                <th className="px-5 py-3 text-right">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                              <tr>
                                <td className="px-5 py-4">
                                  <span className="font-extrabold text-slate-850 block uppercase text-xs">{selectedProgramDetails.name}</span>
                                  <span className="text-[9px] text-slate-450 font-light font-sans block">{selectedProgramDetails.category} Safety Training Pack</span>
                                </td>
                                <td className="px-5 py-4 text-center font-mono text-slate-500">1</td>
                                <td className="px-5 py-4 text-right font-mono text-slate-650">${selectedProgramDetails.price}.00</td>
                                <td className="px-5 py-4 text-right font-mono text-slate-850 font-bold">${selectedProgramDetails.price}.00</td>
                              </tr>
                              {/* Subtotal structures */}
                              <tr className="bg-slate-50/50">
                                <td colSpan={2} />
                                <td className="px-5 py-3 text-right text-[10px] text-slate-450 uppercase font-bold">Subtotal</td>
                                <td className="px-5 py-3 text-right font-mono text-slate-700">${selectedProgramDetails.price}.00</td>
                              </tr>
                              <tr className="bg-slate-50/50">
                                <td colSpan={2} />
                                <td className="px-5 py-3 text-right text-[10px] text-slate-450 uppercase font-bold">Tax / Community Credit</td>
                                <td className="px-5 py-3 text-right font-mono text-slate-450">$0.00</td>
                              </tr>
                              <tr className="bg-slate-50/80 border-t border-slate-100">
                                <td colSpan={2} />
                                <td className="px-5 py-4 text-right text-[10px] text-slate-900 uppercase font-black">TOTAL DUED</td>
                                <td className="px-5 py-4 text-right font-mono text-brand-blue text-sm font-black">${selectedProgramDetails.price}.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Interactive Digital Invoice actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-dashed border-slate-200">
                          <p className="text-slate-400 font-light text-[9px] max-w-sm text-center sm:text-left select-none leading-relaxed">
                            Project 201 coordinator Ana Gleny has registered this electronic ledger entry. You will receive an identical billing email with secure bank options soon.
                          </p>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => window.print()}
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 shrink-0" />
                              Print Statement
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`A copy of Invoice ${regData.invoiceId} was successfully queued for email distribution to ${regData.parentEmail}. Please check your spam folder if it doesn't arrive in 5 minutes!`);
                              }}
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              <MailCheck className="w-3.5 h-3.5 shrink-0 text-brand-light-blue" />
                              Email Copy
                            </button>
                          </div>
                        </div>

                        {/* Simulated Checkout Integration Button */}
                        <div className="bg-brand-blue/5 border border-brand-light-blue/20 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center gap-2 text-brand-blue">
                            <CreditCard className="w-4 h-4 shrink-0" />
                            <span className="font-display text-[10px] font-bold uppercase tracking-wider">Simulated Payor Online Gateway</span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 leading-relaxed font-light">
                            If you want to clear this balance immediately via Credit Card / Debit Card, touch below to test simulated checkout.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              alert("Perfect! This triggers the secure 201 Customs & Performance checkout iframe and updates Shawn's records instantly. In production, this will redirect parents to Stripe or Venmo to finalize class dues securely!");
                            }}
                            className="bg-brand-blue hover:bg-brand-blue/95 text-white w-full py-2.5 rounded-xl font-bold font-display text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                          >
                            Pay Dues Online (Simulated Card Portal)
                            <ArrowRight className="w-3.5 h-3.5 text-brand-light-blue shrink-0" />
                          </button>
                        </div>

                        {/* Disclaimer notes */}
                        <div className="mt-8 pt-4 text-center text-slate-400 text-[8px] font-bold uppercase tracking-widest leading-loose select-none">
                          Project 201 Family Billing • Authorized under Code SHA-256 NJ
                        </div>
                      </div>

                      {/* Go back and reset button */}
                      <button 
                        onClick={() => {
                          setRegStep(1);
                          setRegData({
                            parentName: '',
                            parentEmail: '',
                            parentPhone: '',
                            parentAddress: '',
                            city: '',
                            childName: '',
                            childAge: '',
                            childSchool: '',
                            childGrade: '',
                            selectedProgram: 'Boxing Programs & Mentorship Circle',
                            sessionBatchCount: 'Monthly Routine Subscription',
                            emergencyName: '',
                            emergencyPhone: '',
                            emergencyRelation: '',
                            medicalConcerns: '',
                            insuranceProvider: '',
                            waiverConsent: false,
                            mediaConsent: false,
                            typedSignature: '',
                            invoiceId: 'P201-INV-2026-TBD',
                            issueDate: '',
                          });
                        }}
                        className="text-brand-blue font-bold text-[10px] tracking-widest uppercase hover:text-brand-light-blue transition-colors cursor-pointer mx-auto block bg-slate-100 hover:bg-slate-200/80 border border-slate-200/50 px-6 py-3 rounded-xl select-none"
                      >
                        Start another family registration
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            )}
          </AnimatePresence>

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
