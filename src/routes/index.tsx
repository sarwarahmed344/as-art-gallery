import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ArtImage } from "@/components/ArtImage";
import { colorImg, sketchImg } from "@/lib/artAssets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AS Art Gallery — Concept Art by @sarwarr.rr" },
      {
        name: "description",
        content:
          "Monochrome ink portraits and vivid anime pop-art by AS. Based in Hyderabad.",
      },
      { property: "og:title", content: "AS Art Gallery — Vol. 01" },
      { property: "og:description", content: "Two sectors. One artist. Ink drawn from obsession." },
    ],
  }),
  component: Index,
});

const FEATURED = {
  name: "Vivian Hugo",
  note: "This month — the chaos of numbers and speech bubbles against the one person who filters all of it. Hugo's stillness inside the noise is the whole piece.",
  sectorLabel: "Vivid Spectrum",
  sectorTo: "/colors" as const,
  src: colorImg("vivian"),
  quote: "At the end of the day... the talented and talentless can never understand each other.",
};

const RECOMMENDS = [
  { id: "eren", name: "Eren Yeager", to: "/colors" as const, src: colorImg("eren") },
  { id: "leon", name: "Leon S. Kennedy", to: "/sketches" as const, src: sketchImg("leon") },
  { id: "kaiser", name: "Michael Kaiser", to: "/colors" as const, src: colorImg("kaiser") },
];

function ChapterMarker({ label }: { label: string }) {
  return (
    <span className="chapter-marker absolute left-4 top-3 z-10 bg-[var(--background)] px-2 py-1">
      {label}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      {/* HERO — manga volume cover */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="panel relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-6 py-20 sm:py-28">
          <ChapterMarker label="Vol. 01 · Cover" />

          {/* Faint diagonal speed lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 4deg, #DDDDDD 4deg 5deg, transparent 5deg 9deg)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, #000 90%)",
              maskImage:
                "radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, #000 90%)",
            }}
          />

          <div className="relative z-10 text-center">
            <h1 className="font-display font-bold leading-[0.8] text-[30vw] sm:text-[24rem]" style={{ color: "var(--ink)" }}>
              AS
            </h1>

            {/* Manga subtitle panel */}
            <div className="mx-auto mt-6 inline-block border-2 px-6 py-2" style={{ borderColor: "var(--ink)" }}>
              <p className="font-display text-lg tracking-[0.18em] sm:text-2xl">
                ART GALLERY <span className="opacity-50">—</span> VOL. 01
              </p>
            </div>

            <p className="mx-auto mt-10 max-w-xl font-serif text-base italic opacity-85 sm:text-lg">
              Monochrome is patience. Vivid is the same characters at full volume.
            </p>
          </div>

          {/* Bottom handle */}
          <a
            href="https://instagram.com/sarwarr.rr"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] opacity-75 hover:opacity-100"
          >
            <Instagram className="h-3 w-3" /> @sarwarr.rr
          </a>
        </div>
      </section>

      {/* SECTOR CHOICES — two manga panels */}
      <section id="sectors" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <p className="chapter-marker">Chapter Select</p>
          <h2 className="mt-2 font-display text-5xl font-bold sm:text-7xl" style={{ color: "var(--ink)" }}>
            CHOOSE YOUR SECTOR
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Monochrome */}
          <Link
            to="/sketches"
            className="panel panel-hover-thicken tilt-card group relative flex min-h-[420px] flex-col justify-between overflow-hidden p-10"
            style={{ background: "var(--background)" }}
          >
            <ChapterMarker label="Section A" />
            {/* Hatching marks in corner */}
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 hatching" />

            {/* page-number stamp */}
            <div className="absolute right-6 top-6 font-display text-7xl leading-none" style={{ color: "var(--ink)" }}>
              14
            </div>

            <div className="relative mt-12">
              <h3 className="font-display text-5xl font-bold leading-[0.9] sm:text-7xl" style={{ color: "var(--ink)" }}>
                MONOCHROME<br />SECTOR
              </h3>
              <p className="mt-4 max-w-sm font-serif italic text-base opacity-80">
                Every line is a decision.
              </p>
            </div>

            <div className="relative mt-8 inline-flex items-center gap-3">
              <span className="sfx font-display text-2xl">ENTER →</span>
            </div>
          </Link>

          {/* Vivid */}
          <Link
            to="/colors"
            className="panel panel-hover-thicken tilt-card group relative flex min-h-[420px] flex-col justify-between overflow-hidden p-10"
            style={{ background: "var(--background)" }}
          >
            <ChapterMarker label="Section B" />
            {/* Halftone tone-sheet */}
            <div className="pointer-events-none absolute inset-0 halftone" />

            <div className="absolute right-6 top-6 font-display text-7xl leading-none" style={{ color: "var(--ink)" }}>
              25
            </div>

            <div className="relative mt-12">
              <h3 className="font-display text-5xl font-bold leading-[0.9] sm:text-7xl" style={{ color: "var(--ink)" }}>
                VIVID<br />SPECTRUM
              </h3>
              <p className="mt-4 max-w-sm font-serif italic text-base opacity-80">
                Color as a weapon.
              </p>
            </div>

            <div className="relative mt-8 inline-flex items-center gap-3">
              <span className="sfx font-display text-2xl">ENTER →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED — full-width splash panel */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Link
          to={FEATURED.sectorTo}
          className="panel panel-hover-thicken group relative block overflow-hidden"
          style={{ background: "var(--background)" }}
        >
          <ChapterMarker label="This Month's Pick" />

          {/* Rotated black stamp top-right */}
          <div className="ink-stamp absolute right-6 top-6 z-10">★ Featured</div>

          {/* Faint halftone on text side */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 halftone hidden md:block" />

          <div className="grid grid-cols-1 items-stretch md:grid-cols-[1.2fr_1fr]">
            <div className="relative border-r-2" style={{ borderColor: "var(--ink)" }}>
              <ArtImage src={FEATURED.src} alt={FEATURED.name} />
            </div>
            <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-65">{FEATURED.sectorLabel}</p>
              <h3 className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl" style={{ color: "var(--ink)" }}>
                {FEATURED.name.toUpperCase()}
              </h3>
              <div className="speech-bubble max-w-md">
                <p className="font-serif text-sm italic">"{FEATURED.quote}"</p>
              </div>
              <p className="max-w-md text-sm leading-relaxed opacity-85">{FEATURED.note}</p>
              <span className="sfx font-display text-xl">VIEW PIECE →</span>
            </div>
          </div>
        </Link>
      </section>

      {/* AS RECOMMENDS — three-panel strip */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 text-center">
          <p className="chapter-marker">The Artist's Edit</p>
          <h2 className="mt-2 font-display text-5xl font-bold sm:text-6xl" style={{ color: "var(--ink)" }}>
            AS RECOMMENDS
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDS.map((r) => (
            <Link
              key={r.id}
              to={r.to}
              className="panel panel-hover-thicken group relative block overflow-hidden transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
              style={{ background: "var(--background)" }}
            >
              {/* Solid black star stamp */}
              <div
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center font-display text-base"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                ★
              </div>
              <ArtImage src={r.src} alt={r.name} />
              <div
                className="border-t-2 px-4 py-3 font-serif text-base italic"
                style={{ borderColor: "var(--ink)", color: "var(--foreground)" }}
              >
                {r.name}
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">· AS Pick</span>
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
