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
        <div className="absolute inset-0 animate-breathe">
          <SplitSectorBackground hoverSide={hoverSide} />
        </div>
        <div className="relative z-10 text-center animate-fade-up">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-white/40">Concept · Sketch · Color</p>
          <h1 className="font-display text-[28vw] leading-[0.85] font-bold tracking-tighter sm:text-[20rem] md:text-[22rem]">
            AS
          </h1>
          <p className="mt-2 font-serif text-xl italic text-white/80 sm:text-2xl">
            Ink drawn from obsession.
          </p>
          <a
            href="https://instagram.com/sarwarr.rr"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-white"
          >
            <Instagram className="h-3 w-3" />
            @sarwarr.rr
          </a>

          <div className="mx-auto mt-10 max-w-xl text-center">
            <p className="text-[14px] leading-relaxed text-white/75">
              <span className="font-semibold text-white">Monochrome</span> is patience —
              ink, graphite, hours of cross-hatching. <span className="font-semibold text-white">Vivid</span> is
              the same characters at full volume.
            </p>
          </div>
        </div>

        <button
          onClick={scrollToSectors}
          aria-label="Scroll to galleries"
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce text-white/50 transition hover:text-white"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
      </section>

      {/* FEATURED — cinematic spotlight */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="mb-10 text-center">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            <Sparkles className="h-3 w-3" /> {FEATURED.volume} · This Month's Pick
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Featured Work</h2>
        </div>

        <Link
          to={FEATURED.sectorTo}
          className="group relative mx-auto grid w-full grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-10 md:grid-cols-[1fr_1.2fr]"
        >
          {/* dominant-color vignette glow */}
          <div className="pointer-events-none absolute -inset-20 opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
            style={{ background: "var(--gradient-vivid)" }}
          />

          {/* Wax seal */}
          <div className="absolute left-5 top-5 z-10 flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-full border-2 border-amber-500/80 bg-amber-900/40 font-display text-[9px] uppercase leading-tight tracking-[0.15em] text-amber-200 text-center shadow-[0_4px_20px_rgba(180,120,40,0.4)]"
            style={{ animation: "stamp-in 0.7s cubic-bezier(.5,1.6,.4,1) 0.4s both" }}
          >
            Month<br/>Pick
          </div>

          <div className="relative order-2 md:order-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">{FEATURED.sectorLabel}</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {FEATURED.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{FEATURED.note}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70 transition group-hover:text-white">
              View piece <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>

          <div className="relative order-1 overflow-hidden rounded-xl border border-white/10 md:order-2">
            <ArtImage src={FEATURED.src} alt={FEATURED.name} />
            <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_100px_50px_rgba(0,0,0,0.55)]" />
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
