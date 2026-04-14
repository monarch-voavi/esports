"use client";

import type { Team } from "@/types";
import { formatCurrency, GAME_ICONS } from "@/lib/utils";
import { Trophy, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface TeamCardProps {
  team: Team;
}

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

export function TeamCard({ team }: TeamCardProps) {
  const rankColor = RANK_COLORS[team.rank - 1] || "#6B7280";
  const winPct = ((team.wins / (team.wins + team.losses)) * 100).toFixed(0);

  return (
    <div className="bg-dark-700 rounded-xl border border-dark-400 overflow-hidden hover:border-opacity-80 transition-all duration-200 hover:-translate-y-0.5 group"
      style={{ "--accent": team.color } as React.CSSProperties}
    >
      {/* Top bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${team.color}, ${team.color}80)` }} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-dark-900 shadow-md transition-transform group-hover:scale-105"
              style={{
                backgroundColor: team.color,
                boxShadow: `0 0 16px ${team.color}40`,
              }}
            >
              {team.shortName.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-black text-white text-sm leading-tight">{team.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-sm">{GAME_ICONS[team.game] || "🎮"}</span>
                <span className="text-xs text-gray-500">{team.game}</span>
              </div>
            </div>
          </div>
          {/* Rank badge */}
          <div className="text-right">
            <div
              className="text-xl font-black"
              style={{ color: rankColor }}
            >
              #{team.rank}
            </div>
            <Badge
              variant={team.region === "NA" ? "blue" : team.region === "EU" ? "purple" : "green"}
              size="sm"
            >
              {team.region}
            </Badge>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-dark-600 rounded-lg p-2 border border-dark-500 text-center">
            <div className="text-sm font-black text-neon-green">{winPct}%</div>
            <div className="text-[10px] text-gray-600 uppercase tracking-wide">Win Rate</div>
          </div>
          <div className="bg-dark-600 rounded-lg p-2 border border-dark-500 text-center">
            <div className="text-sm font-black text-white">{team.wins}W</div>
            <div className="text-[10px] text-gray-600 uppercase tracking-wide">{team.losses}L</div>
          </div>
          <div className="bg-dark-600 rounded-lg p-2 border border-dark-500 text-center">
            <div className="text-sm font-black text-neon-purple">{formatCurrency(team.prize)}</div>
            <div className="text-[10px] text-gray-600 uppercase tracking-wide">Earned</div>
          </div>
        </div>

        {/* Win rate bar */}
        <div className="mb-3">
          <div className="h-1.5 bg-dark-500 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${winPct}%`,
                background: `linear-gradient(90deg, ${team.color}, ${team.color}cc)`,
                boxShadow: `0 0 8px ${team.color}60`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {team.players.length} players
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Est. {team.founded}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {team.coach.split(" ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
