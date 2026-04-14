"use client";

import { cn } from "@/lib/utils";
import type { Tournament, BracketMatch, BracketTeam } from "@/types";
import { Trophy, Minus } from "lucide-react";

interface BracketMatchCardProps {
  match: BracketMatch;
  isCompact?: boolean;
}

function TeamSlot({ team, isWinner, score }: { team: BracketTeam | null; isWinner: boolean; score?: number }) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-600/50 border border-dark-400/50">
        <div className="w-5 h-5 rounded border border-dashed border-dark-400 flex items-center justify-center">
          <Minus className="w-3 h-3 text-dark-300" />
        </div>
        <span className="text-xs text-gray-600 italic">TBD</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
        isWinner
          ? "bg-neon-green/10 border-neon-green/40 shadow-neon-green"
          : "bg-dark-600/50 border-dark-400/60 opacity-70"
      )}
    >
      {/* Seed */}
      <span className="text-[10px] text-gray-600 w-4 text-center font-mono">{team.seed}</span>
      {/* Color dot */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: team.color, boxShadow: `0 0 6px ${team.color}60` }}
      />
      {/* Name */}
      <span className={cn(
        "text-xs font-bold flex-1",
        isWinner ? "text-neon-green" : "text-gray-300"
      )}>
        {team.shortName}
      </span>
      {/* Score */}
      {score !== undefined && (
        <span className={cn(
          "text-sm font-mono font-bold w-5 text-right",
          isWinner ? "text-white" : "text-gray-500"
        )}>
          {score}
        </span>
      )}
      {isWinner && <Trophy className="w-3 h-3 text-neon-green flex-shrink-0" />}
    </div>
  );
}

function BracketMatchCard({ match }: BracketMatchCardProps) {
  const aWon = match.winner === match.teamA?.id;
  const bWon = match.winner === match.teamB?.id;

  return (
    <div className={cn(
      "w-52 rounded-xl border overflow-hidden",
      match.status === "live" && "border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)]",
      match.status === "completed" && "border-dark-300",
      match.status === "upcoming" && "border-dark-400/60",
    )}>
      {/* Status header */}
      <div className={cn(
        "px-3 py-1 flex items-center justify-between",
        match.status === "live" && "bg-red-500/20",
        match.status === "completed" && "bg-dark-500",
        match.status === "upcoming" && "bg-dark-600",
      )}>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          {match.status === "live" ? (
            <span className="text-red-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
              LIVE
            </span>
          ) : match.status === "completed" ? "FINAL" : "UPCOMING"}
        </span>
      </div>

      {/* Teams */}
      <div className="bg-dark-700 p-2 space-y-1.5">
        <TeamSlot
          team={match.teamA}
          isWinner={aWon}
          score={match.score?.[0]}
        />
        <div className="border-t border-dark-500/50" />
        <TeamSlot
          team={match.teamB}
          isWinner={bWon}
          score={match.score?.[1]}
        />
      </div>
    </div>
  );
}

interface TournamentBracketProps {
  tournament: Tournament;
}

export function TournamentBracket({ tournament }: TournamentBracketProps) {
  const sortedRounds = [...tournament.rounds].sort((a, b) => a.order - b.order);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max px-2">
        {sortedRounds.map((round, roundIdx) => (
          <div key={round.id} className="flex flex-col">
            {/* Round header */}
            <div className="mb-4 text-center">
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border",
                roundIdx === sortedRounds.length - 1
                  ? "text-neon-green border-neon-green/30 bg-neon-green/10"
                  : "text-gray-400 border-dark-400 bg-dark-600"
              )}>
                {round.name}
              </span>
            </div>

            {/* Matches column */}
            <div
              className="flex flex-col justify-around gap-4"
              style={{ minHeight: `${Math.max(round.matches.length, 1) * 110}px` }}
            >
              {round.matches.map((match) => (
                <BracketMatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
