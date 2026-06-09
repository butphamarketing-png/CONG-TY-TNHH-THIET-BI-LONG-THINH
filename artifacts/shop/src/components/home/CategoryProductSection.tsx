import { Link } from "wouter";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryNode } from "@/types/catalog";
import type { TdmProduct } from "@/types/product";
import { categoryUrl, productUrl } from "@/lib/urls";
import { getCategoryIcon } from "@/lib/category-icons";

interface CategoryProductSectionProps {
  category: CategoryNode;
  products: TdmProduct[];
  limit?: number;
}

export function CategoryProductSection({
  category,
  products,
  limit = 8,
}: CategoryProductSectionProps) {
  const categoryProducts = products
    .filter(
      (p) =>
        p.categorySlug === category.slug ||
        category.children?.some((c) => c.slug === p.categorySlug)
    )
    .slice(0, limit);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="bg-white mb-6">
      {/* Center aligned large orange title */}
      <div className="text-center py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wide">
          SẢN PHẨM {category.name.toUpperCase()}
        </h2>
      </div>

      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categoryProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border border-gray-200 hover:shadow-xl hover:border-orange-400 transition-all duration-300 group"
            >
              <Link href={productUrl(product.slug)} className="block">
                <div className="relative aspect-[4/5] bg-gray-50">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {(product.discount ?? 0) > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      HOT
                    </span>
                  )}
                </div>
              </Link>
              <CardContent className="p-3">
                <div className="text-xs text-gray-500 mb-1">{product.brandName}</div>
                <Link href={productUrl(product.slug)} className="block">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-bold text-orange-600">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-xs py-2"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center pb-6">
        <Link
          href={categoryUrl(category.slug)}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold hover:underline"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
