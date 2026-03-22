import { brand } from "@/config/brand";

export function Portfolio() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Portfolio
          </p>
          <h2 className="section-title">Nos créations</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--neutral-700)" }}>
            Chaque set est unique. Découvrez quelques-unes de nos réalisations récentes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden relative"
              style={{
                background: `linear-gradient(${135 + i * 20}deg, var(--rose-50) 0%, var(--rose-clair) 100%)`,
              }}
              aria-label={`Création nail art ${i}`}
            >
              {/* TODO: Replace with actual portfolio images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-8 rounded-xl opacity-60"
                  style={{ background: "var(--rose-accent)" }}
                  aria-hidden="true"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }}
              >
                <p className="text-white text-xs font-medium">Nail Art #{i}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "var(--neutral-700)" }}>
          Retrouvez toutes nos créations sur{" "}
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2"
            style={{ color: "var(--rose-principal)" }}
          >
            Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
