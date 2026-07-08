"use client";

import { motion } from "framer-motion";

export default function AbstractArtwork() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[3rem]">
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 bg-avior-bg opacity-50"></div>
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[150%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(109,156,159,0.2)_0%,rgba(241,245,226,0.1)_25%,rgba(78,103,105,0.2)_50%,rgba(241,245,226,0.1)_75%,rgba(109,156,159,0.2)_100%)] blur-2xl"
      />

      {/* Floating Glass Geometry */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 rounded-full border border-avior-white/40 bg-avior-white/20 backdrop-blur-md shadow-xl"
        style={{ top: "20%", left: "10%" }}
      />
      
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-64 h-32 rounded-[2rem] border border-avior-white/40 bg-avior-white/10 backdrop-blur-xl shadow-lg"
        style={{ bottom: "25%", right: "15%" }}
      />

      {/* Center Core */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-40 h-40 rounded-full border-2 border-avior-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(109,156,159,0.2)]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-avior-slate/30"
        />
        <div className="w-16 h-16 rounded-full bg-avior-primary shadow-[0_0_30px_rgba(109,156,159,0.6)]" />
      </motion.div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-20 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] mix-blend-overlay"></div>
    </div>
  );
}
