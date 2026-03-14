"use client";

import { useState } from "react";

export default function AddToCartGiftCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
      />
      <span className="text-sm text-gray-700">This order contains a gift</span>
    </label>
  );
}
