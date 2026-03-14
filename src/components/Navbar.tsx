"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Bell,
  Package,
  LogIn,
} from "lucide-react";
import { getCartCount, CART_UPDATE_EVENT } from "@/lib/cartStorage";
import { getWishlistCount, WISHLIST_UPDATE_EVENT } from "@/lib/wishlistStorage";

const navLinks = [
  { label: "Electronics", href: "/" },
  { label: "Fashion", href: "/" },
  { label: "Home & Living", href: "/" },
  { label: "Beauty", href: "/" },
  { label: "Grocery", href: "/" },
  { label: "Sports", href: "/" },
  { label: "Toys", href: "/" },
  { label: "Books", href: "/" },
];

const searchSuggestions = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24",
  "Nike Air Max",
  "Wireless Earbuds",
  "Smart Watch",
  "Laptop",
  "Running Shoes",
  "Summer Dress",
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    // Initialize wishlist count from localStorage
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

  const filtered = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-colors flex-shrink-0">
            <MapPin size={16} className="text-gray-300" />
            <div className="flex flex-col leading-none">
              <span className="text-gray-400 text-xs">Deliver to</span>
              <span className="font-semibold text-sm">India 110001</span>
            </div>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 relative min-w-0">
            <div className="flex rounded-lg overflow-hidden border-2 border-transparent focus-within:border-yellow-400 transition-all shadow-sm">
              <select className="bg-gray-200 text-gray-700 text-xs px-2 py-2.5 border-r border-gray-300 cursor-pointer focus:outline-none hidden sm:block">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Books</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for products, brands and more..."
                className="flex-1 bg-white text-gray-800 px-4 py-2.5 text-sm focus:outline-none placeholder:text-gray-400"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2.5 transition-colors">
                <Search size={18} className="text-gray-800" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-2xl z-50 border border-gray-100 overflow-hidden">
                {filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => { setSearchQuery(item); setShowSuggestions(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm border-b border-gray-50 last:border-0"
                    >
                      <Search size={13} className="text-gray-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-400 text-sm">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 lg:gap-2 flex-shrink-0">
            {/* Notifications */}
            <button className="hidden lg:flex flex-col items-center p-1.5 hover:text-yellow-400 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
            </button>

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
            <button className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
              <LogIn size={16} />
              Sign In
            </button>

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
                href="/"
                className="flex items-center gap-1 px-3.5 py-3 text-sm font-bold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
              >
                🔥 Sale
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
                <button className="text-yellow-400 text-xs hover:underline">Sign In or Create Account</button>
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
            <div className="mt-4 pt-4 border-t border-gray-700 flex items-center gap-4 text-sm">
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
    </header>
  );
}
