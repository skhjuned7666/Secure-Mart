/**
 * Shared TypeScript types for products and related entities.
 */

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
