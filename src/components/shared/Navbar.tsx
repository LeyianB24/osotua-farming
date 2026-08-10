// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, MapPin, User } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1208]/95 backdrop-blur-md border-b border-[#C4882A]/20">
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
                  className={`relative py-1 text-xs font-mono tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C4882A] ${
                    isActive ? "text-[#C4882A] font-semibold" : "text-[#F5EFE4]/75 hover:text-[#C4882A]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4882A]"
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
              className="text-[#F5EFE4]/70 hover:text-[#C4882A] p-2 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="User Dashboard"
            >
              <User size={18} />
              <span>Portal</span>
            </Link>

            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative text-[#F5EFE4]/80 hover:text-[#C4882A] transition-colors p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C4882A] rounded-xs"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#C4882A] text-[10px] font-bold text-[#1C1208] shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/visit"
              className="inline-flex items-center gap-1.5 bg-[#C4882A] text-[#1C1208] text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xs hover:bg-[#d99a30] transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4882A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1208]"
            >
              <MapPin size={14} />
              <span>Visit Us</span>
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

