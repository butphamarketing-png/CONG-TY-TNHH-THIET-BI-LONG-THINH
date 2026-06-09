import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cần tư vấn mua hàng?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Đội ngũ chuyên viên của LONG THỊNH sẵn sàng hỗ trợ bạn 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:0906752821"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors"
            >
              <Phone className="w-6 h-6" />
              0906 752 821
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat ngay
            </Button>
          </div>
          <p className="text-orange-200 text-sm mt-6">
            CÔNG TY TNHH THIẾT BỊ LONG THỊNH — MST: 0311528071-001
          </p>
        </div>
      </div>
    </section>
  );
}
