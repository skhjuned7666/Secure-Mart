"use client";

import { useState } from "react";

export type TabItem = { id: string; label: string };

type TabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  children: React.ReactNode | ((activeId: string) => React.ReactNode);
  /** Optional class for the tab list and panel container */
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export default function Tabs({
  tabs,
  defaultTabId,
  onChange,
  children,
  className = "",
  activeClassName = "text-orange-600 border-b-2 border-orange-500 bg-orange-50/50",
  inactiveClassName = "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
}: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? "");

  const handleTab = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const content =
    typeof children === "function" ? children(activeId) : children;

  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
              activeId === tab.id ? activeClassName : inactiveClassName
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-5 min-h-[200px]">{content}</div>
    </div>
  );
}
