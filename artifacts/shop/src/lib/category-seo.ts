import type { CategorySeoContent } from "@/types/catalog";

/**
 * TDM-style SEO content blocks per category slug.
 * Phase A: seed content for key categories; expandable via CMS later.
 */
export const CATEGORY_SEO: Record<string, CategorySeoContent> = {
  "thiet-bi-ve-sinh": {
    title: "Đại lý mua bán thiết bị vệ sinh cao cấp cho nội thất phòng tắm giá rẻ",
    metaDescription: "Thiết bị vệ sinh chính hãng TOTO, INAX, Caesar, Viglacera — giao hàng nội thành, lắp đặt đúng chuẩn.",
    html: `<h2>Thiết bị vệ sinh là gì?</h2>
<p>Thiết bị nhà vệ sinh là những dụng cụ trang thiết bị trong phòng vệ sinh gồm sứ vệ sinh, sen vòi bằng kim loại được lắp đặt trong nhà vệ sinh hoặc phòng tắm.</p>
<h2>Thiết bị vệ sinh hãng nào tốt?</h2>
<p>TOTO, INAX, Caesar, Viglacera, American Standard là các hãng được đánh giá cao về chất lượng và thiết kế sản phẩm.</p>`,
  },
  "bon-cau-1-khoi": {
    title: "Bồn cầu 1 khối - Bệ xí bệt bàn cầu liền một khối giá rẻ",
    metaDescription: "Bồn cầu 1 khối TOTO, INAX, Viglacera, Caesar chính hãng — bán chạy, hoàn tiền, giao hàng nhanh.",
    html: `<h2>Sản phẩm bồn cầu 1 khối là gì?</h2>
<p>Cấu tạo bồn cầu liền khối là thân cầu và két nước dính liền tạo thành một khối. Về thẩm mỹ thì thường bồn cầu 1 khối có kích thước lớn, đồ sộ và đẹp hơn so với khối rời.</p>
<h2>Có nên mua dùng bồn cầu liền khối?</h2>
<p>Theo các đánh giá và nhu cầu khách hàng thì nên dùng bồn cầu nguyên khối. Các hãng cao cấp thường áp dụng công nghệ chống bám bẩn tiên tiến trên dòng này.</p>`,
    priceTableHtml: `<table><thead><tr><th>STT</th><th>Sản phẩm</th><th>Mức giá</th></tr></thead>
<tbody>
<tr><td>1</td><td>Bồn cầu 1 khối TOTO</td><td>7.000.000đ đến 25.000.000 VNĐ</td></tr>
<tr><td>2</td><td>Bồn cầu 1 khối INAX</td><td>4.300.000đ đến 13.000.000 VNĐ</td></tr>
<tr><td>3</td><td>Bồn cầu 1 khối Viglacera</td><td>1.700.000đ đến 12.000.000 VNĐ</td></tr>
</tbody></table>`,
  },
  "bon-cau": {
    title: "Bồn cầu chính hãng TOTO, INAX, Viglacera giá tốt",
    metaDescription: "Danh mục bồn cầu 1 khối, 2 khối, thông minh, treo tường — chính hãng, bảo hành hãng.",
    html: `<p>Danh mục bồn cầu đầy đủ các dòng sản phẩm từ bình dân đến cao cấp của TOTO, INAX, Caesar, Viglacera, American Standard.</p>`,
  },
};

export function getCategorySeo(slug: string): CategorySeoContent | undefined {
  return CATEGORY_SEO[slug];
}
