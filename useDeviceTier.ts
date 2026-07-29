"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

interface TierInfo {
  tier: DeviceTier;
  dpr: number;
  particleCount: number;
  reducedMotion: boolean;
}

export function useDeviceTier(): TierInfo {
  const [info, setInfo] = useState<TierInfo>({
    tier: "mid",
    dpr: 1,
    particleCount: 800,
    reducedMotion: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cores = navigator.hardwareConcurrency || 4;
    const mem = (navigator as any).deviceMemory || 4;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const width = window.innerWidth;

    let tier: DeviceTier = "mid";
    if (isMobile && (cores <= 4 || mem <= 4 || width < 480)) {
      tier = "low";
    } else if (!isMobile && cores >= 8 && mem >= 8) {
      tier = "high";
    }

    const dpr =
      tier === "low"
        ? Math.min(window.devicePixelRatio, 1)
        : tier === "high"
        ? Math.min(window.devicePixelRatio, 2)
        : Math.min(window.devicePixelRatio, 1.5);

    const particleCount =
      tier === "low" ? 250 : tier === "high" ? 1800 : 900;

    setInfo({ tier, dpr, particleCount, reducedMotion });
  }, []);

  return info;
}
