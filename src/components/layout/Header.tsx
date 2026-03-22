"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { brand } from "@/config/brand";

const navLinks = [
  { href: "/#services",  label: "Prestations" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact",   label: "Contact" },
];

export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-sm border-b"
          : "bg-transparent"
      }`}
      style={scrolled ? { borderColor: "var(--border-rose)" } : {}}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${brand.name} — Accueil`}
            className="flex-shrink-0"
          >
            <span
              className="text-xl md:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--rose-principal)" }}
            >
              {brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium relative group"
                style={{ color: "var(--neutral-700)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                  style={{ background: "var(--rose-principal)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop auth + CTA */}
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
                <button
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Connexion
                </button>
              </SignInButton>
            </Show>
            <Link href="/#booking" className="btn-primary text-sm px-5 py-2.5">
              Prendre RDV
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <div className="w-5 h-[14px] flex flex-col justify-between" aria-hidden="true">
              <span
                className="block h-px w-full transition-all duration-200 origin-center"
                style={{
                  backgroundColor: scrolled ? "var(--neutral-800)" : "white",
                  transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className="block h-px w-full transition-all duration-200"
                style={{
                  backgroundColor: scrolled ? "var(--neutral-800)" : "white",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-full transition-all duration-200 origin-center"
                style={{
                  backgroundColor: scrolled ? "var(--neutral-800)" : "white",
                  transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "white", borderTop: menuOpen ? `1px solid var(--border-rose)` : "none" }}
        aria-hidden={!menuOpen}
      >
        <div className="px-5 pt-5 pb-6 space-y-1">
          <nav aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center py-3 text-base font-medium border-b"
                style={{ color: "var(--neutral-800)", borderColor: "var(--border-subtle)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 space-y-3">
            <Show when="signed-in">
              <Link
                href="/mes-rendez-vous"
                className="flex items-center py-2 text-sm font-medium"
                style={{ color: "var(--rose-principal)" }}
                onClick={() => setMenuOpen(false)}
              >
                Mes rendez-vous
              </Link>
              <div className="flex items-center gap-3 pb-2">
                <UserButton />
                <span className="text-sm" style={{ color: "var(--neutral-700)" }}>Mon compte</span>
              </div>
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="w-full text-left py-2 text-sm font-medium"
                  style={{ color: "var(--rose-principal)" }}
                >
                  Connexion / Inscription
                </button>
              </SignInButton>
            </Show>
            <Link
              href="/#booking"
              className="btn-primary w-full justify-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
