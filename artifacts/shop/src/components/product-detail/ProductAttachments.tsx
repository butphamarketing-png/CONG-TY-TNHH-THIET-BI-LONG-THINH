import type { ProductAttachment } from "@/types/product";
import { BookOpen, Download, FileText, Ruler, Wrench } from "lucide-react";

const TYPE_CONFIG: Record<
  ProductAttachment["type"],
  { label: string; icon: typeof FileText; color: string }
> = {
  pdf: { label: "Tài liệu PDF", icon: FileText, color: "text-red-600 bg-red-50" },
  catalog: { label: "Catalogue", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
  manual: { label: "Hướng dẫn lắp đặt", icon: Wrench, color: "text-emerald-600 bg-emerald-50" },
  spec: { label: "Bản vẽ kỹ thuật", icon: Ruler, color: "text-violet-600 bg-violet-50" },
  other: { label: "Tài liệu", icon: FileText, color: "text-gray-600 bg-gray-50" },
};

interface ProductAttachmentsProps {
  attachments: ProductAttachment[];
}

export function ProductAttachments({ attachments }: ProductAttachmentsProps) {
  if (attachments.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-orange-600 rounded" />
        Tài liệu kỹ thuật
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {attachments.map((att) => {
          const config = TYPE_CONFIG[att.type];
          const Icon = config.icon;
          return (
            <a
              key={att.id}
              href={att.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-sm transition-all group"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {att.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {config.label}
                  {att.sizeLabel ? ` · ${att.sizeLabel}` : ""}
                </p>
              </div>
              <Download className="w-4 h-4 text-gray-400 group-hover:text-orange-600 shrink-0" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
