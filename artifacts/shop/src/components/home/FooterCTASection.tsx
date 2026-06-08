import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterCTASection() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cần tư vấn? Liên hệ ngay với chúng tôi
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Đội ngũ chuyên viên của TDM Tuấn Đức luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              028.2244.8333
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              Gửi email
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center text-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>6 Showroom toàn quốc</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Hỗ trợ 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Phản hồi nhanh chóng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
