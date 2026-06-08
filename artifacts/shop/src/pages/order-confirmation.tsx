import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export function OrderConfirmationPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (!code) {
    return <div className="p-8 text-center">Mã đơn hàng không hợp lệ</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-border shadow-sm max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Cảm ơn bạn đã mua sắm tại TDM Shop. Đơn hàng của bạn đã được tiếp nhận và đang trong quá trình xử lý.
        </p>

        <div className="bg-slate-50 border border-border rounded-xl p-6 mb-8 flex flex-col items-center">
          <div className="text-sm text-muted-foreground mb-1">Mã đơn hàng của bạn</div>
          <div className="text-3xl font-extrabold text-primary mb-4">{code}</div>
          <p className="text-sm">Bạn có thể sử dụng mã này để tra cứu trạng thái đơn hàng.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href={`/tra-cuu-don-hang?code=${code}`}>
              <Package className="mr-2 w-5 h-5" /> Tra cứu đơn hàng
            </Link>
          </Button>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">
              Tiếp tục mua sắm <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
