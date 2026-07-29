import Image from "next/image";
import { brand, contact, socials } from "@/lib/siteConfig";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-12 pt-20 sm:px-10 lg:px-16">
      <div className="glass rounded-[2rem] p-8 sm:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-mist-100">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="44px"
                className="object-contain p-1.5"
              />
            </span>
            <span className="font-display text-xl">{brand.name}</span>
          </div>
          <p className="max-w-md text-sm text-mist-500">
            Building intelligent digital experiences for the next generation
            of ambitious companies.
          </p>

          <div className="grid grid-cols-1 gap-2 text-sm text-mist-300 sm:grid-cols-3">
            <span>
              Phone: <span className="text-mist-100">{contact.phone}</span>
            </span>
            <span>
              WhatsApp:{" "}
              <span className="text-mist-100">{contact.whatsapp}</span>
            </span>
            <span>
              Email: <span className="text-mist-100">{contact.email}</span>
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:justify-items-end">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-mist-100">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-mist-500 transition-colors hover:text-mist-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-mist-100">
              Follow
            </h4>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-mist-500 transition-colors hover:text-mist-100"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {brand.name}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-mist-100">
              Privacy
            </a>
            <a href="#" className="hover:text-mist-100">
              Terms
            </a>
            <a href="#" className="hover:text-mist-100">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
