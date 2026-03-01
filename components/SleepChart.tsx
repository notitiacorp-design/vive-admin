"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface SleepDataPoint {
  date: string;
  score: number;
  duration: number;
}

interface SleepChartProps {
  data: SleepDataPoint[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;
  const score = payload.find((p) => p.dataKey === "score")?.value as number | undefined;
  const duration = payload.find((p) => p.dataKey === "duration")?.value as number | undefined;

  return (
    <div className="rounded-xl border border-[#2A2A38] bg-[#1C1C28] px-4 py-3 shadow-2xl">
      <p className="text-xs font-semibold text-[#A8A8C0] mb-2">{label}</p>
      {score !== undefined && (
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#3D8BFF] flex-shrink-0" />
          <span className="text-xs text-[#A8A8C0]">Score</span>
          <span className="ml-auto text-xs font-bold text-[#F2F2F8]">{score}</span>
        </div>
      )}
      {duration !== undefined && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
          <span className="text-xs text-[#A8A8C0]">DurÃ©e</span>
          <span className="ml-auto text-xs font-bold text-[#F2F2F8]">{duration}h</span>
        </div>
      )}
    </div>
  );
}

function SleepChartInner({ data }: SleepChartProps) {
  return (
    <div className="w-full rounded-2xl border border-[#2A2A38] bg-[#1C1C28] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#F2F2F8]">Sleep Quality</h3>
          <p className="text-xs text-[#A8A8C0] mt-0.5">Score &amp; durÃ©e dans le temps</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D8BFF]" />
            <span className="text-xs text-[#A8A8C0]">Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            <span className="text-xs text-[#A8A8C0]">Duration</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3D8BFF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3D8BFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A38" vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fill: "#A8A8C0", fontSize: 11 }}
            axisLine={{ stroke: "#2A2A38" }}
            tickLine={false}
            dy={6}
          />

          <YAxis
            tick={{ fill: "#A8A8C0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            dx={-2}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2A2A38", strokeWidth: 1, strokeDasharray: "4 2" }} />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#3D8BFF"
            strokeWidth={2}
            fill="url(#scoreGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#3D8BFF", stroke: "#1C1C28", strokeWidth: 2 }}
          />

          <Area
            type="monotone"
            dataKey="duration"
            stroke="#a78bfa"
            strokeWidth={2}
            fill="url(#durationGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#a78bfa", stroke: "#1C1C28", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(SleepChartInner);
