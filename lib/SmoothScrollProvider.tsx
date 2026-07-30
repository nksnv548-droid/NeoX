'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { ensureGsapRegistered, gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [instance, setInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    ensureGsapRegistered();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    setInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}
