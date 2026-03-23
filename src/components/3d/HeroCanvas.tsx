"use client";

import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const NailScene = lazy(() =>
  import("./NailScene").then((m) => ({ default: m.NailScene }))
);

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

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {inView && (
        <Suspense fallback={null}>
          <NailScene
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </Suspense>
      )}
    </div>
  );
}
