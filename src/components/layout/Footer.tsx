import Link from "next/link";
import { brand } from "@/config/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "var(--neutral-800)", color: "var(--neutral-100)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand — wider column */}
          <div className="md:col-span-5">
            <p
              className="font-semibold mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                color: "var(--rose-accent)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {brand.name}
            </p>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(240,232,226,0.45)" }}>
              {brand.tagline}
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "rgba(240,232,226,0.6)" }}
              aria-label="Instagram RosesNails"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @rosesnails.fr
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 md:col-start-7">
            <h3
              className="text-[10px] font-medium uppercase tracking-[0.32em] mb-7"
              style={{ color: "rgba(254,146,191,0.65)" }}
            >
              Navigation
            </h3>
            <nav className="space-y-4" aria-label="Navigation footer">
              {[
                { href: "/#services",  label: "Nos prestations" },
                { href: "/#portfolio", label: "Portfolio" },
                { href: "/#booking",   label: "Réservation" },
                { href: "/#faq",       label: "FAQ" },
                { href: "/#contact",   label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-opacity hover:opacity-75"
                  style={{ color: "rgba(240,232,226,0.5)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3
              className="text-[10px] font-medium uppercase tracking-[0.32em] mb-7"
              style={{ color: "rgba(254,146,191,0.65)" }}
            >
              Légal
            </h3>
            <nav className="space-y-4" aria-label="Navigation légale">
              <Link
                href="/mentions-legales"
                className="block text-sm transition-opacity hover:opacity-75"
                style={{ color: "rgba(240,232,226,0.5)" }}
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="block text-sm transition-opacity hover:opacity-75"
                style={{ color: "rgba(240,232,226,0.5)" }}
              >
                Confidentialité
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(240,232,226,0.25)" }}
        >
          <p>© {currentYear} {brand.name}. Tous droits réservés.</p>
          <p>Fait avec soin pour vos ongles.</p>
        </div>
      </div>
    </footer>
  );
}
