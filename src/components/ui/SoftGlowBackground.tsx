import React from 'react';
import { cn } from "@/src/lib/utils";

interface SoftGlowBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

export const SoftGlowBackground = ({ className, children }: SoftGlowBackgroundProps) => {
  return (
    <div className={cn("relative w-full overflow-hidden bg-white", className)}>
      {/* Soft Light Blue Glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 10%, #89CFF0 0%, transparent 40%),
            radial-gradient(circle at 10% 10%, #89CFF0 0%, transparent 50%),
            radial-gradient(circle at 10% 10%, #89CFF0 0%, transparent 45%)
          `,
          opacity: 0.6,
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
