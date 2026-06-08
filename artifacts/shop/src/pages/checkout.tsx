import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/format";
import { useCreateOrder } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderInputPaymentMethod } from "@workspace/api-client-react";
import { ChevronRight } from "lucide-react";

export function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createOrder = useCreateOrder();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    note: "",
    paymentMethod: "cod" as OrderInputPaymentMethod
  });

  if (items.length === 0) {
    setLocation("/gio-hang");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc (*)",
        variant: "destructive"
      });
      return;
    }

    createOrder.mutate({
      data: {
        ...formData,
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          thumbnail: item.thumbnail
        }))
      }
    }, {
      onSuccess: (order) => {
        clearCart();
        setLocation(`/dat-hang/xac-nhan?code=${order.code}`);
      },
      onError: () => {
        toast({
          title: "Lỗi",
          description: "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Trang chủ</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Giỏ hàng</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Thanh toán</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Thanh toán đơn hàng</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input id="fullName" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email (để nhận hóa đơn)</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Địa chỉ nhận hàng *</Label>
                <Input id="address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="note">Ghi chú thêm</Label>
                <Textarea id="note" placeholder="Giao ngoài giờ hành chính..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Phương thức thanh toán</h2>
            <RadioGroup value={formData.paymentMethod} onValueChange={(v) => setFormData({...formData, paymentMethod: v as OrderInputPaymentMethod})} className="space-y-3">
              <div className="flex items-center space-x-3 border border-border p-4 rounded-lg cursor-pointer hover:border-primary">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-grow cursor-pointer font-medium">Thanh toán khi nhận hàng (COD)</Label>
              </div>
              <div className="flex items-center space-x-3 border border-border p-4 rounded-lg cursor-pointer hover:border-primary">
                <RadioGroupItem value="bank_transfer" id="bank" />
                <Label htmlFor="bank" className="flex-grow cursor-pointer font-medium">Chuyển khoản ngân hàng</Label>
              </div>
              <div className="flex items-center space-x-3 border border-border p-4 rounded-lg cursor-pointer hover:border-primary">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="flex-grow cursor-pointer font-medium">Ví MoMo</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-slate-50 p-6 rounded-xl border border-border sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-4">Đơn hàng ({items.length} sản phẩm)</h2>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border border-border rounded overflow-hidden shrink-0">
                      <img src={item.thumbnail || "https://placehold.co/100x100"} alt={item.productName} className="w-full h-full object-contain" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div className="flex-grow text-sm">
                    <div className="font-medium line-clamp-2">{item.productName}</div>
                    {item.variant && <div className="text-muted-foreground text-xs mt-1">{item.variant}</div>}
                    <div className="font-bold text-primary mt-1">{formatCurrency(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatCurrency(cartTotal())}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Phí giao hàng</span>
                <span>Miễn phí</span>
              </div>
              <div className="flex justify-between items-center font-bold text-xl pt-4 border-t border-border">
                <span>Tổng cộng</span>
                <span className="text-destructive">{formatCurrency(cartTotal())}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg" disabled={createOrder.isPending}>
              {createOrder.isPending ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
