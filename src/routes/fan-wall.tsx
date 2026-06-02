import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Instagram } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/fan-wall")({
  head: () => ({
    meta: [
      { title: "Fan Wall — AS Art Gallery" },
      { name: "description", content: "Fan art submitted by the AS community. Submit your own piece — reviewed before it goes up." },
      { property: "og:title", content: "Fan Wall — AS" },
      { property: "og:description", content: "Community fan art for AS (@sarwarr.rr)." },
    ],
  }),
  component: FanWallPage,
});

type FanEntry = { id: string; name: string; handle: string; note: string; src?: string; rotate?: number };

const ENTRIES: FanEntry[] = [
  {
    id: "fan-1",
    name: "Be the first",
    handle: "yourhandle",
    note: "Submit a piece using the form below — I review every one personally.",
    rotate: -1.5,
  },
];

const Schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  handle: z.string().trim().min(1, "Instagram handle required").max(50),
  imageUrl: z.string().trim().url("Paste a public link").max(500),
  note: z.string().trim().min(5, "A short note please").max(500),
});

function FanWallPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      handle: fd.get("handle"),
      imageUrl: fd.get("imageUrl"),
      note: fd.get("note"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as string;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      setShakeKey((k) => k + 1);
      return;
    }
    setErrors({});
    const { name, handle, imageUrl, note } = parsed.data;
    const lines = [
      "Hey AS! I'd like to submit a piece for the Fan Wall.",
      "",
      `Name: ${name}`,
      `Instagram: @${handle.replace(/^@/, "")}`,
      `Image: ${imageUrl}`,
      "",
      "Note:",
      note,
    ];
    const url = `https://wa.me/919059551017?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldWrap = (k: string) => `input-ink-wrap ${errors[k] ? "has-error" : ""}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Fan Wall · Vol. 01</span>
            <h1 className="font-display text-5xl font-bold leading-[0.9] sm:text-7xl">THE FAN WALL</h1>
            <p className="mt-3 font-serif text-lg italic opacity-80 sm:text-xl">Art inspires art.</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
              All submissions are reviewed before appearing.
            </p>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRIES.map((e) => (
              <article
                key={e.id}
                className="relative panel panel-hover-thicken p-3"
                style={{ transform: `rotate(${e.rotate ?? 0}deg)` }}
              >
                {/* Pin mark */}
                <div
                  className="absolute left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1.5 rounded-full"
                  style={{ background: "var(--ink)" }}
                />
                <div
                  className="flex aspect-square w-full items-center justify-center border-2 border-dashed"
                  style={{ borderColor: "var(--ink)", background: "var(--card)" }}
                >
                  {e.src ? (
                    <img src={e.src} alt={`Fan art by ${e.name}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                      your piece could be here
                    </span>
                  )}
                </div>
                <div className="mt-3 px-1 pb-1">
                  <p className="font-display text-base">{e.name}</p>
                  <a
                    href={`https://instagram.com/${e.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] underline-offset-4 hover:underline"
                  >
                    <Instagram className="h-3 w-3" /> @{e.handle}
                  </a>
                  <p className="mt-2 text-[13px] italic leading-snug opacity-85">{e.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-2xl px-4 pb-24">
          <div className="panel p-8 sm:p-10">
            <span className="chapter-marker">Submission Form</span>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">Submit your piece</h2>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-65">
              Sent via WhatsApp · Reviewed before going up
            </p>
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Your name *</label>
                <input name="name" type="text" maxLength={80} required className="input-ink" placeholder="Your name" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.name}</p>}
              </div>
              <div className={fieldWrap("handle")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Instagram handle *</label>
                <input name="handle" type="text" maxLength={50} required className="input-ink" placeholder="@yourhandle" />
                {errors.handle && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.handle}</p>}
              </div>
              <div className={fieldWrap("imageUrl")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Image link *</label>
                <input name="imageUrl" type="url" maxLength={500} required className="input-ink" placeholder="https://… (Drive, Imgur, Instagram)" />
                {errors.imageUrl && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.imageUrl}</p>}
              </div>
              <div className={fieldWrap("note")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Short note *</label>
                <textarea name="note" rows={4} maxLength={500} required className="input-ink resize-none" placeholder="What's this piece? A line about it…" />
                {errors.note && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.note}</p>}
              </div>
              <button type="submit" className="btn-ink inline-flex items-center gap-2">
                Send for review <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
