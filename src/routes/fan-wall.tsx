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
      {
        name: "description",
        content:
          "Fan art submitted by the AS community. Submit your own piece — reviewed before it goes up.",
      },
      { property: "og:title", content: "Fan Wall — AS" },
      { property: "og:description", content: "Community fan art for AS (@sarwarr.rr)." },
    ],
  }),
  component: FanWallPage,
});

type FanEntry = {
  id: string;
  name: string;
  handle: string;
  note: string;
  src?: string;
  rotate?: number;
};

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
  imageUrl: z.string().trim().url("Paste a public link to your image").max(500),
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
    <div className="min-h-screen cork-board text-stone-200">
      <Navbar />
      <main className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
          }}
        />
        <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-stone-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <h1 className="mt-10 font-display text-6xl font-bold tracking-tight sm:text-8xl">
            THE FAN WALL
          </h1>
          <p className="mt-3 font-serif text-xl italic text-stone-300/85">Art inspires art.</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500">
            All submissions are reviewed before appearing.
          </p>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRIES.map((e) => (
              <article
                key={e.id}
                className="relative"
                style={{ transform: `rotate(${e.rotate ?? 0}deg)` }}
              >
                {/* pin */}
                <div className="absolute left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1.5 rounded-full bg-rose-500 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                <div className="border border-stone-700/50 bg-stone-900/70 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <div className="flex aspect-square w-full items-center justify-center border border-dashed border-stone-600/50 bg-stone-950/60">
                    {e.src ? (
                      <img src={e.src} alt={`Fan art by ${e.name}`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="px-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500">
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
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-stone-400 hover:text-white"
                    >
                      <Instagram className="h-3 w-3" /> @{e.handle}
                    </a>
                    <p className="mt-2 text-[13px] italic leading-snug text-stone-300">{e.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-2xl px-6 pb-24">
          <div className="glass-dark rounded-2xl p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">Submit your piece</h2>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-stone-400">
              Sent via WhatsApp · Reviewed before going up
            </p>
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">Your name *</label>
                <input name="name" type="text" maxLength={80} required className="input-ink" placeholder="Your name" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.name}</p>}
              </div>
              <div className={fieldWrap("handle")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">Instagram handle *</label>
                <input name="handle" type="text" maxLength={50} required className="input-ink" placeholder="@yourhandle" />
                {errors.handle && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.handle}</p>}
              </div>
              <div className={fieldWrap("imageUrl")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">Image link *</label>
                <input name="imageUrl" type="url" maxLength={500} required className="input-ink" placeholder="https://… (Drive, Imgur, Instagram post)" />
                {errors.imageUrl && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.imageUrl}</p>}
              </div>
              <div className={fieldWrap("note")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">Short note *</label>
                <textarea name="note" rows={4} maxLength={500} required className="input-ink resize-none" placeholder="What's this piece? A line about it…" />
                {errors.note && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.note}</p>}
              </div>
              <button
                type="submit"
                className="btn-ink inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-base uppercase tracking-[0.3em]"
              >
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
