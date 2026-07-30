'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Stage {
  coord: string;
  label: string;
  heading: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    coord: '01 / 04',
    label: 'Chart',
    heading: 'We map the terrain before writing a line of model code.',
    detail:
      'Every engagement starts with your actual data, failure cases, and constraints — not a generic capability demo. We chart what "working" means before we build toward it.',
  },
  {
    coord: '02 / 04',
    label: 'Plot',
    heading: 'A trajectory gets set, with checkpoints you can see.',
    detail:
      'Fine-tuning runs, retrieval architecture, and eval harnesses are scoped against measurable checkpoints, reviewed with your team at each one — no black-box handoff at the end.',
  },
  {
    coord: '03 / 04',
    label: 'Deploy',
    heading: 'Ships on your infrastructure, under your controls.',
    detail:
      'Private VPC, on-prem cluster, or edge runtime — the system runs where your data already lives, with the access boundaries your security team requires.',
  },
  {
    coord: '04 / 04',
    label: 'Hold the line',
    heading: 'Production means it keeps working after we leave.',
    detail:
      'Drift monitoring, regression suites, and a documented runbook so the system stays accurate as your data changes — not just on launch day.',
  },
];

export function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = stageRefs.current.filter(Boolean) as HTMLDivElement[];
      const markers = markerRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(stages.slice(1), { opacity: 0, y: 24 });
      gsap.set(markers, { opacity: 0.35 });
      if (markers[0]) gsap.set(markers[0], { opacity: 1 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${stages.length * 800}`,
        pin: true,
        scrub: 0.4,
        snap: 1 / (stages.length - 1),
        onUpdate: (self) => {
          const idx = Math.min(
            stages.length - 1,
            Math.floor(self.progress * stages.length)
          );

          stages.forEach((el, i) => {
            gsap.to(el, {
              opacity: i === idx ? 1 : 0,
              y: i === idx ? 0 : i < idx ? -24 : 24,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });

          markers.forEach((el, i) => {
            gsap.to(el, {
              opacity: i === idx ? 1 : 0.3,
              duration: 0.3,
              overwrite: 'auto',
            });
          });
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-surface"
    >
      <div className="grid-field pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-10">
        <p className="mono-eyebrow mb-10 flex items-center gap-3 text-signal-glow">
          <span className="node-dot" />
          APPROACH
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
          <div className="hidden flex-col gap-6 md:flex">
            {STAGES.map((stage, i) => (
              <div
                key={stage.label}
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                className="flex items-center gap-3"
              >
                <span className="node-dot" />
                <span className="mono-eyebrow text-mist">{stage.label}</span>
              </div>
            ))}
          </div>

          <div className="relative h-[280px] md:h-[320px]">
            {STAGES.map((stage, i) => (
              <div
                key={stage.heading}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <span className="mono-eyebrow mb-4 block text-steel">
                  {stage.coord}
                </span>
                <h3 className="mb-5 max-w-2xl font-display text-clamp-h2 font-semibold leading-[1.05] tracking-tightest2 text-paper">
                  {stage.heading}
                </h3>
                <p className="max-w-lg font-body text-base text-mist md:text-lg">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
