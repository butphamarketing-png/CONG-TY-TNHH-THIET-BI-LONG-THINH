import { Link } from "wouter";
import { Phone, MapPin } from "lucide-react";
import { MegaMenu } from "@/components/mega-menu/MegaMenu";

/** Secondary nav bar matching tdm.vn: Danh mục + Giới thiệu + Showroom + Catalog + Hotline */
export function MainNav() {
  return (
    <nav className="bg-white border-t border-b border-gray-200 hidden md:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center">
          <li>
            <MegaMenu />
          </li>
          <li>
            <Link
              href="/showroom"
              className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              GIỚI THIỆU
            </Link>
          </li>
          <li>
            <Link
              href="/showroom"
              className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              HỆ THỐNG SHOWROOM
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              CATALOG
            </a>
          </li>
          <li className="ml-auto">
            <a
              href="tel:0933322232"
              className="flex items-center gap-2 px-4 py-3 text-sm"
            >
              <Phone className="w-4 h-4 text-orange-600" />
              <span className="text-gray-600">HOTLINE:</span>
              <span className="font-bold text-orange-600">0933.322.232</span>
              <span className="text-gray-400 hidden lg:inline">- 028.2244.8333</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
