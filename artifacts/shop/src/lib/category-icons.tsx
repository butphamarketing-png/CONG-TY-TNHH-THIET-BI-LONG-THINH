import {
  Bath,
  Flame,
  Droplets,
  Zap,
  Lock,
  Grid3X3,
  ShowerHead,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { IndustryGroup } from "@/types/catalog";

export function getCategoryIconComponent(slug: IndustryGroup | string): LucideIcon {
  switch (slug) {
    case "thiet-bi-ve-sinh":
      return Bath;
    case "thiet-bi-bep":
      return Flame;
    case "thiet-bi-nuoc":
      return Droplets;
    case "thiet-bi-dien":
      return Zap;
    case "thiet-bi-khoa":
      return Lock;
    case "gach-op-lat":
      return Layers;
    case "phu-kien":
      return ShowerHead;
    default:
      return Grid3X3;
  }
}

export function getCategoryIcon(slug: IndustryGroup | string) {
  const Icon = getCategoryIconComponent(slug);
  return <Icon className="w-4 h-4" />;
}
