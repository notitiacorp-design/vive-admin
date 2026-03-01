"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  prefix?: string;
}

const KPICard = React.memo(function KPICard({ title, value, trend, icon, prefix }: KPICardProps) {
  const isPositive = trend >= 0;
  const trendColor = isPositive ? "text-emerald-400" : "text-red-400";
  const trendBg = isPositive ? "bg-emerald-400/10" : "bg-red-400/10";
  const formattedTrend = `${isPositive ? "+" : ""}${trend.toFixed(1)}%`;

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-[#2A2A38] bg-[#1C1C28] p-5 overflow-hidden">
      {/* Subtle glow accent */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#3D8BFF]/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#A8A8C0]">{title}</span>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3D8BFF]/10 text-[#3D8BFF]">
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold tracking-tight text-[#F2F2F8]">
          {prefix && (
            <span className="text-xl font-semibold text-[#A8A8C0] mr-0.5">{prefix}</span>
          )}
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${trendColor} ${trendBg}`}>
          {isPositive ? (
            <TrendingUp size={12} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={12} strokeWidth={2.5} />
          )}
          {formattedTrend}
        </div>
        <span className="text-xs text-[#A8A8C0]">vs mois dernier</span>
      </div>
    </div>
  );
});

export default KPICard;
