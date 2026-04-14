"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";
import { GAME_COLORS } from "@/lib/utils";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-dark-600 border border-dark-400 rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="font-bold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
        <p className="text-gray-300">{payload[0].value} teams</p>
      </div>
    );
  }
  return null;
};

export function GameDistributionChart() {
  const counts: Record<string, number> = {};
  MOCK_TEAMS.forEach((t) => {
    counts[t.game] = (counts[t.game] || 0) + 1;
  });

  const data = Object.entries(counts).map(([game, count]) => ({
    name: game,
    value: count,
    color: GAME_COLORS[game] || "#6B7280",
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="45%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.color}
              stroke="transparent"
              style={{ filter: `drop-shadow(0 0 6px ${entry.color}50)` }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-gray-400">{value}</span>
          )}
          wrapperStyle={{ fontSize: "11px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
