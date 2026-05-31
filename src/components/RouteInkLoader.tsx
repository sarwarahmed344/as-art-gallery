import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** A thin white ink line that draws across the top whenever the route changes. */
export function RouteInkLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (status === "pending") {
      setShow(true);
      setPhase("in");
    } else if (status === "idle") {
      const t1 = setTimeout(() => setPhase("out"), 350);
      const t2 = setTimeout(() => setShow(false), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [status]);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-px">
      <div
        className="h-px origin-left bg-white"
        style={{
          transform: phase === "in" ? undefined : "scaleX(1)",
          animation: phase === "in" ? "ink-line 0.8s cubic-bezier(.7,0,.2,1) forwards" : "ink-line-out 0.4s ease forwards",
          boxShadow: "0 0 8px rgba(255,255,255,0.7)",
        }}
      />
    </div>
  );
}
