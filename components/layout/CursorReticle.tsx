'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Signature element: a coordinate-readout reticle that tracks the pointer,
 * echoing the crosshair/grid motif in the Neo X mark. Hidden on touch devices
 * and respects prefers-reduced-motion (falls back to native cursor).
 */
export function CursorReticle() {
  const ref = useRef<HTMLDivElement>(null);
  const xLabelRef = useRef<HTMLSpanElement>(null);
  const yLabelRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const quickX = gsap.quickTo(ref.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const quickY = gsap.quickTo(ref.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
      if (xLabelRef.current) xLabelRef.current.textContent = String(Math.round(e.clientX)).padStart(4, '0');
      if (yLabelRef.current) yLabelRef.current.textContent = String(Math.round(e.clientY)).padStart(4, '0');
    };

    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    const onOverInteractive = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      setActive(!!target.closest('a, button, [data-cursor="active"]'));
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointermove', onOverInteractive);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointermove', onOverInteractive);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div
        className={`relative flex items-center justify-center transition-[width,height] duration-200 ${
          active ? 'h-12 w-12' : 'h-6 w-6'
        }`}
      >
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper/70" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-paper/70" />
        <span
          className={`absolute rounded-full border border-paper/60 transition-all duration-200 ${
            active ? 'h-9 w-9' : 'h-3 w-3'
          }`}
        />
      </div>
      <div className="mono-eyebrow absolute left-4 top-4 flex gap-2 whitespace-nowrap text-paper/50">
        <span>X:<span ref={xLabelRef}>0000</span></span>
        <span>Y:<span ref={yLabelRef}>0000</span></span>
      </div>
    </div>
  );
      }
