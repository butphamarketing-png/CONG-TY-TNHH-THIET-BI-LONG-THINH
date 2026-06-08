import { useState } from "react";
import { getGetProductQueryKey, useGetProduct } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Minus, Plus, ShoppingCart, ShieldCheck, Truck, RotateCcw,
  ChevronRight, Star, Heart, Share2, Zap, CreditCard, Store,
  CheckCircle2, Phone
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Link, useLocation } from "wouter";

const INSTALLMENT_BANKS = [
  { name: "TP Bank", color: "#8B1A1A" },
  { name: "HD Bank", color: "#003399" },
  { name: "Shinhan", color: "#003DA5" },
  { name: "MCredit", color: "#00A651" },
  { name: "FE Credit", color: "#FF6600" },
  { name: "Home Credit", color: "#E30613" },
];

export function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: product, isLoading } = useGetProduct(slug, {
    query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) }
  });

  const { addItem } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/3 mb-8 rounded"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded-xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-10 bg-gray-200 w-3/4 rounded"></div>
            <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
            <div className="h-12 bg-gray-200 w-1/3 rounded"></div>
            <div className="h-32 bg-gray-200 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto py-12 text-center">Không tìm thấy sản phẩm.</div>;
  }

  const images = product.images?.map(img => img.url) || (product.thumbnail ? [product.thumbnail] : []);
  const currentPrice = product.price;
  const originalPrice = product.originalPrice;
  const hasDiscount = originalPrice != null && originalPrice > currentPrice;
  const discountPct = product.discount;

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      toast({
        title: "Vui lòng chọn phân loại",
        description: "Bạn cần chọn phân loại sản phẩm trước khi thêm vào giỏ hàng.",
        variant: "destructive"
      });
      return;
    }
    addItem(product, quantity, selectedVariant);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name} đã được thêm.`,
    });
  };

  const handleBuyNow = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      toast({
        title: "Vui lòng chọn phân loại",
        description: "Bạn cần chọn phân loại sản phẩm trước khi mua.",
        variant: "destructive"
      });
      return;
    }
    addItem(product, quantity, selectedVariant);
    setLocation("/dat-hang");
  };

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    toast({
      title: wishlisted ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
      description: product.name,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Đã sao chép liên kết" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-5 flex-wrap gap-1">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/danh-muc/${product.categorySlug || "all"}`} className="hover:text-primary transition-colors">
            {product.categoryName || "Sản phẩm"}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main product area */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Images */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
              <div className="aspect-square bg-white border border-border rounded-xl overflow-hidden relative mb-3">
                {hasDiscount && discountPct && (
                  <div className="absolute top-3 left-3 z-10 bg-destructive text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow">
                    -{discountPct}%
                  </div>
                )}
                <img
                  src={images[selectedImage] || "https://placehold.co/800x800"}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${selectedImage === idx ? 'border-primary shadow-md' : 'border-border hover:border-primary/40'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-grow min-w-0">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 md:p-6 mb-4">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl md:text-2xl font-bold leading-snug flex-grow">{product.name}</h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full border transition-all ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-border hover:border-red-200 hover:text-red-500'}`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-border hover:border-primary/40 hover:text-primary transition-all"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-1 font-medium text-foreground">{product.rating || "5.0"}</span>
                </div>
                <span className="text-muted-foreground border-l border-border pl-4">
                  Thương hiệu: <Link href={`/tim-kiem?brand=${product.brandSlug || ""}`} className="text-primary font-medium hover:underline">{product.brandName}</Link>
                </span>
                {product.sku && (
                  <span className="text-muted-foreground border-l border-border pl-4">SKU: {product.sku}</span>
                )}
                <span className="text-muted-foreground border-l border-border pl-4">
                  Đã bán: <span className="text-foreground font-medium">{product.soldCount ?? 0}</span>
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100 mb-5">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-destructive">{formatCurrency(currentPrice)}</span>
                  {hasDiscount && originalPrice != null && (
                    <span className="text-lg text-muted-foreground line-through">{formatCurrency(originalPrice)}</span>
                  )}
                  {hasDiscount && discountPct && (
                    <Badge variant="destructive" className="text-sm px-2 py-1 rounded-lg">Tiết kiệm {discountPct}%</Badge>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Còn hàng
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm font-medium">Hết hàng</span>
                  )}
                  {hasDiscount && originalPrice != null && (
                    <span className="text-sm text-muted-foreground">
                      • Tiết kiệm <span className="text-destructive font-semibold">{formatCurrency(originalPrice - currentPrice)}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-sm mb-2">Phân loại:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.value)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedVariant === v.value
                            ? 'border-primary bg-primary text-white shadow'
                            : 'border-border hover:border-primary/50 bg-white'
                        }`}
                      >
                        {v.value}
                        {v.priceModifier && v.priceModifier !== 0 && (
                          <span className="ml-1 text-xs opacity-75">
                            ({v.priceModifier > 0 ? '+' : ''}{formatCurrency(v.priceModifier)})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Buttons */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Số lượng:</span>
                  <div className="flex items-center border border-border rounded-lg bg-white shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 rounded-l-lg transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 text-center font-bold text-base">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 rounded-r-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold text-base"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 rounded-xl bg-destructive hover:bg-destructive/90 font-semibold text-base shadow-md"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Mua ngay
                  </Button>
                </div>
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <div className="text-xs font-semibold">Bảo hành</div>
                  <div className="text-xs text-muted-foreground">Chính hãng 12 tháng</div>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <RotateCcw className="w-6 h-6 text-primary" />
                  <div className="text-xs font-semibold">Đổi trả</div>
                  <div className="text-xs text-muted-foreground">30 ngày miễn phí</div>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <div className="text-xs font-semibold">Giao hàng</div>
                  <div className="text-xs text-muted-foreground">Miễn phí toàn quốc</div>
                </div>
              </div>
            </div>

            {/* Installment payment */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Mua trả góp 0% lãi suất
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {INSTALLMENT_BANKS.map((bank) => (
                  <div
                    key={bank.name}
                    className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Chỉ cần CMND/CCCD • Duyệt trong 30 phút • Không cần chứng minh thu nhập
              </p>
            </div>

            {/* Store pickup */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-primary" />
                Nhận tại cửa hàng
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Đặt online, nhận hàng tại 30+ cửa hàng toàn quốc trong 1 giờ
              </p>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Store className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-sm font-medium">504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, TP.HCM</div>
                  <div className="text-xs text-green-600 font-medium">• Còn hàng tại cửa hàng</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-primary font-medium">
                <Phone className="w-4 h-4" />
                <a href="tel:19001234">Tư vấn mua hàng: 1900.1234</a>
              </div>
            </div>
          </div>
        </div>

        {/* Description + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-slate-50 h-14 px-4 gap-1">
                  <TabsTrigger value="desc" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">
                    Đặc điểm nổi bật
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">
                    Thông số kỹ thuật
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">
                    Đánh giá
                  </TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="desc" className="mt-0">
                    <div
                      className="prose max-w-none text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.fullDescription || product.shortDescription || "Đang cập nhật..." }}
                    />
                  </TabsContent>
                  <TabsContent value="specs" className="mt-0">
                    {product.attributes && product.attributes.length > 0 ? (
                      <table className="w-full text-sm border-collapse">
                        <tbody>
                          {product.attributes.map((attr, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                              <td className="py-3 px-4 w-2/5 font-medium border border-border text-slate-700">{attr.name}</td>
                              <td className="py-3 px-4 border border-border text-muted-foreground">{attr.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-muted-foreground">Đang cập nhật thông số kỹ thuật...</p>
                    )}
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-0">
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                      </div>
                      <div className="text-4xl font-extrabold text-amber-500 mb-1">{product.rating || "5.0"}</div>
                      <div className="flex justify-center gap-1 mb-3">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-muted-foreground text-sm">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                      <Button className="mt-4 rounded-full">Viết đánh giá</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar: promotions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-destructive inline-block rounded" />
                Khuyến mãi đặc biệt
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "🎁 Tặng kèm gói bảo vệ màn hình 1 năm",
                  "🔧 Miễn phí cài đặt ứng dụng, dữ liệu",
                  "🚀 Giao hàng trong 2 giờ nội thành",
                  "💳 Trả góp 0% qua thẻ tín dụng",
                  "🔄 Đổi trả trong 30 ngày không cần lý do",
                ].map((promo, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0">{promo.split(" ")[0]}</span>
                    <span className="text-slate-700">{promo.split(" ").slice(1).join(" ")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
              <h3 className="font-bold text-sm mb-3 text-primary">🏷️ Giá tốt nhất thị trường</h3>
              <p className="text-sm text-muted-foreground mb-3">
                TDM Shop cam kết cung cấp sản phẩm chính hãng với giá tốt nhất. Nếu bạn tìm thấy giá rẻ hơn, chúng tôi sẽ hoàn tiền chênh lệch!
              </p>
              <a href="tel:19001234" className="block">
                <Button variant="outline" size="sm" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                  <Phone className="w-4 h-4 mr-2" /> Tư vấn ngay
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold uppercase mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-destructive inline-block rounded" />
              Sản phẩm tương tự
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {product.relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
