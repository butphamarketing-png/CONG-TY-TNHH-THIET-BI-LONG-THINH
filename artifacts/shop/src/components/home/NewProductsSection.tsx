import { Link } from "wouter";
import { ShoppingCart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/tdm-data";
import { useEffect, useState } from "react";
import type { TdmProduct } from "@/types/product";

export function NewProductsSection() {
  const [newProducts, setNewProducts] = useState<TdmProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use imported products for new arrivals
    const importedNewProducts = PRODUCTS.filter((p) => p.isNew).slice(0, 8);
    setNewProducts(importedNewProducts);
    setLoading(false);
  }, []);

  return (
    <section className="container mx-auto px-4 py-8 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Sản phẩm mới
          </h2>
        </div>
        <Link href="/san-pham?sort=new" className="text-orange-600 font-medium hover:underline">
          Xem tất cả
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all group">
              <Link href={`/san-pham/${product.slug}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      MỚI
                    </span>
                  )}
                  {(product.discount ?? 0) > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </Link>
              <CardContent className="p-4">
                <Link href={`/san-pham/${product.slug}`} className="block">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
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
                <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
