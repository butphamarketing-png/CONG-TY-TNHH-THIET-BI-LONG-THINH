import { useListBanners, useListPolicies, useListCategories, useListProducts, useListBrands, useListNews } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ShieldCheck, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";
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

export function Home() {
  const { data: banners } = useListBanners();
  const { data: policies } = useListPolicies();
  const { data: categories } = useListCategories();
  const { data: brands } = useListBrands();
  const { data: news } = useListNews({ limit: 3 });
  
  const [activeTab, setActiveTab] = React.useState("newest");
  const { data: productsData } = useListProducts({ tab: activeTab, limit: 10 });

  const getPolicyIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck': return <Truck className="w-8 h-8 text-primary mb-2" />;
      case 'shield': return <ShieldCheck className="w-8 h-8 text-primary mb-2" />;
      case 'refresh': return <RotateCcw className="w-8 h-8 text-primary mb-2" />;
      case 'headset': return <HeadphonesIcon className="w-8 h-8 text-primary mb-2" />;
      default: return <ShieldCheck className="w-8 h-8 text-primary mb-2" />;
    }
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="w-full flex flex-col gap-8 pb-20">
      {/* Hero Banner Section */}
      <section className="bg-background pt-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            {/* Left side for mega menu placeholder on desktop */}
            <div className="hidden lg:block w-[250px] shrink-0 bg-white rounded-lg shadow-sm border border-border h-[400px]">
              {/* Menu is already handled by Layout but we keep the space here to align slider properly if needed, or we can just make slider full width. Let's make slider full width if mega menu is absolute. */}
            </div>
            
            {/* Banner Slider */}
            <div className="flex-grow w-full lg:w-[calc(100%-266px)]">
              {banners && banners.length > 0 && (
                <Carousel 
                  plugins={[autoplayPlugin.current]} 
                  className="w-full rounded-xl overflow-hidden shadow-sm"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {banners.map((banner) => (
                      <CarouselItem key={banner.id}>
                        <div className="relative aspect-[21/9] md:aspect-[3/1] w-full">
                          <img 
                            src={banner.image} 
                            alt={banner.title} 
                            className="w-full h-full object-cover"
                          />
                          {(banner.title || banner.subtitle) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 max-w-2xl">
                                {banner.title}
                              </h2>
                              {banner.subtitle && (
                                <p className="text-sm md:text-xl max-w-xl mb-4 md:mb-8 opacity-90">
                                  {banner.subtitle}
                                </p>
                              )}
                              {banner.link && (
                                <div>
                                  <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90 text-white rounded-full">
                                    <Link href={banner.link}>{banner.buttonText || "Khám phá ngay"}</Link>
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 hidden md:flex" />
                  <CarouselNext className="right-4 hidden md:flex" />
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Bar */}
      {policies && policies.length > 0 && (
        <section className="bg-white py-6 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-border">
              {policies.map(policy => (
                <div key={policy.id} className="flex flex-col items-center text-center px-4">
                  {getPolicyIcon(policy.icon)}
                  <h3 className="font-semibold text-sm md:text-base">{policy.title}</h3>
                  {policy.description && <p className="text-xs text-muted-foreground mt-1 hidden md:block">{policy.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Tabs Section */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-border">
          <Tabs defaultValue="newest" onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-border pb-4">
              <h2 className="text-2xl font-bold uppercase text-primary">Sản phẩm nổi bật</h2>
              <TabsList className="bg-transparent h-auto p-0 flex-wrap justify-center gap-2">
                <TabsTrigger value="newest" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 border border-border">Mới nhất</TabsTrigger>
                <TabsTrigger value="bestseller" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 border border-border">Bán chạy</TabsTrigger>
                <TabsTrigger value="sale" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 border border-border">Khuyến mãi</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0 outline-none">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {productsData?.data.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                  <Link href={`/tim-kiem?tab=${activeTab}`}>Xem tất cả <ChevronRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Categories */}
      {categories && categories.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-destructive inline-block"></span>
            Danh mục nổi bật
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map(cat => (
              <Link key={cat.id} href={`/danh-muc/${cat.slug}`}>
                <Card className="hover-elevate cursor-pointer border-transparent hover:border-primary/20 transition-all text-center h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden p-3">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Brands */}
      {brands && brands.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-destructive inline-block"></span>
            Thương hiệu uy tín
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              {brands.map(brand => (
                <Link key={brand.id} href={`/danh-muc/all?brand=${brand.slug}`} className="block hover:opacity-100 transition-opacity">
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="h-12 md:h-16 object-contain" />
                  ) : (
                    <div className="text-xl font-bold text-slate-400">{brand.name}</div>
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
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
              <span className="w-1.5 h-6 bg-destructive inline-block"></span>
              Tin tức công nghệ
            </h2>
            <Link href="/tin-tuc" className="text-primary font-medium hover:underline text-sm md:text-base">
              Xem tất cả
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.data.map(article => (
              <Card key={article.id} className="overflow-hidden hover-elevate border-border flex flex-col">
                <Link href={`/tin-tuc/${article.slug}`} className="block relative aspect-video overflow-hidden">
                  <img 
                    src={article.thumbnail || "https://placehold.co/600x400/e2e8f0/64748b"} 
                    alt={article.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                    <span>{formatDate(article.createdAt)}</span>
                    {article.category && <span className="text-primary font-medium">{article.category}</span>}
                  </div>
                  <Link href={`/tin-tuc/${article.slug}`} className="hover:text-primary transition-colors">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="mt-auto">
                    <Button variant="link" className="px-0 text-primary" asChild>
                      <Link href={`/tin-tuc/${article.slug}`}>Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
