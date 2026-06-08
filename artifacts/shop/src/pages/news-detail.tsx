import { Link } from "wouter";
import {
  ChevronRight,
  Calendar,
  User,
  Eye,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEWS } from "@/lib/tdm-data";

export function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = NEWS.find((a) => a.slug === slug);
  const relatedNews = NEWS.filter((a) => a.slug !== slug).slice(0, 5);

  if (!article) {
    return (
      <div className="container mx-auto py-16 text-center text-xl font-medium">
        Không tìm thấy bài viết.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-red-600">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/tin-tuc" className="hover:text-red-600">Tin tức</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-800 font-medium truncate">
            {article.title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <article className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-2xl border border-gray-200 shadow-sm">
            {article.category && (
              <div className="mb-4 inline-block bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wider">
                {article.category}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author || "Ban biên tập"}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.viewCount || 0} lượt xem
              </div>
            </div>

            {article.excerpt && (
              <p className="text-lg font-medium text-gray-800 mb-8 italic border-l-4 border-red-600 pl-4 py-1">
                {article.excerpt}
              </p>
            )}

            <div className="aspect-video w-full rounded-xl overflow-hidden mb-10 border border-gray-200">
              <img
                src={article.thumbnail || "https://placehold.co/800x450"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:border prose-img:border-gray-200 prose-a:text-red-600 hover:prose-a:text-red-700 prose-headings:text-gray-800"
              dangerouslySetInnerHTML={{
                __html:
                  article.content || "<p>Nội dung đang cập nhật...</p>",
              }}
            />

            <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2">
                {article.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="rounded-full gap-2">
                <Share2 className="w-4 h-4" /> Chia sẻ bài viết
              </Button>
            </div>
          </article>

          <aside className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
                <span className="w-1.5 h-6 bg-red-600 inline-block"></span>
                Bài viết mới nhất
              </h3>

              <div className="space-y-6">
                {relatedNews.map((related) => (
                  <Link
                    key={related.id}
                    href={`/tin-tuc/${related.slug}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={
                          related.thumbnail || "https://placehold.co/100x100"
                        }
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors leading-snug">
                        {related.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {related.createdAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
