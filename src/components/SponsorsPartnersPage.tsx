import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Award, 
  Users, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Heart,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  DollarSign,
  Instagram
} from 'lucide-react';

export default function SponsorsPartnersPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    sponsorshipLevel: 'Community Partner',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sponsors = [
    {
      name: "201 Customs LLC",
      location: "Jersey-Based (DM to Order)",
      description: "Custom Tees & Streetwear for a Cause. Centered around community, culture, and confidence, this official embroidery and custom print company is powered directly by founders Shawn Kelly & Ana Gleny to supply Premium youth hoodies, workout gear, and custom tees.",
      tier: "Foundry Apparel Sponsor",
      badgeColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
      image: "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-19/681508650_18045094292774238_8785697878069374056_n.jpg?cb=8438d1d6-89aba764&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGKnA5YH567ZVF6HC7FJRPTDfohlvK6JSz3P3_T1rMIwzNcCg0HgQKhoykQTgPAZJk&_nc_ohc=xFFPaCSAS5MQ7kNvwEzmOyo&_nc_gid=Yq8NqPHgi363dolvypXAFg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af62GPB-BMoOpIGTr4Lc-BJua9FhOrFIN9BFMD-O_K-itQ&oe=6A1CC3CB&_nc_sid=7a9f4b",
      instagramLink: "https://www.instagram.com/201customsllc?utm_source=qr"
    },
    {
      name: "Dawn’s Auto Body",
      location: "Keyport, NJ",
      description: "An outstanding local staple in auto collision repair, Dawn's Auto Body is dedicated to providing high-integrity community services and directly sponsoring active youth development pathways and leadership.",
      tier: "Official Corporate Sponsor",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    },
    {
      name: "San Vito’s Restaurant & Pizzeria",
      location: "Bayonne, NJ",
      description: "Co-host and premiere partner of the Project 201 Mentorship Circle — Bayonne Chapter. San Vito's generously provides a safe meeting space, delicious meals, and peer support environments for our youth cohorts.",
      tier: "Community Core Partner",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    }
  ];

  const benefits = [
    {
      title: "Community Branding",
      desc: "Get your logo featured prominently on Project 201 flyers, banners, and digital platforms seen by thousands of NJ families."
    },
    {
      title: "Direct Influence & Impact",
      desc: "Your funds directly purchase safe athletic gear, nutritional meals, and cover direct transport for youth outings and group sessions."
    },
    {
      title: "Expand Mentorship Circles",
      desc: "Become the anchor sponsor for a new chapter of the Mentorship Circle in your local town or school district."
    }
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
      {/* Hero */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-light-blue rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs block mb-3 font-display">
            Sponsors &amp; Supporters
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            Our Sponsors &amp; <br />
            <span className="font-bold text-brand-light-blue">Community Partners</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-base md:text-lg leading-relaxed">
            We are deeply grateful for the local businesses, restaurants, and organizations whose generous backing fuels our movement across New Jersey. Together, we make mentorship a reality.
          </p>
        </div>
      </section>

      {/* Main Grid: Info/Showcase on left, Form on right */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Showcase (7 Columns) */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Thank You Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-brand-light-blue rounded-full" />
                  <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
                    Our Featured Supporters
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  Generous corporate sponsors and local partners empower Project 201 to maintain athletic training, daily behavior diaries, structured circles, and safety gear.
                </p>

                {/* Showcase Cards Grid */}
                <div className="space-y-6">
                  {sponsors.map((sp, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:border-brand-blue/15 transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl group-hover:bg-brand-light-blue/10 transition-colors" />
                      <div className="flex flex-col sm:flex-row gap-6 relative z-10 items-start">
                        {sp.image ? (
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                            <img 
                              src={sp.image} 
                              alt={sp.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-display font-black text-xl shrink-0">
                            {sp.name[0]}
                          </div>
                        )}
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-display font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                              {sp.name}
                            </h3>
                            <span className={`px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase border rounded-full ${sp.badgeColor}`}>
                              {sp.tier}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-light-blue" />
                            <span>{sp.location}</span>
                          </div>

                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            {sp.description}
                          </p>

                          {sp.instagramLink && (
                            <div className="pt-2">
                              <a 
                                href={sp.instagramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider font-display"
                              >
                                <Instagram className="w-3.5 h-3.5 text-brand-light-blue" />
                                Custom Streetwear Instagram
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Benefits Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-brand-light-blue rounded-full" />
                  <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
                    Why Partner With Us?
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  We don't believe in generic sponsorships. When you partner with Project 201, you are investing in clear, measurable local impact and sustainable leadership development.
                </p>

                <div className="grid sm:grid-cols-3 gap-6">
                  {benefits.map((bt, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue">
                        <Award className="w-5 h-5 text-brand-light-blue" />
                      </div>
                      <h4 className="font-display font-bold text-slate-800 text-xs uppercase tracking-tight">
                        {bt.title}
                      </h4>
                      <p className="text-slate-500 font-light text-[11px] leading-relaxed">
                        {bt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Become A Sponsor Column (5 Columns) */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/5 rounded-full blur-2xl" />
                
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  BECOME A SPONSOR
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 block">
                  Support the movement in NJ
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="sponsor-form"
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Business Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Company / Business Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                          placeholder="e.g. Dawn's Auto Body"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Contact Representative */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          Contact Person Representative *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                          placeholder="e.g. John Doe"
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      {/* Contact Infographics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Work Email *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="john@auto.com"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Work Phone *
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="732-555-0155"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                      </div>

                      {/* Location & level */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            City / Town *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Keyport, NJ"
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                            Partner Focus
                          </label>
                          <select
                            required
                            value={formData.sponsorshipLevel}
                            onChange={(e) => setFormData(prev => ({ ...prev, sponsorshipLevel: e.target.value }))}
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          >
                            <option value="Corporate Sponsor">Corporate Sponsor</option>
                            <option value="Local Food/Meal Sponsor">Local Food / Meal Partner</option>
                            <option value="Venue/Space Co-host">Venue/Space Co-host</option>
                            <option value="Ad-hoc Supporter">Ad-hoc Supporters</option>
                          </select>
                        </div>
                      </div>

                      {/* Message details */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          How would your business like to participate?
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us about your organization or sponsorship ideas..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2"
                      >
                        {submitting ? 'Submitting...' : 'Send Sponsorship Proposal'}
                        <ArrowRight className="w-4 h-4 text-brand-light-blue" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="sponsor-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12 px-4 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">
                          Proposal Received
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for your willingness to sponsor of Project 201! Our team will verify and connect with **{formData.contactName}** via **{formData.email}** to configure documentation and branding display placements.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            businessName: '',
                            contactName: '',
                            email: '',
                            phone: '',
                            city: '',
                            sponsorshipLevel: 'Community Partner',
                            message: ''
                          });
                        }} 
                        className="text-[10px] font-bold text-brand-blue uppercase tracking-widest border border-slate-200 px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Submit another proposal
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
            Project 201 coordinates with local municipal councils to verify that sponsor alignments adhere strictly to commercial compliance protocols and NJ youth safety standards.
          </p>
        </div>
      </section>
    </div>
  );
}
