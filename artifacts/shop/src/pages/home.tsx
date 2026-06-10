import { HeroWithCategoryMenu } from "@/components/home/HeroWithCategoryMenu";
import { ServiceBenefits } from "@/components/home/ServiceBenefits";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { CategoryBrowseSection } from "@/components/home/CategoryBrowseSection";
import { EnhancedShowroomSection } from "@/components/home/EnhancedShowroomSection";
import { NewsSection } from "@/components/home/NewsSection";
import { SocialLinksSection } from "@/components/home/SocialLinksSection";

const CATEGORY_GROUPS = [
  { slug: "thiet-bi-ve-sinh" as const, title: "Thiết bị vệ sinh" },
  { slug: "thiet-bi-bep" as const, title: "Thiết bị bếp" },
  { slug: "thiet-bi-nuoc" as const, title: "Thiết bị nước" },
  { slug: "thiet-bi-khoa" as const, title: "Khóa cửa & Nhà thông minh" },
  { slug: "thiet-bi-dien" as const, title: "Thiết bị điện" },
];

export function Home() {
  return (
    <div className="w-full flex flex-col bg-[#fafafa]">
      <HeroWithCategoryMenu />
      <ServiceBenefits />
      <FlashSaleSection />

      {CATEGORY_GROUPS.map((group) => (
        <CategoryBrowseSection
          key={group.slug}
          groupSlug={group.slug}
          title={group.title}
        />
      ))}

      <div className="container mx-auto px-4 py-6">
        <EnhancedShowroomSection />
      </div>

      <NewsSection />
      <SocialLinksSection />
    </div>
  );
}
