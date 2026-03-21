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
