import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Minus, Plus, ShoppingCart, ShieldCheck, Truck, RotateCcw,
  ChevronRight, Star, Heart, Share2, Zap, CreditCard, Store,
  CheckCircle2, Phone, MessageSquare, Flame, PlayCircle
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Link, useLocation } from "wouter";
import { PRODUCTS } from "@/lib/tdm-data";

const INSTALLMENT_BANKS = [
  { name: "TP Bank", color: "#8B1A1A" },
  { name: "HD Bank", color: "#003399" },
  { name: "Shinhan", color: "#003DA5" },
  { name: "MCredit", color: "#00A651" },
  { name: "FE Credit", color: "#FF6600" },
  { name: "Home Credit", color: "#E30613" },
];

// Simple localStorage hook for viewed products
function useViewedProducts() {
  const [viewed, setViewed] = useState<number[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('viewedProducts');
    if (stored) {
      try { setViewed(JSON.parse(stored)); } catch (e) { /* ignore */ }
    }
  }, []);
  
  const addToViewed = (productId: number) => {
    setViewed(prev => {
      const newViewed = [productId, ...prev.filter(id => id !== productId)].slice(0, 10);
      localStorage.setItem('viewedProducts', JSON.stringify(newViewed));
      return newViewed;
    });
  };
  
  return { viewed, addToViewed };
}

