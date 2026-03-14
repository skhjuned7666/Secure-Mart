const STORAGE_KEY = "securemart_delivery_pincode";
const UPDATE_EVENT = "securemart_delivery_updated";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getDeliveryPincode(): string {
  if (!isBrowser()) return "110001";
  return window.localStorage.getItem(STORAGE_KEY) ?? "110001";
}

export function setDeliveryPincode(pincode: string): void {
  if (!isBrowser()) return;
  const trimmed = String(pincode).trim().slice(0, 10);
  window.localStorage.setItem(STORAGE_KEY, trimmed);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export const DELIVERY_UPDATE_EVENT = UPDATE_EVENT;
