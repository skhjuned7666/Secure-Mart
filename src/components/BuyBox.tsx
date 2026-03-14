"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, Lock } from "lucide-react";
import Price from "./ui/Price";
import QuantitySelector from "./ui/QuantitySelector";
import Button from "./ui/Button";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { addToCart } from "@/lib/cartStorage";
import { isInWishlist, toggleWishlist, WISHLIST_UPDATE_EVENT } from "@/lib/wishlistStorage";

type BuyBoxProps = {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => void;
  onBuyNow?: (productId: string, quantity: number) => void;
};

export default function BuyBox({ product, onAddToCart, onBuyNow }: BuyBoxProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(product.id));

    function handleWishlistUpdate() {
      setWishlisted(isInWishlist(product.id));
    }

    window.addEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);
    return () => {
      window.removeEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, [product.id]);

  const originalPrice =
    product.originalPrice ??
    product.price * (100 / (100 - (product.discount || 0)));
  const maxQty = Math.min(product.stock, 10);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      addToCart(product.id, quantity);
      setAddedToCart(true);
      router.push(`/add-to-cart?productId=${product.id}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-24">
      <div className="space-y-4">
        <Price
          value={product.price}
          originalValue={originalPrice}
          discount={product.discount}
          size="md"
        />
        {product.deliveryEstimate && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Truck size={16} className="text-gray-500" />
            <span>{product.deliveryEstimate}</span>
          </div>
        )}
        <p className="text-sm">
          {product.stock > 10 ? (
            <span className="text-green-600 font-medium">In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-orange-600 font-medium">
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-red-600 font-medium">Out of Stock</span>
          )}
        </p>
        <QuantitySelector
          value={quantity}
          max={maxQty}
          onChange={setQuantity}
        />
        <div className="space-y-2">
          <Button
            variant={addedToCart ? "success" : "primary"}
            size="lg"
            fullWidth
            leftIcon={<ShoppingCart size={18} />}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => onBuyNow?.(product.id, quantity)}
            disabled={product.stock === 0}
            className="!bg-yellow-400 !text-gray-900 hover:!bg-yellow-500 !border !border-yellow-500"
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<Heart size={18} fill={wishlisted ? "currentColor" : "none"} />}
            onClick={() => setWishlisted(toggleWishlist(product.id).inWishlist)}
            className={wishlisted ? "!border-red-300 !bg-red-50 !text-red-600" : ""}
          >
            {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
          </Button>
        </div>
        <p className="flex items-center gap-2 text-xs text-gray-500">
          <Lock size={12} />
          Secure transaction. Your payment information is protected.
        </p>
      </div>
    </div>
  );
}
