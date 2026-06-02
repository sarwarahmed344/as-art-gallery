import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Gallery, type ArtItem } from "@/components/Gallery";
import { SplitSectorBackground } from "@/components/SplitSectorBackground";
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
    dialogue: "The Strongest sorcerer of today vs the Strongest sorcerer of History.",
    like: "I split the face down the middle on purpose — Gojo's ice-blue eye on one side, Sukuna's purple curse haze on the other. That contrast is the whole point of the piece.",
    medium: "Alcohol Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("gojo-vs-sukuna"),
  },
  {
    id: "gojo",
    name: "Satoru Gojo",
    dialogue: "Don't worry, I'm the strongest.",
    like: "I layered a heavy blue overlay over the eyes so they'd actually feel like they're glowing off the page — that's the moment the drawing clicked for me.",
    medium: "Alcohol Markers · Cartridge Paper",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("gojo"),
  },
  {
    id: "messi",
    name: "Lionel Messi",
    instaHandle: "leomessi",
    dialogue: "Champions are made when no one is watching.",
    like: "I spent ages getting the gold on the World Cup right, and pushing through that detailed tattoo sleeve cleanly was the moment I knew the piece was working.",
    medium: "Markers + Coloured Pencils · A4",
    year: "2024",
    categories: ["Football", "Portrait", "Colored", "Realistic"],
    src: colorImg("messi"),
  },
  {
    id: "ronaldo-siuuu",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "SIUUU!",
    like: "I dropped him on a solid black background to keep the celebration explosive — it made his muscle definition pop sharper than I expected.",
    medium: "Digital + Marker Study",
    year: "2024",
    categories: ["Football", "Portrait", "Colored", "Realistic"],
    src: colorImg("ronaldo-siuuu"),
  },
  {
    id: "kaiser",
    name: "Michael Kaiser",
    dialogue: "Those who sacrifice their talent in exchange for living long and tedious lives are the ones I despise the most.",
    like: "I obsessed over the blue tips of his hair and kept the hand tattoo clean — exactly the high-energy, slightly arrogant vibe Kaiser deserves.",
    medium: "Alcohol Markers · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("kaiser"),
  },
  {
    id: "ronaldo-smile",
    name: "Cristiano Ronaldo",
    instaHandle: "cristiano",
    dialogue: "Talent without working hard is nothing.",
    like: "I cut the background into sharp yellow and blue blocks behind him — once those landed, the whole portrait flipped into proper pop-art territory.",
    medium: "Markers + Coloured Pencils · A4",
    year: "2025",
    categories: ["Football", "Portrait", "Colored", "Realistic"],
    src: colorImg("ronaldo-smile"),
  },
  {
    id: "eren",
    name: "Eren Yeager",
    dialogue: "We're born free. All of us. Free. Some don't believe it, some try to take it away. To hell with them!",
    like: "I placed the light source behind him so it'd rake across his back and arms — those highlights are doing all the heavy lifting on the anatomy.",
    medium: "Alcohol Markers + Pencil · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("eren"),
  },
  {
    id: "rin",
    name: "Itoshi Rin",
    dialogue: "Football is a battlefield. It's about killing your opponent.",
    like: "I pushed the teal hair tones cold and kept the eyes sharp on purpose — pure egoist energy, exactly how Rin reads in the manga.",
    medium: "Alcohol Markers · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("rin"),
  },
  {
    id: "tony",
    name: "Tony Stark (Robert Downey Jr.)",
    instaHandle: "robertdowneyjr",
    dialogue: "I am Iron Man.",
    like: "I washed his whole face in red and pink to fake the glow from inside the suit HUD — it became my favourite lighting trick on this set.",
    medium: "Digital Study",
    year: "2024",
    categories: ["Movies", "Portrait", "Colored", "Realistic"],
    src: colorImg("tony"),
  },
  {
    id: "vivian",
    name: "Vivian Hugo",
    dialogue: "Yeah. At the end of the day... the talented and talentless can never understand each other.",
    like: "I scrawled chaotic numbers and comic speech bubbles across that hot-pink canvas — that's the pure unhinged manga energy I was after.",
    medium: "Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("vivian"),
  },
  {
    id: "mikey",
    name: "Manjiro Sano (Bonten Mikey)",
    dialogue: "I will create an era for delinquents.",
    like: "I drew him from behind to feature the neck tattoo, then balanced it with crisp folds on the white coat — that quiet menace is the look I wanted.",
    medium: "Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("mikey"),
  },
  {
    id: "sae",
    name: "Itoshi Sae",
    dialogue: "lukewarm",
    like: "I kept Sae's face clean and then went all-in on the mechanical gears exploding off the right side — that contrast is the part I'm proudest of.",
    medium: "Alcohol Markers + Liner · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("sae"),
  },
];

function ColorsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14" style={{ background: "var(--background)" }}>
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">
              Chapter 02
            </span>
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 4deg, #DDDDDD 4deg 5deg, transparent 5deg 9deg)",
              }}
            />
            <h1 className="relative font-display text-5xl font-bold leading-[0.85] sm:text-8xl md:text-[9rem]" style={{ color: "var(--ink)" }}>
              VIVID<br />SPECTRUM
            </h1>
            <p className="relative mt-4 font-serif text-lg italic opacity-80 sm:text-2xl">
              Color as a weapon.
            </p>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 pb-24">
          <Gallery
            items={ITEMS}
            variant="vivid"
            filters={["Portrait", "Colored", "Pop-art", "Realistic", "Anime", "Blue Lock", "Football", "Movies"]}
          />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
