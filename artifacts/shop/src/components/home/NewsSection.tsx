import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS } from "@/lib/tdm-data";

export function NewsSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wider">
            Tin tức nổi bật
          </h2>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 group flex flex-col bg-white"
            >
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="block relative overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {article.category && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                    {article.category}
                  </span>
                )}
              </Link>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-2 font-medium">{article.createdAt}</p>
                <Link
                  href={`/tin-tuc/${article.slug}`}
                  className="hover:text-orange-600 transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg line-clamp-2 leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
