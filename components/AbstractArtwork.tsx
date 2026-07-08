"use client";

import { motion } from "framer-motion";

export default function AbstractArtwork() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[3rem] pointer-events-none">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
      
      {/* Central Glowing Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-[60px] rounded-full"
      />
      
      {/* Outer Rotating Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full border-t-white/60"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full border-b-white/40"
      />
      
      {/* Core Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/30 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
