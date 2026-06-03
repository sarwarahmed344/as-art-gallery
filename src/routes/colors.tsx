import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Gallery, type ArtItem } from "@/components/Gallery";
import { ArtImage } from "@/components/ArtImage";
import { colorImg } from "@/lib/artAssets";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { name: "author", content: "AS (@sarwarr.rr)" },
      { title: "Vivid Spectrum — AS Art Gallery" },
      {
        name: "description",
        content:
          "Vivid colored concept art — anime, pop-culture and football portraits by AS. Based in Hyderabad.",
      },
      { property: "og:title", content: "Vivid Spectrum — AS Art Gallery" },
      {
        property: "og:description",
        content: "Color as a weapon. Anime, pop-art and vivid portraits by AS (@sarwarr.rr).",
      },
      { property: "og:site_name", content: "AS Art Gallery" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sarwarr.rr" },
      { name: "twitter:creator", content: "@sarwarr.rr" },
      { name: "twitter:title", content: "Vivid Spectrum — AS Art Gallery" },
      {
        name: "twitter:description",
        content: "Color as a weapon. Vivid concept art by AS (@sarwarr.rr).",
      },
    ],
  }),
  component: ColorsPage,
});

const ITEMS: ArtItem[] = [
  {
    id: "gojo-vs-sukuna",
    name: "Satoru Gojo vs. Ryomen Sukuna",
    dialogue: "The Strongest sorcerer of today vs the Strongest sorcerer of History.",
    like: "I love the split-face concept — Gojo's ice-blue eye against Sukuna's purple curse energy on the same face. Two worlds, one line dividing them.",
    medium: "Alcohol Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("gojo-vs-sukuna"),
  },
  {
    id: "gojo",
    name: "Satoru Gojo",
    dialogue: "Don't worry, I'm the strongest.",
    like: "The heavy blue overlay is what I keep coming back to — I wanted his eyes to look like they're glowing off the page, and I think it got there.",
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
    like: "The golden trophy coloring took the most passes, but it's the tattoo sleeve that I'm most proud of — every detail built up stroke by stroke.",
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
    like: "I killed the background completely so the muscle definition could do all the work. The black just makes everything sharper.",
    medium: "Digital + Marker Study",
    year: "2024",
    categories: ["Football", "Portrait", "Colored", "Realistic"],
    src: colorImg("ronaldo-siuuu"),
  },
  {
    id: "kaiser",
    name: "Michael Kaiser",
    dialogue:
      "Those who sacrifice their talent in exchange for living long and tedious lives are the ones I despise the most.",
    like: "The blue hair tips were the visual anchor I built the whole piece around — and the hand tattoo was intricate enough to plan twice before committing.",
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
    like: "Getting the geometry right in a flat color style with no gradients is harder than it looks — but when the smile landed, the whole piece clicked.",
    medium: "Markers + Coloured Pencils · A4",
    year: "2025",
    categories: ["Football", "Portrait", "Colored", "Realistic"],
    src: colorImg("ronaldo-smile"),
  },
  {
    id: "eren",
    name: "Eren Yeager",
    dialogue:
      "We're born free. All of us. Free. Some don't believe it, some try to take it away. To hell with them!",
    like: "The light source hitting his back and arms is what I'm most proud of here. I didn't draw the highlights — I preserved the paper for them.",
    medium: "Alcohol Markers + Pencil · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("eren"),
  },
  {
    id: "rin",
    name: "Itoshi Rin",
    dialogue: "Football is a battlefield. It's about killing your opponent.",
    like: "I built the teal hair in thin overlapping layers rather than solid fills — too much saturation and the portrait loses depth. The half-smirk is everything.",
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
    like: "I wanted the Endgame Tony — the one who knows what it costs. The red and pink glow from below does that job without needing a single word.",
    medium: "Digital Study",
    year: "2024",
    categories: ["Movies", "Portrait", "Colored", "Realistic"],
    src: colorImg("tony"),
  },
  {
    id: "vivian",
    name: "Vivian Hugo",
    dialogue:
      "Yeah. At the end of the day... the talented and talentless can never understand each other.",
    like: "The chaos of the numbers and speech bubbles across the pink canvas represents exactly what Vivian filters out. The contrast between the noise and his stillness is the whole piece.",
    medium: "Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("vivian"),
  },
  {
    id: "mikey",
    name: "Manjiro Sano (Bonten Mikey)",
    dialogue: "I will create an era for delinquents.",
    like: "I chose the back view deliberately. The Bonten Mikey doesn't want to be seen. The coat folds are the most precise drapery I've done.",
    medium: "Markers + Ink · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("mikey"),
  },
  {
    id: "sae",
    name: "Itoshi Sae",
    dialogue: "lukewarm",
    like: "The contrast between Sae's clean still face and the mechanical gears tearing out the right side is the piece. Stillness and chaos from the same hand without stopping.",
    medium: "Alcohol Markers + Liner · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Portrait", "Colored", "Pop-art"],
    src: colorImg("sae"),
  },
  // ---------- NEW CARDS ----------
  {
    id: "theweeknd-red",
    name: "The Weeknd · Red Poster",
    instaHandle: "theweeknd",
    dialogue: "I just need someone who won't disappear when things get dark.",
    like: "This was my first real attempt at a vivid poster format — bold block red background, large stencil-style title text, his face breaking through it all. The fur collar texture in color was new territory.",
    medium: "Color Pencil + Marker · A5 Card",
    year: "2025",
    categories: ["Music", "Portrait", "Colored"],
    src: colorImg("theweeknd-red"),
  },
  {
    id: "theweeknd-dark",
    name: "The Weeknd · Dark Acrylic",
    instaHandle: "theweeknd",
    dialogue: "Often. I still think about it.",
    like: "Pure black background, near-monochrome palette broken only by the orange amber glow in his lenses and the cold blue on his jacket. The only warmth in the whole piece is those two lenses — and that's by design.",
    medium: "Acrylic Paint · A5 Canvas Card",
    year: "2025",
    categories: ["Music", "Portrait", "Colored"],
    src: colorImg("theweeknd-dark"),
  },
  {
    id: "theweeknd-mind",
    name: "The Weeknd · After Hours Mind",
    instaHandle: "theweeknd",
    dialogue: "I can't feel my face when I'm with you.",
    like: "The idea: what lives inside The Weeknd's mind? Left side is clean controlled realism. Right side explodes into After Hours chaos — symbols, faces, fragments. The contrast between the two halves is the whole point. I spent more time on the right side than most complete drawings.",
    medium: "Acrylic + Marker · A4",
    year: "2025",
    categories: ["Music", "Portrait", "Colored"],
    src: colorImg("theweeknd-mind"),
  },
  {
    id: "deadpool-wolverine",
    name: "Deadpool & Wolverine",
    dialogue: "Alright, let's do this one last time.",
    like: "Two completely different color palettes — yellow and red — working against each other without visual noise. Wolverine's fury against Deadpool's chaos. The title lettering was done freehand and turned out better than planned.",
    medium: "Color Pencil + Marker · A4",
    year: "2024",
    categories: ["Movies", "Portrait", "Colored", "Pop-art"],
    src: colorImg("deadpool-wolverine"),
  },
  {
    id: "itoshi-sae-card",
    name: "Itoshi Sae · Blue Lock Card",
    dialogue: "Lukewarm. None of you have the resolve to reach the top.",
    like: "Drawn in a trading-card format — pink and maroon panels, bold marker type, football in the corner. The crocheted sweater texture was the most time-intensive part — each hole required individual circles. The sunglasses-tipping gesture is pure Sae: effortlessly superior.",
    medium: "Color Pencil + Marker · A4",
    year: "2025",
    categories: ["Anime", "Blue Lock", "Football", "Portrait", "Colored"],
    src: colorImg("itoshi-sae-card"),
  },
  {
    id: "prabhas-salaar",
    name: "Prabhas · Salaar",
    instaHandle: "actorprabhas",
    dialogue: "They asked for a lion. I showed up.",
    like: "The arm was the challenge — rendering muscle texture in color pencil without it looking flat required building up orange, brown, and gold layers with a blunt tip. The stare does the rest.",
    medium: "Color Pencil · A4 Cartridge Paper",
    year: "2025",
    categories: ["Movies", "Portrait", "Colored", "Realistic"],
    src: colorImg("prabhas-salaar"),
  },
  {
    id: "chifuyu",
    name: "Chifuyu Matsuno",
    dialogue: "Baji-san chose this path. I'll walk it with him until the end.",
    like: "The warm honey-gold hair and those green eyes were the clear compositional challenge — I needed them to feel luminous without washing out the skin tones around them. The outstretched hand reaching toward the viewer breaks the fourth wall — which felt exactly right for Chifuyu.",
    medium: "Color Pencil · A4 Cartridge Paper",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored"],
    src: colorImg("chifuyu"),
  },
  {
    id: "goku-ultra-instinct",
    name: "Goku · Ultra Instinct",
    dialogue:
      "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
    like: "The orange gi needed warm base tones built up across six or seven passes to get any richness. The battle damage — red slash marks — adds the narrative without needing text. Scarred, powerful, smiling. This is Goku at his most complete.",
    medium: "Color Pencil + Marker · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("goku-ultra-instinct"),
  },
  {
    id: "chicoo",
    name: "Chico Lachowski",
    instaHandle: "chico_lachowski",
    dialogue: "Effortless is a decision.",
    like: "Skin tone layering in color pencil is always a study in restraint — too much pigment flattens everything. The hair here is what I'm most proud of — dark, detailed, each wave built from individual strokes.",
    medium: "Color Pencil · A4 Cartridge Paper",
    year: "2025",
    categories: ["Portrait", "Colored", "Realistic"],
    src: colorImg("chicoo"),
  },
  {
    id: "yuta",
    name: "Yuta Okkotsu",
    dialogue: "I want the strength to protect the people I love.",
    like: "The split background — warm golden left, deep cosmic blue-red right — was the compositional decision I'm most proud of here. The scattered petals and outstretched hand give it motion. He looks like he's stepping out of two worlds at once, which is exactly who Yuta is.",
    medium: "Color Pencil · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("yuta"),
  },
  {
    id: "suguru-geto",
    name: "Suguru Geto · Villain Arc",
    dialogue: "Jujutsu is beautiful — and only sorcerers deserve to see it.",
    like: "The entire palette is cool — blues, purples, deep blacks — broken only by the pink flush of his lips. The chaotic wet brushwork on his coat is intentional: Geto is not chaotic, but what he represents is. This piece sits differently every time I look at it.",
    medium: "Acrylic + Color Pencil · A4",
    year: "2025",
    categories: ["Anime", "Portrait", "Colored", "Pop-art"],
    src: colorImg("suguru-geto"),
  },
  {
    id: "imam-ali-khybar",
    name: "Imam Ali (A.S.) · Lifting Khaybar",
    dialogue: "يا علي — Ya Ali",
    like: "The most personally meaningful piece I've drawn. The wooden architectural detail in the background demanded hours of layered brown tones. The Arabic calligraphy anchors the left corner. I didn't just want to draw a historical scene — I wanted to draw reverence.",
    medium: "Color Pencil · A4 Cartridge Paper",
    year: "2025",
    categories: ["Spiritual", "Islamic Art", "Colored"],
    src: colorImg("imam-ali-khybar"),
  },
  {
    id: "ghadeer-e-khum",
    name: "Ghadeer-e-Khum",
    dialogue: "من كنت مولاه فهذا علي مولاه",
    like: "The swirling blue sky was built using overlapping circular strokes — a technique I hadn't used before. The figures in white robes required me to leave the paper almost bare while building shadow around them. Light in this piece is not drawn. It's preserved.",
    medium: "Color Pencil · A4 Cartridge Paper",
    year: "2025",
    categories: ["Spiritual", "Islamic Art", "Colored"],
    src: colorImg("ghadeer-e-khum"),
  },
];

