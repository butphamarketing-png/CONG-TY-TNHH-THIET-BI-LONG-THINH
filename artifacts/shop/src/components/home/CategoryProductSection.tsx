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
    <section className="bg-white mb-8">
      {/* Center aligned large orange title */}
      <div className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wider">
          SẢN PHẨM {category.name.toUpperCase()}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-orange-400 transition-all duration-500 group bg-white"
            >
              <Link href={productUrl(product.slug)} className="block">
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {(product.discount ?? 0) > 0 && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      HOT
                    </span>
                  )}
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-1.5 font-medium">{product.brandName}</div>
                <Link href={productUrl(product.slug)} className="block">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
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
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-xs py-2.5 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center pb-8">
        <Link
          href={categoryUrl(category.slug)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
