import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS } from "@/lib/tdm-data";

export function NewsSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-8 bg-orange-600 rounded inline-block" />
          Tin tức nổi bật
        </h2>
        <Link
          href="/tin-tuc"
          className="text-orange-600 font-medium hover:underline text-sm flex items-center gap-1"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS.map((article) => (
          <Card
            key={article.id}
            className="overflow-hidden border-gray-200 hover:shadow-lg transition-all flex flex-col bg-white"
          >
            <Link
              href={`/tin-tuc/${article.slug}`}
              className="block relative overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {article.category && (
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded">
                  {article.category}
                </span>
              )}
            </Link>
            <CardContent className="p-5 flex flex-col flex-grow">
              <p className="text-xs text-gray-500 mb-2">{article.createdAt}</p>
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="hover:text-orange-600 transition-colors"
              >
                <h3 className="font-bold text-base md:text-lg line-clamp-2 leading-snug mb-3">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
