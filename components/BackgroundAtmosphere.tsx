"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BackgroundAtmosphere() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Background Image */}
      <img
        src="/Spiderman.jpg"
        alt="Atmospheric Background"
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
      />

      {/* Dark Blur Overlay for perfect text contrast */}
      <div className="absolute inset-0 backdrop-blur-[12px] bg-black/40 z-10" />

      {/* Subtle Noise Texture for realism */}
      <div className="absolute inset-0 z-20 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] mix-blend-overlay"></div>
    </div>
  );
}
