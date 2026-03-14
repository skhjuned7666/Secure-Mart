"use client";

import Tabs from "./ui/Tabs";
import type { Product } from "@/types/product";

type ProductTabsProps = { product: Product };

export default function ProductTabs({ product }: ProductTabsProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "additional", label: "Additional Information" },
  ];

  return (
    <Tabs tabs={tabs}>
      {(activeId) => {
        if (activeId === "description")
          return (
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
            </div>
          );
        if (activeId === "specifications")
          return (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr
                      key={key}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-gray-600 align-top w-1/3">
                        {key}
                      </td>
                      <td className="py-2.5 text-gray-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        if (activeId === "additional")
          return (
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Brand:</span>{" "}
                {product.brand}
              </p>
              {product.category && (
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  {product.category}
                </p>
              )}
              <p>
                <span className="font-medium text-gray-900">SKU:</span> SM-
                {product.id}
              </p>
              <p>
                <span className="font-medium text-gray-900">Return policy:</span>{" "}
                7 days returnable. Refund or replacement as per Secure-Mart
                policy.
              </p>
            </div>
          );
        return null;
      }}
    </Tabs>
  );
}
