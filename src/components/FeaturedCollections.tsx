"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bestSellers = [
  { id: 1, name: "Noise ColorFit Pro 5 Smart Watch", price: 2499, originalPrice: 4999, discount: 50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 2, name: "Himalaya Face Wash Neem 150ml", price: 149, originalPrice: 220, discount: 32, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80" },
  { id: 3, name: "Casio Vintage A168 Watch", price: 1695, originalPrice: 2495, discount: 32, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80" },
  { id: 4, name: "Amul Butter 500g", price: 265, originalPrice: 295, discount: 10, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80" },
  { id: 5, name: "Philips Air Fryer HD9200", price: 5299, originalPrice: 7999, discount: 34, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: 6, name: "Prestige Induction Cooktop", price: 1599, originalPrice: 2599, discount: 38, image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80" },
];

const newArrivals = [
  { id: 7, name: "OnePlus 12R 5G 8GB 256GB", price: 29999, originalPrice: 34999, discount: 14, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { id: 8, name: "Zara Floral Maxi Dress", price: 2990, originalPrice: 4990, discount: 40, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
  { id: 9, name: "boAt Rockerz 550 Headphones", price: 1299, originalPrice: 3990, discount: 67, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 10, name: "Himalayan Serenity Yoga Mat", price: 1499, originalPrice: 2499, discount: 40, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80" },
  { id: 11, name: "JBL Flip 6 Bluetooth Speaker", price: 8999, originalPrice: 14999, discount: 40, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 12, name: "Adidas Ultraboost 23 Running", price: 11999, originalPrice: 18999, discount: 37, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
];

type Product = typeof bestSellers[0];

function CarouselCard({ product, href }: { product: Product; href: string }) {
  // #region agent log
  const onImageError = () => {
    fetch("http://127.0.0.1:7829/ingest/2658adbd-c9d9-415f-ae4e-c0a45eccac3f", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "73cb72" },
      body: JSON.stringify({
        sessionId: "73cb72",
        location: "FeaturedCollections.tsx:CarouselCard",
        message: "Image load failed",
        data: { productId: product.id, productName: product.name, src: product.image?.slice(0, 60) },
        timestamp: Date.now(),
        hypothesisId: "H1",
      }),
    }).catch(() => {});
  };
  // #endregion
  return (
    <Link href={href} className="group flex-shrink-0 w-[160px] sm:w-[180px] block">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          sizes="(max-width: 640px) 160px, 180px"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={onImageError}
        />
      </div>
      <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
        {product.name}
      </p>
      <p className="text-sm font-bold text-gray-900 mt-0.5">₹{product.price.toLocaleString("en-IN")}</p>
    </Link>
  );
}

function CarouselSection({
  title,
  subtitle,
  pipeText,
  products,
  seeAllHref,
}: {
  title: string;
  subtitle: string;
  pipeText: string;
  products: Product[];
  seeAllHref: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = 200;
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden">
      {/* Header - image 2 style: bold black text + See all on right */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5">
        <h2 className="text-gray-900 font-bold text-base sm:text-lg">
          {title} | {subtitle} | {pipeText}
        </h2>
        <Link
          href={seeAllHref}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap ml-2"
        >
          See all
        </Link>
      </div>

      {/* Horizontal carousel with arrows */}
      <div className="relative">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all -ml-2"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all -mr-2"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-4 py-4 pb-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <CarouselCard key={product.id} product={product} href={`/products/${product.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedCollections() {
  return (
    <section className="py-10 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          <CarouselSection
            title="Best Sellers"
            subtitle="Most loved by customers"
            pipeText="Secure-Mart"
            products={bestSellers}
            seeAllHref="/search?category=Best Sellers"
          />
          <CarouselSection
            title="New Arrivals"
            subtitle="Fresh drops just for you"
            pipeText="Secure-Mart"
            products={newArrivals}
            seeAllHref="/search?category=New Arrivals"
          />
        </div>
      </div>
    </section>
  );
}
