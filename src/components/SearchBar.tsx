"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export const SEARCH_CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Grocery",
  "Sports",
  "Toys",
  "Books",
];

const SEARCH_SUGGESTIONS = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24",
  "Nike Air Max",
  "Wireless Earbuds",
  "Smart Watch",
  "Laptop",
  "Running Shoes",
  "Summer Dress",
];

type SearchBarProps = {
  /** Initial query (e.g. from URL on search page) */
  defaultQuery?: string;
  /** Initial category (e.g. from URL on search page) */
  defaultCategory?: string;
  placeholder?: string;
  className?: string;
  /** Show suggestions dropdown (default true) */
  showSuggestions?: boolean;
};

export default function SearchBar({
  defaultQuery = "",
  defaultCategory = "All",
  placeholder = "Search for products, brands and more...",
  className = "",
  showSuggestions: enableSuggestions = true,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState(defaultCategory);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setQuery(defaultQuery);
    setCategory(defaultCategory);
  }, [defaultQuery, defaultCategory]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionsOpen(false);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category && category !== "All") params.set("category", category);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <div className="flex rounded-lg overflow-hidden border-2 border-transparent focus-within:border-yellow-400 transition-all shadow-sm">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-200 text-gray-700 text-xs px-2 py-2.5 border-r border-gray-300 cursor-pointer focus:outline-none hidden sm:block"
        >
          {SEARCH_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSuggestionsOpen(true);
          }}
          onFocus={() => setSuggestionsOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-white text-gray-800 px-4 py-2.5 text-sm focus:outline-none placeholder:text-gray-400 min-w-0"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2.5 transition-colors flex-shrink-0"
        >
          <Search size={18} className="text-gray-800" />
        </button>
      </div>

      {enableSuggestions && suggestionsOpen && query && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-2xl z-50 border border-gray-100 overflow-hidden mt-0">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <Link
                key={i}
                href={`/search?q=${encodeURIComponent(item)}${category && category !== "All" ? `&category=${encodeURIComponent(category)}` : ""}`}
                onClick={() => setSuggestionsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm border-b border-gray-50 last:border-0"
              >
                <Search size={13} className="text-gray-400 flex-shrink-0" />
                {item}
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-400 text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </form>
  );
}
