"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import KPICard from "@/components/KPICard";
import { BarChart2, TrendingUp, RefreshCw, DollarSign } from "lucide-react";

const mrrData = [
  { month: "Jan", essential: 3200, premium: 3100, elite: 1700 },
  { month: "FÃ©v", essential: 3400, premium: 3300, elite: 1800 },
  { month: "Mar", essential: 3500, premium: 3500, elite: 1950 },
  { month: "Avr", essential: 3700, premium: 3700, elite: 2100 },
  { month: "Mai", essential: 3800, premium: 3900, elite: 2200 },
  { month: "Jun", essential: 3900, premium: 4100, elite: 2350 },
  { month: "Jul", essential: 4000, premium: 4300, elite: 2500 },
  { month: "AoÃ»", essential: 4100, premium: 4500, elite: 2650 },
  { month: "Sep", essential: 4200, premium: 4700, elite: 2800 },
  { month: "Oct", essential: 4300, premium: 4900, elite: 2950 },
  { month: "Nov", essential: 4400, premium: 5100, elite: 3100 },
  { month: "DÃ©c", essential: 4500, premium: 5300, elite: 2700 },
];

const cohortData = [
  { cohort: "Jan", m0: 100, m1: 88, m2: 79, m3: 74, m4: 70, m5: 68 },
  { cohort: "FÃ©v", m0: 100, m1: 90, m2: 81, m3: 76, m4: 72, m5: 69 },
  { cohort: "Mar", m0: 100, m1: 87, m2: 78, m3: 73, m4: 69, m5: null },
  { cohort: "Avr", m0: 100, m1: 91, m2: 83, m3: 77, m4: null, m5: null },
  { cohort: "Mai", m0: 100, m1: 89, m2: 80, m3: null, m4: null, m5: null },
  { cohort: "Jun", m0: 100, m1: 92, m2: null, m3: null, m4: null, m5: null },
];

const modulesData = [
  { name: "MagnÃ©sium Marin", value: 89 },
  { name: "MÃ©latonine 3mg", value: 76 },
  { name: "Vitamine D3+K2", value: 71 },
  { name: "OmÃ©ga-3 Premium", value: 68 },
  { name: "Probiotiques 10M", value: 63 },
  { name: "Ashwagandha KSM", value: 57 },
  { name: "Zinc Bisglycinate", value: 52 },
  { name: "Curcuma Liposomal", value: 47 },
  { name: "CollagÃ¨ne Marin", value: 43 },
  { name: "Rhodiola Rosea", value: 38 },
];

function getRetentionColor(value: number | null): string {
  if (value === null) return "bg-[#1C1C28]";
  if (value >= 90) return "bg-emerald-500";
  if (value >= 80) return "bg-emerald-600";
  if (value >= 70) return "bg-yellow-500";
  if (value >= 60) return "bg-orange-500";
  return "bg-red-500";
}

