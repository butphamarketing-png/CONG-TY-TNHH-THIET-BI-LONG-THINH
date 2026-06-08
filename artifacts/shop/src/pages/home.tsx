import {
  useListBanners,
  useListPolicies,
  useListCategories,
  useListProducts,
  useListBrands,
  useListNews,
} from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  HeadphonesIcon,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Monitor,
  Camera,
  Gamepad2,
  ChevronDown,
  Flame,
  Sparkles,
  Tag,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "dien-thoai": <Smartphone className="w-5 h-5" />,
  "laptop": <Laptop className="w-5 h-5" />,
  "may-tinh-bang": <Tablet className="w-5 h-5" />,
  "tai-nghe": <Headphones className="w-5 h-5" />,
  "dong-ho-thong-minh": <Watch className="w-5 h-5" />,
  "man-hinh": <Monitor className="w-5 h-5" />,
  "may-anh": <Camera className="w-5 h-5" />,
  "gaming": <Gamepad2 className="w-5 h-5" />,
};

export function Home() {
  const { data: banners } = useListBanners();
  const { data: policies } = useListPolicies();
  const { data: categories } = useListCategories();
  const { data: brands } = useListBrands();
  const { data: news } = useListNews({ limit: 3 });

  const [activeTab, setActiveTab] = React.useState("newest");
  const { data: productsData } = useListProducts({ tab: activeTab, limit: 10 });
  const { data: featuredProducts } = useListProducts({ tab: "featured", limit: 4 });

  const [hoveredCat, setHoveredCat] = React.useState<number | null>(null);

  const getPolicyIcon = (iconName: string) => {
    switch (iconName) {
      case "truck": return <Truck className="w-8 h-8 text-primary" />;
      case "shield": return <ShieldCheck className="w-8 h-8 text-primary" />;
      case "refresh": return <RotateCcw className="w-8 h-8 text-primary" />;
      case "headset": return <HeadphonesIcon className="w-8 h-8 text-primary" />;
      default: return <ShieldCheck className="w-8 h-8 text-primary" />;
    }
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  const TAB_ICONS = {
    newest: <Sparkles className="w-3.5 h-3.5" />,
    bestseller: <Flame className="w-3.5 h-3.5" />,
    sale: <Tag className="w-3.5 h-3.5" />,
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-24 bg-gray-50">
      {/* Hero Banner + Category Sidebar */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pt-4">
          <div className="flex gap-3">
            {/* Category Sidebar */}
            <div className="hidden lg:block w-[220px] shrink-0">
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-visible">
                <div className="bg-primary text-primary-foreground px-4 py-2.5 rounded-t-lg font-semibold text-sm flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                  Danh mục sản phẩm
                </div>
                <div className="divide-y divide-border/50">
                  {categories?.slice(0, 10).map((cat) => (
                    <div
                      key={cat.id}
                      className="relative group/cat"
                      onMouseEnter={() => setHoveredCat(cat.id)}
                      onMouseLeave={() => setHoveredCat(null)}
                    >
                      <Link
                        href={`/danh-muc/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-primary/70">
                            {CATEGORY_ICONS[cat.slug] || <Smartphone className="w-4 h-4" />}
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        {cat.children && cat.children.length > 0 && (
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </Link>

                      {/* Flyout submenu */}
                      {cat.children && cat.children.length > 0 && hoveredCat === cat.id && (
                        <div className="absolute left-full top-0 w-[200px] bg-white border border-border shadow-xl z-50 rounded-r-lg overflow-hidden">
                          <div className="bg-primary/5 px-3 py-2 text-xs font-semibold text-primary border-b border-border">
                            {cat.name}
                          </div>
                          {cat.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/danh-muc/${child.slug}`}
                              className="flex items-center px-3 py-2 text-sm hover:bg-primary/5 hover:text-primary border-b border-border/50 last:border-0 transition-colors"
                            >
                              <ChevronRight className="w-3 h-3 mr-2 text-muted-foreground" />
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Banner Slider + Flash Sale */}
            <div className="flex-grow flex flex-col gap-3 min-w-0">
              {/* Banner Slider */}
              {banners && banners.length > 0 && (
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  className="w-full rounded-xl overflow-hidden shadow-sm"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {banners.map((banner) => (
                      <CarouselItem key={banner.id}>
                        <div className="relative w-full" style={{ aspectRatio: "16/6" }}>
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                          {(banner.title || banner.subtitle) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-14 text-white">
                              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-3 max-w-lg leading-tight">
                                {banner.title}
                              </h2>
                              {banner.subtitle && (
                                <p className="text-xs md:text-base max-w-sm mb-4 opacity-90">
                                  {banner.subtitle}
                                </p>
                              )}
                              {banner.link && (
                                <div>
                                  <Button
                                    asChild
                                    size="sm"
                                    className="bg-destructive hover:bg-destructive/90 text-white rounded-full font-semibold md:text-base md:px-6"
                                  >
                                    <Link href={banner.link}>
                                      {banner.buttonText || "Khám phá ngay"}
                                    </Link>
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 bg-white/80 hover:bg-white border-0 shadow" />
                  <CarouselNext className="right-3 bg-white/80 hover:bg-white border-0 shadow" />
                </Carousel>
              )}

              {/* Mini banner / featured products row */}
              {featuredProducts?.data && featuredProducts.data.length >= 2 && (
                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {featuredProducts.data.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      href={`/san-pham/${p.slug}`}
                      className="bg-white rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-3 p-3 group"
                    >
                      <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-50">
                        <img
                          src={p.thumbnail || ""}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] text-muted-foreground">{p.brandName}</div>
                        <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                        <div className="text-sm font-bold text-destructive">
                          {new Intl.NumberFormat("vi-VN").format(p.price)}đ
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Bar */}
      {policies && policies.length > 0 && (
        <section className="bg-white border-y border-border">
          <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 divide-x divide-border">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-center gap-3 px-4">
                  <div className="shrink-0">{getPolicyIcon(policy.icon)}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{policy.title}</h3>
                    {policy.description && (
                      <p className="text-xs text-muted-foreground hidden md:block">{policy.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories */}
      {categories && categories.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded inline-block" />
              Danh mục nổi bật
            </h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.slice(0, 8).map((cat) => (
              <Link key={cat.id} href={`/danh-muc/${cat.slug}`}>
                <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center p-3 flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain" />
                    ) : (
                      CATEGORY_ICONS[cat.slug] || <Smartphone className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-medium line-clamp-2 leading-tight">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products Tabs Section */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <Tabs defaultValue="newest" onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-6 pt-4 pb-0 gap-3 border-b border-border">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded inline-block" />
                Sản phẩm nổi bật
              </h2>
              <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-1 mb-0 pb-0">
                {(["newest", "bestseller", "sale"] as const).map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white border border-border rounded-full px-4 py-1.5 text-sm flex items-center gap-1.5 mb-2"
                  >
                    {TAB_ICONS[tab]}
                    {tab === "newest" ? "Mới nhất" : tab === "bestseller" ? "Bán chạy" : "Khuyến mãi"}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="p-4 md:p-6 mt-0 outline-none">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {productsData?.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {(!productsData?.data || productsData.data.length === 0) &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-[3/4]" />
                  ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" size="lg" className="rounded-full px-10 font-semibold" asChild>
                  <Link href={`/tim-kiem?tab=${activeTab}`}>
                    Xem tất cả <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Brands */}
      {brands && brands.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded inline-block" />
              Thương hiệu uy tín
            </h2>
          </div>
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/tim-kiem?brand=${brand.slug}`}
                  className="block opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 group"
                >
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="h-10 md:h-12 object-contain" />
                  ) : (
                    <div className="text-lg font-bold text-slate-400 group-hover:text-primary transition-colors px-3 py-2 border border-gray-200 rounded">
                      {brand.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {news?.data && news.data.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded inline-block" />
              Tin tức công nghệ
            </h2>
            <Link href="/tin-tuc" className="text-primary font-medium hover:underline text-sm flex items-center gap-1">
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.data.map((article, idx) => (
              <Card
                key={article.id}
                className={`overflow-hidden border-border hover:shadow-md transition-all flex flex-col bg-white ${idx === 0 ? "md:col-span-1" : ""}`}
              >
                <Link href={`/tin-tuc/${article.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={article.thumbnail || "https://placehold.co/600x340/e2e8f0/64748b"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {article.category && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  )}
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <p className="text-[11px] text-muted-foreground mb-2">{formatDate(article.createdAt)}</p>
                  <Link href={`/tin-tuc/${article.slug}`} className="hover:text-primary transition-colors">
                    <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-snug mb-2">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
