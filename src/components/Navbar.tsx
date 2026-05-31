import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/sketches", label: "Monochrome" },
  { to: "/colors", label: "Vivid" },
  { to: "/sketchbook", label: "Sketchbook" },
  { to: "/fan-wall", label: "Fan Wall" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const linkBase = "relative text-muted-foreground transition-colors hover:text-foreground";
  const activeProps = {
    className:
      "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-white after:origin-left after:scale-x-100 after:animate-[ink-line_.6s_cubic-bezier(.7,0,.2,1)_forwards]",
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark py-2" : "glass py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            AS
          </Link>

          {/* Desktop nav */}
          <div className="hidden flex-wrap items-center justify-end gap-5 text-sm md:flex">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={linkBase} activeProps={activeProps}>
                {l.label}
              </Link>
            ))}
            <Link
              to="/commission"
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/60 hover:bg-white/5"
              activeProps={{ className: "border-white/60 bg-white/10" }}
            >
              Request a Piece
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/20 p-2 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[78%] max-w-xs glass-dark p-6 transition-transform duration-400 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl">AS</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/20 p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl tracking-wide text-white/80 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/commission"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black"
            >
              Request a Piece
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
