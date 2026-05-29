import { ImageIcon } from "lucide-react";

interface Props {
  src?: string;
  alt: string;
  className?: string;
  /** Show the bottom-right "AS" watermark. Defaults to true when src exists. */
  watermark?: boolean;
}

export function ArtImage({ src, alt, className, watermark = true }: Props) {
  if (src) {
    return (
      <div className="relative">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`block w-full h-auto ${className ?? ""}`}
        />
        {watermark && (
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2 right-2.5 select-none font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40 mix-blend-overlay drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            AS
          </span>
        )}
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-[3/4] w-full items-center justify-center border border-dashed border-border bg-muted/30 text-muted-foreground ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-2 text-xs">
        <ImageIcon className="h-6 w-6" />
        <span className="opacity-70">Drop image</span>
      </div>
    </div>
  );
}
