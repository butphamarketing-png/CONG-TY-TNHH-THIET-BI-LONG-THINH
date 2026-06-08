import { useState } from "react";
import { getGetOrderQueryKey, useGetOrder } from "@workspace/api-client-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Package, CheckCircle, Truck, XCircle } from "lucide-react";

export function OrderLookupPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialCode = searchParams.get("code") || "";
  
  const [code, setCode] = useState(initialCode);
  const [searchCode, setSearchCode] = useState(initialCode);
  
  const { data: order, isLoading, isError } = useGetOrder(searchCode, {
    query: { enabled: !!searchCode, queryKey: getGetOrderQueryKey(searchCode) }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setSearchCode(code.trim().toUpperCase());
      window.history.pushState({}, '', `?code=${code.trim().toUpperCase()}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge className="bg-amber-500 hover:bg-amber-600">Chờ xử lý</Badge>;
      case 'processing': return <Badge className="bg-blue-500 hover:bg-blue-600">Đang chuẩn bị hàng</Badge>;
      case 'shipping': return <Badge className="bg-indigo-500 hover:bg-indigo-600">Đang giao hàng</Badge>;
      case 'completed': return <Badge className="bg-green-500 hover:bg-green-600">Đã giao thành công</Badge>;
      case 'cancelled': return <Badge variant="destructive">Đã hủy</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="w-8 h-8 text-amber-500" />;
      case 'completed': return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'cancelled': return <XCircle className="w-8 h-8 text-destructive" />;
      default: return <Truck className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Tra cứu đơn hàng</h1>
        <p className="text-muted-foreground">Nhập mã đơn hàng của bạn để kiểm tra tình trạng xử lý và vận chuyển.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-xl mx-auto">
          <div className="flex-grow space-y-2">
            <Label htmlFor="code" className="sr-only">Mã đơn hàng</Label>
            <Input 
              id="code" 
              placeholder="VD: ORD-123456" 
              value={code} 
              onChange={e => setCode(e.target.value)}
              className="h-12 text-lg uppercase"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8 rounded-lg">
            <Search className="w-5 h-5 mr-2" /> Tra cứu
          </Button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tìm kiếm thông tin đơn hàng...</p>
        </div>
      )}

      {isError && searchCode && !isLoading && (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center">
          <p className="font-medium">Không tìm thấy đơn hàng mang mã "{searchCode}"</p>
          <p className="text-sm mt-1 opacity-80">Vui lòng kiểm tra lại mã đơn hàng và thử lại.</p>
        </div>
      )}

      {order && !isLoading && (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-slate-50 p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {getStatusIcon(order.status)}
              <div>
                <div className="font-bold text-xl text-primary">{order.code}</div>
                <div className="text-sm text-muted-foreground">Đặt ngày: {formatDate(order.createdAt)}</div>
              </div>
            </div>
            <div>
              {getStatusBadge(order.status)}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wider text-muted-foreground mb-4">Thông tin người nhận</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Họ tên:</span> {order.fullName}</p>
                  <p><span className="font-medium">SĐT:</span> {order.phone}</p>
                  {order.email && <p><span className="font-medium">Email:</span> {order.email}</p>}
                  <p><span className="font-medium">Địa chỉ:</span> {order.address}</p>
                  {order.note && <p><span className="font-medium">Ghi chú:</span> {order.note}</p>}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wider text-muted-foreground mb-4">Thanh toán</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Phương thức:</span> <span className="uppercase">{order.paymentMethod || "COD"}</span></p>
                  <p><span className="font-medium">Tình trạng:</span> {order.status === 'completed' ? <span className="text-green-600 font-medium">Đã thanh toán</span> : <span className="text-amber-600 font-medium">Chưa thanh toán</span>}</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold uppercase text-sm tracking-wider text-muted-foreground mb-4 border-t border-border pt-6">Chi tiết sản phẩm</h3>
            <div className="space-y-4 mb-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border border-border p-4 rounded-lg">
                  <div className="w-16 h-16 bg-slate-50 rounded border border-border shrink-0 p-1">
                    <img src={item.thumbnail || "https://placehold.co/100x100"} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{item.productName}</div>
                    {item.variant && <div className="text-sm text-muted-foreground">{item.variant}</div>}
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(item.price)}</div>
                    <div className="text-sm text-muted-foreground">x {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-border pt-6">
              <div className="w-full sm:w-64 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Phí giao hàng</span>
                  <span>0 ₫</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-primary pt-2 border-t border-border">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
