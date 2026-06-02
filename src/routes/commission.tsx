import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Request a Piece — AS Art Gallery" },
      { name: "description", content: "Request a custom Monochrome or Vivid piece from AS (@sarwarr.rr). Submissions are sent directly via WhatsApp." },
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
  name: z.string().trim().min(1, "Name is required").max(80),
  instagram: z.string().trim().max(50).optional().or(z.literal("")),
  reference: z.string().trim().min(10, "Please describe (min 10 chars)").max(MAX_REF),
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
        const k = issue.path[0] as string;
        if (!errs[k]) errs[k] = issue.message;
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

  const fieldWrap = (k: string) => `input-ink-wrap ${errors[k] ? "has-error" : ""}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-3xl px-4 pt-8 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 text-center sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Commission</span>
            <h1 className="font-display text-5xl font-bold leading-[0.9] sm:text-8xl">MAKE IT YOURS</h1>
            <p className="mt-4 font-serif text-lg italic opacity-80 sm:text-xl">Every commission starts with a conversation.</p>
          </div>

          {sent ? (
            <div className="panel mt-10 p-12 text-center animate-fade-up">
              <div className="font-display text-6xl">✓ RECEIVED</div>
              <p className="mt-4 font-serif italic opacity-80">
                I'll get back to you soon. Check WhatsApp — the message is ready to send.
              </p>
              <button
                onClick={() => { setSent(false); setStyle(""); setRefCount(0); }}
                className="btn-ink mt-8"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className="panel mt-10 space-y-7 p-8 sm:p-10"
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Your name *</label>
                <input name="name" type="text" className="input-ink" maxLength={80} required placeholder="Jane Doe" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--ink)" }}>{errors.name}</p>}
              </div>

              <div className={fieldWrap("instagram")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Instagram handle (optional)</label>
                <input name="instagram" type="text" className="input-ink" maxLength={50} placeholder="@yourhandle" />
              </div>

              <div className={fieldWrap("reference")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Reference / description *</label>
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
                  <span>{errors.reference ?? ""}</span>
                  <span className="opacity-60">{refCount} / {MAX_REF}</span>
                </div>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Style preference *</span>
                <div className="grid grid-cols-2 gap-3">
                  {(["Monochrome", "Vivid"] as const).map((opt) => (
                    <label
                      key={opt}
                      className="cursor-pointer border-2 px-4 py-3 text-center font-display text-base uppercase tracking-[0.15em] transition"
                      style={
                        style === opt
                          ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }
                          : { borderColor: "var(--ink)", background: "var(--background)", color: "var(--foreground)" }
                      }
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
                {errors.style && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.style}</p>}
              </div>

              <button type="submit" className="btn-ink w-full">Send via WhatsApp</button>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                Prefer email?{" "}
                <a href="mailto:sarwarahmed344@gmail.com" className="underline underline-offset-4">
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
