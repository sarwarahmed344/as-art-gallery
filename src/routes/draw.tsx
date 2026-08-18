import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Paintbrush, Eraser, PaintBucket, RotateCcw, RotateCw, Trash2, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { submitWallItem } from "@/lib/wall.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/draw")({
  head: () => ({
    meta: [
      { title: "The Blank Page — Draw at AS Art Gallery" },
      { name: "description", content: "Grab a brush and draw right in your browser. Save your artwork, keep a copy, or let it join the AS Art Gallery." },
      { property: "og:title", content: "The Blank Page — Draw at AS Art Gallery" },
      { property: "og:description", content: "A drawing canvas for visitors. Make something, save it, let it join the gallery." },
    ],
  }),
  component: DrawPage,
});

const COLORS = ["#0A0A0A", "#FFFFFF", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6", "#A855F7", "#78350F"];

function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<"brush" | "eraser" | "fill">("brush");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(6);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(dpr, dpr);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, rect.width, rect.height);
    setCtx(context);
    saveState(context, rect.width, rect.height);
  }, []);

  const saveState = (context: CanvasRenderingContext2D, w: number, h: number) => {
    const data = context.getImageData(0, 0, w, h);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), data]);
    setHistoryIndex((prev) => prev + 1);
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ctx || !canvasRef.current) return;
    isDrawing.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (tool === "fill") {
      fillCanvas(x, y);
      return;
    }
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = size;
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = () => {
    if (!ctx || !canvasRef.current || !isDrawing.current) return;
    isDrawing.current = false;
    ctx.closePath();
    const rect = canvasRef.current.getBoundingClientRect();
    saveState(ctx, rect.width, rect.height);
  };

  const fillCanvas = (x: number, y: number) => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasRef.current.getBoundingClientRect().width, canvasRef.current.getBoundingClientRect().height);
    const rect = canvasRef.current.getBoundingClientRect();
    saveState(ctx, rect.width, rect.height);
  };

  const undo = () => {
    if (!ctx || !canvasRef.current || historyIndex <= 0) return;
    const next = historyIndex - 1;
    setHistoryIndex(next);
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.putImageData(history[next], 0, 0);
  };

  const redo = () => {
    if (!ctx || !canvasRef.current || historyIndex >= history.length - 1) return;
    const next = historyIndex + 1;
    setHistoryIndex(next);
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.putImageData(history[next], 0, 0);
  };

  const clear = () => {
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, rect.width, rect.height);
    saveState(ctx, rect.width, rect.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `as-drawing-${Date.now()}.png`;
    a.click();
  };

  const submitWall = useServerFn(submitWallItem);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const canvas = canvasRef.current;
    if (!canvas || submitting) return;
    setSubmitting(true);
    try {
      await submitWall({
        data: {
          type: "hand-drawn",
          artistName: name.trim() || "Anonymous",
          imageData: canvas.toDataURL("image/png"),
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

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] underline-offset-4 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>

          <div className="panel relative mt-6 overflow-hidden p-10 sm:p-14">
            <span className="chapter-marker absolute left-4 top-3 bg-[var(--background)] px-2 py-1">Chapter 04</span>
            <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">
              THE BLANK<br />PAGE
            </h1>
            <p className="mt-4 font-serif text-xl italic opacity-80">Your turn.</p>
            <p className="mt-4 max-w-2xl opacity-80">
              Grab a brush. Make something. Save it, keep it, or let it join the gallery.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="panel p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3 border-b-2 pb-4" style={{ borderColor: "var(--ink)" }}>
              <button
                onClick={() => setTool("brush")}
                className="inline-flex items-center gap-2 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={tool === "brush" ? { background: "var(--ink)", color: "var(--paper)" } : undefined}
              >
                <Paintbrush className="h-3.5 w-3.5" /> Brush
              </button>
              <button
                onClick={() => setTool("eraser")}
                className="inline-flex items-center gap-2 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={tool === "eraser" ? { background: "var(--ink)", color: "var(--paper)" } : undefined}
              >
                <Eraser className="h-3.5 w-3.5" /> Eraser
              </button>
              <button
                onClick={() => setTool("fill")}
                className="inline-flex items-center gap-2 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={tool === "fill" ? { background: "var(--ink)", color: "var(--paper)" } : undefined}
              >
                <PaintBucket className="h-3.5 w-3.5" /> Fill
              </button>
              <div className="flex items-center gap-2 pl-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span>Size</span>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-28"
                />
                <span>{size}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pl-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">Color</span>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="h-7 w-7 border-2"
                    style={{ background: c, borderColor: color === c ? "var(--ink)" : "#FFFFFF" }}
                    aria-label={c}
                  />
                ))}
              </div>
              <div className="ml-auto flex flex-wrap gap-2">
                <button onClick={undo} className="inline-flex items-center gap-1 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                  <RotateCcw className="h-3.5 w-3.5" /> Undo
                </button>
                <button onClick={redo} className="inline-flex items-center gap-1 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                  <RotateCw className="h-3.5 w-3.5" /> Redo
                </button>
                <button onClick={clear} className="inline-flex items-center gap-1 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
              className="mt-4 w-full cursor-crosshair border-2"
              style={{ borderColor: "var(--ink)", height: "min(70vh, 600px)", background: "#FFFFFF" }}
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                className="input-ink"
                placeholder="Your name (for the gallery, optional)"
              />
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button onClick={download} className="btn-ink inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> Save
                </button>
                <button onClick={submit} disabled={submitting} className="btn-ink inline-flex items-center gap-2" style={{ background: "var(--paper)", color: "var(--ink)" }}>
                  {submitting ? "Submitting…" : "Submit to Gallery Wall"}
                </button>
              </div>
            </div>
            {submitted && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Submitted to the Gallery Wall.</p>}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
