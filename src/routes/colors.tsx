import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Gallery, type ArtItem } from "@/components/Gallery";
import { colorImg } from "@/lib/artAssets";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Vivid Spectrum — AS Art Gallery" },
      {
        name: "description",
        content: "Cyberpunk neon and anime pop-art colored works by AS (@sarwarr.rr).",
      },
      { property: "og:title", content: "Vivid Spectrum — AS" },
      { property: "og:description", content: "High-energy colored concept art by AS." },
    ],
  }),
  component: ColorsPage,
});

const ITEMS: ArtItem[] = [
  {
    id: "gojo-vs-sukuna",
    name: "Satoru Gojo vs. Ryomen Sukuna",
    dialogue: "The battle between the Strongest sorcerer of today vs The Strongest sorcerer of History",
    like: "The creative split-face concept that contrasts Gojo's striking ice-blue eye directly against Sukuna's menacing purple-hued curse energy.",
    src: colorImg("gojo-vs-sukuna"),
  },
  {
    id: "gojo",
    name: "Satoru Gojo",
    dialogue: "Don't worry, I'm the strongest.",
    like: "The bold, stylized use of a heavy blue overlay technique that makes his eyes look like they are literally glowing off the page.",
    src: colorImg("gojo"),
  },
  {
    id: "messi",
    name: "Lionel Messi",
    instaHandle: "leomessi",
    dialogue: "Champions are made when no one is watching.",
    like: "The vibrant golden coloring work on the World Cup trophy and how cleanly you rendered the complex tattoo sleeve on his arm.",
    src: colorImg("messi"),
  },
  {
    id: "ronaldo-siuuu",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "SIUUU!",
    like: "The explosive energy of his celebration, backed by the solid black background that makes his muscle definitions look incredibly sharp.",
    src: colorImg("ronaldo-siuuu"),
  },
  {
    id: "kaiser",
    name: "Michael Kaiser",
    dialogue: "Those who sacrifice their talent in exchange for living long and tedious lives are the ones I despise the most.",
    like: "The striking execution of his blue hair tips and the clean coloring on his hand tattoo, fitting the high-energy aesthetic perfectly.",
    src: colorImg("kaiser"),
  },
  {
    id: "ronaldo-smile",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "Talent without working hard is nothing.",
    like: "The sharp geometric color blocks of yellow and blue in the background that instantly give the portrait a modern, pop-art look.",
    src: colorImg("ronaldo-smile"),
  },
  {
    id: "eren",
    name: "Eren Yeager",
    dialogue: "We're born free. All of us. Free. Some don't believe it, some try to take it away. To hell with them!",
    like: "The stunning lighting source hitting his back and arms, creating beautiful highlights that emphasize his physical form perfectly.",
    src: colorImg("eren"),
  },
  {
    id: "rin",
    name: "Itoshi Rin",
    dialogue: "Football is a battlefield. It's about killing your opponent.",
    like: "The menacing teal hair tones and the sharp, dangerous expression in his eyes that perfectly mirrors his egoist personality.",
    src: colorImg("rin"),
  },
  {
    id: "tony",
    name: "Tony Stark (Robert Downey Jr.)",
    instaHandle: "robertdowneyjr",
    dialogue: "I am Iron Man.",
    like: "The dramatic red and pink lighting cast across his face, beautifully simulating the intense glow from inside the suit HUD.",
    src: colorImg("tony"),
  },
  {
    id: "vivian",
    name: "Vivian Hugo",
    dialogue: "Yeah. At the end of the day... the talented and talentless can never understand each other.",
    like: "The chaotic, stylized numbers and comic speech bubbles scrawled across the bright pink canvas that capture a pure chaotic manga vibe.",
    src: colorImg("vivian"),
  },
  {
    id: "mikey",
    name: "Manjiro Sano (Bonten Mikey)",
    dialogue: "I will create an era for delinquents.",
    like: "The haunting perspective from the back showing his neck tattoo, accented beautifully by the clean folds of his white coat.",
    src: colorImg("mikey"),
  },
  {
    id: "sae",
    name: "Itoshi Sae",
    dialogue: "lukewarm",
    like: "The jaw-dropping contrast between Sae's clean face and the incredibly chaotic, intricate mechanical gears exploding on the right side.",
    src: colorImg("sae"),
  },
];

function ColorsPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-foreground">
      <Navbar />
      <main className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-30 blur-3xl"
          style={{ background: "var(--gradient-vivid)" }}
        />
        <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter sm:text-7xl">
            <span className="text-gradient-vivid">Vivid Spectrum</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/65">
            Neon, ink and pigment colliding. High-energy anime, pop-art and concept work.
          </p>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          <Gallery items={ITEMS} variant="vivid" />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
