import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "as-pwa-install-dismissed-until";

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Hide if already installed (standalone mode)
    if (window.matchMedia?.("(display-mode: standalone)").matches) return;
    // Hide if dismissed recently
    try {
      const until = Number(localStorage.getItem(DISMISS_KEY) || "0");
      if (until && Date.now() < until) return;
    } catch {}

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
    } catch {}
    setShow(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t-2 px-4 py-3"
      style={{ background: "#0a0a0a", color: "#ffffff", borderColor: "#ffffff" }}
      role="dialog"
      aria-label="Install AS Art Gallery"
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
          Add AS Art Gallery to your home screen
        </span>
        <div className="flex gap-2">
          <button
            onClick={dismiss}
            className="border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ borderColor: "#ffffff" }}
          >
            Not now
          </button>
          <button
            onClick={install}
            className="border-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ borderColor: "#ffffff", background: "#ffffff", color: "#0a0a0a" }}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
