export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`card animate-pulse ${className}`}
      aria-hidden="true"
    >
      <div className="h-4 rounded mb-3 w-2/3" style={{ backgroundColor: "var(--neutral-100)" }} />
      <div className="h-3 rounded mb-2 w-full" style={{ backgroundColor: "var(--neutral-100)" }} />
      <div className="h-3 rounded w-1/2" style={{ backgroundColor: "var(--neutral-100)" }} />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-label="Chargement en cours…" role="status">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
      <span className="sr-only">Chargement en cours…</span>
    </div>
  );
}

export function AppointmentSkeletonCard() {
  return (
    <div
      className="appointment-card appointment-card--upcoming animate-pulse"
      aria-hidden="true"
    >
      {/* Icon col placeholder */}
      <div
        className="hidden sm:flex items-center justify-center flex-shrink-0"
        style={{ padding: "1.25rem", paddingRight: 0, width: "3.5rem" }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: "var(--neutral-100)" }}
        />
      </div>
      {/* Content col */}
      <div className="flex-1 p-5 space-y-2.5">
        <div className="h-5 w-44 rounded" style={{ backgroundColor: "var(--neutral-100)" }} />
        <div className="h-3 w-28 rounded" style={{ backgroundColor: "var(--neutral-100)" }} />
        <div className="h-3 w-20 rounded" style={{ backgroundColor: "var(--neutral-100)" }} />
      </div>
      {/* Action col placeholder */}
      <div
        className="hidden sm:flex items-center flex-shrink-0"
        style={{ padding: "1.25rem", borderLeft: "1px solid var(--border-subtle)" }}
      >
        <div
          className="h-9 w-20 rounded-full"
          style={{ backgroundColor: "var(--neutral-100)" }}
        />
      </div>
    </div>
  );
}

export function AppointmentSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-label="Chargement en cours…" role="status">
      {Array.from({ length: count }).map((_, i) => (
        <AppointmentSkeletonCard key={i} />
      ))}
      <span className="sr-only">Chargement en cours…</span>
    </div>
  );
}
