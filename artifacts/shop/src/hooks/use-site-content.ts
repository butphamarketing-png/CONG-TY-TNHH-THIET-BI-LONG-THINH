import { useEffect, useState } from "react";
import { loadSiteContent, type SiteContent } from "@/lib/site-content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    loadSiteContent().then(setContent);
  }, []);

  return content;
}
