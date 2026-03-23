import { brand } from "@/config/brand";

type BeholdPost = {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
  caption?: string;
};

const fallbackItems = [
  {
    gradient: "linear-gradient(135deg, #FFB5D3 0%, #FE92BF 50%, #BD1148 100%)",
    label: "Gel extension · Nude",
  },
  {
    gradient: "linear-gradient(155deg, #BD1148 0%, #E8527A 60%, #FFB5D3 100%)",
    label: "Press-on · French",
  },
  {
    gradient: "linear-gradient(120deg, #FFF0F5 0%, #FFB5D3 40%, #FE92BF 100%)",
    label: "Nail art · Floraux",
  },
  {
    gradient: "linear-gradient(165deg, #E8527A 0%, #BD1148 50%, #7A0A2E 100%)",
    label: "Gel · Ombré rose",
  },
  {
    gradient: "linear-gradient(140deg, #FE92BF 0%, #FFB5D3 50%, #FFF0F5 100%)",
    label: "Press-on · Graphique",
  },
  {
    gradient: "linear-gradient(110deg, #BD1148 0%, #FE92BF 60%, #FFB5D3 100%)",
    label: "Gainage · Naturel",
  },
  {
    gradient: "linear-gradient(125deg, #260d1e 0%, #7A0A2E 50%, #BD1148 100%)",
    label: "Gel · Bordeaux",
  },
  {
    gradient: "linear-gradient(150deg, #FFB5D3 0%, #FFF0F5 50%, #DDD0CA 100%)",
    label: "Press-on · Pastel",
  },
];

async function getInstagramPosts(): Promise<BeholdPost[] | null> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId || feedId === "your_behold_feed_id_here") return null;

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const posts = (data.posts ?? data) as BeholdPost[];
    return posts
      .filter((p) => p.mediaType !== "VIDEO" || !!p.thumbnailUrl)
      .slice(0, 8);
  } catch {
    return null;
  }
}

export async function Portfolio() {
  const posts = await getInstagramPosts();

  return (
    <section
      id="portfolio"
      className="relative section-block overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FFF0F5 0%, #FAF4F8 35%, #FDFBF9 70%, white 100%)",
      }}
    >
      {/* Decorative orb top-right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(254,146,191,0.12) 0%, transparent 65%)",
        }}
      />
      {/* Decorative orb bottom-left */}
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(189,17,72,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative shell">

        {/* Header */}
        <div className="mb-16 md:mb-24 section-head lg:items-start lg:text-left">
          <span className="section-label">Portfolio</span>
          <div className="divider-rose mt-1 mb-1 lg:mx-0" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 w-full">
            <h2 className="section-title">
              Nos{" "}
              <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>créations</em>
            </h2>
            <div className="flex flex-col gap-6 items-center lg:items-end lg:max-w-xs">
              <p
                className="text-base leading-relaxed section-copy lg:text-right lg:mx-0"
                style={{ color: "var(--neutral-700)" }}
              >
                Chaque set est unique. Retrouvez nos dernières réalisations.
              </p>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start lg:self-auto"
                aria-label="Voir @r.osesnails sur Instagram"
              >
                @r.osesnails sur Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {posts
            ? posts.map((post) => {
                const src =
                  post.mediaType === "VIDEO" ? post.thumbnailUrl! : post.mediaUrl;
                const caption =
                  post.caption?.split("\n")[0]?.replace(/#\S+/g, "").trim().slice(0, 80) ?? "";
                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl overflow-hidden relative group cursor-pointer block"
                    aria-label={caption || "Création RosesNails"}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={caption || "Création RosesNails"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 p-4 pt-10"
                      style={{ background: "linear-gradient(to top, rgba(13,6,9,0.65), transparent)" }}
                    >
                      {caption && (
                        <p
                          className="text-white text-xs font-medium"
                          style={{ fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
                        >
                          {caption}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })
            : fallbackItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden relative group cursor-pointer"
                  style={{ background: item.gradient }}
                  aria-label={item.label}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity duration-500"
                    aria-hidden="true"
                  >
                    <svg width="60" height="74" viewBox="0 0 60 74" fill="none">
                      <rect x="4" y="24" width="52" height="46" rx="26" fill="rgba(255,255,255,0.3)" />
                      <rect x="14" y="4" width="32" height="28" rx="16" fill="rgba(255,255,255,0.24)" />
                    </svg>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 pt-10"
                    style={{ background: "linear-gradient(to top, rgba(13,6,9,0.6), transparent)" }}
                  >
                    <p
                      className="text-white text-xs font-medium"
                      style={{ fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
