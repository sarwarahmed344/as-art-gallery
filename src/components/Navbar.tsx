import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="glass fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          AS
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/sketches"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Monochrome Sector
          </Link>
          <Link
            to="/colors"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Vivid Spectrum
          </Link>
        </div>
      </nav>
    </header>
  );
}
