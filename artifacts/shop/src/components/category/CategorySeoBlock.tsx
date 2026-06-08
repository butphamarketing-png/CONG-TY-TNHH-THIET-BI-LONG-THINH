import type { CategorySeoContent } from "@/types/catalog";

interface CategorySeoBlockProps {
  seo: CategorySeoContent;
  categoryName: string;
}

/** TDM-style SEO content block below product listing */
export function CategorySeoBlock({ seo, categoryName }: CategorySeoBlockProps) {
  return (
    <section className="mt-10 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <h2 className="text-lg font-bold text-gray-800">
          {seo.title || categoryName}
        </h2>
      </div>
      <div className="px-5 py-5 prose prose-sm max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-orange-600">
        <div dangerouslySetInnerHTML={{ __html: seo.html }} />
        {seo.priceTableHtml && (
          <div
            className="mt-6 overflow-x-auto [&_table]:w-full [&_table]:text-sm [&_th]:bg-gray-100 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:px-3 [&_td]:py-2 [&_td]:border-t [&_td]:border-gray-100"
            dangerouslySetInnerHTML={{ __html: seo.priceTableHtml }}
          />
        )}
      </div>
    </section>
  );
}
