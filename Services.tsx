"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/siteConfig";

const OrbVisual = dynamic(() => import("@/components/three/OrbVisual"), {
  ssr: false,
});

export default function Services() {
  const orbSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbSectionRef.current) return;
    const labels = gsap.utils.toArray<HTMLElement>(".drift-label");

    const ctx = gsap.context(() => {
      labels.forEach((label, i) => {
        gsap.fromTo(
          label,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 0.9,
            y: -30,
            duration: 4,
            ease: "none",
            repeat: -1,
            delay: i * 1.2,
            repeatDelay: labels.length * 1.2 - 4,
          }
        );
      });
    }, orbSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="services"
        ref={orbSectionRef}
        className="relative mx-auto max-w-4xl px-6 pt-28 pb-10 text-center sm:px-10 lg:px-16"
      >
        <Reveal className="mx-auto mb-4 max-w-xl">
          <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
            What we do
          </span>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            A full-stack studio,
            <span className="text-gradient italic"> built for scale.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-mist-300">
            Seven disciplines. One senior team. Every project shipped as if
            our reputation depends on it — because it does.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-10 aspect-square max-w-md">
          {services.slice(0, 5).map((s, i) => {
            const positions = [
              "left-0 top-6",
              "right-0 top-20",
              "left-2 bottom-24",
              "right-4 bottom-8",
              "left-1/2 top-0 -translate-x-1/2",
            ];
            return (
              <span
                key={s.title}
                className={`drift-label glass absolute rounded-full px-3 py-1.5 text-xs text-mist-300 opacity-0 ${positions[i]}`}
              >
                {s.title}
              </span>
            );
          })}
          <OrbVisual />
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-28 sm:px-10 lg:px-16">
        <Reveal
          y={28}
          stagger={0.08}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="glass group rounded-3xl p-7 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <div className="glass mb-5 flex h-11 w-11 items-center justify-center rounded-full text-bloom-400">
                <Icon name={service.icon} />
              </div>
              <h3 className="mb-2 font-display text-xl">{service.title}</h3>
              <p className="text-sm text-mist-300">{service.description}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
