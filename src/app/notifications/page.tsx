"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, Tag, Truck, Percent } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Deal of the day",
    message: "Up to 50% OFF on electronics. Limited time!",
    icon: Tag,
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Order shipped",
    message: "Your order #SM-12345 has been dispatched.",
    icon: Truck,
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Flash sale",
    message: "Extra 10% off on Fashion. Use code SAVE10.",
    icon: Percent,
    time: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={24} />
          Notifications
        </h1>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell size={40} className="mx-auto text-gray-300 mb-3" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {MOCK_NOTIFICATIONS.map((n) => (
                <li
                  key={n.id}
                  className={`flex gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    !n.read ? "bg-amber-50/50" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <n.icon size={18} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{n.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-orange-600 font-medium hover:underline text-sm">
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
