import { useState } from "react";
import { getGetProductQueryKey, useGetProduct } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, ShieldCheck, Truck, RotateCcw, ChevronRight, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: product, isLoading } = useGetProduct(slug, {
    query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) }
  });
  
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 animate-pulse">
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
    </div>;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Trang chủ</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>{product.categoryName || "Sản phẩm"}</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-2xl border border-border shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="aspect-square bg-white border border-border rounded-xl overflow-hidden relative">
              <img 
                src={images[selectedImage] || "https://placehold.co/800x800"} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${selectedImage === idx ? 'border-primary' : 'border-border'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-medium text-foreground">{product.rating || "5.0"}</span>
              </div>
              <span className="text-muted-foreground border-l border-border pl-4">Thương hiệu: <span className="text-primary font-medium">{product.brandName}</span></span>
              <span className="text-muted-foreground border-l border-border pl-4">SKU: {product.sku || "N/A"}</span>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-border mb-6">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-3xl font-bold text-destructive">{formatCurrency(currentPrice)}</span>
                {hasDiscount && originalPrice != null && (
                  <span className="text-lg text-muted-foreground line-through">{formatCurrency(originalPrice)}</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {hasDiscount && discountPct && (
                  <Badge variant="destructive" className="text-sm px-2 py-1">Giảm {discountPct}%</Badge>
                )}
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-sm px-2 py-1">Còn hàng</Badge>
                ) : (
                  <Badge variant="outline" className="text-sm px-2 py-1">Hết hàng</Badge>
                )}
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Phân loại:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <Button 
                      key={v.id} 
                      variant={selectedVariant === v.value ? "default" : "outline"}
                      onClick={() => setSelectedVariant(v.value)}
                      className="rounded-full"
                    >
                      {v.value}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg bg-white">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-none"><Minus className="w-4 h-4" /></Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-none"><Plus className="w-4 h-4" /></Button>
              </div>
              <Button size="lg" className="flex-grow rounded-full text-base h-12" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-6 mt-auto">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div className="text-sm">
                  <div className="font-semibold">Bảo hành</div>
                  <div className="text-muted-foreground">Chính hãng 12 tháng</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-8 h-8 text-primary" />
                <div className="text-sm">
                  <div className="font-semibold">Đổi trả</div>
                  <div className="text-muted-foreground">30 ngày miễn phí</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-primary" />
                <div className="text-sm">
                  <div className="font-semibold">Giao hàng</div>
                  <div className="text-muted-foreground">Miễn phí toàn quốc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="desc" className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-slate-50 h-14 px-4">
              <TabsTrigger value="desc" className="text-base data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Đặc điểm nổi bật</TabsTrigger>
              <TabsTrigger value="specs" className="text-base data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Thông số kỹ thuật</TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="desc" className="mt-0">
                <div 
                  className="prose max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.fullDescription || product.shortDescription || "Đang cập nhật..." }}
                />
              </TabsContent>
              <TabsContent value="specs" className="mt-0">
                {product.attributes && product.attributes.length > 0 ? (
                  <table className="w-full text-sm">
                    <tbody>
                      {product.attributes.map((attr, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                          <td className="py-3 px-4 w-1/3 font-medium border border-border">{attr.name}</td>
                          <td className="py-3 px-4 border border-border text-muted-foreground">{attr.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted-foreground">Đang cập nhật thông số kỹ thuật...</p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div>
          {/* Sidebar content like related products can go here */}
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-destructive inline-block"></span>
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
  );
}
