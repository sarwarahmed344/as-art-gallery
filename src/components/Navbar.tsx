import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/sketches", label: "Monochrome" },
  { to: "/colors", label: "Vivid" },
  { to: "/generate", label: "Concept Lab" },
  { to: "/draw", label: "Draw" },
  { to: "/wall", label: "Gallery Wall" },
  { to: "/about", label: "About" },
  { to: "/join", label: "Join as an Artist" },
  { to: "/admin", label: "Admin" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b-[2px] border-ink"
        style={{ background: "var(--background)", borderColor: "var(--ink)" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link to="/" className="font-display text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            AS
          </Link>

          <div className="hidden flex-wrap items-center justify-end gap-1 text-sm md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-3 py-2 font-display text-base uppercase tracking-[0.2em] transition-colors"
                style={{ color: "var(--foreground)" }}
                activeProps={{
                  className:
                    "relative px-3 py-2 font-display text-base uppercase tracking-[0.2em] after:absolute after:left-2 after:right-2 after:-bottom-[1px] after:h-[6px] after:bg-[var(--ink)]",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/commission"
              className="ml-2 inline-flex items-center border-2 px-4 py-2 font-display text-xs uppercase tracking-[0.22em] transition"
              style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }}
              activeProps={{ className: "ml-2 inline-flex items-center border-2 px-4 py-2 font-display text-xs uppercase tracking-[0.22em]" }}
            >
              Request a Piece
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="border-2 p-2 md:hidden"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            <Menu className="h-5 w-5" strokeWidth={3} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[78%] max-w-xs border-l-[3px] p-6 transition-transform duration-400 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--background)", borderColor: "var(--ink)", color: "var(--foreground)" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">AS</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="border-2 p-2"
              style={{ borderColor: "var(--ink)" }}
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl uppercase tracking-[0.18em]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/commission"
              onClick={() => setOpen(false)}
              className="btn-ink mt-6 inline-flex items-center justify-center"
            >
              Request a Piece
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
