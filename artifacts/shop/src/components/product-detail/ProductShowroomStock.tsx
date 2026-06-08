import type { ShowroomStock } from "@/types/product";
import { MapPin, Phone, CheckCircle2, XCircle } from "lucide-react";
import { SHOWROOMS } from "@/lib/tdm-data";

interface ProductShowroomStockProps {
  showroomStock: ShowroomStock[];
}

export function ProductShowroomStock({ showroomStock }: ProductShowroomStockProps) {
  if (showroomStock.length === 0) return null;

  const showroomMap = new Map(SHOWROOMS.map((s) => [s.id, s]));

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-orange-600" />
        Tình trạng tại showroom
      </h3>
      <div className="space-y-3">
        {showroomStock.map((item) => {
          const info = showroomMap.get(item.showroomId);
          return (
            <div
              key={item.showroomId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50/60"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {item.showroomName}
                </p>
                {info?.address && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {info.address}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5">
                  {item.inStock ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">
                        Còn hàng
                        {item.quantity != null ? ` (${item.quantity} sản phẩm)` : ""}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">
                        Hết hàng — liên hệ đặt trước
                      </span>
                    </>
                  )}
                </div>
              </div>
              {info?.phone && (
                <a
                  href={`tel:${info.phone.replace(/\./g, "")}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 shrink-0"
                >
                  <Phone className="w-4 h-4" />
                  {info.phone}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
