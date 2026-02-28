"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, Package } from "lucide-react";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

type Category = "all" | "supplements" | "devices" | "accessories";

interface Module {
  id: string;
  name: string;
  category: "supplements" | "devices" | "accessories";
  stock: number;
  status: "active" | "inactive";
  priceCOGS: number;
  supplier: string;
  sku: string;
}

const mockModules: Module[] = [
  { id: "1",  name: "Magnésium Marin",        category: "supplements", stock: 342,  status: "active",   priceCOGS: 4.20,  supplier: "NutriLab France",    sku: "SUPP-MAG-001" },
  { id: "2",  name: "Mélatonine 3mg",          category: "supplements", stock: 7,    status: "active",   priceCOGS: 3.10,  supplier: "BioSanté Pro",      sku: "SUPP-MEL-002" },
  { id: "3",  name: "Vitamine D3",             category: "supplements", stock: 215,  status: "active",   priceCOGS: 2.80,  supplier: "NutriLab France",    sku: "SUPP-VD3-003" },
  { id: "4",  name: "Oméga-3 Premium",         category: "supplements", stock: 88,   status: "active",   priceCOGS: 6.50,  supplier: "OcéanNutrition",    sku: "SUPP-OM3-004" },
  { id: "5",  name: "CBD Sommeil",             category: "supplements", stock: 5,    status: "active",   priceCOGS: 12.90, supplier: "CannaWell Bio",     sku: "SUPP-CBD-005" },
  { id: "6",  name: "Ashwagandha KSM-66",      category: "supplements", stock: 134,  status: "active",   priceCOGS: 5.60,  supplier: "AyurVeda Labs",     sku: "SUPP-ASH-006" },
  { id: "7",  name: "Tracker Sommeil",         category: "devices",     stock: 47,   status: "active",   priceCOGS: 18.00, supplier: "TechSleep SAS",    sku: "DEVI-TRK-007" },
  { id: "8",  name: "Masque Nuit Soie",        category: "accessories", stock: 203,  status: "active",   priceCOGS: 3.80,  supplier: "SoieFrance SARL",  sku: "ACCE-MSK-008" },
  { id: "9",  name: "Diffuseur Huiles",        category: "devices",     stock: 29,   status: "inactive", priceCOGS: 9.20,  supplier: "AromaDiff Pro",    sku: "DEVI-DIF-009" },
  { id: "10", name: "Carnet Gratitude",        category: "accessories", stock: 310,  status: "active",   priceCOGS: 2.10,  supplier: "ÉditionsZen",     sku: "ACCE-CAR-010" },
  { id: "11", name: "Bouchons Oreilles Pro",   category: "accessories", stock: 8,    status: "active",   priceCOGS: 1.90,  supplier: "SilencePlus",      sku: "ACCE-BOU-011" },
  { id: "12", name: "Lampe Circadienne",       category: "devices",     stock: 15,   status: "inactive", priceCOGS: 24.50, supplier: "LuxCirca Tech",   sku: "DEVI-LMP-012" },
];

const categoryTabs: { value: Category; label: string }[] = [
  { value: "all",         label: "Tous" },
  { value: "supplements", label: "Compléments" },
  { value: "devices",     label: "Appareils" },
  { value: "accessories", label: "Accessoires" },
];

const categoryColors: Record<string, string> = {
  supplements: "bg-purple-500/10 text-purple-300 border border-purple-500/20",
  devices:     "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  accessories: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
};

const categoryLabels: Record<string, string> = {
  supplements: "Compléments",
  devices:     "Appareils",
  accessories: "Accessoires",
};

export default function ModulesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [statuses, setStatuses] = useState<Record<string, "active" | "inactive">>(
    () => Object.fromEntries(mockModules.map((m) => [m.id, m.status]))
  );

  const toggleStatus = (id: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "inactive" : "active",
    }));
  };

  const filtered = useMemo(() => {
    return mockModules.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "all" || m.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const columns = [
    {
      key: "name",
      header: "Nom",
      render: (row: Module) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3D8BFF]/10 flex items-center justify-center shrink-0">
            <Package size={15} className="text-[#3D8BFF]" />
          </div>
          <div>
            <Link
              href={`/modules/${row.id}`}
              className="text-sm font-medium text-[#F2F2F8] hover:text-[#3D8BFF] transition-colors"
            >
              {row.name}
            </Link>
            <p className="text-xs text-[#A8A8C0] font-mono">{row.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Catégorie",
      render: (row: Module) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[row.category]}`}>
          {categoryLabels[row.category]}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (row: Module) => {
        const status = statuses[row.id];
        const low = row.stock < 10;
        return (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${low ? "text-red-400" : "text-[#F2F2F8]"}`}>
              {row.stock}
            </span>
            {low && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                Critique
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Statut",
      render: (row: Module) => <StatusBadge status={statuses[row.id]} />,
    },
    {
      key: "priceCOGS",
      header: "Prix COGS",
      render: (row: Module) => (
        <span className="text-sm font-medium text-[#F2F2F8]">{row.priceCOGS.toFixed(2)} €</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Module) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/modules/${row.id}`}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0A0F] border border-[#2A2A38] text-[#A8A8C0] hover:text-[#3D8BFF] hover:border-[#3D8BFF]/40 transition-all"
            title="Modifier"
          >
            <Edit2 size={13} />
          </Link>
          <button
            onClick={() => toggleStatus(row.id)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0A0F] border transition-all ${
              statuses[row.id] === "active"
                ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                : "border-[#2A2A38] text-[#A8A8C0] hover:border-[#3D8BFF]/40 hover:text-[#3D8BFF]"
            }`}
            title={statuses[row.id] === "active" ? "Désactiver" : "Activer"}
          >
            {statuses[row.id] === "active" ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
          </button>
        </div>
      ),
    },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockModules.length };
    mockModules.forEach((m) => {
      counts[m.category] = (counts[m.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8] p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2F8]">Modules</h1>
          <p className="text-sm text-[#A8A8C0] mt-1">Gestion du catalogue</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3D8BFF] text-white text-sm font-medium rounded-lg hover:bg-[#2d7aee] transition-colors shrink-0">
          <Plus size={16} />
          Ajouter un module
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total modules",    value: mockModules.length,                                               color: "text-[#F2F2F8]" },
          { label: "Actifs",           value: mockModules.filter((m) => m.status === "active").length,           color: "text-emerald-400" },
          { label: "Stock critique",   value: mockModules.filter((m) => m.stock < 10).length,                   color: "text-red-400" },
          { label: "Inactifs",         value: mockModules.filter((m) => m.status === "inactive").length,         color: "text-[#A8A8C0]" },
        ].map((card) => (
          <div key={card.label} className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-4">
            <p className="text-xs text-[#A8A8C0]">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A8C0]" />
          <input
            type="text"
            placeholder="Rechercher un module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg text-sm text-[#F2F2F8] placeholder-[#A8A8C0] focus:outline-none focus:border-[#3D8BFF] transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === tab.value
                  ? "bg-[#3D8BFF] text-white"
                  : "bg-[#0A0A0F] text-[#A8A8C0] border border-[#2A2A38] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/40"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-[#2A2A38] text-[#A8A8C0]"
                }`}
              >
                {categoryCounts[tab.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2A2A38] flex items-center justify-between">
          <p className="text-sm text-[#A8A8C0]">
            <span className="font-semibold text-[#F2F2F8]">{filtered.length}</span> module{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          emptyMessage="Aucun module ne correspond à votre recherche."
        />
      </div>
    </div>
  );
}
