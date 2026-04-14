"use client";

import { Bell, Search, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [time, setTime] = useState("");
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLastRefresh((p) => (p + 1) % 30), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-400 flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-500" />
        <input
          className="bg-dark-600 border border-dark-400 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300
            placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1
            focus:ring-neon-green/20 w-48 transition-all"
          placeholder="Search teams, players…"
        />
      </div>

      {/* Refresh indicator */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <RefreshCw className={`w-3 h-3 ${lastRefresh < 3 ? "text-neon-green animate-spin-slow" : "text-gray-600"}`} />
        <span className="hidden sm:inline">
          {30 - lastRefresh}s
        </span>
      </div>

      {/* Clock */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-sm text-neon-green border border-neon-green/20 bg-neon-green/5 rounded-lg px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
        {time}
      </div>

      {/* Bell */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-dark-600 border border-dark-400 hover:border-neon-purple/40 transition-colors">
        <Bell className="w-4 h-4 text-gray-400" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-neon-purple" />
      </button>
    </header>
  );
}
