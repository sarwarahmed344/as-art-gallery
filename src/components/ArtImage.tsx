import { ImageIcon } from "lucide-react";

interface Props {
  src?: string;
  alt: string;
  className?: string;
}

export function ArtImage({ src, alt, className }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`block w-full h-auto ${className ?? ""}`}
      />
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
