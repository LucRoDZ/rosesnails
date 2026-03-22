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
    <section id="portfolio" className="py-16 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Portfolio</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Nos créations</h2>
          <p className="mt-4 max-w-md mx-auto text-sm md:text-base" style={{ color: "var(--neutral-700)" }}>
            Chaque set est unique. Retrouvez nos dernières réalisations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gradients.map((gradient, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden relative group"
              style={{ background: gradient }}
              aria-label={`Nail Art ${i + 1}`}
            >
              {/* Abstract nail shape */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              >
                <svg width="52" height="64" viewBox="0 0 52 64" fill="none">
                  <rect
                    x="4" y="20" width="44" height="40"
                    rx="22"
                    fill="rgba(255,255,255,0.22)"
                  />
                  <rect
                    x="10" y="4" width="32" height="24"
                    rx="16"
                    fill="rgba(255,255,255,0.18)"
                  />
                </svg>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(26,15,22,0.55), transparent)" }}
              >
                <p className="text-white text-xs font-medium tracking-wide">Nail Art #{i + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram link */}
        <p className="text-center mt-8 text-sm" style={{ color: "var(--neutral-700)" }}>
          Plus de créations sur{" "}
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
            style={{ color: "var(--rose-principal)" }}
          >
            Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
