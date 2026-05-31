import { useEffect, useMemo, useState } from "react";
import { ArtImage } from "@/components/ArtImage";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { renderWithInstaLinks } from "@/lib/insta";
import { bumpView, getViewCount } from "@/lib/views";

// Tags now combine content + style: free string but constrained by usage.
export type ArtTag = string;

export type ArtItem = {
  id: string;
  name: string;
  instaHandle?: string;
  dialogue?: string;
  like?: string;
  medium?: string;
  year?: string;
  categories?: ArtTag[];
  src?: string;
  /** When true (Moosa/Akber), render ONLY the instagram link beneath the image */
  idOnly?: boolean;
};

interface Props {
  items: ArtItem[];
  variant: "mono" | "vivid";
  /** Filter tags to expose above the grid */
  filters?: ArtTag[];
}

export function Gallery({ items, variant, filters }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [active, setActive] = useState<ArtTag | "All">("All");
  const [views, setViews] = useState<Record<string, number>>({});

  // Hydrate view counts client-side only.
  useEffect(() => {
    const next: Record<string, number> = {};
    for (const i of items) next[i.id] = getViewCount(i.id);
    setViews(next);
  }, [items]);

  const visible = useMemo(() => {
    if (active === "All") return items;
    return items.filter((i) => i.categories?.includes(active));
  }, [items, active]);

  const lbItems: LightboxItem[] = visible.map((i) => ({
    src: i.src ?? "",
    alt: i.name,
  }));

  const openLightbox = (idx: number, id: string) => {
    setOpenIdx(idx);
    const fresh = bumpView(id);
    setViews((v) => ({ ...v, [id]: fresh }));
  };

  const isMono = variant === "mono";
  const cardBase = isMono
    ? "group relative overflow-hidden border border-white/15 bg-black"
    : "group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0c10]";
  const glowOnHover = isMono
    ? ""
    : "transition-shadow duration-500 hover:shadow-[0_0_30px_oklch(0.72_0.27_350/0.45),0_0_60px_oklch(0.72_0.2_240/0.25)]";

  const chipBase =
    "relative overflow-hidden rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition";

  return (
    <>
      {filters && filters.length > 0 && (
        <div className="relative mb-8 -mx-2">
          {/* Edge fade for horizontal scroll on mobile */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
          <div className="flex gap-2 overflow-x-auto px-2 py-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...filters] as const).map((tag) => {
              const isActive = active === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActive(tag as ArtTag | "All")}
                  className={`${chipBase} shrink-0 ${
                    isActive
                      ? "border-white bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.25)]"
                      : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-full bg-white"
                      style={{ animation: "stamp-in 0.4s cubic-bezier(.5,1.6,.4,1) both" }}
                    />
                  )}
                  <span className="relative z-10">{tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {visible.map((item, i) => (
          <article
            key={item.id}
            className={`mb-5 break-inside-avoid cursor-zoom-in ${cardBase} ${glowOnHover} animate-fade-in`}
            onClick={() => item.src && openLightbox(i, item.id)}
          >
            <div className="relative overflow-hidden">
              <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                <ArtImage src={item.src} alt={item.name} />
              </div>

              {/* Hover overlay — hidden until hover, all metadata lives here */}
              {!item.idOnly && (
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/75 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white">
                      {item.name}
                      {item.instaHandle && (
                        <>
                          {" "}
                          <a
                            href={`https://instagram.com/${item.instaHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto text-xs font-normal text-white/65 underline decoration-dotted underline-offset-4 hover:text-white"
                          >
                            @{item.instaHandle}
                          </a>
                        </>
                      )}
                    </p>
                    {item.dialogue && (
                      <p className="line-clamp-3 text-xs italic text-white/85">
                        “{renderWithInstaLinks(item.dialogue)}”
                      </p>
                    )}
                    {item.like && (
                      <p className="line-clamp-3 text-[11px] leading-relaxed text-white/70">
                        {renderWithInstaLinks(item.like)}
                      </p>
                    )}
                    {item.categories && item.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.categories.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-white/65"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[10px] uppercase tracking-[0.15em] text-white/55">
                      {item.medium && <span>{item.medium}</span>}
                      {item.medium && item.year && <span className="opacity-40">·</span>}
                      {item.year && <span>{item.year}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal idOnly caption (Moosa/Akber) — kept visible since there's no other text */}
              {item.idOnly && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-sm text-white">
                  <a
                    href={`https://instagram.com/${item.instaHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="underline decoration-dotted underline-offset-4 hover:text-neon-pink"
                  >
                    @{item.instaHandle}
                  </a>
                </div>
              )}
            </div>

            {/* Always-visible view counter strip */}
            <div className="flex items-center justify-between border-t border-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span>{views[item.id] ?? "—"} views</span>
              {!item.idOnly && item.year && <span className="opacity-60">{item.year}</span>}
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-white/50">
          Nothing in this category yet.
        </p>
      )}

      <Lightbox
        items={lbItems}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onPrev={() =>
          setOpenIdx((i) => (i === null ? null : (i - 1 + visible.length) % visible.length))
        }
        onNext={() =>
          setOpenIdx((i) => (i === null ? null : (i + 1) % visible.length))
        }
      />
    </>
  );
}
