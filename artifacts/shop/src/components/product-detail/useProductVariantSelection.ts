import { useMemo, useState, useEffect } from "react";
import type { ProductVariant, TdmProduct } from "@/types/product";

export interface VariantGroup {
  name: string;
  options: ProductVariant[];
}

export function groupVariants(variants: ProductVariant[]): VariantGroup[] {
  const map = new Map<string, ProductVariant[]>();
  for (const v of variants) {
    const list = map.get(v.name) ?? [];
    list.push(v);
    map.set(v.name, list);
  }
  return Array.from(map.entries()).map(([name, options]) => ({ name, options }));
}

export function useProductVariantSelection(product: TdmProduct) {
  const groups = useMemo(() => groupVariants(product.variants), [product.variants]);

  const [selected, setSelected] = useState<Record<string, number>>({});

  useEffect(() => {
    const initial: Record<string, number> = {};
    for (const group of groups) {
      const first = group.options.find((o) => o.inStock) ?? group.options[0];
      if (first) initial[group.name] = first.id;
    }
    setSelected(initial);
  }, [product.id, groups]);

  const selectedVariants = useMemo(
    () =>
      groups
        .map((g) => g.options.find((o) => o.id === selected[g.name]))
        .filter((v): v is ProductVariant => v != null),
    [groups, selected],
  );

  const activeVariant = selectedVariants.find(
    (v) => v.price != null || v.originalPrice != null,
  ) ?? selectedVariants[selectedVariants.length - 1];

  const displayPrice = activeVariant?.price ?? product.price;
  const displayOriginalPrice = activeVariant?.originalPrice ?? product.originalPrice;
  const displaySku = activeVariant?.sku ?? product.sku;
  const displayInStock = selectedVariants.every((v) => v.inStock) && product.inStock;
  const displayThumbnail = activeVariant?.thumbnail ?? product.thumbnail;

  const selectVariant = (groupName: string, variantId: number) => {
    setSelected((prev) => ({ ...prev, [groupName]: variantId }));
  };

  return {
    groups,
    selected,
    selectVariant,
    displayPrice,
    displayOriginalPrice,
    displaySku,
    displayInStock,
    displayThumbnail,
    selectedVariants,
  };
}
