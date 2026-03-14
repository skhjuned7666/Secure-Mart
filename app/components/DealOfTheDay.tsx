"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Star, Zap, Clock } from "lucide-react";

const deals = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max 256GB",
    brand: "Apple",
    originalPrice: 159900,
    dealPrice: 119999,
    discount: 25,
    rating: 4.9,
    reviews: 42000,
    sold: 89,
    stock: 120,
    emoji: "📱",
    color: "from-slate-900 to-slate-700",
    accentColor: "from-blue-500 to-cyan-400",
    tags: ["A17 Pro Chip", "Titanium Build", "48MP Camera"],
  },
  {
    id: 2,
    name: "LG OLED evo 4K 55\" Smart TV",
    brand: "LG",
    originalPrice: 149990,
    dealPrice: 87999,
    discount: 41,
    rating: 4.8,
    reviews: 18500,
    sold: 73,
    stock: 100,
    emoji: "📺",
    color: "from-purple-900 to-purple-700",
    accentColor: "from-purple-500 to-pink-400",
    tags: ["OLED Display", "Dolby Vision", "WebOS"],
  },
  {
    id: 3,
    name: "DJI Air 3 Drone Combo",
    brand: "DJI",
    originalPrice: 94990,
    dealPrice: 69999,
    discount: 26,
    rating: 4.7,
    reviews: 7800,
    sold: 62,
    stock: 80,
    emoji: "🚁",
    color: "from-gray-900 to-gray-700",
    accentColor: "from-green-500 to-emerald-400",
    tags: ["4K/60fps", "46min Flight", "Obstacle Avoidance"],
  },
];

function useCountdown(targetHours = 5) {
  const [timeLeft, setTimeLeft] = useState({
    hours: targetHours,
    minutes: 43,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-gray-900 font-black text-2xl sm:text-3xl w-14 sm:w-16 h-12 sm:h-14 flex items-center justify-center rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
        <span className="relative z-10">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="text-gray-300 text-xs mt-1 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

function DealCard({ deal }: { deal: typeof deals[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const soldPercent = Math.round((deal.sold / deal.stock) * 100);

  return (
    <div className={`bg-gradient-to-br ${deal.color} rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl border border-white/10`}>
      {/* Image Area */}
      <div className="relative p-8 flex items-center justify-center h-48 overflow-hidden">
        {/* Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${deal.accentColor} opacity-10 group-hover:opacity-20 transition-opacity`} />
        <span className="text-8xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
          {deal.emoji}
        </span>
        {/* Discount Badge */}
        <div className={`absolute top-4 right-4 bg-gradient-to-r ${deal.accentColor} text-white text-sm font-black px-3 py-1 rounded-full shadow-lg`}>
          -{deal.discount}%
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center transition-all
            ${wishlisted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}
        >
          <Heart size={15} fill={wishlisted ? "white" : "none"} />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-5 pb-5">
        <div className="text-white/50 text-xs mb-1 font-medium">{deal.brand}</div>
        <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-3 line-clamp-2">
          {deal.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {deal.tags.map((tag, i) => (
            <span key={i} className="text-xs text-white/70 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
            <Star size={10} fill="currentColor" />
            {deal.rating}
          </div>
          <span className="text-white/50 text-xs">({deal.reviews.toLocaleString('en-IN')} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className={`text-xl sm:text-2xl font-black bg-gradient-to-r ${deal.accentColor} bg-clip-text text-transparent`}>
            ₹{deal.dealPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-white/40 text-sm line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
        </div>

        {/* Stock Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>Sold: {deal.sold}%</span>
            <span>Only {deal.stock - deal.sold} left!</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${deal.accentColor} rounded-full transition-all`}
              style={{ width: `${soldPercent}%` }}
            />
          </div>
        </div>

        {/* Add to Cart */}
        <button className={`w-full bg-gradient-to-r ${deal.accentColor} text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg`}>
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function DealOfTheDay() {
  const timeLeft = useCountdown(5);

  return (
    <section className="py-14 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap size={20} className="text-yellow-400" />
            <span className="text-yellow-400 font-black text-sm uppercase tracking-widest">Limited Time</span>
            <Zap size={20} className="text-yellow-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Deal of the Day ⚡
          </h2>
          <p className="text-gray-400 text-sm mb-6">Grab these exclusive deals before they expire!</p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mr-2">
              <Clock size={14} className="text-yellow-400" />
              <span>Ends in:</span>
            </div>
            <TimeUnit value={timeLeft.hours} label="HRS" />
            <div className="text-white/60 font-black text-2xl mb-4">:</div>
            <TimeUnit value={timeLeft.minutes} label="MIN" />
            <div className="text-white/60 font-black text-2xl mb-4">:</div>
            <TimeUnit value={timeLeft.seconds} label="SEC" />
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* View All Deals */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl">
            <Zap size={16} />
            View All Flash Deals
          </button>
        </div>
      </div>
    </section>
  );
}
