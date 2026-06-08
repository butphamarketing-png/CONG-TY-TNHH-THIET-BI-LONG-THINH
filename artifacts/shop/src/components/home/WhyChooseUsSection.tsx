import { ShieldCheck, Truck, Headphones, Award, Clock, CheckCircle } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Chính hãng 100%",
    description: "Cam kết sản phẩm chính hãng, có đầy đủ giấy tờ chứng minh nguồn gốc",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Giao hàng nội thành trong 3h, toàn quốc trong 2-5 ngày",
  },
  {
    icon: Award,
    title: "Giá tốt nhất",
    description: "Cam kết giá cạnh tranh nhất thị trường, nhiều chương trình khuyến mãi",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ kỹ thuật",
    description: "Đội ngũ kỹ thuật viên chuyên nghiệp, hỗ trợ 24/7",
  },
  {
    icon: Clock,
    title: "Bảo hành dài hạn",
    description: "Bảo hành chính hãng từ 2-5 năm, hỗ trợ tận nơi",
  },
  {
    icon: CheckCircle,
    title: "Lắp đặt chuyên nghiệp",
    description: "Đội ngũ lắp đặt chuyên nghiệp, đúng tiêu chuẩn kỹ thuật",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Tại sao chọn TDM Tuấn Đức?
        </h2>
        <p className="text-gray-600">
          Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <feature.icon className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
