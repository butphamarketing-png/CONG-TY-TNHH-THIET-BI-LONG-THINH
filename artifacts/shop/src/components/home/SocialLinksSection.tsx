import { Facebook, MessageCircle, MapPin, Globe } from "lucide-react";

const LINKS = [
  {
    id: "fanpage",
    label: "Fanpage",
    href: "https://www.facebook.com/tdm.vn",
    icon: Facebook,
    color: "bg-[#1877f2] hover:bg-[#166fe0]",
  },
  {
    id: "messenger",
    label: "Messenger",
    href: "https://m.me/tdm.vn",
    icon: MessageCircle,
    color: "bg-[#0084ff] hover:bg-[#0078eb]",
  },
  {
    id: "maps",
    label: "Google Maps",
    href: "https://maps.google.com/?q=504+Nguyễn+Văn+Quá,+TP+Hồ+Chí+Minh",
    icon: MapPin,
    color: "bg-[#ea4335] hover:bg-[#d93025]",
  },
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/0906752821",
    icon: null,
    color: "bg-[#0068ff] hover:bg-[#005ce6]",
    textIcon: "Z",
  },
  {
    id: "website",
    label: "Website",
    href: "https://longthinh.vn",
    icon: Globe,
    color: "bg-orange-500 hover:bg-orange-600",
  },
] as const;

export function SocialLinksSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-10 md:py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            Liên kết mạng xã hội
          </h2>
          <p className="text-sm text-gray-500 mt-2">Kết nối với LONG THỊNH mọi lúc, mọi nơi</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col items-center gap-2.5 w-[88px] md:w-[100px]`}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${link.color} text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
              >
                {"textIcon" in link && link.textIcon ? (
                  <span className="text-xl font-bold">{link.textIcon}</span>
                ) : link.icon ? (
                  <link.icon className="w-6 h-6" />
                ) : null}
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors text-center">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
