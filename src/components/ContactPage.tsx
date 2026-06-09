import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube, 
  User, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      {/* Page Hero Header */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,white,transparent)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block mb-3 font-display">
            Reach Out Directly
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            GET IN TOUCH <br />
            <span className="font-bold text-brand-light-blue">&amp; JOIN THE MOVEMENT</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Have general inquiries, volunteering questions, or donation thoughts? Reach out to our executive staff and we'll reply directly.
          </p>
        </div>
      </section>

      {/* Main Grid split */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left direct contact details */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-light-blue font-display block">Direct Contacts</span>
                <h2 className="font-display text-2xl font-bold uppercase text-slate-900 tracking-tight leading-none">
                  Project 201 Headquarters
                </h2>
                <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                  We operate across Jersey City and statewide community circles. Send an email or phone us for rapid registration coordinate questions.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Shawn Kelly Founder Details card */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl flex gap-4 items-start shadow-sm">
                  <div className="w-10 h-10 shrink-0 bg-brand-light-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                    <User className="w-5 h-5 text-brand-light-blue" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold text-sm">Shawn Kelly</h4>
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Founder &amp; Coordinator</span>
                  </div>
                </div>

                {/* Direct email link */}
                <a 
                  href="mailto:project201inc@gmail.com"
                  className="p-6 bg-white border border-slate-100 rounded-3xl flex gap-4 items-start shadow-sm hover:border-brand-blue/30 transition-all block group"
                >
                  <div className="w-10 h-10 shrink-0 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold text-sm">Email Address</h4>
                    <span className="text-slate-500 text-xs font-light block mt-1">project201inc@gmail.com</span>
                  </div>
                </a>

                {/* Direct phone link */}
                <a 
                  href="tel:2017255062"
                  className="p-6 bg-white border border-slate-100 rounded-3xl flex gap-4 items-start shadow-sm hover:border-brand-blue/30 transition-all block group"
                >
                  <div className="w-10 h-10 shrink-0 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold text-sm">Telephone Call / Message</h4>
                    <span className="text-slate-500 text-xs font-light block mt-1">201-725-5062</span>
                  </div>
                </a>

                {/* Region indicator */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl flex gap-4 items-start shadow-sm">
                  <div className="w-10 h-10 shrink-0 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold text-sm">Coverage Network</h4>
                    <span className="text-slate-500 text-xs font-light block mt-1">Jersey City &amp; Statewide, New Jersey</span>
                  </div>
                </div>

              </div>

              {/* Social Channels card block */}
              <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden border border-white/5">
                <h4 className="font-display font-medium text-brand-light-blue text-xs uppercase tracking-widest mb-6">Our Social Channels</h4>
                
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/project201nj?utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-light-blue hover:text-brand-blue transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.facebook.com/project201nj" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-light-blue hover:text-brand-blue transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-light-blue hover:text-brand-blue transition-all">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form inquiry container */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-105 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-light-blue/5 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  INQUIRY FORM
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8 block">
                  Project 201 General submission channel
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-display">
                            Your Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Rachel Cooper"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-display">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="rachel@example.com"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-display">
                            Telephone Number (Optional)
                          </label>
                          <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="555-0199"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-display">
                            Subject Category
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          >
                            <option value="General Question">General Question</option>
                            <option value="Volunteering / Mentoring">Volunteering / Mentoring</option>
                            <option value="Donation / Support Channel">Donation / Support Channel</option>
                            <option value="School Affiliation">School Affiliation</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-display">
                          Your Message *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="What can we help you with?..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2"
                      >
                        {submitting ? 'Sending Request...' : 'Send Message'}
                        <Send className="w-4 h-4 text-brand-light-blue" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="contact-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 px-4 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                          Message Dispatched
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for reaching out of Project 201. Your message has been sent successfully. Our support office will respond to **{formData.email}** within 24–48 hours.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: 'General Question',
                            message: ''
                          });
                        }} 
                        className="text-[10px] font-bold text-brand-blue uppercase tracking-widest border border-slate-200 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
