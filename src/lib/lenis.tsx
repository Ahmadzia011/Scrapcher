"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      anchors: true,
      lerp: 0.075,
      wheelMultiplier: 0.75,
      touchMultiplier: 1,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
