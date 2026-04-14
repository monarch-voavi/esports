"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { PerformanceHistory } from "@/types";

interface PerformanceHistoryChartProps {
  history: PerformanceHistory[];
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-dark-600 border border-dark-400 rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className={d.win ? "text-neon-green font-bold" : "text-red-400 font-bold"}>
          {d.win ? "✓ Win" : "✗ Loss"} vs {d.opponent}
        </p>
        <p className="text-gray-300 mt-1">KDA: <span className="text-neon-green">{d.kda.toFixed(2)}</span></p>
      </div>
    );
  }
  return null;
};

export function PerformanceHistoryChart({ history, height = 160 }: PerformanceHistoryChartProps) {
  const data = history.slice(-14).map((h) => ({
    date: h.date.slice(5),
    kda: h.kda,
    win: h.win,
    opponent: h.opponent,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={12}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: "#6B7280", fontSize: 9 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#6B7280", fontSize: 9 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1E2A3A80" }} />
        <Bar dataKey="kda" radius={[3, 3, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.win ? "#00FFA3" : "#FF006E"}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
