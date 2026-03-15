"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Bell,
  Package,
  LogIn,
  Flame,
} from "lucide-react";
import { getCartCount, CART_UPDATE_EVENT } from "@/lib/cartStorage";
import { getWishlistCount, WISHLIST_UPDATE_EVENT } from "@/lib/wishlistStorage";
import {
  getDeliveryPincode,
  setDeliveryPincode,
  DELIVERY_UPDATE_EVENT,
} from "@/lib/deliveryStorage";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { label: "Electronics", href: "/search?category=Electronics" },
  { label: "Fashion", href: "/search?category=Fashion" },
  { label: "Home & Living", href: "/search?category=Home%20%26%20Living" },
  { label: "Beauty", href: "/search?category=Beauty" },
  { label: "Grocery", href: "/search?category=Grocery" },
  { label: "Sports", href: "/search?category=Sports" },
  { label: "Toys", href: "/search?category=Toys" },
  { label: "Books", href: "/search?category=Books" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [deliveryPincode, setDeliveryPincodeState] = useState("110001");
  const [deliverModalOpen, setDeliverModalOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Initialize cart count from localStorage
    setCartCount(getCartCount());

    function handleCartUpdate() {
      setCartCount(getCartCount());
    }

    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    setWishlistCount(getWishlistCount());
    function handleWishlistUpdate() {
      setWishlistCount(getWishlistCount());
    }
    window.addEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);
    return () => {
      window.removeEventListener(WISHLIST_UPDATE_EVENT, handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    setDeliveryPincodeState(getDeliveryPincode());
    function handleDeliveryUpdate() {
      setDeliveryPincodeState(getDeliveryPincode());
    }
    window.addEventListener(DELIVERY_UPDATE_EVENT, handleDeliveryUpdate);
    return () => window.removeEventListener(DELIVERY_UPDATE_EVENT, handleDeliveryUpdate);
  }, []);

  const handleUpdatePincode = () => {
    const trimmed = pincodeInput.trim();
    if (trimmed.length >= 4) {
      setDeliveryPincode(trimmed);
      setDeliverModalOpen(false);
      setPincodeInput("");
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Main Navbar */}
      <div className="bg-[#131921] text-white w-full">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-3 flex items-center gap-2 lg:gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 group">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-lg tracking-tight">Secure</span>
              <span className="text-yellow-400 font-black text-lg tracking-tight -mt-1.5">Mart</span>
            </div>
          </Link>

          {/* Deliver To */}
          <button
            type="button"
            onClick={() => setDeliverModalOpen(true)}
            className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-colors flex-shrink-0 text-left"
          >
            <MapPin size={16} className="text-gray-300 flex-shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="text-gray-400 text-xs">Deliver to</span>
              <span className="font-semibold text-sm">India {deliveryPincode}</span>
            </div>
          </button>

          {/* Search Bar */}
          <SearchBar className="flex-1 min-w-0" />

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 lg:gap-2 flex-shrink-0">
            {/* Notifications */}
            <Link
              href="/notifications"
              className="hidden lg:flex flex-col items-center p-1.5 hover:text-yellow-400 transition-colors"
            >
              <span className="relative">
                <Bell size={20} />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  2
                </span>
              </span>
              <span className="text-xs mt-0.5">Notifications</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex flex-col items-center p-1.5 hover:text-yellow-400 transition-colors relative group"
            >
              <Heart size={20} className="group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden lg:block text-xs mt-0.5">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/add-to-cart"
              className="flex flex-col items-center p-1.5 hover:text-yellow-400 transition-colors relative group"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-yellow-400 text-gray-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
              <span className="hidden lg:block text-xs mt-0.5">Cart</span>
            </Link>

            {/* Account */}
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <LogIn size={16} />
              Sign In
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:text-yellow-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-[#232f3e] text-white border-t border-gray-600/30 w-full">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <nav className="hidden lg:flex items-center justify-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-0 flex-nowrap">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setActiveCategory(link.label)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`flex items-center gap-1 px-3.5 py-3 text-sm font-medium whitespace-nowrap transition-all relative
                    ${activeCategory === link.label
                      ? "text-yellow-400 bg-white/10"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                  {activeCategory === link.label && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />
                  )}
                </Link>
              ))}
              <Link
                href="/search"
                className="flex items-center gap-1 px-3.5 py-3 text-sm font-bold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
              >
                <Flame size={16} className="flex-shrink-0" />
                Sale
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#131921] text-white border-t border-gray-700 shadow-2xl w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-900" />
              </div>
              <div>
                <div className="font-semibold text-sm">Welcome back!</div>
                <Link href="/login" className="text-yellow-400 text-xs hover:underline" onClick={() => setMobileMenuOpen(false)}>
                  Sign In or Create Account
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap items-center gap-4 text-sm">
              <Link href="/notifications" className="flex items-center gap-2 hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                <Bell size={16} /> Notifications
              </Link>
              <Link href="/" className="flex items-center gap-2 hover:text-yellow-400">
                <Package size={16} /> Orders
              </Link>
              <Link href="/wishlist" className="flex items-center gap-2 hover:text-yellow-400">
                <Heart size={16} /> Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Deliver To modal */}
      {deliverModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setDeliverModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Update delivery location</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your pincode to see delivery options and availability.
            </p>
            <input
              type="text"
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="e.g. 110001"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mb-4"
              maxLength={6}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUpdatePincode}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => { setDeliverModalOpen(false); setPincodeInput(""); }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
