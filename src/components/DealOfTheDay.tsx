"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getDealOfTheDayProducts, type DealProduct } from "@/lib/products";

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

/** Countdown in section header (HRS : MIN : SEC boxes) */
function HeaderCountdown() {
  const { hours, minutes, seconds } = useCountdown(5);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="flex items-center justify-center bg-gray-900 text-white text-sm font-bold min-w-[32px] h-8 px-1.5 rounded">
        {String(hours).padStart(2, "0")}
      </div>
      <span className="text-gray-400 font-medium">:</span>
      <div className="flex items-center justify-center bg-gray-900 text-white text-sm font-bold min-w-[32px] h-8 px-1.5 rounded">
        {String(minutes).padStart(2, "0")}
      </div>
      <span className="text-gray-400 font-medium">:</span>
      <div className="flex items-center justify-center bg-gray-900 text-white text-sm font-bold min-w-[32px] h-8 px-1.5 rounded">
        {String(seconds).padStart(2, "0")}
      </div>
      <span className="text-gray-500 text-xs hidden sm:inline ml-0.5">Left</span>
    </div>
  );
}

type PosterProps = { main: DealProduct };

/** Single full-bleed ad poster: one image, text overlay left */
function DealPoster({ main }: PosterProps) {
  return (
    <Link
      href={`/products/${main.id}`}
      className="block overflow-hidden bg-gray-900 text-white shadow-lg group"
    >
      <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
        {/* One full-bleed ad image - fixed creative */}
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdjMbgaEKeGB10KOpKqa6HU1OeUyjGaZVHnw&s"
          alt="Stay updated with the latest deals on Secure-Mart"
          fill
          className="object-cover md:object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          unoptimized
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content overlay: left-aligned */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center pb-8 sm:pb-0 px-5 sm:px-8 lg:px-12 max-w-xl">
          <p className="text-amber-200/90 text-sm font-semibold tracking-wide">
            Deal of the Day
          </p>
          <h3 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Up to{" "}
            <span className="text-amber-300">
              {main.discount || 50}% OFF
            </span>
          </h3>
          <p className="mt-2 text-sm sm:text-base text-white/90 max-w-md">
            Products you love. Quality you trust. Limited-time savings on top
            brands.
          </p>
          <span className="mt-5 inline-flex w-fit items-center justify-center rounded-full bg-amber-400 text-gray-900 px-6 py-2.5 text-sm font-semibold shadow-lg group-hover:bg-amber-300 transition-colors">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DealOfTheDay() {
  const [products, setProducts] = useState<DealProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getDealOfTheDayProducts(4).then((data) => {
      if (!cancelled) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const main = products[0];
  const showSkeleton = loading || !main;

  return (
    <section className="mt-10">
      {/* Header: title + countdown + View All */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Deal of the Day
          </h2>
          <HeaderCountdown />
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap"
        >
          View All Deals
          <ChevronRight size={18} />
        </Link>
      </div>

      {showSkeleton ? (
        <div className="overflow-hidden bg-gray-200">
            <div className="h-[380px] sm:h-[460px] lg:h-[520px] animate-pulse bg-gray-300" />
        </div>
      ) : (
        <DealPoster main={main} />
      )}
    </section>
  );
}
