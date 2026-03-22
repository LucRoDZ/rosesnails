import Link from "next/link";
import { services, serviceCategories, supplements, type ServiceCategory } from "@/config/services";

const categoryOrder: ServiceCategory[] = ["gel-extension", "ongles-naturels", "press-on"];

function ServiceRow({ service }: { service: typeof services[0] }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-b-0 gap-4"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="min-w-0">
        <span
          className="text-sm md:text-base font-medium"
          style={{ color: "var(--neutral-800)" }}
        >
          {service.name}
          {service.popular && (
            <span
              className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold align-middle"
              style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
            >
              Populaire
            </span>
          )}
        </span>
        {service.description && (
          <p className="text-xs mt-0.5" style={{ color: "var(--neutral-700)", opacity: 0.7 }}>
            {service.description}
          </p>
        )}
      </div>
      <span
        className="flex-shrink-0 text-base md:text-lg font-bold tabular-nums"
        style={{ color: "var(--rose-principal)" }}
      >
        {service.price}€
      </span>
    </div>
  );
}

export function Services() {
  const grouped = categoryOrder.reduce<Record<ServiceCategory, typeof services>>(
    (acc, cat) => {
      acc[cat] = services.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<ServiceCategory, typeof services>
  );

  return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Tarifs</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Nos prestations</h2>
          <p className="mt-4 text-sm md:text-base" style={{ color: "var(--neutral-700)" }}>
            Des poses soignées aux nail art les plus audacieux — chaque set est unique.
          </p>
        </div>

        {/* Price list */}
        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <div
                key={cat}
                className="rounded-2xl bg-white border overflow-hidden"
                style={{ borderColor: "var(--border-rose)", boxShadow: "var(--shadow-card)" }}
              >
                {/* Category header */}
                <div
                  className="px-6 py-4 border-b"
                  style={{
                    background: "linear-gradient(135deg, var(--rose-50), white)",
                    borderColor: "var(--border-rose)",
                  }}
                >
                  <h3
                    className="font-bold text-sm uppercase tracking-[0.2em]"
                    style={{ color: "var(--rose-principal)" }}
                  >
                    {serviceCategories[cat]}
                  </h3>
                </div>

                {/* Service rows */}
                <div className="px-6">
                  {list.map((service) => (
                    <ServiceRow key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Supplements */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(251,191,36,0.35)", boxShadow: "var(--shadow-card)" }}
          >
            <div
              className="px-6 py-4 border-b flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #fffbeb, white)",
                borderColor: "rgba(251,191,36,0.25)",
              }}
            >
              <span aria-hidden="true">⚠️</span>
              <h3
                className="font-bold text-sm uppercase tracking-[0.2em]"
                style={{ color: "#92400e" }}
              >
                Suppléments
              </h3>
            </div>
            <div className="px-6 bg-white">
              {supplements.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start justify-between py-3 border-b last:border-b-0 gap-4"
                  style={{ borderColor: "rgba(251,191,36,0.2)" }}
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium" style={{ color: "var(--neutral-800)" }}>
                      {s.label}
                    </span>
                    {s.note && (
                      <p className="text-xs mt-0.5" style={{ color: "#92400e", opacity: 0.8 }}>
                        {s.note}
                      </p>
                    )}
                  </div>
                  <span className="flex-shrink-0 text-base font-bold tabular-nums" style={{ color: "#92400e" }}>
                    {s.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/#booking" className="btn-primary">
            Réserver maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
