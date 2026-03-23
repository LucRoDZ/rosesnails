"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import type { Group } from "three";

function NailShape({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = 0.22 + scrollProgress * Math.PI * 0.22 + t * 0.06;
    groupRef.current.rotation.x = -0.23 + Math.sin(t * 0.26) * 0.05;
    groupRef.current.rotation.z = 0.16 + Math.sin(t * 0.2) * 0.035;
    groupRef.current.position.y = Math.sin(t * 0.34) * 0.045;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.14} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.72} position={[0.15, -0.05, 0]}>
        {/* Nail base */}
        <mesh castShadow receiveShadow scale={[0.5, 1.18, 0.15]}>
          <capsuleGeometry args={[0.42, 1.48, 12, 30]} />
          <meshPhysicalMaterial
            color="#F7CFDE"
            roughness={0.1}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.04}
            reflectivity={0.85}
            envMapIntensity={1.1}
            transmission={0.03}
          />
        </mesh>

        {/* Baby-boomer soft white blend near tip */}
        <mesh castShadow position={[0, 0.88, 0.02]} scale={[0.47, 0.54, 0.16]}>
          <capsuleGeometry args={[0.42, 0.22, 10, 24]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.02}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.2}
            transparent
            opacity={0.52}
          />
        </mesh>

        {/* Ultra soft fade extension to avoid hard transition */}
        <mesh position={[0, 1.16, 0.02]} scale={[0.46, 0.32, 0.155]}>
          <capsuleGeometry args={[0.42, 0.18, 10, 20]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.09}
            metalness={0.01}
            clearcoat={1}
            clearcoatRoughness={0.04}
            transparent
            opacity={0.68}
            envMapIntensity={1.15}
          />
        </mesh>

        {/* Soft gloss highlight */}
        <mesh position={[-0.06, 0.22, 0.11]} rotation={[0, 0, 0.16]}>
          <planeGeometry args={[0.045, 0.92]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.36} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={0.95}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-2.2, 1.6, -3]} intensity={0.4} color="#FE92BF" />
      <pointLight position={[2.6, -1.6, 3]} intensity={0.3} color="#BD1148" />
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
        camera={{ position: [0.06, 0.74, 3.5], fov: 36 }}
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
