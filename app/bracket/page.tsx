"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { TournamentBracket } from "@/components/bracket/TournamentBracket";
import { MOCK_TOURNAMENTS } from "@/lib/mock-data/tournaments";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, GAME_ICONS } from "@/lib/utils";
import { Trophy, Calendar, DollarSign, GitBranch } from "lucide-react";

export default function BracketPage() {
  const [activeTournament, setActiveTournament] = useState(MOCK_TOURNAMENTS[0].id);
  const tournament = MOCK_TOURNAMENTS.find((t) => t.id === activeTournament)!;

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Tournament Brackets" subtitle="Single & double elimination visualizations" />

      <div className="flex-1 p-6 space-y-6">
        {/* Tournament selector */}
        <div className="flex flex-wrap gap-3">
          {MOCK_TOURNAMENTS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTournament(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                activeTournament === t.id
                  ? "bg-neon-green/10 border-neon-green/40 text-neon-green shadow-neon-green"
                  : "bg-dark-700 border-dark-400 text-gray-400 hover:border-dark-300 hover:text-white"
              }`}
            >
              <span>{GAME_ICONS[t.game]}</span>
              {t.name}
              <Badge
                variant={t.status === "ongoing" ? "live" : t.status === "upcoming" ? "yellow" : "gray"}
                size="sm"
              >
                {t.status}
              </Badge>
            </button>
          ))}
        </div>

        {/* Tournament info */}
        <div className="bg-dark-700 rounded-xl border border-dark-400 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{GAME_ICONS[tournament.game]}</span>
                <h2 className="text-xl font-black text-white">{tournament.name}</h2>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant={tournament.status === "ongoing" ? "live" : "yellow"} size="sm">
                  {tournament.status.toUpperCase()}
                </Badge>
                <Badge variant="purple" size="sm">{tournament.region}</Badge>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {tournament.bracketType === "single" ? "Single Elimination" : "Double Elimination"}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-neon-green font-black text-lg">
                  <DollarSign className="w-4 h-4" />
                  {formatCurrency(tournament.prizePool)}
                </div>
                <div className="text-xs text-gray-500">Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-neon-purple font-black text-lg">
                  <Trophy className="w-4 h-4" />
                  {tournament.teams.length}
                </div>
                <div className="text-xs text-gray-500">Teams</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-300 font-bold text-sm">
                  <Calendar className="w-3 h-3" />
                  {tournament.startDate}
                </div>
                <div className="text-xs text-gray-500">Start Date</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-5 pb-4 border-b border-dark-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-red-500/60 bg-red-500/10 inline-block" />
              Live match
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-dark-300 bg-dark-500 inline-block" />
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-dark-400/60 bg-dark-600/50 inline-block" />
              Upcoming / TBD
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-neon-green/40 bg-neon-green/10 inline-block" />
              Winner
            </span>
          </div>

          {/* Bracket */}
          <TournamentBracket tournament={tournament} />
        </div>
      </div>
    </div>
  );
}
