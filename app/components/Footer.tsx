"use client";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronUp } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  "Company": ["About Us", "Careers", "Press & Media", "Investor Relations", "Partner With Us"],
  "Shop": ["Deals & Offers", "New Arrivals", "Best Sellers", "Gift Cards", "Sell on Secure-Mart"],
  "Help": ["Help Center", "Track My Order", "Returns & Refunds", "Cancel Order", "Contact Us"],
  "Policies": ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy", "Grievance Officer"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0f1111] text-gray-300">
      {/* Newsletter Strip */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-black text-xl">Stay in the Loop! 📧</h3>
            <p className="text-orange-100 text-sm mt-0.5">Subscribe for exclusive deals, new arrivals & special offers.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-0 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 sm:w-72 px-4 py-3 rounded-l-xl text-gray-800 text-sm focus:outline-none border-2 border-transparent focus:border-white/50 bg-white placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-5 py-3 rounded-r-xl font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap border-2 border-transparent"
            >
              {subscribed ? "✓ Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* App Download Banner */}
      <div className="bg-[#131921] border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-black">S</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">Download the Secure-Mart App</div>
              <div className="text-gray-400 text-xs">Get extra 10% off + exclusive app-only deals</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-black border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl transition-colors">
              <span className="text-xl">🍎</span>
              <div className="text-left">
                <div className="text-gray-400 text-xs leading-none">Download on the</div>
                <div className="text-white text-xs font-bold">App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-2 bg-black border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl transition-colors">
              <span className="text-xl">▶️</span>
              <div className="text-left">
                <div className="text-gray-400 text-xs leading-none">Get it on</div>
                <div className="text-white text-xs font-bold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black">S</span>
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight">Secure</span>
                <span className="text-yellow-400 font-black text-xl tracking-tight">Mart</span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              India's most trusted online marketplace with 5M+ happy customers shopping across 2M+ products.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Phone size={13} className="text-yellow-400 flex-shrink-0" />
                <span>+91 1800-SECURE (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Mail size={13} className="text-yellow-400 flex-shrink-0" />
                <span>support@securemart.in</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={13} className="text-yellow-400 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-white text-xs font-semibold mb-2">Follow Us</div>
              <div className="flex items-center gap-2">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                  { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                  { Icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                  { Icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
                  { Icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
                ].map(({ Icon, color, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={label}
                    className={`w-8 h-8 rounded-lg bg-white/10 ${color} flex items-center justify-center transition-all hover:scale-110 border border-white/5`}
                  >
                    <Icon size={14} className="text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link Columns - Desktop */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="hidden lg:block">
              <h4 className="text-white font-bold text-sm mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-yellow-400">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-yellow-400 transition-colors hover:pl-1 duration-200 block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile Accordion */}
          <div className="lg:hidden grid grid-cols-2 gap-4 col-span-1">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <button
                  onClick={() => setOpenSection(openSection === section ? null : section)}
                  className="flex items-center justify-between w-full text-white font-bold text-sm pb-2 mb-2 border-b border-gray-700"
                >
                  {section}
                  <ChevronUp
                    size={14}
                    className={`transition-transform ${openSection === section ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {openSection === section && (
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 text-xs hover:text-yellow-400 transition-colors block">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges Row */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
            {["🔒 SSL Secured", "✅ ISO 27001 Certified", "🏆 Top E-commerce 2024", "⭐ Trusted by 5M+ Users", "🌿 Carbon Neutral Shipping"].map((badge, i) => (
              <span key={i} className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Secure-Mart Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-2.5 py-1 rounded-lg transition-colors ml-2"
            >
              <ChevronUp size={12} /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
