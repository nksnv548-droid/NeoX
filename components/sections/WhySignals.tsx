"use client";

import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { signals } from "@/lib/siteConfig";

export default function WhySignals() {
  return (
    <section
      id="why-neo-x"
      className="relative mx-auto max-w-4xl px-6 py-28 sm:px-10 lg:px-16"
    >
      <Reveal className="mx-auto mb-20 max-w-lg text-center">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Why Neo X
        </span>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Five reasons teams
          <span className="text-gradient italic"> stay with us.</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-gradient-to-b from-bloom-500/60 via-mist-500/30 to-transparent sm:block" />
        <Reveal y={24} stagger={0.12} className="space-y-10">
          {signals.map((signal) => (
            <div key={signal.n} className="relative flex gap-6 sm:pl-2">
              <div className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-bloom-400">
                <Icon name={signal.icon} size={18} />
              </div>
              <div>
                <span className="mb-1 block text-xs uppercase tracking-widest text-mist-500">
                  {signal.n} · Signal
                </span>
                <h3 className="mb-1.5 font-display text-2xl">
                  {signal.title}
                </h3>
                <p className="max-w-md text-mist-300">{signal.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
