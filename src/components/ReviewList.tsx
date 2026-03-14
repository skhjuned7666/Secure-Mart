"use client";

import { useEffect, useState } from "react";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { getReviews } from "@/lib/products";
import StarRating from "./ui/StarRating";
import Section from "./ui/Section";

export type ReviewItem = {
  id: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase?: boolean;
  images?: string[];
  createdAt: string;
  helpfulCount: number;
};

type ReviewListProps = {
  title?: string;
  emptyMessage?: string;
  id?: string;
  className?: string;
  /** When provided, fetches reviews by productId; use productRating/productReviewsCount as fallback */
  productId?: string;
  productRating?: number;
  productReviewsCount?: number;
  /** When productId is not used, pass data directly (controlled mode) */
  averageRating?: number;
  totalCount?: number;
  breakdown?: Record<number, number>;
  reviews?: ReviewItem[];
  loading?: boolean;
};

export default function ReviewList({
  title = "Customer Reviews",
  emptyMessage = "No reviews yet. Be the first to review!",
  id,
  className = "",
  productId,
  productRating = 0,
  productReviewsCount = 0,
  averageRating: controlledRating,
  totalCount: controlledTotalCount,
  breakdown: controlledBreakdown,
  reviews: controlledReviews,
  loading: controlledLoading,
}: ReviewListProps) {
  const [fetched, setFetched] = useState<{
    averageRating: number;
    breakdown: Record<number, number>;
    reviews: ReviewItem[];
  } | null>(null);
  const [fetchLoading, setFetchLoading] = useState(!!productId);

  useEffect(() => {
    if (!productId) return;
    getReviews(productId)
      .then((data) => setFetched(data))
      .finally(() => setFetchLoading(false));
  }, [productId]);

  const loading = productId ? fetchLoading : controlledLoading;
  const averageRating = productId
    ? (fetched?.averageRating ?? productRating)
    : (controlledRating ?? 0);
  const totalCount = productId ? productReviewsCount : (controlledTotalCount ?? 0);
  const breakdown = productId
    ? (fetched?.breakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
    : (controlledBreakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const reviews: ReviewItem[] = productId
    ? (fetched?.reviews ?? [])
    : (controlledReviews ?? []);

  const totalWithBreakdown = Object.values(breakdown).reduce((a, b) => a + b, 0);

  const content = (
    <>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-100 rounded" />
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {totalCount.toLocaleString("en-IN")} ratings
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = breakdown[star] ?? 0;
                const pct =
                  totalWithBreakdown > 0
                    ? (count / totalWithBreakdown) * 100
                    : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-12">
                      {star}{" "}
                      <Star
                        size={12}
                        className="inline fill-yellow-400 text-yellow-400"
                      />
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">{emptyMessage}</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                        {review.userName.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {review.userName}
                      </span>
                      {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                          <BadgeCheck size={12} />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{review.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {review.body}
                  </p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {review.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>
                      {new Date(review.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      <ThumbsUp size={12} />
                      Helpful ({review.helpfulCount})
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );

  return (
    <Section
      id={id}
      title={title}
      className={`p-6 ${className}`}
      titleClassName="text-xl font-bold text-gray-900"
    >
      {content}
    </Section>
  );
}
