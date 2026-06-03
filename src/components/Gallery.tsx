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

export function Gallery({ items, filters }: Props) {
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

  const lbItems: LightboxItem[] = visible.map((i) => ({ src: i.src ?? "", alt: i.name }));

  const openLightbox = (idx: number, id: string) => {
    setOpenIdx(idx);
    const fresh = bumpView(id);
    setViews((v) => ({ ...v, [id]: fresh }));
  };

  return (
    <>
      {filters && filters.length > 0 && (
        <div className="relative mb-10 -mx-2">
          <div className="flex gap-2 overflow-x-auto px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...filters] as const).map((tag) => {
              const isActive = active === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActive(tag as ArtTag | "All")}
                  className="shrink-0 border-2 px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.22em] transition"
                  style={
                    isActive
                      ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }
                      : { borderColor: "var(--ink)", background: "var(--background)", color: "var(--foreground)" }
                  }
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {visible.map((item, i) => (
          <article
            key={item.id}
            className="mb-6 break-inside-avoid panel panel-hover-thicken group relative animate-fade-in"
            style={{ background: "var(--background)" }}
          >
            {/* AS ink-stamp watermark */}
            <div
              className="absolute right-2 top-2 z-20 border-2 px-2 py-0.5 font-display text-[10px] tracking-[0.18em]"
              style={{
                borderColor: "var(--ink)",
                color: "var(--foreground)",
                background: "var(--background)",
                transform: "rotate(-6deg)",
              }}
            >
              AS
            </div>

            <div className="relative overflow-hidden">
              {item.src ? (
                <button
                  type="button"
                  onClick={() => openLightbox(i, item.id)}
                  className="group/image relative block w-full cursor-zoom-in text-left"
                  aria-label={`Open ${item.name}`}
                >
                  <ArtImage src={item.src} alt={item.name} />

                  {/* Speech-bubble hover overlay */}
                  {!item.idOnly && (
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
                      <div className="speech-bubble shadow-[6px_6px_0_0_#0A0A0A]">
                        <p className="font-serif text-base font-semibold italic leading-tight">{item.name}</p>
                        {item.dialogue && (
                          <p className="mt-1 text-xs italic leading-snug">"{item.dialogue}"</p>
                        )}
                        <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                          <span>{item.medium ?? ""}</span>
                          {item.year && <span>{item.year}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ) : (
                <ArtImage src={item.src} alt={item.name} />
              )}
            </div>

            {!item.idOnly && (
              <div
                className="space-y-2.5 border-t-2 px-4 py-4 sm:px-5"
                style={{ borderColor: "var(--ink)" }}
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-serif text-xl font-semibold italic">{item.name}</h3>
                    {item.instaHandle && (
                      <a
                        href={`https://instagram.com/${item.instaHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-[0.18em] underline-offset-4 hover:underline"
                      >
                        @{item.instaHandle}
                      </a>
                    )}
                  </div>
                  {item.medium && (
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{item.medium}</p>
                  )}
                </div>

                {item.dialogue && (
                  <p className="text-xs italic leading-relaxed opacity-85">
                    <span className="font-display text-base">"</span>
                    {renderWithInstaLinks(item.dialogue)}
                    <span className="font-display text-base">"</span>
                  </p>
                )}

                {item.like && (
                  <div className="text-sm leading-relaxed opacity-85">
                    {renderWithInstaLinks(item.like)}
                  </div>
                )}

                {item.categories && item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.categories.map((c) => (
                      <span
                        key={c}
                        className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
                        style={{ borderColor: "var(--ink)" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!item.idOnly && item.year && (
              <div
                className="flex items-center justify-end border-t-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70"
                style={{ borderColor: "var(--ink)" }}
              >
                <span>pg. {String(i + 1).padStart(2, "0")}</span>
              </div>
            )}
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm opacity-60">Nothing in this category yet.</p>
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
