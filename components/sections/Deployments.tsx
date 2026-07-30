'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useEffect, useRef } from 'react';

interface Deployment {
  coord: string;
  sector: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
}

const DEPLOYMENTS: Deployment[] = [
  {
    coord: 'X:11 Y:04',
    sector: 'Logistics',
    title: 'Route-exception triage, fine-tuned on dispatcher notes',
    metric: '−63%',
    metricLabel: 'manual triage time',
    summary:
      'A fine-tuned model reads incoming exception reports and pre-classifies severity, routing only the ambiguous cases to a human dispatcher.',
  },
  {
    coord: 'X:07 Y:19',
    sector: 'Healthcare ops',
    title: 'RAG system grounded in internal clinical protocols',
    metric: '0',
    metricLabel: 'ungrounded answers in eval',
    summary:
      'Retrieval pipeline cites the exact protocol section behind every answer, with a re-ranker tuned to the org\u2019s document structure.',
  },
  {
    coord: 'X:22 Y:09',
    sector: 'Financial services',
    title: 'Edge-deployed model for on-device document classification',
    metric: '82ms',
    metricLabel: 'p95 inference latency',
    summary:
      'A distilled, quantized model runs entirely on-device, keeping sensitive documents from ever leaving the local environment.',
  },
];

export function Deployments() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-deployment-row]', { opacity: 0, y: 28 });

      ScrollTrigger.batch('[data-deployment-row]', {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }),
        once: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="deployments" ref={rootRef} className="relative bg-void py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mono-eyebrow mb-5 flex items-center gap-3 text-signal-glow">
              <span className="node-dot" />
              DEPLOYMENTS
            </p>
            <h2 className="font-display text-clamp-h1 font-semibold leading-[1.02] tracking-tightest2 text-paper">
              Systems, in production, measured.
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-mist md:text-base">
            Sector details are generalized to protect client confidentiality.
            Metrics reflect internal evaluation at time of deployment.
          </p>
        </div>

        <div className="border-t border-line">
          {DEPLOYMENTS.map((item, i) => (
            <div
              key={item.title}
              data-deployment-row
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              data-cursor="active"
              className="group relative grid cursor-pointer grid-cols-1 gap-4 border-b border-line py-9 transition-colors duration-300 md:grid-cols-[100px_1fr_220px] md:items-center md:gap-8 md:py-11"
            >
              <motion.div
                aria-hidden
                initial={false}
                animate={{
                  opacity: activeIdx === i ? 1 : 0,
                  scaleX: activeIdx === i ? 1 : 0.6,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 origin-left bg-surface"
                style={{ zIndex: 0 }}
              />

              <span className="relative z-10 mono-eyebrow text-steel">{item.coord}</span>

              <div className="relative z-10">
                <span className="mono-eyebrow mb-2 block text-signal-glow">
                  {item.sector}
                </span>
                <h3 className="mb-2 max-w-xl font-display text-lg font-semibold leading-snug text-paper md:text-xl">
                  {item.title}
                </h3>
                <motion.p
                  initial={false}
                  animate={{
                    height: activeIdx === i ? 'auto' : 0,
                    opacity: activeIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="max-w-lg overflow-hidden font-body text-sm text-mist md:text-base"
                >
                  <span className="block pt-1">{item.summary}</span>
                </motion.p>
              </div>

              <div className="relative z-10 flex items-baseline gap-3 md:flex-col md:items-end md:gap-1">
                <span className="font-display text-3xl font-semibold text-paper md:text-4xl">
                  {item.metric}
                </span>
                <span className="mono-eyebrow text-steel">{item.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
