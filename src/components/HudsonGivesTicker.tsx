import React from 'react';
import { motion } from 'framer-motion';

export const HudsonGivesTicker = ({ onClick }: { onClick: () => void }) => {
  const tickerItems = [
    "Hudson Gives 2026 is LIVE!",
    "Support Youth Mentorship",
    "7 Donors Already Contributed",
    "6% of $15,000 Goal Reached",
    "Double Your Impact at 2:01 PM!",
    "Join Project 201 Mission",
  ];

  return (
    <div 
      onClick={onClick}
      className="bg-[#14b8a6] overflow-hidden py-3 cursor-pointer group relative hover:bg-[#008080] transition-colors overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#14b8a6] to-transparent z-10 group-hover:from-[#008080]" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#14b8a6] to-transparent z-10 group-hover:from-[#008080]" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <img 
              src="https://gg-day-of-giving.s3.amazonaws.com/njhudson2026/app/images/day-of-giving-logo-horizontal.svg" 
              alt="Hudson Gives" 
              className="h-8 invert brightness-0"
            />
            <span className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f97316]" />
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
