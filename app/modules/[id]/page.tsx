"use client";

import Link from "next/link";
import { ArrowLeft, Edit2, Package, Tag, Truck, Weight, BarChart2, Box, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

interface ModuleVariant {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

interface UsageHistoryEntry {
  boxId: string;
  boxName: string;
  date: string;
  quantity: number;
}

interface ModuleDetail {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: string;
  priceCOGS: number;
  weight: number;
  supplier: string;
  stock: number;
  reorderThreshold: number;
  description: string;
  variants: ModuleVariant[];
  usageHistory: UsageHistoryEntry[];
}

const moduleData: Record<string, ModuleDetail> = {
  "1": {
    id: "1",
    name: "MagnÃ©sium Marin",
    sku: "SUPP-MAG-001",
    category: "supplements",
    status: "active",
    priceCOGS: 4.2,
    weight: 120,
    supplier: "NutriLab France",
    stock: 342,
    reorderThreshold: 50,
    description: "MagnÃ©sium d'origine marine hautement biodisponible, idÃ©al pour la relaxation musculaire et le sommeil.",
    variants: [
      { id: "v1", name: "30 gÃ©lules", sku: "SUPP-MAG-001-30", stock: 180 },
      { id: "v2", name: "60 gÃ©lules", sku: "SUPP-MAG-001-60", stock: 162 },
    ],
    usageHistory: [
      { boxId: "BOX-2024-04", boxName: "Box Avril 2024", date: "2024-04-01", quantity: 120 },
      { boxId: "BOX-2024-03", boxName: "Box Mars 2024", date: "2024-03-01", quantity: 115 },
      { boxId: "BOX-2024-02", boxName: "Box FÃ©vrier 2024", date: "2024-02-01", quantity: 108 },
      { boxId: "BOX-2024-01", boxName: "Box Janvier 2024", date: "2024-01-01", quantity: 102 },
    ],
  },
  "2": {
    id: "2",
    name: "MÃ©latonine 3mg",
    sku: "SUPP-MEL-002",
    category: "supplements",
    status: "active",
    priceCOGS: 3.1,
    weight: 60,
    supplier: "BioSantÃ© Pro",
    stock: 7,
    reorderThreshold: 30,
    description: "MÃ©latonine dosÃ©e Ã  3mg pour favoriser l'endormissement naturel.",
    variants: [],
    usageHistory: [
      { boxId: "BOX-2024-04", boxName: "Box Avril 2024", date: "2024-04-01", quantity: 95 },
      { boxId: "BOX-2024-03", boxName: "Box Mars 2024", date: "2024-03-01", quantity: 90 },
    ],
  },
};

const categoryLabels: Record<string, string> = {
  supplements: "ComplÃ©ments",
  devices: "Appareils",
  accessories: "Accessoires",
};

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const module = moduleData[params.id] ?? {
    id: params.id,
    name: "Module Inconnu",
    sku: "N/A",
    category: "supplements",
    status: "inactive",
    priceCOGS: 0,
    weight: 0,
    supplier: "N/A",
    stock: 0,
    reorderThreshold: 0,
    description: "",
    variants: [],
    usageHistory: [],
  };

  const isLowStock = module.stock < module.reorderThreshold;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/modules"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1C1C28] border border-[#2A2A38] text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF] transition-all"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#F2F2F8]">{module.name}</h1>
              <StatusBadge status={module.status} />
            </div>
            <p className="text-sm text-[#A8A8C0] mt-0.5">SKU: {module.sku}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#3D8BFF] text-white text-sm font-medium rounded-lg hover:bg-[#2d7aee] transition-colors">
          <Edit2 size={15} />
          Modifier le module
        </button>
      </div>

      {/* Low stock alert */}
      {isLowStock && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <AlertTriangle size={18} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-300">
            Stock critique\ : <span className="font-semibold">{module.stock} unitÃ©s</span> restantes â en dessous du seuil de rÃ©approvisionnement ({module.reorderThreshold}).
          </p>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 text-red-300 text-xs font-medium rounded-lg hover:bg-red-500/30 transition-colors">
            <RefreshCw size={12} />
            Commander
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Grid */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#F2F2F8]">Informations produit</h2>
              <button className="flex items-center gap-1.5 text-xs text-[#3D8BFF] hover:text-[#5ba0ff] transition-colors">
                <Edit2 size={12} /> Ãditer
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0] flex items-center gap-1"><Tag size={11} /> CatÃ©gorie</span>
                <span className="text-sm font-medium text-[#F2F2F8]">{categoryLabels[module.category] ?? module.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0] flex items-center gap-1"><Package size={11} /> SKU</span>
                <span className="text-sm font-medium text-[#F2F2F8] font-mono">{module.sku}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0] flex items-center gap-1"><BarChart2 size={11} /> Prix COGS</span>
                <span className="text-sm font-medium text-[#F2F2F8]">{module.priceCOGS.toFixed(2)} â¬</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0] flex items-center gap-1"><Weight size={11} /> Poids</span>
                <span className="text-sm font-medium text-[#F2F2F8]">{module.weight} g</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0] flex items-center gap-1"><Truck size={11} /> Fournisseur</span>
                <span className="text-sm font-medium text-[#F2F2F8]">{module.supplier}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#A8A8C0]">Statut</span>
                <StatusBadge status={module.status} />
              </div>
            </div>
            {module.description && (
              <div className="mt-4 pt-4 border-t border-[#2A2A38]">
                <span className="text-xs text-[#A8A8C0]">Description</span>
                <p className="mt-1 text-sm text-[#F2F2F8] leading-relaxed">{module.description}</p>
              </div>
            )}
          </div>

          {/* Variants */}
          {module.variants.length > 0 && (
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#F2F2F8]">Variantes</h2>
                <button className="flex items-center gap-1.5 text-xs text-[#3D8BFF] hover:text-[#5ba0ff] transition-colors">
                  <Edit2 size={12} /> GÃ©rer
                </button>
              </div>
              <div className="space-y-2">
                {module.variants.map((variant: ModuleVariant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-3 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F2F2F8]">{variant.name}</p>
                      <p className="text-xs text-[#A8A8C0] font-mono mt-0.5">{variant.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${variant.stock < 20 ? "text-red-400" : "text-emerald-400"}`}>
                        {variant.stock}
                      </p>
                      <p className="text-xs text-[#A8A8C0]">en stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage History */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <h2 className="text-base font-semibold text-[#F2F2F8] mb-4">Historique d'inclusion</h2>
            {module.usageHistory.length === 0 ? (
              <p className="text-sm text-[#A8A8C0] text-center py-8">Aucune inclusion dans une box pour le moment.</p>
            ) : (
              <div className="space-y-2">
                {module.usageHistory.map((entry: UsageHistoryEntry, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg hover:border-[#3D8BFF]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#3D8BFF]/10 flex items-center justify-center">
                        <Box size={14} className="text-[#3D8BFF]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F2F2F8]">{entry.boxName}</p>
                        <p className="text-xs text-[#A8A8C0]">
                          {new Date(entry.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#F2F2F8]">{entry.quantity}</p>
                      <p className="text-xs text-[#A8A8C0]">unitÃ©s utilisÃ©es</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stock Management */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#F2F2F8]">Gestion du stock</h2>
              <button className="flex items-center gap-1.5 text-xs text-[#3D8BFF] hover:text-[#5ba0ff] transition-colors">
                <Edit2 size={12} /> Ajuster
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-[#0A0A0F] rounded-xl border border-[#2A2A38]">
                <p className={`text-4xl font-bold ${isLowStock ? "text-red-400" : "text-emerald-400"}`}>
                  {module.stock}
                </p>
                <p className="text-xs text-[#A8A8C0] mt-1">unitÃ©s en stock</p>
                {isLowStock ? (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-red-400">
                    <AlertTriangle size={11} /> Stock critique
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-emerald-400">
                    <CheckCircle size={11} /> Niveau correct
                  </div>
                )}
              </div>

              {/* Stock bar */}
              <div>
                <div className="flex justify-between text-xs text-[#A8A8C0] mb-1.5">
                  <span>0</span>
                  <span>Seuil: {module.reorderThreshold}</span>
                  <span>{Math.max(module.stock, module.reorderThreshold) + 20}</span>
                </div>
                <div className="h-2 bg-[#0A0A0F] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isLowStock ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{
                      width: `${Math.min((module.stock / (Math.max(module.stock, module.reorderThreshold) + 20)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0A0A0F] rounded-lg border border-[#2A2A38] text-center">
                  <p className="text-lg font-bold text-[#F2F2F8]">{module.reorderThreshold}</p>
                  <p className="text-xs text-[#A8A8C0] mt-0.5">Seuil alerte</p>
                </div>
                <div className="p-3 bg-[#0A0A0F] rounded-lg border border-[#2A2A38] text-center">
                  <p className="text-lg font-bold text-[#F2F2F8]">{module.usageHistory.reduce((acc: number, h: UsageHistoryEntry) => acc + h.quantity, 0)}</p>
                  <p className="text-xs text-[#A8A8C0] mt-0.5">Total distribuÃ©</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#3D8BFF]/10 text-[#3D8BFF] border border-[#3D8BFF]/30 rounded-lg text-sm font-medium hover:bg-[#3D8BFF]/20 transition-colors">
                <RefreshCw size={14} />
                Commander un rÃ©assort
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <h2 className="text-base font-semibold text-[#F2F2F8] mb-4">Statistiques rapides</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A8A8C0]">Boxes incluses</span>
                <span className="text-sm font-semibold text-[#F2F2F8]">{module.usageHistory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A8A8C0]">DerniÃ¨re inclusion</span>
                <span className="text-sm font-semibold text-[#F2F2F8]">
                  {module.usageHistory[0]
                    ? new Date(module.usageHistory[0].date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
                    : "â"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A8A8C0]">CoÃ»t total distribuÃ©</span>
                <span className="text-sm font-semibold text-[#F2F2F8]">
                  {(module.usageHistory.reduce((acc: number, h: UsageHistoryEntry) => acc + h.quantity, 0) * module.priceCOGS).toFixed(2)} â¬
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A8A8C0]">Valeur stock actuel</span>
                <span className="text-sm font-semibold text-[#F2F2F8]">{(module.stock * module.priceCOGS).toFixed(2)} â¬</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
