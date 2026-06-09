import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Minus, Plus, ShoppingCart, ChevronRight, Star, Heart, Share2,
  Zap, CheckCircle2, Phone, MessageSquare, XCircle,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useProductDetail, useRelatedListings, useBrands } from "@/hooks/use-catalog";
import { listingToProduct } from "@/lib/catalog-store";
import { brandUrl, categoryUrl } from "@/lib/urls";
import { formatCurrency } from "@/lib/format";
import type { TdmProduct } from "@/types/product";
import { useProductVariantSelection } from "@/components/product-detail/useProductVariantSelection";
import { ProductVariantSelector } from "@/components/product-detail/ProductVariantSelector";
import { ProductAttachments } from "@/components/product-detail/ProductAttachments";
import { ProductVideoSection } from "@/components/product-detail/ProductVideoSection";
import { ProductShowroomStock } from "@/components/product-detail/ProductShowroomStock";
import { ProductSpecifications } from "@/components/product-detail/ProductSpecifications";
import { ProductRelatedCarousel } from "@/components/product-detail/ProductRelatedCarousel";
import { ProductSeoTags } from "@/components/product-detail/ProductSeoTags";
import { ProductTrustSection } from "@/components/product-detail/ProductTrustSection";

function useViewedProducts() {
  const [viewed, setViewed] = useState<number[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("viewedProducts");
    if (stored) {
      try { setViewed(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const addToViewed = (productId: number) => {
    setViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, 10);
      localStorage.setItem("viewedProducts", JSON.stringify(next));
      return next;
    });
  };

  return { viewed, addToViewed };
}

export function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { product, loading } = useProductDetail(params.slug);

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Đang tải sản phẩm...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-12 text-center">Không tìm thấy sản phẩm.</div>;
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: TdmProduct }) {
  const relatedListings = useRelatedListings(product, 12);
  const { brands } = useBrands();
  const brandLogoMap = useMemo(
    () => new Map(brands.map((b) => [b.slug, b.logo])),
    [brands],
  );

  const { viewed, addToViewed } = useViewedProducts();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  const {
    groups,
    selected,
    selectVariant,
    displayPrice,
    displayOriginalPrice,
    displaySku,
    displayInStock,
    displayThumbnail,
  } = useProductVariantSelection(product);

  useEffect(() => {
    addToViewed(product.id);
  }, [product.id, addToViewed]);

  const images = product.images?.length
    ? product.images.map((img) => img.url)
    : [displayThumbnail];

  const hasDiscount =
    displayOriginalPrice != null && displayOriginalPrice > displayPrice;
  const discountPct = hasDiscount
    ? Math.round(((displayOriginalPrice! - displayPrice) / displayOriginalPrice!) * 100)
    : product.discount;

  const relatedProducts = relatedListings.map(listingToProduct);
  const viewedProducts: TdmProduct[] = [];

  const cartPayload = {
    ...product,
    price: displayPrice,
    originalPrice: displayOriginalPrice,
    sku: displaySku,
    thumbnail: displayThumbnail,
  };

  const handleAddToCart = () => {
    if (!displayInStock) return;
    addItem(cartPayload as Parameters<typeof addItem>[0], quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name} đã được thêm.`,
    });
  };

  const handleBuyNow = () => {
    if (!displayInStock) return;
    addItem(cartPayload as Parameters<typeof addItem>[0], quantity);
    setLocation("/dat-hang");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-5 flex-wrap gap-1">
          <Link href="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={categoryUrl(product.categorySlug)}
            className="hover:text-orange-600 transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium truncate max-w-[240px]">{product.name}</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Gallery */}
          <div className="w-full lg:w-[480px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden relative mb-3 group">
                {hasDiscount && discountPct != null && discountPct > 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-sm font-bold px-2.5 py-1 rounded-md shadow">
                    -{discountPct}%
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-3 right-3 z-10 bg-orange-600 text-white text-[11px] font-bold px-2 py-1 rounded-md uppercase">
                    Bán chạy
                  </div>
                )}
                <img
                  src={images[selectedImage] || displayThumbnail}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                        selectedImage === idx
                          ? "border-orange-600 shadow-md"
                          : "border-gray-200 hover:border-orange-400"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Purchase panel */}
          <div className="flex-grow min-w-0 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl md:text-2xl font-bold leading-snug text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setWishlisted(!wishlisted);
                      toast({ title: wishlisted ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích" });
                    }}
                    className={`p-2 rounded-full border transition-all ${
                      wishlisted
                        ? "bg-orange-50 border-orange-200 text-orange-600"
                        : "border-gray-200 hover:border-orange-200 hover:text-orange-600"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: product.name, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast({ title: "Đã sao chép liên kết" });
                      }
                    }}
                    className="p-2 rounded-full border border-gray-200 hover:border-orange-400 hover:text-orange-600 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-500">
                {product.rating != null && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium text-gray-800">{product.rating}</span>
                    {product.reviewCount != null && (
                      <span className="text-gray-400">({product.reviewCount})</span>
                    )}
                  </div>
                )}
                <span>
                  Thương hiệu:{" "}
                  <Link href={brandUrl(product.brandSlug)} className="text-orange-600 font-medium hover:underline">
                    {product.brandName}
                  </Link>
                </span>
                {displaySku && <span>SKU: {displaySku}</span>}
                <span>Đã bán: <strong className="text-gray-800">{product.soldCount}</strong></span>
              </div>

              {product.shortDescription && (
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.shortDescription}</p>
              )}

              <ProductVariantSelector
                groups={groups}
                selected={selected}
                onSelect={selectVariant}
              />

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100 mb-5">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <span className="text-3xl font-extrabold text-red-600">
                    {formatCurrency(displayPrice)}
                  </span>
                  {hasDiscount && displayOriginalPrice != null && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(displayOriginalPrice)}
                    </span>
                  )}
                  {hasDiscount && discountPct != null && discountPct > 0 && (
                    <Badge className="bg-red-600 text-sm">Tiết kiệm {discountPct}%</Badge>
                  )}
                </div>
                {product.contactForPrice && (
                  <p className="text-xs text-gray-500 italic mb-2">
                    (liên hệ để có giá tốt hơn)
                  </p>
                )}
                {product.cashbackAmount != null && product.cashbackAmount > 0 && (
                  <p className="text-sm font-semibold text-emerald-700 mb-2">
                    Hoàn tiền {formatCurrency(product.cashbackAmount)}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  {displayInStock ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Còn hàng</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Hết hàng — liên hệ đặt trước</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 text-center font-bold">{quantity}</div>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    disabled={!displayInStock}
                    className="h-12 rounded-xl border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="lg"
                    disabled={!displayInStock}
                    className="h-12 rounded-xl bg-orange-600 hover:bg-orange-700 font-semibold shadow-md"
                    onClick={handleBuyNow}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Mua ngay
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <a href="tel:02822448333" className="flex items-center gap-2 text-orange-600 font-medium hover:underline">
                    <Phone className="w-4 h-4" /> Gọi tư vấn: 028.2244.8333
                  </a>
                  <a href="#" className="flex items-center gap-2 text-orange-600 font-medium hover:underline">
                    <MessageSquare className="w-4 h-4" /> Chat Zalo tư vấn
                  </a>
                </div>
              </div>

              <ProductTrustSection />
            </div>

            <ProductShowroomStock showroomStock={product.showroomStock} />
          </div>
        </div>

        {/* Content tabs */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-gray-50/80 h-12 px-4 gap-1">
              <TabsTrigger
                value="desc"
                className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none h-full px-4"
              >
                Mô tả sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none h-full px-4"
              >
                Thông số kỹ thuật
              </TabsTrigger>
            </TabsList>
            <div className="p-5 md:p-6">
              <TabsContent value="desc" className="mt-0">
                <div
                  className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.fullDescription ||
                      "<p>Sản phẩm chính hãng, bảo hành theo quy định nhà sản xuất.</p>",
                  }}
                />
              </TabsContent>
              <TabsContent value="specs" className="mt-0">
                <ProductSpecifications attributes={product.attributes} />
              </TabsContent>
            </div>
          </Tabs>

          {/* Below specifications — attachments & video */}
          <div className="px-5 md:px-6 pb-6 border-t border-gray-100">
            <ProductAttachments attachments={product.attachments} />
            {product.videoUrl && (
              <ProductVideoSection videoUrl={product.videoUrl} title={product.name} />
            )}
          </div>
        </div>

        <ProductSeoTags
          tags={product.tags}
          seoTitle={product.seoTitle}
          seoDescription={product.seoDescription}
        />

        <ProductRelatedCarousel
          title="Sản phẩm liên quan"
          products={relatedProducts}
          brandLogos={brandLogoMap}
        />

        {viewedProducts.length > 0 && (
          <ProductRelatedCarousel
            title="Sản phẩm đã xem"
            products={viewedProducts}
            brandLogos={brandLogoMap}
          />
        )}
      </div>
    </div>
  );
}
