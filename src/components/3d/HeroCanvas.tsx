"use client";

import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const NailScene = lazy(() =>
  import("./NailScene").then((m) => ({ default: m.NailScene }))
);

// Fallback visual when WebGL not available or device is weak
function HeroFallback() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
    >
      <div className="absolute right-[10%] top-[24%] w-[120px] h-[280px] rotate-[14deg]">
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.93) 0%, rgba(251,226,236,0.96) 28%, rgba(246,193,214,0.93) 66%, rgba(241,171,198,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.36)",
            boxShadow: "0 16px 34px rgba(189,17,72,0.16)",
          }}
        />
        <div
          className="absolute left-[12%] right-[12%] top-[6%] h-[58px] rounded-[999px]"
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 4px 14px rgba(255,255,255,0.28)",
          }}
        />

        <div
          className="absolute left-[28%] top-[28%] w-[4px] h-[126px] rounded-full"
          style={{ background: "rgba(255,255,255,0.26)" }}
        />
        <div
          className="absolute -inset-6 rounded-[999px]"
          style={{
            background: "radial-gradient(circle, rgba(254,146,191,0.16) 0%, transparent 70%)",
            filter: "blur(5px)",
          }}
        />
      </div>
    </div>
  );
}

function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    // Use a microtask to avoid setState being considered synchronous
    const check = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
        return !!ctx;
      } catch {
        return false;
      }
    };

    Promise.resolve(check()).then(setSupported);
  }, []);

  return supported;
}

export function HeroCanvas({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const webglSupported = useWebGLSupport();
  const [contextLost, setContextLost] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Bascule sur le fallback si le GPU libère le contexte WebGL
  useEffect(() => {
    const handleContextLost = () => setContextLost(true);
    window.addEventListener("webglcontextlost", handleContextLost, true);
    return () => window.removeEventListener("webglcontextlost", handleContextLost, true);
  }, []);

  if (webglSupported === null) return null;
  if (webglSupported === false || contextLost) return <HeroFallback />;

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {inView && (
        <Suspense fallback={<HeroFallback />}>
          <NailScene
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </Suspense>
      )}
    </div>
  );
}
