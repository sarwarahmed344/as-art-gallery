import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/sketchbook")({
  head: () => ({
    meta: [
      { title: "Sketchbook — AS Art Gallery" },
      {
        name: "description",
        content:
          "Raw and unfiltered — rough sketches, pencil underdrawings and process notes from AS.",
      },
      { property: "og:title", content: "Sketchbook — AS" },
      { property: "og:description", content: "Raw WIP and underdrawings by AS (@sarwarr.rr)." },
    ],
  }),
  component: SketchbookPage,
});

type WipEntry = {
  id: string;
  title: string;
  caption: string;
  src?: string;
};

const ENTRIES: WipEntry[] = [
  { id: "wip-1", title: "underdrawing — eren", caption: "rough loose pencil pass — locking the gesture before committing to ink" },
  { id: "wip-2", title: "abandoned panel", caption: "got the hands wrong twice and walked away. might come back to this one." },
  { id: "wip-3", title: "cross-hatch study", caption: "an hour of just texture practice. no plan, no subject." },
  { id: "wip-4", title: "margin doodles", caption: "the noise i leave in the corners of every notebook page." },
];

function SpiralBinding() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-10 md:block">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-3 h-4 w-4 rounded-full border-2 border-stone-500/40 bg-black/60"
          style={{ top: `${i * 40 + 80}px` }}
        />
      ))}
      <div className="absolute left-0 top-0 h-full w-px bg-stone-700/40" />
    </div>
  );
}

function SketchbookPage() {
  return (
    <div className="min-h-screen text-stone-200" style={{ backgroundColor: "#0D0A07" }}>
      <Navbar />
      <main className="ruled-paper relative min-h-screen">
        <SpiralBinding />
        <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-10 md:pl-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-stone-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <h1 className="mt-10 font-serif text-5xl italic text-stone-100 sm:text-7xl">
            The Sketchbook
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
            raw and unfiltered — this is where it begins
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone-300/80">
            Half-finished pages, scrap pencil work, things I never inked, and the marks I'd
            usually keep to myself. Nothing here is polished. That's the point.
          </p>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-24 md:pl-16">
          <div className="grid gap-10 sm:grid-cols-2">
            {ENTRIES.map((e, i) => (
              <article
                key={e.id}
                className="group relative"
                style={{ transform: `rotate(${i % 2 === 0 ? "-0.8deg" : "1deg"})` }}
              >
                {/* tape strip */}
                <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 -translate-y-2 bg-amber-200/15 backdrop-blur-sm shadow-sm" />
                <div
                  className="border border-stone-600/40 bg-stone-900/60 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:rotate-0"
                  style={{ clipPath: "polygon(0 0, 100% 0, 99% 98%, 1% 100%)" }}
                >
                  <div className="flex aspect-[4/5] w-full items-center justify-center border border-dashed border-stone-600/50 bg-stone-900/80">
                    {e.src ? (
                      <img src={e.src} alt={e.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500">
                        scan pending
                      </span>
                    )}
                  </div>
                  <div className="mt-4 px-1 pb-2">
                    <p className="font-mono text-sm lowercase text-stone-100">{e.title}</p>
                    <p className="mt-1 font-mono text-[12px] lowercase leading-snug text-stone-400">
                      {e.caption}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
