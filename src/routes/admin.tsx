import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="panel mx-auto max-w-md w-full p-10 sm:p-12">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">AS Commission Tracker</h1>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">Private access</p>
        <form className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Username</label>
            <input type="text" className="input-ink" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Password</label>
            <input type="password" className="input-ink" placeholder="••••••••" />
          </div>
          <button type="button" className="btn-ink w-full">Log in</button>
        </form>
      </div>
    </div>
  );
}
