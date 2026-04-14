"use client";

import useSWR from "swr";
import { MatchCard } from "./MatchCard";
import type { Match } from "@/types";
import { RefreshCw, Wifi } from "lucide-react";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface LiveMatchesProps {
  filter?: "live" | "upcoming" | "completed" | "all";
}

export function LiveMatches({ filter = "all" }: LiveMatchesProps) {
  const [activeFilter, setActiveFilter] = useState<string>(filter === "all" ? "all" : filter);

  const url = activeFilter === "all"
    ? "/api/matches"
    : `/api/matches?status=${activeFilter}`;

  const { data: matches, isLoading, isValidating, mutate } = useSWR<Match[]>(
    url,
    fetcher,
    { refreshInterval: 30000 }
  );

  const filters = [
    { key: "all", label: "All" },
    { key: "live", label: "Live" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Recent" },
  ];

  return (
    <div className="space-y-4">
      {/* Filter + status bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-dark-600 rounded-lg border border-dark-400 p-1 gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeFilter === f.key
                  ? "bg-neon-green text-dark-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {f.label}
              {f.key === "live" && matches?.filter((m) => m.status === "live").length ? (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px]">
                  {matches.filter((m) => m.status === "live").length}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isValidating && (
            <span className="flex items-center gap-1 text-xs text-neon-green">
              <Wifi className="w-3 h-3 animate-pulse" />
              <span className="hidden sm:inline">Refreshing…</span>
            </span>
          )}
          <button
            onClick={() => mutate()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 bg-dark-600 border border-dark-400 rounded-lg hover:text-neon-green hover:border-neon-green/30 transition-all"
          >
            <RefreshCw className={`w-3 h-3 ${isValidating ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-dark-700 rounded-xl border border-dark-400 animate-pulse" />
          ))}
        </div>
      ) : !matches?.length ? (
        <div className="text-center py-16 text-gray-600">
          <p className="text-4xl mb-3">🎮</p>
          <p className="font-medium text-gray-500">No matches found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
