import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS } from "@/lib/tdm-data";

export function NewsSection() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-10">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            Tin tức nổi bật
          </h2>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {NEWS.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all duration-300 group flex flex-col bg-white rounded-xl"
            >
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="block relative overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {article.category && (
                  <span className="absolute top-2.5 left-2.5 bg-orange-500/90 text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    {article.category}
                  </span>
                )}
              </Link>
              <CardContent className="p-4 flex flex-col flex-grow">
                <p className="text-[11px] text-gray-400 mb-1.5">{article.createdAt}</p>
                <Link href={`/tin-tuc/${article.slug}`} className="hover:text-orange-600 transition-colors">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
