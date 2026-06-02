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
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-5xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 text-center sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">About · Vol. 01</span>
            <h1 className="font-display text-[22vw] font-bold leading-[0.85] sm:text-[12rem]">AS</h1>
            <p className="mt-4 font-serif text-xl italic opacity-80 sm:text-2xl">The name on every piece.</p>
          </div>
        </section>

        {/* Bio panel */}
        <section className="relative mx-auto max-w-3xl px-4 pb-12">
          <div className="panel space-y-5 p-8 text-base leading-relaxed opacity-90 sm:p-10">
            <span className="chapter-marker">Bio</span>
            <p>
              I draw under the pen name <span className="font-semibold">AS</span> — just my initials, nothing fancy.
              It started as a quick signature on the corner of a sketchpad and stuck. Two letters, two sides of the same brain:
              the one that gets lost in the silence of graphite, and the one that lives for screaming neon.
            </p>
            <p>
              My work is split between the <Link to="/sketches" className="underline-offset-4 hover:underline">Monochrome Sector</Link> —
              pure ink, cross-hatching, noir portraits — and the <Link to="/colors" className="underline-offset-4 hover:underline">Vivid Spectrum</Link>,
              where anime and pop-art collide in saturated color.
            </p>
            <p>
              <span className="opacity-70">Influences: </span>
              anime (Jujutsu Kaisen, AOT, Tokyo Revengers, <span className="font-semibold">Blue Lock</span>),
              football culture (Ronaldo, Messi, Neymar) and Bollywood icons (SRK, Allu Arjun) — the heroes I grew up worshipping.
            </p>
          </div>
        </section>

        {/* Tools strip — 4 panels */}
        <section className="relative mx-auto max-w-5xl px-4 pb-12">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">THE KIT</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="panel panel-hover-thicken p-6">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                  <p className="mt-4 font-display text-lg uppercase tracking-wide">{t.name}</p>
                  <p className="mt-1 font-serif text-sm italic opacity-70">"{t.desc}"</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Site links */}
        <section className="relative mx-auto max-w-5xl px-4 pb-24">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">AROUND THE WEB</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {SITE_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover-thicken flex items-center justify-between p-6"
              >
                <div>
                  <p className="font-display text-xl">{l.label}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] opacity-65">{l.sub}</p>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-75">
            <a href="mailto:sarwarahmed344@gmail.com" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <Mail className="h-3.5 w-3.5" /> sarwarahmed344@gmail.com
            </a>
            <a href="https://wa.me/919059551017" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <Phone className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a href="https://instagram.com/sarwarr.rr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <Instagram className="h-3.5 w-3.5" /> @sarwarr.rr
            </a>
          </div>

          <div className="mt-10">
            <Link to="/commission" className="btn-ink inline-flex items-center justify-center">
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
