import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-700/20 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Cần tư vấn mua hàng?
          </h2>
          <p className="text-orange-100 text-lg mb-10 font-medium">
            Đội ngũ chuyên viên của LONG THỊNH sẵn sàng hỗ trợ bạn 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="tel:0906752821"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <Phone className="w-6 h-6" />
              0906 752 821
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat ngay
            </Button>
          </div>
          <p className="text-orange-200 text-sm mt-8 font-medium">
            CÔNG TY TNHH THIẾT BỊ LONG THỊNH — MST: 0311528071-001
          </p>
        </div>
      </div>
    </section>
  );
}
