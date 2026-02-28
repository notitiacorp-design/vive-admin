"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  ChevronRight,
  Crown,
  Moon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
} from "lucide-react";

type Plan = "All" | "Essential" | "Premium" | "Elite";
type Status = "active" | "paused" | "cancelled";
type SortKey = "name" | "lastActivity" | "sleepScore";
type SortDir = "asc" | "desc";

interface User {
  id: string;
  name: string;
  email: string;
  plan: "Essential" | "Premium" | "Elite";
  status: Status;
  lastActivity: string;
  sleepScore: number;
  memberSince: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Camille Fontaine", email: "camille.fontaine@gmail.com", plan: "Premium", status: "active", lastActivity: "2024-01-15", sleepScore: 82, memberSince: "2023-04-12" },
  { id: "2", name: "Thomas Beaumont", email: "t.beaumont@outlook.fr", plan: "Elite", status: "active", lastActivity: "2024-01-15", sleepScore: 91, memberSince: "2022-11-03" },
  { id: "3", name: "Sophie Marchand", email: "sophie.marchand@laposte.net", plan: "Essential", status: "paused", lastActivity: "2024-01-08", sleepScore: 67, memberSince: "2023-07-22" },
  { id: "4", name: "Lucas Petit", email: "lucas.petit@free.fr", plan: "Premium", status: "active", lastActivity: "2024-01-14", sleepScore: 78, memberSince: "2023-02-14" },
  { id: "5", name: "Elise Moreau", email: "elise.moreau@gmail.com", plan: "Elite", status: "active", lastActivity: "2024-01-15", sleepScore: 95, memberSince: "2022-09-01" },
  { id: "6", name: "Julien Dupont", email: "j.dupont@sfr.fr", plan: "Essential", status: "cancelled", lastActivity: "2023-12-20", sleepScore: 55, memberSince: "2023-06-10" },
  { id: "7", name: "Marie-Claire Leroy", email: "mleroy@wanadoo.fr", plan: "Premium", status: "active", lastActivity: "2024-01-13", sleepScore: 74, memberSince: "2023-03-18" },
  { id: "8", name: "Antoine Bernard", email: "antoine.bernard@icloud.com", plan: "Elite", status: "paused", lastActivity: "2024-01-05", sleepScore: 88, memberSince: "2022-12-15" },
  { id: "9", name: "Nathalie Simon", email: "nathalie.simon@gmail.com", plan: "Essential", status: "active", lastActivity: "2024-01-12", sleepScore: 71, memberSince: "2023-08-30" },
  { id: "10", name: "Pierre-Louis Garnier", email: "pl.garnier@hotmail.fr", plan: "Premium", status: "active", lastActivity: "2024-01-15", sleepScore: 85, memberSince: "2023-01-07" },
  { id: "11", name: "Isabelle Laurent", email: "isa.laurent@free.fr", plan: "Essential", status: "active", lastActivity: "2024-01-10", sleepScore: 63, memberSince: "2023-10-05" },
  { id: "12", name: "François Roux", email: "francois.roux@gmail.com", plan: "Elite", status: "active", lastActivity: "2024-01-15", sleepScore: 93, memberSince: "2022-08-20" },
  { id: "13", name: "Aurélie Chevalier", email: "aurelie.ch@orange.fr", plan: "Premium", status: "cancelled", lastActivity: "2023-11-30", sleepScore: 69, memberSince: "2023-05-12" },
  { id: "14", name: "Maxime Girard", email: "m.girard@outlook.fr", plan: "Essential", status: "active", lastActivity: "2024-01-11", sleepScore: 72, memberSince: "2023-09-14" },
  { id: "15", name: "Céline Bonnet", email: "celine.bonnet@gmail.com", plan: "Premium", status: "paused", lastActivity: "2024-01-03", sleepScore: 77, memberSince: "2023-04-28" },
  { id: "16", name: "Hugo Lemaire", email: "hugo.lemaire@icloud.com", plan: "Elite", status: "active", lastActivity: "2024-01-15", sleepScore: 89, memberSince: "2022-10-10" },
  { id: "17", name: "Emilie Perrin", email: "e.perrin@laposte.net", plan: "Essential", status: "active", lastActivity: "2024-01-09", sleepScore: 66, memberSince: "2023-11-20" },
];

