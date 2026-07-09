"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[10000] items-center justify-center"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.4 }}
    >
      <div 
        className="w-10 h-10 rounded-full border border-avior-white/30 backdrop-blur-sm transition-colors duration-300"
        style={{ 
          backgroundColor: isHovering ? 'rgba(230, 0, 0, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(230, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)'
        }}
      />
    </motion.div>
  );
}
