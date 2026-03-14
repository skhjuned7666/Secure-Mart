"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clearCart } from "@/lib/cartStorage";

export default function OrderConfirmationPage() {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Order placed successfully
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You will receive an order confirmation
            shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 text-base bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
            >
              Continue shopping
            </Link>
            <Link
              href="/add-to-cart"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 text-base border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
