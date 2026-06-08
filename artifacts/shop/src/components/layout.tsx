import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Search, ShoppingCart, Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useListCategories, useGetSearchSuggestions } from "@workspace/api-client-react";
import { useDebounce } from "@/hooks/use-debounce";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { items } = useCart();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const { data: categories } = useListCategories();
  
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: suggestions } = useGetSearchSuggestions({ q: debouncedSearch }, { query: { enabled: debouncedSearch.length > 2 } });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/tim-kiem?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 text-xs hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: 0123 456 789</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>support@tdmshop.vn</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tra-cuu-don-hang" className="hover:text-accent transition-colors">Tra cứu đơn hàng</Link>
            <Link href="/tin-tuc" className="hover:text-accent transition-colors">Tin tức</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
                <span className="font-bold text-lg">Danh mục</span>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-60px)]">
                {categories?.map(cat => (
                  <div key={cat.id} className="border-b border-border">
                    <Link href={`/danh-muc/${cat.slug}`} className="block p-4 font-medium hover:bg-muted">
                      {cat.name}
                    </Link>
                    {cat.children?.map(child => (
                      <Link key={child.id} href={`/danh-muc/${child.slug}`} className="block p-3 pl-8 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">TDM<span className="text-destructive">Shop</span></span>
          </Link>

          {/* Search */}
          <div className="flex-grow max-w-2xl hidden md:block relative">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                placeholder="Tìm kiếm sản phẩm, danh mục..." 
                className="w-full pr-10 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full rounded-r-full text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </Button>
            </form>
            {suggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-background border border-border rounded-md shadow-lg z-50 overflow-hidden">
                {suggestions.map((sug, idx) => (
                  <Link 
                    key={idx} 
                    href={sug.type === 'category' ? `/danh-muc/${sug.slug}` : `/san-pham/${sug.slug}`}
                    className="flex items-center p-3 hover:bg-muted cursor-pointer border-b border-border last:border-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <Search className="w-4 h-4 mr-3 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{sug.label}</div>
                      <div className="text-xs text-muted-foreground capitalize">{sug.type === 'category' ? 'Danh mục' : 'Sản phẩm'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="flex items-center gap-4">
            <Link href="/gio-hang" className="relative p-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-white border-none min-w-[20px] h-[20px] flex items-center justify-center p-0 text-[10px]">
                    {cartItemCount}
                  </Badge>
                )}
              </div>
              <span className="hidden lg:block font-medium">Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Bar (Desktop) */}
      <nav className="bg-primary/5 border-b border-border hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8">
            <li className="relative group">
              <div className="flex items-center gap-1 py-3 font-semibold text-primary cursor-pointer">
                <Menu className="w-5 h-5" />
                Danh mục sản phẩm
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <div className="absolute top-full left-0 w-[250px] bg-background border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {categories?.slice(0, 10).map(cat => (
                  <div key={cat.id} className="group/item relative border-b border-border last:border-0">
                    <Link href={`/danh-muc/${cat.slug}`} className="flex items-center justify-between p-3 hover:bg-muted hover:text-primary">
                      {cat.name}
                      {cat.children && cat.children.length > 0 && <ChevronDown className="w-4 h-4 -rotate-90" />}
                    </Link>
                    {cat.children && cat.children.length > 0 && (
                      <div className="absolute top-0 left-full w-[250px] min-h-full bg-background border border-border shadow-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all">
                        {cat.children.map(child => (
                          <Link key={child.id} href={`/danh-muc/${child.slug}`} className="block p-3 hover:bg-muted hover:text-primary border-b border-border last:border-0">
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>
            <li><Link href="/" className="font-medium hover:text-primary py-3 block">Trang chủ</Link></li>
            <li><Link href="/tin-tuc" className="font-medium hover:text-primary py-3 block">Khuyến mãi</Link></li>
            <li><Link href="/tin-tuc" className="font-medium hover:text-primary py-3 block">Tin công nghệ</Link></li>
            <li><Link href="/tra-cuu-don-hang" className="font-medium hover:text-primary py-3 block">Tra cứu đơn hàng</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-extrabold text-white mb-6">TDM<span className="text-destructive">Shop</span></div>
              <p className="text-sm mb-4 leading-relaxed">
                Hệ thống bán lẻ điện thoại, máy tính, phụ kiện chính hãng uy tín tại Việt Nam. 
                Cam kết giá tốt nhất, dịch vụ bảo hành chu đáo.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">0123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">support@tdmshop.vn</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Chính sách</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách đổi trả</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách giao hàng</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Hướng dẫn mua trả góp</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Hỗ trợ khách hàng</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Gửi yêu cầu bảo hành</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Góp ý, khiếu nại</Link></li>
                <li><Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức công nghệ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Tổng đài hỗ trợ</h3>
              <div className="bg-slate-800 p-4 rounded-lg mb-4">
                <div className="text-sm text-slate-400 mb-1">Gọi mua hàng (8h00 - 22h00)</div>
                <div className="text-xl font-bold text-white">1800.xxxx</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Bảo hành & Khiếu nại</div>
                <div className="text-xl font-bold text-white">1800.yyyy</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} TDM Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">FB</div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">ZL</div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">TT</div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">YT</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 flex justify-around p-2 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Trang chủ</span>
        </Link>
        <Link href="/danh-muc/all" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Danh mục</span>
        </Link>
        <Link href="/gio-hang" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary relative">
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-1" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px] border-none">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px]">Giỏ hàng</span>
        </Link>
      </div>
    </div>
  );
}
