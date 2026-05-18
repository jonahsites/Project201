import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Heart, Shield, Lock, CreditCard, User, Mail, Gift, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface DonationCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: string;
}

export const DonationCheckout = ({ isOpen, onClose, initialAmount = "25" }: DonationCheckoutProps) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(initialAmount);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { id: 1, title: 'Amount', icon: Gift },
    { id: 2, title: 'Identity', icon: User },
    { id: 3, title: 'Review', icon: Shield },
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // User will handle real submission logic
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
      />
      
      <motion.div 
        layoutId="checkout-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {!isSubmitted ? (
          <>
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-brand-blue uppercase tracking-tight">Support Project 201</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Impact Generation</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper */}
            <div className="bg-slate-50/50 px-8 py-4 flex justify-between">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${step >= s.id ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-brand-blue' : 'text-slate-400'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["25", "50", "150", "375"].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAmount(val)}
                          className={`py-4 rounded-2xl border-2 font-bold transition-all ${amount === val ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input 
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full h-16 bg-slate-50 rounded-2xl px-10 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                          placeholder="Other amount"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Display Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                          <input 
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-16 bg-slate-50 rounded-2xl pl-14 pr-6 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                          <input 
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-16 bg-slate-50 rounded-2xl pl-14 pr-6 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-light-blue transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isAnonymous ? 'bg-brand-light-blue' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAnonymous ? 'left-7' : 'left-1'}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">Donate anonymously</span>
                    </label>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-brand-blue rounded-3xl p-8 text-white">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Total Donation</span>
                        <Heart className="w-5 h-5 text-brand-light-blue" />
                      </div>
                      <div className="text-5xl font-bold mb-2">${amount}</div>
                      <div className="text-sm opacity-60">One-time impact for youth mentorship</div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Donor</span>
                        <span className="font-bold text-brand-blue">{isAnonymous ? "Anonymous" : name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Recipient</span>
                        <span className="font-bold text-brand-blue">Project 201</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Campaign</span>
                        <span className="font-bold text-brand-blue">Hudson Gives 2026</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest justify-center">
                      <Lock className="w-3 h-3" />
                      Secure SSL encrypted contribution
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4">
                {step > 1 && (
                  <button 
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-16 rounded-2xl bg-slate-100 text-slate-600 font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] h-16 rounded-2xl bg-brand-blue text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 transition-all flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="flex-[2] h-16 rounded-2xl bg-brand-light-blue text-brand-blue font-bold uppercase tracking-widest text-xs hover:bg-brand-light-blue/90 shadow-xl shadow-brand-light-blue/20 transition-all flex items-center justify-center gap-2"
                  >
                    Complete Donation
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center space-y-8"
          >
            <div className="w-20 h-20 bg-brand-light-blue/10 rounded-full flex items-center justify-center text-brand-light-blue mx-auto">
              <Check className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-brand-blue uppercase tracking-tight">Impact Generated!</h2>
              <p className="text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
                Thank you for supporting Project 201. Your contribution of ${amount} will directly fund mentorship for youth in our community.
              </p>
            </div>
            <div className="pt-4">
              <Button 
                onClick={onClose}
                className="bg-brand-blue text-white rounded-2xl px-10 py-6"
              >
                Close Window
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
