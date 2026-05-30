import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SplitSectorBackground } from "@/components/SplitSectorBackground";
import { ArtImage } from "@/components/ArtImage";
import { colorImg } from "@/lib/artAssets";
import { sketchImg } from "@/lib/artAssets";

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

// Featured pick — update monthly.
const FEATURED = {
  name: "Itoshi Sae",
  note: "This month — Sae's stillness with the gears tearing out the right side. The piece I keep going back to.",
  sectorLabel: "Vivid Spectrum",
  sectorTo: "/colors" as const,
  src: colorImg("sae"),
  volume: "Vol. 01",
};

// AS Recommends — manually curated. Swap freely.
const RECOMMENDS = [
  { id: "gojo-vs-sukuna", name: "Gojo vs Sukuna", to: "/colors" as const, src: colorImg("gojo-vs-sukuna") },
  { id: "neymar", name: "Neymar Jr", to: "/sketches" as const, src: sketchImg("neymar") },
  { id: "vivian", name: "Vivian Hugo", to: "/colors" as const, src: colorImg("vivian") },
];

function Index() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const scrollToSectors = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO with split sector animated background */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <SplitSectorBackground hoverSide={hoverSide} />
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

          {/* Artist Statement — first person, 3–4 lines */}
          <div className="mx-auto mt-8 max-w-xl text-left sm:text-center">
            <p className="text-[15px] leading-relaxed text-white/85">
              I'm <span className="font-semibold text-white">AS</span> — short for Sarwar, the name
              I sign with when the pen actually moves. I draw because some things only sit right
              once they're on paper.
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/75">
              <span className="text-white">Monochrome</span> is where I sit with the patience —
              ink, graphite, hours of cross-hatching. <span className="text-white">Vivid</span> is
              where the same characters get loud — color, energy, full volume.
            </p>
          </div>
        </div>

        <button
          onClick={scrollToSectors}
          aria-label="Scroll to galleries"
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce text-muted-foreground transition hover:text-foreground"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
      </section>

      {/* FEATURED — spotlight */}
      <section className="relative mx-auto max-w-5xl px-6 pt-24 pb-12">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> This Month's Pick · Featured {FEATURED.volume}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Featured Work</h2>
        </div>

        <Link
          to={FEATURED.sectorTo}
          className="group relative mx-auto block w-full max-w-3xl"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-3xl opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
            style={{ background: "var(--gradient-vivid)" }}
          />
          {/* vignette frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black">
            <div className="relative">
              <ArtImage src={FEATURED.src} alt={FEATURED.name} />
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_120px_60px_rgba(0,0,0,0.75)]" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/55">{FEATURED.sectorLabel}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{FEATURED.name}</h3>
              <p className="mt-3 max-w-xl text-sm text-white/70">{FEATURED.note}</p>
            </div>
          </div>
        </Link>
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
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black p-10 transition-all duration-500 hover:-translate-y-1 hover:border-white/40 min-h-[360px] flex flex-col justify-between"
          >
            <div className="grain absolute inset-0 opacity-50" />
            {/* Ink stamp */}
            <div className="absolute right-6 top-6 rotate-[8deg] border-2 border-white/70 px-3 py-1 font-display text-sm uppercase tracking-[0.2em] text-white/80 mix-blend-screen">
              7 Works
            </div>
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
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10] p-10 transition-all duration-500 hover:-translate-y-1 min-h-[360px] flex flex-col justify-between"
          >
            <div className="pointer-events-none absolute -inset-1 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "var(--gradient-vivid)" }}
            />
            <div className="absolute inset-[1px] rounded-2xl bg-[#0b0c10]" />
            {/* Ink stamp */}
            <div className="absolute right-6 top-6 -rotate-[6deg] border-2 border-white/70 px-3 py-1 font-display text-sm uppercase tracking-[0.2em] text-white/85 mix-blend-screen">
              12 Works
            </div>
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

      {/* AS RECOMMENDS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Artist's Edit</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">AS Recommends</h2>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Three pieces I'd point you to first. Personal picks — refreshed when something newer earns its spot.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDS.map((r) => (
            <Link
              key={r.id}
              to={r.to}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black"
            >
              <ArtImage src={r.src} alt={r.name} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">Personal pick</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">{r.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
