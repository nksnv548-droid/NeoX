'use client';

import { useEffect, useState } from 'react';

export type DeviceTier = 'low' | 'mid' | 'high';

export interface DeviceCapability {
  tier: DeviceTier;
  dpr: number;
  reducedMotion: boolean;
  isTouch: boolean;
}

function computeTier(): DeviceCapability {
  if (typeof window === 'undefined') {
    return { tier: 'mid', dpr: 1, reducedMotion: false, isTouch: false };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const rawDpr = window.devicePixelRatio || 1;

  let tier: DeviceTier = 'high';
  if (isTouch || cores <= 4 || mem <= 4) tier = 'mid';
  if (isTouch && (cores <= 4 || mem <= 4)) tier = 'low';
  if (reducedMotion) tier = 'low';

  const dpr = tier === 'low' ? Math.min(rawDpr, 1) : tier === 'mid' ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2);

  return { tier, dpr, reducedMotion, isTouch };
}

export function useDeviceTier(): DeviceCapability {
  const [caps, setCaps] = useState<DeviceCapability>({
    tier: 'mid',
    dpr: 1,
    reducedMotion: false,
    isTouch: false,
  });

  useEffect(() => {
    setCaps(computeTier());
  }, []);

  return caps;
}
