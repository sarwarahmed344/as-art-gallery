import { useEffect, useMemo, useState } from "react";
import { ArtImage } from "@/components/ArtImage";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { renderWithInstaLinks } from "@/lib/insta";
import { bumpView, getViewCount } from "@/lib/views";

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
  idOnly?: boolean;
};

interface Props {
  items: ArtItem[];
  variant: "mono" | "vivid";
  filters?: ArtTag[];
}

export function Gallery({ items, variant, filters }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [active, setActive] = useState<ArtTag | "All">("All");
  const [views, setViews] = useState<Record<string, number>>({});

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
          <article key={item.id} className={`mb-5 break-inside-avoid ${cardBase} ${glowOnHover} animate-fade-in`}>
            <div className="relative overflow-hidden">
              {item.src ? (
                <button
                  type="button"
                  onClick={() => openLightbox(i, item.id)}
                  className="group/image relative block w-full cursor-zoom-in text-left"
                  aria-label={`Open ${item.name}`}
                >
                  <div className="transition-transform duration-700 ease-out group-hover/image:scale-[1.03]">
                    <ArtImage src={item.src} alt={item.name} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
                  <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 opacity-0 transition duration-500 group-hover/image:opacity-100">
                    Open
                  </div>
                </button>
              ) : (
                <ArtImage src={item.src} alt={item.name} />
              )}

              {item.idOnly && item.instaHandle && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-sm text-white">
                  <a
                    href={`https://instagram.com/${item.instaHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-4 hover:text-white"
                  >
                    @{item.instaHandle}
                  </a>
                </div>
              )}
            </div>

            {!item.idOnly && (
              <div className="space-y-3 border-t border-white/8 px-4 py-4 sm:px-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-serif text-xl font-semibold text-white">{item.name}</h3>
                    {item.instaHandle && (
                      <a
                        href={`https://instagram.com/${item.instaHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] uppercase tracking-[0.18em] text-white/55 underline decoration-dotted underline-offset-4 transition hover:text-white"
                      >
                        @{item.instaHandle}
                      </a>
                    )}
                  </div>
                  {item.medium && (
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/48">{item.medium}</p>
                  )}
                </div>

                {item.dialogue && (
                  <p className="text-xs italic leading-relaxed text-white/82">“{renderWithInstaLinks(item.dialogue)}”</p>
                )}

                {item.like && (
                  <div className="text-sm leading-relaxed text-white/72">
                    {renderWithInstaLinks(item.like)}
                  </div>
                )}

                {item.categories && item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/14 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-white/58"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span>{views[item.id] ?? "—"} views</span>
              {!item.idOnly && item.year && <span className="opacity-60">{item.year}</span>}
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-white/50">Nothing in this category yet.</p>
      )}

      <Lightbox
        items={lbItems}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onPrev={() => setOpenIdx((idx) => (idx === null ? null : (idx - 1 + visible.length) % visible.length))}
        onNext={() => setOpenIdx((idx) => (idx === null ? null : (idx + 1) % visible.length))}
      />
    </>
  );
}
