"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  /** For summary style (e.g. green pill) */
  variant?: "stars" | "pill";
  className?: string;
};

const sizeMap = { sm: 10, md: 14, lg: 18 };

export default function StarRating({
  rating,
  size = "md",
  showValue = false,
  reviewCount,
  variant = "stars",
  className = "",
}: StarRatingProps) {
  const iconSize = sizeMap[size];
  const rounded = Math.round(rating);

  if (variant === "pill") {
    return (
      <div
        className={`inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded ${className}`}
      >
        {showValue && <span>{rating}</span>}
        <Star size={iconSize} fill="currentColor" />
        {reviewCount != null && (
          <span className="opacity-90">({reviewCount.toLocaleString("en-IN")})</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={iconSize}
          className={
            i <= rounded
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200"
          }
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      )}
      {reviewCount != null && (
        <span className="ml-1 text-sm text-gray-500">({reviewCount.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
