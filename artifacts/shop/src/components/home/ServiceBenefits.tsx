import { Truck, ShieldCheck, HeadphonesIcon, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BENEFITS = [
  {
    id: 1,
    title: "Chính hãng 100%",
    description: "Đảm bảo sản phẩm chính hãng từ nhà sản xuất",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Giao hàng toàn quốc",
    description: "Giao hàng nhanh chóng đến mọi tỉnh thành",
    icon: Truck,
  },
  {
    id: 3,
    title: "Hỗ trợ kỹ thuật",
    description: "Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ 24/7",
    icon: HeadphonesIcon,
  },
  {
    id: 4,
    title: "Giá tốt mỗi ngày",
    description: "Cam kết giá tốt nhất thị trường",
    icon: Tag,
  },
];

export function ServiceBenefits() {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-white border-y border-orange-100">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => (
            <Card
              key={benefit.id}
              className="border-0 shadow-md hover:shadow-xl transition-all duration-500 group bg-white hover:border-orange-300 border border-transparent"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-4 group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-base text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
