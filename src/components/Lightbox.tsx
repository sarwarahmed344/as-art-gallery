import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: string; alt: string };

interface Props {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark-sector");
  const bg = isDark ? "#080808" : "#FFFFFF";
  const ink = isDark ? "#FFFFFF" : "#0A0A0A";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
      onClick={onClose}
      style={{ background: bg }}
    >
      {/* Speed-lines focus effect */}
      <div className="speed-lines" />

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border-2 transition hover:scale-105"
        style={{ borderColor: ink, color: ink, background: bg }}
      >
        <X className="h-5 w-5" strokeWidth={3} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-3 hidden h-12 w-12 items-center justify-center border-2 transition hover:scale-105 md:left-6 md:flex"
        style={{ borderColor: ink, color: ink, background: bg }}
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={3} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-3 hidden h-12 w-12 items-center justify-center border-2 transition hover:scale-105 md:right-6 md:flex"
        style={{ borderColor: ink, color: ink, background: bg }}
      >
        <ChevronRight className="h-6 w-6" strokeWidth={3} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] max-w-[92vw] border-2"
        style={{ borderColor: ink, background: bg, boxShadow: `8px 8px 0 0 ${ink}` }}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[84vh] max-w-[88vw] object-contain"
        />
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-6 md:hidden">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center border-2"
          style={{ borderColor: ink, color: ink, background: bg }}
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={3} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center border-2"
          style={{ borderColor: ink, color: ink, background: bg }}
        >
          <ChevronRight className="h-6 w-6" strokeWidth={3} />
        </button>
      </div>

      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em]"
        style={{ color: ink }}
      >
        {index + 1} / {items.length} · {item.alt}
      </div>
    </div>
  );
}
