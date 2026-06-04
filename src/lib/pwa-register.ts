// Guarded service-worker registration. Never runs in dev or Lovable preview.
// Honors ?sw=off as a kill switch. See PWA skill for the contract.

const SW_PATH = "/sw.js";

function isPreviewHost(host: string): boolean {
  return (
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host === "lovableproject.com" ||
    host.endsWith(".lovableproject.com") ||
    host === "lovableproject-dev.com" ||
    host.endsWith(".lovableproject-dev.com") ||
    host === "beta.lovable.dev" ||
    host.endsWith(".beta.lovable.dev")
  );
}

async function unregisterAppSW() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    regs
      .filter((r) => r.active?.scriptURL?.endsWith(SW_PATH) || r.installing?.scriptURL?.endsWith(SW_PATH) || r.waiting?.scriptURL?.endsWith(SW_PATH))
      .map((r) => r.unregister()),
  );
}

export function registerPWA() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  const inIframe = window.self !== window.top;
  const host = window.location.hostname;
  const killSwitch = new URLSearchParams(window.location.search).get("sw") === "off";
  const refuse = !import.meta.env.PROD || inIframe || isPreviewHost(host) || killSwitch;

  if (refuse) {
    void unregisterAppSW();
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(SW_PATH, { scope: "/" }).catch(() => {});
  });
}
