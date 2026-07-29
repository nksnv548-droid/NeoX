"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = "",
  y = 32,
  delay = 0,
  stagger = 0.08,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as any;

  useEffect(() => {
    if (!ref.current) return;
    const targets = ref.current.children.length
      ? Array.from(ref.current.children)
      : [ref.current];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
