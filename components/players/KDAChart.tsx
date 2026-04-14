"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { PerformanceHistory } from "@/types";

interface KDAChartProps {
  history: PerformanceHistory[];
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-dark-600 border border-dark-400 rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-neon-green font-bold">KDA: {payload[0]?.value?.toFixed(2)}</p>
        <p className="text-neon-purple">Rating: {payload[1]?.value?.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export function KDAChart({ history, height = 200 }: KDAChartProps) {
  const data = history.map((h) => ({
    date: h.date.slice(5),
    kda: h.kda,
    rating: h.rating,
    win: h.win,
  }));

  const avgKda = data.reduce((s, d) => s + d.kda, 0) / data.length;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="kdaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00FFA3" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B6FFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B6FFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={avgKda} stroke="#00FFA3" strokeDasharray="4 2" strokeOpacity={0.4} />
        <Area
          type="monotone"
          dataKey="kda"
          stroke="#00FFA3"
          strokeWidth={2}
          fill="url(#kdaGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#00FFA3" }}
        />
        <Area
          type="monotone"
          dataKey="rating"
          stroke="#8B6FFF"
          strokeWidth={2}
          fill="url(#ratingGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#8B6FFF" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
