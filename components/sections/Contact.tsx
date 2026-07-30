'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import { NeoXMark } from '@/components/ui/NeoXMark';

const FOOTER_LINKS = [
  { label: 'Systems', href: '#systems' },
  { label: 'Approach', href: '#approach' },
  { label: 'Deployments', href: '#deployments' },
];

export function Contact() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-contact-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sent');
  }

  return (
    <section id="contact" ref={rootRef} className="relative bg-surface pt-28 md:pt-36">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-20 md:px-10 md:pb-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <p data-contact-fade className="mono-eyebrow mb-6 flex items-center gap-3 text-signal-glow">
              <span className="node-dot" />
              CONTACT
            </p>
            <h2
              data-contact-fade
              className="mb-8 max-w-xl font-display text-clamp-h1 font-semibold leading-[1.02] tracking-tightest2 text-paper"
            >
              Send us the coordinates. We&apos;ll plot from there.
            </h2>
            <p data-contact-fade className="max-w-md font-body text-base text-mist md:text-lg">
              Tell us what the system needs to do and what it&apos;s running
              against today. We reply within one business day with next
              steps, not a sales deck.
            </p>
          </div>

          <div data-contact-fade>
            {status === 'sent' ? (
              <div className="border border-line2 px-8 py-10">
                <span className="mono-eyebrow mb-3 block text-signal-glow">
                  RECEIVED
                </span>
                <p className="font-display text-xl font-semibold text-paper">
                  Logged. We&apos;ll follow up within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <span className="mono-eyebrow text-steel">Name</span>
                  <input
                    required
                    type="text"
                    name="name"
                    className="border-b border-line2 bg-transparent py-3 font-body text-paper outline-none transition-colors focus:border-signal"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="mono-eyebrow text-steel">Work email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="border-b border-line2 bg-transparent py-3 font-body text-paper outline-none transition-colors focus:border-signal"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="mono-eyebrow text-steel">What are you building</span>
                  <textarea
                    required
                    name="message"
                    rows={3}
                    className="resize-none border-b border-line2 bg-transparent py-3 font-body text-paper outline-none transition-colors focus:border-signal"
                  />
                </label>
                <Button type="submit" variant="primary" className="mt-2 justify-center">
                  Send coordinates
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-line pt-10 md:mt-32 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <NeoXMark className="h-5 w-auto text-paper" />
            <span className="mono-eyebrow text-steel">
              &copy; {new Date().getFullYear()} NEO X
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {FOOTER_LINKS.map((link) => (
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
        </div>
      </div>
    </section>
  );
      }
