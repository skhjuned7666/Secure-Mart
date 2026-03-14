<<<<<<< HEAD
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
=======
export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  variants: string[];
  stock: number;
  brand: string;
  specifications: Record<string, string>;
  /** Bullet point features */
  features?: string[];
  /** Variant type labels e.g. Color, Size */
  variantLabels?: Record<string, string[]>;
  /** Delivery estimate text */
  deliveryEstimate?: string;
  category?: string;
  /** Original price before discount */
  originalPrice?: number;
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  images?: string[];
  createdAt: string;
  helpfulCount: number;
};

export type ProductListItem = Pick<
  Product,
  "id" | "title" | "brand" | "price" | "discount" | "rating" | "images"
> & { reviewsCount: number };
>>>>>>> 17e6cd4d44f3f2bca007a407e6ab0c8e00f6d84a
