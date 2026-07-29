"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import GradientBlob from "./GradientBlob";
import FloatingParticles from "./FloatingParticles";
import { useDeviceTier } from "@/hooks/useDeviceTier";

function MouseParallaxRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    if (reducedMotion) return;
    camera.position.x += (target.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (target.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  useFrame((state) => {
    target.current.x = state.pointer.x;
    target.current.y = state.pointer.y;
  });

  return null;
}

export default function HeroScene() {
  const { dpr, reducedMotion, particleCount } = useDeviceTier();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 3, 5]} intensity={40} color="#b79bff" />
          <pointLight position={[-4, -2, -3]} intensity={20} color="#ff9d81" />
          <GradientBlob reducedMotion={reducedMotion} />
          <FloatingParticles count={particleCount > 900 ? 60 : 36} reducedMotion={reducedMotion} />
          <MouseParallaxRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
