/**
 * TDM.vn hotlink URLs under /image/cache/catalog/ without a size suffix
 * (e.g. -408x408) often return HTML instead of an image when loaded off-site.
 * The /image/catalog/ path works reliably for external embedding.
 */
export function normalizeTdmImageUrl(url: string | undefined | null): string {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("tdm.vn")) return url;

    if (parsed.pathname.includes("/image/cache/catalog/")) {
      if (/-\d+x\d+\.[a-z0-9]+$/i.test(parsed.pathname)) {
        return url;
      }
      parsed.pathname = parsed.pathname.replace("/image/cache/catalog/", "/image/catalog/");
      return parsed.toString();
    }

    return url;
  } catch {
    return url;
  }
}
