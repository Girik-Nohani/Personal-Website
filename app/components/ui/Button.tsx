import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" && "bg-accent-yellow text-background hover:bg-accent-yellow/90",
        variant === "secondary" && "border border-accent-teal text-accent-teal hover:bg-accent-teal/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}