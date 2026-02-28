"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Clock,
  CheckCircle,
  Lock,
  Truck,
  Home,
  ChevronRight,
  Edit2,
  RefreshCw,
  Send,
  Check,
  Clipboard,
  ExternalLink,
} from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: "En attente", className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30" },
    validated: { label: "ValidÃ©e", className: "bg-green-500/15 text-green-400 border border-green-500/30" },
    locked: { label: "LockÃ©e", className: "bg-blue-500/15 text-blue-400 border border-blue-500/30" },
    shipped: { label: "ExpÃ©diÃ©e", className: "bg-purple-500/15 text-purple-400 border border-purple-500/30" },
    delivered: { label: "LivrÃ©e", className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" },
  };
  const c = config[status] ?? { label: status, className: "bg-gray-500/15 text-gray-400 border border-gray-500/30" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.className}`}>{c.label}</span>;
};

const order = {
  id: "CMD-2024-0087",
  date: "2024-05-14T09:32:00Z",
  status: "locked",
  amount: 49.9,
  client: {
    id: "CLI-0042",
    name: "Margaux Fontaine",
    email: "margaux.fontaine@gmail.com",
    phone: "+33 6 12 34 56 78",
    plan: "Premium",
    since: "2023-11",
    address: {
      street: "14 rue des Lilas",
      city: "Lyon",
      zip: "69003",
      country: "France",
    },
  },
  box: {
    name: "VIVE Box Bien-Ãªtre",
    month: "Mai 2024",
    tier: "Premium",
    theme: "Ãnergie & VitalitÃ©",
    modules: [
      { id: "M001", name: "Complexe MagnÃ©sium Marin", brand: "Nutergia", quantity: 1, type: "ComplÃ©ment", value: 18.5 },
      { id: "M002", name: "Huile essentielle Lavande", brand: "PranarÃ´m", quantity: 1, type: "AromathÃ©rapie", value: 12.9 },
      { id: "M003", name: "Tisane Relaxation", brand: "Yogi Tea", quantity: 2, type: "Infusion", value: 7.8 },
      { id: "M004", name: "Roller Jade", brand: "Natur & Sens", quantity: 1, type: "Accessoire", value: 14.5 },
      { id: "M005", name: "CrÃ¨me visage Hydra+", brand: "Melvita", quantity: 1, type: "CosmÃ©tique", value: 22.0 },
    ],
  },
  timeline: [
    { key: "created", label: "CrÃ©Ã©e", date: "14 mai 2024, 09:32", done: true, icon: Clipboard },
    { key: "validated", label: "ValidÃ©e", date: "14 mai 2024, 11:15", done: true, icon: Check },
    { key: "locked", label: "LockÃ©e", date: "16 mai 2024, 08:00", done: true, icon: Lock },
    { key: "shipped", label: "ExpÃ©diÃ©e", date: null, done: false, icon: Truck },
    { key: "delivered", label: "LivrÃ©e", date: null, done: false, icon: Home },
  ],
  tracking: "",
  notes: "Cliente abonnÃ©e depuis novembre 2023. PrÃ©fÃ©rence pour les produits naturels certifiÃ©s bio.",
  carrier: "Colissimo",
};

export default function OrderDetailPage() {
  const [tracking, setTracking] = useState(order.tracking);
  const [notes, setNotes] = useState(order.notes);
  const [editingTracking, setEditingTracking] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentStatusIndex = order.timeline.findIndex((t) => t.key === order.status);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const actionButtons = [
    { label: "Valider", icon: Check, show: order.status === "pending", color: "bg-green-600 hover:bg-green-500" },
    { label: "Locker", icon: Lock, show: order.status === "validated", color: "bg-[#3D8BFF] hover:bg-blue-400" },
    { label: "ExpÃ©dier", icon: Truck, show: order.status === "locked", color: "bg-purple-600 hover:bg-purple-500" },
    { label: "Swap module", icon: RefreshCw, show: ["pending", "validated"].includes(order.status), color: "bg-[#1C1C28] hover:bg-[#2A2A38] border border-[#2A2A38]" },
  ].filter((b) => b.show);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8] p-6">
      {/* Back nav */}
      <div className="mb-6">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Retour aux commandes
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[#F2F2F8]">{order.id}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-[#A8A8C0] text-sm">
            PassÃ©e le{" "}
            {new Date(order.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {actionButtons.map((btn) => (
            <button
              key={btn.label}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${btn.color}`}
            >
              <btn.icon size={14} />
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Client card */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#3D8BFF]" />
                <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider">Informations client</h2>
              </div>
              <Link
                href={`/clients/${order.client.id}`}
                className="inline-flex items-center gap-1 text-xs text-[#3D8BFF] hover:text-blue-300 transition-colors"
              >
                Voir fiche <ExternalLink size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Nom</p>
                <p className="text-[#F2F2F8] font-medium">{order.client.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Email</p>
                <p className="text-[#F2F2F8]">{order.client.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">TÃ©lÃ©phone</p>
                <p className="text-[#F2F2F8]">{order.client.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Plan</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#3D8BFF]/15 text-[#3D8BFF] border border-[#3D8BFF]/30">
                  {order.client.plan}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Client depuis</p>
                <p className="text-[#F2F2F8]">{order.client.since}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2A2A38]">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#A8A8C0] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#A8A8C0] mb-1">Adresse de livraison</p>
                  <p className="text-[#F2F2F8] text-sm">
                    {order.client.address.street}<br />
                    {order.client.address.zip} {order.client.address.city}<br />
                    {order.client.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Box card */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Package size={16} className="text-[#3D8BFF]" />
              <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider">Box sÃ©lectionnÃ©e</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Nom</p>
                <p className="text-[#F2F2F8] font-medium text-sm">{order.box.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">Mois</p>
                <p className="text-[#F2F2F8] text-sm">{order.box.month}</p>
              </div>
              <div>
                <p className="text-xs text-[#A8A8C0] mb-1">ThÃ¨me</p>
                <p className="text-[#F2F2F8] text-sm">{order.box.theme}</p>
              </div>
            </div>
            <h3 className="text-xs font-semibold text-[#A8A8C0] uppercase tracking-wider mb-3">Modules ({order.box.modules.length})</h3>
            <div className="flex flex-col gap-2">
              {order.box.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between bg-[#0A0A0F] border border-[#2A2A38] rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1C1C28] border border-[#2A2A38] flex items-center justify-center flex-shrink-0">
                      <Package size={14} className="text-[#3D8BFF]" />
                    </div>
                    <div>
                      <p className="text-[#F2F2F8] text-sm font-medium">{mod.name}</p>
                      <p className="text-[#A8A8C0] text-xs">{mod.brand} Â· {mod.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#A8A8C0] bg-[#1C1C28] border border-[#2A2A38] rounded-full px-2 py-0.5">
                      x{mod.quantity}
                    </span>
                    <span className="text-[#F2F2F8] text-sm font-medium">{mod.value.toFixed(2)} â¬</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#2A2A38] flex justify-between items-center">
              <span className="text-[#A8A8C0] text-sm">Valeur totale box</span>
              <span className="text-[#F2F2F8] font-bold text-lg">
                {order.box.modules.reduce((sum, m) => sum + m.value * m.quantity, 0).toFixed(2)} â¬
              </span>
            </div>
          </div>

          {/* Tracking & Notes */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider mb-4">Suivi & Notes</h2>
            <div className="mb-4">
              <label className="text-xs text-[#A8A8C0] block mb-2">NumÃ©ro de tracking ({order.carrier})</label>
              {editingTracking ? (
                <div className="flex gap-2">
                  <input
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    placeholder="Ex: 6A12345678901"
                    className="flex-1 bg-[#0A0A0F] border border-[#3D8BFF] rounded-lg px-3 py-2 text-sm text-[#F2F2F8] placeholder-[#A8A8C0] outline-none"
                  />
                  <button
                    onClick={() => setEditingTracking(false)}
                    className="px-3 py-2 bg-[#3D8BFF] hover:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg px-3 py-2 text-sm text-[#A8A8C0]">
                    {tracking || "Aucun numÃ©ro de tracking"}
                  </div>
                  {tracking && (
                    <button
                      onClick={() => handleCopy(tracking)}
                      className="p-2 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors"
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Clipboard size={14} />}
                    </button>
                  )}
                  <button
                    onClick={() => setEditingTracking(true)}
                    className="p-2 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-[#A8A8C0] block mb-2">Notes internes</label>
              {editingNotes ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0A0F] border border-[#3D8BFF] rounded-lg px-3 py-2 text-sm text-[#F2F2F8] placeholder-[#A8A8C0] outline-none resize-none"
                  />
                  <button
                    onClick={() => setEditingNotes(false)}
                    className="self-end px-3 py-1.5 bg-[#3D8BFF] hover:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
              ) : (
                <div
                  className="w-full bg-[#0A0A0F] border border-[#2A2A38] rounded-lg px-3 py-2 text-sm text-[#A8A8C0] min-h-[60px] cursor-pointer hover:border-[#3D8BFF]/50 transition-colors"
                  onClick={() => setEditingNotes(true)}
                >
                  {notes || <span className="text-[#A8A8C0]/50">Cliquer pour ajouter une note...</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: timeline + summary */}
        <div className="flex flex-col gap-6">
          {/* Summary */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider mb-4">RÃ©capitulatif</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#A8A8C0]">Sous-total</span>
                <span className="text-[#F2F2F8]">{order.amount.toFixed(2)} â¬</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#A8A8C0]">Livraison</span>
                <span className="text-green-400">Offerte</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#A8A8C0]">RÃ©duction</span>
                <span className="text-[#F2F2F8]">â â¬</span>
              </div>
              <div className="pt-3 border-t border-[#2A2A38] flex justify-between">
                <span className="text-[#F2F2F8] font-semibold">Total</span>
                <span className="text-[#F2F2F8] font-bold text-lg">{order.amount.toFixed(2)} â¬</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={16} className="text-[#3D8BFF]" />
              <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider">Statut & Timeline</h2>
            </div>
            <div className="relative">
              {order.timeline.map((step, idx) => {
                const isActive = idx === currentStatusIndex;
                const isDone = step.done;
                const isLast = idx === order.timeline.length - 1;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex gap-4">
                    {/* Connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                          isActive
                            ? "border-[#3D8BFF] bg-[#3D8BFF]/20 text-[#3D8BFF]"
                            : isDone
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : "border-[#2A2A38] bg-[#0A0A0F] text-[#A8A8C0]/50"
                        }`}
                      >
                        <Icon size={14} />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 flex-1 my-1 ${
                            isDone && order.timeline[idx + 1]?.done
                              ? "bg-green-500/40"
                              : isDone
                              ? "bg-[#3D8BFF]/40"
                              : "bg-[#2A2A38]"
                          }`}
                          style={{ minHeight: "24px" }}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <div className={`pb-4 ${isLast ? "" : ""}`}>
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-[#3D8BFF]" : isDone ? "text-[#F2F2F8]" : "text-[#A8A8C0]/50"
                        }`}
                      >
                        {step.label}
                        {isActive && (
                          <span className="ml-2 text-xs bg-[#3D8BFF]/15 text-[#3D8BFF] border border-[#3D8BFF]/30 rounded-full px-1.5 py-0.5">
                            Actuel
                          </span>
                        )}
                      </p>
                      {step.date ? (
                        <p className="text-xs text-[#A8A8C0] mt-0.5">{step.date}</p>
                      ) : (
                        <p className="text-xs text-[#A8A8C0]/40 mt-0.5">En attente</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#F2F2F8] uppercase tracking-wider mb-4">Actions rapides</h2>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#0A0A0F] border border-[#2A2A38] text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-all text-sm">
                <Send size={14} className="text-[#3D8BFF]" />
                Renvoyer email confirmation
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#0A0A0F] border border-[#2A2A38] text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 transition-all text-sm">
                <RefreshCw size={14} className="text-[#3D8BFF]" />
                Relancer paiement
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#0A0A0F] border border-[#2A2A38] text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-red-500/50 transition-all text-sm">
                <ChevronRight size={14} className="text-red-400" />
                <span className="text-red-400/80">Annuler la commande</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
