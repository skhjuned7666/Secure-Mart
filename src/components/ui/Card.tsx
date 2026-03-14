"use client";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export default function Card({
  children,
  className = "",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${className}`}
    >
      {children}
    </Component>
  );
}
