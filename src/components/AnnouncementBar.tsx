"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  "🎉 MEGA SALE: Up to 70% off on Electronics! Limited time offer.",
  "🚚 FREE Delivery on orders above ₹499. Shop Now!",
  "💳 Extra 10% cashback on all UPI payments. Use code: UPIBACK10",
  "🎁 Buy 2 Get 1 Free on Fashion & Accessories. Today Only!",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#131921] via-[#1a2535] to-[#131921] text-white text-sm py-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="p-1 hover:bg-white/10 rounded transition-colors hidden sm:block"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex-1 text-center font-medium tracking-wide text-yellow-300 text-xs sm:text-sm animate-pulse-slow">
          {announcements[current]}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % announcements.length)}
            className="p-1 hover:bg-white/10 rounded transition-colors hidden sm:block"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors ml-2"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-1 gap-1">
        {announcements.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${i === current ? "w-4 bg-yellow-400" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
