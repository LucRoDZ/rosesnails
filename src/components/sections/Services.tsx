import Link from "next/link";
import { services, serviceCategories, type ServiceCategory } from "@/config/services";

const categoryOrder: ServiceCategory[] = ["pose", "entretien", "nail-art", "soin", "retrait"];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <article className="card group flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-semibold text-base leading-snug"
          style={{ color: "var(--neutral-800)" }}
        >
          {service.name}
          {service.popular && (
            <span
              className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-semibold align-middle"
              style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
            >
              Populaire
            </span>
          )}
        </h3>
        <span
          className="flex-shrink-0 text-lg font-bold"
          style={{ color: "var(--rose-principal)" }}
        >
          {service.price}€
        </span>
      </div>

      {service.description && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--neutral-700)" }}>
          {service.description}
        </p>
      )}

      <p className="text-xs mt-auto pt-1" style={{ color: "var(--neutral-700)", opacity: 0.55 }}>
        {service.duration} min
      </p>
    </article>
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Nos prestations</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Ce que nous faisons</h2>
          <p className="mt-4 max-w-lg mx-auto text-sm md:text-base" style={{ color: "var(--neutral-700)" }}>
            Des poses soignées aux nail art les plus audacieux — chaque prestation est réalisée avec passion.
          </p>
        </div>

        {/* Grouped by category */}
        <div className="space-y-14">
          {categoryOrder.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: "var(--rose-principal)" }}
                  >
                    {serviceCategories[cat]}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-rose)" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/#booking" className="btn-primary">
            Réserver maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
