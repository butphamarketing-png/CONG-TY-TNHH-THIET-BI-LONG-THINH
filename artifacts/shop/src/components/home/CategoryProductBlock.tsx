import { Link } from "wouter";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import type { CategoryNode } from "@/types/catalog";
import type { TdmProduct } from "@/types/product";

interface CategoryProductBlockProps {
  category: CategoryNode;
  products: TdmProduct[];
  limit?: number;
}

export function CategoryProductBlock({ category, products, limit = 4 }: CategoryProductBlockProps) {
  const categoryProducts = products.slice(0, limit);

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-orange-600">{getCategoryIcon(category.groupSlug)}</span>
          {category.name}
        </h2>
        <Link
          href={categoryUrl(category.slug)}
          className="text-sm text-orange-600 hover:underline flex items-center gap-1 font-medium"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all group">
              <Link href={`/san-pham/${product.slug}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {(product.discount ?? 0) > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      HOT
                    </span>
                  )}
                </div>
              </Link>
              <CardContent className="p-3">
                <Link href={`/san-pham/${product.slug}`} className="block">
                  <h3 className="font-semibold text-xs text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-orange-600">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
                    </span>
                  )}
                </div>
                <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-xs h-8">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
