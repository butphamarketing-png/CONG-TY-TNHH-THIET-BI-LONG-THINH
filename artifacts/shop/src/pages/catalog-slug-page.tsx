import { resolveCatalogSlug } from "@/lib/catalog-service";
import { CategoryPage } from "@/pages/category";
import { BrandPage } from "@/pages/brand";
import { ProductDetailPage } from "@/pages/product-detail";
import NotFound from "@/pages/not-found";

export function CatalogSlugPage({ params }: { params: { slug: string } }) {
  const entry = resolveCatalogSlug(params.slug);

  if (!entry) {
    return <NotFound />;
  }

  switch (entry.type) {
    case "category":
      return <CategoryPage params={{ slug: entry.slug }} />;
    case "brand":
      return <BrandPage params={{ slug: entry.slug }} />;
    case "product":
      return <ProductDetailPage params={{ slug: entry.slug }} />;
    default:
      return <NotFound />;
  }
}
