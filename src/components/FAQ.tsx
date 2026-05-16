import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How often can my youth/athlete train each week, and what is the ideal frequency?",
    a: "The number of training sessions per week varies based on the specific program they are enrolled in. Some programs offer unlimited sessions, while others are limited to a certain number of days per week. Generally, 2 to 3 days of training per week is considered optimal, depending on the program."
  },
  {
    q: "What program is recommended if my youth isn't an athlete but wants to get fit?",
    a: "We recommend our Individual Fitness Session. It's designed for all levels and focuses on general health, movement quality, and building a consistent fitness habit without the pressures of team sports."
  },
  {
    q: "Which 201 Sports program is best for my youth/athlete?",
    a: "That depends on their goals! For competitive athletes, Speed & Agility or D1 Training is best. For those starting out, Individual Fitness is a great entry point. We offer free consultations to help you choose."
  },
  {
    q: "How many youth/athletes are in a class? / What is the class size?",
    a: "We keep our classes small to ensure high-quality attention. Typical class sizes range from 6 to 12 athletes, depending on the focus of the session."
  },
  {
    q: "How long does it take to see results?",
    a: "Consistency is key. Most athletes begin to feel changes in movement and energy within 3-4 weeks, with significant physical and skill-based improvements visible within 8-12 weeks."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-brand-light-blue font-bold tracking-widest text-xs uppercase mb-4 block">Information</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4 uppercase">
            201 Training FAQ's
          </h2>
          <p className="text-slate-500 font-light uppercase tracking-tighter">Looking for something specific?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-display font-bold text-slate-800 text-lg md:text-xl pr-8 uppercase tracking-tight">
                  {faq.q}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === idx ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
