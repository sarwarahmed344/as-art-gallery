import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Instagram, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AS — Art Gallery by @sarwarr.rr" },
      {
        name: "description",
        content:
          "Sketch and concept art portfolio of AS (@sarwarr.rr). Explore the Monochrome Sector and the Vivid Spectrum.",
      },
      { property: "og:title", content: "AS — Art Gallery" },
      { property: "og:description", content: "Sketches & colored concept art by AS." },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToSectors = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(0.22_0.05_280/0.6),transparent_60%)]" />
        <div className="grain absolute inset-0" />
        <div className="relative z-10 text-center animate-fade-up">
          <h1 className="font-display text-[22vw] leading-none font-bold tracking-tighter sm:text-[18rem] md:text-[20rem]">
            AS
          </h1>
          <a
            href="https://instagram.com/sarwarr.rr"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground sm:text-lg"
          >
            <Instagram className="h-4 w-4" />
            <span className="underline decoration-dotted underline-offset-4">@sarwarr.rr</span>
          </a>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground/80">
            Sketch &amp; concept artist. Two worlds — stark monochrome ink and high-voltage color.
          </p>
        </div>

        <button
          onClick={scrollToSectors}
          aria-label="Scroll to galleries"
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce text-muted-foreground transition hover:text-foreground"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
      </section>

      {/* SECTOR CHOICES */}
      <section id="sectors" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Gallery</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Choose your sector</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Monochrome card */}
          <Link
            to="/sketches"
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black p-10 transition-all duration-500 hover:-translate-y-1 hover:border-white/40 min-h-[360px] flex flex-col justify-between"
          >
            <div className="grain absolute inset-0 opacity-50" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Section A</p>
              <h3 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                Monochrome Sector
              </h3>
              <p className="mt-4 max-w-sm text-sm text-white/65">
                Pure noir. Ink, graphite, cross-hatching — high-contrast portraits in black and white.
              </p>
            </div>
            <div className="relative mt-8 inline-flex items-center gap-2 text-sm text-white transition-transform duration-500 group-hover:translate-x-2">
              Enter sketches <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          {/* Vivid card */}
          <Link
            to="/colors"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10] p-10 transition-all duration-500 hover:-translate-y-1 min-h-[360px] flex flex-col justify-between"
          >
            <div className="pointer-events-none absolute -inset-1 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "var(--gradient-vivid)" }}
            />
            <div className="absolute inset-[1px] rounded-2xl bg-[#0b0c10]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Section B</p>
              <h3 className="mt-3 font-display text-5xl font-bold sm:text-5xl">
                <span className="text-gradient-vivid">Vivid Spectrum</span>
              </h3>
              <p className="mt-4 max-w-sm text-sm text-white/65">
                Cyberpunk neon, anime pop-art and explosive color. Where energy meets pigment.
              </p>
            </div>
            <div className="relative mt-8 inline-flex items-center gap-2 text-sm text-white transition-transform duration-500 group-hover:translate-x-2">
              Enter colors <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
