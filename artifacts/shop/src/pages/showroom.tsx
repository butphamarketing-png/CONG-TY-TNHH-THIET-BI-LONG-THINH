import { Link } from "wouter";
import { ChevronRight, MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOWROOMS } from "@/lib/tdm-data";

export function ShowroomPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-5">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-5 flex-wrap gap-1">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Hệ thống Showroom</span>
        </div>

        {/* Page Header */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Hệ thống Showroom</h1>
          <p className="text-gray-500">
            Trải nghiệm sản phẩm thực tế tại các showroom của chúng tôi trên khắp cả nước
          </p>
        </div>

        {/* Showrooms List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWROOMS.map((showroom) => (
            <div
              key={showroom.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <div className="text-6xl">🏪</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{showroom.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Địa chỉ</div>
                      <div className="text-gray-500">{showroom.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Điện thoại</div>
                      <a
                        href={`tel:${showroom.phone}`}
                        className="text-red-600 font-semibold hover:underline"
                      >
                        {showroom.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Giờ mở cửa</div>
                      <div className="text-gray-500">{showroom.hours}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700" asChild>
                    <a href={`tel:${showroom.phone}`}>
                      <Phone className="w-4 h-4 mr-2" /> Gọi ngay
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MessageSquare className="w-4 h-4 mr-2" /> Chat Zalo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
