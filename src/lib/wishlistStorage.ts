const STORAGE_KEY = "securemart_wishlist_v1";
const UPDATE_EVENT = "securemart_wishlist_updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .map((v) => String(v))
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

function saveIds(ids: string[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function getWishlistIds(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeIds(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function isInWishlist(productId: string): boolean {
  if (!productId) return false;
  return getWishlistIds().includes(productId);
}

export function addToWishlist(productId: string): string[] {
  if (!productId || !isBrowser()) return getWishlistIds();
  const ids = getWishlistIds();
  if (!ids.includes(productId)) ids.push(productId);
  saveIds(ids);
  return ids;
}

export function removeFromWishlist(productId: string): string[] {
  if (!productId || !isBrowser()) return getWishlistIds();
  const ids = getWishlistIds().filter((id) => id !== productId);
  saveIds(ids);
  return ids;
}

export function toggleWishlist(productId: string): { ids: string[]; inWishlist: boolean } {
  if (!productId) return { ids: getWishlistIds(), inWishlist: false };
  const current = getWishlistIds();
  if (current.includes(productId)) {
    const ids = removeFromWishlist(productId);
    return { ids, inWishlist: false };
  }
  const ids = addToWishlist(productId);
  return { ids, inWishlist: true };
}

export function clearWishlist(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function getWishlistCount(): number {
  return getWishlistIds().length;
}

export const WISHLIST_UPDATE_EVENT = UPDATE_EVENT;

