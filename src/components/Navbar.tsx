import { Link } from "@tanstack/react-router";

export function Navbar() {
  const linkBase =
    "text-muted-foreground transition-colors hover:text-foreground";
  return (
    <header className="glass fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          AS
        </Link>
        <div className="flex items-center gap-4 text-sm sm:gap-6">
          <Link to="/sketches" className={linkBase} activeProps={{ className: "text-foreground" }}>
            Monochrome
          </Link>
          <Link to="/colors" className={linkBase} activeProps={{ className: "text-foreground" }}>
            Vivid
          </Link>
          <Link to="/about" className={linkBase} activeProps={{ className: "text-foreground" }}>
            About
          </Link>
          <Link
            to="/commission"
            className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/60 hover:bg-white/5"
            activeProps={{ className: "border-white/60 bg-white/10" }}
          >
            Commission
          </Link>
        </div>
      </nav>
    </header>
  );
}
