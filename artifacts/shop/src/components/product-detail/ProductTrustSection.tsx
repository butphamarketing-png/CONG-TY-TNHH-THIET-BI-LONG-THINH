import { ShieldCheck, Truck, Wrench, Headphones } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Bảo hành chính hãng",
    description: "Cam kết 100% hàng chính hãng, bảo hành theo tiêu chuẩn nhà sản xuất",
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    description: "Giao nhanh nội thành 2–4h, hỗ trợ vận chuyển toàn quốc",
  },
  {
    icon: Wrench,
    title: "Lắp đặt chuyên nghiệp",
    description: "Đội ngũ kỹ thuật TDM lắp đặt đúng chuẩn, bảo hành thi công",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ kỹ thuật",
    description: "Tư vấn trước & sau bán hàng, hỗ trợ kỹ thuật 7 ngày/tuần",
  },
];

export function ProductTrustSection() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-t border-gray-200 pt-5 mt-5">
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-orange-50/40 border border-orange-100"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center">
              <Icon className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs font-bold text-gray-800">{item.title}</p>
            <p className="text-[11px] text-gray-500 leading-snug">{item.description}</p>
          </div>
        );
      })}
    </section>
  );
}
