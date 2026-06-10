import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { resolveCatalogSlug, resolveCatalogSlugSync } from "@/lib/catalog-service";
import { CategoryPage } from "@/pages/category";
import { BrandPage } from "@/pages/brand";
import { ProductDetailPage } from "@/pages/product-detail";
import NotFound from "@/pages/not-found";
import type { SlugEntry } from "@/types/catalog";

function normalizeSlug(raw?: string): string {
  if (!raw) return "";
  return raw.replace(/\.html$/i, "").trim();
}

export function CatalogSlugPage({ params }: { params?: { slug: string } }) {
  const routeParams = useParams<{ slug: string }>();
  const slug = normalizeSlug(params?.slug ?? routeParams.slug);

  const [entry, setEntry] = useState<SlugEntry | null | undefined>(() =>
    slug ? resolveCatalogSlugSync(slug) ?? null : null,
  );
  const [loading, setLoading] = useState(entry === null);

  useEffect(() => {
    if (!slug) {
      setEntry(undefined);
      setLoading(false);
      return;
    }

    const sync = resolveCatalogSlugSync(slug);
    if (sync) {
      setEntry(sync);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    resolveCatalogSlug(slug).then((resolved) => {
      if (!cancelled) {
        setEntry(resolved ?? undefined);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-500">
        Đang tải...
      </div>
    );
  }

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
