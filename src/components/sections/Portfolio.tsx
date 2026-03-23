import { brand } from "@/config/brand";

const gradients = [
  "linear-gradient(135deg, #FFB5D3 0%, #FE92BF 50%, #BD1148 100%)",
  "linear-gradient(155deg, #BD1148 0%, #E8527A 60%, #FFB5D3 100%)",
  "linear-gradient(120deg, #FFF0F5 0%, #FFB5D3 40%, #FE92BF 100%)",
  "linear-gradient(165deg, #E8527A 0%, #BD1148 50%, #7A0A2E 100%)",
  "linear-gradient(140deg, #FE92BF 0%, #FFB5D3 50%, #FFF0F5 100%)",
  "linear-gradient(110deg, #BD1148 0%, #FE92BF 60%, #FFB5D3 100%)",
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FFF0F5 0%, #FAF4F8 35%, #FDFBF9 70%, white 100%)",
      }}
    >
      {/* Decorative orb top-right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(254,146,191,0.12) 0%, transparent 65%)",
        }}
      />
      {/* Decorative orb bottom-left */}
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(189,17,72,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header — title + description stacked, button separate */}
        <div className="mb-16 md:mb-24">
          <span className="section-label">Portfolio</span>
          <div className="divider-rose mt-4 mb-7" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="section-title">
              Nos{" "}
              <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>créations</em>
            </h2>
            <div className="flex flex-col gap-5 lg:items-end lg:max-w-xs">
              <p
                className="text-base leading-relaxed lg:text-right"
                style={{ color: "var(--neutral-700)" }}
              >
                Chaque set est unique. Retrouvez nos dernières réalisations.
              </p>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start lg:self-auto"
              >
                Voir sur Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Editorial grid */}
        <div className="portfolio-grid">
          {gradients.map((gradient, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{ background: gradient }}
              aria-label={`Nail Art ${i + 1}`}
            >
              {/* Decorative shape */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-10 transition-opacity duration-500"
                aria-hidden="true"
              >
                <svg width="60" height="74" viewBox="0 0 60 74" fill="none">
                  <rect x="4" y="24" width="52" height="46" rx="26" fill="rgba(255,255,255,0.3)" />
                  <rect x="14" y="4" width="32" height="28" rx="16" fill="rgba(255,255,255,0.24)" />
                </svg>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: "linear-gradient(to top, rgba(13,6,9,0.65), transparent 55%)" }}
              >
                <p
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "var(--font-body)", letterSpacing: "0.02em" }}
                >
                  Nail Art #{i + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA — well separated from the grid */}
        <div className="flex flex-col items-center gap-3 mt-14">
          <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
            Plus de créations disponibles sur notre Instagram
          </p>
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Suivre @rosesnails.fr
          </a>
        </div>
      </div>
    </section>
  );
}
