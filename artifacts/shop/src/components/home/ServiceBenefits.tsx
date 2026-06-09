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
    <section className="bg-white border-y border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => (
            <Card
              key={benefit.id}
              className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
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
