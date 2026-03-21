import { brand } from "@/config/brand";

export function Contact() {
  return (
    <section id="contact" className="py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Contact
          </p>
          <h2 className="section-title">Nous trouver</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card space-y-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>Adresse</h3>
              <address className="not-italic" style={{ color: "var(--neutral-700)" }}>
                <p>{brand.address}</p>
              </address>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>Horaires</h3>
              <div className="space-y-1 text-sm" style={{ color: "var(--neutral-700)" }}>
                <p>{brand.hours.weekdays}</p>
                <p>{brand.hours.sunday}</p>
                <p style={{ color: "var(--neutral-700)", opacity: 0.6 }}>{brand.hours.closed}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3" style={{ color: "var(--neutral-800)" }}>Contact direct</h3>
              <div className="space-y-2">
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: "var(--rose-principal)" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: "var(--rose-principal)" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {brand.email}
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4" style={{ color: "var(--neutral-800)" }}>
              Politique d&apos;annulation
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--neutral-700)" }}>
              {brand.cancellationPolicy}
            </p>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--neutral-100)" }}>
              <p className="text-sm mb-3" style={{ color: "var(--neutral-700)" }}>Retrouvez-nous sur les réseaux</p>
              <div className="flex gap-3">
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm px-4 py-2"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm px-4 py-2"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
