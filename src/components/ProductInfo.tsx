"use client";

import { Truck } from "lucide-react";
import StarRating from "./ui/StarRating";
import Price from "./ui/Price";
import type { Product } from "@/types/product";

type ProductInfoProps = { product: Product };

export default function ProductInfo({ product }: ProductInfoProps) {
  const originalPrice =
    product.originalPrice ??
    product.price * (100 / (100 - (product.discount || 0)));

  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {product.title}
      </h1>
      {product.brand && (
        <p className="text-sm text-gray-600">
          Brand: <span className="font-semibold text-gray-900">{product.brand}</span>
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <StarRating
          rating={product.rating}
          variant="pill"
          showValue
          reviewCount={product.reviewsCount}
        />
        <a href="#reviews" className="text-sm text-blue-600 hover:underline">
          {product.reviewsCount.toLocaleString("en-IN")} ratings
        </a>
      </div>
      <Price
        value={product.price}
        originalValue={originalPrice}
        discount={product.discount}
        size="lg"
      />
      <p className="text-sm">
        {product.stock > 10 ? (
          <span className="text-green-600 font-medium">In Stock</span>
        ) : product.stock > 0 ? (
          <span className="text-orange-600 font-medium">
            Only {product.stock} left
          </span>
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </p>
      {product.variantLabels &&
        Object.keys(product.variantLabels).length > 0 && (
          <div className="space-y-3">
            {Object.entries(product.variantLabels).map(([label, options]) => (
              <div key={label}>
                <p className="text-sm font-medium text-gray-700 mb-1.5">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      {product.deliveryEstimate && (
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Truck size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <span>{product.deliveryEstimate}</span>
        </div>
      )}
      {product.features && product.features.length > 0 && (
        <ul className="space-y-1.5 text-sm text-gray-700 border-t border-gray-200 pt-4">
          {product.features.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-green-500">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
        {product.description}
      </p>
    </div>
  );
}
