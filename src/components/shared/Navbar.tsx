// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, MapPin, User, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "./CartContext";

const navLinks = [
  { label: "Our Breeds", href: "/breeds" },
  { label: "The Barn", href: "/barn" },
  { label: "Invest", href: "/invest" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar({ cartCount: initialCartCount }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount: ctxCartCount } = useCart();
  const cartCount = ctxCartCount ?? initialCartCount ?? 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-2xl">
      {/* Top Utility Contact Bar (DonalFarm Template Style) */}
      <div className="hidden lg:block bg-[#120B05] border-b border-[#C4882A]/20 text-[#F5EFE4]/80 text-[11px] font-mono py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#C4882A]/20 text-[#C4882A] flex items-center justify-center">
                <MapPin size={11} />
              </span>
              <span>Ranch Address: Kajiado County, Kenya</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#C4882A]/20 text-[#C4882A] flex items-center justify-center">
                <Mail size={11} />
              </span>
              <a href="mailto:info@osotuafarming.co.ke" className="hover:text-[#C4882A] transition-colors">
                info@osotuafarming.co.ke
              </a>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#C4882A]/20 text-[#C4882A] flex items-center justify-center">
                <Phone size={11} />
              </span>
              <a href="tel:+254700000000" className="hover:text-[#C4882A] transition-colors">
                +254 700 000 000
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#C4882A]">
            <Clock size={12} />
            <span>Farm Hours: Mon - Sat: 8:00am - 5:00pm</span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="bg-[#1C1208]/90 backdrop-blur-xl border-b border-[#C4882A]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Brand Logo */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C4882A] ${
                      isActive ? "text-[#C4882A] font-bold" : "text-[#F5EFE4]/80 hover:text-[#C4882A]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C4882A] via-[#D99A30] to-[#C4882A] shadow-[0_0_8px_rgba(196,136,42,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-[#F5EFE4]/80 hover:text-[#C4882A] px-3 py-2 transition-all flex items-center gap-1.5 text-xs font-mono rounded-xs border border-transparent hover:border-[#C4882A]/30 hover:bg-[#C4882A]/05"
                title="Customer Dashboard"
              >
                <User size={16} />
                <span>Portal</span>
              </Link>

              <Link
                href="/cart"
                aria-label={`Shopping cart with ${cartCount} items`}
                className="relative text-[#F5EFE4]/90 hover:text-[#C4882A] transition-all p-2.5 bg-[#F5EFE4]/05 hover:bg-[#C4882A]/10 border border-[#F5EFE4]/10 hover:border-[#C4882A]/40 rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C4882A]"
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#C4882A] to-[#D99A30] text-[10px] font-bold text-[#1C1208] shadow-lg ring-2 ring-[#1C1208]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Template Pill CTA Button with Circle Arrow */}
              <Link
                href="/visit"
                className="inline-flex items-center gap-2.5 bg-[#C4882A] text-[#1C1208] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#d99a30] transition-all duration-300 shadow-[0_4px_16px_rgba(196,136,42,0.35)] hover:shadow-[0_6px_22px_rgba(196,136,42,0.5)] transform hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>Visit Ranch</span>
                <span className="w-5 h-5 rounded-full bg-[#1C1208]/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative text-[#F5EFE4]/80 hover:text-[#C4882A] p-2"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C4882A] text-[10px] font-bold text-[#1C1208]">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close main menu" : "Open main menu"}
              className="p-2 text-[#F5EFE4] hover:text-[#C4882A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4882A]"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#1C1208] border-t border-[#C4882A]/20"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-sm font-mono tracking-widest uppercase py-2 transition-colors border-b border-[#F5EFE4]/5 ${
                        isActive ? "text-[#C4882A] font-semibold" : "text-[#F5EFE4]/80 hover:text-[#C4882A]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-sm font-mono tracking-widest uppercase py-2 text-[#F5EFE4]/80 hover:text-[#C4882A] border-b border-[#F5EFE4]/5 flex items-center justify-between"
                >
                  <span>Customer Dashboard</span>
                  <User size={16} />
                </Link>
              </nav>

              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-[#C4882A] text-[#1C1208] text-xs font-semibold uppercase tracking-wider py-3 rounded-xs hover:bg-[#d99a30] transition-colors"
              >
                <MapPin size={15} />
                <span>Plan Your Ranch Visit</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

