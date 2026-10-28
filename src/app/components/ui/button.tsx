import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]": variant === "primary",
          "bg-[var(--neutral-bg)] text-[var(--text-main)] hover:bg-[var(--border-strong)]": variant === "secondary",
          "border border-[var(--border-strong)] bg-white text-[var(--text-main)] hover:bg-[var(--bg-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary-text)] dark:bg-transparent dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-blue-500": variant === "outline",
          "bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text-main)] dark:hover:bg-gray-800 dark:text-gray-100": variant === "ghost",
          "bg-[#DC2626] text-white hover:bg-[#B91C1C] dark:bg-red-500 dark:hover:bg-red-600": variant === "danger",
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4 py-2": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
