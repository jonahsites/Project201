import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ExternalLink, 
  QrCode, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Pizza, 
  Car, 
  ArrowRight,
  Maximize2,
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';

const ZEFFY_CAMPAIGN_URL = "https://www.zeffy.com/en-US/donation-form/support-project--201";
const CAMPAIGN_FLYER_IMG = "/van-campaign-flyer.png";
const CAMPAIGN_FLYER_FALLBACK = "https://res.cloudinary.com/hxn9dbuhd/image/upload/v1780940565/organizations/7/1/0/4/710408fa-5fe8-4f67-a25e-df7ee3c0bba1/009ba05f-1704-4a3e-a615-abf561cbfe00.png";
const LOGO_URL = "https://cdn.prod.website-files.com/676454c7900c0070c4219d2a/67a1e7a94e7d4cbcfd580329_uc.png";

interface VanCampaignSectionProps {
  standalone?: boolean;
  onNavigateContact?: () => void;
}

export default function VanCampaignSection({ standalone = false, onNavigateContact }: VanCampaignSectionProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [showImageZoom, setShowImageZoom] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<number>(25);

  useEffect(() => {
    QRCode.toDataURL(ZEFFY_CAMPAIGN_URL, {
      width: 480,
      margin: 2,
      color: {
        dark: '#031B33',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(ZEFFY_CAMPAIGN_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const donationTiers = [
    { amount: 5, label: "$5", desc: "$5 matters — every slice makes a difference" },
    { amount: 25, label: "$25", desc: "$25 matters — fuels program rides for a week" },
    { amount: 50, label: "$50", desc: "$50 matters — supports route transit & equipment" },
    { amount: 100, label: "$100", desc: "$100 matters — full monthly passenger seat" },
    { amount: 250, label: "$250+", desc: "Community Hero — vehicle insurance & maintenance fund" },
  ];

  return (
    <section 
      id="youth-van-campaign"
      className={`relative overflow-hidden transition-all ${
        standalone ? 'pt-28 pb-24 bg-slate-900 text-white' : 'py-20 bg-gradient-to-b from-slate-900 via-brand-blue to-slate-900 text-white'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-brand-light-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Partnership Announcement Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold font-display uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Pizza className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Pizzeria Partner Community Campaign</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-light-blue/20 text-brand-light-blue border border-brand-light-blue/30 text-xs font-bold font-display uppercase tracking-wider backdrop-blur-md">
            <Car className="w-4 h-4" />
            <span>Youth Transportation Passenger Van Fundraiser</span>
          </span>
        </div>

        {/* Main Title Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            🚐 HELP PROJECT 201 <br className="hidden sm:inline" />
            <span className="text-brand-light-blue">GET OUR YOUTH THERE</span> 💙
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Sometimes the opportunity is there — <strong className="text-white font-semibold">but the ride isn’t.</strong> At Project 201, we believe transportation should never be the reason a young person misses an opportunity to learn, grow, belong, or experience something new.
          </p>
        </div>

        {/* Core Spotlight Grid: QR Code & Direct Zeffy Support + Flyer Art */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Official Flyer & Context (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/5 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light-blue/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light-blue font-display flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Official Campaign Flyer
                </span>
                <button
                  onClick={() => setShowImageZoom(true)}
                  className="text-xs text-slate-350 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                  title="Zoom Flyer"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Zoom
                </button>
              </div>

              {/* Flyer Artwork */}
              <div 
                onClick={() => setShowImageZoom(true)}
                className="relative aspect-square rounded-2xl overflow-hidden border border-white/15 bg-slate-950/60 cursor-pointer group-hover:border-brand-light-blue/40 transition-all shadow-inner"
              >
                <img 
                  src={CAMPAIGN_FLYER_IMG} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = CAMPAIGN_FLYER_FALLBACK;
                  }}
                  alt="Support Project 201 - Help Our Youth Get There Flyer" 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-end p-4">
                  <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    Click to view full flyer
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                  Vehicle Acquisition &amp; Safety Fund
                </h3>
                <p className="text-slate-350 text-xs font-light leading-relaxed">
                  Funds raised through this campaign will help purchase and put a safe youth transportation vehicle into service, including necessary insurance, registration, safety equipment, and initial operating expenses.
                </p>
              </div>
            </div>

            {/* Quick stats / highlights */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="block text-brand-light-blue font-display text-xl font-black">100%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-350 font-bold">Goes To Project 201</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="block text-emerald-400 font-display text-xl font-black">0% Fees</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-350 font-bold">Zeffy Free Platform</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pizzeria QR Code Scanner, Instant Donation & Zeffy Portal (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-2 border-brand-light-blue/30 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative">
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light-blue font-display">
                      Scan or Tap To Donate
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                    Support Via Pizzeria QR Code
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/15 cursor-pointer shrink-0"
                    title="Printable Pizza Box Flyer & Card"
                  >
                    <Printer className="w-4 h-4 text-brand-light-blue" />
                    <span>Print Card</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/15 cursor-pointer shrink-0"
                    title="Copy Campaign Link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-brand-light-blue" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code and Quick Scan explanation */}
              <div className="grid sm:grid-cols-12 gap-6 items-center">
                {/* QR Code Card */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-brand-light-blue/40 relative group">
                    {qrCodeDataUrl ? (
                      <img 
                        src={qrCodeDataUrl} 
                        alt="Zeffy Campaign QR Code" 
                        className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                      />
                    ) : (
                      <div className="w-44 h-44 flex items-center justify-center text-slate-400">
                        <QrCode className="w-16 h-16 animate-pulse" />
                      </div>
                    )}
                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 font-display block">
                        Scan With Phone
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        Direct to Zeffy Form
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scan instruction info */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                    <p className="text-xs text-slate-200 font-light leading-relaxed">
                      <strong className="text-white font-semibold">Have your pizza box or receipt flyer in hand?</strong> Simply open your smartphone camera and point it at the QR code, or tap the button below to complete your tax-deductible pledge immediately.
                    </p>
                    <div className="flex items-center gap-2 text-brand-light-blue text-[11px] font-bold uppercase tracking-wider">
                      <Pizza className="w-3.5 h-3.5 text-amber-400" />
                      <span>Every Slice Supports Our Youth</span>
                    </div>
                  </div>

                  {/* Impact amount badges */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-350 block mb-2 font-display">
                      Select Impact Tier:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {donationTiers.slice(0, 4).map((tier) => (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => setSelectedTier(tier.amount)}
                          className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                            selectedTier === tier.amount 
                              ? 'bg-brand-light-blue text-brand-blue border-brand-light-blue shadow-lg scale-105' 
                              : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-350 mt-2 font-light italic">
                      {donationTiers.find(t => t.amount === selectedTier)?.desc || "Every donation helps get our youth there."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Big Direct Zeffy Action CTA */}
              <div className="pt-2 space-y-3">
                <a
                  href={ZEFFY_CAMPAIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-light-blue via-cyan-300 to-brand-light-blue hover:from-white hover:to-brand-light-blue text-brand-blue font-black font-display text-sm md:text-base tracking-wider uppercase transition-all shadow-xl hover:shadow-cyan-400/20 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 text-center cursor-pointer border border-cyan-300/40"
                >
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 shrink-0" />
                  <span>Donate on Zeffy (${selectedTier} or Custom)</span>
                  <ExternalLink className="w-4 h-4 text-brand-blue shrink-0" />
                </a>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Tax-Deductible 501(c)(3) Giving
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-light-blue" />
                    Instant Email Tax Receipt
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Motto Quote */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light-blue/10 border border-brand-light-blue/20 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-brand-light-blue" />
              </div>
              <div>
                <p className="text-white text-xs font-bold font-display uppercase tracking-wide">
                  “You have somewhere to go? We’ll get you there.”
                </p>
                <p className="text-slate-400 text-[10px] font-light">
                  Our promise to every young athlete and student in our program.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* The Full Campaign Story & Message (Verbatim User Narrative) */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md space-y-10">
          
          <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light-blue font-display block mb-1">
                The Mission Story
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                Why A Passenger Van Changes Everything
              </h3>
            </div>
            <div className="text-amber-400 font-display text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>ALL YOUTH MATTER. #SaveOurYouth 💙</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-slate-200 text-sm md:text-base font-light leading-relaxed">
            <div className="space-y-4">
              <p>
                We are raising funds to secure a <strong className="text-white font-medium">safe, reliable passenger van</strong> that will allow us to transport the youth we serve to mentorship programs, sports activities, educational and career opportunities, community events, family activities, and other positive experiences.
              </p>
              <p>
                <strong className="text-brand-light-blue font-semibold">For some of our youth, simply getting there can be the biggest obstacle.</strong>
              </p>
              <p>
                We want to change that. Having our own transportation would allow Project 201 to reach more young people, keep them connected to positive programs, expose them to new opportunities, and make sure a lack of transportation doesn’t keep them on the sidelines.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <h4 className="text-brand-light-blue font-display text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-light-blue" />
                  💙 Every Donation Gets Us Closer
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white/5 font-semibold text-white">💰 $5 matters.</div>
                  <div className="p-2 rounded-lg bg-white/5 font-semibold text-white">🤝 $25 matters.</div>
                  <div className="p-2 rounded-lg bg-white/5 font-semibold text-white">⭐ $100 matters.</div>
                  <div className="p-2 rounded-lg bg-white/5 font-semibold text-white">📢 Every share matters.</div>
                </div>
                <p className="text-[11px] text-slate-350 pt-1">
                  Every business partnership and every restaurant ally matters.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-blue/40 border border-brand-light-blue/20">
                <p className="text-xs italic text-slate-200 leading-relaxed">
                  "Our goal is simple: When one of our young people has somewhere positive to be, we want to be able to say: <strong className="text-brand-light-blue not-italic font-bold">‘You have somewhere to go? We’ll get you there.’</strong> Help Project 201 get our youth there. Donate. Share. Partner with us."
                </p>
              </div>
            </div>
          </div>

          {/* Restaurant & Pizzeria Partnership Callout */}
          <div className="bg-gradient-to-r from-amber-500/10 via-brand-blue/30 to-amber-500/10 border border-amber-400/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-display">
                <Pizza className="w-3.5 h-3.5" /> For Pizzerias, Delis &amp; Local Business Owners
              </div>
              <h4 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                Want To Join Our Pizzeria Delivery Coalition?
              </h4>
              <p className="text-slate-350 text-xs max-w-xl font-light leading-relaxed">
                Spearheaded with community partner <strong className="text-white font-medium">San Vito’s Restaurant &amp; Pizzeria</strong> (Bayonne, NJ) and local food partners distributing flyer inserts and pizza box QR codes! We provide ready-to-print flyers, sticker QR inserts, and register display cards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print QR Cards</span>
              </button>
              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-display shadow-lg font-black"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Printable Pizza Box Flyer Modal */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Pizza className="w-5 h-5 text-amber-500" />
                  <h3 className="font-display font-black text-lg uppercase text-slate-900">
                    Printable Pizzeria Box Flyer &amp; QR Card
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Body Content */}
              <div className="p-8 overflow-y-auto space-y-6 text-center print:p-0" id="printable-pizzeria-card">
                <div className="border-4 border-dashed border-brand-blue/30 rounded-3xl p-6 sm:p-8 bg-slate-50/50 space-y-6">
                  
                  {/* Top Branding */}
                  <div className="flex items-center justify-center gap-3">
                    <img src={LOGO_URL} alt="Project 201 Logo" className="h-12 w-auto" />
                    <div className="text-left">
                      <span className="block font-display font-black text-xl text-brand-blue tracking-tight leading-none">
                        PROJECT 201
                      </span>
                      <span className="text-[10px] font-bold text-brand-light-blue uppercase tracking-widest block mt-0.5">
                        Youth Mentorship &amp; Development
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <div>
                    <span className="inline-block bg-amber-100 text-amber-800 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-display mb-2">
                      🍕 Community Pizzeria Partner Initiative
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight leading-tight">
                      🚐 HELP PROJECT 201 <br />
                      GET OUR YOUTH THERE 💙
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium mt-2 max-w-md mx-auto">
                      Sometimes the opportunity is there — <span className="text-brand-blue font-bold">but the ride isn’t.</span> Support our youth passenger van!
                    </p>
                  </div>

                  {/* Big QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-slate-200 inline-block">
                      {qrCodeDataUrl && (
                        <img 
                          src={qrCodeDataUrl} 
                          alt="Campaign QR Code" 
                          className="w-52 h-52 object-contain"
                        />
                      )}
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="font-display font-black text-sm uppercase text-slate-900 tracking-wider">
                        SCAN WITH YOUR PHONE CAMERA
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {ZEFFY_CAMPAIGN_URL}
                      </p>
                    </div>
                  </div>

                  {/* Quick Tiers & Impact */}
                  <div className="bg-brand-blue text-white rounded-2xl p-4 text-xs space-y-2">
                    <p className="font-display font-bold uppercase tracking-wider text-brand-light-blue text-center">
                      💙 Every Donation Gets Us Closer
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center font-bold">
                      <span className="bg-white/10 py-1 rounded">$5</span>
                      <span className="bg-white/10 py-1 rounded">$25</span>
                      <span className="bg-white/10 py-1 rounded">$50</span>
                      <span className="bg-white/10 py-1 rounded">$100</span>
                    </div>
                    <p className="text-[10px] text-slate-350 text-center font-light pt-1">
                      100% of your donation directly funds the passenger van on Zeffy (0% platform fees).
                    </p>
                  </div>

                  {/* Footer Tagline */}
                  <div className="text-[11px] text-slate-500 font-medium">
                    “You have somewhere to go? We’ll get you there.” • ALL YOUTH MATTER • #SaveOurYouth 💙
                  </div>

                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50 gap-4">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Link Copied!" : "Copy URL"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPrintModal(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer font-display"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print This Card</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Flyer Image Modal Zoom */}
      <AnimatePresence>
        {showImageZoom && (
          <div 
            onClick={() => setShowImageZoom(false)}
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl max-h-[90vh] bg-slate-900 rounded-3xl p-4 border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageZoom(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-colors z-20 cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <img 
                src={CAMPAIGN_FLYER_IMG} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = CAMPAIGN_FLYER_FALLBACK;
                }}
                alt="Full Campaign Flyer" 
                className="w-full h-auto max-h-[82vh] object-contain rounded-2xl"
              />
              <div className="mt-3 text-center">
                <a
                  href={ZEFFY_CAMPAIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-light-blue text-brand-blue font-bold font-display text-xs uppercase tracking-wider hover:bg-white transition-all shadow"
                >
                  <span>Donate on Zeffy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
