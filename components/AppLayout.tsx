"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundAtmosphere from "@/components/BackgroundAtmosphere";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <BackgroundAtmosphere />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className="relative z-10" style={{ opacity: loading ? 0 : 1, transition: "opacity 1s ease-in-out" }}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </div>
    </>
  );
}
