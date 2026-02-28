"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  Package,
  Lock,
  Truck,
  Check,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  X,
} from "lucide-react";

type OrderStatus = "pending" | "validated" | "locked" | "shipped" | "delivered";

interface Order {
  id: string;
  client: string;
  email: string;
  box: string;
  date: string;
  status: OrderStatus;
  amount: number;
  plan: string;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30" },
  validated: { label: "Validée", className: "bg-green-500/15 text-green-400 border border-green-500/30" },
  locked: { label: "Lockée", className: "bg-blue-500/15 text-blue-400 border border-blue-500/30" },
  shipped: { label: "Expédiée", className: "bg-purple-500/15 text-purple-400 border border-purple-500/30" },
  delivered: { label: "Livrée", className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" },
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
};

const MOCK_ORDERS: Order[] = [
  { id: "CMD-2024-0087", client: "Margaux Fontaine", email: "margaux.fontaine@gmail.com", box: "VIVE Box Bien-être", date: "2024-05-14", status: "locked", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0086", client: "Théodore Leblanc", email: "theo.leblanc@outlook.fr", box: "VIVE Box Énergie", date: "2024-05-14", status: "shipped", amount: 39.9, plan: "Essentiel" },
  { id: "CMD-2024-0085", client: "Inès Marchand", email: "ines.marchand@yahoo.fr", box: "VIVE Box Sérénité", date: "2024-05-13", status: "validated", amount: 59.9, plan: "Luxe" },
  { id: "CMD-2024-0084", client: "Baptiste Renaud", email: "b.renaud@gmail.com", box: "VIVE Box Bien-être", date: "2024-05-13", status: "pending", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0083", client: "Camille Durand", email: "camille.durand@free.fr", box: "VIVE Box Énergie", date: "2024-05-12", status: "delivered", amount: 39.9, plan: "Essentiel" },
  { id: "CMD-2024-0082", client: "Élise Moreau", email: "elise.moreau@sfr.fr", box: "VIVE Box Sérénité", date: "2024-05-12", status: "shipped", amount: 59.9, plan: "Luxe" },
  { id: "CMD-2024-0081", client: "Julien Petit", email: "julien.petit@gmail.com", box: "VIVE Box Bien-être", date: "2024-05-11", status: "locked", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0080", client: "Anaïs Girard", email: "anais.girard@laposte.net", box: "VIVE Box Énergie", date: "2024-05-11", status: "validated", amount: 39.9, plan: "Essentiel" },
  { id: "CMD-2024-0079", client: "Maxime Bernard", email: "m.bernard@hotmail.fr", box: "VIVE Box Sérénité", date: "2024-05-10", status: "pending", amount: 59.9, plan: "Luxe" },
  { id: "CMD-2024-0078", client: "Léa Rousseau", email: "lea.rousseau@gmail.com", box: "VIVE Box Bien-être", date: "2024-05-10", status: "delivered", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0077", client: "Hugo Leroy", email: "hugo.leroy@gmail.com", box: "VIVE Box Énergie", date: "2024-05-09", status: "shipped", amount: 39.9, plan: "Essentiel" },
  { id: "CMD-2024-0076", client: "Chloé Simon", email: "chloe.simon@outlook.fr", box: "VIVE Box Sérénité", date: "2024-05-09", status: "locked", amount: 59.9, plan: "Luxe" },
  { id: "CMD-2024-0075", client: "Nicolas Lambert", email: "n.lambert@free.fr", box: "VIVE Box Bien-être", date: "2024-05-08", status: "validated", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0074", client: "Pauline Dubois", email: "pauline.dubois@yahoo.fr", box: "VIVE Box Énergie", date: "2024-05-08", status: "pending", amount: 39.9, plan: "Essentiel" },
  { id: "CMD-2024-0073", client: "Antoine Martin", email: "a.martin@gmail.com", box: "VIVE Box Sérénité", date: "2024-05-07", status: "delivered", amount: 59.9, plan: "Luxe" },
  { id: "CMD-2024-0072", client: "Sophie Lefèvre", email: "sophie.lefevre@sfr.fr", box: "VIVE Box Bien-être", date: "2024-05-07", status: "shipped", amount: 49.9, plan: "Premium" },
  { id: "CMD-2024-0071", client: "Romain Dupont", email: "romain.dupont@laposte.net", box: "VIVE Box Énergie", date: "2024-05-06", status: "locked", amount: 39.9, plan: "Essentiel" },
];

const MONTHS = [
  "Tous les mois", "Mai 2024", "Avril 2024", "Mars 2024", "Février 2024", "Janvier 2024",
];

const STATUS_TABS: { key: string; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "pending", label: "En attente" },
  { key: "validated", label: "Validées" },
  { key: "locked", label: "Lockées" },
  { key: "shipped", label: "Expédiées" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("Tous les mois");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [monthOpen, setMonthOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      const matchSearch =
        search === "" ||
        o.client.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = activeTab === "all" || o.status === activeTab;
      return matchSearch && matchStatus;
    });
  }, [search, activeTab]);

  const allSelected = filtered.length > 0 && filtered.every((o) => selectedIds.has(o.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selectedIds);
      filtered.forEach((o) => next.delete(o.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      filtered.forEach((o) => next.add(o.id));
      setSelectedIds(next);
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const clearSelection = () => setSelectedIds(new Set());

  const selectedCount = selectedIds.size;

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_ORDERS.length };
    MOCK_ORDERS.forEach((o) => {
      counts[o.status] = (counts[o.status] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8] p-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F2F2F8] mb-1">Commandes</h1>
        <p className="text-[#A8A8C0] text-sm">Gestion des commandes box</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A8C0]" />
          <input
            type="text"
            placeholder="Rechercher par client ou N° commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1C1C28] border border-[#2A2A38] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#F2F2F8] placeholder-[#A8A8C0] outline-none focus:border-[#3D8BFF] transition-colors"
          />
        </div>

        {/* Month dropdown */}
        <div className="relative">
          <button
            onClick={() => setMonthOpen(!monthOpen)}
            className="flex items-center gap-2 bg-[#1C1C28] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-sm text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-colors min-w-[160px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter size={14} />
              {selectedMonth}
            </div>
            <ChevronDown size={14} className={`transition-transform ${monthOpen ? "rotate-180" : ""}`} />
          </button>
          {monthOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#1C1C28] border border-[#2A2A38] rounded-lg shadow-xl z-20 overflow-hidden">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  onClick={() => { setSelectedMonth(m); setMonthOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#2A2A38] ${
                    selectedMonth === m ? "text-[#3D8BFF]" : "text-[#A8A8C0]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export */}
        <button className="flex items-center gap-2 bg-[#1C1C28] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-sm text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-colors">
          <Download size={14} />
          Exporter CSV
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 mb-6 bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-1 w-fit flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-[#3D8BFF] text-white shadow-lg shadow-blue-500/20"
                : "text-[#A8A8C0] hover:text-[#F2F2F8] hover:bg-[#2A2A38]"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                activeTab === tab.key ? "bg-white/20 text-white" : "bg-[#2A2A38] text-[#A8A8C0]"
              }`}
            >
              {tabCounts[tab.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Bulk actions bar */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-3 mb-4 bg-[#1C1C28] border border-[#3D8BFF]/30 rounded-xl px-4 py-3 flex-wrap">
          <span className="text-sm text-[#3D8BFF] font-medium">{selectedCount} commande{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}</span>
          <div className="w-px h-4 bg-[#2A2A38]" />
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3D8BFF]/15 border border-[#3D8BFF]/30 text-[#3D8BFF] text-sm hover:bg-[#3D8BFF]/25 transition-colors">
            <Lock size={13} />
            Locker sélection
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 text-sm hover:bg-purple-500/25 transition-colors">
            <Truck size={13} />
            Marquer expédié
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C1C28] border border-[#2A2A38] text-[#A8A8C0] text-sm hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-colors">
            <RefreshCw size={13} />
            Ajouter tracking
          </button>
          <button
            onClick={clearSelection}
            className="ml-auto p-1.5 text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A38]">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-[#2A2A38] bg-[#0A0A0F] accent-[#3D8BFF] cursor-pointer"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider">N° Commande</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider hidden md:table-cell">Box</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider">Montant</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-[#A8A8C0]">
                    <Package size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Aucune commande trouvée</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`border-b border-[#2A2A38] last:border-0 transition-colors hover:bg-[#2A2A38]/40 ${
                      selectedIds.has(order.id) ? "bg-[#3D8BFF]/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(order.id)}
                        onChange={() => toggleOne(order.id)}
                        className="w-4 h-4 rounded border-[#2A2A38] bg-[#0A0A0F] accent-[#3D8BFF] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-[#3D8BFF] text-sm font-medium hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-[#F2F2F8]">{order.client}</p>
                        <p className="text-xs text-[#A8A8C0]">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#0A0A0F] border border-[#2A2A38] flex items-center justify-center flex-shrink-0">
                          <Package size={10} className="text-[#3D8BFF]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#F2F2F8]">{order.box}</p>
                          <p className="text-xs text-[#A8A8C0]">{order.plan}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-[#A8A8C0]">
                        {new Date(order.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-[#F2F2F8]">{order.amount.toFixed(2)} €</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 relative">
                        <Link
                          href={`/orders/${order.id}`}
                          className="p-1.5 rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] hover:bg-[#2A2A38] transition-colors"
                          title="Voir détail"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          className="p-1.5 rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] hover:bg-[#2A2A38] transition-colors"
                          title="Plus d'actions"
                          onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {openMenuId === order.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-[#1C1C28] border border-[#2A2A38] rounded-xl shadow-xl z-30 overflow-hidden">
                            <Link
                              href={`/orders/${order.id}`}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#A8A8C0] hover:bg-[#2A2A38] hover:text-[#F2F2F8] transition-colors"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <Eye size={13} /> Voir détail
                            </Link>
                            {order.status === "pending" && (
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-green-400 hover:bg-[#2A2A38] transition-colors"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Check size={13} /> Valider
                              </button>
                            )}
                            {order.status === "validated" && (
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#3D8BFF] hover:bg-[#2A2A38] transition-colors"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Lock size={13} /> Locker
                              </button>
                            )}
                            {order.status === "locked" && (
                              <button
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-purple-400 hover:bg-[#2A2A38] transition-colors"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Truck size={13} /> Expédier
                              </button>
                            )}
                            <div className="h-px bg-[#2A2A38] mx-2" />
                            <button
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-[#2A2A38] transition-colors"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <Trash2 size={13} /> Annuler
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#2A2A38]">
          <p className="text-xs text-[#A8A8C0]">
            {filtered.length} commande{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
            {selectedCount > 0 && ` · ${selectedCount} sélectionnée${selectedCount > 1 ? "s" : ""}`}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs bg-[#0A0A0F] border border-[#2A2A38] rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-colors disabled:opacity-40" disabled>
              Précédent
            </button>
            <span className="text-xs text-[#A8A8C0] px-2">Page 1 / 1</span>
            <button className="px-3 py-1.5 text-xs bg-[#0A0A0F] border border-[#2A2A38] rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-colors disabled:opacity-40" disabled>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
