"use client";

import { useMemo } from "react";
import KPICard from "@/components/KPICard";
import SleepChart from "@/components/SleepChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Euro,
  Users,
  Package,
  RefreshCw,
  Star,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

const VIVE = {
  bg: "#0A0E1A",
  surface: "#111827",
  surfaceAlt: "#1A2235",
  border: "#1E2D45",
  accent: "#3D8BFF",
  accentGlow: "rgba(61,139,255,0.15)",
  textPrimary: "#F0F4FF",
  textSecondary: "#8B9BB4",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3D8BFF",
};

function generateLast30DaysData() {
  const data = [];
  const today = new Date();
  const baseValues = [
    3, 5, 2, 7, 4, 6, 8, 3, 5, 9, 4, 6, 7, 5, 8, 10, 6, 4, 7, 9, 5, 8, 11, 6,
    9, 7, 12, 8, 10, 13,
  ];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const label = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
    data.push({
      date: label,
      nouveaux: baseValues[29 - i],
      cumul: baseValues.slice(0, 30 - i).reduce((a, b) => a + b, 0),
    });
  }
  return data;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: VIVE.surfaceAlt,
          border: `1px solid ${VIVE.border}`,
          borderRadius: "8px",
          padding: "10px 14px",
          boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
        }}
      >
        <p
          style={{
            color: VIVE.textSecondary,
            fontSize: "12px",
            marginBottom: "4px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            color: VIVE.accent,
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          {payload[0].value} nouveaux clients
        </p>
      </div>
    );
  }
  return null;
};

const alerts = [
  {
    id: 1,
    type: "warning" as const,
    message: "3 boxes à locker dans 48h",
    icon: AlertTriangle,
    color: VIVE.warning,
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    id: 2,
    type: "danger" as const,
    message: "Stock bas: Magnésium Marin (< 10 unités)",
    icon: AlertCircle,
    color: VIVE.danger,
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.25)",
  },
  {
    id: 3,
    type: "info" as const,
    message: "2 swaps en attente de validation",
    icon: Info,
    color: VIVE.info,
    bg: "rgba(61,139,255,0.10)",
    border: "rgba(61,139,255,0.25)",
  },
];

export default function DashboardPage() {
  const chartData = useMemo(() => generateLast30DaysData(), []);
  const tickIndices = [0, 6, 13, 20, 27, 29];
  const filteredTicks = chartData
    .filter((_, i) => tickIndices.includes(i))
    .map((d) => d.date);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: VIVE.bg,
        padding: "32px 24px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${VIVE.accent}, #6366F1)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 16px ${VIVE.accentGlow}`,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "14px" }}>V</span>
          </div>
          <h1
            style={{
              color: VIVE.textPrimary,
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Dashboard Overview
          </h1>
        </div>
        <p style={{ color: VIVE.textSecondary, fontSize: "14px", margin: 0, paddingLeft: "48px" }}>
          Bienvenue sur VIVE Admin — données en temps réel
        </p>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <KPICard
          title="MRR"
          value="€12,450"
          change="+8.2%"
          changeType="positive"
          icon={<Euro size={20} color={VIVE.accent} />}
          subtitle="vs mois dernier"
        />
        <KPICard
          title="Clients actifs"
          value="342"
          change="+5.1%"
          changeType="positive"
          icon={<Users size={20} color="#A78BFA" />}
          subtitle="abonnés actifs"
        />
        <KPICard
          title="Boxes ce mois"
          value="128"
          change="+12.3%"
          changeType="positive"
          icon={<Package size={20} color="#34D399" />}
          subtitle="expédiées"
        />
        <KPICard
          title="Swap Rate"
          value="4.2%"
          change="-1.5%"
          changeType="negative"
          icon={<RefreshCw size={20} color={VIVE.warning} />}
          subtitle="taux d'échange"
        />
        <KPICard
          title="NPS"
          value="72"
          change="+3.0"
          changeType="positive"
          icon={<Star size={20} color="#FBBF24" />}
          subtitle="score net promoteur"
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {/* New Clients Area Chart */}
        <div
          style={{
            backgroundColor: VIVE.surface,
            border: `1px solid ${VIVE.border}`,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: VIVE.textPrimary,
                fontSize: "16px",
                fontWeight: 600,
                margin: "0 0 4px 0",
              }}
            >
              Nouveaux clients
            </h2>
            <p style={{ color: VIVE.textSecondary, fontSize: "13px", margin: 0 }}>
              30 derniers jours · {chartData.reduce((a, b) => a + b.nouveaux, 0)} au total
            </p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNouveaux" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={VIVE.accent} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={VIVE.accent} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={VIVE.border}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                ticks={filteredTicks}
                tick={{ fill: VIVE.textSecondary, fontSize: 11 }}
                axisLine={{ stroke: VIVE.border }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: VIVE.textSecondary, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="nouveaux"
                stroke={VIVE.accent}
                strokeWidth={2.5}
                fill="url(#colorNouveaux)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: VIVE.accent,
                  stroke: VIVE.surface,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Chart Component */}
        <div
          style={{
            backgroundColor: VIVE.surface,
            border: `1px solid ${VIVE.border}`,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: VIVE.textPrimary,
                fontSize: "16px",
                fontWeight: 600,
                margin: "0 0 4px 0",
              }}
            >
              Qualité du sommeil
            </h2>
            <p style={{ color: VIVE.textSecondary, fontSize: "13px", margin: 0 }}>
              Score moyen des clients · 4 dernières semaines
            </p>
          </div>
          <SleepChart />
        </div>
      </div>

      {/* Alerts Section */}
      <div
        style={{
          backgroundColor: VIVE.surface,
          border: `1px solid ${VIVE.border}`,
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "rgba(245,158,11,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertTriangle size={16} color={VIVE.warning} />
          </div>
          <div>
            <h2
              style={{
                color: VIVE.textPrimary,
                fontSize: "16px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Alertes système
            </h2>
            <p style={{ color: VIVE.textSecondary, fontSize: "12px", margin: 0 }}>
              {alerts.length} alertes nécessitent votre attention
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <div
                key={alert.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  backgroundColor: alert.bg,
                  border: `1px solid ${alert.border}`,
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: alert.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${alert.color}`,
                  }}
                />
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: alert.bg,
                    border: `1px solid ${alert.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconComponent size={15} color={alert.color} />
                </div>
                <p
                  style={{
                    color: VIVE.textPrimary,
                    fontSize: "14px",
                    margin: 0,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {alert.message}
                </p>
                <div
                  style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    backgroundColor: alert.bg,
                    border: `1px solid ${alert.border}`,
                    color: alert.color,
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    flexShrink: 0,
                  }}
                >
                  {alert.type === "warning"
                    ? "Urgent"
                    : alert.type === "danger"
                    ? "Critique"
                    : "Info"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "24px",
          textAlign: "center",
          color: VIVE.textSecondary,
          fontSize: "12px",
        }}
      >
        VIVE Admin · Dernière mise à jour:{" "}
        {new Date().toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
