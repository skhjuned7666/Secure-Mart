"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white hover:shadow-lg",
  secondary: "bg-gray-900 text-white hover:bg-gray-800",
  outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  success: "bg-green-500 text-white hover:bg-green-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
