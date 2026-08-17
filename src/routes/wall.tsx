import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wall")({
  component: WallPage,
});

function WallPage() {
  return (
    <div className="min-h-screen pt-24 px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="panel mx-auto max-w-6xl p-10 sm:p-14">
        <span className="chapter-marker">Chapter 05</span>
        <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-9xl">THE GALLERY<br/>WALL</h1>
        <p className="mt-5 font-serif text-xl italic opacity-80">Not everything here was drawn by AS.</p>
        <p className="mt-4 max-w-2xl opacity-80">
          A wall for what visitors made — some with AI, some with their own hands. Chosen from everything submitted through Concept Lab and The Blank Page.
        </p>
      </div>
    </div>
  );
}
