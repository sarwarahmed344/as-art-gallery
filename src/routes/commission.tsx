import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { sketchImg, colorImg } from "@/lib/artAssets";
import { submitCommission } from "@/lib/commissions.functions";

export const Route = createFileRoute("/commission")({
  head: () => ({
    meta: [
      { title: "Request a Piece — AS Art Gallery" },
      { name: "description", content: "Commission a custom Monochrome or Vivid piece from AS (@sarwarr.rr). Four tiers from ₹500. Submissions go straight to WhatsApp." },
      { property: "og:title", content: "Request a Piece — AS Art Gallery" },
      { property: "og:description", content: "Four commission tiers from ₹500. Sent direct to WhatsApp." },
      { property: "og:url", content: "https://asartsgallery.lovable.app/commission" },
    ],
    links: [{ rel: "canonical", href: "https://asartsgallery.lovable.app/commission" }],
  }),
  component: CommissionPage,
});

const MAX_REF = 1000;
const WHATSAPP_NUMBER = "919059551075";

const TIERS = [
  {
    id: "tier1",
    num: "01",
    name: "Simple Monochrome",
    price: "₹500 – ₹1,000",
    priceShort: "₹500–1,000",
    thumbs: [
      { src: sketchImg("shawn-mendes"), title: "Shawn Mendes" },
      { src: sketchImg("lisa"), title: "Lisa (BLACKPINK)" },
      { src: sketchImg("jungkook"), title: "Jungkook (BTS)" },
    ],
    pills: ["Single figure", "Graphite or ink", "Simple or no background", "A4 cartridge paper"],
  },
  {
    id: "tier2",
    num: "02",
    name: "Detailed Monochrome",
    price: "₹1,000 – ₹1,800",
    priceShort: "₹1,000–1,800",
    thumbs: [
      { src: sketchImg("shahrukh"), title: "SRK (Rahul)" },
      { src: sketchImg("pushpa"), title: "Pushpa" },
      { src: sketchImg("ishrath"), title: "Ishrath" },
    ],
    pills: ["Heavy cross-hatching", "Accessories and costume detail", "Half or full body", "Background included"],
  },
  {
    id: "tier3",
    num: "03",
    name: "Color / Vivid",
    price: "₹1,800 – ₹2,500",
    priceShort: "₹1,800–2,500",
    thumbs: [
      { src: colorImg("deadpool-wolverine"), title: "Deadpool vs Wolverine" },
      { src: colorImg("ghadeer-e-khum"), title: "Imam Ali (Ghadeer)" },
      { src: colorImg("eren"), title: "Eren Yeager" },
    ],
    pills: ["Alcohol markers or color pencils", "Full composition", "Styled background", "Typography optional"],
  },
  {
    id: "tier4",
    num: "04",
    name: "Flagship",
    price: "₹2,500 – ₹3,000+",
    priceShort: "₹2,500–3,000+",
    thumbs: [
      { src: colorImg("theweeknd-dark"), title: "The Weeknd — After Hours" },
      { src: colorImg("vivian"), title: "Vivian Hugo" },
      { src: colorImg("messi"), title: "Messi — World Cup" },
    ],
    pills: ["Multi-figure or high concept", "Black paper available", "Maximum detail", "Final price on WhatsApp"],
  },
] as const;

const TIER_OPTIONS = [
  { value: "Tier 1", label: "Tier 1 (₹500–1,000)" },
  { value: "Tier 2", label: "Tier 2 (₹1,000–1,800)" },
  { value: "Tier 3", label: "Tier 3 (₹1,800–2,500)" },
  { value: "Tier 4", label: "Tier 4 (₹2,500–3,000+)" },
  { value: "Not sure", label: "Not sure — let AS decide" },
] as const;

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  instagram: z.string().trim().max(50).optional().or(z.literal("")),
  reference: z.string().trim().min(10, "Please describe (min 10 chars)").max(MAX_REF),
  style: z.enum(["Monochrome", "Vivid"], { message: "Pick a style" }),
  tier: z.enum(["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Not sure"], { message: "Pick a tier" }),
});

function CommissionPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [style, setStyle] = useState<"Monochrome" | "Vivid" | "">("");
  const [tier, setTier] = useState<string>("");
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
      tier: fd.get("tier"),
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
    const { name, instagram, reference, style: pickedStyle, tier: pickedTier } = parsed.data;
    const handle = instagram?.replace(/^@/, "").trim();
    const msg = `Hi AS, I'd like to commission a piece. Name: ${name}. Tier: ${pickedTier}. Style: ${pickedStyle}. Description: ${reference}. Instagram: ${handle ? "@" + handle : "—"}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const fieldWrap = (k: string) => `input-ink-wrap ${errors[k] ? "has-error" : ""}`;
  const scrollToForm = () => document.getElementById("commission-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-5xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          {/* HERO */}
          <div className="panel relative mt-6 overflow-hidden p-10 text-center sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Commission</span>
            <h1 className="font-display text-5xl font-bold leading-[0.9] sm:text-8xl">MAKE IT YOURS.</h1>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-base italic opacity-80 sm:text-lg">
              Every commission starts with a conversation. Pick your tier below, describe what you want, and I'll get back to you on WhatsApp with a final quote.
            </p>
          </div>
        </section>

        {/* TIERS */}
        <section className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="chapter-marker mb-5 block">Choose your tier</h2>
          <div className="flex flex-col gap-6">
            {TIERS.map((t) => (
              <article key={t.id} className="panel p-6 sm:p-8">
                <header className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[var(--ink)] pb-4">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                    <span className="opacity-50">{t.num}</span> · {t.name}
                  </h3>
                  <span className="font-mono text-sm tracking-[0.15em] sm:text-base">{t.price}</span>
                </header>

                <div className="mt-5 -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:overflow-visible sm:px-0">
                  {t.thumbs.map((th, i) => (
                    <figure key={i} className="flex shrink-0 flex-col items-center sm:flex-1">
                      <div className="w-[160px] sm:w-full">
                        {th.src ? (
                          <img
                            src={th.src}
                            alt={th.title}
                            loading="lazy"
                            className="block h-[140px] w-full border-2 border-[var(--ink)] object-cover"
                          />
                        ) : (
                          <div className="flex h-[140px] w-full items-center justify-center border-2 border-dashed border-[var(--ink)] font-mono text-[10px] uppercase opacity-50">
                            Missing
                          </div>
                        )}
                      </div>
                      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                        {th.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <div className="my-5 h-px w-full bg-[var(--ink)] opacity-30" />

                <ul className="flex flex-wrap gap-2">
                  {t.pills.map((p) => (
                    <li
                      key={p}
                      className="border border-[var(--ink)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => { setTier(t.priceShort.startsWith("₹500") ? "Tier 1" : t.priceShort.startsWith("₹1,000") ? "Tier 2" : t.priceShort.startsWith("₹1,800") ? "Tier 3" : "Tier 4"); scrollToForm(); }}
                  className="btn-ink mt-6 w-full sm:w-auto"
                >
                  Pick this tier
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section id="commission-form" className="mx-auto max-w-3xl px-4 pb-14 scroll-mt-24">
          <h2 className="chapter-marker mb-5 block">Request a piece</h2>

          {sent ? (
            <div className="panel p-12 text-center animate-fade-up">
              <div className="font-display text-6xl">✓ RECEIVED</div>
              <p className="mt-4 font-serif italic opacity-80">
                I'll get back to you soon. Check WhatsApp — the message is ready to send.
              </p>
              <button
                onClick={() => { setSent(false); setStyle(""); setTier(""); setRefCount(0); }}
                className="btn-ink mt-8"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className="panel space-y-7 p-8 sm:p-10"
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Your name *</label>
                <input name="name" type="text" className="input-ink" maxLength={80} required placeholder="Jane Doe" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.name}</p>}
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
                      <input type="radio" name="style" value={opt} className="sr-only" checked={style === opt} onChange={() => setStyle(opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.style && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.style}</p>}
              </div>

              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Tier preference *</span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {TIER_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="cursor-pointer border-2 px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.15em] transition"
                      style={
                        tier === opt.value
                          ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }
                          : { borderColor: "var(--ink)", background: "var(--background)", color: "var(--foreground)" }
                      }
                    >
                      <input type="radio" name="tier" value={opt.value} className="sr-only" checked={tier === opt.value} onChange={() => setTier(opt.value)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.tier && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.tier}</p>}
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

        {/* PROCESS */}
        <section className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="chapter-marker mb-6 block">How it works</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Send your request", d: "Fill the form with your reference image or description and your preferred tier. It hits my WhatsApp directly." },
              { n: "02", t: "We confirm", d: "I'll reply on WhatsApp to confirm the complexity, final price, and estimated turnaround before starting." },
              { n: "03", t: "You receive", d: "Finished piece delivered as a high-resolution scan. Physical delivery within Hyderabad available on request." },
            ].map((s) => (
              <div key={s.n} className="border-t-2 border-[var(--ink)] pt-4">
                <div className="font-display text-5xl font-bold leading-none opacity-60">{s.n}</div>
                <h3 className="mt-3 font-display text-xl uppercase tracking-tight">{s.t}</h3>
                <p className="mt-2 font-serif text-base leading-relaxed opacity-80">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PAYMENT QR */}
        <section className="mx-auto max-w-3xl px-4 pb-14">
          <h2 className="chapter-marker mb-5 block">Payment</h2>
          <div className="panel p-8 sm:p-10 text-center">
            <p className="font-serif text-lg italic opacity-80">
              After we confirm your commission on WhatsApp, scan the QR below to complete the advance payment.
            </p>
            <div className="mt-6 inline-block border-2 p-2" style={{ borderColor: "var(--ink)" }}>
              <img
                src="/payment-qr.png"
                alt="UPI payment QR for AS Art Gallery"
                width={240}
                height={240}
                className="block"
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              UPI · 9059551075
            </p>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <section className="mx-auto max-w-3xl px-4 pb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
            All prices are starting points. Final quote depends on complexity, reference detail, and paper used. Every piece is hand-drawn on A4 cartridge paper in Hyderabad.
          </p>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
