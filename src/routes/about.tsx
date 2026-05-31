import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Mail, Phone, Pen, Pencil, FileText, Palette, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AS — Art Gallery by @sarwarr.rr" },
      { name: "description", content: "About AS — concept artist exploring anime, football and Bollywood through ink and high-voltage color." },
      { property: "og:title", content: "About AS" },
      { property: "og:description", content: "The artist behind the AS Art Gallery." },
      { property: "og:url", content: "https://asarts.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://asarts.lovable.app/about" }],
  }),
  component: AboutPage,
});

const TOOLS = [
  { icon: Pen, name: "0.3mm Micron Pen", desc: "The main weapon" },
  { icon: Pencil, name: "Graphite", desc: "Where drafts live" },
  { icon: FileText, name: "A4 Cartridge Paper", desc: "The battlefield" },
  { icon: Palette, name: "Alcohol Markers", desc: "For when mono isn't enough" },
];

const SITE_LINKS = [
  { label: "Instagram", href: "https://instagram.com/sarwarr.rr", sub: "@sarwarr.rr" },
  { label: "NewGen11", href: "https://instagram.com/newgen11.art", sub: "side project" },
  { label: "WhatsApp", href: "https://wa.me/919059551017", sub: "+91 90595 51017" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-15 blur-3xl"
          style={{ background: "var(--gradient-vivid)" }}
        />

        {/* Hero */}
        <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <h1 className="mt-12 font-display text-[22vw] font-bold leading-[0.85] tracking-tighter sm:text-[14rem]">
            AS
          </h1>
          <p className="mt-4 font-serif text-xl italic text-white/75 sm:text-2xl">
            The name on every piece.
          </p>
        </section>

        {/* Bio */}
        <section className="relative mx-auto max-w-3xl px-6 pb-16">
          <div className="space-y-6 text-base leading-relaxed text-white/80">
            <p>
              I draw under the pen name <span className="font-semibold text-white">AS</span> — just my initials, nothing fancy.
              It started as a quick signature on the corner of a sketchpad and stuck. Two letters, two sides of the same brain:
              the one that gets lost in the silence of graphite, and the one that lives for screaming neon.
            </p>
            <p>
              My work is split between the <Link to="/sketches" className="underline decoration-dotted underline-offset-4 hover:text-white">Monochrome Sector</Link> —
              pure ink, cross-hatching, noir portraits — and the <Link to="/colors" className="underline decoration-dotted underline-offset-4 hover:text-white">Vivid Spectrum</Link>,
              where anime and pop-art collide in saturated color.
            </p>
            <p>
              <span className="text-white/60">Influences: </span>
              anime (Jujutsu Kaisen, AOT, Tokyo Revengers, <span className="font-medium text-white">Blue Lock</span>),
              football culture (Ronaldo, Messi, Neymar) and Bollywood icons (SRK, Allu Arjun) — the heroes I grew up worshipping.
            </p>
          </div>
        </section>

        {/* Tools grid */}
        <section className="relative mx-auto max-w-5xl px-6 pb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">Tools I live by</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">The Kit</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.name}
                  className="glass-dark group rounded-xl p-6 transition-all hover:-translate-y-1 hover:border-white/30"
                >
                  <Icon className="h-6 w-6 text-white/70 transition group-hover:text-white" />
                  <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{t.name}</p>
                  <p className="mt-1 font-serif text-sm italic text-white/55">"{t.desc}"</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Site links */}
        <section className="relative mx-auto max-w-5xl px-6 pb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">Find me</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Around the Web</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {SITE_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark group flex items-center justify-between rounded-xl p-6 transition-all hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
              >
                <div>
                  <p className="font-display text-xl text-white">{l.label}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">{l.sub}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-white/50 transition group-hover:text-white" />
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
            <a href="mailto:sarwarahmed344@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5" /> sarwarahmed344@gmail.com
            </a>
            <span className="opacity-30">·</span>
            <a href="https://wa.me/919059551017" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <span className="opacity-30">·</span>
            <a href="https://instagram.com/sarwarr.rr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <Instagram className="h-3.5 w-3.5" /> @sarwarr.rr
            </a>
          </div>

          <div className="mt-10">
            <Link
              to="/commission"
              className="btn-ink inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-base uppercase tracking-[0.3em]"
            >
              Request a Piece →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
