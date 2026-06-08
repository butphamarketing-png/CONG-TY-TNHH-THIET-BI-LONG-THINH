import { Link } from "wouter";
import { Phone } from "lucide-react";

/** Red promotion bar matching https://www.tdm.vn/ */
export function TopPromoBar() {
  return (
    <div className="bg-red-600 text-white py-1.5 text-xs font-semibold tracking-wide">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        <p className="truncate">
          GIAO HÀNG NỘI THÀNH 3H. LẮP ĐẶT ĐÚNG CHUẨN. GIÁ TỐT
        </p>
        <div className="hidden sm:flex items-center gap-4 shrink-0 text-[11px] font-normal">
          <Link href="/tra-cuu-don-hang" className="hover:underline opacity-90">Tra cứu đơn hàng</Link>
          <span className="opacity-50">|</span>
          <Link href="/showroom" className="hover:underline opacity-90">Showroom</Link>
          <span className="opacity-50">|</span>
          <Link href="/tin-tuc" className="hover:underline opacity-90">Tin tức</Link>
          <a href="tel:0933322232" className="hidden md:flex items-center gap-1 hover:underline opacity-90">
            <Phone className="w-3 h-3" />
            0933.322.232
          </a>
        </div>
      </div>
    </div>
  );
}
