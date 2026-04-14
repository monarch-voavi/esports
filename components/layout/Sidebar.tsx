"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Trophy,
  Swords,
  Users,
  BarChart3,
  Zap,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bracket", label: "Brackets", icon: Trophy },
  { href: "/matches", label: "Live Matches", icon: Swords },
  { href: "/players", label: "Players", icon: BarChart3 },
  { href: "/teams", label: "Teams", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-800 border-r border-dark-400 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-dark-400">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-neon flex items-center justify-center shadow-neon-green">
            <Zap className="w-5 h-5 text-dark-900 fill-current" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">ESPORTS</p>
            <p className="text-neon-green text-xs font-semibold tracking-widest">ANALYTICS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider px-3 mb-3">
          Navigation
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                  : "text-gray-400 hover:text-white hover:bg-dark-600"
              )}
            >
              <Icon className={cn("w-4 h-4", active ? "text-neon-green" : "group-hover:text-white")} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-neon-green" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-400">
        <div className="bg-dark-600 rounded-lg p-3 border border-dark-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs text-neon-green font-semibold">LIVE DATA</span>
          </div>
          <p className="text-xs text-gray-500">Auto-refreshing every 30s</p>
          <p className="text-xs text-gray-600 mt-1">Mock API · v2.4.1</p>
        </div>
      </div>
    </aside>
  );
}
