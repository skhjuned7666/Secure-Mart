export type Address = {
  id: string;
  fullName: string;
  mobile: string;
  country: string;
  pincode: string;
  flat: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  isDefault?: boolean;
};

export function formatAddressLine(a: Address): string {
  const parts = [a.flat, a.area].filter(Boolean);
  return parts.length ? parts.join(", ") : "";
}

export function formatAddressFull(a: Address): string {
  const line1 = [a.flat, a.area].filter(Boolean).join(", ");
  const line2 = [a.city, a.state, a.pincode, a.country].filter(Boolean).join(", ");
  return [line1, line2].filter(Boolean).join(" — ");
}
