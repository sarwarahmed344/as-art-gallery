import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AS Commission Tracker" },
      { name: "description", content: "Private admin dashboard for AS Art Gallery commissions and submissions." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    if (username.trim() && password.length >= 4) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <div className="panel mx-auto w-full max-w-md p-10 sm:p-12">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6" />
            <h1 className="font-display text-3xl font-bold uppercase tracking-tight">AS Commission Tracker</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">Private access</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-ink"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-ink"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-ink w-full">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-5xl font-bold uppercase">Admin Dashboard</h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">AS Commission Tracker</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="panel p-6">
            <div className="font-display text-5xl font-bold">0</div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Pending commissions</p>
          </div>
          <div className="panel p-6">
            <div className="font-display text-5xl font-bold">0</div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Gallery wall submissions</p>
          </div>
          <div className="panel p-6">
            <div className="font-display text-5xl font-bold">0</div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Artist applications</p>
          </div>
        </div>

        <p className="mt-8 opacity-60">This is a placeholder admin dashboard. Connect Lovable Cloud to enable real commission, submission, and artist tracking.</p>
      </div>
    </div>
  );
}
