import { searchProducts } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const category = params.category ?? undefined;
  const products = await searchProducts(q, category);

  const categoryLabel = category ? decodeURIComponent(category) : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Search bar */}
        <div className="mb-6">
          <SearchBar
            defaultQuery={q}
            defaultCategory={categoryLabel ?? "All"}
            showSuggestions={true}
          />
        </div>

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {categoryLabel ? (
              <>Results in &quot;{categoryLabel}&quot;</>
            ) : q ? (
              <>Search results for &quot;{q}&quot;</>
            ) : (
              "All products"
            )}
          </h1>
          <p className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">No products found.</p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
