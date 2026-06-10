import { Truck, ShieldCheck, HeadphonesIcon, Tag } from "lucide-react";

const BENEFITS = [
  {
    id: 1,
    title: "Chính hãng",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Giao hàng",
    icon: Truck,
  },
  {
    id: 3,
    title: "Hỗ trợ 24/7",
    icon: HeadphonesIcon,
  },
  {
    id: 4,
    title: "Giá tốt",
    icon: Tag,
  },
];

export function ServiceBenefits() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container mx-auto px-3 md:px-6 py-4 md:py-5">
        <div className="flex flex-nowrap items-stretch gap-2 md:gap-4">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 md:gap-2 py-3 md:py-4 px-1 rounded-xl bg-gradient-to-b from-orange-50/80 to-white border border-orange-100/60"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                <benefit.icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-gray-700 text-center leading-tight whitespace-nowrap">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
