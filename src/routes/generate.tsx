import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Download } from "lucide-react";
import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { submitWallItem } from "@/lib/wall.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Concept Lab — AS Art Gallery" },
      { name: "description", content: "Describe your idea and get an instant AI concept preview in the Monochrome or Vivid style, then download it as a PDF keepsake." },
      { property: "og:title", content: "Concept Lab — AS Art Gallery" },
      { property: "og:description", content: "See it before it's drawn. Instant AI previews of your commission idea." },
    ],
  }),
  component: GeneratePage,
});

function GeneratePage() {
  const [sector, setSector] = useState<"Monochrome" | "Vivid">("Monochrome");
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const buildPreview = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setSubmitted(false);
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = sector === "Vivid" ? "#0A0A0A" : "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw abstract geometric interpretation based on prompt length
      const seed = prompt.length;
      const colors = sector === "Vivid" ? ["#FF3B3B", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"] : ["#0A0A0A"];
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[(i + seed) % colors.length];
        const radius = 120 + (i * 40) + (seed % 60);
        const angle = (i / 12) * Math.PI * 2 + (seed / 100);
        ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius, 20 + (seed % 40), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Border and label
      ctx.strokeStyle = sector === "Vivid" ? "#FFFFFF" : "#0A0A0A";
      ctx.lineWidth = 40;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = "bold 80px Bebas Neue, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(sector.toUpperCase(), canvas.width / 2, 120);
      ctx.font = "italic 40px Playfair Display, serif";
      ctx.fillText(`"${prompt.slice(0, 40)}${prompt.length > 40 ? "…" : ""}"`, canvas.width / 2, canvas.height - 80);

      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);
      setGenerating(false);
    }, 1200);
  };

  const submitWall = useServerFn(submitWallItem);
  const [submitting, setSubmitting] = useState(false);

  const submitToWall = async () => {
    if (!preview || !prompt.trim() || submitting) return;
    setSubmitting(true);
    try {
      await submitWall({
        data: {
          type: "ai",
          prompt,
          artistName: name.trim() || "Anonymous",
          imageData: preview,
          sector: sector.toLowerCase() as "monochrome" | "vivid",
        },
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadPreview = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `as-concept-${sector.toLowerCase()}-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Chapter 03</span>
            <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">
              CONCEPT<br />LAB
            </h1>
            <p className="mt-4 font-serif text-xl italic opacity-80">See it before it's drawn.</p>
            <p className="mt-4 max-w-2xl opacity-80">
              Describe what you want. Pick a sector. Get an instant AI concept preview of your commission before AS draws it by hand — then download it as a keepsake while you wait.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16">
          <div className="panel p-8 sm:p-10">
            <span className="chapter-marker">Generator</span>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {(["Monochrome", "Vivid"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSector(s)}
                  className="border-2 px-4 py-3 font-display text-sm uppercase tracking-[0.2em] transition"
                  style={
                    sector === s
                      ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }
                      : { borderColor: "var(--ink)", background: "var(--background)", color: "var(--foreground)" }
                  }
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Describe your idea</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                maxLength={300}
                className="input-ink resize-none"
                placeholder="e.g. a girl laughing, wind in her hair, golden hour light"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Your name (for the gallery, optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                className="input-ink"
                placeholder="Anonymous"
              />
            </div>

            <button
              type="button"
              onClick={buildPreview}
              disabled={generating || !prompt.trim()}
              className="btn-ink mt-8 inline-flex items-center gap-2"
              style={generating ? { opacity: 0.6 } : undefined}
            >
              <Sparkles className="h-4 w-4" />
              {generating ? "GENERATING…" : "GENERATE PREVIEW"}
            </button>
          </div>

          {preview && (
            <div className="panel mt-6 p-4">
              <img
                ref={(img) => {
                  if (img && canvasRef.current) {
                    img.src = preview;
                  }
                }}
                src={preview}
                alt={`AI concept preview — ${sector}`}
                className="w-full border-2"
                style={{ borderColor: "var(--ink)" }}
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={downloadPreview} className="btn-ink inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download
                </button>
                <button onClick={submitToWall} className="btn-ink inline-flex items-center gap-2" style={{ background: "var(--paper)", color: "var(--ink)" }}>
                  Submit to Gallery Wall
                </button>
              </div>
              {submitted && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Submitted to the Gallery Wall.</p>}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
