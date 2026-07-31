'use client';

import { Component, Suspense, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, type RapierRigidBody } from '@react-three/rapier';
import { Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceTier } from '@/hooks/useDeviceTier';

const SIGNAL = '#4C6FFF';
const GLOW = '#7C93FF';
const EMBER = '#FF5A36';
const STEEL = '#6E7480';

interface NodeSpec {
  id: number;
  position: [number, number, number];
  scale: number;
  color: string;
  detail: number;
}

function buildNodes(count: number, spread: number): NodeSpec[] {
  const nodes: NodeSpec[] = [];
  for (let i = 0; i < count; i++) {
    const accent = i % 7 === 0 ? EMBER : i % 3 === 0 ? GLOW : STEEL;
    nodes.push({
      id: i,
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.8,
        (Math.random() - 0.5) * spread * 0.6,
      ],
      scale: 0.12 + Math.random() * 0.22,
      color: accent,
      detail: 0,
    });
  }
  return nodes;
}

function DriftingNode({ spec }: { spec: NodeSpec }) {
  const body = useRef<RapierRigidBody>(null);

  useFrame((state) => {
    if (!body.current) return;
    const t = state.clock.elapsedTime;
    const driftForce = {
      x: Math.sin(t * 0.15 + spec.id) * 0.0006,
      y: Math.cos(t * 0.12 + spec.id * 1.3) * 0.0006,
      z: Math.sin(t * 0.1 + spec.id * 0.7) * 0.0006,
    };
    body.current.applyImpulse(driftForce, true);

    const pos = body.current.translation();
    const pull = 0.00025;
    body.current.applyImpulse(
      { x: -pos.x * pull, y: -pos.y * pull, z: -pos.z * pull },
      true
    );
  });

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.65}
      friction={0.1}
      linearDamping={0.55}
      angularDamping={0.75}
      position={spec.position}
      canSleep={false}
      gravityScale={0}
    >
      <Icosahedron args={[spec.scale, spec.detail]}>
        <meshBasicMaterial color={spec.color} wireframe transparent opacity={0.85} />
      </Icosahedron>
    </RigidBody>
  );
}

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function InvisibleBounds() {
  const size = 6;
  return (
    <>
      <CuboidCollider args={[size, 0.1, size]} position={[0, -size, 0]} restitution={0.8} />
      <CuboidCollider args={[size, 0.1, size]} position={[0, size, 0]} restitution={0.8} />
      <CuboidCollider args={[0.1, size, size]} position={[-size, 0, 0]} restitution={0.8} />
      <CuboidCollider args={[0.1, size, size]} position={[size, 0, 0]} restitution={0.8} />
      <CuboidCollider args={[size, size, 0.1]} position={[0, 0, -size]} restitution={0.8} />
      <CuboidCollider args={[size, size, 0.1]} position={[0, 0, size]} restitution={0.8} />
    </>
  );
}

function Scene({ nodeCount }: { nodeCount: number }) {
  const nodes = useMemo(() => buildNodes(nodeCount, 7), [nodeCount]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.3}>
        <CoreOrb />
      </Float>
      <Physics gravity={[0, 0, 0]}>
        <InvisibleBounds />
        {nodes.map((n) => (
          <DriftingNode key={n.id} spec={n} />
        ))}
      </Physics>
    </>
  );
}

const STATIC_FALLBACK = (
  <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
    <div className="h-64 w-64 rounded-full border border-signal/30 bg-radial-signal" />
  </div>
);

/**
 * Catches WebGL context failures and any error thrown while the R3F/Rapier
 * tree mounts, so a device without WebGL (or a WASM load failure) degrades
 * to the static fallback instead of taking the whole page down with it.
 */
class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('VectorField failed to render, falling back to static visual:', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function VectorField() {
  const { tier, dpr, reducedMotion } = useDeviceTier();

  const nodeCount = tier === 'low' ? 10 : tier === 'mid' ? 18 : 28;

  if (reducedMotion) {
    return STATIC_FALLBACK;
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <CanvasErrorBoundary fallback={STATIC_FALLBACK}>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 9], fov: 45 }}
          gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: true }}
          frameloop="always"
        >
          {/* <Physics> lazily loads the Rapier WASM module and must be
              wrapped in Suspense — without this, the thrown load-promise
              had no boundary to resolve against and crashed the page. */}
          <Suspense fallback={null}>
            <Scene nodeCount={nodeCount} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
    }
