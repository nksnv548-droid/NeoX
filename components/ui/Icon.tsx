import {
  Bot,
  Code2,
  Cloud,
  Megaphone,
  Smartphone,
  Sparkles,
  Layers,
  Zap,
  Gem,
  Eye,
  Heart,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  code: Code2,
  cloud: Cloud,
  megaphone: Megaphone,
  smartphone: Smartphone,
  sparkles: Sparkles,
  layers: Layers,
  zap: Zap,
  gem: Gem,
  eye: Eye,
  heart: Heart,
  "trending-up": TrendingUp,
  rocket: Rocket,
};

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp size={size} className={className} />;
}
