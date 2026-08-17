import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { getWallItems, DEMO_WALL, type WallItem } from "@/lib/gallery-wall";

export const Route = createFileRoute("/wall")({
  head: () => ({
    meta: [
      { title: "The Gallery Wall — AS Art Gallery" },
      { name: "description", content: "Featured visitor creations — AI concepts and hand-drawn pieces made in Concept Lab and The Blank Page." },
      { property: "og:title", content: "The Gallery Wall — AS Art Gallery" },
      { property: "og:description", content: "Not everything here was drawn by AS. A wall for what visitors made." },
    ],
  }),
  component: WallPage,
});

export function WallPage() {
  const [items, setItems] = useState<WallItem[]>([]);
  const [filter, setFilter] = useState<"All" | "ai" | "hand">("All");

  useEffect(() => {
    const stored = getWallItems();
    setItems(stored.length > 0 ? stored : DEMO_WALL);
  }, []);

  const visible = filter === "All" ? items : items.filter((i) => i.type === filter);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Chapter 05</span>
            <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">
              THE GALLERY<br />WALL
            </h1>
            <p className="mt-4 font-serif text-xl italic opacity-80">Not everything here was drawn by AS.</p>
            <p className="mt-4 max-w-2xl opacity-80">
              A wall for what visitors made — some with AI, some with their own hands. Chosen from everything submitted through Concept Lab and The Blank Page.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-8 flex flex-wrap gap-3">
            {(["All", "ai", "hand"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="border-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition"
                style={
                  filter === f
                    ? { background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }
                    : { borderColor: "var(--ink)" }
                }
              >
                {f === "ai" ? "AI Generated" : f === "hand" ? "Hand-Drawn" : "All"}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="panel p-12 text-center">
              <p className="font-serif text-lg italic opacity-70">The wall is empty. Be the first to make something.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <article key={item.id} className="panel panel-hover-thicken overflow-hidden">
                  <div className="flex aspect-square items-center justify-center border-b-2" style={{ borderColor: "var(--ink)" }}>
                    {item.dataUrl ? (
                      <img src={item.dataUrl} alt={item.prompt || "Visitor drawing"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center opacity-60">
                        <span className="font-display text-2xl uppercase">{item.type === "ai" ? "AI Concept" : "Hand-Drawn"}</span>
                        {item.prompt && <p className="mt-2 font-serif italic">{item.prompt}</p>}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: "var(--ink)" }}>
                        {item.type === "ai" ? "AI Generated" : "Hand-Drawn"}
                      </span>
                      {item.sector && (
                        <span className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: "var(--ink)" }}>
                          {item.sector}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-serif text-lg italic">{item.artistName}</p>
                    {item.prompt && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">{item.prompt}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
