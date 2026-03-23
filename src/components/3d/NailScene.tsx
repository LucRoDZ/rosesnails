"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import type { Group } from "three";

function FlowerModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { scene } = useGLTF("/flower.glb");
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = scrollProgress * 0.4 + t * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.34) * 0.04;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.14}>
      <group ref={groupRef} scale={6} position={[0, 0, 0]} rotation={[0, 0, 0.310]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload("/flower.glb");

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 5]} intensity={1.0} color="#ffffff" castShadow />
      <pointLight position={[-2, 2, -2]} intensity={0.4} color="#FE92BF" />
      <Environment preset="studio" />
      <FlowerModel scrollProgress={scrollProgress} />
    </>
  );
}

interface NailSceneProps {
  scrollProgress?: number;
  className?: string;
}

export function NailScene({ scrollProgress = 0, className = "" }: NailSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
