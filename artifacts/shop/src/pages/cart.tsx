import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag } from "lucide-react";

export function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-muted-foreground mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
        <Button size="lg" className="w-full rounded-full" asChild>
          <Link href="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/">Trang chủ</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Giỏ hàng</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-4">
          {items.map((item, idx) => (
            <div key={`${item.productId}-${item.variant || 'none'}-${idx}`} className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-border">
                <img src={item.thumbnail || "https://placehold.co/100x100"} alt={item.productName} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/san-pham/${item.productSlug}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-2">
                    {item.productName}
                  </Link>
                  {item.variant && <div className="text-sm text-muted-foreground mt-1">Phân loại: {item.variant}</div>}
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="text-lg font-bold text-destructive">{formatCurrency(item.price)}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-md bg-white">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variant)} className="h-8 w-8 rounded-none"><Minus className="w-3 h-3" /></Button>
                      <div className="w-10 text-center font-medium text-sm">{item.quantity}</div>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)} className="h-8 w-8 rounded-none"><Plus className="w-3 h-3" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => removeItem(item.productId, item.variant)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-4">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatCurrency(cartTotal())}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Giảm giá</span>
                <span>0 ₫</span>
              </div>
              <div className="flex justify-between text-muted-foreground border-b border-border pb-4">
                <span>Phí giao hàng</span>
                <span>Miễn phí</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg pt-2">
                <span>Tổng cộng</span>
                <span className="text-destructive text-2xl">{formatCurrency(cartTotal())}</span>
              </div>
              <div className="text-xs text-right text-muted-foreground">(Đã bao gồm VAT)</div>
            </div>

            <Button size="lg" className="w-full rounded-full h-12 text-base" onClick={() => setLocation("/dat-hang")}>
              Tiến hành đặt hàng
            </Button>
            
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
