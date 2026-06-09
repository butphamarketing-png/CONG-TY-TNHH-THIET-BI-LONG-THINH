import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SHOWROOMS } from "@/lib/tdm-data";

export function EnhancedShowroomSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wider mb-3">
            Hệ thống Showroom
          </h2>
          <p className="text-gray-600 font-medium">
            Trải nghiệm sản phẩm trực tiếp tại showroom gần bạn nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOWROOMS.slice(0, 3).map((showroom) => (
            <Card key={showroom.id} className="overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
              <div className="relative h-52 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🏢</div>
                    <div className="text-orange-600 font-bold text-lg">{showroom.name}</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">{showroom.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 leading-relaxed">{showroom.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                    <a
                      href={`tel:${showroom.phone.replace(/\./g, "")}`}
                      className="text-sm text-orange-600 font-semibold hover:underline"
                    >
                      {showroom.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{showroom.hours}</span>
                  </div>
                </div>
                <Button className="w-full mt-5 bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all">
                  Xem trên bản đồ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 font-semibold shadow-sm hover:shadow-md transition-all">
            Xem tất cả showroom
          </Button>
        </div>
      </div>
    </section>
  );
}
