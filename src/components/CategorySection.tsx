"use client";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Smartphones", emoji: "📱", count: "5,420+ items", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50", border: "border-blue-100", tag: "Hot" },
  { name: "Laptops", emoji: "💻", count: "2,100+ items", color: "from-slate-500 to-gray-700", bg: "bg-slate-50", border: "border-slate-100", tag: "Top Pick" },
  { name: "Men's Fashion", emoji: "👔", count: "12,800+ items", color: "from-violet-500 to-purple-600", bg: "bg-violet-50", border: "border-violet-100", tag: "Trending" },
  { name: "Women's Fashion", emoji: "👗", count: "18,400+ items", color: "from-pink-500 to-rose-600", bg: "bg-pink-50", border: "border-pink-100", tag: "New" },
  { name: "Home & Kitchen", emoji: "🏠", count: "9,600+ items", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", border: "border-amber-100", tag: "Sale" },
  { name: "Beauty & Care", emoji: "💄", count: "7,200+ items", color: "from-fuchsia-500 to-pink-600", bg: "bg-fuchsia-50", border: "border-fuchsia-100", tag: "Popular" },
  { name: "Sports & Fitness", emoji: "🏋️", count: "4,300+ items", color: "from-green-500 to-emerald-600", bg: "bg-green-50", border: "border-green-100", tag: "Top Pick" },
  { name: "Books & Media", emoji: "📚", count: "50,000+ items", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", border: "border-teal-100", tag: "New" },
  { name: "Gaming", emoji: "🎮", count: "3,100+ items", color: "from-red-500 to-rose-600", bg: "bg-red-50", border: "border-red-100", tag: "Hot" },
  { name: "Grocery", emoji: "🛒", count: "15,000+ items", color: "from-lime-500 to-green-600", bg: "bg-lime-50", border: "border-lime-100", tag: "Daily" },
  { name: "Jewellery", emoji: "💍", count: "8,900+ items", color: "from-yellow-500 to-amber-600", bg: "bg-yellow-50", border: "border-yellow-100", tag: "Premium" },
  { name: "Toys & Kids", emoji: "🧸", count: "6,700+ items", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", border: "border-sky-100", tag: "Fun" },
];

export default function CategorySection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-400 rounded-full" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Browse</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Shop By Category</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors group">
            All Categories
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 lg:gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#"
              className={`group relative flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-2xl border ${cat.bg} ${cat.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* Tag Badge */}
              <span className={`absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full text-white bg-gradient-to-r ${cat.color} opacity-90`}>
                {cat.tag}
              </span>

              {/* Emoji with Glow */}
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <span className="text-2xl sm:text-3xl filter drop-shadow">{cat.emoji}</span>
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-gray-900 leading-tight">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">{cat.count}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
