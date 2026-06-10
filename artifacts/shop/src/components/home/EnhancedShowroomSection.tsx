import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SHOWROOMS } from "@/lib/tdm-data";

export function EnhancedShowroomSection() {
  return (
    <section className="rounded-2xl bg-white border border-gray-100 shadow-sm py-8 md:py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight mb-2">
          Hệ thống Showroom
        </h2>
        <p className="text-sm text-gray-500">
          Trải nghiệm sản phẩm trực tiếp tại showroom gần bạn nhất
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {SHOWROOMS.slice(0, 3).map((showroom) => (
          <Card
            key={showroom.id}
            className="overflow-hidden border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all duration-300 group rounded-xl"
          >
            <div className="relative h-40 bg-gradient-to-br from-orange-50 via-amber-50/50 to-white">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2 opacity-80">🏢</div>
                  <div className="text-orange-600 font-semibold text-sm">{showroom.name}</div>
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-semibold text-base text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {showroom.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-relaxed">{showroom.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a
                    href={`tel:${showroom.phone.replace(/\./g, "")}`}
                    className="text-sm text-orange-600 font-medium hover:underline"
                  >
                    {showroom.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{showroom.hours}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm">
                Xem trên bản đồ
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