const planColors: Record<string, string> = {
  Essential: "bg-[#2A2A38] text-[#A8A8C0] border border-[#3A3A4A]",
  Premium: "bg-[#1A2A4A] text-[#3D8BFF] border border-[#2A4A7A]",
  Elite: "bg-[#2A1A3A] text-[#A855F7] border border-[#4A2A6A]",
};

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: { label: "Actif", className: "bg-green-900/30 text-green-400 border border-green-800/50" },
  paused: { label: "Pausé", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50" },
  cancelled: { label: "Annulé", className: "bg-red-900/30 text-red-400 border border-red-800/50" },
};

function relativeDate(dateStr: string): string {
  const now = new Date("2024-01-16");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
  return `Il y a ${Math.floor(diffDays / 30)} mois`;
}

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (column !== sortKey) return <ArrowUpDown size={13} className="text-[#A8A8C0] opacity-50" />;
  return sortDir === "asc" ? <ArrowUp size={13} className="text-[#3D8BFF]" /> : <ArrowDown size={13} className="text-[#3D8BFF]" />;
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<Plan>("All");
  const [sortKey, setSortKey] = useState<SortKey>("lastActivity");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let result = mockUsers.filter((u) => {
      const matchesSearch =
        search === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesPlan = planFilter === "All" || u.plan === planFilter;
      return matchesSearch && matchesPlan;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name, "fr");
      else if (sortKey === "lastActivity") cmp = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
      else if (sortKey === "sleepScore") cmp = a.sleepScore - b.sleepScore;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, planFilter, sortKey, sortDir]);

  const counts = useMemo(() => ({
    all: mockUsers.length,
    Essential: mockUsers.filter((u) => u.plan === "Essential").length,
    Premium: mockUsers.filter((u) => u.plan === "Premium").length,
    Elite: mockUsers.filter((u) => u.plan === "Elite").length,
  }), []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-9 h-9 rounded-xl bg-[#3D8BFF]/20 flex items-center justify-center">
                <Users size={18} className="text-[#3D8BFF]" />
              </div>
              <h1 className="text-2xl font-bold text-[#F2F2F8]">Utilisateurs</h1>
            </div>
            <p className="text-sm text-[#A8A8C0] ml-11">
              {mockUsers.length} membres au total · {mockUsers.filter((u) => u.status === "active").length} actifs
            </p>
          </div>

          {/* Summary badges */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/20 border border-green-800/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">{mockUsers.filter((u) => u.status === "active").length} actifs</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-900/20 border border-yellow-800/40">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">{mockUsers.filter((u) => u.status === "paused").length} pausés</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/20 border border-red-800/40">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-xs text-red-400 font-medium">{mockUsers.filter((u) => u.status === "cancelled").length} annulés</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A8C0]" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1C1C28] border border-[#2A2A38] rounded-xl text-sm text-[#F2F2F8] placeholder-[#A8A8C0] focus:outline-none focus:border-[#3D8BFF] transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#1C1C28] border border-[#2A2A38] rounded-xl text-sm text-[#A8A8C0]">
              <Filter size={14} />
              <select
                value={`${sortKey}-${sortDir}`}
                onChange={(e) => {
                  const [k, d] = e.target.value.split("-") as [SortKey, SortDir];
                  setSortKey(k);
                  setSortDir(d);
                }}
                className="bg-transparent text-[#A8A8C0] text-sm focus:outline-none cursor-pointer appearance-none pr-1"
              >
                <option value="lastActivity-desc">Activité récente</option>
                <option value="lastActivity-asc">Activité ancienne</option>
                <option value="sleepScore-desc">Score sommeil ↓</option>
                <option value="sleepScore-asc">Score sommeil ↑</option>
                <option value="name-asc">Nom A→Z</option>
                <option value="name-desc">Nom Z→A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plan Filter Tabs */}
        <div className="flex gap-1 bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-1 mb-5 w-fit">
          {(["All", "Essential", "Premium", "Elite"] as Plan[]).map((plan) => (
            <button
              key={plan}
              onClick={() => setPlanFilter(plan)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                planFilter === plan
                  ? "bg-[#3D8BFF] text-white"
                  : "text-[#A8A8C0] hover:text-[#F2F2F8] hover:bg-[#2A2A38]"
              }`}
            >
              {plan === "All" ? `Tous (${counts.all})` : `${plan} (${counts[plan]})`}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b border-[#2A2A38]">
                  <th className="text-left px-5 py-3.5">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide hover:text-[#F2F2F8] transition-colors"
                    >
                      Nom
                      <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3.5">
                    <span className="text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide">Email</span>
                  </th>
                  <th className="text-left px-4 py-3.5">
                    <span className="text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide">Plan</span>
                  </th>
                  <th className="text-left px-4 py-3.5">
                    <span className="text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide">Statut abo</span>
                  </th>
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("lastActivity")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide hover:text-[#F2F2F8] transition-colors"
                    >
                      Dernière activité
                      <SortIcon column="lastActivity" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3.5">
                    <button
                      onClick={() => handleSort("sleepScore")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide hover:text-[#F2F2F8] transition-colors"
                    >
                      Score sommeil
                      <SortIcon column="sleepScore" sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  </th>
                  <th className="text-right px-5 py-3.5">
                    <span className="text-xs font-semibold text-[#A8A8C0] uppercase tracking-wide">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A38]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <Users size={32} className="text-[#3A3A4A]" />
                        <p className="text-[#A8A8C0] text-sm">Aucun utilisateur trouvé</p>
                        <button
                          onClick={() => { setSearch(""); setPlanFilter("All"); }}
                          className="text-xs text-[#3D8BFF] hover:underline"
                        >
                          Réinitialiser les filtres
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-[#22222E] transition-colors group">
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3D8BFF]/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-[#F2F2F8] flex-shrink-0">
                            {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <span className="text-sm font-medium text-[#F2F2F8] whitespace-nowrap">{user.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#A8A8C0]">{user.email}</span>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[user.plan]}`}>
                          <Crown size={10} />
                          {user.plan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[user.status].className}`}>
                          {statusConfig[user.status].label}
                        </span>
                      </td>

                      {/* Last Activity */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#A8A8C0]">{relativeDate(user.lastActivity)}</span>
                      </td>

                      {/* Sleep Score */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Moon size={13} className={user.sleepScore >= 85 ? "text-purple-400" : user.sleepScore >= 70 ? "text-[#3D8BFF]" : "text-[#A8A8C0]"} />
                          <span className={`text-sm font-semibold ${
                            user.sleepScore >= 85 ? "text-purple-400" :
                            user.sleepScore >= 70 ? "text-[#3D8BFF]" :
                            "text-[#A8A8C0]"
                          }`}>
                            {user.sleepScore}
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-[#2A2A38] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                user.sleepScore >= 85 ? "bg-purple-400" :
                                user.sleepScore >= 70 ? "bg-[#3D8BFF]" :
                                "bg-[#A8A8C0]"
                              }`}
                              style={{ width: `${user.sleepScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/users/${user.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2A38] hover:bg-[#3D8BFF]/20 hover:text-[#3D8BFF] border border-[#3A3A4A] hover:border-[#3D8BFF]/40 text-xs font-medium text-[#A8A8C0] transition-colors"
                        >
                          Voir profil
                          <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-[#2A2A38] flex items-center justify-between">
              <span className="text-xs text-[#A8A8C0]">
                {filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
                {filtered.length !== mockUsers.length && ` sur ${mockUsers.length}`}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#A8A8C0]">
                <Moon size={12} />
                <span>
                  Score moyen : <span className="text-[#3D8BFF] font-semibold">
                    {Math.round(filtered.reduce((sum, u) => sum + u.sleepScore, 0) / filtered.length)}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
