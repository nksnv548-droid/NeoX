"use client";

import { Rocket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function PreviewCTA() {
  return (
    <section className="relative mx-auto max-w-2xl px-6 py-10 sm:px-10 lg:px-16">
      <Reveal
        as="div"
        className="glass flex flex-col items-center rounded-[2rem] px-8 py-12 text-center"
      >
        <span className="glass mb-6 flex h-14 w-14 items-center justify-center rounded-full text-bloom-400">
          <Rocket size={22} />
        </span>
        <h3 className="font-display text-2xl leading-snug sm:text-3xl">
          Want a private walkthrough of our current work?
        </h3>
        <a
          href="#contact"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-mist-100 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
        >
          Request a preview →
        </a>
      </Reveal>
    </section>
  );
}
