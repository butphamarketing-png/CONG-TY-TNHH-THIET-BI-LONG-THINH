import { Facebook, MessageCircle, MapPin, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const ICON_MAP = {
  facebook: { icon: Facebook, color: "bg-[#1877f2] hover:bg-[#166fe0]" },
  messenger: { icon: MessageCircle, color: "bg-[#0084ff] hover:bg-[#0078eb]" },
  maps: { icon: MapPin, color: "bg-[#ea4335] hover:bg-[#d93025]" },
  zalo: { icon: null, color: "bg-[#0068ff] hover:bg-[#005ce6]", textIcon: "Z" },
  website: { icon: Globe, color: "bg-orange-500 hover:bg-orange-600" },
} as const;

export function SocialLinksSection() {
  const cms = useSiteContent();
  const links = cms?.socialLinks?.length ? cms.socialLinks : [];

  if (!links.length) return null;

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
          {links.map((link) => {
            const meta = ICON_MAP[link.type as keyof typeof ICON_MAP] ?? ICON_MAP.website;
            const Icon = meta.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-2.5 w-[88px] md:w-[100px]"
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${meta.color} text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
                >
                  {"textIcon" in meta && meta.textIcon ? (
                    <span className="text-xl font-bold">{meta.textIcon}</span>
                  ) : Icon ? (
                    <Icon className="w-6 h-6" />
                  ) : null}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors text-center">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
