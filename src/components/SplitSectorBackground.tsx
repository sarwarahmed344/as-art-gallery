import { useEffect, useRef, useState } from "react";

/**
 * Animated split-sector background.
 *
 * Left half = monochrome ink blooms on charcoal.
 * Right half = muted color blooms on dark navy.
 * A soft, rippling, glowing vertical seam divides them and pulses every ~9s.
 *
 * Performance:
 *  - Canvas with capped DPR + bloom count.
 *  - On <=640px viewports we render a static CSS-only split with grain, no canvas.
 *  - Pauses entirely when tab is hidden or `prefers-reduced-motion` is set.
 */
type Side = "left" | "right" | null;

interface Props {
  /** Hover boosts spawn rate + pulse cadence on the matching side. */
  hoverSide?: Side;
  className?: string;
}

type Bloom = {
  x: number;
  y: number;
  r: number;
  maxR: number;
  life: number;
  ttl: number;
  hue: string;
  side: "L" | "R";
};

type Streak = {
  x: number;
  y: number;
  len: number;
  life: number;
  ttl: number;
  hue: string;
  side: "L" | "R";
};

const VIVID_HUES = [
  "rgba(120, 18, 32, 0.55)",   // dark crimson
  "rgba(70, 30, 110, 0.55)",   // deep violet
  "rgba(20, 80, 90, 0.5)",     // muted teal
  "rgba(130, 90, 25, 0.5)",    // burnt gold
  "rgba(40, 60, 120, 0.5)",    // ink blue
];
const MONO_HUES = [
  "rgba(35, 35, 35, 0.6)",
  "rgba(55, 55, 55, 0.55)",
  "rgba(20, 20, 20, 0.7)",
];

export function SplitSectorBackground({ hoverSide = null, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blooms: Bloom[] = [];
    const streaks: Streak[] = [];

    let lastSpawnL = 0;
    let lastSpawnR = 0;
    let lastStreakR = 0;
    let lastStreakL = 0;
    let lastPulse = 0;
    let pulseColor: "white" | "violet" = "white";
    let pulseProgress = 1; // 0..1 (1 = idle)
    let seamPhase = 0;
    let raf = 0;
    let last = performance.now();

    const spawnBloom = (side: "L" | "R") => {
      const isR = side === "R";
      const x = isR
        ? W * 0.5 + Math.random() * W * 0.5
        : Math.random() * W * 0.5;
      const y = Math.random() * H;
      const maxR = (isR ? 140 : 110) + Math.random() * (isR ? 160 : 110);
      blooms.push({
        x,
        y,
        r: 0,
        maxR,
        life: 0,
        ttl: isR ? 5200 + Math.random() * 2500 : 4200 + Math.random() * 2000,
        hue: isR
          ? VIVID_HUES[Math.floor(Math.random() * VIVID_HUES.length)]
          : MONO_HUES[Math.floor(Math.random() * MONO_HUES.length)],
        side,
      });
    };

    const spawnStreak = (side: "L" | "R") => {
      const isR = side === "R";
      const x = isR
        ? W * 0.5 + Math.random() * W * 0.5
        : Math.random() * W * 0.5;
      streaks.push({
        x,
        y: Math.random() * H * 0.4,
        len: 60 + Math.random() * (isR ? 220 : 140),
        life: 0,
        ttl: isR ? 700 + Math.random() * 500 : 1200 + Math.random() * 800,
        hue: isR
          ? "rgba(180, 90, 200, 0.55)"
          : "rgba(180, 180, 180, 0.35)",
        side,
      });
    };

    const draw = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;

      // base wash — both halves
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, W * 0.5, H);
      ctx.fillStyle = "#080810";
      ctx.fillRect(W * 0.5, 0, W * 0.5, H);

      // spawn rates (boosted by hover)
      const leftBoost = hoverSide === "left" ? 0.45 : 1;
      const rightBoost = hoverSide === "right" ? 0.45 : 1;

      if (now - lastSpawnL > 1100 * leftBoost) {
        spawnBloom("L");
        lastSpawnL = now;
      }
      if (now - lastSpawnR > 1300 * rightBoost) {
        spawnBloom("R");
        lastSpawnR = now;
      }
      if (now - lastStreakL > 4500 + Math.random() * 4000) {
        spawnStreak("L");
        lastStreakL = now;
      }
      if (now - lastStreakR > (hoverSide === "right" ? 1500 : 3500) + Math.random() * 2500) {
        spawnStreak("R");
        lastStreakR = now;
      }

      // draw blooms
      ctx.globalCompositeOperation = "lighter";
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.life += dt;
        const t = b.life / b.ttl;
        if (t >= 1) {
          blooms.splice(i, 1);
          continue;
        }
        // ease out then fade
        const growth = 1 - Math.pow(1 - Math.min(t * 1.4, 1), 3);
        b.r = b.maxR * growth;
        const alpha = t < 0.5 ? t * 2 : 1 - (t - 0.5) * 2;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.hue);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // streaks
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.life += dt;
        const t = s.life / s.ttl;
        if (t >= 1) {
          streaks.splice(i, 1);
          continue;
        }
        const alpha = t < 0.3 ? t / 0.3 : 1 - (t - 0.3) / 0.7;
        ctx.strokeStyle = s.hue.replace(/[\d.]+\)$/, `${(alpha * 0.7).toFixed(3)})`);
        ctx.lineWidth = s.side === "R" ? 1 : 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + (Math.random() - 0.5) * 4, s.y + s.len * (s.life / s.ttl));
        ctx.stroke();
      }

      // dividing seam — rippling vertical edge
      seamPhase += dt * 0.0015;
      const seamX = W * 0.5;
      ctx.save();
      ctx.beginPath();
      for (let y = 0; y <= H; y += 8) {
        const ox = Math.sin(y * 0.012 + seamPhase * 2) * 6 +
                   Math.sin(y * 0.04 + seamPhase * 5) * 2;
        const x = seamX + ox;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // outer faint glow
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.strokeStyle = "rgba(180, 90, 220, 0.08)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // pulse traveling down seam
      const pulseInterval = hoverSide ? 4500 : 9000;
      if (now - lastPulse > pulseInterval && pulseProgress >= 1) {
        lastPulse = now;
        pulseProgress = 0;
        pulseColor = pulseColor === "white" ? "violet" : "white";
      }
      if (pulseProgress < 1) {
        pulseProgress += dt / 1400;
        const py = pulseProgress * H;
        const color = pulseColor === "white"
          ? "rgba(255,255,255,0.9)"
          : "rgba(160, 80, 220, 0.85)";
        const ox = Math.sin(py * 0.012 + seamPhase * 2) * 6;
        const grad = ctx.createRadialGradient(seamX + ox, py, 0, seamX + ox, py, 50);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(seamX + ox, py, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isMobile, hoverSide]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Mobile fallback — static split + grain */}
      {isMobile ? (
        <div className="absolute inset-0 flex">
          <div className="h-full w-1/2 bg-[#0A0A0A]" />
          <div className="h-full w-1/2 bg-[#080810]" />
          <div className="grain absolute inset-0 opacity-60" />
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="grain absolute inset-0 opacity-40 mix-blend-overlay" />
        </>
      )}
      {/* Readability scrim */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
