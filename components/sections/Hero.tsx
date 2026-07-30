'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';

const VectorField = dynamic(
  () => import('@/components/three/VectorField').then((m) => m.VectorField),
  { ssr: false }
);

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.set(lineRefs.current, { yPercent: 110 });
      tl.set('[data-hero-fade]', { opacity: 0, y: 16 });

      tl.to(lineRefs.current, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: 'power4.out',
      }).to(
        '[data-hero-fade]',
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
        '-=0.5'
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-void pt-16"
    >
      <div className="grid-field pointer-events-none absolute inset-0 opacity-70" />
      <VectorField />
      <div className="gradient-fade-b pointer-events-none absolute inset-x-0 bottom-0 h-64" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
        <p
          data-hero-fade
          className="mono-eyebrow mb-6 flex items-center gap-3 text-signal-glow"
        >
          <span className="node-dot" />
          NEO X / VECTOR INTELLIGENCE SYSTEMS
        </p>

        <h1 className="font-display text-clamp-hero font-semibold leading-[0.95] tracking-tightest2 text-paper">
          {['Precision-plotted', 'artificial', 'intelligence.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          data-hero-fade
          className="mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md font-body text-base text-mist md:text-lg">
            Neo X designs and ships fine-tuned models on infrastructure you
            control — every system charted, measured, and held to a
            production bar before it ever reaches a user.
          </p>

          <div className="flex flex-shrink-0 items-center gap-4">
            <Button variant="primary">Plot a system</Button>
            <Button variant="ghost">View deployments</Button>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        className="pointer-events-none absolute bottom-8 right-6 hidden flex-col items-end gap-1 md:flex md:right-10"
      >
        <span className="mono-eyebrow text-steel">SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-steel to-transparent" />
      </div>
    </section>
  );
         }
