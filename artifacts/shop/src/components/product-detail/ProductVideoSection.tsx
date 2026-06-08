function toEmbedUrl(url: string): string {
  if (url.includes("/embed/")) return url;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

interface ProductVideoSectionProps {
  videoUrl: string;
  title?: string;
}

export function ProductVideoSection({ videoUrl, title }: ProductVideoSectionProps) {
  const embedUrl = toEmbedUrl(videoUrl);

  return (
    <section className="mt-6">
      <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-orange-600 rounded" />
        Video giới thiệu sản phẩm
      </h3>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={title ?? "Video sản phẩm"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
