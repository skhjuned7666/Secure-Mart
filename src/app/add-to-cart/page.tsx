"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  getFrequentlyBoughtTogether,
  getMoreFromBrand,
  getFeaturedProducts,
} from "@/lib/products";
import type { Product, ProductListItem } from "@/types/product";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import Price from "@/components/ui/Price";
import StarRating from "@/components/ui/StarRating";
import AddToCartGiftCheckbox from "@/components/add-to-cart/Added-Product/AddToCartGiftCheckbox";
import { getCartItems, type CartItem } from "@/lib/cartStorage";

type CartProduct = Product & { quantity: number };

type FrequentlyBoughtData = {
  main: Product;
  suggested: ProductListItem[];
  bundlePrice: number;
} | null;

export default function AddToCartPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [justAddedProduct, setJustAddedProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductListItem[]>([]);
  const [frequentlyBought, setFrequentlyBought] =
    useState<FrequentlyBoughtData>(null);
  const [moreFromBrand, setMoreFromBrand] = useState<ProductListItem[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>(
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      setLoading(true);

      const urlProductId = searchParams.get("productId");
      let lastAddedId: string | null = null;

      if (urlProductId) {
        lastAddedId = urlProductId;
      }

      const storedItems: CartItem[] = getCartItems();

      if (storedItems.length === 0) {
        if (!cancelled) {
          setCartProducts([]);
          setJustAddedProduct(null);
          setRelatedProducts([]);
          setFrequentlyBought(null);
          setMoreFromBrand([]);
          setFeaturedProducts([]);
          setLoading(false);
        }
        return;
      }

      const productPromises = storedItems.map((item) =>
        getProduct(item.productId)
      );
      const products = await Promise.all(productPromises);

      if (cancelled) return;

      const merged: CartProduct[] = [];
      products.forEach((p, index) => {
        if (p) {
          merged.push({ ...p, quantity: storedItems[index].quantity });
        }
      });

      setCartProducts(merged);

      const baseId = lastAddedId ?? merged[0]?.id;
      if (!baseId) {
        setLoading(false);
        return;
      }

      const baseProduct =
        merged.find((p) => p.id === baseId) ?? (await getProduct(baseId));
      if (!baseProduct || cancelled) {
        setLoading(false);
        return;
      }

      setJustAddedProduct(lastAddedId ? baseProduct : null);

      const [rel, freq, more, feat] = await Promise.all([
        getRelatedProducts(baseProduct.id, 8),
        getFrequentlyBoughtTogether(baseProduct.id),
        getMoreFromBrand(baseProduct.brand, baseProduct.id, 6),
        getFeaturedProducts(8),
      ]);

      if (cancelled) return;

      setRelatedProducts(rel);
      setFrequentlyBought(freq);
      setMoreFromBrand(more);
      setFeaturedProducts(feat);
      setLoading(false);
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const itemCount = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.quantity, 0),
    [cartProducts]
  );

  const subtotal = useMemo(
    () =>
      cartProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartProducts]
  );

  const baseProductForSections: Product | null =
    justAddedProduct ?? cartProducts[0] ?? null;

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* Optional just-added confirmation */}
        {justAddedProduct && (
          <section className="bg-white border border-green-200 rounded-xl p-3 sm:p-4 mb-4 flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 relative bg-gray-50 rounded-md overflow-hidden">
              <Image
                src={justAddedProduct.images[0] ?? ""}
                alt={justAddedProduct.title}
                fill
                className="object-contain p-1.5"
                sizes="40px"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-green-700 mb-0.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-sm font-semibold">
                  Added to cart
                </span>
              </div>
              <p className="text-sm text-gray-800 line-clamp-2">
                {justAddedProduct.title}
              </p>
            </div>
          </section>
        )}

        {/* Cart content */}
        <section className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>

          {loading && cartProducts.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
              Loading your cart...
            </div>
          )}

          {!loading && cartProducts.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Secure-Mart cart is empty
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Start adding items to see them here.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Continue shopping
              </Link>
            </div>
          )}

          {cartProducts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart items list */}
              <div className="lg:col-span-2 space-y-3">
                {cartProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4"
                  >
                    <div className="flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 relative bg-gray-50 rounded-md overflow-hidden">
                      <Image
                        src={item.images[0] ?? ""}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-sm sm:text-base font-semibold text-gray-900 hover:text-orange-600 line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          {item.brand && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.brand}
                            </p>
                          )}
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            In stock
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <Price
                            value={item.price * item.quantity}
                            size="md"
                            showSavings={false}
                          />
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <aside className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm sticky top-24">
                  <p className="text-sm text-gray-800 font-semibold mb-2">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </p>
                  <div className="mb-3">
                    <AddToCartGiftCheckbox />
                  </div>
                  <Link
                    href="/checkout"
                    className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-4 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg transition-all active:scale-[0.98] w-full text-center mb-2"
                  >
                    Proceed to buy
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-4 py-2.5 text-sm border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all active:scale-[0.98] w-full text-center"
                  >
                    Continue shopping
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </section>

        {/* Recommendation carousels */}
        {baseProductForSections && relatedProducts.length > 0 && (
          <div className="mb-6">
            <Carousel
              title={`Products related to ${
                baseProductForSections.title.length > 40
                  ? baseProductForSections.title.slice(0, 40) + "…"
                  : baseProductForSections.title
              }`}
            >
              {relatedProducts.map((item) => (
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

        {baseProductForSections &&
          frequentlyBought &&
          frequentlyBought.suggested.length > 0 && (
            <div className="mb-6">
              <Carousel
                title="Frequently bought together"
                bundlePrice={frequentlyBought.bundlePrice}
              >
                <ProductCard
                  product={{
                    id: baseProductForSections.id,
                    title: baseProductForSections.title,
                    brand: baseProductForSections.brand,
                    price: baseProductForSections.price,
                    discount: baseProductForSections.discount,
                    rating: baseProductForSections.rating,
                    images: baseProductForSections.images,
                    reviewsCount: baseProductForSections.reviewsCount,
                  }}
                  variant="compact"
                  showQuickAdd={false}
                />
                {frequentlyBought.suggested.map((item) => (
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

        {featuredProducts.length > 0 && (
          <div className="mb-6">
            <Carousel title="Featured items you may like" label="Sponsored">
              {featuredProducts.map((item) => (
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

        {moreFromBrand.length > 0 && baseProductForSections && (
          <div className="mb-6">
            <Carousel title={`More from ${baseProductForSections.brand}`}>
              {moreFromBrand.map((item) => (
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

        {relatedProducts.length > 0 && (
          <div className="mb-6">
            <Carousel title="Recommended based on your shopping trends">
              {relatedProducts.slice(0, 6).map((item) => (
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

        {/* See personalized recommendations CTA */}
        <div className="flex justify-center py-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 text-base bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg transition-all active:scale-[0.98]"
          >
            See personalized recommendations
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
