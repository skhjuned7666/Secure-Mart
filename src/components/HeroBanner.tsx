"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "MEGA SALE",
    headline: "Electronics Festival",
    subheadline: "Up to 70% OFF",
    description: "Smartphones, Laptops, TVs, Headphones & more from top brands.",
    cta: "Shop Electronics",
    cta2: "View All Deals",
    tag: "Limited Time",
    gradient: "from-[#0f0c29] via-[#302b63] to-[#24243e]",
    accentColor: "from-yellow-400 to-orange-500",
    textAccent: "text-yellow-400",
    emoji: "📱",
    stats: ["50K+ Products", "Top Brands", "24hr Delivery"],
    badge2: "Starts ₹999",
  },
  {
    id: 2,
    badge: "NEW ARRIVALS",
    headline: "Fashion Forward",
    subheadline: "Upto 60% OFF",
    description: "Latest trends in clothing, footwear and accessories for all.",
    cta: "Explore Fashion",
    cta2: "View Lookbook",
    tag: "Fresh Collection",
    gradient: "from-[#134e5e] via-[#71b280] to-[#134e5e]",
    accentColor: "from-emerald-400 to-teal-500",
    textAccent: "text-emerald-400",
    emoji: "👗",
    stats: ["1L+ Styles", "Free Returns", "Try & Buy"],
    badge2: "New Season",
  },
  {
    id: 3,
    badge: "BEST DEALS",
    headline: "Home Makeover",
    subheadline: "Upto 55% OFF",
    description: "Transform your living spaces with premium furniture & decor.",
    cta: "Shop Home",
    cta2: "Get Inspired",
    tag: "Weekend Special",
    gradient: "from-[#4a1942] via-[#c74b50] to-[#4a1942]",
    accentColor: "from-pink-400 to-rose-500",
    textAccent: "text-pink-400",
    emoji: "🛋️",
    stats: ["10K+ Items", "EMI Available", "Easy Install"],
    badge2: "From ₹499",
  },
  {
    id: 4,
    badge: "SUPER SAVER",
    headline: "Sports & Fitness",
    subheadline: "Upto 50% OFF",
    description: "Premium sports gear, gym equipment and fitness accessories.",
    cta: "Shop Sports",
    cta2: "View Combos",
    tag: "Active Life",
    gradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
    accentColor: "from-cyan-400 to-blue-500",
    textAccent: "text-cyan-400",
    emoji: "🏃",
    stats: ["Expert Picks", "Pro Gear", "Fast Ship"],
    badge2: "Top Rated",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback((index: number, dir: "left" | "right" = "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden">
      {/* Main Slide */}
      <div
        className={`relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] bg-gradient-to-r ${slide.gradient} transition-all duration-700`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
            {/* Left Content */}
            <div
              className={`flex-1 text-white space-y-4 lg:space-y-5 transition-all duration-500 ${isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"}`}
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`bg-gradient-to-r ${slide.accentColor} text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
                  {slide.badge}
                </span>
                <span className="bg-white/10 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                  ⚡ {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  {slide.headline}
                </h1>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${slide.textAccent} mt-1`}>
                  {slide.subheadline}
                </div>
              </div>

              <p className="text-white/75 text-sm sm:text-base max-w-md leading-relaxed">
                {slide.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/10">
                    <span className="text-white/80 text-xs font-semibold">{stat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button className={`bg-gradient-to-r ${slide.accentColor} text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl`}>
                  {slide.cta}
                </button>
                <button className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all">
                  {slide.cta2}
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div
              className={`flex-shrink-0 text-center transition-all duration-500 ${isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor} rounded-full blur-3xl opacity-30 scale-110`} />

                {/* Emoji Display */}
                <div className="relative text-[120px] sm:text-[160px] lg:text-[200px] leading-none filter drop-shadow-2xl select-none">
                  {slide.emoji}
                </div>

                {/* Price Badge */}
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${slide.accentColor} text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg`}>
                  {slide.badge2}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Controls */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-16 text-white/50 text-xs font-mono">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Mini Banners Below Slider */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { icon: "🏆", text: "Top Brands Only", sub: "100% Authentic", color: "bg-yellow-50 border-yellow-200" },
            { icon: "💎", text: "Premium Quality", sub: "Verified Products", color: "bg-purple-50 border-purple-200" },
            { icon: "⚡", text: "Flash Deals", sub: "Every Hour", color: "bg-orange-50 border-orange-200" },
            { icon: "🌟", text: "5★ Reviews", sub: "1M+ Happy Customers", color: "bg-green-50 border-green-200" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${item.color} hover:scale-[1.02] transition-transform cursor-pointer`}>
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-xs font-bold text-gray-800">{item.text}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
