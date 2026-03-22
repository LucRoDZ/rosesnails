import { brand } from "@/config/brand";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">

        {/* Header */}
        <span className="section-label">Contact</span>
        <div className="divider-rose-center" />
        <h2 className="section-title mb-4">Suivez-nous</h2>
        <p className="text-sm md:text-base mb-10" style={{ color: "var(--neutral-700)" }}>
          Retrouvez nos créations, inspirations et coulisses du salon sur Instagram.
        </p>

        {/* Instagram card */}
        <div
          className="rounded-2xl p-8 border flex flex-col items-center gap-5"
          style={{
            background: "linear-gradient(135deg, var(--rose-50) 0%, white 50%, var(--rose-100) 100%)",
            borderColor: "var(--border-rose)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #E1306C 0%, #833AB4 50%, #F77737 100%)",
            }}
            aria-hidden="true"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>

          <div>
            <p className="font-bold text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--neutral-800)" }}>
              @rosesnails.fr
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--neutral-700)" }}>
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
    </section>
  );
}
