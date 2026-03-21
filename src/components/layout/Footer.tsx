import Link from "next/link";
import { brand } from "@/config/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8" style={{ backgroundColor: "var(--neutral-800)", color: "var(--neutral-100)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--rose-accent)" }}
            >
              {brand.name}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(247,243,245,0.7)" }}>
              {brand.tagline}
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: "rgba(247,243,245,0.6)" }}
                aria-label="Instagram RosesNails"
              >
                Instagram
              </a>
              <a
                href={brand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: "rgba(247,243,245,0.6)" }}
                aria-label="Facebook RosesNails"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: "var(--rose-accent)" }}
            >
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm" style={{ color: "rgba(247,243,245,0.7)" }}>
              <p>{brand.address}</p>
              <a
                href={`tel:${brand.phone}`}
                className="block transition-colors"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="block transition-colors"
              >
                {brand.email}
              </a>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: "var(--rose-accent)" }}
            >
              Horaires
            </h3>
            <div className="space-y-2 text-sm" style={{ color: "rgba(247,243,245,0.7)" }}>
              <p>{brand.hours.weekdays}</p>
              <p>{brand.hours.sunday}</p>
              <p style={{ color: "rgba(247,243,245,0.4)" }}>{brand.hours.closed}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(247,243,245,0.4)" }}
        >
          <p>© {currentYear} {brand.name}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:opacity-70">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="transition-colors hover:opacity-70">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
