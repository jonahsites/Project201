import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Gift, 
  Info 
} from 'lucide-react';

export default function MerchPage() {
  const images = [
    {
      url: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.15752-9/729566832_2633036090465089_8940830409767576087_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Xno8SjH0tPcQ7kNvwEyCHmg&_nc_oc=AdqSbG7WhxDukrrpdfePnAQLR1q7VaUiV7OzQV7uqL2gmGfi9OQfrjdZs_Sgupu4rnyG4MZ5J-gYEMUNCn6z-onC&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_ss=7b6a8&oh=03_Q7cD5gEIxo_z2dTePMXQ0kdLMbK5Mp_2L4uv9JCAuNY3f3juBw&oe=6A629B5D",
      title: "Save Our Youth Design Mockup"
    },
    {
      url: "https://lh3.googleusercontent.com/d/1jR3qQnUZNKxFQYw2zmnzQKNDtTl1DDsR",
      title: "Left Chest Logo Design"
    }
  ];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [additionalDonation, setAdditionalDonation] = useState(10);
  const [customDonation, setCustomDonation] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'shipping'>('pickup');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // Checkout/Preorder completion states
  const [isPreordering, setIsPreordering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  const donationOptions = [0, 5, 10, 25, 50];

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

  const shirtPrice = 30;
  const subtotal = shirtPrice * quantity;
  const finalDonation = additionalDonation;
  const total = subtotal + finalDonation;

  const handlePreorderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreordering(true);
    
    // Simulate API registration of pre-order
    setTimeout(() => {
      setOrderSummary({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        size: selectedSize,
        quantity,
        deliveryType,
        address: deliveryType === 'shipping' ? `${address}, ${city} ${zip}` : 'Local Pickup (Keyport/Bayonne)',
        subtotal,
        donation: finalDonation,
        total,
        preorderId: "SOY-" + Math.floor(100000 + Math.random() * 900000)
      });
      setIsPreordering(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50/25 pb-24">
      {/* Page Hero */}
      <section className="bg-brand-blue text-white py-16 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-light-blue rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <span className="text-brand-light-blue font-bold uppercase tracking-[0.25em] text-[10px] block mb-3 font-display">
            Official Campaign Merchandise
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-tight tracking-tight">
            Save Our Youth <span className="text-brand-light-blue font-light">Pre-Order</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 font-light text-xs md:text-sm leading-relaxed">
            Wear your support on your chest. 100% of proceeds fund our active 1-on-1 mentorship networks, positive role modeling, and community outings in New Jersey.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <div className="grid lg:grid-cols-12 gap-12">
                
                {/* Left Side: Product Image & Gallery (5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-lg relative overflow-hidden aspect-square flex items-center justify-center group">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-brand-light-blue text-brand-blue font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-display border border-brand-blue/10">
                        PRE-ORDER ONLY
                      </span>
                    </div>
                    <motion.img 
                      key={activeImageIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={images[activeImageIdx].url} 
                      alt={images[activeImageIdx].title} 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain rounded-2xl select-none"
                    />
                  </div>

                  {/* Thumbnail Selector */}
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`p-2 bg-white rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer relative overflow-hidden ${
                          activeImageIdx === idx 
                            ? 'border-brand-blue shadow-md' 
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <img 
                          src={img.url} 
                          alt={img.title} 
                          referrerPolicy="no-referrer"
                          className="h-20 object-contain rounded-lg"
                        />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight text-center font-display truncate w-full">
                          {idx === 0 ? "Full Tee Mockup" : "Left Chest Logo"}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Trust badges */}
                  <div className="bg-white/50 border border-slate-100 rounded-3xl p-6 space-y-4">
                    <h4 className="text-slate-900 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Campaign Standards
                    </h4>
                    <p className="text-slate-500 font-light text-xs leading-relaxed">
                      This pre-order runs directly under the oversight of Project 201 founders Shawn Kelly and Ana Espinal. All orders are manufactured locally in New Jersey, supporting community employment.
                    </p>
                  </div>
                </div>

                {/* Right Side: Product Description & Order Form (7 Columns) */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  <div className="space-y-3">
                    <span className="text-brand-light-blue font-bold tracking-[0.2em] text-[10px] uppercase font-display block">
                      Limited Edition Tee
                    </span>
                    <h2 className="font-display font-black text-slate-900 text-3xl uppercase leading-none tracking-tight">
                      Save Our Youth T-Shirt
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-brand-blue font-display">$30.00</span>
                      <span className="px-3 py-1 bg-brand-light-blue/15 text-brand-blue rounded-full text-[9px] font-bold uppercase tracking-wider font-display">
                        Pre-Order Campaign
                      </span>
                    </div>
                  </div>

                  {/* Core Description Box */}
                  <div className="border-t border-b border-slate-100 py-6 space-y-4">
                    <h3 className="font-display font-black text-slate-800 text-xs uppercase tracking-wider">
                      SAVE OUR YOUTH — More than a shirt. A statement.
                    </h3>
                    <p className="text-slate-600 font-light text-xs leading-relaxed">
                      Every purchase helps support Project 201’s youth mentorship, sports, education, and community programs. 
                      Featuring our official <strong>Save Our Youth</strong> design in Carolina Blue and Black on a premium, white soft-style tee.
                    </p>
                    <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-4 flex gap-3 items-start">
                      <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                        This is a pre-order item. Orders will be custom-printed and distributed after the pre-order campaign closes. Available in Unisex sizes from Small to 3XL.
                      </p>
                    </div>
                  </div>

                  {/* Selection & Checkout Form */}
                  <form onSubmit={handlePreorderSubmit} className="space-y-8">
                    
                    {/* Size & Quantity Selection */}
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Size Selector */}
                      <div className="space-y-2.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                          Select Size:
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                          {sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSelectedSize(s)}
                              className={`py-3 rounded-xl font-bold font-display text-xs transition-all border ${
                                selectedSize === s 
                                  ? 'bg-brand-blue border-brand-blue text-white shadow-md' 
                                  : 'bg-white border-slate-150 text-slate-600 hover:border-slate-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="space-y-2.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                          Quantity:
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-12 h-12 rounded-xl bg-white border border-slate-150 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-bold text-slate-800 font-display">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-12 h-12 rounded-xl bg-white border border-slate-150 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Interactive Additional Donation Section (Crucial requirement!) */}
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-150 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-brand-light-blue uppercase tracking-widest font-display flex items-center gap-1.5 select-none">
                          <Gift className="w-3.5 h-3.5 animate-pulse" />
                          Supporter Checkout Add-on
                        </span>
                        <h4 className="text-slate-950 font-display font-bold text-sm uppercase tracking-tight">
                          Add an Additional Donation to Further Support Our Programs?
                        </h4>
                        <p className="text-slate-500 font-light text-xs leading-relaxed">
                          Your additional donation helps fund leadership coaching, safe spaces, and educational opportunities for local youth across New Jersey.
                        </p>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {donationOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleDonationSelect(opt)}
                            className={`py-2.5 rounded-xl text-xs font-bold font-display transition-all border ${
                              !isCustom && additionalDonation === opt
                                ? 'bg-brand-blue border-brand-blue text-white shadow-md'
                                : 'bg-white border-slate-150 text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            {opt === 0 ? "No thanks" : `+$${opt}`}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 font-display">
                          Or enter custom donation amount ($):
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                          <input 
                            type="number"
                            value={isCustom ? customDonation : ''}
                            onChange={(e) => handleCustomDonationChange(e.target.value)}
                            className="w-full h-11 bg-white border border-slate-150 rounded-xl pl-8 pr-4 font-bold text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                            placeholder="Custom amount"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Supporter Pre-order Delivery & Contact Info Form */}
                    <div className="space-y-4">
                      <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                        Pre-Order Billing &amp; Contact Details
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">First Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                            <input 
                              required
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full h-12 bg-white border border-slate-150 rounded-xl pl-11 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              placeholder="John"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Last Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                            <input 
                              required
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full h-12 bg-white border border-slate-150 rounded-xl pl-11 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                            <input 
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full h-12 bg-white border border-slate-150 rounded-xl pl-11 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                            <input 
                              required
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full h-12 bg-white border border-slate-150 rounded-xl pl-11 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              placeholder="(555) 555-5555"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Delivery preference */}
                      <div className="space-y-2.5">
                        <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Fulfillment Preference</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setDeliveryType('pickup')}
                            className={`py-3 rounded-xl text-xs font-bold font-display transition-all border flex flex-col items-center gap-1 ${
                              deliveryType === 'pickup' 
                                ? 'bg-brand-blue border-brand-blue text-white shadow' 
                                : 'bg-white border-slate-150 text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            <span className="text-xs">Local Pickup</span>
                            <span className="text-[9px] font-light opacity-80">(Bayonne or Keyport Centers - Free)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryType('shipping')}
                            className={`py-3 rounded-xl text-xs font-bold font-display transition-all border flex flex-col items-center gap-1 ${
                              deliveryType === 'shipping' 
                                ? 'bg-brand-blue border-brand-blue text-white shadow' 
                                : 'bg-white border-slate-150 text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            <span className="text-xs">Standard Shipping</span>
                            <span className="text-[9px] font-light opacity-80">(Delivered To Your Address - Free Campaign Shipping)</span>
                          </button>
                        </div>
                      </div>

                      {deliveryType === 'shipping' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4 pt-2"
                        >
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Shipping Address</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                              <input 
                                required={deliveryType === 'shipping'}
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full h-12 bg-white border border-slate-150 rounded-xl pl-11 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                                placeholder="123 Community Lane"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">City / Town (NJ)</label>
                              <input 
                                required={deliveryType === 'shipping'}
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-12 bg-white border border-slate-150 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                                placeholder="Bayonne"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold uppercase text-slate-400 font-display">Zip Code</label>
                              <input 
                                required={deliveryType === 'shipping'}
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="w-full h-12 bg-white border border-slate-150 rounded-xl px-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                                placeholder="07002"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Order summary calculation block */}
                    <div className="bg-white border border-slate-150 rounded-3xl p-6 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Save Our Youth T-Shirt ({selectedSize}) × {quantity}</span>
                        <span className="font-bold font-display text-slate-800">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {finalDonation > 0 && (
                        <div className="flex justify-between items-center text-xs text-emerald-600">
                          <span className="flex items-center gap-1">Supporter Added Donation</span>
                          <span className="font-bold font-display">+${finalDonation.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                        <span className="text-slate-850 font-bold text-xs uppercase tracking-wider font-display">Estimated Total:</span>
                        <span className="text-xl font-black text-brand-blue font-display">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Pre-order trigger button */}
                    <button
                      type="submit"
                      disabled={isPreordering}
                      className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-brand-blue/15 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-55"
                    >
                      {isPreordering ? (
                        <>Processing Pre-Order...</>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          PRE-ORDER NOW
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>
            ) : (
              /* Success Screen */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl text-center space-y-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-widest font-display">
                    Pre-Order Confirmed
                  </span>
                  <h2 className="font-display font-black text-slate-900 text-2xl md:text-3xl uppercase tracking-tight">
                    Thank You For Your Support!
                  </h2>
                  <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
                    Your pre-order has been registered with ID: <strong className="font-mono text-brand-blue">{orderSummary.preorderId}</strong>. We are printing our Save Our Youth apparel batch soon!
                  </p>
                </div>

                {/* Preorder Breakdown */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-display border-b border-slate-200 pb-2">
                    Pre-Order Invoice
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-500">
                    <span>Supporter:</span>
                    <span className="text-slate-800 text-right font-medium">{orderSummary.name}</span>

                    <span>Email:</span>
                    <span className="text-slate-800 text-right font-medium">{orderSummary.email}</span>

                    <span>Tee Size:</span>
                    <span className="text-slate-800 text-right font-bold">{orderSummary.size} (Qty: {orderSummary.quantity})</span>

                    <span>Fulfillment:</span>
                    <span className="text-slate-800 text-right font-medium capitalize">{orderSummary.deliveryType}</span>

                    {orderSummary.deliveryType === 'shipping' && (
                      <>
                        <span>Delivery Address:</span>
                        <span className="text-slate-800 text-right font-light text-[11px]">{orderSummary.address}</span>
                      </>
                    )}

                    <span className="pt-2 border-t border-dashed border-slate-200">Pre-Order Subtotal:</span>
                    <span className="text-slate-850 text-right font-medium pt-2 border-t border-dashed border-slate-200">${orderSummary.subtotal.toFixed(2)}</span>

                    {orderSummary.donation > 0 && (
                      <>
                        <span className="text-emerald-600">Added Supporter Donation:</span>
                        <span className="text-emerald-600 text-right font-medium">+${orderSummary.donation.toFixed(2)}</span>
                      </>
                    )}

                    <span className="pt-2 border-t border-slate-300 text-sm font-bold text-slate-900">Total Charged:</span>
                    <span className="text-sm font-black text-brand-blue text-right pt-2 border-t border-slate-300">${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Steps Section */}
                <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-6 text-left space-y-4">
                  <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider font-display flex items-center gap-2">
                    <Sparkles size={14} className="text-brand-light-blue" />
                    How to Fulfill Your Pre-Order Payment
                  </h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    To finalize the pre-order, please process your total donation of <strong>${orderSummary.total.toFixed(2)}</strong> via our secure nonprofit platform or direct checkout coordinates:
                  </p>

                  <div className="space-y-3 pt-1">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded bg-brand-blue text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Click the secure button below to visit our official Zeffy fundraising channel.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded bg-brand-blue text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Select "Custom Donation Amount", enter <strong>${orderSummary.total.toFixed(2)}</strong>, and complete checkout.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded bg-brand-blue text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Please mention your Pre-Order ID <strong className="font-mono text-brand-blue">{orderSummary.preorderId}</strong> in the message notes during donation!
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://www.zeffy.com/en-US/donation-form/support-project--201"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-center text-[10px] tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      SECURE BILLING VIA ZEFFY
                    </a>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        // reset form
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setPhone('');
                        setAddress('');
                        setCity('');
                        setZip('');
                        setQuantity(1);
                      }}
                      className="flex-1 py-3 bg-white border border-slate-150 text-slate-600 hover:bg-slate-50 font-bold text-center text-[10px] tracking-widest uppercase rounded-xl transition-all cursor-pointer"
                    >
                      Pre-order Another Shirt
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
