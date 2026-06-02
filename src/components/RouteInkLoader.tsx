import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** A thick black ink line that draws across the top whenever the route changes. */
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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]">
      <div
        className="h-[3px] origin-left"
        style={{
          background: "var(--ink)",
          transform: phase === "in" ? undefined : "scaleX(1)",
          animation: phase === "in" ? "ink-line 0.7s cubic-bezier(.7,0,.2,1) forwards" : "ink-line-out 0.4s ease forwards",
        }}
      />
    </div>
  );
}
