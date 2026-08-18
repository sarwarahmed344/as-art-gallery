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
        content: "Ink, graphite, and monochrome portrait studies by AS — from friends and icons to football, film, and music.",
      },
      { property: "og:title", content: "Monochrome Sector — AS" },
      { property: "og:description", content: "Ink · Graphite · Shadow by AS (@sarwarr.rr)." },
    ],
  }),
  component: SketchesPage,
});

const ITEMS: ArtItem[] = [
  {
    id: "moosa",
    name: "Moosa",
    instaHandle: "_moosa_143",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Friends"],
    like: "Lights, blur, and the silent confidence of a perfect frame. This one started as a quick sketch for a friend and turned into one of the pieces I'm most proud of in the monochrome series. What I love about this one: the background bokeh dissolves into pure noise while Moosa's face stays razor sharp — and that F.C. patch on the jacket grounds the whole composition without screaming for attention. One of my earliest portraits of someone I know personally, and honestly, it set the tone for everything that came after.",
    src: sketchImg("moosa"),
  },
  {
    id: "akber",
    name: "Akber Abedi",
    instaHandle: "__akbar__abedi_",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Friends"],
    like: "Quiet portrait of a friend — round glasses, cigarette, and that effortlessly unbothered energy he carries everywhere. I leaned hard into soft graphite gradients here; the skin shading is the smoothest I've pulled off in any portrait. The curly hair was its own puzzle — every strand needed a different pressure on the pencil to keep the texture natural. Akber's one of those subjects who just looks like a drawing even in real life, so this one almost drew itself.",
    src: sketchImg("akber"),
  },
  {
    id: "ishrath",
    name: "Ishrath",
    instaHandle: "ishrath.cc3",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Friends"],
    like: "This portrait carries a different kind of weight. The flowing hair was the technical challenge that defined this whole piece — I built up layers of sweeping strokes to get that cascading movement, and the smile is what makes it. What I love: the expression is caught exactly mid-moment, not posed, not stiff — just real. Drawing people you actually know adds something that no reference photo of a stranger ever can. Every time I look at this one, it just feels like her.",
    src: sketchImg("ishrath"),
  },
  {
    id: "ahmed-sarwar",
    name: "Ahmed Sarwar (Self Portrait)",
    instaHandle: "sarwarr.rr",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Self"],
    like: "Drawing yourself is one of the hardest things an artist can do — you know the subject too well to be kind, and too well to be careless. I picked this reference because of the hookah beside me and the star-print hoodie; I wanted something casual, not posed. The aviator reflections were the detail I kept going back to fix. What I love most: the mountain silhouette in the background adds depth without competing. This is AS, 2025 — the person behind every signature on every page.",
    src: sketchImg("ahmed-sarwar"),
  },
  {
    id: "shahrukh",
    name: "Shahrukh Khan",
    instaHandle: "iamsrk",
    dialogue: "Rahul... naam toh suna hi hoga?",
    medium: "0.3mm Micron Pen · A4 Cartridge Paper",
    categories: ["Portrait", "Ink", "Cross-hatch", "Bollywood", "Realistic"],
    like: "The undisputed King of Bollywood. SRK has given Indian cinema its most iconic roles — from Dilwale Dulhania Le Jayenge's Raj to the obsessive lover of Darr, from the romantic of Mohabbatein to the warrior of Chennai Express. His charm doesn't come from power, it comes from vulnerability — and that's exactly what I tried to capture here. I went all-in on the cross-hatching across his rings and watch, and the slick reflection on those aviator lenses is still my favourite detail on the entire page. Every stroke on the jewelry is deliberate — SRK without his rings just wouldn't be SRK.",
    src: sketchImg("shahrukh"),
  },
  {
    id: "pushpa",
    name: "Pushpa Raj (Allu Arjun)",
    instaHandle: "alluarjunonline",
    dialogue: "Pushpa... Pushpa Raj. Main jhukega nahi, saala.",
    medium: "0.05–0.5mm Micron Pen · A4 Cartridge Paper",
    categories: ["Portrait", "Ink", "Cross-hatch", "Bollywood"],
    like: "Allu Arjun redefined mass cinema with Pushpa: The Rise — a smouldering performance built entirely on attitude, posture, and the kind of silence that hits harder than dialogue. His swagger isn't loud; it simmers. I wanted the body language of this drawing to do the heavy lifting — the lean, the look, the defiance in every line. The beard texture was built stroke by stroke using stacked fine layers, and that labour is what finally sold the depth for me. This one proved what ink can do that graphite can't.",
    src: sketchImg("pushpa"),
  },
  {
    id: "ronaldo-trophy",
    name: "Cristiano Ronaldo · Trophy",
    instaHandle: "cristiano",
    dialogue: "Your love makes me strong, your hate makes me unstoppable.",
    medium: "Graphite + 0.3mm Ink Liner · A4",
    categories: ["Portrait", "Ink", "Realistic", "Football"],
    like: "Five Ballon d'Ors. Five Champions Leagues. Records that don't even have names yet. Cristiano Ronaldo is not just a footballer — he's the physical proof of what obsessive dedication produces. I drew him at the moment of kissing the Nations League trophy, and that emotion is the entire piece. The sharp ink highlights on the metal cup were my excuse to chase real shine with graphite alone, and I think I got close. The relief in his face and the grip of his hand on that silver — that's the drawing. Everything else is just frame.",
    src: sketchImg("ronaldo-trophy"),
  },
  {
    id: "leon",
    name: "Leon S. Kennedy",
    dialogue: "Try using knives next time. Better for close encounters.",
    medium: "0.05–0.8mm Micron Pen · A4",
    categories: ["Portrait", "Ink", "Cross-hatch", "Games", "Noir"],
    like: "U.S. Government Agent. Former Raccoon City survivor. The man who went into a village of infected villagers with a handgun and a leather jacket and somehow made it look cool. Leon Kennedy is gaming's most effortlessly iconic protagonist — calm under pressure, sarcastic at the worst moments, and somehow always standing when everyone else is down. I dropped the lower half of this page into pure black so his stare could carry the whole drawing. Moody, cinematic, exactly the RE4 vibe. The white-on-black hair strokes took the longest, but they're what make it.",
    src: sketchImg("leon"),
  },
  {
    id: "neymar",
    name: "Neymar Jr.",
    instaHandle: "neymarjr",
    dialogue: "I do not play football to win the Ballon d'Or. I play football to be happy, because I love it.",
    medium: "0.3mm Micron Pen · A4 Cartridge Paper",
    categories: ["Portrait", "Ink", "Cross-hatch", "Football", "Realistic"],
    like: "The most naturally gifted footballer of his generation — a player whose skill belongs in a different category from tactical discussion. Neymar plays football the way a street artist tags a wall: fast, expressive, and because he can't help it. This side-profile captures that quiet confidence he carries off the pitch. I packed the headband with dense cross-hatching on purpose so it would contrast directly against the smoother skin shading I built up around his face. That contrast is the whole piece. The headband is texture; his profile is stillness. Together they work.",
    src: sketchImg("neymar"),
  },
  {
    id: "jungkook",
    name: "Jungkook (BTS)",
    instaHandle: "jungkook.97",
    dialogue: "No matter who you are, where you're from, your skin color, your gender identity — just speak yourself.",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Music"],
    like: "The Golden Maknae. Youngest member of BTS, lead vocalist, and one of the most well-rounded performers in contemporary K-pop. Jungkook carries a rare quality — his stage presence is electric, but his off-stage energy is almost gentle. This portrait catches him in exactly that space: sharp, present, but not performing. The jacket's stripe texture was a layering exercise I kept pushing further than planned. The eyes are what I came back to most — they needed to feel real without relying on heavy detail.",
    src: sketchImg("jungkook"),
  },
  {
    id: "v-bts",
    name: "V (BTS)",
    instaHandle: "thv",
    dialogue: "I want to be an artist who can be remembered for a long time.",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Music"],
    like: "Kim Taehyung — known to millions as V — occupies a space between idol and artist that few performers manage to reach. His fashion sense, visual aesthetic, and solo work including Layover have built him an identity far beyond the group. I was drawn to the floral patterned shirt in this reference — it gave me texture to work with across the shoulders and chest, a contrast to the tight graphite gradients I used on his face. The mole detail under his eye was the final touch that pulled the likeness together.",
    src: sketchImg("v-bts"),
  },
  {
    id: "mc-stan",
    name: "MC Stan",
    instaHandle: "mc_stan_official",
    dialogue: "Tera ghar hindi meri maa ki bhasha ismein.",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Music", "Rap"],
    like: "Pune's finest. MC Stan broke through as a voice that the Indian underground always had but mainstream media never amplified — raw, unapologetic Hindustani rap rooted in street reality. He won Bigg Boss Season 16 and used the platform not to soften his image but to prove it was always real. The typography scattered across this piece — Hindi Maa ki Bhasha, MC Stan, Tera Ghar — was intentional from the start. The dreads were a freehand challenge I didn't fully plan for, and that chaos is exactly what makes the piece feel right.",
    src: sketchImg("mc-stan"),
  },
  {
    id: "shawn-mendes",
    name: "Shawn Mendes",
    instaHandle: "shawnmendes",
    dialogue: "Treat people the way you want to be treated.",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Music"],
    like: "The Canadian singer-songwriter who went from Vine covers to sold-out stadium tours before he turned 20. Albums like Illuminate and Wonder built him a reputation for emotional sincerity in pop music — a quality that's genuinely rare. This portrait is defined by the smile — one of the warmest expressions I've drawn. The challenge with a smile that wide is keeping the proportions honest; too much pressure and it becomes a caricature. The necklace and open blazer gave the composition structure without overwhelming the face, which is the whole point of a portrait like this.",
    src: sketchImg("shawn-mendes"),
  },
  {
    id: "lisa",
    name: "Lisa (BLACKPINK)",
    instaHandle: "lalalalisa_m",
    dialogue: "Work hard, be humble, and always be grateful.",
    medium: "Graphite · A4 Cartridge Paper",
    categories: ["Portrait", "Realistic", "Music", "K-pop"],
    like: "Lalisa Manobal — BLACKPINK's main dancer and one of the most followed individuals on Instagram globally. Her solo debut LALISA broke records, and her status in the fashion world has pushed her far beyond the traditional K-pop sphere. The intricate lace neckpiece in this portrait was the technical focus — I used varying pen pressure to build the pattern without losing definition at small scale. The upswept hair gave the composition upward movement, and the direct gaze is what closes the piece. She looks right back at you.",
    src: sketchImg("lisa"),
  },
];

function SketchesPage() {
  // Flip the entire site to full dark when entering Monochrome Sector
  useEffect(() => {
    document.documentElement.classList.add("dark-sector");
    return () => document.documentElement.classList.remove("dark-sector");
  }, []);

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

          {/* Manga chapter opening panel */}
          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14" style={{ background: "var(--background)" }}>
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">
              Chapter 01
            </span>
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 4deg, rgba(255,255,255,0.25) 4deg 5deg, transparent 5deg 9deg)",
              }}
            />
            <h1 className="relative font-display text-5xl font-bold leading-[0.85] sm:text-8xl md:text-[9rem]" style={{ color: "var(--ink)" }}>
              MONOCHROME<br />SECTOR
            </h1>
            <p className="relative mt-4 font-serif text-lg italic opacity-80 sm:text-2xl">
              Every line is a decision.
            </p>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 pb-24">
          <Gallery
            items={ITEMS}
            variant="mono"
            filters={["Portrait", "Realistic", "Friends", "Ink", "Cross-hatch", "Bollywood", "Football", "Games", "Music", "K-pop", "Rap", "Self"]}
          />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
