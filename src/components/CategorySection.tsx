"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    count: "5,420+ items",
    tag: "Hot",
    tagColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  },
  {
    name: "Laptops",
    count: "2,100+ items",
    tag: "Top Pick",
    tagColor: "bg-slate-700",
    image: "https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZSUyMGNvbW1lcmNlJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Men's Fashion",
    count: "12,800+ items",
    tag: "Trending",
    tagColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80",
  },
  {
    name: "Women's Fashion",
    count: "18,400+ items",
    tag: "New",
    tagColor: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
  },
  {
    name: "Home & Kitchen",
    count: "9,600+ items",
    tag: "Sale",
    tagColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    name: "Beauty & Care",
    count: "7,200+ items",
    tag: "Popular",
    tagColor: "bg-fuchsia-500",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  },
  {
    name: "Sports & Fitness",
    count: "4,300+ items",
    tag: "Top Pick",
    tagColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    name: "Books",
    count: "50,000+ items",
    tag: "New",
    tagColor: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
  },
  {
    name: "Gaming",
    count: "3,100+ items",
    tag: "Hot",
    tagColor: "bg-red-500",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
  },
  {
    name: "Grocery",
    count: "15,000+ items",
    tag: "Daily",
    tagColor: "bg-lime-600",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
  },
  {
    name: "Jewellery",
    count: "8,900+ items",
    tag: "Premium",
    tagColor: "bg-amber-600",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV3ZWxsZXJ5fGVufDB8fDB8fHww",
  },
  {
    name: "Toys & Kids",
    count: "6,700+ items",
    tag: "Fun",
    tagColor: "bg-sky-500",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-400 rounded-full" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                Browse
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Shop By Category
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors group"
          >
            All Categories
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Category Grid: Mobile 2 | Tablet 3 | Desktop 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#"
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Tag Badge */}
              <span
                className={`absolute top-2 right-2 z-10 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full text-white ${cat.tagColor} shadow-sm`}
              >
                {cat.tag}
              </span>

              {/* Category Image */}
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  {cat.count}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
