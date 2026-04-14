import { Header } from "@/components/layout/Header";
import { TeamGrid } from "@/components/teams/TeamGrid";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";
import { formatCurrency } from "@/lib/utils";
import { Trophy, TrendingUp, Globe } from "lucide-react";

export default function TeamsPage() {
  const topTeam = [...MOCK_TEAMS].sort((a, b) => b.winRate - a.winRate)[0];
  const totalPrize = MOCK_TEAMS.reduce((s, t) => s + t.prize, 0);
  const regions = new Set(MOCK_TEAMS.map((t) => t.region)).size;

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Teams" subtitle="Filter by game and region" />

      <div className="flex-1 p-6 space-y-6">
        {/* Quick stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-dark-700 border border-neon-green/20 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-neon-green" />
            </div>
            <div>
              <p className="text-sm font-black text-neon-green">{topTeam?.name}</p>
              <p className="text-xs text-gray-500">Top Ranked Team ({topTeam?.winRate}% WR)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-dark-700 border border-dark-400 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-neon-purple" />
            </div>
            <div>
              <p className="text-xl font-black text-neon-purple">{formatCurrency(totalPrize)}</p>
              <p className="text-xs text-gray-500">Total Prize Earned</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-dark-700 border border-dark-400 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{regions}</p>
              <p className="text-xs text-gray-500">Active Regions</p>
            </div>
          </div>
        </div>

        <TeamGrid />
      </div>
    </div>
  );
}
