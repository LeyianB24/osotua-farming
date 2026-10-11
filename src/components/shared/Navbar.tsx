"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "./CartContext";
import { LOGO } from "@/lib/images";

const navLinks = [
  { label: "Our Breeds", href: "/breeds" },
  { label: "The Barn", href: "/barn" },
  { label: "Invest", href: "/invest" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Ranch Tours", href: "/visit" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({
  cartCount: initialCartCount = 0,
}: {
  cartCount?: number;
}) {
  const pathname = usePathname();

  const { cartCount: contextCartCount } = useCart();

  const cartCount = contextCartCount ?? initialCartCount;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  /*
   * Detect scrolling.
   * The navbar becomes slightly more compact and gains a refined
   * background and shadow after the visitor begins scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close the mobile menu when navigating.
   */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /*
   * Lock background scrolling while the mobile menu is open,
   * manage focus trap, and restore focus on close.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    // Auto-focus first interactive link inside mobile navigation
    const focusTimer = setTimeout(() => {
      const firstLink = mobileNavRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      firstLink?.focus();
    }, 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const modal = mobileNavRef.current;
        const toggle = toggleButtonRef.current;
        if (!modal) return;

        const focusableElements = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        const allFocusable = toggle ? [toggle, ...focusableElements] : focusableElements;
        if (allFocusable.length === 0) return;

        const firstElement = allFocusable[0];
        const lastElement = allFocusable[allFocusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  /*
   * Prevent the desktop navigation and mobile menu from competing
   * when the viewport crosses the responsive breakpoint.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpoint);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpoint);
    };
  }, []);

  return (
    <>
      <header
        className={[
          "os-navbar",
          scrolled ? "os-navbar-scrolled" : "",
          open ? "os-navbar-menu-open" : "",
        ].join(" ")}
      >
        <div className="os-navbar-inner">
          {/* BRAND */}
          <Link
            href="/"
            onClick={closeMenu}
            className="os-brand"
            aria-label="Osotua Farming home"
          >
            <span className="os-brand-mark">
              <Image
                src={LOGO}
                alt=""
                fill
                priority
                sizes="40px"
                className="os-brand-image"
              />
            </span>

            <span className="os-brand-copy">
              <span className="os-brand-name">Osotua</span>

              <span className="os-brand-divider" aria-hidden="true" />

              <span className="os-brand-subtitle">Farming</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="os-desktop-nav"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "os-nav-link",
                    active ? "os-nav-link-active" : "",
                  ].join(" ")}
                >
                  <span>{link.label}</span>

                  {active && (
                    <motion.span
                      layoutId="os-nav-indicator"
                      className="os-nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="os-navbar-actions">
            <Link
              href="/dashboard"
              className={[
                "os-member-link",
                isActivePath(pathname, "/dashboard")
                  ? "os-member-link-active"
                  : "",
              ].join(" ")}
            >
              Member Portal
            </Link>

            <Link
              href="/cart"
              className="os-cart-link"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <i className="bi bi-bag" aria-hidden="true" />

              {cartCount > 0 && (
                <span className="os-cart-count">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <Link href="/barn" className="os-shop-button">
              <span>Shop the Barn</span>

              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="os-mobile-actions">
            <Link
              href="/cart"
              className="os-mobile-cart"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <i className="bi bi-bag" aria-hidden="true" />

              {cartCount > 0 && (
                <span className="os-cart-count">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setOpen((previous) => !previous)}
              className="os-menu-toggle"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="os-mobile-navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.i
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className={`bi ${open ? "bi-x-lg" : "bi-list"}`}
                  aria-hidden="true"
                />
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="os-mobile-backdrop"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Navigation Panel */}
            <motion.div
              ref={mobileNavRef}
              id="os-mobile-navigation"
              className="os-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site Navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.3,
                ease: easeOut,
              }}
            >
              <div className="os-mobile-menu-content">
                {/* Menu Introduction */}
                <div className="os-mobile-menu-intro">
                  <span className="os-mobile-eyebrow">
                    Discover Osotua
                  </span>

                  <p>
                    Rooted in the land.
                    <br />
                    Built for generations.
                  </p>
                </div>

                {/* Navigation Links */}
                <nav
                  className="os-mobile-nav"
                  aria-label="Mobile navigation"
                >
                  {navLinks.map((link, index) => {
                    const active = isActivePath(pathname, link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.045,
                          duration: 0.25,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "os-mobile-nav-link",
                            active ? "os-mobile-nav-link-active" : "",
                          ].join(" ")}
                        >
                          <span className="os-mobile-nav-number" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="os-mobile-nav-label">
                            {link.label}
                          </span>

                          <i
                            className="bi bi-arrow-up-right"
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Member Portal */}
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="os-mobile-member-link"
                >
                  <i className="bi bi-person-circle" aria-hidden="true" />
                  <span>Member Portal</span>
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>

                {/* Calls to Action */}
                <div className="os-mobile-ctas">
                  <Link
                    href="/barn"
                    onClick={closeMenu}
                    className="os-mobile-primary-cta"
                  >
                    <span>Shop the Barn</span>

                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/visit"
                    onClick={closeMenu}
                    className="os-mobile-secondary-cta"
                  >
                    <i
                      className="bi bi-calendar-event"
                      aria-hidden="true"
                    />

                    <span>Book a Farm Visit</span>
                  </Link>
                </div>

                {/* Contact */}
                <div className="os-mobile-contact">
                  <span className="os-mobile-eyebrow">
                    Speak to our team
                  </span>

                  <a
                    href="https://wa.me/254755758208"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-whatsapp-link"
                    aria-label="WhatsApp Concierge (opens in new tab)"
                  >
                    <i className="bi bi-whatsapp" aria-hidden="true" />

                    <span>WhatsApp Concierge</span>

                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </a>
                </div>

                {/* Social Links */}
                <div className="os-mobile-socials">
                  <a
                    href="https://www.instagram.com/osotua_ranches_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Osotua Farming on Instagram (opens in new tab)"
                  >
                    <i className="bi bi-instagram" aria-hidden="true" />
                  </a>

                  <a
                    href="https://www.tiktok.com/@osotua.ranches"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Osotua Farming on TikTok (opens in new tab)"
                  >
                    <i className="bi bi-tiktok" aria-hidden="true" />
                  </a>
                </div>

                {/* Footer */}
                <div className="os-mobile-footer">
                  <span>OSOTUA FARMING</span>

                  <span>Kajiado County, Kenya</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}