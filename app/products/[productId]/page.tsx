import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProduct,
  getRelatedProducts,
  getFrequentlyBoughtTogether,
  getMoreFromBrand,
  getFeaturedProducts,
} from "@/app/lib/products";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ImageGallery from "@/app/components/ImageGallery";
import ProductInfo from "@/app/components/ProductInfo";
import BuyBox from "@/app/components/BuyBox";
import ProductTabs from "@/app/components/ProductTabs";
import ReviewList from "@/app/components/ReviewList";
import Carousel from "@/app/components/Carousel";
import ProductCard from "@/app/components/ProductCard";
import Section from "@/app/components/ui/Section";

type PageProps = { params: Promise<{ productId: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) notFound();

  const [
    relatedProducts,
    frequentlyBought,
    moreFromBrand,
    featuredProducts,
  ] = await Promise.all([
    getRelatedProducts(productId, 8),
    getFrequentlyBoughtTogether(productId),
    getMoreFromBrand(product.brand, productId, 6),
    getFeaturedProducts(6),
  ]);

  const frequentlyBoughtItems = frequentlyBought
    ? [
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          discount: product.discount,
          rating: product.rating,
          images: product.images,
          reviewsCount: product.reviewsCount,
        },
        ...frequentlyBought.suggested,
      ]
    : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <span className="mx-1">/</span>
            <Link href="/" className="hover:text-orange-600">
              {product.category ?? "Products"}
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-900 truncate max-w-[200px] inline-block align-bottom">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Section 1 — Product main area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:col-span-1">
            <ImageGallery images={product.images} alt={product.title} />
          </div>
          <div className="md:col-span-1">
            <ProductInfo product={product} />
          </div>
          <div className="md:col-span-1">
            <BuyBox product={product} />
          </div>
        </div>

        {/* Section 2 — Frequently Bought Together */}
        {frequentlyBought && frequentlyBoughtItems.length > 0 && (
          <div className="mt-8">
            <Carousel
              title="Frequently Bought Together"
              bundlePrice={frequentlyBought.bundlePrice}
            >
              {frequentlyBoughtItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  variant="compact"
                  showQuickAdd={false}
                />
              ))}
            </Carousel>
          </div>
        )}

        {/* Section 3 — Customers also viewed */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <Carousel title="Customers Also Viewed">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  variant="compact"
                  showQuickAdd={false}
                />
              ))}
            </Carousel>
          </div>
        )}

        {/* Section 4 — Featured / Advertisement */}
        {featuredProducts.length > 0 && (
          <div className="mt-8">
            <Carousel title="Featured Items" label="Sponsored">
              {featuredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  variant="compact"
                  showQuickAdd={false}
                />
              ))}
            </Carousel>
          </div>
        )}

        {/* Section 5 — Product information tabs */}
        <div className="mt-8">
          <ProductTabs product={product} />
        </div>

        {/* Section 6 — Related products grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <Section title="Related Products">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    showQuickAdd
                  />
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Section 7 — Customer reviews */}
        <div className="mt-8">
          <ReviewList
            id="reviews"
            productId={product.id}
            productRating={product.rating}
            productReviewsCount={product.reviewsCount}
          />
        </div>

        {/* Section 8 — More from brand */}
        {moreFromBrand.length > 0 && (
          <div className="mt-8">
            <Carousel title={`More from ${product.brand}`}>
              {moreFromBrand.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  variant="compact"
                  showQuickAdd={false}
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>

      {/* Section 9 — Footer */}
      <Footer />
    </main>
  );
}
