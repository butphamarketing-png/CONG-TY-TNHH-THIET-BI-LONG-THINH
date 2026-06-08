import { Link } from "wouter";
import { productUrl } from "@/lib/urls";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface WishlistItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  thumbnail?: string | null;
  brandName?: string | null;
  inStock?: boolean;
}

function getWishlist(): WishlistItem[] {
  try {
    return JSON.parse(localStorage.getItem("tdm_wishlist") || "[]");
  } catch {
    return [];
  }
}

export function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    setItems(getWishlist());
    const onStorage = () => setItems(getWishlist());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const removeItem = (id: number) => {
    const updated = items.filter((i) => i.id !== id);
    localStorage.setItem("tdm_wishlist", JSON.stringify(updated));
    setItems(updated);
    toast({ title: "Đã xóa khỏi danh sách yêu thích" });
  };

  const clearAll = () => {
    localStorage.setItem("tdm_wishlist", JSON.stringify([]));
    setItems([]);
    toast({ title: "Đã xóa tất cả sản phẩm yêu thích" });
  };

  const handleAddToCart = (item: WishlistItem) => {
    addItem(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice ?? undefined,
        thumbnail: item.thumbnail ?? undefined,
        brandName: item.brandName ?? undefined,
        inStock: item.inStock ?? true,
      } as any,
      1
    );
    toast({ title: "Đã thêm vào giỏ hàng", description: item.name });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-red-200" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Danh sách yêu thích trống</h1>
        <p className="text-muted-foreground mb-8">
          Bạn chưa thêm sản phẩm nào vào danh sách yêu thích. Hãy khám phá và lưu những sản phẩm bạn thích!
        </p>
        <Button size="lg" className="rounded-full px-10" asChild>
          <Link href="/">
            Khám phá sản phẩm <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Sản phẩm yêu thích</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          Sản phẩm yêu thích
          <span className="text-lg font-normal text-muted-foreground">({items.length})</span>
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-destructive hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Xóa tất cả
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item) => {
          const hasDiscount = item.originalPrice != null && item.originalPrice > item.price;
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group hover:shadow-md transition-all">
              <Link href={productUrl(item.slug)} className="block relative aspect-square bg-gray-50">
                <img
                  src={item.thumbnail || "https://placehold.co/300x300"}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2 py-1 rounded-lg">
                    -{item.discount}%
                  </div>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); removeItem(item.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-all shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </Link>

              <div className="p-4">
                {item.brandName && (
                  <div className="text-xs text-muted-foreground mb-1">{item.brandName}</div>
                )}
                <Link href={productUrl(item.slug)}>
                  <h3 className="font-semibold text-sm line-clamp-2 leading-snug mb-3 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-destructive font-bold text-lg">{formatCurrency(item.price)}</span>
                  {hasDiscount && item.originalPrice != null && (
                    <span className="text-xs text-muted-foreground line-through">{formatCurrency(item.originalPrice)}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-grow rounded-full text-xs border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                    {item.inStock ? "Thêm giỏ" : "Hết hàng"}
                  </Button>
                  <Button size="sm" className="flex-grow rounded-full text-xs bg-destructive hover:bg-destructive/90" asChild>
                    <Link href={productUrl(item.slug)}>Mua ngay</Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
