const reviews = [
  {
    id: 1,
    name: "Sophie M.",
    rating: 5,
    date: "Mars 2025",
    text: "Absolument ravie ! La pose gel est impeccable, ça dure des semaines sans aucun souci. L'ambiance du salon est tellement agréable.",
    service: "Pose Gel",
  },
  {
    id: 2,
    name: "Camille L.",
    rating: 5,
    date: "Février 2025",
    text: "Nail art personnalisé au top. La prothésiste a parfaitement compris ce que je voulais et le résultat est magnifique !",
    service: "Nail Art Personnalisé",
  },
  {
    id: 3,
    name: "Emma R.",
    rating: 5,
    date: "Janvier 2025",
    text: "Première fois ici et je suis fan. Professionnalisme, douceur et précision. Je reviendrai sans hésiter.",
    service: "Pose Acrylique",
  },
  {
    id: 4,
    name: "Julie T.",
    rating: 5,
    date: "Décembre 2024",
    text: "La meilleure prothésiste que j'ai eu ! Mes ongles sont parfaits et elle a pris soin de les préserver.",
    service: "Remplissage",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={i < rating ? "var(--rose-principal)" : "#e5e7eb"}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avis" className="py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Avis clients
          </p>
          <h2 className="section-title">Ce qu&apos;elles disent</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <blockquote key={review.id} className="card flex flex-col gap-4">
              <StarRating rating={review.rating} />
              <p className="italic leading-relaxed" style={{ color: "var(--neutral-700)" }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-auto flex items-center justify-between text-sm">
                <div>
                  <cite className="font-semibold not-italic" style={{ color: "var(--neutral-800)" }}>
                    {review.name}
                  </cite>
                  <p style={{ color: "var(--neutral-700)" }}>{review.service}</p>
                </div>
                <time style={{ color: "var(--neutral-700)" }}>{review.date}</time>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
