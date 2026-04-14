import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/ui/Card";
import { Card } from "@/components/ui/Card";
import { LiveMatches } from "@/components/matches/LiveMatches";
import { TopPlayersChart } from "@/components/dashboard/TopPlayersChart";
import { GameDistributionChart } from "@/components/dashboard/GameDistributionChart";
import { MOCK_MATCHES } from "@/lib/mock-data/matches";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";
import { MOCK_PLAYERS } from "@/lib/mock-data/players";
import { MOCK_TOURNAMENTS } from "@/lib/mock-data/tournaments";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Trophy,
  Swords,
  Users,
  BarChart3,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const liveCount = MOCK_MATCHES.filter((m) => m.status === "live").length;
  const totalPrize = MOCK_TOURNAMENTS.reduce((s, t) => s + t.prizePool, 0);
  const activeTournaments = MOCK_TOURNAMENTS.filter((t) => t.status === "ongoing").length;

  const topTeams = [...MOCK_TEAMS]
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 5);

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard" subtitle="Esports Analytics Overview" />

      <div className="flex-1 p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Tournaments"
            value={activeTournaments}
            sub="Ongoing right now"
            icon={<Trophy className="w-5 h-5 text-neon-green" />}
            accent="#00FFA3"
            trend={12}
          />
          <StatCard
            label="Live Matches"
            value={liveCount}
            sub="Being played now"
            icon={<Swords className="w-5 h-5 text-red-400" />}
            accent="#FF4444"
          />
          <StatCard
            label="Total Teams"
            value={MOCK_TEAMS.length}
            sub="Across all games"
            icon={<Users className="w-5 h-5 text-neon-purple" />}
            accent="#8B6FFF"
            trend={8}
          />
          <StatCard
            label="Prize Pool"
            value={formatCurrency(totalPrize)}
            sub="This season"
            icon={<DollarSign className="w-5 h-5 text-yellow-400" />}
            accent="#FFB800"
            trend={23}
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Live matches */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Live & Upcoming Matches</h2>
              <Link
                href="/matches"
                className="text-xs text-neon-green hover:underline flex items-center gap-1"
              >
                View all <span aria-hidden>→</span>
              </Link>
            </div>
            <LiveMatches filter="all" />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Game distribution */}
            <Card>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-neon-purple" />
                Teams by Game
              </h3>
              <GameDistributionChart />
            </Card>

            {/* Top teams leaderboard */}
            <Card>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                Top Teams (Win %)
              </h3>
              <div className="space-y-2">
                {topTeams.map((team, i) => (
                  <div key={team.id} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-600 w-4">{i + 1}</span>
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black text-dark-900 flex-shrink-0"
                      style={{ backgroundColor: team.color }}
                    >
                      {team.shortName.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-white truncate">{team.shortName}</span>
                        <span className="text-xs font-bold" style={{ color: team.color }}>
                          {team.winRate}%
                        </span>
                      </div>
                      <div className="h-1 bg-dark-500 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${team.winRate}%`,
                            backgroundColor: team.color,
                            boxShadow: `0 0 6px ${team.color}50`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Top players chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neon-green" />
              Top Players — KDA & Rating
            </h2>
            <Link href="/players" className="text-xs text-neon-green hover:underline">
              View all players →
            </Link>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-neon-green inline-block opacity-85" />KDA ratio
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-neon-purple inline-block opacity-50" />Performance rating
            </span>
          </div>
          <TopPlayersChart />
        </Card>
      </div>
    </div>
  );
}
