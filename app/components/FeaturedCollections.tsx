"use client";
import { useState } from "react";
import { Star, Heart, ShoppingCart, ArrowRight, TrendingUp, Sparkles } from "lucide-react";

const bestSellers = [
  { id: 1, name: "Noise ColorFit Pro 5 Smart Watch", price: 2499, originalPrice: 4999, discount: 50, rating: 4.4, reviews: 89200, emoji: "⌚", badge: "#1 Bestseller" },
  { id: 2, name: "Himalaya Face Wash Neem 150ml", price: 149, originalPrice: 220, discount: 32, rating: 4.6, reviews: 245000, emoji: "🧴", badge: "Daily Essential" },
  { id: 3, name: "Casio Vintage A168 Watch", price: 1695, originalPrice: 2495, discount: 32, rating: 4.7, reviews: 56000, emoji: "🕰️", badge: "Classic Pick" },
  { id: 4, name: "Amul Butter 500g", price: 265, originalPrice: 295, discount: 10, rating: 4.8, reviews: 180000, emoji: "🧈", badge: "Fresh Daily" },
  { id: 5, name: "Philips Air Fryer HD9200", price: 5299, originalPrice: 7999, discount: 34, rating: 4.5, reviews: 42000, emoji: "🍟", badge: "Top Kitchen" },
  { id: 6, name: "Prestige Induction Cooktop", price: 1599, originalPrice: 2599, discount: 38, rating: 4.3, reviews: 67000, emoji: "🔥", badge: "Most Bought" },
];

const newArrivals = [
  { id: 7, name: "OnePlus 12R 5G 8GB 256GB", price: 29999, originalPrice: 34999, discount: 14, rating: 4.6, reviews: 12400, emoji: "📲", badge: "Just Launched" },
  { id: 8, name: "Zara Floral Maxi Dress", price: 2990, originalPrice: 4990, discount: 40, rating: 4.4, reviews: 3200, emoji: "👗", badge: "New Season" },
  { id: 9, name: "boAt Rockerz 550 Headphones", price: 1299, originalPrice: 3990, discount: 67, rating: 4.2, reviews: 94000, emoji: "🎧", badge: "New Model" },
  { id: 10, name: "Himalayan Serenity Yoga Mat", price: 1499, originalPrice: 2499, discount: 40, rating: 4.7, reviews: 8700, emoji: "🧘", badge: "New Launch" },
  { id: 11, name: "JBL Flip 6 Bluetooth Speaker", price: 8999, originalPrice: 14999, discount: 40, rating: 4.8, reviews: 31000, emoji: "🔊", badge: "Fresh Arrival" },
  { id: 12, name: "Adidas Ultraboost 23 Running", price: 11999, originalPrice: 18999, discount: 37, rating: 4.6, reviews: 7800, emoji: "👟", badge: "New Design" },
];

type Product = typeof bestSellers[0];

function MiniProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 cursor-pointer">
      {/* Emoji Thumbnail */}
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
        {product.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-orange-500 font-bold mb-0.5">{product.badge}</div>
        <div className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
          {product.name}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
            {product.rating} <Star size={9} fill="white" />
          </div>
          <span className="text-xs text-gray-400">({(product.reviews / 1000).toFixed(0)}K)</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-sm font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="text-xs text-green-600 font-bold">{product.discount}% off</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
            ${wishlisted ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"}`}
        >
          <Heart size={13} fill={wishlisted ? "white" : "none"} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
            ${added ? "bg-green-500 border-green-500 text-white" : "border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500"}`}
        >
          <ShoppingCart size={13} />
        </button>
      </div>
    </div>
  );
}

export default function FeaturedCollections() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Best Sellers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-orange-500 to-red-500">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-white" />
                <div>
                  <h2 className="text-white font-black text-lg leading-none">Best Sellers</h2>
                  <p className="text-orange-100 text-xs mt-0.5">Most loved by customers</p>
                </div>
              </div>
              <a href="#" className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-semibold transition-colors group">
                View All <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Products */}
            <div className="p-3 divide-y divide-gray-50">
              {bestSellers.map((product) => (
                <MiniProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="px-5 pb-4">
              <button className="w-full py-3 rounded-xl border-2 border-orange-400 text-orange-500 font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
                See All Best Sellers →
              </button>
            </div>
          </div>

          {/* New Arrivals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-600 to-purple-600">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-white" />
                <div>
                  <h2 className="text-white font-black text-lg leading-none">New Arrivals</h2>
                  <p className="text-violet-200 text-xs mt-0.5">Fresh drops just for you</p>
                </div>
              </div>
              <a href="#" className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-semibold transition-colors group">
                View All <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Products */}
            <div className="p-3 divide-y divide-gray-50">
              {newArrivals.map((product) => (
                <MiniProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="px-5 pb-4">
              <button className="w-full py-3 rounded-xl border-2 border-violet-400 text-violet-600 font-bold text-sm hover:bg-violet-600 hover:text-white transition-all">
                Explore New Arrivals →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              title: "Under ₹999",
              sub: "Budget picks, big value",
              emoji: "💰",
              gradient: "from-yellow-400 to-orange-500",
              cta: "Shop Now",
            },
            {
              title: "Premium Brands",
              sub: "Apple, Samsung, Nike & more",
              emoji: "👑",
              gradient: "from-slate-700 to-slate-900",
              cta: "Explore",
            },
            {
              title: "EMI Offers",
              sub: "No cost EMI on 6000+ products",
              emoji: "💳",
              gradient: "from-emerald-500 to-teal-600",
              cta: "Check Offers",
            },
          ].map((banner, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${banner.gradient} rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all`}
            >
              <span className="text-4xl">{banner.emoji}</span>
              <div className="flex-1">
                <div className="text-white font-black text-lg">{banner.title}</div>
                <div className="text-white/70 text-xs">{banner.sub}</div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border border-white/20">
                {banner.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
