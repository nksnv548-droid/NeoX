"use client";

import Reveal from "@/components/ui/Reveal";
import { process } from "@/lib/siteConfig";

export default function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-4xl px-6 py-28 sm:px-10 lg:px-16"
    >
      <Reveal className="mx-auto mb-20 max-w-lg text-center">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Our process
        </span>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Four steps, no onboarding
          <span className="text-gradient italic"> tax.</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-gradient-to-b from-bloom-500/60 via-mist-500/30 to-transparent sm:block" />
        <Reveal y={24} stagger={0.15} className="space-y-10">
          {process.map((step) => (
            <div key={step.n} className="relative flex gap-6 sm:pl-2">
              <div className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm text-mist-300">
                {step.n}
              </div>
              <div>
                <h3 className="mb-1.5 font-display text-2xl">{step.title}</h3>
                <p className="max-w-md text-mist-300">{step.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
