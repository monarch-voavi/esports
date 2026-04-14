"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { MOCK_PLAYERS } from "@/lib/mock-data/players";

const COLORS = ["#00FFA3", "#8B6FFF", "#00D4FF", "#FFB800", "#FF006E"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-dark-600 border border-dark-400 rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="text-gray-300 font-bold mb-1">{label}</p>
        <p className="text-neon-green">KDA: {payload[0]?.value?.toFixed(2)}</p>
        <p className="text-gray-400">Rating: {payload[1]?.value?.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export function TopPlayersChart() {
  const top = [...MOCK_PLAYERS]
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 8)
    .map((p, i) => ({
      name: p.name,
      kda: p.stats.kda,
      rating: p.stats.rating,
      color: COLORS[i % COLORS.length],
    }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={top} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1E2A3A80" }} />
        <Bar dataKey="kda" radius={[3, 3, 0, 0]} barSize={14}>
          {top.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
        <Bar dataKey="rating" radius={[3, 3, 0, 0]} barSize={14} fill="#8B6FFF" fillOpacity={0.5} />
      </BarChart>
    </ResponsiveContainer>
  );
}
