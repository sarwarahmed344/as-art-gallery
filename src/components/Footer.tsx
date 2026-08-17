import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="px-6 pb-10 pt-12" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="h-[3px] w-full" style={{ background: "var(--ink)" }} />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <Link to="/sketches" className="underline-offset-4 hover:underline">Monochrome</Link>
            <Link to="/colors" className="underline-offset-4 hover:underline">Vivid</Link>
            <Link to="/commission" className="underline-offset-4 hover:underline">Request a Piece</Link>
            <Link to="/about" className="underline-offset-4 hover:underline">About</Link>
            <a
              href="https://instagram.com/sarwarr.rr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Instagram
            </a>
          </nav>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
            © 2026 AS Art Gallery · @sarwarr.rr
          </div>
        </div>
      </div>
    </footer>
  );
}
