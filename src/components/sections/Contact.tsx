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

        <div className="flex justify-center max-w-2xl mx-auto">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
