import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Gallery, type ArtItem } from "@/components/Gallery";
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
    like: "The insane cross-hatching detail on his rings and watch, paired with the slick reflection look on his aviator sunglasses.",
    src: sketchImg("shahrukh"),
  },
  {
    id: "pushpa",
    name: "Pushpa Raj (Allu Arjun)",
    instaHandle: "alluarjunonline",
    dialogue: "Pushpa... Pushpa Raj. Main jhukega nahi, saala!",
    like: "The sheer attitude in the posture and how aggressively detailed you made his beard texture look using fine, layered line strokes.",
    src: sketchImg("pushpa"),
  },
  {
    id: "ronaldo-trophy",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "Your love makes me strong, your hate makes me unstoppable.",
    like: "The pure emotion captured in his expression as he embraces the trophy, accented by the sharp highlights on the metallic surface.",
    src: sketchImg("ronaldo-trophy"),
  },
  {
    id: "leon",
    name: "Leon S. Kennedy",
    dialogue: "Try using knives next time. Better for close encounters.",
    like: "The dramatic, moody lighting that casts the entire lower half of the page into pitch black, emphasizing his iconic piercing gaze.",
    src: sketchImg("leon"),
  },
  {
    id: "neymar",
    name: "Neymar Jr",
    instaHandle: "neymarjr",
    dialogue: "I do not play football to win the Ballon d'Or. I play football to be happy, because I love it.",
    like: "The intricate cross-hatching style you used to fill his headband, contrasted beautifully against the clean, smooth skin shading of his profile.",
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
            Ink. Graphite. Shadow. A collection of high-contrast noir portraits — every line drawn by hand.
          </p>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          <Gallery items={ITEMS} variant="mono" />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
