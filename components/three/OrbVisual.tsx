"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const GradientBlob = dynamic(() => import("@/components/three/GradientBlob"), {
  ssr: false,
});

export default function OrbVisual() {
  const { dpr, reducedMotion } = useDeviceTier();

  return (
    <div className="relative aspect-square w-full max-w-sm mx-auto">
      <div className="absolute inset-0 rounded-full bg-bloom-500/20 blur-3xl animate-float-slower" />
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 2, 4]} intensity={30} color="#b79bff" />
          <pointLight position={[-3, -2, -2]} intensity={16} color="#5ad4d4" />
          <GradientBlob reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
