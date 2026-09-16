import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Gift, 
  Info, 
  CreditCard, 
  Lock, 
  Calendar, 
  Truck, 
  Package, 
  Printer, 
  Check, 
  Copy,
  Clock
} from 'lucide-react';
import { sendFormToEmail, TARGET_EMAIL, openMailClient } from '../lib/emailService';

// Fallback illustrations
import holidayHoodieImg from '../assets/images/holiday_drop_hoodie_1789594162467.jpg';
import holidayCrewneckImg from '../assets/images/holiday_drop_crewneck_1789594179393.jpg';

export interface HolidayDropSectionProps {
  onDonate?: () => void;
  standalone?: boolean;
}

export default function HolidayDropSection({ standalone = false }: HolidayDropSectionProps) {
  // Product item options
  const products = [
    {
      id: 'hoodie',
      name: '201 EST. 1947 Heavyweight Hoodie',
      tagline: 'Clean. Bold. Timeless.',
      price: 55,
      image: holidayHoodieImg,
      badge: 'Holiday Drop Signature',
      features: [
        'Heavyweight 400+ GSM cotton-poly premium fleece',
        'Double-layered warmth hood with metal drawstring eyelets',
        'Spacious reinforced kangaroo front pocket',
        'Collegiate block "201 EST. 1947" screen-printed chest emblem',
        'Ultra-soft brushed interior with heavy ribbed cuffs & hem'
      ]
    },
    {
      id: 'crewneck',
      name: '201 EST. 1947 Classic Crewneck',
      tagline: 'Heritage Knit. Everyday Comfort.',
      price: 45,
      image: holidayCrewneckImg,
      badge: 'Classic Athletic Fit',
      features: [
        'Premium 380 GSM ring-spun cotton fleece',
        'Reinforced ribbed crew collar that retains shape',
        'Drop-shoulder athletic cut for relaxed daily wear',
        'Collegiate block "201 EST. 1947" chest typography',
        'Elasticized ribbed hem & cuffs for maximum structure retention',
        'Pre-shrunk fabric built for lasting longevity'
      ]
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<'hoodie' | 'crewneck'>('hoodie');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Additional donation add-on
  const [additionalDonation, setAdditionalDonation] = useState<number>(10);
  const [customDonation, setCustomDonation] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Customer & Delivery form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'shipping' | 'pickup'>('shipping');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [notes, setNotes] = useState('');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'zeffy'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('');

  // Submission / Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null);
  const [orderMailtoUri, setOrderMailtoUri] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const currentItem = products.find(p => p.id === selectedProduct) || products[0];
  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  const donationOptions = [0, 10, 20, 50, 100];

  const handleDonationSelect = (amount: number) => {
    setIsCustom(false);
    setAdditionalDonation(amount);
  };

  const handleCustomDonationChange = (val: string) => {
    setIsCustom(true);
    setCustomDonation(val);
    const parsed = parseFloat(val);
    setAdditionalDonation(isNaN(parsed) || parsed < 0 ? 0 : parsed);
  };

  const subtotal = currentItem.price * quantity;
  const shippingFee = deliveryType === 'shipping' ? 0 : 0; // Free campaign holiday shipping
  const totalAmount = subtotal + additionalDonation + shippingFee;

  const galleryImages = [
    {
      url: currentItem.image,
      title: `${currentItem.name} - Front Mockup`
    },
    {
      url: selectedProduct === 'hoodie' ? holidayCrewneckImg : holidayHoodieImg,
      title: selectedProduct === 'hoodie' ? '201 Classic Crewneck Option' : '201 Heavyweight Hoodie Option'
    }
  ];

  const handlePreorderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedPreorderId = `HD-1947-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      preorderId: generatedPreorderId,
      campaign: '201 EST. 1947 Holiday Drop',
      customerName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      product: currentItem.name,
      itemType: selectedProduct === 'hoodie' ? 'Heavyweight Hoodie' : 'Classic Crewneck',
      color: 'Triple Black / Heritage White Print',
      size: selectedSize,
      quantity,
      deliveryType: deliveryType === 'shipping' ? 'Tracked Standard Shipping (Free)' : 'Hudson County Local Pickup (Bayonne / Jersey City)',
      shippingAddress: deliveryType === 'shipping' ? `${address.trim()}, ${city.trim()}, NJ ${zip.trim()}` : 'Pickup at Project 201 Headquarters (576 Avenue A, Bayonne, NJ 07002)',
      subtotal: `$${subtotal.toFixed(2)}`,
      additionalDonation: additionalDonation > 0 ? `$${additionalDonation.toFixed(2)}` : '$0.00',
      totalPaid: `$${totalAmount.toFixed(2)}`,
      paymentMethod: paymentMethod === 'card' ? 'Online Card Checkout (Authorized)' : 'Zeffy 0%-Fee Nonprofit Gateway',
      cardLast4: paymentMethod === 'card' && cardNumber ? cardNumber.replace(/\s+/g, '').slice(-4) : 'N/A',
      customerNotes: notes.trim() || 'None',
      fulfillmentTarget: 'December Holiday Drop Delivery (Estimated Early December 2026)',
      timestamp: new Date().toLocaleString()
    };

    setOrderConfirmation(orderData);

    try {
      const emailResult = await sendFormToEmail('201 EST. 1947 Holiday Drop Pre-Order', orderData);
      setOrderMailtoUri(emailResult.mailtoUri);
    } catch (err) {
      console.error('Error dispatching order notification:', err);
    }

    setIsProcessing(false);
    setIsSuccess(true);
    
    // Smooth scroll to top of section
    const el = document.getElementById('holiday-drop-preorder-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyOrderId = () => {
    if (orderConfirmation?.preorderId) {
      navigator.clipboard?.writeText(orderConfirmation.preorderId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section 
      id="holiday-drop-preorder-container" 
      className={`relative overflow-hidden ${standalone ? 'pt-24 pb-20' : 'py-20 bg-slate-950 text-white'}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-light-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* Section Header & Holiday Drop Branding */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-light-blue text-[10px] font-bold uppercase tracking-[0.2em] font-display">
            <Sparkles className="w-3.5 h-3.5 text-brand-light-blue animate-pulse" />
            Official Limited Edition Pre-Order • December Holiday Drop
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
            201 <span className="text-brand-light-blue font-light">EST. 1947</span>
          </h2>

          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Heavyweight hoodies and premium crewnecks commemorating New Jersey’s original 1947 area code.
            Wear the code. Fuel the mission.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 text-white">
              <Calendar className="w-4 h-4 text-brand-light-blue" />
              Pre-Orders Open Now
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Package className="w-4 h-4 text-brand-light-blue" />
              Delivery in Early December
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Heart className="w-4 h-4 text-emerald-400" />
              100% Proceeds Support NJ Youth
            </span>
          </div>
        </div>

        {/* The Meaning of "201 EST. 1947" Narrative Card */}
        <div className="mb-16 bg-gradient-to-r from-slate-900 via-brand-blue/30 to-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-light-blue uppercase font-bold block">
                The Heritage Story
              </span>
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl uppercase tracking-tight">
                Why "201 EST. 1947"? More Than Just a Number.
              </h3>
              <p className="text-slate-350 font-light text-xs sm:text-sm leading-relaxed">
                When the North American telephone numbering system was first established in <strong>1947</strong>, 
                <strong> 201</strong> was designated as <strong>New Jersey’s original and only area code</strong>, covering the entire state from Sussex down to Cape May.
              </p>
              <p className="text-slate-350 font-light text-xs sm:text-sm leading-relaxed">
                Over the decades, 201 became synonymous with Northern New Jersey pride, resilience, and community brotherhood. 
                Today, <strong>Project 201</strong> embodies that very lineage — serving youth, families, and aspiring athletes throughout the Garden State with mentorship, sports, discipline, and life skills.
              </p>
            </div>

            <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-center">
              <div className="font-display font-black text-3xl text-brand-light-blue">1947</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">New Jersey's Original Code</div>
              <div className="border-t border-white/10 pt-3 text-[11px] text-slate-300 font-light italic leading-relaxed">
                "A symbol of identity, discipline, and community strength for our next generation."
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Order Interface (Form or Success Screen) */}
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* LEFT COLUMN: Product Visuals & Mockup Display */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Main Mockup Box */}
                <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
                    <span className="bg-brand-light-blue text-brand-blue font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-display shadow-md">
                      {currentItem.badge}
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-md text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-mono border border-white/10">
                      Dec 2026 Drop
                    </span>
                  </div>

                  <div className="aspect-square w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/50 relative">
                    <motion.img 
                      key={`${selectedProduct}-${activeImageIdx}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={galleryImages[activeImageIdx]?.url || currentItem.image} 
                      alt={galleryImages[activeImageIdx]?.title || currentItem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs text-slate-400 px-2">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest truncate max-w-[240px]">
                      Color: Triple Black w/ Heritage White
                    </span>
                    <span className="font-display font-black text-xl text-white">
                      ${currentItem.price}.00
                    </span>
                  </div>
                </div>

                {/* Garment Selector: Switcher between Hoodie & Crewneck */}
                <div className="grid grid-cols-2 gap-4">
                  {products.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(prod.id as any);
                        setActiveImageIdx(0);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        selectedProduct === prod.id
                          ? 'bg-brand-blue/40 border-brand-light-blue shadow-lg text-white'
                          : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-xl shrink-0 bg-slate-900 border border-white/10" 
                      />
                      <div className="min-w-0">
                        <span className="font-display font-bold text-xs uppercase block truncate text-white">
                          {prod.id === 'hoodie' ? 'Hoodie ($55)' : 'Crewneck ($45)'}
                        </span>
                        <span className="text-[9px] text-slate-400 block truncate">
                          {prod.tagline}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quality Details Checklist */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Garment Specs &amp; Craftsmanship
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-light">
                    {currentItem.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-brand-light-blue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-3 text-[11px] text-slate-400 font-light flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-light-blue shrink-0" />
                    <span>Free shipping in NJ or direct pickup at Bayonne / Jersey City facilities.</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Pre-Order Customizer & Online Payment Checkout */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                <div className="bg-white text-slate-900 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6">
                  
                  {/* Headline & Price */}
                  <div className="border-b border-slate-100 pb-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-brand-blue font-bold uppercase tracking-widest text-[9px] font-display">
                        Official Pre-Order Portal
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full font-mono">
                        Accepting Pre-Orders
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
                      {currentItem.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-light">
                      Choose your item, size, and fulfillment preference below. Pay securely online and get instant order confirmation.
                    </p>
                  </div>

                  <form onSubmit={handlePreorderSubmit} className="space-y-6">
                    
                    {/* Item Choice (Hoodie vs Crewneck) */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                        1. Select Garment Style:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct('hoodie')}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedProduct === 'hoodie'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-display font-extrabold text-xs uppercase">Heavyweight Hoodie</span>
                            {selectedProduct === 'hoodie' && <CheckCircle className="w-4 h-4 text-brand-blue" />}
                          </div>
                          <span className="text-sm font-black font-display mt-1 text-slate-900">$55.00</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedProduct('crewneck')}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedProduct === 'crewneck'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-display font-extrabold text-xs uppercase">Classic Crewneck</span>
                            {selectedProduct === 'crewneck' && <CheckCircle className="w-4 h-4 text-brand-blue" />}
                          </div>
                          <span className="text-sm font-black font-display mt-1 text-slate-900">$45.00</span>
                        </button>
                      </div>
                    </div>

                    {/* Size & Quantity Selector */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      
                      {/* Size */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                            2. Size (Unisex):
                          </label>
                          <span className="text-[10px] text-slate-400 font-light">True to Size</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1.5">
                          {sizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => setSelectedSize(sz)}
                              className={`py-2.5 rounded-xl font-display font-bold text-xs transition-all border ${
                                selectedSize === sz
                                  ? 'bg-brand-blue border-brand-blue text-white shadow-md'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                          Quantity:
                        </label>
                        <div className="flex items-center h-10 border border-slate-200 rounded-xl px-2 bg-slate-50">
                          <button
                            type="button"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-bold text-sm font-display text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Supporter Added Donation Add-on */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-display flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-brand-light-blue" />
                          Support NJ Youth Mentorship
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">100% Tax-Deductible</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-snug">
                        Add an optional donation to help provide meals, winter athletics gear, and positive mentoring huddles for local teens this winter.
                      </p>

                      <div className="grid grid-cols-5 gap-1.5">
                        {donationOptions.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => handleDonationSelect(amt)}
                            className={`py-2 rounded-lg text-[11px] font-bold font-display transition-all border ${
                              !isCustom && additionalDonation === amt
                                ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {amt === 0 ? "None" : `+$${amt}`}
                          </button>
                        ))}
                      </div>

                      <div className="pt-1">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                          <input 
                            type="number"
                            value={isCustom ? customDonation : ''}
                            onChange={(e) => handleCustomDonationChange(e.target.value)}
                            className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-7 pr-3 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            placeholder="Custom gift amount (e.g. 35)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Customer Contact Information */}
                    <div className="space-y-3 pt-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                        3. Contact &amp; Pre-Order Confirmation Info:
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            required
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name *"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            required
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name *"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address for Receipt *"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number *"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fulfillment Preference */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                        4. Fulfillment Preference:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('shipping')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            deliveryType === 'shipping'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span className="font-display font-bold text-xs uppercase flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5" /> Tracked Shipping
                          </span>
                          <span className="text-[10px] font-light text-slate-500 mt-1">Delivered to your door (Free)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryType('pickup')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            deliveryType === 'pickup'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span className="font-display font-bold text-xs uppercase flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" /> Local NJ Pickup
                          </span>
                          <span className="text-[10px] font-light text-slate-500 mt-1">Bayonne &amp; Jersey City Centers</span>
                        </button>
                      </div>

                      {deliveryType === 'shipping' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 pt-1"
                        >
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input 
                              required={deliveryType === 'shipping'}
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Mailing Address (Street, Apt/Suite) *"
                              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              required={deliveryType === 'shipping'}
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="City / Town (NJ) *"
                              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            />
                            <input 
                              required={deliveryType === 'shipping'}
                              type="text"
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              placeholder="Zip Code *"
                              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Online Payment Method Selector & Card Inputs */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-600" />
                          5. Online Payment &amp; Checkout:
                        </label>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" /> 256-Bit SSL Encrypted
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'card'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-brand-blue" />
                            <span className="font-display font-bold text-xs uppercase">Pay Online by Card</span>
                          </div>
                          {paymentMethod === 'card' && <CheckCircle className="w-3.5 h-3.5 text-brand-blue" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('zeffy')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'zeffy'
                              ? 'bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <span className="font-display font-bold text-xs uppercase block">Zeffy 0%-Fee Gateway</span>
                            <span className="text-[9px] font-light text-slate-500">Official 501(c)(3) Portal</span>
                          </div>
                          {paymentMethod === 'zeffy' && <CheckCircle className="w-3.5 h-3.5 text-brand-blue" />}
                        </button>
                      </div>

                      {/* Card Input Fields if card method selected */}
                      {paymentMethod === 'card' && (
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Card Number *
                            </label>
                            <div className="relative">
                              <CreditCard className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input 
                                required={paymentMethod === 'card'}
                                type="text"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4000 1234 5678 9010"
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl pl-9 pr-3 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                Exp (MM/YY) *
                              </label>
                              <input 
                                required={paymentMethod === 'card'}
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="12/28"
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-xs font-mono font-medium text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                CVC / CVV *
                              </label>
                              <input 
                                required={paymentMethod === 'card'}
                                type="text"
                                maxLength={4}
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                placeholder="382"
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-xs font-mono font-medium text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                Billing Zip *
                              </label>
                              <input 
                                required={paymentMethod === 'card'}
                                type="text"
                                maxLength={5}
                                value={cardZip}
                                onChange={(e) => setCardZip(e.target.value)}
                                placeholder="07002"
                                className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-xs font-mono font-medium text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Total Summary */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>{currentItem.name} ({selectedSize}) × {quantity}</span>
                        <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      {additionalDonation > 0 && (
                        <div className="flex justify-between text-xs text-emerald-600">
                          <span>Added Supporter Youth Donation</span>
                          <span className="font-mono font-bold">+${additionalDonation.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Fulfillment &amp; Tracked Shipping</span>
                        <span className="font-mono font-bold text-emerald-600">FREE</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                        <span className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                          Total Due Now:
                        </span>
                        <span className="font-display font-black text-2xl text-brand-blue">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button & Auto Fill */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setFirstName('TEST');
                            setLastName('SUPPORTER');
                            setEmail('supporter@project201.org');
                            setPhone('(201) 725-5062');
                            setAddress('576 Avenue A');
                            setCity('Bayonne');
                            setZip('07002');
                            setSelectedSize('L');
                            setQuantity(1);
                            setCardNumber('4242 4242 4242 4242');
                            setCardExpiry('12/28');
                            setCardCvc('123');
                            setCardZip('07002');
                          }}
                          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          Fill Sample Test Data
                        </button>

                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 py-4 px-6 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <>Processing Pre-Order...</>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-brand-light-blue" />
                              Complete Online Pre-Order (${totalAmount.toFixed(2)})
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400 text-center font-light leading-snug">
                        By submitting, your preorder is reserved for the December batch. You will receive an instant order confirmation and email record.
                      </p>
                    </div>

                  </form>

                </div>

              </div>

            </div>
          ) : (
            /* PRE-ORDER CONFIRMATION SUCCESS SCREEN */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl text-center space-y-6 text-slate-900"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                <CheckCircle size={36} />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-widest font-display">
                  <Check className="w-3.5 h-3.5" /> Pre-Order Confirmed &amp; Reserved
                </div>
                <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-950">
                  Thank You For Representing 201!
                </h2>
                <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
                  Your official <strong>201 EST. 1947</strong> order has been confirmed. 100% of proceeds support our youth mentorship, athletic routines, and community programs throughout New Jersey.
                </p>
              </div>

              {/* Order Reference Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between max-w-md mx-auto">
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                    Pre-Order Confirmation ID
                  </span>
                  <span className="font-mono font-black text-base text-brand-blue">
                    {orderConfirmation?.preorderId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Itemized Order Summary */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3 text-xs">
                <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-display border-b border-slate-200 pb-2">
                  Pre-Order Invoice Details
                </h4>

                <div className="grid grid-cols-2 gap-y-2 text-slate-600">
                  <span>Recipient:</span>
                  <span className="text-slate-900 text-right font-bold">{orderConfirmation?.customerName}</span>

                  <span>Email Address:</span>
                  <span className="text-slate-900 text-right font-medium">{orderConfirmation?.email}</span>

                  <span>Contact Phone:</span>
                  <span className="text-slate-900 text-right font-medium">{orderConfirmation?.phone}</span>

                  <span>Reserved Item:</span>
                  <span className="text-slate-900 text-right font-bold text-brand-blue">{orderConfirmation?.product}</span>

                  <span>Colorway:</span>
                  <span className="text-slate-900 text-right font-medium">{orderConfirmation?.color}</span>

                  <span>Size &amp; Quantity:</span>
                  <span className="text-slate-900 text-right font-bold">{orderConfirmation?.size} (Qty: {orderConfirmation?.quantity})</span>

                  <span>Fulfillment:</span>
                  <span className="text-slate-900 text-right font-medium">{orderConfirmation?.deliveryType}</span>

                  <span>Destination / Location:</span>
                  <span className="text-slate-900 text-right font-light text-[11px]">{orderConfirmation?.shippingAddress}</span>

                  <span>Estimated Delivery:</span>
                  <span className="text-emerald-700 text-right font-bold">{orderConfirmation?.fulfillmentTarget}</span>

                  <span className="pt-2 border-t border-dashed border-slate-200">Subtotal:</span>
                  <span className="text-slate-900 text-right font-mono font-medium pt-2 border-t border-dashed border-slate-200">
                    {orderConfirmation?.subtotal}
                  </span>

                  {orderConfirmation?.additionalDonation && orderConfirmation.additionalDonation !== '$0.00' && (
                    <>
                      <span className="text-emerald-600">Youth Program Donation:</span>
                      <span className="text-emerald-600 text-right font-mono font-bold">
                        +{orderConfirmation.additionalDonation}
                      </span>
                    </>
                  )}

                  <span className="pt-2 border-t border-slate-300 font-bold text-slate-950 text-sm">Total Paid:</span>
                  <span className="pt-2 border-t border-slate-300 font-black text-brand-blue text-right text-base font-mono">
                    {orderConfirmation?.totalPaid}
                  </span>
                </div>
              </div>

              {/* Notification & Confirmation Notice */}
              <div className="p-4 bg-brand-blue/5 border border-brand-blue/15 rounded-2xl text-left space-y-2">
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block font-display">
                  Direct Pre-Order Record Routed
                </span>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Your order reservation details have been automatically delivered to the Project 201 fulfillment team at <strong>{TARGET_EMAIL}</strong>. 
                  A production tracking update and shipping alert will be issued ahead of the December holiday drop!
                </p>

                {orderMailtoUri && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openMailClient(orderMailtoUri)}
                      className="text-xs font-bold text-brand-blue hover:text-brand-light-blue underline cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      View or Send Email Copy to {TARGET_EMAIL}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Order Summary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setCity('');
                    setZip('');
                    setQuantity(1);
                  }}
                  className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" /> Pre-Order Another Item
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
