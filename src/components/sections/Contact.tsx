import { brand } from "@/config/brand";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "linear-gradient(155deg, #0a0608 0%, #160c13 40%, #260d1e 100%)" }}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse, rgba(189,17,72,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Decorative background text */}
      <div
        className="absolute -bottom-16 -right-12 select-none pointer-events-none hidden xl:block"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "20rem",
          fontWeight: 700,
          lineHeight: 1,
          color: "rgba(254,146,191,0.03)",
          letterSpacing: "-0.04em",
        }}
      >
        ♥
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <span className="section-label-dark">Contact</span>
          <div
            className="mx-auto mt-5 mb-0"
            style={{
              width: "3.5rem",
              height: "1.5px",
              background: "linear-gradient(90deg, var(--rose-principal), var(--rose-accent))",
            }}
          />

          {/* Headline */}
          <h2
            className="mt-7 mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              color: "white",
            }}
          >
            Rejoignez notre{" "}
            <em style={{ fontStyle: "italic", color: "var(--rose-accent)" }}>communauté</em>
          </h2>

          <p
            className="mb-14 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.42)", maxWidth: "26rem", margin: "0 auto 3.5rem" }}
          >
            Retrouvez nos créations, inspirations et coulisses du salon sur Instagram.
          </p>

          {/* Instagram card */}
          <div
            className="rounded-2xl p-9 md:p-12 flex flex-col items-center gap-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Instagram icon */}
            <div
              className="w-18 h-18 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                width: "4.5rem",
                height: "4.5rem",
                background: "linear-gradient(135deg, #E1306C 0%, #833AB4 50%, #F77737 100%)",
                boxShadow: "0 10px 40px rgba(225,48,108,0.3)",
              }}
              aria-hidden="true"
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>

            <div>
              <p
                className="font-semibold mb-1.5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "white",
                  lineHeight: 1.1,
                }}
              >
                @rosesnails.fr
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
                Nail art · Inspirations · Coulisses
              </p>
            </div>

            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label="Suivre RosesNails sur Instagram"
            >
              Nous suivre sur Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
