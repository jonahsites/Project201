import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Award, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Send, 
  Check, 
  MapPin, 
  ArrowRight,
  School,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function SchoolsPartnershipsPage() {
  const [formData, setFormData] = useState({
    contactName: '',
    title: '',
    organization: '',
    contactValue: '',
    city: '',
    collaborationType: 'Care Management Organization (CMO)',
    collaborationGoals: '',
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const programs = [
    {
      title: "School-Based Integration",
      desc: "Providing scheduled mentorship, structured recess support, physical regulation classes, and afterschool development directly within your educational space."
    },
    {
      title: "CMO / PerformCare Collaborations",
      desc: "Accepting direct behavioral assistance or structured movement referrals. We work hand-in-hand with care coordinators to implement Individual Service Plans (ISPs)."
    },
    {
      title: "Trauma-Aware Athletic Mentorship",
      desc: "Blending physical strength and conditioning with coping strategies, emotional awareness, and peer resolution models."
    },
    {
      title: "Suicide Prevention & Mental Health Prep",
      desc: "Our leadership includes QPR Suicide Prevention Gatekeeper Instructors and Mental Health First Aid practitioners to ensure fully safe environments."
    }
  ];

  const credentials = [
    "QPR Suicide Prevention Gatekeeper Instructor (NJ)",
    "Rutgers Youth Sports Safety Council Certified Instructor",
    "Mental Health First Aid Certified Practitioners",
    "USA Boxing-Registered Coaching Staff",
    "Fully Background-Checked & Clearance Verified",
    "Trauma-Aware Framework Implementation"
  ];

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
          <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-brand-light-blue rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3">
            System Partner referrals &amp; Affiliates
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            SCHOOLS &amp; <br />
            <span className="font-bold text-brand-light-blue">SYSTEM PARTNERSHIPS</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-base md:text-lg leading-relaxed">
            Collaborating with School Districts, Care Management Organizations (CMOs), performcare associates, and youth caseworkers across New Jersey to cultivate safe, reliable guidance structures.
          </p>
        </div>
      </section>

      {/* Main Grid: Description & Credentials on left, Contact form on right */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (7 Columns) */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Core Offerings */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-brand-light-blue rounded-full" />
                  <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
                    School &amp; Team Collaboration Models
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  Project 201 operates as an essential complement to existing clinical plans and structural school systems. Our movement-based engagement strategies have proven effective in capturing the focus of youth who may resist traditional desk-based assistance tracks.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {programs.map((prog, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                        <Building2 className="w-5 h-5 text-brand-light-blue" />
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-tight">
                        {prog.title}
                      </h3>
                      <p className="text-slate-500 font-light text-xs leading-relaxed">
                        {prog.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Safety and Standards */}
              <div className="bg-brand-blue text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-light-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-light-blue">Statewide Standards Compliance</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white uppercase sm:tracking-tight">
                    Referral Assurances &amp; Safety Credentials
                  </h3>
                  <p className="text-white/75 font-light text-xs leading-relaxed">
                    We maintain comprehensive agency accountability. Our personnel hold national designations and direct certifications aligned with NJ youth-program coordination guidelines:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {credentials.map((cred, idx) => (
                      <div key={idx} className="flex gap-3 items-center border-b border-white/5 py-2.5">
                        <CheckCircle className="w-4 h-4 text-brand-light-blue shrink-0 animate-pulse" />
                        <span className="text-white/90 text-xs font-light tracking-wide">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Our Network statement */}
              <div className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-100 rounded-3xl border border-slate-200">
                <FileSpreadsheet className="w-12 h-12 text-brand-blue shrink-0 hidden sm:block" />
                <div className="space-y-2">
                  <h4 className="font-display font-medium text-slate-800 text-sm uppercase tracking-wider">
                    Official Individual Service Coordinate referrals
                  </h4>
                  <p className="text-slate-500 font-light text-xs leading-relaxed">
                    Our team provides official coordinate reports, task progress logs, session tracking indicators, and direct feedback logs to accommodate performance reviews and care plans.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (5 Columns) form */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  PARTNERSHIP REQUEST
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 block">
                  District &amp; Agency coordination intake
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="partner-form"
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Professional Lead Representative Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                          placeholder="e.g. Rachel Thorne"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Title / Role */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Your Title / Program Role *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. CMO Care Coordinator, Principal"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Organization Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Educational District or Organization Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                          placeholder="e.g. Jersey City Public Schools, Hudson CMO"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* City & Contact Info Block */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            City / County *
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
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Work Email / Phone *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.contactValue}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactValue: e.target.value }))}
                            placeholder="rachel@org.gov"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      {/* Collaboration Category */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Collaboration Focus *
                        </label>
                        <select
                          required
                          value={formData.collaborationType}
                          onChange={(e) => setFormData(prev => ({ ...prev, collaborationType: e.target.value }))}
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        >
                          <option value="Care Management Organization (CMO)">Care Management Organization (CMO)</option>
                          <option value="School District Physical / Recess Support">School District Recess/Mentorship Support</option>
                          <option value="PerformCare Referrals">PerformCare Referral / Behavioral Support</option>
                          <option value="Community Outreach Organization">Community Outreach / Charity Partner</option>
                          <option value="Other Agency Referral">Other Public/Private Agency Referral</option>
                        </select>
                      </div>

                      {/* Goals Details */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Briefly summarize coordination requirements
                        </label>
                        <textarea
                          rows={3}
                          value={formData.collaborationGoals}
                          onChange={(e) => setFormData(prev => ({ ...prev, collaborationGoals: e.target.value }))}
                          placeholder="E.g. Referral of 5 students, seeking in-school afterschool programs..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2"
                      >
                        {submitting ? 'Submitting...' : 'Request Collaboration'}
                        <ArrowRight className="w-4 h-4 text-brand-light-blue" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="partner-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 px-4 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                          CoRD referral Received
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for coordinating with Project 201. Your affiliation request has been routed to Executive Director Shawn Kelly. We will verify and follow up via **{formData.contactValue}** to configure documentation.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            contactName: '',
                            title: '',
                            organization: '',
                            contactValue: '',
                            city: '',
                            collaborationType: 'Care Management Organization (CMO)',
                            collaborationGoals: '',
                            consent: false
                          });
                        }} 
                        className="text-[10px] font-bold text-brand-blue uppercase tracking-widest border border-slate-200 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Safety Notice block */}
      <section className="bg-slate-950 text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-slate-400 font-light text-[11px] md:text-xs leading-relaxed">
            Project 201 coordinates closely with system professionals. All operations, staff background reviews, and program delivery metrics adhere strictly to NJ youth development safety standards.
          </p>
        </div>
      </section>
    </div>
  );
}
