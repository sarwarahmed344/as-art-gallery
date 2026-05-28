import { Mail, Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
          <a
            href="mailto:sarwarahmed344@gmail.com"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Mail className="h-4 w-4" /> sarwarahmed344@gmail.com
          </a>
          <a
            href="https://wa.me/919059551017"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Phone className="h-4 w-4" /> +91 90595 51017
          </a>
          <a
            href="https://instagram.com/sarwarr.rr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Instagram className="h-4 w-4" /> @sarwarr.rr
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 AS Art Gallery. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
