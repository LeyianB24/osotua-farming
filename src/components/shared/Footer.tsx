// src/components/shared/Footer.tsx
"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Logo from "./Logo";

// Inline SVG components for brand icons
function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

const footerLinks = {
  Livestock: [
    { label: "Beef Cattle", href: "/breeds?type=beef" },
    { label: "Dairy Cattle", href: "/breeds?type=dairy" },
    { label: "Goats", href: "/breeds?type=goats" },
    { label: "Sheep", href: "/breeds?type=sheep" },
    { label: "Import Orders", href: "/breeds#import" },
  ],
  "The Barn": [
    { label: "Beef Cuts", href: "/barn?category=beef" },
    { label: "Dairy Products", href: "/barn?category=dairy" },
    { label: "Vegetables", href: "/barn?category=vegetables" },
    { label: "Fruits", href: "/barn?category=fruits" },
    { label: "Ranch Box", href: "/barn?category=box" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Invest", href: "/invest" },
    { label: "Partner Farmers", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/254700000000" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-[#C4882A]/20 bg-[#1C1208] text-[#F5EFE4]">
      {/* Top Banner / Newsletter Bar */}
      <div className="border-b border-[#F5EFE4]/10 bg-[#251A0E]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#F5EFE4]">
              Join the Osotua Ranch Journal
            </h3>
            <p className="mt-1 text-xs text-[#F5EFE4]/60">
              Get first access to seasonal harvest drops, breeding stock availability, and ranch updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#C4882A]">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing to our ranch updates.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-xs border border-[#F5EFE4]/15 bg-[#1C1208] px-4 py-2.5 text-xs text-[#F5EFE4] placeholder:text-[#F5EFE4]/30 focus:border-[#C4882A] focus:outline-none focus:ring-1 focus:ring-[#C4882A]"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xs bg-[#C4882A] px-5 py-2.5 text-xs font-semibold text-[#1C1208] transition-colors hover:bg-[#d6993a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4882A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1208]"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-[#F5EFE4]/10 pb-12 md:grid-cols-5">
          {/* Brand Info (2 columns wide) */}
          <div className="md:col-span-2">
            <Logo size="md" />

            <p className="mt-4 max-w-sm font-serif text-sm italic leading-relaxed text-[#F5EFE4]/60">
              &ldquo;From Our Land, To Your Table.&rdquo;
            </p>

            {/* Location & Contact Details */}
            <ul className="mt-6 flex flex-col gap-2.5 text-xs font-mono text-[#F5EFE4]/50">
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="shrink-0 text-[#C4882A]" />
                <span>Kajiado County, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-[#C4882A]" />
                <a
                  href="mailto:info@osotuafarming.co.ke"
                  className="transition-colors hover:text-[#C4882A]"
                >
                  info@osotuafarming.co.ke
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-[#C4882A]" />
                <a
                  href="tel:+254700000000"
                  className="transition-colors hover:text-[#C4882A]"
                >
                  +254 700 000 000
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5EFE4]/15 text-[#F5EFE4]/60 transition-colors hover:border-[#C4882A] hover:text-[#C4882A]"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Link Columns (3 columns) */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-[#C4882A]">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F5EFE4]/60 transition-colors hover:text-[#C4882A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C4882A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sub-Footer Copyright & Credits */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 font-mono text-[11px] text-[#F5EFE4]/40 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Osotua Farming. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="transition-colors hover:text-[#C4882A]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-[#C4882A]">
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            Built by{" "}
            <a
              href="https://bezaleltechnologies.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#C4882A] transition-colors hover:underline"
            >
              Bezalel Technologies LTD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
