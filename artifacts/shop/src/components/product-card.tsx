import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, BarChart2, Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { productUrl } from "@/lib/urls";

interface Product {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  brandName?: string;
  categoryName?: string;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleWishlist, wishlist, toggleCompare, compareList } = useCart();
  const { toast } = useToast();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const currentPrice = product.price;
  const originalPrice = product.originalPrice;
  const hasDiscount = originalPrice != null && originalPrice > currentPrice;
  const discountPct = product.discount;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product as any);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare(product.id);
  };

  return (
    <Card className="group overflow-hidden flex flex-col h-full transition-all duration-300 border-gray-200 hover:border-red-600/30 hover:shadow-lg bg-white">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={productUrl(product.slug)} className="block w-full h-full">
          <img
            src={product.thumbnail || "https://placehold.co/400x400/e2e8f0/64748b?text=No+Image"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && discountPct && (
            <Badge className="bg-red-600 hover:bg-red-700 font-bold text-[11px] px-1.5 py-0.5">
              -{discountPct}%
            </Badge>
          )}
          {product.isNew && !hasDiscount && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-[11px] px-1.5 py-0.5">MỚI</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-[11px] px-1.5 py-0.5">HOT</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center bg-white border border-gray-200 hover:border-red-600 transition-colors ${isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
            onClick={handleWishlist}
            title="Yêu thích"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
          <button
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center bg-white border border-gray-200 hover:border-red-600 transition-colors ${isCompared ? "text-red-600" : "text-gray-400 hover:text-red-600"}`}
            onClick={handleCompare}
            title="So sánh"
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add to Cart (appears at bottom on hover) */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full rounded-none h-9 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            Thêm vào giỏ
          </Button>
        </div>
      </div>

      <CardContent className="p-3 flex flex-col flex-grow">
        <div className="text-[11px] text-gray-500 mb-1 font-medium uppercase tracking-wide">
          {product.brandName || "TDM Shop"}
        </div>
        <Link href={productUrl(product.slug)} className="hover:text-red-600 transition-colors">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 leading-snug min-h-[2.4rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating != null && product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(product.rating!)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        <div className="mt-auto pt-1 flex flex-col gap-0.5">
          <span className="text-base font-bold text-red-600">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentPrice)}
          </span>
          {hasDiscount && originalPrice != null && (
            <span className="text-xs text-gray-400 line-through">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(originalPrice)}
            </span>
          )}
        </div>

        {product.soldCount != null && product.soldCount > 0 && (
          <div className="text-[11px] text-gray-500 mt-1">
            Đã bán: {product.soldCount.toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
