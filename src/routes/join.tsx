import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/join")({
  component: JoinPage,
});

function JoinPage() {
  return (
    <div className="min-h-screen pt-24 px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="panel mx-auto max-w-5xl p-10 sm:p-14">
        <span className="chapter-marker">Chapter 06</span>
        <h1 className="font-display text-6xl font-bold leading-[0.85] sm:text-8xl">JOIN AS<br/>AN ARTIST</h1>
        <p className="mt-5 font-serif text-xl italic opacity-80">One gallery, many hands.</p>
        <p className="mt-4 max-w-2xl opacity-80">
          Tell us who you are and how to reach you. Every application is read by hand — approved artists get their own space on the gallery.
        </p>
      </div>
    </div>
  );
}
