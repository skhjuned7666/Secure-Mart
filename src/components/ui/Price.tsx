"use client";

type PriceProps = {
  value: number;
  originalValue?: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-3xl",
};

export default function Price({
  value,
  originalValue,
  discount,
  size = "md",
  showSavings = true,
  className = "",
}: PriceProps) {
  const savings = originalValue != null && originalValue > value
    ? Math.round(originalValue - value)
    : 0;

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`font-bold text-gray-900 ${sizeStyles[size]}`}>
        ₹{value.toLocaleString("en-IN")}
      </span>
      {originalValue != null && originalValue > value && (
        <span className="text-sm text-gray-500 line-through">
          ₹{originalValue.toLocaleString("en-IN")}
        </span>
      )}
      {discount != null && discount > 0 && (
        <span className="text-sm font-semibold text-green-600">{discount}% off</span>
      )}
      {showSavings && savings > 0 && (
        <span className="text-sm text-gray-500">Save ₹{savings.toLocaleString("en-IN")}</span>
      )}
    </div>
  );
}
