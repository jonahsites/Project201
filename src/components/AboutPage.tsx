import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  User, 
  Heart, 
  CheckCircle2, 
  Activity, 
  ChevronRight,
  ClipboardList,
  Sparkles,
  Play
} from 'lucide-react';

export default function AboutPage() {
  const storyPoints = [
    {
      title: "It Started With One Parent",
      content: "Project 201 started with a simple request. A parent reached out and asked, 'Can you mentor my son?' There was no program. No funding. No organization. Just one young person who needed guidance—and a decision to show up."
    },
    {
      title: "From One to Many",
      content: "That one relationship turned into another. Then another. Families began reaching out. Kids needed structure, discipline, and someone who believed in them. What started with one child quickly became something bigger."
    },
    {
      title: "Real Impact",
      content: "We've worked with youth who successfully came off probation, improved behavior at home and school, and built confidence, discipline, and direction. This is real impact happening in our communities."
    }
  ];

  const certifications = [
    {
      title: "USA Boxing Certified",
      desc: "Registered national boxing coach authority guiding youth through structured boxing drills for focus, discipline, and physical endurance."
    },
    {
      title: "Rutgers Youth Sports Safety Certified",
      desc: "Certified athletic instructor specializing in general physical safety protocols and physical development guidelines."
    },
    {
      title: "Mental Health First Aid",
      desc: "Completed national designations to verify behavioral concerns, identify immediate issues, and resolve stress safely."
    },
    {
      title: "QPR Suicide Prevention Instructor",
      desc: "Licensed Gatekeeper Instructor (New Jersey) ensuring youth leaders are equipped with clinical crisis identification plans."
    },
    {
      title: "Certified Personal Trainer",
      desc: "Professional sports training authority focused on strength, speed, muscle conditioning, and proper form."
    },
    {
      title: "Certified Nutritionist",
      desc: "Youth dietary assessment and nutrition education protocols to establish active, healthy lifestyle habits of growth."
    }
  ];

  const credentialsList = [
    "Behavioral Assistant (CMO / PerformCare)",
    "Certified Personal Trainer (CPT)",
    "Strength & Conditioning Specialist Certified",
    "Certified Youth Nutritionist",
    "Rutgers Youth Sports Safety Certified Instructor",
    "QPR Suicide Prevention Gatekeeper Instructor (NJ)"
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* About Hero Header */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block mb-3 font-display">
            A statewide youth umbrella organization
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            WHO WE ARE &amp; <br />
            <span className="font-bold text-brand-light-blue">OUR MOVEMENT</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Project 201 is a professional statewide youth organization, working tirelessly across New Jersey to combine elite athletic conditioning with persistent character and behavior development.
          </p>
        </div>
      </section>

      {/* Narrative & Quote */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Panel */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/d/1ij0c6x2te4sYxY4gRI63zH84EmKJ2TzA" 
                  alt="Authentic training environment portrait" 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-full h-full border-4 border-brand-light-blue/20 rounded-[3.5rem] -z-10" />
              
              <div className="absolute -bottom-6 -right-6 p-8 bg-brand-blue text-white rounded-3xl z-20 shadow-2xl max-w-xs hidden md:block">
                <p className="text-sm font-light italic leading-relaxed text-slate-100">
                  "Stay away from those people who try to disparage your ambitions. Great minds will give you a feeling that you can become great too."
                </p>
                <footer className="mt-4 font-bold text-[10px] uppercase tracking-widest text-brand-light-blue font-display">— Mark Twain</footer>
              </div>
            </div>

            {/* Narrative Stories Column */}
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.25em] text-brand-blue uppercase bg-brand-blue/5 rounded-full font-display">
                Our Genesis
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-8 uppercase leading-tight">
                Why We Do <br />
                <span className="text-brand-light-blue font-light">What We Do</span>
              </h2>

              <div className="space-y-10">
                {storyPoints.map((point, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200 hover:border-brand-light-blue transition-all duration-300">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-brand-light-blue rounded-full" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1.5 uppercase font-display select-none tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 font-light text-sm leading-relaxed">
                      {point.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-slate-950 rounded-[2.5rem] text-white relative overflow-hidden shadow-lg border border-white/5">
                <h4 className="text-lg font-bold font-display uppercase text-brand-light-blue mb-3">Our Core Vision</h4>
                <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
                  If one mentor can alter the destination of a single life, imagine what a unified state-registered community organization can achieve. We are creating reliable safety lines using movement, athletics, and mutual accountability.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Certifications Grid */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative ambient background lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-light-blue/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block font-display">
              Credibility &amp; Compliance Standards
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white leading-tight">
              STATEWIDE PROFESSIONAL <span className="text-brand-light-blue">CERTIFICATIONS</span>
            </h2>
            <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
              Every trainer, counselor, and leader within Project 201 is fully vetted, licensed, and checked. We maintain active compliance with national athletic circles and state youth safety councils.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-brand-light-blue hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-light-blue/10 flex items-center justify-center text-brand-light-blue mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm tracking-wide uppercase text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-slate-400 font-light text-[11px] leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-brand-light-blue text-[9px] font-bold uppercase tracking-widest">
                  <span>VETTED STATUS</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profile Breakdown */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light-blue font-bold uppercase tracking-[0.2em] text-[9px] block font-display">
              Administrative Command
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 uppercase">
              Program Leadership
            </h2>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-14 border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light-blue/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              
              {/* Leader Avatar */}
              <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-md bg-slate-100 flex items-center justify-center relative">
                  <User className="absolute w-20 h-20 text-slate-350" strokeWidth={1} />
                  <div className="absolute inset-0 bg-brand-blue/5 flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-brand-blue opacity-40">S.K</span>
                  </div>
                </div>
                {/* Badge Overlay */}
                <div className="absolute -bottom-4 -right-4 bg-brand-blue text-white w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg text-center p-2">
                  <Award className="w-5 h-5 text-brand-light-blue" />
                  <span className="text-[7px] font-bold uppercase tracking-widest block mt-0.5">FOUNDER</span>
                </div>
              </div>

              {/* Leader Bio Detail Info */}
              <div className="space-y-6 flex-1 text-center md:text-left">
                <div>
                  <span className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-[9px] font-bold tracking-widest uppercase rounded-full inline-block mb-3 font-display">
                    Youth Dev Specialist
                  </span>
                  <h3 className="font-display text-3xl font-bold text-slate-900 mb-1">
                    SHAWN KELLY
                  </h3>
                  <p className="text-brand-light-blue font-bold text-xs uppercase tracking-[0.15em] font-display">
                    Founder &amp; Executive Director
                  </p>
                </div>

                <p className="text-slate-600 font-light text-sm leading-relaxed">
                  Shawn Kelly leads operational design and caseworker integration frameworks. Leveraging a professional curriculum of physical fitness and safety council compliance, Shawn guarantees that youth find clear character outlets and stable lines of developmental guidance.
                </p>

                <div>
                  <h4 className="font-display text-[10px] font-bold text-slate-850 uppercase tracking-widest mb-4 flex items-center gap-2 justify-center md:justify-start">
                    <ClipboardList className="w-4 h-4 text-brand-blue" />
                    Verified Credentials
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-left">
                    {credentialsList.map((cred, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-slate-600 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-light-blue shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
