import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import {
  Search, ShoppingCart, Menu, Phone, Mail, MapPin,
  ChevronDown, ChevronRight, Heart, ArrowUp, X,
  MessageCircle, Home, Grid3X3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useListCategories, useGetSearchSuggestions } from "@workspace/api-client-react";
import { useDebounce } from "@/hooks/use-debounce";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { items } = useCart();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const { data: categories } = useListCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: suggestions } = useGetSearchSuggestions(
    { q: debouncedSearch },
    { query: { enabled: debouncedSearch.length > 1 } }
  );

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
      setShowSuggestions(false);
      setMobileSearchOpen(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-gray-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 text-xs hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:19001234" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-primary" />
              <span>Hotline: <strong className="text-white">1900.1234</strong> (Miễn phí)</span>
            </a>
            <a href="mailto:support@tdmshop.vn" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-primary" />
              <span>support@tdmshop.vn</span>
            </a>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-primary" />
              <span>Hệ thống 30+ cửa hàng toàn quốc</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link>
            <span className="text-slate-600">|</span>
            <Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link>
            <span className="text-slate-600">|</span>
            <Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3 md:gap-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden shrink-0">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
              <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between">
                <span className="font-bold text-xl">TDM<span className="text-red-300">Shop</span></span>
                <SheetClose asChild>
                  <button className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </SheetClose>
              </div>
              <div className="overflow-y-auto flex-1 pb-4">
                <div className="px-4 py-3 bg-primary/5 text-xs font-semibold text-primary uppercase tracking-wider">
                  Danh mục sản phẩm
                </div>
                {categories?.map((cat) => (
                  <div key={cat.id} className="border-b border-border/50">
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-3 font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <span>{cat.name}</span>
                      {cat.children && cat.children.length > 0 && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    {cat.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={`/danh-muc/${child.slug}`}
                        className="flex items-center pl-8 pr-4 py-2.5 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary border-t border-border/30 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 shrink-0" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="mt-4 px-4 space-y-2">
                  <Link href="/tin-tuc" className="block py-2.5 px-4 bg-primary/5 rounded-lg text-sm font-medium hover:bg-primary/10">Tin tức</Link>
                  <Link href="/tra-cuu-don-hang" className="block py-2.5 px-4 bg-primary/5 rounded-lg text-sm font-medium hover:bg-primary/10">Tra cứu đơn hàng</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-primary">TDM</span>
              <span className="text-destructive">Shop</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="flex-grow max-w-2xl hidden md:block relative">
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full pr-12 rounded-full border-2 border-primary/20 focus-visible:border-primary focus-visible:ring-0 h-11 text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 p-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border bg-gray-50">
                  Gợi ý tìm kiếm
                </div>
                {suggestions.map((sug, idx) => (
                  <Link
                    key={idx}
                    href={sug.type === "category" ? `/danh-muc/${sug.slug}` : `/san-pham/${sug.slug}`}
                    className="flex items-center p-3 hover:bg-primary/5 cursor-pointer border-b border-border/50 last:border-0 transition-colors"
                    onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
                  >
                    <Search className="w-4 h-4 mr-3 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium">{sug.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {sug.type === "category" ? "Danh mục" : "Sản phẩm"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/yeu-thich" className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              <span className="hidden lg:block">Yêu thích</span>
            </Link>

            {/* Hotline */}
            <a href="tel:19001234" className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm border-l border-border">
              <Phone className="w-5 h-5 text-primary" />
              <div className="leading-tight">
                <div className="text-[10px] text-muted-foreground">Hotline</div>
                <div className="font-bold text-sm">1900.1234</div>
              </div>
            </a>

            {/* Cart */}
            <Link
              href="/gio-hang"
              className="relative flex items-center gap-2 px-3 py-2 ml-1 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-primary" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-white border-2 border-white min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[9px] font-bold">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </Badge>
                )}
              </div>
              <div className="hidden lg:block leading-tight">
                <div className="text-[10px] text-muted-foreground">Giỏ hàng</div>
                <div className="font-bold text-sm text-primary">{cartItemCount} sản phẩm</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 border-t border-border bg-white">
            <form onSubmit={handleSearch} className="flex gap-2 pt-3">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                autoFocus
                className="flex-1 h-10 text-sm rounded-full border-2 border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" className="rounded-full px-4">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-0">
            {/* Category Mega Menu */}
            <li className="relative group">
              <div className="flex items-center gap-2 px-4 py-3 font-semibold cursor-pointer hover:bg-white/10 transition-colors border-r border-white/20">
                <Menu className="w-4 h-4" />
                <span>Danh mục sản phẩm</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </div>
              {/* Mega dropdown */}
              <div className="absolute top-full left-0 w-[220px] bg-white text-foreground border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {categories?.slice(0, 10).map((cat) => (
                  <div key={cat.id} className="group/sub relative border-b border-border/50 last:border-0">
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-primary/5 hover:text-primary text-sm transition-colors"
                    >
                      <span>{cat.name}</span>
                      {cat.children && cat.children.length > 0 && (
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </Link>
                    {cat.children && cat.children.length > 0 && (
                      <div className="absolute top-0 left-full w-[200px] bg-white border border-border shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all">
                        {cat.children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/danh-muc/${child.slug}`}
                            className="block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary border-b border-border/50 last:border-0 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>

            <li>
              <Link href="/" className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors ${isActive("/") ? "bg-white/15" : ""}`}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/dien-thoai" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Điện thoại
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/laptop" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Laptop
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/may-tinh-bang" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Máy tính bảng
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Khuyến mãi
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Tin công nghệ
              </Link>
            </li>
            <li>
              <Link href="/tra-cuu-don-hang" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Tra cứu đơn hàng
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 mt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Company */}
            <div>
              <div className="text-2xl font-extrabold text-white mb-1">
                TDM<span className="text-red-400">Shop</span>
              </div>
              <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider">CÔNG TY TNHH THIẾT BỊ LONG THỊNH</div>
              <p className="text-sm mb-5 leading-relaxed text-slate-400">
                Hệ thống bán lẻ điện thoại, laptop, máy tính bảng và phụ kiện chính hãng uy tín tại TP. Hồ Chí Minh.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12, TP. Hồ Chí Minh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:19001234" className="hover:text-white transition-colors">1900.1234 (Miễn phí - 8h-22h)</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:support@tdmshop.vn" className="hover:text-white transition-colors">support@tdmshop.vn</a>
                </div>
              </div>
              {/* Social */}
              <div className="flex items-center gap-3 mt-5">
                {["FB", "ZL", "YT", "TT"].map((s) => (
                  <a key={s} href="#" className="w-9 h-9 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center text-xs font-bold transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Chính sách</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách giao hàng", "Chính sách bảo mật", "Mua trả góp 0%"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-primary/60" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {[
                  { label: "Tra cứu đơn hàng", href: "/tra-cuu-don-hang" },
                  { label: "Gửi yêu cầu bảo hành", href: "#" },
                  { label: "Góp ý, khiếu nại", href: "#" },
                  { label: "Tin tức công nghệ", href: "/tin-tuc" },
                  { label: "Tuyển dụng", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-primary/60" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotlines */}
            <div>
              <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Tổng đài hỗ trợ</h3>
              <div className="space-y-3">
                <div className="bg-slate-800 hover:bg-slate-700 transition-colors p-4 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Gọi mua hàng (8h - 22h)</div>
                  <a href="tel:19001234" className="text-xl font-bold text-white hover:text-primary transition-colors">1900.1234</a>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 transition-colors p-4 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Bảo hành & Khiếu nại</div>
                  <a href="tel:19001235" className="text-xl font-bold text-white hover:text-primary transition-colors">1900.1235</a>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg text-xs text-slate-400">
                  🏆 Đã được kiểm định bởi Bộ Công Thương
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} CÔNG TY TNHH THIẾT BỊ LONG THỊNH. MST: 0312345678 do Sở KH&ĐT TP.HCM cấp.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {["Visa", "MasterCard", "Momo", "ZaloPay", "VNPay"].map((pm) => (
                <div key={pm} className="bg-white text-slate-700 text-[10px] font-bold px-2 py-1 rounded">
                  {pm}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 flex justify-around py-2 shadow-lg">
        <Link href="/" className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Trang chủ</span>
        </Link>
        <Link href="/danh-muc/dien-thoai" className="flex flex-col items-center gap-0.5 px-3 py-1 text-muted-foreground hover:text-primary">
          <Grid3X3 className="w-5 h-5" />
          <span className="text-[10px]">Danh mục</span>
        </Link>
        <Link href="/tim-kiem" className="flex flex-col items-center gap-0.5 px-3 py-1 text-muted-foreground hover:text-primary">
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Tìm kiếm</span>
        </Link>
        <Link href="/gio-hang" className={`flex flex-col items-center gap-0.5 px-3 py-1 relative ${isActive("/gio-hang") ? "text-primary" : "text-muted-foreground"}`}>
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px] border-none">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px]">Giỏ hàng</span>
        </Link>
      </div>

      {/* ===== FLOATING BUTTONS ===== */}
      <div className="fixed bottom-20 md:bottom-8 right-4 flex flex-col items-end gap-3 z-40">
        {/* Zalo */}
        <a
          href="https://zalo.me/0123456789"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2"
          title="Chat Zalo"
        >
          <span className="hidden group-hover:block bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-border whitespace-nowrap animate-in slide-in-from-right-2">
            Chat Zalo
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-[#0068ff]">
            <svg viewBox="0 0 48 48" className="w-7 h-7" fill="white">
              <path d="M24 4C12.954 4 4 12.954 4 24c0 3.87 1.078 7.49 2.95 10.564L4 44l9.644-2.895A19.908 19.908 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4zm0 36a15.93 15.93 0 01-8.138-2.236l-.582-.348-6.04 1.815 1.772-5.882-.38-.604A15.928 15.928 0 018 24c0-8.822 7.178-16 16-16s16 7.178 16 16-7.178 16-16 16z"/>
              <path d="M33.64 27.84c-.46-.23-2.74-1.35-3.163-1.504-.422-.154-.73-.23-1.037.23-.307.46-1.19 1.504-1.46 1.81-.268.307-.537.346-1 .116-.46-.23-1.94-.716-3.697-2.283-1.365-1.22-2.285-2.728-2.554-3.188-.268-.46-.028-.71.202-.94.207-.206.46-.537.69-.806.23-.268.307-.46.46-.768.154-.307.077-.576-.038-.806-.116-.23-1.037-2.498-1.42-3.42-.376-.898-.754-.776-1.037-.79-.268-.012-.576-.016-.884-.016-.307 0-.806.115-1.228.576-.422.46-1.612 1.574-1.612 3.842s1.65 4.457 1.88 4.765c.23.307 3.25 4.96 7.872 6.958 1.1.474 1.96.758 2.63.97.1.03.198.06.295.087 1.073.32 2.05.275 2.823.166.86-.12 2.74-1.12 3.128-2.2.385-1.083.385-2.012.27-2.205-.116-.192-.422-.307-.883-.537z"/>
            </svg>
          </div>
        </a>

        {/* Messenger */}
        <a
          href="https://m.me/tdmshop"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2"
          title="Chat Messenger"
        >
          <span className="hidden group-hover:block bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-border whitespace-nowrap animate-in slide-in-from-right-2">
            Messenger
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-gradient-to-br from-[#00B2FF] to-[#006AFF]">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </a>

        {/* Hotline */}
        <a
          href="tel:19001234"
          className="group flex items-center gap-2"
          title="Gọi điện"
        >
          <span className="hidden group-hover:block bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-border whitespace-nowrap animate-in slide-in-from-right-2">
            1900.1234
          </span>
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-green-500 animate-[pulse_2s_ease-in-out_infinite]">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </a>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
