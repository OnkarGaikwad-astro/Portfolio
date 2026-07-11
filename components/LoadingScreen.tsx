"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Wait for fade out
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Circumference of the SVG circle: 2 * pi * r (46)
  const circumference = 289.03;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] backdrop-blur-3xl"
    >
      {/* Subtle colored glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--color-avior-primary)_0%,transparent_50%)] mix-blend-screen"></div>
      
      <div className="relative flex items-center justify-center w-40 h-40">
        
        {/* SVG Circular Progress Bar */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" className="stroke-white/5" strokeWidth="1" />
          <motion.circle 
            cx="50" cy="50" r="46" fill="none" 
            className="stroke-avior-primary" 
            strokeWidth="1.5"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Logo */}
        <div className="absolute inset-0 m-auto w-[65%] h-[65%] rounded-3xl overflow-hidden z-10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <img src="/icon.png" alt="Logo" className="w-full h-full object-cover animate-pulse" />
        </div>
      </div>
      
      {/* Percentage & Status Line */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 font-mono text-sm tracking-[0.2em] flex items-center gap-6"
      >
        <span className="w-12 text-right text-avior-primary font-bold">{Math.min(progress, 100)}%</span>
        <div className="h-px w-16 bg-gradient-to-r from-avior-primary/50 to-transparent"></div>
        <span className="text-avior-slate/40">LOADING SYSTEM</span>
      </motion.div>
    </motion.div>
  );
}
