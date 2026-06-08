import type { ProductAttribute } from "@/types/product";

interface AttributeGroup {
  title: string;
  items: ProductAttribute[];
}

function groupAttributes(attributes: ProductAttribute[]): AttributeGroup[] {
  if (attributes.length === 0) return [];

  const warrantyKeys = ["bảo hành", "xuất xứ", "warranty", "origin"];
  const warranty: ProductAttribute[] = [];
  const specs: ProductAttribute[] = [];

  for (const attr of attributes) {
    const lower = attr.name.toLowerCase();
    if (warrantyKeys.some((k) => lower.includes(k))) {
      warranty.push(attr);
    } else {
      specs.push(attr);
    }
  }

  const groups: AttributeGroup[] = [];
  if (specs.length > 0) groups.push({ title: "Thông số kỹ thuật", items: specs });
  if (warranty.length > 0) groups.push({ title: "Bảo hành & xuất xứ", items: warranty });
  if (groups.length === 0) groups.push({ title: "Thông số kỹ thuật", items: attributes });

  return groups;
}

interface ProductSpecificationsProps {
  attributes: ProductAttribute[];
}

export function ProductSpecifications({ attributes }: ProductSpecificationsProps) {
  const groups = groupAttributes(attributes);

  if (groups.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-4">Đang cập nhật thông số kỹ thuật...</p>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
            {group.title}
          </h4>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <tbody>
              {group.items.map((attr, idx) => (
                <tr
                  key={`${attr.name}-${idx}`}
                  className={idx % 2 === 0 ? "bg-gray-50/80" : "bg-white"}
                >
                  <td className="py-3 px-4 w-[38%] font-medium text-gray-700 border-b border-gray-100 align-top">
                    {attr.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-b border-gray-100 align-top">
                    {attr.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
