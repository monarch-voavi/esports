"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Team, Game, Region } from "@/types";
import { TeamCard } from "./TeamCard";
import { GAME_ICONS } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const GAMES: Game[] = ["CS2", "Valorant", "League of Legends", "Dota 2", "Apex Legends"];
const REGIONS: Region[] = ["NA", "EU", "APAC", "SA", "CIS", "OCE"];

export function TeamGrid() {
  const [gameFilter, setGameFilter] = useState<Game | "">("");
  const [regionFilter, setRegionFilter] = useState<Region | "">("");
  const [sortBy, setSortBy] = useState<"rank" | "winRate" | "prize">("winRate");

  const params = new URLSearchParams();
  if (gameFilter) params.set("game", gameFilter);
  if (regionFilter) params.set("region", regionFilter);

  const { data: teams, isLoading } = useSWR<Team[]>(
    `/api/teams${params.toString() ? `?${params}` : ""}`,
    fetcher
  );

  const sorted = [...(teams || [])].sort((a, b) => {
    if (sortBy === "rank") return a.rank - b.rank;
    if (sortBy === "winRate") return b.winRate - a.winRate;
    return b.prize - a.prize;
  });

  const hasFilters = gameFilter || regionFilter;

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-start">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Filters:</span>
        </div>

        {/* Game filter */}
        <div className="flex flex-wrap gap-1.5">
          {GAMES.map((g) => (
            <button
              key={g}
              onClick={() => setGameFilter(gameFilter === g ? "" : g)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                gameFilter === g
                  ? "bg-neon-green/10 border-neon-green/40 text-neon-green"
                  : "bg-dark-600 border-dark-400 text-gray-400 hover:border-dark-300 hover:text-white"
              }`}
            >
              <span>{GAME_ICONS[g]}</span>
              {g}
            </button>
          ))}
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(regionFilter === r ? "" : r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                regionFilter === r
                  ? "bg-neon-purple/10 border-neon-purple/40 text-neon-purple"
                  : "bg-dark-600 border-dark-400 text-gray-400 hover:border-dark-300 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto bg-dark-600 border border-dark-400 rounded-lg p-1">
          {(["winRate", "rank", "prize"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                sortBy === s ? "bg-neon-green text-dark-900" : "text-gray-400 hover:text-white"
              }`}
            >
              {s === "winRate" ? "Win %" : s === "rank" ? "Rank" : "Prize"}
            </button>
          ))}
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={() => { setGameFilter(""); setRegionFilter(""); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-600">
        Showing <span className="text-gray-400 font-medium">{sorted.length}</span> teams
      </p>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-52 bg-dark-700 rounded-xl border border-dark-400 animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium text-gray-500">No teams match the filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
