import { Link } from "wouter";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  HeadphonesIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, BRANDS, NEWS, POLICIES } from "@/lib/tdm-data";
import { getMainGroups, getBrandsForGroup } from "@/lib/category-utils";
import { HeroBanner } from "@/components/home/HeroBanner";
import { IndustryBlock } from "@/components/home/IndustryBlock";
import { ShowroomSection } from "@/components/home/ShowroomSection";

/** Homepage industries shown like tdm.vn (5 main groups) */
const HOMEPAGE_GROUPS = [
  "thiet-bi-ve-sinh",
  "thiet-bi-bep",
  "thiet-bi-nuoc",
  "thiet-bi-khoa",
  "thiet-bi-dien",
] as const;

function getPolicyIcon(iconName: string) {
  switch (iconName) {
    case "truck": return <Truck className="w-8 h-8 text-orange-600" />;
    case "shield": return <ShieldCheck className="w-8 h-8 text-orange-600" />;
    case "refresh": return <RotateCcw className="w-8 h-8 text-orange-600" />;
    case "headset": return <HeadphonesIcon className="w-8 h-8 text-orange-600" />;
    default: return <ShieldCheck className="w-8 h-8 text-orange-600" />;
  }
}

export function Home() {
  const mainGroups = getMainGroups(CATEGORIES);
  const homepageIndustries = mainGroups.filter((g) =>
    HOMEPAGE_GROUPS.includes(g.groupSlug as typeof HOMEPAGE_GROUPS[number])
  );

  return (
    <div className="w-full flex flex-col gap-6 pb-24 bg-gray-50">
      <HeroBanner />

      {/* Policy Bar — tdm.vn: Giao hàng / Chính hãng / Lắp đặt / Giá thành */}
      <section className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POLICIES.map((policy) => (
              <div key={policy.id} className="flex items-center gap-3 px-2">
                <div className="shrink-0">{getPolicyIcon(policy.icon)}</div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">{policy.title}</h3>
                  {policy.description && (
                    <p className="text-xs text-gray-500 hidden md:block leading-snug">{policy.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry blocks — each group: category tiles + brand strip */}
      <div className="container mx-auto px-4 flex flex-col gap-6">
        {homepageIndustries.map((group) => (
          <IndustryBlock
            key={group.id}
            group={group}
            brands={getBrandsForGroup(BRANDS, group.groupSlug)}
          />
        ))}
      </div>

      {/* Showroom */}
      <div className="container mx-auto px-4">
        <ShowroomSection />
      </div>

      {/* Tin tức */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <span className="w-1 h-6 bg-orange-600 rounded inline-block" />
            Tin tức &amp; Khuyến mãi
          </h2>
          <Link href="/tin-tuc" className="text-orange-600 font-medium hover:underline text-sm flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NEWS.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden border-gray-200 hover:shadow-md transition-all flex flex-col bg-white"
            >
              <Link href={`/tin-tuc/${article.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {article.category && (
                  <span className="absolute top-2 left-2 bg-orange-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                )}
              </Link>
              <CardContent className="p-4 flex flex-col flex-grow">
                <p className="text-[11px] text-gray-500 mb-2">{article.createdAt}</p>
                <Link href={`/tin-tuc/${article.slug}`} className="hover:text-orange-600 transition-colors">
                  <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-snug mb-2">{article.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
