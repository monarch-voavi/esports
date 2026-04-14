import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const abs = Math.abs(diff);
  const minutes = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  if (diff > 0) {
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  } else {
    if (minutes < 60) return `in ${minutes}m`;
    return `in ${hours}h`;
  }
}

export function formatCountdown(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Now";
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const GAME_COLORS: Record<string, string> = {
  "CS2": "#00D4FF",
  "Valorant": "#FF4655",
  "League of Legends": "#C9AA71",
  "Dota 2": "#EF4444",
  "Apex Legends": "#E8423B",
};

export const GAME_ICONS: Record<string, string> = {
  "CS2": "🎯",
  "Valorant": "⚡",
  "League of Legends": "⚔️",
  "Dota 2": "🏆",
  "Apex Legends": "🔫",
};
