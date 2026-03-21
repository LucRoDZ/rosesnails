"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import type { Mesh } from "three";

function NailShape({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = scrollProgress * Math.PI * 0.5 + t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow>
        {/* Stylized nail shape using a rounded box */}
        <boxGeometry args={[1.2, 0.15, 1.6, 4, 1, 4]} />
        <meshPhysicalMaterial
          color="#FE92BF"
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#FE92BF" />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#BD1148" />
      <Environment preset="studio" />
      <NailShape scrollProgress={scrollProgress} />
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
        camera={{ position: [0, 1, 3.5], fov: 45 }}
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
