import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle, 
  ArrowUpRight 
} from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      title: "Weekly Mentorship & Boxing Workshop",
      date: "Every Sat, 10:00 AM",
      desc: "An intensive physical conditioning, technique, and peer character development circle. Designed for youth to master focus, self-restraint and discipline.",
      location: "Jersey City Gym Headquarters",
      category: "Weekly Training"
    },
    {
      title: "Project 201 Community Family Outing",
      date: "June 27, 2026 - All Day",
      desc: "Our annual community outing. Bonding experiences, recreation, family networking, to establish routines of respect, structural cooperation and joy.",
      location: "State Park Outing & Outing Centers",
      category: "Family Bond"
    },
    {
      title: "School District Agility Clinics",
      date: "July 12, 2026 - 3:30 PM",
      desc: "Direct collaborations with NJ public school physical education systems to present modern agility clinics, play strategies and leadership drills.",
      location: "Partner School Track & Arena",
      category: "School Sports"
    },
    {
      title: "PerformCare System Referrals Meet & Greet",
      date: "August 04, 2026 - 6:00 PM",
      desc: "An informative virtual coordination workshop for youth case handlers and CMO coordinators. Walkthrough intake checklists and strategic target alignments.",
      location: "Web Portal Live",
      category: "Agency Meet"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25">
      {/* Hero Header */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light-blue rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block mb-3 font-display">
            Statewide Gatherings &amp; Outings
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase mb-6 leading-tight">
            COMMUNITY EVENTS <br />
            <span className="font-bold text-brand-light-blue">&amp; OUTINGS SCHEDULE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-sm md:text-base leading-relaxed">
            Stay aligned with our physical training camps, peer mentorship schedules, district sports safety assemblies, and parent-child weekend excursions.
          </p>
        </div>
      </section>

      {/* Grid of Events */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <h2 className="font-display text-2xl font-bold text-slate-900 uppercase">
                Upcoming Assemblies
              </h2>
              <span className="px-4 py-1.5 bg-brand-blue/5 text-brand-blue font-bold text-[10px] tracking-widest uppercase rounded-full">
                Season: Spring / Summer 2026
              </span>
            </div>

            <div className="grid gap-6">
              {events.map((evt, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg hover:border-brand-blue/15 transition-all duration-300"
                >
                  <div className="space-y-4 flex-1">
                    <span className="px-3.5 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[9px] font-bold uppercase tracking-widest inline-block font-display">
                      {evt.category}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight uppercase">
                      {evt.title}
                    </h3>
                    <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed max-w-3xl">
                      {evt.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-light-blue" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-light-blue" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto self-stretch flex items-end md:items-center md:justify-end">
                    <a 
                      href="mailto:project201inc@gmail.com?subject=Project%20201%20Event%20Inquiry"
                      className="w-full md:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold font-display text-[10px] tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow"
                    >
                      RSVP / Join
                      <ArrowUpRight className="w-4 h-4 text-brand-light-blue" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
