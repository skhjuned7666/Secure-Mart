"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Star } from "lucide-react";
import Image from "next/image";

// Banner Slides Data
const slides = [
  {
    id: 1,
    badge: "MEGA SALE",
    headline: "Electronics Festival",
    subheadline: "Up to 70% OFF",
    description:
      "Smartphones, Laptops, TVs, Headphones & more from top brands.",
    cta: "Shop Electronics",
    cta2: "View All Deals",
    tag: "Limited Time",
    gradient: "from-[#0f0c29] via-[#302b63] to-[#24243e]",
    accentColor: "from-yellow-400 to-orange-500",
    textAccent: "text-yellow-400",
    imageUrl:
      "https://images.unsplash.com/photo-1529338296731-c4280a44fc48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWN8ZW58MHx8MHx8fDA%3D",
    stats: ["50K+ Products", "Top Brands", "24hr Delivery"],
    badge2: "Starts ₹999",
  },
  {
    id: 2,
    badge: "NEW ARRIVALS",
    headline: "Fashion Forward",
    subheadline: "Upto 60% OFF",
    description:
      "Latest trends in clothing, footwear and accessories for all.",
    cta: "Explore Fashion",
    cta2: "View Lookbook",
    tag: "Fresh Collection",
    gradient: "from-[#134e5e] via-[#71b280] to-[#134e5e]",
    accentColor: "from-emerald-400 to-teal-500",
    textAccent: "text-emerald-400",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    stats: ["1L+ Styles", "Free Returns", "Try & Buy"],
    badge2: "New Season",
  },
  {
    id: 3,
    badge: "BEST DEALS",
    headline: "Home Makeover",
    subheadline: "Upto 55% OFF",
    description:
      "Transform your living spaces with premium furniture & decor.",
    cta: "Shop Home",
    cta2: "Get Inspired",
    tag: "Weekend Special",
    gradient: "from-[#4a1942] via-[#c74b50] to-[#4a1942]",
    accentColor: "from-pink-400 to-rose-500",
    textAccent: "text-pink-400",
    imageUrl:
      "https://images.unsplash.com/photo-1617098709804-705581f844eb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: ["10K+ Items", "EMI Available", "Easy Install"],
    badge2: "From ₹499",
  },
  {
    id: 4,
    badge: "SUPER SAVER",
    headline: "Sports & Fitness",
    subheadline: "Upto 50% OFF",
    description:
      "Premium sports gear, gym equipment and fitness accessories.",
    cta: "Shop Sports",
    cta2: "View Combos",
    tag: "Active Life",
    gradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
    accentColor: "from-cyan-400 to-blue-500",
    textAccent: "text-cyan-400",
    imageUrl:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzJTIwYW5kJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
    stats: ["Expert Picks", "Pro Gear", "Fast Ship"],
    badge2: "Top Rated",
  },
];

// Category Cards Data
const categoryCards = [
  {
    id: 1,
    title: "Electronics",
    products: [
      "https://images.unsplash.com/photo-1529338296731-c4280a44fc48?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&auto=format&fit=crop&q=60",
    ],
    link: "#product-cards",
  },
  {
    id: 2,
    title: "Fashion",
    products: [
      "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&auto=format&fit=crop&q=60",
    ],
    link: "#product-cards",
  },
  {
    id: 3,
    title: "Footwear",
    products: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&auto=format&fit=crop&q=60",
    ],
    link: "#product-cards",
  },
  {
    id: 4,
    title: "Home Decor",
    products: [
      "https://images.unsplash.com/photo-1617098709804-705581f844eb?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop&q=60",
    ],
    link: "#product-cards",
  },
];

// Category Card Component - whole card scrolls to product section
function CategoryCard({ category }: { category: (typeof categoryCards)[0] }) {
  return (
    <a
      href={category.link}
      className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer"
    >
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-800 mb-2">
          {category.title}
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {category.products.map((product, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-md overflow-hidden bg-gray-50"
            >
              <Image
                src={product}
                alt={`${category.title} product ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
          ))}
        </div>
        <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
          See more
          <ArrowRight size={12} />
        </span>
      </div>
    </a>
  );
}

// Category Cards Grid Component
function CategoryCards() {
  return (
    <div className="relative z-10 w-full px-3 sm:px-4 lg:px-6 -mt-16 sm:-mt-20 lg:-mt-24 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {categoryCards.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

// Banner Slide Component
function BannerSlide({
  slide,
  isActive,
}: {
  slide: (typeof slides)[0];
  isActive: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`relative w-full h-full bg-gradient-to-r ${slide.gradient}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Background Image - Right Aligned */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2">
            <Image
              src={slide.imageUrl}
              alt={slide.headline}
              fill
              className="object-cover"
              priority={isActive}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full h-full flex items-center px-3 sm:px-4 lg:px-6 py-10 lg:py-16">
          <div className="w-full max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="max-w-2xl text-white space-y-4 lg:space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`bg-gradient-to-r ${slide.accentColor} text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest`}
                >
                  {slide.badge}
                </span>
                <span className="bg-white/10 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full border border-white/20 inline-flex items-center gap-1">
                  <Zap size={10} className="flex-shrink-0" />
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  {slide.headline}
                </h1>
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black ${slide.textAccent} mt-1`}
                >
                  {slide.subheadline}
                </div>
              </div>

              <p className="text-white/90 text-sm sm:text-base max-w-md leading-relaxed">
                {slide.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {slide.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/10"
                  >
                    <span className="text-white/90 text-xs font-semibold">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Slider Component
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <BannerSlide key={slide.id} slide={slide} isActive={index === current} />
      ))}

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-12 sm:right-16 text-white/70 text-xs font-mono z-20">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}

// Main Hero Banner Component
export default function HeroBanner() {
  return (
    <div className="relative w-full bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Cards Overlay */}
      <CategoryCards />

      {/* Infinite scrolling text marquee - even spacing including first/last, seamless loop */}
      <div className="bg-white border-b border-gray-100 w-full overflow-hidden py-3">
        <div className="marquee-track flex w-[200vw] shrink-0 justify-evenly items-center px-4 sm:px-6">
          {[
            { text: "Top Brands Only", sub: "100% Authentic" },
            { text: "Premium Quality", sub: "Verified Products" },
            { text: "Flash Deals", sub: "Every Hour" },
            { text: "5★ Reviews", sub: "1M+ Happy Customers" },
          ]
            .concat([
              { text: "Top Brands Only", sub: "100% Authentic" },
              { text: "Premium Quality", sub: "Verified Products" },
              { text: "Flash Deals", sub: "Every Hour" },
              { text: "5★ Reviews", sub: "1M+ Happy Customers" },
            ])
            .map((item, i) => (
              <div
                key={i}
                className="flex flex-col shrink-0 text-center items-center"
                aria-hidden={i >= 4}
              >
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap inline-flex items-center gap-0.5 justify-center">
                  {item.text === "5★ Reviews" ? (
                    <>
                      5 <Star size={10} fill="currentColor" className="inline-block" /> Reviews
                    </>
                  ) : (
                    item.text
                  )}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {item.sub}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

