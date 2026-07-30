'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { NeoXMark } from '@/components/ui/NeoXMark';
import { Button } from '@/components/ui/Button';

const LINKS = [
  { label: 'Systems', href: '#systems' },
  { label: 'Approach', href: '#approach' },
  { label: 'Deployments', href: '#deployments' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const el = navRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY && y > 120;
      gsap.to(el, { yPercent: goingDown ? -100 : 0, duration: 0.5, ease: 'power3.out' });
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#top" data-cursor="active" className="flex items-center gap-2.5">
          <NeoXMark className="h-6 w-auto text-paper" />
          <span className="mono-eyebrow text-steel">VECTOR INTELLIGENCE</span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="active"
              className="mono-eyebrow text-mist transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="ghost" className="text-xs">
            Start a build
          </Button>
        </div>

        <button
          data-cursor="active"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${
              open ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${
              open ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-6 pb-8 pt-4 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="mono-eyebrow text-mist"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="mt-2 w-full justify-center">
              Start a build
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
      }
