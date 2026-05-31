import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SplitSectorBackground } from "@/components/SplitSectorBackground";

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

const MAX_REF = 1000;

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Keep it under 80 characters"),
  instagram: z.string().trim().max(50, "Too long").optional().or(z.literal("")),
  reference: z
    .string()
    .trim()
    .min(10, "Please describe what you'd like (min 10 chars)")
    .max(MAX_REF, `Keep it under ${MAX_REF} characters`),
  style: z.enum(["Monochrome", "Vivid"], { message: "Pick a style" }),
});

function CommissionPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [style, setStyle] = useState<"Monochrome" | "Vivid" | "">("");
  const [refCount, setRefCount] = useState(0);
  const [sent, setSent] = useState(false);

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
      setShakeKey((k) => k + 1);
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
    setSent(true);
  };

  const fieldWrap = (k: string) =>
    `input-ink-wrap ${errors[k] ? "has-error" : ""}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <SplitSectorBackground />
        </div>
        <section className="relative mx-auto max-w-2xl px-6 pt-32 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="mt-10 text-center">
            <h1 className="font-display text-6xl font-bold tracking-tight sm:text-8xl">
              MAKE IT YOURS
            </h1>
            <p className="mt-4 font-serif text-xl italic text-white/75">
              Every commission starts with a conversation.
            </p>
          </div>

          {sent ? (
            <div
              className="mt-14 glass-dark rounded-2xl p-12 text-center animate-fade-up"
            >
              <div className="font-display text-6xl text-white">✓ Received</div>
              <p className="mt-4 font-serif italic text-white/75">
                I'll get back to you soon. Check WhatsApp — the message is ready to send.
              </p>
              <button
                onClick={() => { setSent(false); setStyle(""); setRefCount(0); }}
                className="btn-ink mt-8 rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em]"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className={`mt-14 glass-dark rounded-2xl p-8 sm:p-10 space-y-7 ${
                Object.keys(errors).length ? "animate-shake" : ""
              }`}
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                  Your name *
                </label>
                <input name="name" type="text" className="input-ink" maxLength={80} required placeholder="Jane Doe" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.name}</p>}
              </div>

              <div className={fieldWrap("instagram")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                  Instagram handle (optional)
                </label>
                <input name="instagram" type="text" className="input-ink" maxLength={50} placeholder="@yourhandle" />
              </div>

              <div className={fieldWrap("reference")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                  Reference / description *
                </label>
                <textarea
                  name="reference"
                  rows={5}
                  maxLength={MAX_REF}
                  className="input-ink resize-none"
                  required
                  placeholder="Who or what should I draw? Pose, vibe, references, deadline…"
                  onChange={(e) => setRefCount(e.target.value.length)}
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-red-400">{errors.reference ?? ""}</span>
                  <span className="text-white/40">{refCount} / {MAX_REF}</span>
                </div>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">Style preference *</span>
                <div className="grid grid-cols-2 gap-3">
                  {(["Monochrome", "Vivid"] as const).map((opt) => (
                    <label
                      key={opt}
                      className={`cursor-pointer rounded-lg border px-4 py-3 text-center font-display text-base uppercase tracking-[0.15em] transition ${
                        style === opt
                          ? "border-white bg-white/10 text-white"
                          : "border-white/15 text-white/65 hover:border-white/40"
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
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.style && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">{errors.style}</p>}
              </div>

              <button
                type="submit"
                className="btn-ink w-full rounded-full py-4 font-display text-lg uppercase tracking-[0.3em]"
              >
                Send via WhatsApp
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Prefer email?{" "}
                <a href="mailto:sarwarahmed344@gmail.com" className="underline decoration-dotted underline-offset-4 hover:text-white">
                  sarwarahmed344@gmail.com
                </a>
              </p>
            </form>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
