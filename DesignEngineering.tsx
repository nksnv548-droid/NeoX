"use client";

import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const CHECKLIST = [
  "Design systems from scratch",
  "Accessible by default",
  "60fps everywhere",
];

export default function DesignEngineering() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-24 sm:px-10 lg:px-16">
      <Reveal className="glass-strong rounded-[2.5rem] p-8 sm:p-14">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Design Engineering
        </span>
        <h2 className="max-w-lg font-display text-4xl leading-tight sm:text-5xl">
          Products that feel
          <span className="text-gradient italic"> inevitable.</span>
        </h2>
        <p className="mt-6 max-w-xl text-mist-300">
          Motion, micro-interactions, and craft baked into every component.
          We design in the browser, ship to production, iterate weekly.
        </p>

        <ul className="mt-8 space-y-3">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-3 text-mist-100">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bloom-500/80">
                <Check size={14} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
