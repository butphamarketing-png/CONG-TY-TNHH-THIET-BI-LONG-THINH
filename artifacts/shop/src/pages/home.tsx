import { CATEGORIES, BRANDS, PRODUCTS } from "@/lib/tdm-data";
import { getMainGroups, getBrandsForGroup } from "@/lib/category-utils";
import { HeroWithCategoryMenu } from "@/components/home/HeroWithCategoryMenu";
import { ServiceBenefits } from "@/components/home/ServiceBenefits";
import { CategoryHeroSection } from "@/components/home/CategoryHeroSection";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { CategoryProductSection } from "@/components/home/CategoryProductSection";
import { PromotionBanners } from "@/components/home/PromotionBanners";
import { EnhancedShowroomSection } from "@/components/home/EnhancedShowroomSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CTASection } from "@/components/home/CTASection";

/** Homepage industries shown like tdm.vn (5 main groups) */
const HOMEPAGE_GROUPS = [
  "thiet-bi-ve-sinh",
  "thiet-bi-bep",
  "thiet-bi-nuoc",
  "thiet-bi-khoa",
  "thiet-bi-dien",
] as const;

export function Home() {
  const mainGroups = getMainGroups(CATEGORIES);
  const homepageIndustries = mainGroups.filter((g) =>
    HOMEPAGE_GROUPS.includes(g.groupSlug as typeof HOMEPAGE_GROUPS[number])
  );

  return (
    <div className="w-full flex flex-col bg-gray-50">
      {/* SECTION 1-2: HERO AREA WITH CATEGORY MENU */}
      <HeroWithCategoryMenu />

      {/* SECTION 3: SERVICE BENEFITS */}
      <ServiceBenefits />

      {/* SECTION 4: THIẾT BỊ VỆ SINH */}
      <div className="container mx-auto px-4 py-6">
        <CategoryHeroSection
          groupSlug="thiet-bi-ve-sinh"
          title="Thiết bị vệ sinh"
          description="Bồn cầu, lavabo, vòi sen, bồn tắm chính hãng"
          categoryIcons={[
            { name: "Bồn cầu", slug: "bon-cau", icon: "toilet" },
            { name: "Lavabo", slug: "chau-lavabo", icon: "sink" },
            { name: "Vòi lavabo", slug: "voi-lavabo", icon: "faucet" },
            { name: "Sen tắm", slug: "voi-sen", icon: "shower" },
            { name: "Bồn tắm", slug: "bon-tam", icon: "bathtub" },
            { name: "Bồn tiểu", slug: "bon-tieu", icon: "urinal" },
          ]}
        />
      </div>

      {/* SECTION 5: THƯƠNG HIỆU THIẾT BỊ VỆ SINH */}
      <div className="container mx-auto px-4 py-2">
        <BrandShowcase
          brands={getBrandsForGroup(BRANDS, "thiet-bi-ve-sinh")}
          title="Thương hiệu thiết bị vệ sinh"
        />
      </div>

      {/* SECTION 6: THIẾT BỊ BẾP */}
      <div className="container mx-auto px-4 py-6">
        <CategoryHeroSection
          groupSlug="thiet-bi-bep"
          title="Thiết bị bếp"
          description="Bếp từ, máy hút mùi, chậu bếp, vòi bếp cao cấp"
          categoryIcons={[
            { name: "Bếp từ", slug: "bep-tu", icon: "stove" },
            { name: "Máy hút mùi", slug: "may-hut-mui", icon: "fan" },
            { name: "Chậu bếp", slug: "chau-rua-chen", icon: "sink" },
            { name: "Vòi bếp", slug: "voi-rua-chen", icon: "faucet" },
            { name: "Máy rửa chén", slug: "may-rua-chen", icon: "dishwasher" },
          ]}
        />
      </div>

      {/* SECTION 7: THƯƠNG HIỆU THIẾT BỊ BẾP */}
      <div className="container mx-auto px-4 py-2">
        <BrandShowcase
          brands={getBrandsForGroup(BRANDS, "thiet-bi-bep")}
          title="Thương hiệu thiết bị bếp"
        />
      </div>

      {/* SECTION 8: THIẾT BỊ NƯỚC */}
      <div className="container mx-auto px-4 py-6">
        <CategoryHeroSection
          groupSlug="thiet-bi-nuoc"
          title="Thiết bị nước"
          description="Bồn nước, máy nước nóng, máy lọc nước"
          categoryIcons={[
            { name: "Bồn nước", slug: "bon-nuoc", icon: "water-tank" },
            { name: "Máy nước nóng", slug: "may-nuoc-nong", icon: "heater" },
            { name: "Máy lọc nước", slug: "may-loc-nuoc", icon: "filter" },
          ]}
        />
      </div>

      {/* SECTION 9: KHÓA CỬA & NHÀ THÔNG MINH */}
      <div className="container mx-auto px-4 py-6">
        <CategoryHeroSection
          groupSlug="thiet-bi-khoa"
          title="Khóa cửa & Nhà thông minh"
          description="Khóa điện tử, khóa cửa chính hãng"
          categoryIcons={[
            { name: "Khóa điện tử", slug: "khoa-dien-tu", icon: "lock" },
            { name: "Khóa cửa", slug: "khoa-cua-chinh", icon: "door" },
            { name: "Két sắt", slug: "ket-sat", icon: "safe" },
          ]}
        />
      </div>

      {/* SECTION 10: PROMOTION BANNERS */}
      <PromotionBanners />

      {/* CATEGORY PRODUCT BLOCKS */}
      <div className="container mx-auto px-4 py-6">
        {homepageIndustries.slice(0, 3).map((group) => (
          <CategoryProductSection
            key={`product-block-${group.id}`}
            category={group}
            products={PRODUCTS.filter(
              (p) =>
                p.categorySlug === group.slug ||
                group.children?.some((c) => c.slug === p.categorySlug)
            )}
            limit={4}
          />
        ))}
      </div>

      {/* SECTION 13: HỆ THỐNG SHOWROOM */}
      <div className="container mx-auto px-4 py-6">
        <EnhancedShowroomSection />
      </div>

      {/* SECTION 14: TIN TỨC NỔI BẬT */}
      <NewsSection />

      {/* SECTION 15: CTA BEFORE FOOTER */}
      <CTASection />
    </div>
  );
}
