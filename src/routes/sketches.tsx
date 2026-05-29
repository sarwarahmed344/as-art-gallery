import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Gallery, type ArtItem } from "@/components/Gallery";
import { SplitSectorBackground } from "@/components/SplitSectorBackground";
import { sketchImg } from "@/lib/artAssets";

export const Route = createFileRoute("/sketches")({
  head: () => ({
    meta: [
      { title: "Monochrome Sector — AS Art Gallery" },
      {
        name: "description",
        content: "Noir ink and graphite sketches by AS. High-contrast portraits in black and white.",
      },
      { property: "og:title", content: "Monochrome Sector — AS" },
      { property: "og:description", content: "Noir sketch gallery by AS (@sarwarr.rr)." },
    ],
  }),
  component: SketchesPage,
});

const ITEMS: ArtItem[] = [
  {
    id: "moosa",
    name: "Moosa",
    instaHandle: "_moosa_143",
    idOnly: true,
    src: sketchImg("moosa"),
  },
  {
    id: "akber",
    name: "Akber Abedi",
    instaHandle: "__akbar__abedi_",
    idOnly: true,
    src: sketchImg("akber"),
  },
  {
    id: "shahrukh",
    name: "Shahrukh Khan",
    instaHandle: "iamsrk",
    dialogue: "Rahul... naam toh suna hi hoga?",
    like: "I went really hard on the cross-hatching across his rings and watch — and the reflection on those aviators is my favourite bit on the whole page.",
    medium: "0.3mm Micron Pen · A4 Cartridge Paper",
    year: "2024",
    categories: ["Bollywood", "Portrait", "Ink", "Cross-hatch", "Realistic"],
    src: sketchImg("shahrukh"),
  },
  {
    id: "pushpa",
    name: "Pushpa Raj (Allu Arjun)",
    instaHandle: "alluarjunonline",
    dialogue: "Pushpa... Pushpa Raj. Main jhukega nahi, saala!",
    like: "I wanted the attitude in his posture to do most of the talking. Stacking fine layered strokes through the beard is what finally sold the texture for me.",
    medium: "0.05–0.5mm Micron Pen · A4",
    year: "2024",
    categories: ["Bollywood", "Portrait", "Ink", "Cross-hatch"],
    src: sketchImg("pushpa"),
  },
  {
    id: "ronaldo-trophy",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "Your love makes me strong, your hate makes me unstoppable.",
    like: "I tried to bottle the emotion of him holding that trophy — the sharp highlights on the metal were my excuse to chase real shine with just ink.",
    medium: "Graphite + 0.3mm Ink Liner · A4",
    year: "2024",
    categories: ["Football", "Portrait", "Ink", "Realistic"],
    src: sketchImg("ronaldo-trophy"),
  },
  {
    id: "leon",
    name: "Leon S. Kennedy",
    dialogue: "Try using knives next time. Better for close encounters.",
    like: "I leaned hard into the noir lighting and let the bottom half of the page drown in black — all so his eyes could carry the whole drawing.",
    medium: "0.05–0.8mm Micron Pen · A4",
    year: "2025",
    categories: ["Games", "Portrait", "Ink", "Cross-hatch"],
    src: sketchImg("leon"),
  },
  {
    id: "neymar",
    name: "Neymar Jr",
    instaHandle: "neymarjr",
    dialogue: "I do not play football to win the Ballon d'Or. I play football to be happy, because I love it.",
    like: "I packed the headband with dense cross-hatching on purpose so it would contrast against the smoother skin shading I built up on his profile.",
    medium: "0.3mm Micron Pen · A4 Cartridge Paper",
    year: "2025",
    categories: ["Football", "Portrait", "Ink", "Cross-hatch"],
    src: sketchImg("neymar"),
  },
];

function SketchesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative">
        <div className="grain absolute inset-0 pointer-events-none" />
        <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl">
            Monochrome Sector
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/60">
            Ink. Graphite. Shadow. A collection of high-contrast noir portraits — every line drawn by hand. Hover any piece to read the notes.
          </p>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          <Gallery
            items={ITEMS}
            variant="mono"
            filters={["Portrait", "Cross-hatch", "Ink", "Realistic", "Bollywood", "Football", "Games"]}
          />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
