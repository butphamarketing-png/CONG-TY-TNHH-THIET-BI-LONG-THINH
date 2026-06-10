import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ChevronRight, Star, Flame } from "lucide-react";
import { NEWS } from "@/lib/tdm-data";
import { ProductCard } from "@/components/product-card";
import { CategoryPagination } from "@/components/category/CategoryPagination";
import { useBrand, useBrandListings } from "@/hooks/use-catalog";
import { listingToProduct } from "@/lib/catalog-store";

const ITEMS_PER_PAGE = 48;

export function BrandPage({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState(1);
  const { brand, loading: brandLoading } = useBrand(params.slug);
  const { listings, loading: productsLoading } = useBrandListings(params.slug);
  const products = listings.map(listingToProduct);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(
    () => products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [products, page],
  );
  const bestSellers = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 6);
  const featuredProductIds = brand?.featuredProducts || [];
  const featuredProducts = products.filter((p) => featuredProductIds.includes(p.id));
  const brandNews = NEWS.filter((n) => n.brandSlug === params.slug);

  if (brandLoading) {
    return <div className="container mx-auto py-12 text-center">Đang tải...</div>;
  }

  if (!brand) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-xl font-bold mb-2">Không tìm thấy thương hiệu</h2>
        <Link href="/" className="text-red-600 hover:underline">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center text-sm text-gray-500 mb-5 flex-wrap gap-1">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">{brand.name}</span>
        </div>

        {brand.banner && (
          <div className="mb-6 rounded-xl overflow-hidden h-52 md:h-64 flex items-center justify-center bg-blue-900">
            <div className="text-white text-center p-6">
              <h1 className="text-4xl font-black mb-3">{brand.name}</h1>
              {brand.description && <p className="text-lg opacity-90 max-w-2xl">{brand.description}</p>}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 bg-gray-100 rounded-2xl flex items-center justify-center text-5xl shrink-0">
              🏷️
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black mb-2">{brand.name}</h1>
              <p className="text-gray-600 mb-4 text-lg">{brand.description}</p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.9/5 (2,300+ đánh giá)</span>
                </div>
                <div>
                  <span>{products.length} sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {featuredProducts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 inline-block rounded" />
              Sản phẩm nổi bật
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {bestSellers.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Flame className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Sản phẩm bán chạy</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {brandNews.length > 0 && (
          <section className="mb-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 inline-block rounded" />
              Tin tức về {brand.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {brandNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/tin-tuc/${news.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
                    📰
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gray-400 mb-2 block">{news.createdAt}</span>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{news.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-600 inline-block rounded" />
            Tất cả sản phẩm {brand.name}
          </h2>
          {productsLoading ? (
            <div className="text-center py-12">Đang tải sản phẩm...</div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {totalPages > 1 && (
                <CategoryPagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">
                Chưa có sản phẩm nào cho thương hiệu này
              </h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
