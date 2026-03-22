import { brand } from "@/config/brand";

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card flex gap-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "var(--rose-50)" }}
        aria-hidden="true"
      >
        <span style={{ color: "var(--rose-principal)" }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--neutral-800)" }}>
          {title}
        </h3>
        <div className="text-sm leading-relaxed space-y-0.5" style={{ color: "var(--neutral-700)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Contact</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Nous trouver</h2>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <InfoCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Adresse"
          >
            <address className="not-italic">{brand.address}</address>
          </InfoCard>

          <InfoCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            title="Contact"
          >
            <a href={`tel:${brand.phone}`} className="block hover:opacity-70 transition-opacity">
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="block hover:opacity-70 transition-opacity truncate">
              {brand.email}
            </a>
          </InfoCard>

          <InfoCard
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
            }
            title="Horaires"
          >
            <p>{brand.hours.weekdays}</p>
            <p>{brand.hours.sunday}</p>
            <p style={{ opacity: 0.5 }}>{brand.hours.closed}</p>
          </InfoCard>
        </div>

        {/* Bottom row: policy + social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-6 border"
            style={{ borderColor: "var(--border-rose)", background: "var(--neutral-50)" }}
          >
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--neutral-800)" }}>
              Politique d&apos;annulation
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--neutral-700)" }}>
              {brand.cancellationPolicy}
            </p>
          </div>

          <div
            className="rounded-2xl p-6 border flex flex-col justify-between gap-4"
            style={{ borderColor: "var(--border-rose)", background: "var(--neutral-50)" }}
          >
            <div>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--neutral-800)" }}>
                Suivez-nous
              </h3>
              <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                Retrouvez nos créations du quotidien sur Instagram.
              </p>
            </div>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline self-start text-sm px-5 py-2.5"
              aria-label="Voir notre Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
