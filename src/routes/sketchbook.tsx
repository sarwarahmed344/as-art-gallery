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

function SketchbookPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-8 sm:p-12" style={{ background: "var(--background)" }}>
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">
              The Sketchbook
            </span>
            <h1 className="font-display text-5xl font-bold leading-[0.9] sm:text-7xl">THE SKETCHBOOK</h1>
            <p className="mt-3 font-serif text-base italic opacity-80 sm:text-xl">
              Raw and unfiltered — this is where it begins.
            </p>
          </div>
        </section>

        {/* Sketchbook spread — two pages with a spine */}
        <section className="relative mx-auto max-w-6xl px-4 pb-24">
          <div className="panel relative overflow-hidden" style={{ background: "var(--background)" }}>
            {/* Spine */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 md:block"
              style={{ background: "var(--ink)" }}
            />
            <div className="ruled-paper grid grid-cols-1 gap-0 md:grid-cols-2">
              {ENTRIES.map((e, i) => (
                <article
                  key={e.id}
                  className="relative border-b-2 p-6 last:border-b-0 md:border-b-2"
                  style={{
                    borderColor: "var(--ink)",
                    borderRightWidth: i % 2 === 0 ? 0 : undefined,
                  }}
                >
                  <span className="absolute right-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                    pg. {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex aspect-[4/3] w-full items-center justify-center border-2 border-dashed"
                    style={{ borderColor: "var(--ink)", background: "var(--card)" }}
                  >
                    {e.src ? (
                      <img src={e.src} alt={e.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50">
                        scan pending
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-lg italic">{e.title}</p>
                    <p className="mt-1 font-mono text-[12px] lowercase leading-snug opacity-75">
                      {e.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