function getRetentionOpacity(value: number | null): string {
  if (value === null) return "opacity-10";
  if (value >= 90) return "opacity-90";
  if (value >= 80) return "opacity-75";
  if (value >= 70) return "opacity-60";
  if (value >= 60) return "opacity-50";
  return "opacity-40";
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; fill: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: { value: number }) => sum + entry.value, 0);
    return (
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-4 shadow-2xl">
        <p className="text-[#A8A8C0] text-xs font-medium mb-3">{label}</p>
        {payload.map((entry: { name: string; value: number; fill: string }, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#A8A8C0] text-xs capitalize">{entry.name}:</span>
            <span className="text-[#F2F2F8] text-xs font-semibold">â¬{entry.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-[#2A2A38] mt-2 pt-2 flex justify-between">
          <span className="text-[#A8A8C0] text-xs">Total MRR</span>
          <span className="text-[#3D8BFF] text-xs font-bold">â¬{total.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

const ModuleTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-3 shadow-2xl">
        <p className="text-[#F2F2F8] text-xs font-semibold">{label}</p>
        <p className="text-[#3D8BFF] text-sm font-bold mt-1">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#F2F2F8] tracking-tight">Analytics</h1>
        <p className="text-[#A8A8C0] text-sm mt-1">MÃ©triques business</p>
      </div>

      {/* Section 1: MRR par plan */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#F2F2F8] font-semibold text-base">MRR par plan</h2>
            <p className="text-[#A8A8C0] text-xs mt-0.5">Revenus mensuels rÃ©currents sur 12 mois</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7EC8F0]" />
              <span className="text-[#A8A8C0] text-xs">Essential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3D8BFF]" />
              <span className="text-[#A8A8C0] text-xs">Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
              <span className="text-[#A8A8C0] text-xs">Elite</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={mrrData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradEssential" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7EC8F0" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7EC8F0" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradPremium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3D8BFF" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#3D8BFF" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradElite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A38" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#A8A8C0", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#A8A8C0", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `â¬${(v / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2A2A38", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="essential"
              stackId="1"
              stroke="#7EC8F0"
              strokeWidth={2}
              fill="url(#gradEssential)"
              name="essential"
            />
            <Area
              type="monotone"
              dataKey="premium"
              stackId="1"
              stroke="#3D8BFF"
              strokeWidth={2}
              fill="url(#gradPremium)"
              name="premium"
            />
            <Area
              type="monotone"
              dataKey="elite"
              stackId="1"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#gradElite)"
              name="elite"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: RÃ©tention Cohortes */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-[#F2F2F8] font-semibold text-base">RÃ©tention cohortes</h2>
          <p className="text-[#A8A8C0] text-xs mt-0.5">Taux de rÃ©tention par mois depuis l'inscription</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-[#A8A8C0] text-xs font-medium pb-3 pr-4 w-20">Cohorte</th>
                {["M+0", "M+1", "M+2", "M+3", "M+4", "M+5"].map((col) => (
                  <th key={col} className="text-center text-[#A8A8C0] text-xs font-medium pb-3 px-2">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {cohortData.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="text-[#A8A8C0] text-xs font-medium pr-4 py-1.5">{row.cohort}</td>
                  {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, colIdx) => (
                    <td key={colIdx} className="px-2 py-1.5">
                      <div
                        className={`rounded-lg flex items-center justify-center h-10 text-xs font-bold transition-all ${
                          val === null
                            ? "bg-[#0A0A0F] text-transparent"
                            : `${getRetentionColor(val)} ${getRetentionOpacity(val)} text-white`
                        }`}
                        style={{ minWidth: "56px" }}
                      >
                        {val !== null ? `${val}%` : "â"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <span className="text-[#A8A8C0] text-xs">Faible</span>
          <div className="flex gap-1">
            {[
              "bg-red-500 opacity-40",
              "bg-orange-500 opacity-50",
              "bg-yellow-500 opacity-60",
              "bg-emerald-600 opacity-75",
              "bg-emerald-500 opacity-90",
            ].map((cls, i) => (
              <div key={i} className={`w-6 h-4 rounded ${cls}`} />
            ))}
          </div>
          <span className="text-[#A8A8C0] text-xs">ÃlevÃ©</span>
        </div>
      </div>

      {/* Section 3 + Section 4 side by side on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Section 3: Top modules demandÃ©s */}
        <div className="xl:col-span-2 bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-[#F2F2F8] font-semibold text-base">Top modules demandÃ©s</h2>
            <p className="text-[#A8A8C0] text-xs mt-0.5">Pourcentage d'abonnÃ©s ayant demandÃ© le module</p>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart
              data={modulesData}
              layout="vertical"
              margin={{ top: 0, right: 32, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A38" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#A8A8C0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#A8A8C0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip content={<ModuleTooltip />} cursor={{ fill: "rgba(61,139,255,0.05)" }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {modulesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#3D8BFF" : `rgba(61,139,255,${0.85 - index * 0.07})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Section 4: MÃ©triques clÃ©s */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="mb-1">
            <h2 className="text-[#F2F2F8] font-semibold text-base">MÃ©triques clÃ©s</h2>
            <p className="text-[#A8A8C0] text-xs mt-0.5">Indicateurs de performance</p>
          </div>
          <KPICard
            title="Taux activation"
            value="78.5%"
            delta="+2.1%"
            deltaPositive={true}
            icon={<TrendingUp size={18} className="text-[#3D8BFF]" />}
          />
          <KPICard
            title="Churn mensuel"
            value="3.2%"
            delta="-0.5%"
            deltaPositive={true}
            icon={<RefreshCw size={18} className="text-[#3D8BFF]" />}
          />
          <KPICard
            title="Swap Rate"
            value="4.2%"
            delta="-1.5%"
            deltaPositive={true}
            icon={<BarChart2 size={18} className="text-[#3D8BFF]" />}
          />
          <KPICard
            title="LTV moyen"
            value="â¬186"
            delta="+â¬12"
            deltaPositive={true}
            icon={<DollarSign size={18} className="text-[#3D8BFF]" />}
          />
        </div>
      </div>
    </div>
  );
}
