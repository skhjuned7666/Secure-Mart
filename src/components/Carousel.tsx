"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Section from "./ui/Section";
import Button from "./ui/Button";

type CarouselProps = {
  title?: string;
  label?: string;
  headerRight?: React.ReactNode;
  /** When set, shows bundle price and "Add all to cart" button */
  bundlePrice?: number;
  children: React.ReactNode;
  className?: string;
  scrollStep?: number;
};

export default function Carousel({
  title,
  label,
  headerRight,
  bundlePrice,
  children,
  className = "",
  scrollStep = 280,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addAllAdded, setAddAllAdded] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    });
  };

  const navButtons = (
    <div className="hidden sm:flex gap-1">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );

  const effectiveHeaderRight = (
    <>
      {bundlePrice != null && (
        <>
          <span className="text-lg font-bold text-gray-900">
            Bundle: ₹{bundlePrice.toLocaleString("en-IN")}
          </span>
          <Button
            variant={addAllAdded ? "success" : "primary"}
            size="sm"
            leftIcon={<ShoppingCart size={14} />}
            onClick={() => {
              setAddAllAdded(true);
              setTimeout(() => setAddAllAdded(false), 2000);
            }}
          >
            {addAllAdded ? "Added" : "Add all to cart"}
          </Button>
        </>
      )}
      {headerRight}
      {navButtons}
    </>
  );

  return (
    <Section
      className={className}
      title={title}
      label={label}
      headerRight={
        title || label || headerRight || bundlePrice != null
          ? effectiveHeaderRight
          : undefined
      }
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mx-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </Section>
  );
}
