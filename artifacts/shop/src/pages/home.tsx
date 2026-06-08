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
  Bath,
  Flame,
  Droplets,
  Zap,
  Sparkles,
  Tag,
  Clock,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { CATEGORIES, BRANDS, PRODUCTS, NEWS, BANNERS, POLICIES } from "@/lib/tdm-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "thiet-bi-ve-sinh": <Bath className="w-5 h-5" />,
  "thiet-bi-bep": <Flame className="w-5 h-5" />,
  "thiet-bi-nuoc": <Droplets className="w-5 h-5" />,
  "thiet-bi-dien": <Zap className="w-5 h-5" />,
  "phu-kien-nha-tam": <Bath className="w-5 h-5" />,
};

function useCountdown(targetHour: number) {
  const getRemaining = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, 0, 0, 0);
    if (now >= target) target.setDate(target.getDate() + 1);
    const diff = target.getTime() - now.getTime();
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = React.useState(getRemaining);
  React.useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-900 text-white font-mono font-bold text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-inner">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-slate-500 mt-1 uppercase">{label}</span>
    </div>
  );
}

export function Home() {
  const [activeTab, setActiveTab] = React.useState("newest");
  const [hoveredCat, setHoveredCat] = React.useState<number | null>(null);
  const countdown = useCountdown(22);

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  const saleProducts = PRODUCTS.filter(p => p.isOnSale);
  const bestsellerProducts = PRODUCTS.filter(p => p.isBestSeller);
  const newestProducts = PRODUCTS;

  const getPolicyIcon = (iconName: string) => {
    switch (iconName) {
      case "truck": return <Truck className="w-8 h-8 text-red-600" />;
      case "shield": return <ShieldCheck className="w-8 h-8 text-red-600" />;
      case "refresh": return <RotateCcw className="w-8 h-8 text-red-600" />;
      case "headset": return <HeadphonesIcon className="w-8 h-8 text-red-600" />;
      default: return <ShieldCheck className="w-8 h-8 text-red-600" />;
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
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-visible">
                <div className="bg-red-600 text-white px-4 py-2.5 rounded-t-lg font-semibold text-sm flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                  Danh mục sản phẩm
                </div>
                <div className="divide-y divide-gray-100">
                  {CATEGORIES.slice(0, 10).map((cat) => (
                    <div
                      key={cat.id}
                      className="relative group/cat"
                      onMouseEnter={() => setHoveredCat(cat.id)}
                      onMouseLeave={() => setHoveredCat(null)}
                    >
                      <Link
                        href={`/danh-muc/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-red-500/70">
                            {CATEGORY_ICONS[cat.slug] || <Bath className="w-4 h-4" />}
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        {cat.children && cat.children.length > 0 && (
                          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                        )}
                      </Link>

                      {cat.children && cat.children.length > 0 && hoveredCat === cat.id && (
                        <div className="absolute left-full top-0 w-[400px] bg-white border border-gray-200 shadow-xl z-50 rounded-r-lg overflow-hidden">
                          <div className="grid grid-cols-2 gap-2 p-4">
                            {cat.children.map((child) => (
                              <div key={child.id}>
                                <Link
                                  href={`/danh-muc/${child.slug}`}
                                  className="block px-3 py-2 font-semibold text-gray-800 hover:text-red-600 text-sm"
                                >
                                  {child.name}
                                </Link>
                                {child.children?.map((grandChild) => (
                                  <Link
                                    key={grandChild.id}
                                    href={`/danh-muc/${grandChild.slug}`}
                                    className="block px-3 py-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                                  >
                                    {grandChild.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Banner Slider */}
            <div className="flex-grow flex flex-col gap-3 min-w-0">
              {BANNERS && BANNERS.length > 0 && (
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  className="w-full rounded-xl overflow-hidden shadow-sm"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {BANNERS.map((banner) => (
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
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold md:text-base md:px-6"
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

              {/* Mini featured products row */}
              {featuredProducts.length >= 2 && (
                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {featuredProducts.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      href={`/san-pham/${p.slug}`}
                      className="bg-white rounded-lg border border-gray-200 hover:border-red-500/30 hover:shadow-md transition-all flex items-center gap-3 p-3 group"
                    >
                      <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-50">
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] text-gray-500">{p.brandName}</div>
                        <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                        <div className="text-sm font-bold text-red-600">
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
      <section className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 divide-x divide-gray-200">
            {POLICIES.map((policy) => (
              <div key={policy.id} className="flex items-center gap-3 px-4">
                <div className="shrink-0">{getPolicyIcon(policy.icon)}</div>
                <div>
                  <h3 className="font-semibold text-sm">{policy.title}</h3>
                  {policy.description && (
                    <p className="text-xs text-gray-500 hidden md:block">{policy.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded inline-block" />
            Danh mục nổi bật
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link key={cat.id} href={`/danh-muc/${cat.slug}`}>
              <div className="bg-white rounded-xl border border-gray-200 hover:border-red-500/30 hover:shadow-md transition-all text-center p-3 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                  {CATEGORY_ICONS[cat.slug] || <Bath className="w-6 h-6" />}
                </div>
                <span className="text-xs font-medium line-clamp-2 leading-tight">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      {saleProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 gap-4">
              <div className="flex items-center gap-3">
                <Zap className="w-7 h-7 text-yellow-300 fill-yellow-300" />
                <div>
                  <h2 className="text-white font-extrabold text-xl md:text-2xl uppercase tracking-wide">Flash Sale</h2>
                  <p className="text-red-100 text-xs">Giảm giá cực sốc - Số lượng có hạn!</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-red-100 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Kết thúc lúc 22:00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TimeBlock value={countdown.h} label="giờ" />
                  <span className="text-white font-bold text-xl mb-4">:</span>
                  <TimeBlock value={countdown.m} label="phút" />
                  <span className="text-white font-bold text-xl mb-4">:</span>
                  <TimeBlock value={countdown.s} label="giây" />
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white/10 backdrop-blur-sm px-5 pb-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {saleProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
                  >
                    <div className="relative aspect-square bg-gray-50">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <div className="text-xs font-medium line-clamp-2 leading-tight mb-1 text-gray-700 min-h-[32px]">{product.name}</div>
                      <div className="text-red-600 font-bold text-sm">
                        {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">
                          {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
                        </div>
                      )}
                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                            style={{ width: `${Math.floor(Math.random() * 40) + 30}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Đã bán {Math.floor(Math.random() * 50) + 10}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button asChild variant="outline" className="bg-white border-white text-red-600 hover:bg-red-50 rounded-full font-semibold px-8">
                  <Link href="/tim-kiem?tab=sale">
                    Xem tất cả Flash Sale <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Tabs Section */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Tabs defaultValue="newest" onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-6 pt-4 pb-0 gap-3 border-b border-gray-200">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded inline-block" />
                Sản phẩm nổi bật
              </h2>
              <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-1 mb-0 pb-0">
                {(["newest", "bestseller", "sale"] as const).map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-1.5 mb-2"
                  >
                    {TAB_ICONS[tab]}
                    {tab === "newest" ? "Mới nhất" : tab === "bestseller" ? "Bán chạy" : "Khuyến mãi"}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="p-4 md:p-6 mt-0 outline-none">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(activeTab === "newest" ? newestProducts :
                  activeTab === "bestseller" ? bestsellerProducts :
                  saleProducts).map((product) => (
                  <ProductCard key={product.id} product={{ ...product, images: [{ url: product.thumbnail, alt: product.name }] }} />
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
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded inline-block" />
            Thương hiệu uy tín
          </h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/thuong-hieu/${brand.slug}`}
                className="block opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 group"
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="h-10 md:h-12 object-contain" />
                ) : (
                  <div className="text-lg font-bold text-gray-400 group-hover:text-red-600 transition-colors px-3 py-2 border border-gray-200 rounded">
                    {brand.name}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded inline-block" />
            Tin tức thiết bị vệ sinh
          </h2>
          <Link href="/tin-tuc" className="text-red-600 font-medium hover:underline text-sm flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NEWS.map((article, idx) => (
            <Card
              key={article.id}
              className={`overflow-hidden border-gray-200 hover:shadow-md transition-all flex flex-col bg-white ${idx === 0 ? "md:col-span-1" : ""}`}
            >
              <Link href={`/tin-tuc/${article.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {article.category && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                )}
              </Link>
              <CardContent className="p-4 flex flex-col flex-grow">
                <p className="text-[11px] text-gray-500 mb-2">{article.createdAt}</p>
                <Link href={`/tin-tuc/${article.slug}`} className="hover:text-red-600 transition-colors">
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
