"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Star, ShoppingCart, Eye, Zap, ArrowRight, Flame } from "lucide-react";
import { addToCart } from "@/lib/cartStorage";
import {
  isInWishlist,
  toggleWishlist,
  WISHLIST_UPDATE_EVENT,
} from "@/lib/wishlistStorage";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    category: "Smartphones",
    price: 79999,
    originalPrice: 134999,
    discount: 41,
    rating: 4.7,
    reviews: 12840,
    badge: "TRENDING",
    badgeColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    tags: ["5G", "200MP Camera"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Apple MacBook Air M3 Chip",
    brand: "Apple",
    category: "Laptops",
    price: 99900,
    originalPrice: 114900,
    discount: 13,
    rating: 4.9,
    reviews: 8730,
    badge: "BESTSELLER",
    badgeColor: "bg-green-500",
    image: "https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617?w=600&auto=format&fit=crop&q=60",
    tags: ["M3 Chip", "18hr Battery"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "Audio",
    price: 19990,
    originalPrice: 34990,
    discount: 43,
    rating: 4.8,
    reviews: 23100,
    badge: "HOT DEAL",
    badgeColor: "bg-red-500",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    tags: ["ANC", "30hr Battery"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Nike Air Max 270 Sneakers",
    brand: "Nike",
    category: "Footwear",
    price: 7995,
    originalPrice: 12995,
    discount: 38,
    rating: 4.5,
    reviews: 9200,
    badge: "NEW",
    badgeColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    tags: ["Air Cushion", "Lightweight"],
    freeDelivery: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Instant Pot Duo 7-in-1 Cooker",
    brand: "Instant Pot",
    category: "Kitchen",
    price: 6499,
    originalPrice: 9999,
    discount: 35,
    rating: 4.6,
    reviews: 31500,
    badge: "BESTSELLER",
    badgeColor: "bg-green-500",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    tags: ["7-in-1", "6L Capacity"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    category: "Home",
    price: 44900,
    originalPrice: 64900,
    discount: 31,
    rating: 4.8,
    reviews: 5400,
    badge: "PREMIUM",
    badgeColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80",
    tags: ["HEPA Filter", "60min Battery"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 7,
    name: "Canon EOS R50 Mirrorless Camera",
    brand: "Canon",
    category: "Cameras",
    price: 52990,
    originalPrice: 74990,
    discount: 29,
    rating: 4.7,
    reviews: 3800,
    badge: "TOP RATED",
    badgeColor: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    tags: ["24.2MP", "4K Video"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 8,
    name: "boAt Airdopes 141 TWS Earbuds",
    brand: "boAt",
    category: "Audio",
    price: 999,
    originalPrice: 2990,
    discount: 67,
    rating: 4.3,
    reviews: 148200,
    badge: "FLASH DEAL",
    badgeColor: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&q=80",
    tags: ["42hr Playtime", "IPX4"],
    freeDelivery: false,
    inStock: true,
  },
  {
    id: 9,
    name: "Samsung 32\" FHD Smart Monitor",
    brand: "Samsung",
    category: "Electronics",
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.6,
    reviews: 6200,
    badge: "NEW",
    badgeColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    tags: ["Smart TV", "USB-C"],
    freeDelivery: true,
    inStock: true,
  },
  {
    id: 10,
    name: "Adidas Ultraboost 22 Running Shoes",
    brand: "Adidas",
    category: "Footwear",
    price: 12999,
    originalPrice: 16999,
    discount: 24,
    rating: 4.7,
    reviews: 8400,
    badge: "TRENDING",
    badgeColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    tags: ["Boost", "Primeknit"],
    freeDelivery: true,
    inStock: true,
  },
];

const productIdStr = (p: { id: number }) => String(p.id);

function ProductCard({ product }: { product: typeof products[0] }) {
  const router = useRouter();
  const id = productIdStr(product);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(id));
    const handleWishlistUpdate = () => setWishlisted(isInWishlist(id));
    window.addEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);
    return () => {
      window.removeEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, [id]);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    addToCart(id, 1);
    setTimeout(() => setAddedToCart(false), 1800);
    router.push(`/add-to-cart?productId=${id}`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleWishlist(id);
    setWishlisted(result.inWishlist);
  };

  return (
    <Link
      href={`/products/${id}`}
      className="block group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden relative h-full flex flex-col"
    >
      {/* Badge */}
      <div className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-xs font-black px-2 py-0.5 rounded-full tracking-wide`}>
        {product.badge}
      </div>

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm
          ${wishlisted ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-400 border border-gray-200"}`}
      >
        <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image - consistent frame with object-contain */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={12} /> Quick View
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
          -{product.discount}%
        </div>
      </div>

      {/* Product Info - fixed min-height for consistent card height */}
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <div className="text-xs text-gray-400 font-medium mb-1">{product.brand} · {product.category}</div>
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* Tags - max 2, fixed height */}
        <div className="flex flex-wrap gap-1 mb-2 min-h-[1.75rem]">
          {product.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium truncate max-w-[calc(50%-4px)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded shrink-0">
            <span>{product.rating}</span>
            <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-400 truncate">({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2 flex-wrap">
          <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          <span className="text-xs font-bold text-green-600">Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}</span>
        </div>

        {/* Delivery - always show same-height line for consistency */}
        <div className="text-xs text-gray-500 mb-3 min-h-[1.25rem] flex items-center">
          {product.freeDelivery ? (
            <span className="text-green-500 font-semibold">✓ Free Delivery</span>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>

        {/* Add to Cart - always at bottom */}
        <button
          type="button"
          onClick={handleCart}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shrink-0
            ${addedToCart
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg"
            }`}
        >
          {addedToCart ? (
            <><span>✓</span> Added to Cart!</>
          ) : (
            <><ShoppingCart size={15} /> Add to Cart</>
          )}
        </button>
      </div>
    </Link>
  );
}

const INITIAL_VISIBLE = 8;
const LOAD_MORE_COUNT = 2;

export default function TrendingProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const filters = ["All", "Electronics", "Fashion", "Home", "Audio", "Sports"];

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section id="product-cards" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-400 rounded-full" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Flame size={28} className="text-orange-500 flex-shrink-0" />
              Hot Products
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all
                  ${activeFilter === f
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All - click shows 2 more cards */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, products.length))}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold rounded-xl hover:from-orange-600 hover:to-yellow-500 transition-all hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            disabled={!hasMore}
          >
            <Zap size={16} />
            {hasMore ? "View All Trending Products" : "All products shown"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
