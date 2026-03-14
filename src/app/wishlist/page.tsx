"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import { getProduct, getFeaturedProducts } from "@/lib/products";
import type { Product, ProductListItem } from "@/types/product";
import { getWishlistIds, WISHLIST_UPDATE_EVENT } from "@/lib/wishlistStorage";

function toListItem(product: Product): ProductListItem {
  return {
    id: product.id,
    title: product.title,
    brand: product.brand,
    price: product.price,
    discount: product.discount,
    rating: product.rating,
    images: product.images,
    reviewsCount: product.reviewsCount,
  };
}

export default function WishlistPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [featured, setFeatured] = useState<ProductListItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const ids = getWishlistIds();

      const products = await Promise.all(ids.map((id) => getProduct(id)));
      if (cancelled) return;

      const list = products.filter(Boolean).map((p) => toListItem(p as Product));
      setItems(list);

      const feat = await getFeaturedProducts(8);
      if (cancelled) return;
      setFeatured(feat);

      setLoading(false);
    }

    load();

    function handleWishlistUpdate() {
      load();
    }

    window.addEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      cancelled = true;
      window.removeEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Wishlist
          </h1>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>

        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
            Loading your wishlist...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <Heart size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Your wishlist is empty
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Tap the heart icon on products to save them here.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Continue shopping
            </Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
              {items.map((p) => (
                <div key={p.id} className="h-full">
                  <ProductCard product={p} variant="compact" showQuickAdd />
                </div>
              ))}
            </div>
          </div>
        )}

        {featured.length > 0 && (
          <div className="mt-8">
            <Carousel title="You might also like" label="Recommended">
              {featured.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  variant="compact"
                  showQuickAdd
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

