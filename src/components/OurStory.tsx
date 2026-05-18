import { motion } from 'motion/react';

export default function OurStory() {
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

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://lh3.googleusercontent.com/d/1ij0c6x2te4sYxY4gRI63zH84EmKJ2TzA" 
                alt="Youth athlete portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Background Accent */}
            <div className="absolute -top-10 -left-10 w-full h-full border-4 border-brand-light-blue/20 rounded-[3rem] -z-10" />
            <div className="absolute -bottom-6 -right-6 p-8 bg-brand-blue text-white rounded-3xl z-20 shadow-xl max-w-xs hidden md:block">
              <p className="text-lg font-light leading-relaxed">
                "Stay away from those people who try to disparage your ambitions. Great minds will give you a feeling that you can become great too."
              </p>
              <footer className="mt-4 font-bold text-sm uppercase tracking-widest text-brand-light-blue">— Mark Twain</footer>
            </div>
          </div>

          <div>
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-brand-blue uppercase bg-brand-blue/5 rounded-full"
            >
              Our Story
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-950 mb-8 leading-tight">
              WHY WE DO<br />
              <span className="text-brand-light-blue">WHAT WE DO</span>
            </h2>

            <div className="space-y-12">
              {storyPoints.map((point, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 border-l-2 border-slate-100 hover:border-brand-light-blue transition-colors"
                >
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-brand-light-blue rounded-full" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tight font-display">
                    {point.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {point.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-slate-950 rounded-3xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 rounded-full blur-3xl uppercase" />
              <h4 className="text-2xl font-bold font-display mb-4">Our Vision</h4>
              <p className="text-slate-400 font-light leading-relaxed">
                If one mentor can change one life, imagine what a whole organization can do. We're building a movement focused on mentorship, leadership, and community.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
