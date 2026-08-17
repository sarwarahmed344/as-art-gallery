import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/generate")({
  component: GeneratePage,
});

function GeneratePage() {
  return (
    <div className="min-h-screen pt-24 px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="panel mx-auto max-w-5xl p-10 sm:p-14">
        <span className="chapter-marker">Chapter 03</span>
        <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">CONCEPT<br/>LAB</h1>
        <p className="mt-5 font-serif text-xl italic opacity-80">See it before it's drawn.</p>
        <p className="mt-4 max-w-2xl opacity-80">
          Describe what you want. Pick a sector. Get an instant AI preview of your commission before AS draws it by hand — then download it as a keepsake while you wait.
        </p>
      </div>
    </div>
  );
}
