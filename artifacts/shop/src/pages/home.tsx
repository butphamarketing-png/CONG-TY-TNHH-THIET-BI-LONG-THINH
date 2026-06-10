import { CATEGORIES, BRANDS } from "@/lib/tdm-data";
import { getTdmMenuGroups, getBrandsForGroup, getDescendantSlugs, findCategoryBySlug } from "@/lib/category-utils";
import { useCategoryListings } from "@/hooks/use-catalog";
import { listingToProduct } from "@/lib/catalog-store";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { HeroWithCategoryMenu } from "@/components/home/HeroWithCategoryMenu";
import { ServiceBenefits } from "@/components/home/ServiceBenefits";
import { CategoryHeroSection } from "@/components/home/CategoryHeroSection";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { EnhancedShowroomSection } from "@/components/home/EnhancedShowroomSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CTASection } from "@/components/home/CTASection";
import { Link } from "wouter";
import { ChevronRight, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryUrl, productUrl } from "@/lib/urls";

const CATEGORY_GROUPS = [
  { slug: "thiet-bi-ve-sinh", title: "Thiết bị vệ sinh", description: "Bồn cầu, lavabo, vòi sen, bồn tắm chính hãng" },
  { slug: "thiet-bi-bep", title: "Thiết bị bếp", description: "Bếp từ, máy hút mùi, chậu bếp, vòi bếp cao cấp" },
  { slug: "thiet-bi-nuoc", title: "Thiết bị nước", description: "Bồn nước, máy nước nóng, máy lọc nước" },
  { slug: "thiet-bi-khoa", title: "Khóa cửa & Nhà thông minh", description: "Khóa điện tử, khóa cửa chính hãng" },
  { slug: "thiet-bi-dien", title: "Thiết bị điện", description: "Công tắc, đèn LED, quạt điện, dây cáp" },
] as const;

function ProductGrid({
  title,
  icon,
  products,
  limit = 12,
}: {
  title: string;
  icon?: React.ReactNode;
  products: any[];
  limit?: number;
}) {
  const displayProducts = products.slice(0, limit);
  if (!displayProducts.length) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {displayProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-orange-400 transition-all duration-500 group bg-white"
          >
            <Link href={productUrl(product.slug)} className="block">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                {(product.discount ?? 0) > 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                    -{product.discount}%
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                    HOT
                  </span>
                )}
              </div>
            </Link>
            <CardContent className="p-4">
              <div className="text-xs text-gray-500 mb-1.5 font-medium">{product.brandName}</div>
              <Link href={productUrl(product.slug)} className="block">
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-orange-600">
                  {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
                  </span>
                )}
              </div>
              <Button
                size="sm"
                className="w-full bg-orange-600 hover:bg-orange-700 text-xs py-2.5 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Mua ngay
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  const homepageIndustries = getTdmMenuGroups(CATEGORIES);

  const vsCategory = findCategoryBySlug(CATEGORIES, "thiet-bi-ve-sinh")!;
  const vsDescendantSlugs = getDescendantSlugs(vsCategory);
  const { listings: vsListings } = useCategoryListings("thiet-bi-ve-sinh", true);
  const vsProducts = vsListings
    .filter((p) => vsDescendantSlugs.includes(p.categorySlug))
    .map(listingToProduct);
  const featuredProducts = vsProducts.filter((p) => p.isFeatured);
  const bestSellingProducts = vsProducts.filter((p) => p.isBestSeller);

  return (
    <div className="w-full flex flex-col bg-white">
      <HeroWithCategoryMenu />
      <ServiceBenefits />

      {/* Danh mục cấp 1 — ưu tiên hiển thị trước sản phẩm */}
      {CATEGORY_GROUPS.map((group) => (
        <div key={group.slug}>
          <div className="container mx-auto px-4 pt-4">
            <CategoryHeroSection
              groupSlug={group.slug}
              title={group.title}
              description={group.description}
            />
          </div>
          <div className="container mx-auto px-4 pb-2">
            <BrandShowcase
              brands={getBrandsForGroup(BRANDS, group.slug as any)}
              title={`Thương hiệu ${group.title.toLowerCase()}`}
            />
          </div>
        </div>
      ))}

      <ProductGrid title="Sản phẩm nổi bật" products={featuredProducts} limit={12} />

      <ProductGrid
        title="Sản phẩm bán chạy"
        icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
        products={bestSellingProducts}
        limit={12}
      />

      <div className="container mx-auto px-4 pb-12 text-center">
        <Link
          href={categoryUrl("thiet-bi-ve-sinh")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Xem tất cả sản phẩm thiết bị vệ sinh
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <HomeProductSection
        category={homepageIndustries.find((g) => g.groupSlug === "thiet-bi-bep")!}
        categorySlugs={
          homepageIndustries.find((g) => g.groupSlug === "thiet-bi-bep")?.children?.map((c) => c.slug) ?? ["thiet-bi-bep"]
        }
        limit={8}
      />

      <HomeProductSection
        category={homepageIndustries.find((g) => g.groupSlug === "thiet-bi-nuoc")!}
        categorySlugs={
          homepageIndustries.find((g) => g.groupSlug === "thiet-bi-nuoc")?.children?.map((c) => c.slug) ?? ["thiet-bi-nuoc"]
        }
        limit={8}
      />

      <HomeProductSection
        category={homepageIndustries.find((g) => g.groupSlug === "thiet-bi-khoa")!}
        categorySlugs={
          homepageIndustries.find((g) => g.groupSlug === "thiet-bi-khoa")?.children?.map((c) => c.slug) ?? ["thiet-bi-khoa"]
        }
        limit={8}
      />

      <HomeProductSection
        category={homepageIndustries.find((g) => g.groupSlug === "thiet-bi-dien")!}
        categorySlugs={
          homepageIndustries.find((g) => g.groupSlug === "thiet-bi-dien")?.children?.map((c) => c.slug) ?? ["thiet-bi-dien"]
        }
        limit={8}
      />

      <div className="container mx-auto px-4 py-6">
        <EnhancedShowroomSection />
      </div>

      <NewsSection />
      <CTASection />
    </div>
  );
}
