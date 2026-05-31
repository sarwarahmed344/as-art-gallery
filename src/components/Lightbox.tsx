import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = {
  src: string;
  alt: string;
};

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
      onClick={onClose}
      style={{
        background: "rgba(5,5,8,0.86)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white hover:bg-white/15"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Desktop arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-3 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white hover:bg-white/15 md:left-6 md:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-3 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white hover:bg-white/15 md:right-6 md:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <img
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] object-contain"
        style={{ animation: "fade-in 0.4s ease, ink-float 6s ease-in-out infinite 0.4s" }}
      />

      {/* Mobile arrows at bottom */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-6 md:hidden">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/60"
        style={{ animation: "fade-in 0.6s ease 0.3s both" }}
      >
        {index + 1} / {items.length} · {item.alt}
      </div>
    </div>
  );
}