export function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { viewed, addToViewed } = useViewedProducts();
  
  const { addItem } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  
  // Add to viewed products on page load
  useEffect(() => {
    if (product) {
      addToViewed(product.id);
    }
  }, [product?.id, addToViewed]);

  if (!product) {
    return <div className="container mx-auto py-12 text-center">Không tìm thấy sản phẩm.</div>;
  }

  const images = product.images?.length ? product.images.map(img => img.url) : [product.thumbnail, product.thumbnail, product.thumbnail];
  const currentPrice = product.price;
  const originalPrice = product.originalPrice;
  const hasDiscount = originalPrice != null && originalPrice > currentPrice;
  const discountPct = product.discount;
  
  // Get related products
  const sameBrandProducts = PRODUCTS.filter(p => p.brandSlug === product.brandSlug && p.id !== product.id).slice(0, 8);
  const categoryBestSellers = PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 6);
  const viewedProducts = PRODUCTS.filter(p => viewed.includes(p.id) && p.id !== product.id);

  const handleAddToCart = () => {
    addItem(product as any, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name} đã được thêm.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product as any, quantity);
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
        <div className="flex items-center text-sm text-gray-500 mb-5 flex-wrap gap-1">
          <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/danh-muc/${product.categorySlug || "all"}`} className="hover:text-red-600 transition-colors">
            {product.categoryName || "Sản phẩm"}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main product area */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Images + Video */}
          <div className="w-full lg:w-[480px] shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <div className="aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden relative mb-3">
                {hasDiscount && discountPct && (
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow">
                    -{discountPct}%
                  </div>
                )}
                <img
                  src={images[selectedImage] || "https://placehold.co/800x800"}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Video thumbnail */}
              {product.videoUrl && (
                <div className="mb-3">
                  <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-200 transition-colors">
                    <PlayCircle className="w-8 h-8 text-red-600" />
                    <span className="font-semibold text-gray-800">Xem video giới thiệu sản phẩm</span>
                  </a>
                </div>
              )}
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${selectedImage === idx ? 'border-red-600 shadow-md' : 'border-gray-200 hover:border-red-600/40'}`}
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
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 mb-4">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl md:text-2xl font-bold leading-snug flex-grow">{product.name}</h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full border transition-all ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 hover:border-red-200 hover:text-red-500'}`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-gray-200 hover:border-red-600/40 hover:text-red-600 transition-all"
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
                  <span className="ml-1 font-medium text-gray-800">{product.rating || "5.0"}</span>
                </div>
                <span className="text-gray-500 border-l border-gray-200 pl-4">
                  Thương hiệu: <Link href={`/thuong-hieu/${product.brandSlug || ""}`} className="text-red-600 font-medium hover:underline">{product.brandName}</Link>
                </span>
                {product.sku && (
                  <span className="text-gray-500 border-l border-gray-200 pl-4">SKU: {product.sku}</span>
                )}
                <span className="text-gray-500 border-l border-gray-200 pl-4">
                  Đã bán: <span className="text-gray-800 font-medium">{product.soldCount ?? 0}</span>
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100 mb-5">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-red-600">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentPrice)}
                  </span>
                  {hasDiscount && originalPrice != null && (
                    <span className="text-lg text-gray-400 line-through">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(originalPrice)}
                    </span>
                  )}
                  {hasDiscount && discountPct && (
                    <Badge className="bg-red-600 hover:bg-red-700 text-sm px-2 py-1 rounded-lg">Tiết kiệm {discountPct}%</Badge>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Còn hàng
                  </span>
                  {hasDiscount && originalPrice != null && (
                    <span className="text-sm text-gray-500">
                      • Tiết kiệm <span className="text-red-600 font-semibold">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(originalPrice - currentPrice)}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity + Buttons */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
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
                    className="h-12 rounded-xl border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold text-base"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-base shadow-md"
                    onClick={handleBuyNow}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Mua ngay
                  </Button>
                </div>
                
                <div className="mt-4 flex flex-col gap-2">
                  <a href="tel:19001234" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <Phone className="w-5 h-5" /> Gọi đặt hàng: 1900.1234
                  </a>
                  <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <MessageSquare className="w-5 h-5" /> Chat tư vấn Zalo
                  </a>
                </div>
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4">
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <ShieldCheck className="w-6 h-6 text-red-600" />
                  <div className="text-xs font-semibold">Bảo hành</div>
                  <div className="text-xs text-gray-500">Chính hãng 12 tháng</div>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <RotateCcw className="w-6 h-6 text-red-600" />
                  <div className="text-xs font-semibold">Đổi trả</div>
                  <div className="text-xs text-gray-500">30 ngày miễn phí</div>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2">
                  <Truck className="w-6 h-6 text-red-600" />
                  <div className="text-xs font-semibold">Giao hàng</div>
                  <div className="text-xs text-gray-500">Miễn phí toàn quốc</div>
                </div>
              </div>
            </div>

            {/* Installment payment */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-red-600" />
                Mua trả góp 0% lãi suất
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {INSTALLMENT_BANKS.map((bank) => (
                  <div
                    key={bank.name}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Chỉ cần CMND/CCCD • Duyệt trong 30 phút • Không cần chứng minh thu nhập
              </p>
            </div>

            {/* Store pickup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-red-600" />
                Nhận tại cửa hàng
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Đặt online, nhận hàng tại 30+ cửa hàng toàn quốc trong 1 giờ
              </p>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <Store className="w-4 h-4 text-red-600 shrink-0" />
                <div>
                  <div className="text-sm font-medium">504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12, TP.HCM</div>
                  <div className="text-xs text-green-600 font-medium">• Còn hàng tại cửa hàng</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600 font-medium">
                <Phone className="w-4 h-4" />
                <a href="tel:19001234">Tư vấn mua hàng: 1900.1234</a>
              </div>
            </div>
          </div>
        </div>

        {/* Description + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-slate-50 h-14 px-4 gap-1">
                  <TabsTrigger value="desc" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none h-full px-4">
                    Mô tả sản phẩm
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none h-full px-4">
                    Thông số kỹ thuật
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none h-full px-4">
                    Đánh giá
                  </TabsTrigger>
                </TabsList>
                <div className="p-6">
                  <TabsContent value="desc" className="mt-0">
                    <div
                      className="prose max-w-none text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.fullDescription || "<p>Sản phẩm chất lượng cao, thiết kế hiện đại, phù hợp với nhu cầu sử dụng hàng ngày.</p><p>Cam kết chính hãng 100%, bảo hành theo quy định của nhà sản xuất.</p>" }}
                    />
                  </TabsContent>
                  <TabsContent value="specs" className="mt-0">
                    {product.attributes && product.attributes.length > 0 ? (
                      <table className="w-full text-sm border-collapse">
                        <tbody>
                          {product.attributes.map((attr, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                              <td className="py-3 px-4 w-2/5 font-medium border border-gray-200 text-slate-700">{attr.name}</td>
                              <td className="py-3 px-4 border border-gray-200 text-gray-500">{attr.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">Đang cập nhật thông số kỹ thuật...</p>
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
                      <p className="text-gray-500 text-sm">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                      <Button className="mt-4 rounded-full bg-red-600 hover:bg-red-700">Viết đánh giá</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar: promotions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-600 inline-block rounded" />
                Khuyến mãi đặc biệt
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "🎁 Tặng kèm sản phẩm phụ kiện",
                  "🔧 Miễn phí lắp đặt tại nhà",
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

            <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
              <h3 className="font-bold text-sm mb-3 text-red-600">🏷️ Giá tốt nhất thị trường</h3>
              <p className="text-sm text-gray-500 mb-3">
                TDM Shop cam kết cung cấp sản phẩm chính hãng với giá tốt nhất. Nếu bạn tìm thấy giá rẻ hơn, chúng tôi sẽ hoàn tiền chênh lệch!
              </p>
              <a href="tel:19001234" className="block">
                <Button variant="outline" size="sm" className="w-full rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  <Phone className="w-4 h-4 mr-2" /> Tư vấn ngay
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Same brand products */}
        {sameBrandProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 inline-block rounded" />
              Sản phẩm cùng thương hiệu {product.brandName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sameBrandProducts.map(p => (
                <ProductCard key={p.id} product={{ ...p, images: [{ url: p.thumbnail, alt: p.name }] }} />
              ))}
            </div>
          </section>
        )}

        {/* Category best sellers */}
        {categoryBestSellers.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              Sản phẩm bán chạy cùng danh mục
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryBestSellers.map(p => (
                <ProductCard key={p.id} product={{ ...p, images: [{ url: p.thumbnail, alt: p.name }] }} />
              ))}
            </div>
          </section>
        )}

        {/* Viewed products */}
        {viewedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gray-600 inline-block rounded" />
              Sản phẩm đã xem
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {viewedProducts.map(p => (
                <ProductCard key={p.id} product={{ ...p, images: [{ url: p.thumbnail, alt: p.name }] }} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
