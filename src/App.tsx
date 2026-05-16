import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import FeatureCarousel from './components/ui/feature-carousel';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Skiper19 } from './components/ui/svg-follow-scroll';
import { BentoPricing } from './components/ui/bento-pricing';
import { SoftGlowBackground } from './components/ui/SoftGlowBackground';
import { motion } from 'framer-motion';
import { SparklesIcon, User } from 'lucide-react';
import { HudsonGivesTicker } from './components/HudsonGivesTicker';
import { HudsonGivesDetail } from './components/HudsonGivesDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'hudson-gives'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (currentPage === 'hudson-gives') {
    return <HudsonGivesDetail onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onHudsonGivesClick={() => setCurrentPage('hudson-gives')} />
      <main>
        <Hero />
        <HudsonGivesTicker onClick={() => setCurrentPage('hudson-gives')} />
        
        <SoftGlowBackground>
          {/* Why 201 Sports Intro Section */}
          <section className="py-24 overflow-hidden border-b border-slate-100">
            <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                   <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-8 leading-tight uppercase">
                    WHY <span className="text-brand-light-blue">201 SPORTS?</span>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">
                    Choose 201 Sports because we are dedicated to nurturing growth and excellence in every individual through the powerful combination of sports and mentorship. 
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-10">
                    Our expert coaches provide top-tier training in sports fundamentals, while our mentors build strong, supportive relationships, fostering essential life skills such as teamwork, discipline, and leadership. At 201 Sports, we shape well-rounded individuals who are not only skilled athletes but also empathetic leaders and global contributors.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 bg-brand-blue rounded-2xl text-white font-bold text-sm tracking-widest uppercase">Empower</div>
                    <div className="px-6 py-3 bg-brand-light-blue rounded-2xl text-white font-bold text-sm tracking-widest uppercase">Excel</div>
                    <div className="px-6 py-3 bg-slate-100 rounded-2xl text-slate-800 font-bold text-sm tracking-widest uppercase border border-slate-200">Mentor</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-square bg-slate-100 rounded-[4rem] flex items-center justify-center p-8 group">
                    <div className="w-full h-full border-2 border-brand-blue/10 rounded-[3rem] p-4 group-hover:border-brand-light-blue transition-colors">
                       <img 
                        src="https://static.wixstatic.com/media/867f79_c1cfa4d8f7b54801991bfea63eb5a16c~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_auto/867f79_c1cfa4d8f7b54801991bfea63eb5a16c~mv2.jpg" 
                        alt="Project 201 Group Training" 
                        className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                      />
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-light-blue/10 blur-3xl rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Skiper19 />
        <OurStory />
        
        {/* Refined Donation Section - Based on Image Design */}
        <section id="donations" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Left Column: Project Content */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                <div className="space-y-6">
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src="https://static.wixstatic.com/media/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg/v1/fill/w_1448,h_965,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg" 
                      alt="Project 201 Youth Training" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {[
                      "https://static.wixstatic.com/media/867f79_27ff568d948a4725aa197597025472a6~mv2.jpg/v1/fill/w_1474,h_602,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/867f79_27ff568d948a4725aa197597025472a6~mv2.jpg",
                      "https://static.wixstatic.com/media/nsplsh_b9adcd81b16640d5819bce16a8acb66c~mv2.jpg/v1/fill/w_1196,h_1796,fp_0.50_0.50,q_90,enc_avif,quality_auto/nsplsh_b9adcd81b16640d5819bce16a8acb66c~mv2.jpg",
                      "https://static.wixstatic.com/media/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg/v1/fill/w_1448,h_965,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg",
                      "https://static.wixstatic.com/media/11062b_e31e7af5f57e45deabe91d4c2b0e697b~mv2.jpg/v1/fill/w_1448,h_965,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_e31e7af5f57e45deabe91d4c2b0e697b~mv2.jpg",
                      "https://static.wixstatic.com/media/867f79_c1cfa4d8f7b54801991bfea63eb5a16c~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_auto/867f79_c1cfa4d8f7b54801991bfea63eb5a16c~mv2.jpg",
                      "https://static.wixstatic.com/media/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg/v1/fill/w_1448,h_965,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_92a8690cb5b94d15a83956747803eb10~mv2.jpg"
                    ].map((img, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer">
                        <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-blue uppercase">
                    Empowering the <span className="text-brand-light-blue">Next Generation</span>
                  </h2>
                  <div className="prose prose-lg text-slate-600 font-light leading-relaxed max-w-none">
                    <p>
                      Project 201 is more than just a training program; it's a movement dedicated to nurturing growth and excellence in every individual. Through the powerful combination of sports and mentorship, we are building leaders who are prepared to excel both on and off the field.
                    </p>
                    <p>
                      Your support during Hudson Gives 2026 directly funds individual fitness plans, speed and agility coaching, and our comprehensive life mentorship program. Together, we can ensure that every dedicated student-athlete in Jersey City has access to the role models and resources they need to thrive.
                    </p>
                  </div>
                </div>

                {/* Integration of Bento Pricing as Selection Tiers */}
                <div className="mt-16 space-y-12">
                   <div className="flex flex-col gap-3">
                     <span className="text-brand-light-blue font-bold uppercase tracking-[0.3em] text-[10px]">Support Strategy</span>
                     <h3 className="font-display text-4xl font-light text-brand-blue uppercase tracking-tight">
                      CHOOSE YOUR <span className="text-slate-300">IMPACT LEVEL</span>
                    </h3>
                   </div>
                   <BentoPricing />
                </div>
              </div>

              {/* Right Column: Donation Card */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8">
                    <h3 className="font-display text-2xl font-bold text-brand-blue mb-2 tracking-tight">Sponsor a Youth: Hudson Gives</h3>
                    <div className="flex gap-2 mb-8">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Jersey City</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Mentorship</span>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-bold text-brand-blue font-display">$700</span>
                        <span className="text-slate-400 text-sm font-medium mb-1">USD raised of $15,000 goal</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-light-blue"
                          initial={{ width: 0 }}
                          whileInView={{ width: "5%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">5 donations</p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <button className="py-4 rounded-2xl border-2 border-brand-blue text-brand-blue font-bold text-sm tracking-widest uppercase hover:bg-slate-50 transition-colors">
                        Share
                      </button>
                      <button 
                        onClick={() => setCurrentPage('hudson-gives')}
                        className="py-4 rounded-2xl bg-brand-blue text-white font-bold text-sm tracking-widest uppercase hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 transition-all w-full md:w-auto px-10"
                      >
                        Donate now!
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-light-blue/20 rounded-full flex items-center justify-center text-brand-blue">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-slate-800 font-bold text-sm">Anonymous Donor</span>
                            <span className="text-brand-blue font-bold text-base">$500</span>
                          </div>
                        </div>
                        <span className="text-slate-400 text-xs font-bold">1d</span>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-light-blue/20 rounded-full flex items-center justify-center text-brand-blue">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-slate-800 font-bold text-sm">Supporter</span>
                            <span className="text-brand-blue font-bold text-base">$100</span>
                          </div>
                        </div>
                        <span className="text-slate-400 text-xs font-bold">3d</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-light-blue/20 rounded-full flex items-center justify-center text-brand-blue">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-slate-800 font-bold text-sm">Ally</span>
                            <span className="text-brand-blue font-bold text-base">$50</span>
                          </div>
                        </div>
                        <span className="text-slate-400 text-xs font-bold">4d</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-10">
                      <button className="py-3 px-4 rounded-xl border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">
                        See all
                      </button>
                      <button className="py-3 px-4 rounded-xl border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <SparklesIcon className="w-3 h-3 text-brand-light-blue" />
                        See top
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureCarousel />
        <FAQ />
        </SoftGlowBackground>
      </main>
      <Footer />
    </div>
  );
}

