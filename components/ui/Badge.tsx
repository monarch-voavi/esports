import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "purple" | "blue" | "red" | "yellow" | "gray" | "live";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "gray", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full uppercase tracking-wide",
        size === "sm" && "px-2 py-0.5 text-[10px]",
        size === "md" && "px-2.5 py-1 text-xs",
        variant === "green" && "bg-neon-green/15 text-neon-green border border-neon-green/30",
        variant === "purple" && "bg-neon-purple/15 text-neon-purple border border-neon-purple/30",
        variant === "blue" && "bg-neon-blue/15 text-neon-blue border border-neon-blue/30",
        variant === "red" && "bg-red-500/15 text-red-400 border border-red-500/30",
        variant === "yellow" && "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
        variant === "gray" && "bg-dark-400 text-gray-400 border border-dark-300",
        variant === "live" && "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse",
        className
      )}
    >
      {variant === "live" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
      {children}
    </span>
  );
}
