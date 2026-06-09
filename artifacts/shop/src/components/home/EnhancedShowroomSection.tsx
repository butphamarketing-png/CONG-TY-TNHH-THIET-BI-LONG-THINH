import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SHOWROOMS } from "@/lib/tdm-data";

export function EnhancedShowroomSection() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Hệ thống Showroom
          </h2>
          <p className="text-gray-600">
            Trải nghiệm sản phẩm trực tiếp tại showroom gần bạn nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWROOMS.slice(0, 3).map((showroom) => (
            <Card key={showroom.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-orange-600 font-bold">{showroom.name}</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-3">{showroom.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{showroom.address}</span>
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
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  Xem trên bản đồ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
            Xem tất cả showroom
          </Button>
        </div>
      </div>
    </section>
  );
}
