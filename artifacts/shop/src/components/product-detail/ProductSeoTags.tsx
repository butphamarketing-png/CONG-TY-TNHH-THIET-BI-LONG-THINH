interface ProductSeoTagsProps {
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

const TAG_LABELS: Record<string, string> = {
  bestseller: "Bán chạy",
  featured: "Nổi bật",
  new: "Mới",
  sale: "Khuyến mãi",
};

export function ProductSeoTags({ tags, seoTitle, seoDescription }: ProductSeoTagsProps) {
  if (tags.length === 0 && !seoTitle && !seoDescription) return null;

  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
      {(seoTitle || seoDescription) && (
        <div className="mb-4">
          {seoTitle && (
            <h3 className="text-sm font-bold text-gray-800 mb-1">{seoTitle}</h3>
          )}
          {seoDescription && (
            <p className="text-xs text-gray-500 leading-relaxed">{seoDescription}</p>
          )}
        </div>
      )}
      {tags.length > 0 && (
        <>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
            Từ khóa sản phẩm
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors"
              >
                {TAG_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
