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

// Manual list — populate with WIP scans as they come in. We deliberately
// reuse a couple of finished pieces as placeholders so the page renders
// today, but the aesthetic is roughed-up paper notes.
const ENTRIES: WipEntry[] = [
  {
    id: "wip-1",
    title: "Underdrawing — Eren",
    caption: "rough loose pencil pass — locking the gesture before committing to ink",
  },
  {
    id: "wip-2",
    title: "Abandoned panel",
    caption: "got the hands wrong twice and walked away. might come back to this one.",
  },
  {
    id: "wip-3",
    title: "Cross-hatch study",
    caption: "an hour of just texture practice. no plan, no subject.",
  },
  {
    id: "wip-4",
    title: "Margin doodles",
    caption: "the noise I leave in the corners of every notebook page.",
  },
];

function SketchbookPage() {
  return (
    <div
      className="min-h-screen text-stone-900"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #f6efdf 0%, #ece2c8 40%, #d9caa6 100%)",
      }}
    >
      <Navbar />
      <main className="relative">
        {/* aged paper texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
        <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-700 transition hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <h1
            className="mt-6 font-display text-5xl font-bold tracking-tighter text-stone-900 sm:text-7xl"
            style={{ transform: "rotate(-1.2deg)" }}
          >
            Sketchbook
          </h1>

          <div className="mt-4 inline-block border-l-4 border-stone-800/70 bg-stone-100/40 px-4 py-2">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-stone-800">
              Raw and unfiltered — this is where the art begins.
            </p>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone-800/80">
            Half-finished pages, scrap pencil work, things I never inked, and the marks I'd
            usually keep to myself. Nothing here is polished. That's the point.
          </p>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-10 sm:grid-cols-2">
            {ENTRIES.map((e, i) => (
              <article
                key={e.id}
                className="group relative"
                style={{
                  transform: `rotate(${i % 2 === 0 ? "-0.8deg" : "1deg"})`,
                }}
              >
                {/* tape strip */}
                <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 -translate-y-2 bg-amber-200/70 opacity-70 shadow-sm" />
                <div className="border border-stone-800/30 bg-stone-50/80 p-3 shadow-[0_8px_30px_rgba(80,60,30,0.25)] transition-transform duration-500 group-hover:rotate-0">
                  <div className="flex aspect-[4/5] w-full items-center justify-center border border-dashed border-stone-500/50 bg-stone-100/60">
                    {e.src ? (
                      <img src={e.src} alt={e.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-display text-xs uppercase tracking-[0.3em] text-stone-500">
                        scan pending
                      </span>
                    )}
                  </div>
                  <div className="mt-4 px-1 pb-2">
                    <p className="font-display text-base font-semibold text-stone-900">
                      {e.title}
                    </p>
                    <p className="mt-1 text-[13px] italic leading-snug text-stone-700">
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
