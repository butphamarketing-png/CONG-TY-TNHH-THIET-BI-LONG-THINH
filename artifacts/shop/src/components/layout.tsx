import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import {
  Search, ShoppingCart, Menu, Phone, Mail, MapPin,
  ChevronDown, ChevronRight, Heart, ArrowUp, X,
  Home, Grid3X3, Bath, Flame, Droplets, Zap, ShowerHead
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, BRANDS, PRODUCTS } from "@/lib/tdm-data";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { items } = useCart();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim().length >= 2
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  // Filter brands based on search query
  const filteredBrands = searchQuery.trim().length >= 2
    ? BRANDS.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  // Close search results when clicking outside
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isActive = (path: string) => location === path;

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "thiet-bi-ve-sinh": return <Bath className="w-4 h-4" />;
      case "thiet-bi-bep": return <Flame className="w-4 h-4" />;
      case "thiet-bi-nuoc": return <Droplets className="w-4 h-4" />;
      case "thiet-bi-dien": return <Zap className="w-4 h-4" />;
      case "phu-kien-nha-tam": return <ShowerHead className="w-4 h-4" />;
      default: return <Grid3X3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-gray-50">
      {/* ===== TOP HEADER (TDM Style) ===== */}
      <div className="bg-[#222] text-gray-300 py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:0933322232" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Hotline: <strong className="text-white text-[11px]">0933.322.232</strong></span>
            </a>
            <a href="mailto:info@tdm.vn" className="flex items-center gap-2 hover:text-white transition-colors hidden sm:flex">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>info@tdm.vn</span>
            </a>
            <div className="flex items-center gap-2 hidden lg:flex">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link>
            <span className="text-gray-600">|</span>
            <Link href="/showroom" className="hover:text-white transition-colors">Showroom</Link>
            <span className="text-gray-600">|</span>
            <Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
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
              <div className="bg-red-600 text-white px-4 py-4 flex items-center justify-between">
                <span className="font-bold text-xl">TDM</span>
                <SheetClose asChild>
                  <button className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </SheetClose>
              </div>
              <div className="overflow-y-auto flex-1 pb-4">
                <div className="px-4 py-3 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Danh mục sản phẩm
                </div>
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="border-b border-gray-100">
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-3 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {getCategoryIcon(cat.slug)}
                        {cat.name}
                      </span>
                      {cat.children && cat.children.length > 0 && <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </Link>
                    {cat.children?.map((child) => (
                      <div key={child.id}>
                        <Link
                          href={`/danh-muc/${child.slug}`}
                          className="flex items-center pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 border-t border-gray-50"
                        >
                          <ChevronRight className="w-3 h-3 mr-2 text-gray-400 shrink-0" />
                          {child.name}
                        </Link>
                        {child.children?.map((grandChild) => (
                          <Link
                            key={grandChild.id}
                            href={`/danh-muc/${grandChild.slug}`}
                            className="flex items-center pl-12 pr-4 py-2 text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-50"
                          >
                            {grandChild.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="bg-red-600 text-white px-3 py-2 rounded">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">TDM</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-3xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full pl-4 pr-12 rounded-none border-2 border-gray-200 h-12 text-sm focus-visible:border-red-500 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.trim().length >= 2);
                }}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-12 w-14 rounded-none bg-red-600 hover:bg-red-700"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>

            {/* Search Autocomplete Dropdown */}
            {showSearchResults && (filteredProducts.length > 0 || filteredBrands.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-2xl z-[60] max-h-[500px] overflow-y-auto">
                {filteredBrands.length > 0 && (
                  <div className="p-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Thương hiệu</div>
                    <div className="flex flex-wrap gap-2 px-3 pb-2">
                      {filteredBrands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/thuong-hieu/${brand.slug}`}
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-sm rounded hover:text-red-600 transition-colors"
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
                          href={`/san-pham/${product.slug}`}
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
                            <span className="text-2xl">🛒</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">{product.name}</div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-red-600 font-semibold">{product.price.toLocaleString("vi-VN")}₫</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`}
                      onClick={() => {
                        setShowSearchResults(false);
                      }}
                      className="block text-center py-3 text-sm text-red-600 hover:bg-gray-50 font-medium border-t border-gray-100"
                    >
                      Xem tất cả {filteredProducts.length} sản phẩm
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Hotline */}
            <a href="tel:0933322232" className="flex items-center gap-2 text-right hidden lg:flex">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] text-gray-500">Hotline 24/7</div>
                <a href="tel:0933322232" className="text-lg font-black text-red-600 hover:text-red-700">0933.322.232</a>
              </div>
            </a>

            {/* Wishlist */}
            <Link href="/yeu-thich" className="flex items-center gap-1 px-3 py-2 text-sm hover:text-red-600 transition-colors hidden md:flex">
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link
              href="/gio-hang"
              className="relative flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-white min-w-[20px] h-[20px] flex items-center justify-center p-0 text-[10px] font-bold rounded-full">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </Badge>
                )}
              </div>
              <div className="hidden md:block leading-tight">
                <div className="text-[10px] text-gray-500">Giỏ hàng</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ===== MEGA MENU NAVIGATION ===== */}
        <nav className="bg-[#1e3a8a] text-white border-t border-[#1e40af] hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaMenu(cat.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/danh-muc/${cat.slug}`}
                    className="flex items-center gap-2 px-5 py-3.5 font-semibold hover:bg-[#1e40af] transition-colors text-sm"
                  >
                    {getCategoryIcon(cat.slug)}
                    {cat.name}
                    {cat.children && cat.children.length > 0 && (
                      <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  {cat.children && cat.children.length > 0 && (
                    <div className={`absolute top-full left-0 w-[800px] bg-white text-gray-800 border border-gray-200 shadow-2xl transition-all duration-200 z-50 ${activeMegaMenu === cat.slug ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <div className="p-4 grid grid-cols-4 gap-4">
                        {cat.children.slice(0, 4).map((child) => (
                          <div key={child.id} className="border-r border-gray-100 last:border-0">
                            <Link
                              href={`/danh-muc/${child.slug}`}
                              className="block font-semibold text-gray-800 hover:text-red-600 pb-2 mb-2 border-b border-gray-100"
                            >
                              {child.name}
                            </Link>
                            {child.children?.slice(0, 6).map((grandChild) => (
                              <Link
                                key={grandChild.id}
                                href={`/danh-muc/${grandChild.slug}`}
                                className="block py-1.5 text-sm text-gray-600 hover:text-red-600 hover:pl-1 transition-all"
                              >
                                {grandChild.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Brands Banner */}
                      <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Thương hiệu nổi bật</div>
                        <div className="flex gap-4 flex-wrap">
                          {BRANDS.filter(b => b.isFeatured).slice(0, 6).map((brand) => (
                            <Link
                              key={brand.id}
                              href={`/thuong-hieu/${brand.slug}`}
                              className="flex items-center justify-center w-24 h-10 bg-white border border-gray-200 rounded hover:border-red-500 transition-colors"
                            >
                              <span className="font-bold text-gray-600">{brand.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              <li className="ml-auto">
                <Link href="/showroom" className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium hover:bg-[#1e40af] transition-colors">
                  <MapPin className="w-4 h-4" />
                  Showroom
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* ===== FOOTER (TDM Style) ===== */}
      <footer className="bg-[#1a1a1a] text-gray-400 pt-12 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-extrabold text-white mb-2">
                TDM
              </div>
              <div className="text-xs text-gray-500 mb-4 uppercase tracking-wider">CÔNG TY TNHH THIẾT BỊ LONG THỊNH</div>
              <p className="text-sm mb-5 leading-relaxed">
                Hệ thống phân phối thiết bị vệ sinh cao cấp TOTO, INAX, Caesar, Viglacera, Bosch, Hafele chính hãng.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12, TP. Hồ Chí Minh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <a href="tel:0933322232" className="hover:text-white transition-colors">0933.322.232</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <a href="mailto:info@tdm.vn" className="hover:text-white transition-colors">info@tdm.vn</a>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Danh mục sản phẩm</h3>
              <ul className="space-y-2 text-sm">
                {["Thiết bị vệ sinh", "Thiết bị bếp", "Thiết bị nước", "Phụ kiện nhà tắm"].map((item) => (
                  <li key={item}>
                    <Link href="/danh-muc/thiet-bi-ve-sinh" className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-red-500/60" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Chính sách</h3>
              <ul className="space-y-2 text-sm">
                {["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách giao hàng", "Chính sách bảo mật"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-red-500/60" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotlines */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Tổng đài hỗ trợ</h3>
              <div className="space-y-3">
                <div className="bg-[#2a2a2a] p-4 rounded">
                  <div className="text-xs text-gray-500 mb-1">Hotline tư vấn mua hàng</div>
                  <a href="tel:0933322232" className="text-xl font-bold text-red-500">0933.322.232</a>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded">
                  <div className="text-xs text-gray-500 mb-1">Bảo hành & Kỹ thuật</div>
                  <a href="tel:0933322232" className="text-xl font-bold text-red-500">0933.322.232</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#333] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} CÔNG TY TNHH THIẾT BỊ LONG THỊNH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Mobile Bottom Navigation ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around py-2 shadow-lg">
        <Link href="/" className={`flex flex-col items-center gap-0.5 px-3 py-1 ${isActive("/") ? "text-red-600" : "text-gray-500"}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Trang chủ</span>
        </Link>
        <Link href="/danh-muc/thiet-bi-ve-sinh" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-red-600">
          <Grid3X3 className="w-5 h-5" />
          <span className="text-[10px]">Danh mục</span>
        </Link>
        <Link href="/gio-hang" className={`flex flex-col items-center gap-0.5 px-3 py-1 relative ${isActive("/gio-hang") ? "text-red-600" : "text-gray-500"}`}>
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px] border-none rounded-full">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px]">Giỏ hàng</span>
        </Link>
      </div>

      {/* ===== FLOATING BUTTONS ===== */}
      <div className="fixed bottom-20 md:bottom-6 right-3 flex flex-col items-end gap-3 z-40">
        {/* Zalo */}
        <a
          href="https://zalo.me/0933322232"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2"
          title="Chat Zalo"
        >
          <span className="hidden group-hover:block bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            Chat Zalo
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-[#0068ff]">
            <svg viewBox="0 0 48 48" className="w-7 h-7" fill="white">
              <path d="M24 4C12.954 4 4 12.954 4 24c0 3.87 1.078 7.49 2.95 10.564L4 44l9.644-2.895A19.908 19.908 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4zm0 36a15.93 15.93 0 01-8.138-2.236l-.582-.348-6.04 1.815 1.772-5.882-.38-.604A15.928 15.928 0 018 24c0-8.822 7.178-16 16-16s16 7.178 16 16-7.178 16-16 16z"/>
              <path d="M33.64 27.84c-.46-.23-2.74-1.35-3.163-1.504-.422-.154-.73-.23-1.037.23-.307.46-1.19 1.504-1.46 1.81-.268.307-.537.346-1 .116-.46-.23-1.94-.716-3.697-2.283-1.365-1.22-2.285-2.728-2.554-3.188-.268-.46-.028-.71.202-.94.207-.206.46-.537.69-.806.23-.268.307-.46.46-.768.154-.307.077-.576-.038-.806-.116-.23-1.037-2.498-1.42-3.42-.376-.898-.754-.776-1.037-.79-.268-.012-.576-.016-.884-.016-.307 0-.806.115-1.228.576-.422.46-1.612 1.574-1.612 3.842s1.65 4.457 1.88 4.765c.23.307 3.25 4.96 7.872 6.958 1.1.474 1.96.758 2.63.97.1.03.198.06.295.087 1.073.32 2.05.275 2.823.166.86-.12 2.74-1.12 3.128-2.2.385-1.083.385-2.012.27-2.205-.116-.192-.422-.307-.883-.537z"/>
            </svg>
          </div>
        </a>

        {/* Hotline */}
        <a
          href="tel:0933322232"
          className="group flex items-center gap-2"
          title="Gọi điện"
        >
          <span className="hidden group-hover:block bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-200 whitespace-nowrap">
            0933.322.232
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-red-600 animate-pulse">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </a>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
