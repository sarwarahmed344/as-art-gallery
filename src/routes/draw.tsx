import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/draw")({
  component: DrawPage,
});

function DrawPage() {
  return (
    <div className="min-h-screen pt-24 px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="panel mx-auto max-w-6xl p-10 sm:p-14">
        <span className="chapter-marker">Chapter 04</span>
        <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">THE BLANK<br/>PAGE</h1>
        <p className="mt-5 font-serif text-xl italic opacity-80">Your turn.</p>
        <p className="mt-4 max-w-2xl opacity-80">
          Grab a brush. Make something. Save it, keep it, or let it join the gallery.
        </p>
      </div>
    </div>
  );
}