const SACRED_GREEN = "#0D2818";
const SACRED_GOLD = "#C9A84C";
const SACRED_TEXT = "#F5F0E8";
const SACRED_DEEP = "#1A4A2E";

const QUOTES: { ar: string; en: string }[] = [
  {
    ar: "لَا تَكُنْ عَبْدَ غَيْرِكَ وَقَدْ جَعَلَكَ اللَّهُ حُرًّا",
    en: "Do not be a slave to others when Allah has made you free.",
  },
  {
    ar: "قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ",
    en: "The worth of a man is in what he does well.",
  },
  {
    ar: "اعْرِفِ الْحَقَّ تَعْرِفْ أَهْلَهُ",
    en: "Know the truth and you will know its people.",
  },
  {
    ar: "الصَّبْرُ صِنْفَانِ: صَبْرٌ عَلَى مَا تَكْرَهُ، وَصَبْرٌ عَمَّا تُحِبُّ",
    en: "Patience is of two kinds: patience over what pains you, and patience against what you desire.",
  },
];

function ImamAliSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-24"
      style={{ background: SACRED_GREEN, color: SACRED_TEXT }}
    >
      {/* faint geometric overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 18px, " +
            SACRED_GOLD +
            " 18px 19px), repeating-linear-gradient(-45deg, transparent 0 18px, " +
            SACRED_GOLD +
            " 18px 19px)",
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-px" style={{ background: SACRED_GOLD }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            lang="ar"
            dir="rtl"
            className="font-serif text-7xl leading-none sm:text-8xl"
            style={{ color: SACRED_DEEP, textShadow: `0 0 1px ${SACRED_GOLD}` }}
          >
            يا علي
          </h2>
          <p
            className="mt-6 font-serif text-2xl italic sm:text-3xl"
            style={{ color: SACRED_GOLD }}
          >
            Imam Ali ibn Abi Talib (A.S.) — The Lion of Allah
          </p>
        </div>

        {/* Two artwork panels */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {[
            {
              src: colorImg("imam-ali-khybar"),
              title: "Imam Ali (A.S.) · Lifting the Gate of Khaybar",
              ar: "يا علي",
            },
            {
              src: colorImg("ghadeer-e-khum"),
              title: "Ghadeer-e-Khum · The Day of Declaration",
              ar: "من كنت مولاه فهذا علي مولاه",
            },
          ].map((p) => (
            <figure
              key={p.title}
              className="border-2"
              style={{ borderColor: SACRED_GOLD, background: "rgba(0,0,0,0.25)" }}
            >
              <ArtImage src={p.src} alt={p.title} watermark={false} />
              <figcaption className="px-5 py-5 text-center">
                <h3 className="font-serif text-lg italic" style={{ color: SACRED_TEXT }}>
                  {p.title}
                </h3>
                <p
                  lang="ar"
                  dir="rtl"
                  className="mt-2 font-serif text-2xl"
                  style={{ color: SACRED_GOLD }}
                >
                  {p.ar}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Life story */}
        <article
          className="mt-14 border-l-4 p-8 sm:p-10"
          style={{
            borderColor: SACRED_GOLD,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <h3
            className="font-serif text-3xl sm:text-4xl"
            style={{ color: SACRED_GOLD, fontFamily: "Playfair Display, serif" }}
          >
            The Lion of Allah — A Life
          </h3>
          <div className="mt-6 space-y-5 text-base leading-relaxed" style={{ color: SACRED_TEXT }}>
            <p>
              Imam Ali ibn Abi Talib (A.S.) was born inside the sacred walls of the Ka'bah in
              Mecca — the only human being in history to be born in the House of Allah. He was
              the cousin and son-in-law of the Prophet Muhammad (S.A.W.), and from childhood, he
              never prostrated to any idol. His entire life was one of absolute devotion,
              unmatched courage, and profound wisdom.
            </p>
            <p>
              He was the first male to accept Islam, standing beside the Prophet from the very
              first moment of revelation. Through every battle — Badr, Uhud, Khandaq, and
              Khaybar — it was Ali who stood when others fled. At Khaybar, when the fortress
              gate that no army could breach stood between the Muslims and victory, Ali (A.S.)
              lifted it from its hinges with his bare hands and used it as a shield — a feat
              witnessed by thousands and recorded across generations of Shia and Sunni
              scholarship alike.
            </p>
            <p>
              At Ghadeer-e-Khum, on the 18th of Dhul Hijjah in the final year of the Prophet's
              life, the revelation of Allah descended: "O Messenger, deliver what has been
              revealed to you." Before a gathering of over one hundred thousand pilgrims
              returning from Hajj, the Prophet (S.A.W.) raised the hand of Ali and declared:{" "}
              <span lang="ar" dir="rtl" style={{ color: SACRED_GOLD }}>
                من كنت مولاه فهذا علي مولاه
              </span>{" "}
              — Whoever I am the master of, Ali is also his master. This was not a farewell. It
              was a succession.
            </p>
            <p>
              Imam Ali (A.S.) later became the fourth Caliph of Islam and the first Imam of the
              Shia. He governed with absolute justice — even his enemies recorded that under his
              rule, the hungry were fed, the oppressed were heard, and the powerful were held to
              account. He was martyred in the mosque of Kufa on the 21st of Ramadan, struck by a
              poisoned sword while in the position of prayer — and his final words were words of
              gratitude to Allah.
            </p>
            <p>
              His wisdom lives in Nahj al-Balagha — the Peak of Eloquence — a collection of his
              sermons, letters, and sayings compiled by Sharif al-Radi. It remains one of the
              most profound texts in Islamic literature, studied by scholars across fourteen
              centuries.
            </p>
          </div>
        </article>

        {/* Quotes grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {QUOTES.map((q) => (
            <blockquote
              key={q.en}
              className="border-2 p-6"
              style={{ borderColor: SACRED_GOLD, background: "rgba(0,0,0,0.3)" }}
            >
              <p
                lang="ar"
                dir="rtl"
                className="font-serif text-2xl leading-snug"
                style={{ color: SACRED_GOLD }}
              >
                {q.ar}
              </p>
              <p className="mt-4 text-base" style={{ color: SACRED_TEXT }}>
                {q.en}
              </p>
              <p
                className="mt-3 font-mono text-[11px] italic uppercase tracking-[0.2em]"
                style={{ color: "color-mix(in oklab, " + SACRED_GOLD + " 70%, transparent)" }}
              >
                — Nahj al-Balagha
              </p>
            </blockquote>
          ))}
        </div>

        {/* Closing stamp */}
        <div className="mt-20 text-center">
          <p
            lang="ar"
            dir="rtl"
            className="font-serif text-5xl sm:text-6xl"
            style={{ color: SACRED_GOLD }}
          >
            عَلِيٌّ وَلِيُّ اللَّه
          </p>
          <p
            className="mt-3 font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: SACRED_TEXT }}
          >
            Ali is the Wali of Allah
          </p>
          <div
            className="mx-auto mt-8 h-px w-40"
            style={{ background: SACRED_GOLD }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: SACRED_GOLD }} />
    </section>
  );
}

function ColorsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div
            className="panel relative mt-6 overflow-hidden p-10 sm:p-14"
            style={{ background: "var(--background)" }}
          >
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
            <h1
              className="relative font-display text-5xl font-bold leading-[0.85] sm:text-8xl md:text-[9rem]"
              style={{ color: "var(--ink)" }}
            >
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
            filters={[
              "Portrait",
              "Colored",
              "Pop-art",
              "Realistic",
              "Anime",
              "Blue Lock",
              "Football",
              "Movies",
              "Music",
              "Spiritual",
              "Islamic Art",
            ]}
          />
        </section>

        <ImamAliSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
