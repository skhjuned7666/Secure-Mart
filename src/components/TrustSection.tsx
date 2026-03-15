"use client";
import { ShieldCheck, Truck, RotateCcw, Headphones, Award, Lock, Smile, Package, CheckCircle, Star, CreditCard, Smartphone, Landmark, IndianRupee, Banknote } from "lucide-react";

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

const paymentMethods: { label: string; Icon: typeof CreditCard }[] = [
  { label: "Visa", Icon: CreditCard },
  { label: "Mastercard", Icon: CreditCard },
  { label: "UPI", Icon: Smartphone },
  { label: "Net Banking", Icon: Landmark },
  { label: "EMI", Icon: IndianRupee },
  { label: "₹ Cash on Delivery", Icon: Banknote },
];

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

        {/* Stats – unique separate tiles (no single card) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {[
            { value: "5M+", label: "Happy Customers", Icon: Smile, bar: "bg-amber-500" },
            { value: "2M+", label: "Products Listed", Icon: Package, bar: "bg-blue-500" },
            { value: "99.8%", label: "Delivery Success", Icon: CheckCircle, bar: "bg-emerald-500" },
            { value: "4.8★", label: "Average Rating", Icon: Star, bar: "bg-yellow-500" },
          ].map((stat, i) => {
            const StatIcon = stat.Icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${stat.bar}`} />
                <div className="flex items-start gap-3">
                  <StatIcon className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 text-gray-600" strokeWidth={1.5} />
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-gray-500 text-sm font-medium mt-0.5">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-500 mb-3">Accepted Payment Methods</div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {paymentMethods.map((method, i) => {
              const MethodIcon = method.Icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 text-gray-700 font-medium px-3.5 py-2 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-default"
                >
                  <MethodIcon size={14} className="flex-shrink-0 text-gray-500" />
                  {method.label}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3 inline-flex items-center gap-1.5 justify-center">
            <Lock size={12} className="flex-shrink-0" />
            All transactions are 256-bit SSL encrypted and PCI DSS compliant
          </p>
        </div>
      </div>
    </section>
  );
}
