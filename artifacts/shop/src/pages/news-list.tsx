import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { NEWS } from "@/lib/tdm-data";

export function NewsListPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(NEWS.length / itemsPerPage);
  const paginatedNews = NEWS.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-red-600">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-800 font-medium">Tin tức - Mẹo vặt</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Tin tức & Mẹo vặt</h1>
          <p className="text-gray-500">
            Cập nhật những thông tin mới nhất về thiết bị vệ sinh, bếp, nước và mẹo sử dụng
          </p>
        </div>

        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((article, idx) => (
                <Card
                  key={article.id}
                  className={`overflow-hidden border-gray-200 flex flex-col ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <Link
                    href={`/tin-tuc/${article.slug}`}
                    className={`block relative overflow-hidden ${
                      idx === 0 ? "aspect-video" : "aspect-[3/2]"
                    }`}
                  >
                    <img
                      src={article.thumbnail || "https://placehold.co/800x400"}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {article.category && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </div>
                    )}
                  </Link>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-gray-500 mb-3 flex items-center gap-4">
                      <span>{article.createdAt}</span>
                      <span className="flex items-center gap-1">
                        • {article.viewCount || 0} lượt xem
                      </span>
                    </div>
                    <Link
                      href={`/tin-tuc/${article.slug}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      <h2
                        className={`font-bold mb-3 line-clamp-2 leading-tight ${
                          idx === 0 ? "text-2xl md:text-3xl" : "text-xl"
                        }`}
                      >
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-gray-500 line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        {article.author || "Ban biên tập"}
                      </span>
                      <Button
                        variant="link"
                        className="px-0 text-red-600 group"
                        asChild
                      >
                        <Link href={`/tin-tuc/${article.slug}`}>
                          Đọc tiếp{" "}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Trước
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      className="w-10 h-10 p-0"
                      style={
                        page === i + 1 ? { backgroundColor: "#dc2626" } : {}
                      }
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Sau
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">Chưa có bài viết nào.</p>
          </div>
        )}
      </div>
    </div>
  );
}
