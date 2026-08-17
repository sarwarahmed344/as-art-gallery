import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join as an Artist — AS Art Gallery" },
      { name: "description", content: "Apply to show your work on AS Art Gallery. Send your name, bio and contact details — approved artists get their own space." },
      { property: "og:title", content: "Join as an Artist — AS Art Gallery" },
      { property: "og:description", content: "Apply to show your work on AS Art Gallery." },
    ],
  }),
  component: JoinPage,
});

const Schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  bio: z.string().trim().min(10, "Tell us a bit more").max(600),
  email: z.string().trim().email("Valid email required"),
  password: z.string().min(8, "At least 8 characters"),
  whatsapp: z.string().trim().max(20).optional().or(z.literal("")),
});

const WHATSAPP_NUMBER = "919059551075";

function JoinPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      bio: fd.get("bio"),
      email: fd.get("email"),
      password: fd.get("password"),
      whatsapp: fd.get("whatsapp") ?? "",
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
    const { name, bio, email, whatsapp } = parsed.data;
    const msg = `Hi AS, I'd like to join the gallery as an artist. Name: ${name}. Email: ${email}. WhatsApp: ${whatsapp || "—"}. Bio: ${bio}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const fieldWrap = (k: string) => `input-ink-wrap ${errors[k] ? "has-error" : ""}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-5xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Chapter 06</span>
            <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-8xl">
              JOIN AS<br />AN ARTIST
            </h1>
            <p className="mt-4 font-serif text-xl italic opacity-80">One gallery, many hands.</p>
            <p className="mt-4 max-w-2xl opacity-80">
              Tell us who you are and how to reach you. Every application is read by hand — approved artists get their own space on the gallery.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24">
          {sent ? (
            <div className="panel p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border-2" style={{ borderColor: "var(--ink)" }}>
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase">Application sent</h2>
              <p className="mt-2 font-serif italic opacity-80">AS will review it and get back to you on WhatsApp.</p>
              <Link to="/" className="btn-ink mt-6 inline-block">
                Back home
              </Link>
            </div>
          ) : (
            <form
              key={shakeKey}
              onSubmit={handleSubmit}
              className="panel space-y-8 p-8 sm:p-12"
              style={Object.keys(errors).length ? { animation: "shake 0.35s ease-in-out" } : undefined}
            >
              <div className={fieldWrap("name")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Display name *</label>
                <input name="name" type="text" maxLength={80} required className="input-ink" placeholder="Your artist name" />
                {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.name}</p>}
              </div>

              <div className={fieldWrap("bio")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Short bio *</label>
                <textarea
                  name="bio"
                  rows={4}
                  maxLength={600}
                  required
                  className="input-ink resize-none"
                  placeholder="A few lines about you and your work."
                />
                {errors.bio && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.bio}</p>}
              </div>

              <div className={fieldWrap("email")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Contact email *</label>
                <input name="email" type="email" required className="input-ink" placeholder="you@example.com" />
                {errors.email && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.email}</p>}
              </div>

              <div className={fieldWrap("password")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Password *</label>
                <input name="password" type="password" required className="input-ink" placeholder="At least 8 characters" />
                {errors.password && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">{errors.password}</p>}
              </div>

              <div className={fieldWrap("whatsapp")}>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">WhatsApp number (optional)</label>
                <input name="whatsapp" type="text" maxLength={20} className="input-ink" placeholder="+91 …" />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Profile photo (optional)</label>
                <input type="file" accept="image/*" className="font-mono text-[12px]" />
              </div>

              <button type="submit" className="btn-ink w-full sm:w-auto">
                Submit Application
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                Already applied? <span className="underline underline-offset-4 cursor-pointer">Artist login</span>
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
