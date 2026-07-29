"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { work } from "@/lib/siteConfig";

const GRADIENTS = [
  "from-bloom-600/50 via-bloom-500/20 to-transparent",
  "from-coral-500/40 via-bloom-500/15 to-transparent",
  "from-emerald-500/30 via-bloom-500/15 to-transparent",
  "from-bloom-400/40 via-coral-500/15 to-transparent",
];

export default function Work() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16"
    >
      <Reveal className="mx-auto mb-16 max-w-lg text-center">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Selected work
        </span>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Shipped, not just
          <span className="text-gradient italic"> shown.</span>
        </h2>
      </Reveal>

      <Reveal y={28} stagger={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {work.map((item, i) => (
          <a
            key={item.title}
            href="#contact"
            className="glass group relative overflow-hidden rounded-3xl p-8 transition-colors hover:bg-white/[0.06]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} opacity-40`}
            />
            <div className="relative">
              <span className="glass mb-6 inline-block rounded-full px-3 py-1 text-xs text-mist-300">
                {item.tag}
              </span>
              <h3 className="mb-3 max-w-sm font-display text-2xl leading-snug">
                {item.title}
              </h3>
              <p className="mb-6 text-sm text-mist-300">{item.result}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist-100">
                View case study
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
