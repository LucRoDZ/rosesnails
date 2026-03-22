const reviews = [
  {
    id: 1,
    name: "Sophie M.",
    rating: 5,
    date: "Mars 2025",
    text: "Absolument ravie ! La pose gel est impeccable, ça dure des semaines sans aucun souci. L'ambiance du salon est tellement agréable.",
    service: "Pose Gel",
    initial: "S",
  },
  {
    id: 2,
    name: "Camille L.",
    rating: 5,
    date: "Février 2025",
    text: "Nail art personnalisé au top. La prothésiste a parfaitement compris ce que je voulais et le résultat est magnifique !",
    service: "Nail Art Personnalisé",
    initial: "C",
  },
  {
    id: 3,
    name: "Emma R.",
    rating: 5,
    date: "Janvier 2025",
    text: "Première fois ici et je suis fan. Professionnalisme, douceur et précision. Je reviendrai sans hésiter.",
    service: "Pose Acrylique",
    initial: "E",
  },
  {
    id: 4,
    name: "Julie T.",
    rating: 5,
    date: "Décembre 2024",
    text: "La meilleure prothésiste que j'ai eu ! Mes ongles sont parfaits et elle a pris soin de les préserver.",
    service: "Remplissage",
    initial: "J",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
          style={{ color: i < count ? "var(--rose-principal)" : "var(--neutral-200)" }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avis" className="py-16 md:py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Avis clients</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Ce qu&apos;elles disent</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <blockquote key={review.id} className="card flex flex-col gap-4">
              {/* Quote mark */}
              <svg
                width="28" height="20"
                viewBox="0 0 28 20" fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 20V12.4C0 5.267 3.8 1.4 11.4 0l1.4 2C8.8 3 6.8 5.4 6.4 9.2H12V20H0zm16 0V12.4C16 5.267 19.8 1.4 27.4 0l1.4 2C24.8 3 22.8 5.4 22.4 9.2H28V20H16z"
                  fill="var(--rose-clair)"
                />
              </svg>

              <p
                className="text-sm md:text-base leading-relaxed italic flex-1"
                style={{ color: "var(--neutral-700)" }}
              >
                {review.text}
              </p>

              <Stars count={review.rating} />

              <footer className="flex items-center gap-3 pt-1 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--rose-principal), var(--rose-accent))" }}
                  aria-hidden="true"
                >
                  {review.initial}
                </div>
                <div className="min-w-0">
                  <cite
                    className="font-semibold text-sm not-italic block"
                    style={{ color: "var(--neutral-800)" }}
                  >
                    {review.name}
                  </cite>
                  <p className="text-xs" style={{ color: "var(--neutral-700)", opacity: 0.65 }}>
                    {review.service} · <time>{review.date}</time>
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
