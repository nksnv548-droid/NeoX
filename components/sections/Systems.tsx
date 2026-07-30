'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SystemSpec {
  coord: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ICON_CLASS = 'h-6 w-6 text-signal-glow';

const SYSTEMS: SystemSpec[] = [
  {
    coord: 'X:04 Y:12',
    title: 'Fine-tuned models',
    description:
      'Base models adapted on your own data and vocabulary, then evaluated against tasks your team actually does — not a generic benchmark.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M12 2v3.2M12 18.8V22M2 12h3.2M18.8 12H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    coord: 'X:18 Y:07',
    title: 'Vector search & RAG',
    description:
      'Retrieval pipelines tuned per corpus, with re-ranking and citation tracing so answers stay grounded in your source of truth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <rect x="4" y="4" width="16" height="4.2" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="9.9" width="16" height="4.2" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="15.8" width="16" height="4.2" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7.4" cy="6.1" r="0.9" fill="currentColor" />
        <circle cx="7.4" cy="12" r="0.9" fill="currentColor" />
        <circle cx="7.4" cy="17.9" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    coord: 'X:09 Y:21',
    title: 'Edge inference',
    description:
      'Quantized, distilled variants deployed close to the request — sub-100ms responses without shipping data off-device.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="19" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6.6 6.2 10.6 17.4M17.4 6.2 13.4 17.4M7 5H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    coord: 'X:23 Y:15',
    title: 'Private infrastructure',
    description:
      'Runs inside your VPC or on-prem cluster. No shared tenancy, no silent data egress — you hold every key.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <rect x="4" y="3.5" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="14.5" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7.4" cy="6.5" r="0.9" fill="currentColor" />
        <circle cx="7.4" cy="17.5" r="0.9" fill="currentColor" />
        <path d="M17 6.5h0.01M17 17.5h0.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Systems() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-system-card]', { opacity: 0, y: 32 });

      ScrollTrigger.batch('[data-system-card]', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }),
        once: true,
      });

      gsap.from('[data-systems-heading]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-systems-heading]',
          start: 'top 88%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="systems" ref={rootRef} className="relative bg-void py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div data-systems-heading className="mb-16 max-w-2xl md:mb-20">
          <p className="mono-eyebrow mb-5 flex items-center gap-3 text-signal-glow">
            <span className="node-dot" />
            CAPABILITY MAP
          </p>
          <h2 className="font-display text-clamp-h1 font-semibold leading-[1.02] tracking-tightest2 text-paper">
            Four systems, plotted to work as one.
          </h2>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-line md:grid-cols-2">
          {SYSTEMS.map((system) => (
            <div
              key={system.title}
              data-system-card
              className="group relative border-b border-r border-line px-8 py-10 transition-colors duration-300 hover:bg-surface md:px-10 md:py-12"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center border border-line2">
                  {system.icon}
                </div>
                <span className="mono-eyebrow text-steel">{system.coord}</span>
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-paper md:text-2xl">
                {system.title}
              </h3>
              <p className="max-w-sm font-body text-sm text-mist md:text-base">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
    }
