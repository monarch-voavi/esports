"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "green" | "purple" | "blue" | "none";
  hover?: boolean;
}

export function Card({ children, className, glow = "none", hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-dark-700 border border-dark-400 rounded-xl p-4",
        glow === "green" && "shadow-neon-green border-neon-green/30",
        glow === "purple" && "shadow-neon-purple border-neon-purple/30",
        glow === "blue" && "shadow-[0_0_20px_rgba(0,212,255,0.3)] border-neon-blue/30",
        hover && "transition-all duration-200 hover:border-neon-green/50 hover:shadow-neon-green cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  accent?: string;
  trend?: number;
}

export function StatCard({ label, value, sub, icon, accent = "#00FFA3", trend }: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-white" style={{ color: accent }}>
            {value}
          </p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
          {trend !== undefined && (
            <p className={cn("text-xs mt-1 font-medium", trend >= 0 ? "text-neon-green" : "text-red-400")}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last week
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}30` }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
