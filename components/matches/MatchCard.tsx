"use client";

import type { Match } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime, formatCountdown, formatNumber, GAME_ICONS } from "@/lib/utils";
import { Eye, Map, Radio, Clock } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const aScore = match.teamA.score;
  const bScore = match.teamB.score;
  const aLeading = aScore > bScore;
  const bLeading = bScore > aScore;

  return (
    <div className={`
      relative bg-dark-700 rounded-xl border overflow-hidden transition-all duration-200
      hover:border-neon-purple/40 group
      ${isLive ? "border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]" : "border-dark-400"}
    `}>
      {/* Live pulse bar */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-red-500 animate-pulse" />
      )}

      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-dark-500">
        <div className="flex items-center gap-2">
          <span className="text-base">{GAME_ICONS[match.game] || "🎮"}</span>
          <span className="text-xs text-gray-400 font-medium truncate max-w-[140px]">
            {match.tournamentName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {match.round && (
            <span className="text-[10px] text-gray-600 uppercase tracking-wide hidden sm:block">
              {match.round}
            </span>
          )}
          {isLive ? (
            <Badge variant="live" size="sm">LIVE</Badge>
          ) : isUpcoming ? (
            <Badge variant="yellow" size="sm">
              <Clock className="w-2.5 h-2.5" />
              {formatCountdown(match.scheduledAt)}
            </Badge>
          ) : (
            <Badge variant="gray" size="sm">Final</Badge>
          )}
        </div>
      </div>

      {/* Score area */}
      <div className="px-4 py-4 flex items-center gap-3">
        {/* Team A */}
        <div className="flex-1 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-dark-900"
              style={{ backgroundColor: match.teamA.color }}
            >
              {match.teamA.shortName.slice(0, 2)}
            </div>
            <span className="font-bold text-sm text-white truncate">{match.teamA.shortName}</span>
          </div>
        </div>

        {/* Scores */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-3xl font-black font-mono tabular-nums ${aLeading ? "text-neon-green" : "text-gray-300"}`}>
            {aScore}
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs text-gray-600">—</span>
          </div>
          <span className={`text-3xl font-black font-mono tabular-nums ${bLeading ? "text-neon-green" : "text-gray-300"}`}>
            {bScore}
          </span>
        </div>

        {/* Team B */}
        <div className="flex-1 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white truncate">{match.teamB.shortName}</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-dark-900"
              style={{ backgroundColor: match.teamB.color }}
            >
              {match.teamB.shortName.slice(0, 2)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-3">
          {match.map && (
            <span className="flex items-center gap-1">
              <Map className="w-3 h-3" />
              {match.map}
            </span>
          )}
          {isLive && match.viewers != null && match.viewers > 0 && (
            <span className="flex items-center gap-1 text-red-400">
              <Eye className="w-3 h-3" />
              {formatNumber(match.viewers)}
            </span>
          )}
        </div>
        <span className="text-gray-600">
          {isLive
            ? <span className="flex items-center gap-1 text-red-400/80"><Radio className="w-3 h-3" />Live now</span>
            : formatRelativeTime(match.scheduledAt)
          }
        </span>
      </div>
    </div>
  );
}
