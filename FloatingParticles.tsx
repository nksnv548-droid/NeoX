"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count: number;
  reducedMotion: boolean;
}

const PALETTE = ["#8f6bff", "#b79bff", "#5ad4d4", "#ff9d81"];

export default function FloatingParticles({
  count,
  reducedMotion,
}: FloatingParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    return new Array(Math.min(count, 60)).fill(0).map((_, i) => {
      const radius = 3 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 6;
      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius - 2,
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.22,
        speed: 0.2 + Math.random() * 0.5,
        color: PALETTE[i % PALETTE.length],
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  // Small ambient dust points (cheap, instanced-like via simple points geometry)
  const dust = useMemo(() => {
    const n = count;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const item = items[i];
      if (!item) return;
      child.position.y += Math.sin(t * item.speed + item.offset) * 0.0015;
      child.rotation.x = t * 0.15 * item.speed;
      child.rotation.y = t * 0.2 * item.speed;
    });
    groupRef.current.rotation.y = t * 0.02;
  });

  return (
    <>
      <group ref={groupRef}>
        {items.map((item, i) => (
          <mesh key={i} position={item.position} scale={item.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color={item.color}
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        ))}
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={dust}
            count={dust.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#c9c3dd"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}
