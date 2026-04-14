"use client";

import type { Player } from "@/types";
import { WinRateChart } from "./WinRateChart";
import { KDAChart } from "./KDAChart";
import { PerformanceHistoryChart } from "./PerformanceHistoryChart";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, ChevronUp, Crosshair, Star, Target } from "lucide-react";
import { useState } from "react";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const [expanded, setExpanded] = useState(false);
  const team = MOCK_TEAMS.find((t) => t.id === player.teamId);

  const getRatingColor = (r: number) => {
    if (r >= 1.4) return "#00FFA3";
    if (r >= 1.2) return "#8B6FFF";
    if (r >= 1.0) return "#FFB800";
    return "#FF006E";
  };

  return (
    <Card className="overflow-hidden p-0">
      {/* Top accent */}
      <div className="h-1" style={{ backgroundColor: team?.color || "#00FFA3" }} />

      <div className="p-4">
        {/* Player header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar placeholder */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-dark-900 flex-shrink-0"
            style={{ backgroundColor: team?.color || "#00FFA3", boxShadow: `0 0 14px ${team?.color || "#00FFA3"}50` }}
          >
            {player.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-white text-sm truncate">{player.name}</span>
              <span className="text-base">{player.nationality === "US" ? "🇺🇸" : player.nationality === "SE" ? "🇸🇪" : player.nationality === "KR" ? "🇰🇷" : player.nationality === "FR" ? "🇫🇷" : player.nationality === "DE" ? "🇩🇪" : player.nationality === "DK" ? "🇩🇰" : player.nationality === "RO" ? "🇷🇴" : player.nationality === "RU" ? "🇷🇺" : "🌍"}</span>
            </div>
            <p className="text-xs text-gray-500">{player.realName}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="purple" size="sm">{player.role}</Badge>
              {team && (
                <span className="text-[10px] text-gray-600 font-medium">{team.shortName}</span>
              )}
            </div>
          </div>
          {/* Rating */}
          <div className="text-right flex-shrink-0">
            <div
              className="text-xl font-black"
              style={{ color: getRatingColor(player.stats.rating) }}
            >
              {player.stats.rating.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-600 uppercase tracking-wide">Rating</div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "K/D/A", value: `${player.stats.kda.toFixed(2)}`, icon: <Crosshair className="w-3 h-3" />, color: "#00FFA3" },
            { label: "HS%", value: `${player.stats.headshots.toFixed(0)}%`, icon: <Target className="w-3 h-3" />, color: "#8B6FFF" },
            { label: "Games", value: player.stats.gamesPlayed, icon: <Star className="w-3 h-3" />, color: "#FFB800" },
          ].map((s) => (
            <div key={s.label} className="bg-dark-600 rounded-lg p-2 border border-dark-400 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-500 mb-1" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="text-sm font-black text-white">{s.value}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Win rate + mini chart */}
        <div className="flex items-center gap-4 mb-3">
          <WinRateChart winRate={player.stats.winRate} size={80} />
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1 font-medium">Last 14 Games</p>
            <PerformanceHistoryChart history={player.history} height={70} />
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-neon-green transition-colors py-1 border-t border-dark-500"
        >
          {expanded ? (
            <>Hide KDA Trend <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Show KDA Trend <ChevronDown className="w-3 h-3" /></>
          )}
        </button>

        {/* Expanded KDA chart */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-dark-500 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 font-medium">KDA / Rating Trend (20 games)</p>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-neon-green inline-block" />KDA</span>
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-neon-purple inline-block" />Rating</span>
              </div>
            </div>
            <KDAChart history={player.history} height={160} />
          </div>
        )}
      </div>
    </Card>
  );
}
