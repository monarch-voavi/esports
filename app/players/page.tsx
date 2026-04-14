import { Header } from "@/components/layout/Header";
import { PlayerCard } from "@/components/players/PlayerCard";
import { MOCK_PLAYERS } from "@/lib/mock-data/players";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";
import { Card } from "@/components/ui/Card";
import { BarChart3, Star, Target, Crosshair } from "lucide-react";

export default function PlayersPage() {
  const topRated = [...MOCK_PLAYERS].sort((a, b) => b.stats.rating - a.stats.rating)[0];
  const topKda = [...MOCK_PLAYERS].sort((a, b) => b.stats.kda - a.stats.kda)[0];
  const topWin = [...MOCK_PLAYERS].sort((a, b) => b.stats.winRate - a.stats.winRate)[0];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Player Stats" subtitle="KDA, win rate, and performance history" />

      <div className="flex-1 p-6 space-y-6">
        {/* Spotlight row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Highest Rating",
              player: topRated,
              value: topRated?.stats.rating.toFixed(2),
              icon: <Star className="w-5 h-5 text-yellow-400" />,
              color: "#FFB800",
            },
            {
              label: "Best KDA",
              player: topKda,
              value: topKda?.stats.kda.toFixed(2),
              icon: <Crosshair className="w-5 h-5 text-neon-green" />,
              color: "#00FFA3",
            },
            {
              label: "Highest Win Rate",
              player: topWin,
              value: `${topWin?.stats.winRate.toFixed(1)}%`,
              icon: <Target className="w-5 h-5 text-neon-purple" />,
              color: "#8B6FFF",
            },
          ].map(({ label, player, value, icon, color }) => {
            const team = MOCK_TEAMS.find((t) => t.id === player?.teamId);
            return (
              <Card key={label} glow={color === "#00FFA3" ? "green" : color === "#8B6FFF" ? "purple" : "none"}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    {icon}
                  </div>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-white text-sm">{player?.name}</p>
                    <p className="text-xs text-gray-600">{team?.shortName} · {player?.role}</p>
                  </div>
                  <span className="text-2xl font-black" style={{ color }}>{value}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Section header */}
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-neon-green" />
          <h2 className="text-base font-bold text-white">All Players</h2>
          <span className="text-xs text-gray-600 ml-1">— click a card to expand KDA trend</span>
        </div>

        {/* Player cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {MOCK_PLAYERS.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}
