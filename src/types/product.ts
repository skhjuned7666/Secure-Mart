/**
 * Shared TypeScript types for products and related entities.
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  inStock?: boolean;
}
