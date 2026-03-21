"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { brand } from "@/config/brand";

const navLinks = [
  { href: "/#services", label: "Prestations" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#avis", label: "Avis" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change — setState in effect is intentional here
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl md:text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--rose-principal)" }}
            aria-label={`${brand.name} — Accueil`}
          >
            {brand.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--neutral-700)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-in">
              <Link
                href="/mes-rendez-vous"
                className="text-sm font-medium"
                style={{ color: "var(--rose-principal)" }}
              >
                Mes RDV
              </Link>
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-medium" style={{ color: "var(--rose-principal)" }}>
                  Connexion
                </button>
              </SignInButton>
            </Show>
            <Link href="/#booking" className="btn-primary text-sm">
              Prendre RDV
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="sr-only">{menuOpen ? "Fermer" : "Menu"}</span>
            <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
              <span
                className={`block h-0.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                style={{ backgroundColor: "var(--neutral-800)" }}
              />
              <span
                className={`block h-0.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "var(--neutral-800)" }}
              />
              <span
                className={`block h-0.5 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                style={{ backgroundColor: "var(--neutral-800)" }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t px-4 py-6 space-y-4"
          style={{ borderColor: "var(--rose-100)" }}
        >
          <nav className="space-y-4" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium"
                style={{ color: "var(--neutral-800)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t space-y-3" style={{ borderColor: "var(--rose-100)" }}>
            <Show when="signed-in">
              <Link
                href="/mes-rendez-vous"
                className="block text-base font-medium"
                style={{ color: "var(--rose-principal)" }}
                onClick={() => setMenuOpen(false)}
              >
                Mes rendez-vous
              </Link>
              <div className="flex items-center gap-3">
                <UserButton />
                <span className="text-sm" style={{ color: "var(--neutral-700)" }}>Mon compte</span>
              </div>
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="block w-full text-left text-base font-medium"
                  style={{ color: "var(--rose-principal)" }}
                >
                  Connexion / Inscription
                </button>
              </SignInButton>
            </Show>
            <Link
              href="/#booking"
              className="btn-primary w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
