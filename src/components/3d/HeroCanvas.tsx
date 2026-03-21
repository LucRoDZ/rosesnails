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
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-40 h-16 rounded-2xl opacity-60"
        style={{
          background: "linear-gradient(135deg, #FE92BF 0%, #BD1148 100%)",
          boxShadow: "0 8px 32px rgba(189,17,72,0.3)",
        }}
      />
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
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (webglSupported === null) return null;
  if (webglSupported === false) return <HeroFallback />;

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
