import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 text-white">
      <div className="max-w-md text-center">
        <svg viewBox="0 0 200 60" className="mx-auto h-16 w-48 opacity-80" aria-hidden>
          <path
            d="M5 40 Q 30 10, 60 35 T 110 32 Q 130 50, 160 25 L 165 28 M 170 30 L 195 35"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 6 14 4 80 6"
          />
        </svg>
        <h1 className="mt-6 font-display text-6xl font-bold tracking-tighter">404</h1>
        <p className="mt-3 text-sm text-white/65">
          This page got lost in the sketchbook.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AS Art Gallery — Concept Art by @sarwarr.rr" },
      { name: "description", content: "Monochrome ink portraits and vivid anime pop-art by AS. Based in Hyderabad." },
      { name: "author", content: "AS (@sarwarr.rr)" },
      { property: "og:site_name", content: "AS Art Gallery" },
      { property: "og:title", content: "AS Art Gallery — Monochrome & Vivid Concept Art by @sarwarr.rr" },
      { property: "og:description", content: "High-contrast ink sketches and vivid anime pop-art. Two sectors. One artist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sarwarr.rr" },
      { name: "twitter:creator", content: "@sarwarr.rr" },
      { name: "twitter:title", content: "AS Art Gallery — Concept Art by @sarwarr.rr" },
      { name: "twitter:description", content: "Monochrome ink portraits and vivid anime pop-art by AS. Based in Hyderabad." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
