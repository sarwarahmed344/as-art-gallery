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

// Add new approved fan pieces here.
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
  imageUrl: z.string().trim().url("Paste a public link to your image (Drive, Imgur, etc.)").max(500),
  note: z.string().trim().min(5, "A short note please").max(500),
});

function FanWallPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const inputCls =
    "w-full rounded-lg border border-stone-700/30 bg-white/80 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none transition focus:border-stone-800";

  return (
    <div
      className="min-h-screen text-stone-900"
      style={{
        background:
          "radial-gradient(circle at 70% 30%, #fff4e0 0%, #f4ddb8 50%, #d8b97e 100%)",
      }}
    >
      <Navbar />
      <main className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
        />
        <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-700 transition hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl">
            Fan Wall
          </h1>
          <p className="mt-4 max-w-xl text-sm text-stone-800/80">
            Art from the community. Send yours through the form below and I'll pin it up here once reviewed.
          </p>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRIES.map((e) => (
              <article
                key={e.id}
                className="relative"
                style={{ transform: `rotate(${e.rotate ?? 0}deg)` }}
              >
                <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 -translate-y-2 bg-rose-300/70 shadow-sm" />
                <div className="border border-stone-800/20 bg-white/85 p-3 shadow-[0_10px_25px_rgba(80,50,20,0.25)]">
                  <div className="flex aspect-square w-full items-center justify-center border border-dashed border-stone-500/50 bg-stone-100/60">
                    {e.src ? (
                      <img src={e.src} alt={`Fan art by ${e.name}`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="px-4 text-center text-xs uppercase tracking-[0.25em] text-stone-500">
                        your piece could be here
                      </span>
                    )}
                  </div>
                  <div className="mt-3 px-1 pb-1">
                    <p className="font-display text-sm font-semibold">{e.name}</p>
                    <a
                      href={`https://instagram.com/${e.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-stone-700 hover:text-black"
                    >
                      <Instagram className="h-3 w-3" /> @{e.handle}
                    </a>
                    <p className="mt-2 text-[13px] italic leading-snug text-stone-700">
                      {e.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-2xl px-6 pb-24">
          <div className="rounded-xl border border-stone-800/20 bg-white/80 p-8 shadow-[0_12px_30px_rgba(80,50,20,0.2)]">
            <h2 className="font-display text-3xl font-bold">Submit your piece</h2>
            <p className="mt-2 text-sm text-stone-700">
              Submissions are sent to AS over WhatsApp. Reviewed before going up.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-700">Your name *</label>
                <input name="name" type="text" maxLength={80} required className={inputCls} placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-700">Instagram handle *</label>
                <input name="handle" type="text" maxLength={50} required className={inputCls} placeholder="@yourhandle" />
                {errors.handle && <p className="mt-1 text-xs text-red-700">{errors.handle}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-700">Image link *</label>
                <input
                  name="imageUrl"
                  type="url"
                  maxLength={500}
                  required
                  className={inputCls}
                  placeholder="https://… (Drive, Imgur, Instagram post)"
                />
                <p className="mt-1 text-[11px] text-stone-600">Tip: upload your image somewhere public and paste the link.</p>
                {errors.imageUrl && <p className="mt-1 text-xs text-red-700">{errors.imageUrl}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-700">Short note *</label>
                <textarea
                  name="note"
                  rows={4}
                  maxLength={500}
                  required
                  className={inputCls + " resize-none"}
                  placeholder="What's this piece? A line about it…"
                />
                {errors.note && <p className="mt-1 text-xs text-red-700">{errors.note}</p>}
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800"
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
