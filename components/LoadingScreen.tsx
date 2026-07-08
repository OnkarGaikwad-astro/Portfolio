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
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-avior-bg backdrop-blur-3xl"
    >
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Animated Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-avior-primary/20 border-t-avior-primary"
        />
        
        {/* Tiny Star */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="w-2 h-2 bg-avior-primary rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_8px_#6D9C9F]" />
        </motion.div>

        {/* Center Logo */}
        <h1 className="font-heading text-2xl tracking-widest text-avior-slate z-10 uppercase">
          Onkar
        </h1>
      </div>
      
      {/* Percentage */}
      <div className="mt-12 font-mono text-sm text-avior-slate/70 tracking-widest">
        {Math.min(progress, 100)}%
      </div>
    </motion.div>
  );
}
