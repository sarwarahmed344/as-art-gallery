import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AS — Art Gallery by @sarwarr.rr" },
      {
        name: "description",
        content:
          "About AS — sketch and concept artist exploring anime, football, Bollywood and Blue Lock through ink and high-voltage color.",
      },
      { property: "og:title", content: "About AS" },
      { property: "og:description", content: "The artist behind the AS Art Gallery." },
      { property: "og:url", content: "https://asarts.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://asarts.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-20 blur-3xl"
          style={{ background: "var(--gradient-vivid)" }}
        />
        <section className="relative mx-auto max-w-3xl px-6 pt-32 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">The Artist</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tighter sm:text-6xl">
            About AS
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-white/80">
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
              football culture (Ronaldo, Messi, Neymar) and Bollywood icons (SRK, Allu Arjun) — basically the heroes I grew up worshipping.
            </p>
            <p>
              <span className="text-white/60">Tools I live by: </span>
              0.05–0.8mm Micron pens, mechanical pencils, A4 cartridge paper, alcohol markers and the occasional iPad for color studies.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="mailto:sarwarahmed344@gmail.com" className="inline-flex items-center gap-3 text-white/90 hover:text-white">
                <Mail className="h-4 w-4" /> sarwarahmed344@gmail.com
              </a>
              <a href="https://wa.me/919059551017" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/90 hover:text-white">
                <Phone className="h-4 w-4" /> +91 90595 51017 (WhatsApp)
              </a>
              <a href="https://instagram.com/sarwarr.rr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/90 hover:text-white">
                <Instagram className="h-4 w-4" /> @sarwarr.rr
              </a>
            </div>
            <div className="mt-5">
              <Link
                to="/commission"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Request a commission →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
