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

/** Countdown on image - white numbers, highlighted & large */
function CountdownOverlay() {
  const { hours, minutes, seconds } = useCountdown(5);
  const numClass =
    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tabular-nums tracking-tighter text-white " +
    "drop-shadow-[0_0_12px_rgba(0,0,0,0.9)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] " +
    "[text-shadow:0_0_20px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.2)]";
  const colonClass =
    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/95 " +
    "drop-shadow-[0_0_12px_rgba(0,0,0,0.9)] [text-shadow:0_0_16px_rgba(255,255,255,0.3)]";

  return (
    <div className="flex items-center gap-3 sm:gap-4 drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
      <div className="flex flex-col items-center">
        <span className={numClass}>{String(hours).padStart(2, "0")}</span>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white mt-1">
          Hrs
        </span>
      </div>
      <span className={colonClass}>:</span>
      <div className="flex flex-col items-center">
        <span className={numClass}>{String(minutes).padStart(2, "0")}</span>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white mt-1">
          Min
        </span>
      </div>
      <span className={colonClass}>:</span>
      <div className="flex flex-col items-center">
        <span className={numClass}>{String(seconds).padStart(2, "0")}</span>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white mt-1">
          Sec
        </span>
      </div>
      <span className="hidden sm:block text-base font-bold text-white/90 ml-2">LEFT</span>
    </div>
  );
}

type PosterProps = { main: DealProduct };

/** Modern futuristic full-bleed poster: countdown on image + left content */
function DealPoster({ main }: PosterProps) {
  return (
    <Link
      href={`/products/${main.id}`}
      className="block overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900 text-white shadow-2xl group border border-white/10 ring-2 ring-amber-500/20 hover:ring-amber-400/40 transition-all duration-500"
    >
      <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
        {/* Background image */}
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdjMbgaEKeGB10KOpKqa6HU1OeUyjGaZVHnw&s"
          alt="Deal of the Day - Secure-Mart"
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          unoptimized
        />
        {/* Futuristic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Subtle grid / tech accent */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Countdown on image - mid center, right side, large highlighted numbers */}
        <div className="absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <CountdownOverlay />
        </div>

        {/* Left content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center pb-10 sm:pb-0 px-5 sm:px-10 lg:px-16 max-w-xl">
          <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Deal of the Day
          </span>
          <h3 className="mt-2 text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight">
            Up to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              {main.discount || 50}% OFF
            </span>
          </h3>
          <p className="mt-3 text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
            Products you love. Quality you trust. Limited-time savings on top
            brands.
          </p>
          <span className="mt-6 inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-7 py-3 text-sm font-bold shadow-lg shadow-amber-500/30 group-hover:from-amber-300 group-hover:to-yellow-400 group-hover:shadow-amber-400/40 transition-all">
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
    <section className="mt-12 sm:mt-16 px-2 sm:px-0">
      {/* Minimal header: title + View All */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Deal of the Day
        </h2>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 whitespace-nowrap transition-colors"
        >
          View All Deals
          <ChevronRight size={18} />
        </Link>
      </div>

      {showSkeleton ? (
        <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl bg-gray-200">
          <div className="h-[420px] sm:h-[480px] lg:h-[560px] animate-pulse bg-gradient-to-br from-gray-300 to-gray-200" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <DealPoster main={main} />
        </div>
      )}
    </section>
  );
}
