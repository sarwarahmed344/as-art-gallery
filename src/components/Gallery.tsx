import { useState } from "react";
import { ArtImage } from "@/components/ArtImage";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { renderWithInstaLinks } from "@/lib/insta";

export type ArtItem = {
  id: string;
  name: string;
  instaLabel?: string; // shown for Moosa/Akber only-id case OR appended to name
  instaHandle?: string; // raw handle like "iamsrk"
  dialogue?: string;
  like?: string;
  src?: string;
  /** When true (Moosa/Akber), render ONLY the instagram link beneath the image */
  idOnly?: boolean;
};

interface Props {
  items: ArtItem[];
  variant: "mono" | "vivid";
}

export function Gallery({ items, variant }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const lbItems: LightboxItem[] = items.map((i) => ({
    src: i.src ?? "",
    alt: i.name,
  }));

  const isMono = variant === "mono";
  const cardBase = isMono
    ? "group relative overflow-hidden border border-white/15 bg-black"
    : "group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0c10]";
  const glowOnHover = isMono
    ? ""
    : "transition-shadow duration-500 hover:shadow-[0_0_30px_oklch(0.72_0.27_350/0.45),0_0_60px_oklch(0.72_0.2_240/0.25)]";

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {items.map((item, i) => (
          <article
            key={item.id}
            className={`mb-5 break-inside-avoid cursor-zoom-in ${cardBase} ${glowOnHover}`}
            onClick={() => item.src && setOpenIdx(i)}
          >
            <div className="relative overflow-hidden">
              <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                <ArtImage src={item.src} alt={item.name} />
              </div>
              {/* Hover overlay (only if there is text content) */}
              {!item.idOnly && (item.dialogue || item.like) && (
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  {item.dialogue && (
                    <p className="mt-1 line-clamp-3 text-xs italic text-white/85">
                      “{item.dialogue}”
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Caption */}
            <div className={`p-4 ${isMono ? "text-white" : "text-foreground"}`}>
              {item.idOnly ? (
                <div className="text-sm">
                  <span className="text-white/60">Instagram: </span>
                  <a
                    href={`https://instagram.com/${item.instaHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium underline decoration-dotted underline-offset-4 hover:text-neon-pink"
                  >
                    @{item.instaHandle}
                  </a>
                </div>
              ) : (
                <div className="space-y-1.5 text-sm leading-relaxed">
                  <p>
                    <span className="text-white/55">Name: </span>
                    <span className="font-medium">{item.name}</span>
                    {item.instaHandle && (
                      <>
                        {" "}
                        <span className="text-white/55">(Instagram: </span>
                        <a
                          href={`https://instagram.com/${item.instaHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="underline decoration-dotted underline-offset-4 hover:text-neon-pink"
                        >
                          @{item.instaHandle}
                        </a>
                        <span className="text-white/55">)</span>
                      </>
                    )}
                  </p>
                  {item.dialogue && (
                    <p>
                      <span className="text-white/55">Dialogue: </span>
                      <span className="italic">“{renderWithInstaLinks(item.dialogue)}”</span>
                    </p>
                  )}
                  {item.like && (
                    <p>
                      <span className="text-white/55">What I Like: </span>
                      <span>{renderWithInstaLinks(item.like)}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <Lightbox
        items={lbItems}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onPrev={() =>
          setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length))
        }
        onNext={() =>
          setOpenIdx((i) => (i === null ? null : (i + 1) % items.length))
        }
      />
    </>
  );
}
