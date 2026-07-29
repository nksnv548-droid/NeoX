"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import { faqs as FAQS } from "@/lib/siteConfig";

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = bodyRef.current;
    if (!el) return onToggle();
    if (!isOpen) {
      gsap.set(el, { height: "auto" });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.45, ease: "power2.out" });
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, delay: 0.05 });
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, duration: 0.35, ease: "power2.in" });
    }
    onToggle();
  };

  return (
    <div className="glass rounded-2xl px-6 py-2">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg">{q}</span>
        <span
          className={`ml-4 shrink-0 text-xl text-mist-300 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0 }}>
        <p className="pb-5 text-mist-300">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-3xl px-6 py-28 sm:px-10 lg:px-16"
    >
      <Reveal className="mx-auto mb-14 max-w-lg text-center">
        <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
          Questions
        </span>
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Before you start
          <span className="text-gradient italic"> talking.</span>
        </h2>
      </Reveal>

      <Reveal y={20} stagger={0.08} className="space-y-4">
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </Reveal>
    </section>
  );
}
