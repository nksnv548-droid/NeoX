"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function GradientBlob({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!reducedMotion) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
    if (materialRef.current) {
      materialRef.current.distort = 0.35 + Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.6, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#6f4cf5"
        emissive="#3a1f8f"
        emissiveIntensity={0.4}
        roughness={0.15}
        metalness={0.3}
        distort={0.35}
        speed={1.4}
        envMapIntensity={1.2}
      />
    </Sphere>
  );
}
