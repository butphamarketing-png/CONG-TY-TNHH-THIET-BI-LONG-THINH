import { Link } from "wouter";
import type { TdmProduct } from "@/types/product";
import { productUrl } from "@/lib/urls";
import { formatCurrency } from "@/lib/format";

interface TdmProductCardProps {
  product: TdmProduct;
  brandLogo?: string;
}

export function TdmProductCard({ product, brandLogo }: TdmProductCardProps) {
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;
  const showBestseller =
    product.isBestSeller || product.badges?.includes("bestseller");
  const showCashback = product.cashbackAmount != null && product.cashbackAmount > 0;

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-orange-500 hover:shadow-md">
      {/* Brand logo */}
      {brandLogo && (
        <div className="px-3 pt-3 pb-1">
          <img
            src={brandLogo}
            alt={product.brandName}
            className="h-5 max-w-[80px] object-contain object-left"
          />
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 mx-3 rounded-md border border-transparent group-hover:border-orange-400 transition-colors">
        <Link href={productUrl(product.slug)} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
          {hasDiscount && product.discount != null && product.discount > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-tight">
              -{product.discount}%
            </span>
          )}
          {showBestseller && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-tight uppercase">
              Bán chạy
            </span>
          )}
        </div>

        {showCashback && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5">
            <span className="block bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-1 rounded-sm text-center leading-tight uppercase">
              Hoàn tiền {formatCurrency(product.cashbackAmount!)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-3 py-3 gap-1.5">
        <Link href={productUrl(product.slug)} className="hover:text-orange-600 transition-colors">
          <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem] font-medium">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto space-y-0.5">
          {product.contactForPrice ? (
            <>
              <p className="text-base font-bold text-red-600">
                {formatCurrency(product.price)}
              </p>
              {hasDiscount && product.originalPrice != null && (
                <p className="text-xs text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
              )}
              <p className="text-[11px] text-gray-500 italic">
                (liên hệ để có giá tốt hơn)
              </p>
            </>
          ) : (
            <>
              <p className="text-base font-bold text-red-600">
                {formatCurrency(product.price)}
              </p>
              {hasDiscount && product.originalPrice != null && (
                <p className="text-xs text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </article>
  );
}
