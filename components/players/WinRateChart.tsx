"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

interface WinRateChartProps {
  winRate: number;
  size?: number;
}

export function WinRateChart({ winRate, size = 120 }: WinRateChartProps) {
  const data = [{ value: winRate, fill: winRate >= 70 ? "#00FFA3" : winRate >= 50 ? "#8B6FFF" : "#FF006E" }];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={8}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: "#1E2A3A" }}
            dataKey="value"
            angleAxisId={0}
            data={data}
            cornerRadius={4}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-xl font-black"
          style={{ color: winRate >= 70 ? "#00FFA3" : winRate >= 50 ? "#8B6FFF" : "#FF006E" }}
        >
          {winRate.toFixed(0)}%
        </span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Win Rate</span>
      </div>
    </div>
  );
}
