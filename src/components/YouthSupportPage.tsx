import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  HeartHandshake, 
  ShieldAlert, 
  Calendar, 
  Send, 
  Check, 
  MessageSquare,
  School,
  Accessibility,
  Heart,
  FileText
} from 'lucide-react';

export default function YouthSupportPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    childAge: '',
    city: '',
    mainConcerns: [] as string[],
    customConcern: '',
    interestedProgram: '',
    preferredContact: 'Phone',
    contactValue: '',
    availability: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const concernsList = [
    "Youth struggling with motivation",
    "School behavior concerns",
    "Confidence & self-esteem difficulties",
    "Lack of daily structure",
    "Anger, irritability, or frustration",
    "Youth needing active mentorship",
    "Athletes needing character accountability",
    "Positive male or female role model support"
  ];

  const services = [
    {
      title: "One-on-One Mentorship",
      desc: "Individual specialized pairing focusing directly on goals, boundaries, emotional regulation, and reliable growth."
    },
    {
      title: "Group Mentorship",
      desc: "Peer circles structured around character building, open forum discussions, accountability, and leadership challenges."
    },
    {
      title: "Boxing & Fitness Mentorship",
      desc: "Using the discipline, self-control, and resilience of boxing training of Project 201 as a tool for personal focus and confidence."
    },
    {
      title: "Sports Leadership Development",
      desc: "Taking athletic skills and translating them into global citizenship, team leadership, and mentorship of younger athletes."
    },
    {
      title: "Accountability Coaching",
      desc: "Active academic, behavioral, and sports performance tracking to build consistency, routine adherence, and self-respect."
    },
    {
      title: "Parent Support & Direct Feedback",
      desc: "Full circle communication, coaching, and collaboration with parents or clinical care teams to reinforce lessons back home."
    }
  ];

  const handleToggleConcern = (concern: string) => {
    if (formData.mainConcerns.includes(concern)) {
      setFormData(prev => ({
        ...prev,
        mainConcerns: prev.mainConcerns.filter(c => c !== concern)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        mainConcerns: [...prev.mainConcerns, concern]
      }));
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
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light-blue rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-brand-light-blue rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3">
            Family & Parent Intake Portal
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            YOUTH SUPPORT <br />
            <span className="font-bold text-brand-light-blue">&amp; MENTORSHIP</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-base md:text-lg leading-relaxed">
            Connecting parents, schools, and care teams with professional, structured mentorship to help youth find direction, build self-discipline, and unlock their full potential.
          </p>
        </div>
      </section>

      {/* Main Grid: Info on left, Intake on right */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Side (8 Columns on desktop) */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Who We Help Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-brand-light-blue rounded-full" />
                  <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
                    Who We Help
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  Every child transitions through complicated seasons. We provide active support for individuals experiencing any of the following challenges:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {concernsList.map((concern, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:border-brand-blue/20 hover:shadow transition-all duration-300 flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-brand-light-blue" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-snug">
                        {concern}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services We Offer Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-brand-light-blue rounded-full" />
                  <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
                    Services We Offer
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  Our programs are built around movement and stable role models, offering various levels of integration depending on your family's needs:
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {services.map((srv, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                    >
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-sm tracking-wide uppercase mb-3 text-brand-blue">
                          {srv.title}
                        </h3>
                        <p className="text-slate-500 font-light text-xs leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics / Quote in Parent Advocacy */}
              <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-[2.5rem] p-8 md:p-10 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-blue shadow-md shrink-0 hidden sm:flex">
                  <Heart className="w-6 h-6 text-brand-light-blue" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wide">
                    The Project 201 Mentorship Promise
                  </h4>
                  <blockquote className="text-slate-600 font-light italic text-sm leading-relaxed">
                    "Before finding Project 201, we struggled with school suspension and aggressive outbursts. The 1-on-1 boxing and mentorship didn't just teach discipline; it gave my son a safe outlet and a big brother he respects. His school counselor saw the difference in weeks."
                  </blockquote>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    — Jersey City Parent Representative
                  </span>
                </div>
              </div>

            </div>

            {/* Right Intake Form Column (5 Columns on desktop) */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  REQUEST SUPPORT
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 block">
                  Intake submission portal
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="intake-form"
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Parent Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Parent / Guardian Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                          placeholder="e.g. Maria Kelly"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Flex grid: Age and City */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Child's Age *
                          </label>
                          <input 
                            type="number" 
                            required
                            min="5"
                            max="21"
                            value={formData.childAge}
                            onChange={(e) => setFormData(prev => ({ ...prev, childAge: e.target.value }))}
                            placeholder="e.g. 14"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            City in NJ *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="e.g. Jersey City"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      {/* Program Picker */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Program of Interest *
                        </label>
                        <select
                          required
                          value={formData.interestedProgram}
                          onChange={(e) => setFormData(prev => ({ ...prev, interestedProgram: e.target.value }))}
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        >
                          <option value="">Select a Program</option>
                          <option value="Mentorship Circle">Mentorship Circle (Emotional Regulation)</option>
                          <option value="201 Sports">201 Sports Fundamentals</option>
                          <option value="201 Boxing">201 Boxing Club (Discipline & Strength)</option>
                          <option value="School Services">School Programs Integration</option>
                          <option value="Summer Camps">Summer Programs (High Impact)</option>
                        </select>
                      </div>

                      {/* Contact Picker */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Preferred Contact
                          </label>
                          <select
                            value={formData.preferredContact}
                            onChange={(e) => setFormData(prev => ({ ...prev, preferredContact: e.target.value }))}
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          >
                            <option value="Phone">Phone Call</option>
                            <option value="SMS">SMS Text</option>
                            <option value="Email">Email Address</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Contact Info *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.contactValue}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactValue: e.target.value }))}
                            placeholder={formData.preferredContact === 'Email' ? 'name@email.com' : '201-555-0199'}
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      {/* Availability */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Availability for Call / Visit *
                        </label>
                        <select
                          required
                          value={formData.availability}
                          onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        >
                          <option value="">Select preferred slot</option>
                          <option value="Weekdays - Mornings">Weekdays - Mornings</option>
                          <option value="Weekdays - Afternoons (School hours)">Weekdays - Afternoons (School hours)</option>
                          <option value="Weekdays - Evenings">Weekdays - Evenings</option>
                          <option value="Weekends - Anytime">Weekends - Anytime</option>
                        </select>
                      </div>

                      {/* Main Concerns description */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Describe your Main Concerns or Questions
                        </label>
                        <textarea
                          rows={3}
                          value={formData.customConcern}
                          onChange={(e) => setFormData(prev => ({ ...prev, customConcern: e.target.value }))}
                          placeholder="How can we help you of Project 201?..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2"
                      >
                        {submitting ? 'Submitting...' : 'Submit Support Request'}
                        <Send className="w-4 h-4 text-brand-light-blue" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="form-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 px-4 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                          Intake Submitted
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for trusting Project 201. Your request has been securely processed. Our Youth Development Specialist (Shawn Kelly) will contact you via **{formData.preferredContact}** during the preferred slot **{formData.availability}**.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            parentName: '',
                            childAge: '',
                            city: '',
                            mainConcerns: [],
                            customConcern: '',
                            interestedProgram: '',
                            preferredContact: 'Phone',
                            contactValue: '',
                            availability: ''
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

      {/* Pediatric Safety Disclaimer at bottom of the page */}
      <section className="bg-slate-950 text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-slate-400 font-light text-[11px] md:text-xs leading-relaxed max-w-2xl mx-auto">
            <span className="text-brand-light-blue font-bold uppercase block mb-1">Pediatric Safety &amp; Professional Services Notice</span>
            “Project 201 is a youth mentorship and development organization. We do not provide licensed clinical therapy, psychiatric treatment, or medical services.”
          </p>
        </div>
      </section>
    </div>
  );
}
