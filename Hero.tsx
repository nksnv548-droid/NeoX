"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ArrowUpRight, MessageCircle } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { brand, contact } from "@/lib/siteConfig";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-badge",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-line",
          { autoAlpha: 0, y: 40, rotateX: 20 },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 16, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col items-start justify-center overflow-hidden px-6 pt-32 pb-24 sm:px-10 lg:px-16"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="hero-badge glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist-300">
          <span className="h-1.5 w-1.5 rounded-full bg-bloom-400" />
          Now accepting new projects
          <Sparkles size={14} className="text-bloom-400" />
        </div>

        <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="hero-line block">Building</span>
          <span className="hero-line block text-gradient italic">
            intelligent
          </span>
          <span className="hero-line block">digital experiences.</span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-lg text-mist-300">
          {brand.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="hero-cta inline-flex items-center gap-2 rounded-full bg-mist-100 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Start Your Project
            <ArrowUpRight size={16} />
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-mist-100 transition-colors hover:bg-white/10"
          >
            <MessageCircle size={16} className="text-emerald-400" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
