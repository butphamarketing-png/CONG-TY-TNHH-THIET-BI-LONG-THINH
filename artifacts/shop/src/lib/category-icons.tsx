import {
  Bath, Flame, Droplets, Zap, Lock, Grid3X3, ShowerHead, Layers,
} from "lucide-react";
import type { IndustryGroup } from "@/types/catalog";

export function getCategoryIcon(slug: IndustryGroup | string) {
  switch (slug) {
    case "thiet-bi-ve-sinh": return <Bath className="w-4 h-4" />;
    case "thiet-bi-bep": return <Flame className="w-4 h-4" />;
    case "thiet-bi-nuoc": return <Droplets className="w-4 h-4" />;
    case "thiet-bi-dien": return <Zap className="w-4 h-4" />;
    case "thiet-bi-khoa": return <Lock className="w-4 h-4" />;
    case "gach-op-lat": return <Layers className="w-4 h-4" />;
    case "phu-kien": return <ShowerHead className="w-4 h-4" />;
    default: return <Grid3X3 className="w-4 h-4" />;
  }
}
