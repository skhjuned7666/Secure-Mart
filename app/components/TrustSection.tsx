"use client";
import { ShieldCheck, Truck, RotateCcw, Headphones, Award, Lock } from "lucide-react";

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    description: "SSL encrypted transactions with bank-level security. All major payment methods accepted.",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
    highlight: "bg-green-500",
  },
  {
    icon: Truck,
    title: "Fast & Free Delivery",
    description: "Free shipping on orders above ₹499. Express delivery in 24 hours available in 200+ cities.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    highlight: "bg-blue-500",
  },
  {
    icon: RotateCcw,
    title: "Easy 30-Day Returns",
    description: "No questions asked returns within 30 days. Hassle-free pickup right from your doorstep.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    highlight: "bg-orange-500",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Expert support available round the clock via chat, email, or phone. Always here for you.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    highlight: "bg-purple-500",
  },
  {
    icon: Award,
    title: "Authentic Products",
    description: "100% genuine products from verified sellers. Every item quality-checked before dispatch.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    highlight: "bg-yellow-500",
  },
  {
    icon: Lock,
    title: "Buyer Protection",
    description: "Full buyer protection on every order. Your money is safe until you confirm delivery.",
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    highlight: "bg-teal-500",
  },
];

const paymentMethods = ["💳 Visa", "💳 Mastercard", "📱 UPI", "🏦 Net Banking", "💰 EMI", "₹ Cash on Delivery"];

export default function TrustSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full mb-3">
            <ShieldCheck size={14} className="text-green-600" />
            <span className="text-green-700 text-xs font-bold uppercase tracking-widest">Why Shop With Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            Your Trust is Our Priority
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Shopping at Secure-Mart means you're always protected. We ensure the safest, 
            fastest, and most reliable shopping experience.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {trustFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`group relative p-5 sm:p-6 rounded-2xl border ${feature.bg} ${feature.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
              >
                {/* Top Highlight Bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${feature.highlight} opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={22} className={feature.color} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-[#131921] via-[#1e2a3a] to-[#131921] rounded-2xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "5M+", label: "Happy Customers", emoji: "😊" },
              { value: "2M+", label: "Products Listed", emoji: "📦" },
              { value: "99.8%", label: "Delivery Success", emoji: "✅" },
              { value: "4.8★", label: "Average Rating", emoji: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-400">{stat.value}</div>
                <div className="text-gray-300 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-500 mb-3">Accepted Payment Methods</div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {paymentMethods.map((method, i) => (
              <span
                key={i}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-700 font-medium px-3.5 py-2 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-default"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            🔒 All transactions are 256-bit SSL encrypted and PCI DSS compliant
          </p>
        </div>
      </div>
    </section>
  );
}
