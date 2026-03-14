"use client";

type QuantitySelectorProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
};

export default function QuantitySelector({
  value,
  min = 1,
  max,
  onChange,
  label = "Quantity",
  className = "",
}: QuantitySelectorProps) {
  return (
    <div className={className}>
      {label && (
        <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full max-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
      >
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
