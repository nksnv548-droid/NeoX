"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { brand } from "@/lib/siteConfig";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Neo X", href: "#why-neo-x" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        "#mobile-menu",
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [open]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-glass" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-mist-100">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="font-display text-lg tracking-tight">
            {brand.shortName}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm text-mist-300">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-mist-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-mist-100 px-5 py-2 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Start Your Project
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full glass md:hidden"
        >
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-mist-100 transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-mist-100 transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-mist-100 transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="glass-strong mx-auto mt-3 max-w-5xl rounded-3xl p-6 md:hidden"
        >
          <ul className="flex flex-col gap-4 text-base">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-mist-300 transition-colors hover:text-mist-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-mist-100 px-5 py-3 text-center text-sm font-semibold text-ink-950"
          >
            Start Your Project
          </a>
        </div>
      )}
    </header>
  );
}
