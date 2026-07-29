"use client";

import { MessageCircle, Phone, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { contact } from "@/lib/siteConfig";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:px-16"
    >
      <Reveal
        as="div"
        className="glass-strong shadow-glow relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />
        <div className="relative">
          <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-bloom-400">
            Get in touch
          </span>
          <h2 className="mx-auto max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            Let&rsquo;s build something
            <span className="text-gradient italic"> extraordinary.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-mist-300">
            Tell us about your project. We usually reply within a few hours
            on WhatsApp.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="glass inline-flex h-[52px] w-[52px] items-center justify-center rounded-full text-mist-100 transition-colors hover:bg-white/10"
              aria-label="Email us"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal
        y={20}
        stagger={0.1}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="glass flex items-center gap-4 rounded-2xl px-6 py-5">
          <span className="glass flex h-11 w-11 items-center justify-center rounded-full text-emerald-400">
            <MessageCircle size={18} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-mist-500">
              WhatsApp
            </p>
            <p className="font-semibold text-mist-100">{contact.whatsapp}</p>
          </div>
        </div>
        <div className="glass flex items-center gap-4 rounded-2xl px-6 py-5">
          <span className="glass flex h-11 w-11 items-center justify-center rounded-full text-bloom-400">
            <Phone size={18} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-mist-500">
              Phone
            </p>
            <p className="font-semibold text-mist-100">{contact.phone}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
