export type CartItem = {
  productId: string;
  quantity: number;
};

const STORAGE_KEY = "securemart_cart_v1";
const UPDATE_EVENT = "securemart_cart_updated";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCartItems(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        productId: String(item.productId),
        quantity: Number(item.quantity) || 0,
      }))
      .filter((item) => item.productId && item.quantity > 0);
  } catch {
    return [];
  }
}

function saveCartItems(items: CartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function addToCart(productId: string, quantity = 1): CartItem[] {
  if (!productId || quantity <= 0) return getCartItems();
  const items = getCartItems();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  saveCartItems(items);
  return items;
}

export function setCartQuantity(
  productId: string,
  quantity: number
): CartItem[] {
  if (!productId) return getCartItems();
  const items = getCartItems();
  const normalizedQty = Math.max(0, Math.floor(quantity));
  const existingIndex = items.findIndex((i) => i.productId === productId);

  if (existingIndex === -1 && normalizedQty > 0) {
    items.push({ productId, quantity: normalizedQty });
  } else if (existingIndex !== -1) {
    if (normalizedQty === 0) {
      items.splice(existingIndex, 1);
    } else {
      items[existingIndex].quantity = normalizedQty;
    }
  }

  saveCartItems(items);
  return items;
}

export function removeFromCart(productId: string): CartItem[] {
  if (!productId) return getCartItems();
  const items = getCartItems().filter((i) => i.productId !== productId);
  saveCartItems(items);
  return items;
}

export function clearCart(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function getCartCount(): number {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export const CART_UPDATE_EVENT = UPDATE_EVENT;

