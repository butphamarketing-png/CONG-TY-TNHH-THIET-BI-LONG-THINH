import { Link } from "wouter";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { SHOWROOMS } from "@/lib/tdm-data";

/** Showroom grid matching tdm.vn homepage */
export function ShowroomSection() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="text-center px-4 py-6 md:py-8 border-b border-gray-100 bg-gradient-to-b from-orange-50/50 to-white">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 uppercase tracking-wide">
          Hệ thống Showroom
        </h2>
        <p className="text-sm text-gray-500 mt-1">TDM Tuấn Đức</p>
        <p className="text-xs text-orange-600 font-medium mt-2">
          Tất cả chi nhánh đều có chỗ đậu xe ôtô
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {SHOWROOMS.map((showroom) => (
          <div key={showroom.id} className="p-5 hover:bg-gray-50/80 transition-colors">
            <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base uppercase">
              {showroom.name}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{showroom.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={`tel:${showroom.phone.replace(/\./g, "")}`} className="hover:text-orange-600 font-medium">
                  {showroom.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{showroom.hours}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center py-4 border-t border-gray-100">
        <Link
          href="/showroom"
          className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:underline"
        >
          Xem bản đồ tất cả showroom <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
