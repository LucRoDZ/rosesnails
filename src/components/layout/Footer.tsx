import Link from "next/link";
import { brand } from "@/config/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="pt-14 pb-8"
      style={{ backgroundColor: "var(--neutral-800)", color: "var(--neutral-100)" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--rose-accent)" }}
            >
              {brand.name}
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,232,226,0.6)" }}>
              {brand.tagline}
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "rgba(240,232,226,0.75)" }}
              aria-label="Instagram RosesNails"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: "var(--rose-accent)" }}
            >
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm" style={{ color: "rgba(240,232,226,0.65)" }}>
              <p>{brand.address}</p>
              <a
                href={`tel:${brand.phone}`}
                className="block transition-opacity hover:opacity-80"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="block transition-opacity hover:opacity-80"
              >
                {brand.email}
              </a>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: "var(--rose-accent)" }}
            >
              Horaires
            </h3>
            <div className="space-y-2 text-sm" style={{ color: "rgba(240,232,226,0.65)" }}>
              <p>{brand.hours.weekdays}</p>
              <p>{brand.hours.sunday}</p>
              <p style={{ color: "rgba(240,232,226,0.35)" }}>{brand.hours.closed}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(240,232,226,0.35)" }}
        >
          <p>© {currentYear} {brand.name}. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="transition-opacity hover:opacity-70">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="transition-opacity hover:opacity-70">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
