import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import {
  Search, ShoppingCart, Menu, Phone, Mail, MapPin,
  ChevronRight, Heart, ArrowUp, X, Home, Grid3X3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/tdm-data";
import { getBrands } from "@/lib/catalog-service";
import { searchListings, listingToProduct } from "@/lib/catalog-store";
import { getMainGroups } from "@/lib/category-utils";
import { brandUrl, categoryUrl, productUrl } from "@/lib/urls";
import { TopPromoBar } from "@/components/layout/TopPromoBar";
import { MainNav } from "@/components/layout/MainNav";
import { MobileCategoryMenu } from "@/components/mega-menu/MobileCategoryMenu";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { items } = useCart();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const mainGroups = getMainGroups(CATEGORIES);

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchListings(searchQuery, 1, 8).then((result) => {
        setFilteredProducts(result.data.map(listingToProduct));
      });
      const brandList = brands.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);
      setFilteredBrands(brandList);
    } else {
      setFilteredProducts([]);
      setFilteredBrands([]);
    }
  }, [searchQuery, brands]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-gray-50">
      <TopPromoBar />

      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden shrink-0">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 flex flex-col">
              <div className="bg-orange-600 text-white px-4 py-4 flex items-center justify-between">
                <span className="font-bold text-xl">LONG THỊNH</span>
                <SheetClose asChild>
                  <button type="button" className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </SheetClose>
              </div>
              <MobileCategoryMenu />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="bg-orange-600 text-white px-4 py-2 rounded">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight">LONG THỊNH</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-3xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full pl-4 pr-12 rounded-sm border-2 border-gray-200 h-11 text-sm focus-visible:border-orange-500 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.trim().length >= 2);
                }}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-11 w-12 rounded-sm bg-orange-600 hover:bg-orange-700"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>

            {showSearchResults && (filteredProducts.length > 0 || filteredBrands.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-2xl z-[60] max-h-[500px] overflow-y-auto">
                {filteredBrands.length > 0 && (
                  <div className="p-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Thương hiệu</div>
                    <div className="flex flex-wrap gap-2 px-3 pb-2">
                      {filteredBrands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={brandUrl(brand.slug)}
                          onClick={() => { setShowSearchResults(false); setSearchQuery(""); }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-orange-50 text-sm rounded hover:text-orange-600 transition-colors"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {filteredProducts.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Sản phẩm</div>
                    <div className="space-y-1">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={productUrl(product.slug)}
                          onClick={() => { setShowSearchResults(false); setSearchQuery(""); }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={product.thumbnail} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">{product.name}</div>
                            <div className="text-xs text-orange-600 font-semibold">
                              {product.price.toLocaleString("vi-VN")}đ
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex flex-col text-right text-xs leading-tight">
              <span className="text-gray-500">Tài khoản</span>
              <span className="text-gray-700">Đăng nhập / Đăng ký</span>
            </div>

            <Link href="/yeu-thich" className="hidden md:flex p-2 hover:text-orange-600 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/gio-hang"
              className="relative flex items-center gap-2 px-3 py-2 border border-gray-200 hover:border-orange-300 transition-colors rounded-sm"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[9px] font-bold rounded-full">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </Badge>
                )}
              </div>
              <div className="hidden md:block leading-tight text-xs">
                <div className="text-gray-500">Giỏ hàng</div>
                <div className="font-semibold text-gray-800">{cartItemCount} sp</div>
              </div>
            </Link>
          </div>
        </div>

        <MainNav />
      </header>

      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 pt-12 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-extrabold text-white mb-2">LONG THỊNH</div>
              <div className="text-xs text-gray-500 mb-4 uppercase tracking-wider">CÔNG TY TNHH THIẾT BỊ LONG THỊNH</div>
              <p className="text-sm mb-5 leading-relaxed">
                Hệ thống phân phối thiết bị vệ sinh, bếp, nước, điện chính hãng.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>504 Nguyễn Văn Quá, P. Đông Hưng Thuận, TP Hồ Chí Minh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href="tel:0906752821" className="hover:text-white transition-colors">0906 752 821</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href="mailto:info@longthinh.vn" className="hover:text-white transition-colors">info@longthinh.vn</a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs text-gray-500">MST:</span>
                  <span className="text-xs">0311528071-001</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Danh mục sản phẩm</h3>
              <ul className="space-y-2 text-sm">
                {mainGroups.map((group) => (
                  <li key={group.id}>
                    <Link
                      href={categoryUrl(group.slug)}
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-orange-500/60" />
                      {group.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Chính sách</h3>
              <ul className="space-y-2 text-sm">
                {["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách giao hàng", "Chính sách bảo mật"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-orange-500/60" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Tổng đài hỗ trợ</h3>
              <div className="space-y-3">
                <div className="bg-[#2a2a2a] p-4 rounded">
                  <div className="text-xs text-gray-500 mb-1">Hotline tư vấn mua hàng</div>
                  <a href="tel:0906752821" className="text-xl font-bold text-orange-500">0906 752 821</a>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded">
                  <div className="text-xs text-gray-500 mb-1">Mã số thuế</div>
                  <div className="text-sm text-gray-300">0311528071-001</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#333] pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} CÔNG TY TNHH THIẾT BỊ LONG THỊNH — MST: 0311528071-001
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around py-2 shadow-lg">
        <Link href="/" className={`flex flex-col items-center gap-0.5 px-3 py-1 ${isActive("/") ? "text-orange-600" : "text-gray-500"}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Trang chủ</span>
        </Link>
        <Link href={categoryUrl("thiet-bi-ve-sinh")} className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-orange-600">
          <Grid3X3 className="w-5 h-5" />
          <span className="text-[10px]">Danh mục</span>
        </Link>
        <Link href="/gio-hang" className={`flex flex-col items-center gap-0.5 px-3 py-1 relative ${isActive("/gio-hang") ? "text-orange-600" : "text-gray-500"}`}>
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px] border-none rounded-full">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px]">Giỏ hàng</span>
        </Link>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-20 md:bottom-6 right-3 flex flex-col items-end gap-3 z-40">
        <a
          href="https://m.me/tdm.vn"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2"
          title="Chat Facebook"
        >
          <span className="hidden group-hover:block bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            Chat Facebook
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-[#0084ff] text-white text-[10px] font-bold">
            FB
          </div>
        </a>
        <a
          href="https://zalo.me/0906752821"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2"
          title="Chat Zalo"
        >
          <span className="hidden group-hover:block bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            Chat Zalo
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-[#0068ff] text-white text-xs font-bold">
            Zalo
          </div>
        </a>
        <a href="tel:0906752821" className="group flex items-center gap-2" title="Gọi điện">
          <span className="hidden group-hover:block bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            0906 752 821
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-orange-600">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </a>
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
