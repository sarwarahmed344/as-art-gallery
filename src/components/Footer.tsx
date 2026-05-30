import { Link } from "@tanstack/react-router";
import { Mail, Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 py-12 font-mono">
      <div className="mx-auto max-w-7xl">
        {/* Hand-drawn ink stroke divider */}
        <svg
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          className="mb-8 h-3 w-full opacity-70"
          aria-hidden
        >
          <path
            d="M2 7 Q 120 2, 240 6 T 480 5 Q 600 11, 720 4 T 960 7 Q 1080 2, 1198 6"
            fill="none"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col items-center gap-6 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-white/70">
            <Link to="/sketches" className="hover:text-white">Monochrome</Link>
            <span className="opacity-30">·</span>
            <Link to="/colors" className="hover:text-white">Vivid</Link>
            <span className="opacity-30">·</span>
            <Link to="/sketchbook" className="hover:text-white">Sketchbook</Link>
            <span className="opacity-30">·</span>
            <Link to="/fan-wall" className="hover:text-white">Fan Wall</Link>
            <span className="opacity-30">·</span>
            <Link to="/commission" className="hover:text-white">Request a Piece</Link>
            <span className="opacity-30">·</span>
            <a
              href="https://instagram.com/sarwarr.rr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/75">
            <a href="mailto:sarwarahmed344@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5" /> sarwarahmed344@gmail.com
            </a>
            <a
              href="https://wa.me/919059551017"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" /> +91 90595 51017
            </a>
            <a
              href="https://instagram.com/sarwarr.rr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Instagram className="h-3.5 w-3.5" /> @sarwarr.rr
            </a>
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            © 2026 AS Art Gallery · Drawn by hand in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
