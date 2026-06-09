import { useHomepageListings } from "@/hooks/use-catalog";
import { listingToProduct } from "@/lib/catalog-store";
import { CategoryProductSection } from "@/components/home/CategoryProductSection";
import type { CategoryNode } from "@/types/catalog";

interface HomeProductSectionProps {
  category: CategoryNode;
  categorySlugs: string[];
  limit?: number;
}

export function HomeProductSection({ category, categorySlugs, limit = 8 }: HomeProductSectionProps) {
  const { listings, loading } = useHomepageListings(categorySlugs, 200);

  if (loading) return null;

  const products = listings.map(listingToProduct);

  return (
    <div className="container mx-auto px-4 py-6">
      <CategoryProductSection category={category} products={products} limit={limit} />
    </div>
  );
}
