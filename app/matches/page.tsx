import { Header } from "@/components/layout/Header";
import { LiveMatches } from "@/components/matches/LiveMatches";
import { MOCK_MATCHES } from "@/lib/mock-data/matches";
import { formatNumber } from "@/lib/utils";
import { Eye, Swords, Clock } from "lucide-react";

export default function MatchesPage() {
  const liveMatches = MOCK_MATCHES.filter((m) => m.status === "live");
  const totalViewers = liveMatches.reduce((s, m) => s + (m.viewers || 0), 0);
  const upcomingCount = MOCK_MATCHES.filter((m) => m.status === "upcoming").length;

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Live Matches" subtitle="Auto-refreshing every 30 seconds" />

      <div className="flex-1 p-6 space-y-6">
        {/* Quick stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-dark-700 border border-red-500/30 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
              <Swords className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-xl font-black text-red-400">{liveMatches.length}</p>
              <p className="text-xs text-gray-500">Live Now</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-dark-700 border border-dark-400 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-neon-green" />
            </div>
            <div>
              <p className="text-xl font-black text-neon-green">{formatNumber(totalViewers)}</p>
              <p className="text-xs text-gray-500">Live Viewers</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-dark-700 border border-dark-400 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-xl font-black text-yellow-400">{upcomingCount}</p>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>

        {/* All matches with filters */}
        <LiveMatches filter="all" />
      </div>
    </div>
  );
}
