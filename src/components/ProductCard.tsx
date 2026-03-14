"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import StarRating from "./ui/StarRating";
import Price from "./ui/Price";
import Button from "./ui/Button";
import type { ProductListItem } from "@/types/product";
import { addToCart } from "@/lib/cartStorage";

type ProductCardProps = {
  product: ProductListItem;
  variant?: "full" | "compact";
  showQuickAdd?: boolean;
};

export default function ProductCard({
  product,
  variant = "full",
  showQuickAdd = true,
}: ProductCardProps) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
     addToCart(product.id, 1);
    router.push(`/add-to-cart?productId=${product.id}`);
  };

  const isCompact = variant === "compact";
  const linkClass = isCompact
    ? "flex-shrink-0 w-[260px] block group"
    : "block group";
  const cardClass = isCompact
    ? "h-full hover:border-orange-200 hover:shadow-md transition-all"
    : "hover:border-orange-200 hover:shadow-lg transition-all";

  const cardContent = (
    <>
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.images[0] ?? ""}
          alt={product.title}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform"
          sizes={isCompact ? "260px" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
          unoptimized
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 z-10">
            <Badge variant="green">-{product.discount}%</Badge>
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <div className={isCompact ? "p-3" : "p-3"}>
        {!isCompact && (
          <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
        )}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <StarRating
            rating={product.rating}
            size="sm"
            variant="pill"
            showValue
            reviewCount={product.reviewsCount}
          />
        </div>
        <div className="mt-1">
          <Price
            value={product.price}
            size={isCompact ? "sm" : "md"}
            showSavings={false}
          />
        </div>
        {showQuickAdd && !isCompact && (
          <Button
            variant={addedToCart ? "success" : "primary"}
            size="sm"
            fullWidth
            leftIcon={<ShoppingCart size={14} />}
            onClick={handleCart}
            className="mt-2"
          >
            {addedToCart ? "Added" : "Add to Cart"}
          </Button>
        )}
      </div>
    </>
  );

  return (
    <Link href={`/products/${product.id}`} className={linkClass}>
      <Card className={cardClass}>{cardContent}</Card>
    </Link>
  );
}
