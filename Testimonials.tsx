"use client";

import Reveal from "@/components/ui/Reveal";

const STORIES = [
  {
    quote:
      "Neo X shipped in six weeks what our last agency quoted eight months for — and it hasn't broken once.",
    name: "D.",
    role: "Founder, fintech scale-up",
  },
  {
    quote:
      "The weekly demos meant zero surprises at launch. We always knew exactly what we were getting.",
    name: "S.",
    role: "Head of Product, logistics platform",
  },
  {
    quote:
      "Their design engineers think in code, not just Figma. Nothing got lost in translation.",
    name: "K.",
    role: "CTO, healthcare network",
  },
  {
    quote:
      "We came for a rebrand and left with a growth engine. The retainer paid for itself in a quarter.",
    name: "L.",
    role: "CMO, climate-tech firm",
  },
];

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative py-28"
    >
      <Reveal className="mx-auto mb-14 max-w-lg px-6 text-center sm:px-10">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Client voices
        </span>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Teams talk about Neo X
          <span className="text-gradient italic"> differently.</span>
        </h2>
      </Reveal>

      <div className="no-scrollbar flex gap-5 overflow-x-auto px-6 pb-6 snap-x snap-mandatory sm:px-10 lg:px-16">
        {STORIES.map((story, i) => (
          <div
            key={i}
            className="glass-strong flex w-[85vw] shrink-0 flex-col justify-between rounded-3xl p-8 snap-center sm:w-[420px]"
          >
            <p className="font-display text-xl leading-relaxed italic text-mist-100">
              &ldquo;{story.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bloom-500/30 text-sm">
                {story.name}
              </span>
              <span className="text-sm text-mist-500">{story.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
