import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, LogOut, Mail, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { getAllWallItems, updateWallItemStatus } from "@/lib/wall.functions";
import { getAllCommissions, updateCommissionStatus } from "@/lib/commissions.functions";
import { getAllArtistApplications, updateArtistApplicationStatus } from "@/lib/artists.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AS Commission Tracker" },
      { name: "description", content: "Private admin dashboard for AS Art Gallery commissions and submissions." },
    ],
  }),
  component: AdminPage,
});

const WALL_STATUS = ["pending", "approved", "rejected"] as const;
const COMMISSION_STATUS = ["new", "confirmed", "paid", "in_progress", "completed", "cancelled"] as const;
const APPLICATION_STATUS = ["pending", "approved", "rejected"] as const;

function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const signOut = () => supabase.auth.signOut();

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">Loading…</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <div className="panel mx-auto w-full max-w-md p-10 sm:p-12">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6" />
            <h1 className="font-display text-3xl font-bold uppercase tracking-tight">AS Commission Tracker</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">Admin access</p>

          <form onSubmit={signIn} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-ink" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-ink" placeholder="••••••••" required />
            </div>
            {authError && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500">{authError}</p>}
            <button type="submit" className="btn-ink w-full">Log in</button>
            <Link to="/" className="block text-center font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 hover:underline">
              Back to site
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="border-b-2 border-[var(--ink)] px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight">Admin Dashboard</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">AS Commission Tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.2em] hover:underline">
              View site
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-1 border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--ink)" }}>
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <DashboardPanels />
      </main>
    </div>
  );
}

function DashboardPanels() {
  const [activeTab, setActiveTab] = useState<"commissions" | "wall" | "artists">("commissions");

  const { data: wallItems = [] } = useSuspenseQuery({
    queryKey: ["admin", "wall"],
    queryFn: () => getAllWallItems(),
  });
  const { data: commissions = [] } = useSuspenseQuery({
    queryKey: ["admin", "commissions"],
    queryFn: () => getAllCommissions(),
  });
  const { data: applications = [] } = useSuspenseQuery({
    queryKey: ["admin", "artists"],
    queryFn: () => getAllArtistApplications(),
  });

  const updateWall = useServerFn(updateWallItemStatus);
  const updateCommission = useServerFn(updateCommissionStatus);
  const updateApplication = useServerFn(updateArtistApplicationStatus);

  const counts = {
    commissions: commissions.filter((c) => c.status === "new").length,
    wall: wallItems.filter((w) => w.status === "pending").length,
    artists: applications.filter((a) => a.status === "pending").length,
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Pending commissions" count={counts.commissions} active={activeTab === "commissions"} onClick={() => setActiveTab("commissions")} />
        <SummaryCard label="Wall submissions" count={counts.wall} active={activeTab === "wall"} onClick={() => setActiveTab("wall")} />
        <SummaryCard label="Artist applications" count={counts.artists} active={activeTab === "artists"} onClick={() => setActiveTab("artists")} />
      </div>

      <div className="mt-8 flex gap-3 border-b-2 border-[var(--ink)] pb-3">
        {(["commissions", "wall", "artists"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={activeTab === tab ? { background: "var(--ink)", color: "var(--paper)" } : undefined}
          >
            {tab === "commissions" ? "Commissions" : tab === "wall" ? "Gallery Wall" : "Artist Applications"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "commissions" && (
          <ListGrid
            items={commissions}
            render={(c) => (
              <div className="panel p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl font-bold uppercase">{c.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{c.tier} · {c.style}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-3 text-sm opacity-85">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.15em] opacity-70">
                  {c.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {c.email}</span>}
                  {c.instagram && <span>{c.instagram}</span>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {COMMISSION_STATUS.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateCommission({ data: { id: c.id, status: s } })}
                      className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                      style={c.status === s ? { background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" } : { borderColor: "var(--ink)" }}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />
        )}

        {activeTab === "wall" && (
          <ListGrid
            items={wallItems}
            render={(w) => (
              <div className="panel p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-display text-xl font-bold uppercase">{w.artist_name || "Anonymous"}</p>
                  <StatusBadge status={w.status} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{w.type} {w.sector ? "· " + w.sector : ""}</p>
                <div className="mt-3 aspect-square border-2 border-[var(--ink)]">
                  {w.image_data ? (
                    <img src={w.image_data} alt={w.prompt || "Submission"} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center opacity-50">No preview</div>
                  )}
                </div>
                {w.prompt && <p className="mt-2 text-sm opacity-80">{w.prompt}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {WALL_STATUS.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateWall({ data: { id: w.id, status: s } })}
                      className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                      style={w.status === s ? { background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" } : { borderColor: "var(--ink)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />
        )}

        {activeTab === "artists" && (
          <ListGrid
            items={applications}
            render={(a) => (
              <div className="panel p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl font-bold uppercase">{a.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">@{a.instagram}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <p className="mt-3 text-sm opacity-85">{a.note}</p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.15em] opacity-70">
                  <span>{a.email}</span>
                  {a.portfolio_url && <a href={a.portfolio_url} target="_blank" rel="noopener noreferrer" className="underline">Portfolio</a>}
                  {a.style && <span>{a.style}</span>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {APPLICATION_STATUS.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateApplication({ data: { id: a.id, status: s } })}
                      className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                      style={a.status === s ? { background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" } : { borderColor: "var(--ink)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />
        )}
      </div>
    </>
  );
}

function SummaryCard({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="panel p-6 text-left transition"
      style={active ? { background: "var(--ink)", color: "var(--paper)" } : undefined}
    >
      <div className="font-display text-5xl font-bold">{count}</div>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">{label}</p>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const icons: Record<string, React.ReactNode> = {
    new: <AlertCircle className="h-3.5 w-3.5" />,
    pending: <Clock className="h-3.5 w-3.5" />,
    approved: <CheckCircle className="h-3.5 w-3.5" />,
    confirmed: <CheckCircle className="h-3.5 w-3.5" />,
    completed: <CheckCircle className="h-3.5 w-3.5" />,
    rejected: <XCircle className="h-3.5 w-3.5" />,
    cancelled: <XCircle className="h-3.5 w-3.5" />,
  };
  return (
    <span className="inline-flex items-center gap-1 border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--ink)" }}>
      {icons[status] ?? null} {status.replace("_", " ")}
    </span>
  );
}

function ListGrid<T>({ items, render }: { items: T[]; render: (item: T) => React.ReactNode }) {
  if (items.length === 0) {
    return (
      <div className="panel p-12 text-center">
        <p className="font-serif italic opacity-70">Nothing here yet.</p>
      </div>
    );
  }
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, i) => <div key={i}>{render(item)}</div>)}</div>;
}
