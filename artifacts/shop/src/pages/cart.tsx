import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag, Tag, Gift } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const COUPONS: Record<string, { label: string; discount: number; type: "percent" | "fixed" }> = {
  "TDMSHOP10": { label: "Giảm 10%", discount: 10, type: "percent" },
  "LONGTHINHVIP": { label: "Giảm 200.000đ", discount: 200000, type: "fixed" },
  "FREESHIP": { label: "Miễn phí giao hàng", discount: 0, type: "fixed" },
  "GIAMGIA15": { label: "Giảm 15%", discount: 15, type: "percent" },
};

export function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      toast({
        title: "Áp dụng mã giảm giá thành công!",
        description: `${COUPONS[code].label} đã được áp dụng.`,
      });
    } else {
      toast({
        title: "Mã không hợp lệ",
        description: "Mã giảm giá không tồn tại hoặc đã hết hạn.",
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    toast({ title: "Đã xóa mã giảm giá" });
  };

  const getDiscount = () => {
    if (!appliedCoupon || !COUPONS[appliedCoupon]) return 0;
    const coupon = COUPONS[appliedCoupon];
    if (coupon.type === "percent") return Math.round((cartTotal() * coupon.discount) / 100);
    return coupon.discount;
  };

  const discount = getDiscount();
  const finalTotal = Math.max(0, cartTotal() - discount);

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

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Giỏ hàng của bạn
        <span className="ml-2 text-lg font-normal text-muted-foreground">({items.length} sản phẩm)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="w-full lg:w-2/3 space-y-4">
          {items.map((item, idx) => (
            <div key={`${item.productId}-${item.variant || 'none'}-${idx}`} className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-4">
              <Link href={`/san-pham/${item.productSlug}`} className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-border hover:border-primary/40 transition-colors">
                <img src={item.thumbnail || "https://placehold.co/100x100"} alt={item.productName} className="w-full h-full object-contain p-1" />
              </Link>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/san-pham/${item.productSlug}`} className="font-bold text-base hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.productName}
                  </Link>
                  {item.variant && <div className="text-sm text-muted-foreground mt-1 bg-slate-50 inline-block px-2 py-0.5 rounded">Phân loại: {item.variant}</div>}
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="text-lg font-bold text-destructive">{formatCurrency(item.price)}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg bg-white shadow-sm">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variant)} className="h-9 w-9 rounded-none rounded-l-lg"><Minus className="w-3 h-3" /></Button>
                      <div className="w-10 text-center font-bold text-sm">{item.quantity}</div>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)} className="h-9 w-9 rounded-none rounded-r-lg"><Plus className="w-3 h-3" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-9 w-9 rounded-full hover:bg-red-50" onClick={() => removeItem(item.productId, item.variant)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon input */}
          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              Mã giảm giá
            </h3>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span className="font-mono font-bold text-green-700">{appliedCoupon}</span>
                  <span className="text-sm text-green-600">— {COUPONS[appliedCoupon]?.label}</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline font-medium">Xóa</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập mã giảm giá (VD: TDMSHOP10)"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                  className="flex-grow uppercase font-mono"
                />
                <Button onClick={applyCoupon} variant="outline" className="rounded-lg border-primary text-primary hover:bg-primary hover:text-white shrink-0">
                  Áp dụng
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">Thử: TDMSHOP10, LONGTHINHVIP, FREESHIP</p>
          </div>
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatCurrency(cartTotal())}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Giảm giá ({appliedCoupon})
                  </span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground border-b border-border pb-4">
                <span>Phí giao hàng</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg pt-2">
                <span>Tổng cộng</span>
                <span className="text-destructive text-2xl">{formatCurrency(finalTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="text-xs text-right text-green-600 font-medium">
                  🎉 Bạn đang tiết kiệm {formatCurrency(discount)}!
                </div>
              )}
              <div className="text-xs text-right text-muted-foreground">(Đã bao gồm VAT)</div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-full h-12 text-base font-semibold"
              onClick={() => setLocation("/dat-hang")}
            >
              Tiến hành đặt hàng
            </Button>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Tiếp tục mua sắm
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-5 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
              {[
                { icon: "🔒", text: "Thanh toán bảo mật" },
                { icon: "🔄", text: "Đổi trả 30 ngày" },
                { icon: "🚚", text: "Giao hàng miễn phí" },
              ].map((t, i) => (
                <div key={i} className="text-xs text-muted-foreground">
                  <div className="text-xl mb-1">{t.icon}</div>
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
