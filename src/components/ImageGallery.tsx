"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
  alt: string;
  /** Enable zoom on hover */
  zoomOnHover?: boolean;
  className?: string;
};

export default function ImageGallery({
  images,
  alt,
  zoomOnHover = true,
  className = "",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ x: 0, y: 0, show: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const mainImage = images[selectedIndex] ?? images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomOnHover || !containerRef.current || images.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ x, y, show: true });
  };

  const handleMouseLeave = () => setZoomStyle((s) => ({ ...s, show: false }));

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        ref={containerRef}
        className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-contain transition-transform duration-200"
          style={
            zoomOnHover && zoomStyle.show
              ? {
                  transformOrigin: `${zoomStyle.x}% ${zoomStyle.y}%`,
                  transform: "scale(1.8)",
                }
              : undefined
          }
          sizes="(max-width: 768px) 100vw, 400px"
          unoptimized
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === i
                  ? "border-orange-500 ring-2 ring-orange-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
