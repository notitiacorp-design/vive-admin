"use client";

import React from "react";

type StatusVariant =
  | "pending"
  | "validated"
  | "locked"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "active"
  | "inactive"
  | "approved"
  | "refused";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
}

const STATUS_STYLES: Record<StatusVariant, { bg: string; text: string; dot: string; label: string }> = {
  pending: {
    bg: "bg-yellow-400/10",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
    label: "Pending",
  },
  validated: {
    bg: "bg-[#3D8BFF]/10",
    text: "text-[#3D8BFF]",
    dot: "bg-[#3D8BFF]",
    label: "Validated",
  },
  locked: {
    bg: "bg-purple-400/10",
    text: "text-purple-400",
    dot: "bg-purple-400",
    label: "Locked",
  },
  shipped: {
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    label: "Shipped",
  },
  delivered: {
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    label: "Delivered",
  },
  cancelled: {
    bg: "bg-red-400/10",
    text: "text-red-400",
    dot: "bg-red-400",
    label: "Cancelled",
  },
  active: {
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    label: "Active",
  },
  inactive: {
    bg: "bg-[#A8A8C0]/10",
    text: "text-[#A8A8C0]",
    dot: "bg-[#A8A8C0]",
    label: "Inactive",
  },
  approved: {
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    label: "Approved",
  },
  refused: {
    bg: "bg-red-400/10",
    text: "text-red-400",
    dot: "bg-red-400",
    label: "Refused",
  },
};

const DEFAULT_STYLE = {
  bg: "bg-[#A8A8C0]/10",
  text: "text-[#A8A8C0]",
  dot: "bg-[#A8A8C0]",
};

function normalizeStatus(status: string): StatusVariant | null {
  const lower = status.toLowerCase().trim() as StatusVariant;
  return lower in STATUS_STYLES ? lower : null;
}

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant ?? normalizeStatus(status);
  const styles = resolvedVariant ? STATUS_STYLES[resolvedVariant] : DEFAULT_STYLE;
  const displayLabel = resolvedVariant ? STATUS_STYLES[resolvedVariant].label : status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        styles.bg
      } ${styles.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
      {displayLabel}
    </span>
  );
}
