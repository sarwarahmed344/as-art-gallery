import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Request a Piece — AS Art Gallery" },
      {
        name: "description",
        content:
          "Request a custom Monochrome or Vivid piece from AS (@sarwarr.rr). Submissions are sent directly via WhatsApp.",
      },
      { property: "og:title", content: "Request a Piece — AS Art Gallery" },
      { property: "og:description", content: "Order a custom sketch or colored piece from AS." },
      { property: "og:url", content: "https://asarts.lovable.app/commission" },
    ],
    links: [{ rel: "canonical", href: "https://asarts.lovable.app/commission" }],
  }),
  component: CommissionPage,
});

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Keep it under 80 characters"),
  instagram: z.string().trim().max(50, "Too long").optional().or(z.literal("")),
  reference: z
    .string()
    .trim()
    .min(10, "Please describe what you'd like (min 10 chars)")
    .max(1000, "Keep it under 1000 characters"),
  style: z.enum(["Monochrome", "Vivid"], { message: "Pick a style" }),
});

function CommissionPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [style, setStyle] = useState<"Monochrome" | "Vivid" | "">("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      instagram: fd.get("instagram") ?? "",
      reference: fd.get("reference"),
      style: fd.get("style"),
    });

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});

    const { name, instagram, reference, style: pickedStyle } = parsed.data;
    const handle = instagram?.replace(/^@/, "").trim();
    const lines = [
      "Hi AS! I'd like to request a piece.",
      "",
      `Name: ${name}`,
      handle ? `Instagram: @${handle}` : "Instagram: —",
      `Style: ${pickedStyle}`,
      "",
      "Reference / description:",
      reference,
    ];
    const url = `https://wa.me/919059551017?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/50 focus:bg-white/[0.06]";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-15 blur-3xl"
          style={{ background: "var(--gradient-vivid)" }}
        />
        <section className="relative mx-auto max-w-2xl px-6 pt-32 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">Hire the artist</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tighter sm:text-6xl">
            Request a Piece
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/65">
            Drop the details below. Hitting submit opens WhatsApp pre-filled — you just press send and we take it from there.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">
                Your name *
              </label>
              <input id="name" name="name" type="text" className={inputCls} placeholder="Jane Doe" maxLength={80} required />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="instagram" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">
                Instagram handle (optional)
              </label>
              <input id="instagram" name="instagram" type="text" className={inputCls} placeholder="@yourhandle" maxLength={50} />
              {errors.instagram && <p className="mt-1.5 text-xs text-red-400">{errors.instagram}</p>}
            </div>

            <div>
              <label htmlFor="reference" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">
                Reference / description *
              </label>
              <textarea
                id="reference"
                name="reference"
                rows={5}
                maxLength={1000}
                className={inputCls + " resize-none"}
                placeholder="Who or what should I draw? Pose, vibe, references, deadline…"
                required
              />
              {errors.reference && <p className="mt-1.5 text-xs text-red-400">{errors.reference}</p>}
            </div>

            <div>
              <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">Style preference *</span>
              <div className="grid grid-cols-2 gap-3">
                {(["Monochrome", "Vivid"] as const).map((opt) => (
                  <label
                    key={opt}
                    className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm transition ${
                      style === opt
                        ? "border-white/70 bg-white/10 text-white"
                        : "border-white/15 bg-white/[0.03] text-white/70 hover:border-white/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={opt}
                      className="sr-only"
                      checked={style === opt}
                      onChange={() => setStyle(opt)}
                    />
                    {opt === "Monochrome" ? "Monochrome (Ink)" : "Vivid (Color)"}
                  </label>
                ))}
              </div>
              {errors.style && <p className="mt-1.5 text-xs text-red-400">{errors.style}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 sm:w-auto"
            >
              Send via WhatsApp <Send className="h-4 w-4" />
            </button>
            <p className="text-xs text-white/45">
              Prefer email? Write to{" "}
              <a href="mailto:sarwarahmed344@gmail.com" className="underline decoration-dotted underline-offset-4 hover:text-white">
                sarwarahmed344@gmail.com
              </a>
              .
            </p>
          </form>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
