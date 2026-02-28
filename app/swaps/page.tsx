"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, ChevronDown, ChevronUp, X, AlertCircle, TrendingUp, Package, Users, BarChart2 } from "lucide-react";

type SwapStatus = "pending" | "approved" | "refused";

interface SwapRequest {
  id: string;
  client: { name: string; email: string };
  originalModule: string;
  requestedModule: string;
  dateRequest: string;
  status: SwapStatus;
  reason: string;
  adminNote?: string;
  adminDate?: string;
}

const mockSwaps: SwapRequest[] = [
  { id: "SW-001", client: { name: "Marie Dupont", email: "marie.dupont@email.fr" }, originalModule: "Marketing Digital", requestedModule: "SEO Avancé", dateRequest: "2024-01-15", status: "pending", reason: "Je souhaite me spécialiser davantage dans le référencement naturel plutôt que le marketing global." },
  { id: "SW-002", client: { name: "Thomas Martin", email: "thomas.martin@email.fr" }, originalModule: "Développement Web", requestedModule: "React & Next.js", dateRequest: "2024-01-14", status: "pending", reason: "Mon projet professionnel nécessite des compétences spécifiques en React." },
  { id: "SW-003", client: { name: "Sophie Bernard", email: "sophie.bernard@email.fr" }, originalModule: "Data Analytics", requestedModule: "Machine Learning", dateRequest: "2024-01-13", status: "pending", reason: "Je veux évoluer vers l'IA et le machine learning pour mon poste actuel." },
  { id: "SW-004", client: { name: "Lucas Petit", email: "lucas.petit@email.fr" }, originalModule: "UX Design", requestedModule: "UI Design Avancé", dateRequest: "2024-01-12", status: "pending", reason: "Mon entreprise a besoin de compétences UI plutôt qu'UX en ce moment." },
  { id: "SW-005", client: { name: "Emma Leroy", email: "emma.leroy@email.fr" }, originalModule: "Gestion de Projet", requestedModule: "Agilité & Scrum", dateRequest: "2024-01-11", status: "pending", reason: "Ma société adopte la méthodologie agile, je dois m'adapter rapidement." },
  { id: "SW-006", client: { name: "Hugo Moreau", email: "hugo.moreau@email.fr" }, originalModule: "Cybersécurité", requestedModule: "Ethical Hacking", dateRequest: "2024-01-10", status: "approved", reason: "Je souhaite me spécialiser en tests d'intrusion.", adminNote: "Demande approuvée. Le module Ethical Hacking correspond parfaitement au profil de l'apprenant.", adminDate: "2024-01-11" },
  { id: "SW-007", client: { name: "Camille Roux", email: "camille.roux@email.fr" }, originalModule: "E-commerce", requestedModule: "Dropshipping Avancé", dateRequest: "2024-01-09", status: "approved", reason: "Je lance une activité de dropshipping et ai besoin de compétences spécifiques.", adminNote: "Approuvé suite à la validation du projet entrepreneurial de l'apprenant.", adminDate: "2024-01-10" },
  { id: "SW-008", client: { name: "Nathan Dubois", email: "nathan.dubois@email.fr" }, originalModule: "Comptabilité", requestedModule: "Finance d'Entreprise", dateRequest: "2024-01-08", status: "approved", reason: "Promotion professionnelle nécessitant des compétences en finance.", adminNote: "Swap validé. La progression vers la finance est cohérente avec le parcours.", adminDate: "2024-01-09" },
  { id: "SW-009", client: { name: "Léa Simon", email: "lea.simon@email.fr" }, originalModule: "Photographie", requestedModule: "Montage Vidéo", dateRequest: "2024-01-07", status: "refused", reason: "Je souhaite me réorienter vers la vidéo.", adminNote: "Refusé. Le module demandé n'est pas disponible ce trimestre. Merci de reprogrammer en Q2.", adminDate: "2024-01-08" },
  { id: "SW-010", client: { name: "Maxime Girard", email: "maxime.girard@email.fr" }, originalModule: "Réseaux Sociaux", requestedModule: "Growth Hacking", dateRequest: "2024-01-06", status: "refused", reason: "Je veux aller plus loin que la simple gestion des RS.", adminNote: "Refusé. Le niveau prérequis pour le Growth Hacking n'est pas atteint. Contactez votre conseiller.", adminDate: "2024-01-07" },
  { id: "SW-011", client: { name: "Inès Fontaine", email: "ines.fontaine@email.fr" }, originalModule: "Communication", requestedModule: "Prise de Parole", dateRequest: "2024-01-05", status: "approved", reason: "Je dois animer des réunions et conférences dans mon nouveau poste.", adminNote: "Validé. Excellent choix pour accompagner l'évolution professionnelle.", adminDate: "2024-01-06" },
];

const StatusBadge = ({ status }: { status: SwapStatus }) => {
  const config = {
    pending: { label: "En attente", icon: Clock, bg: "bg-[#2A1F00]", text: "text-[#FFC107]", border: "border-[#FFC107]/30" },
    approved: { label: "Approuvé", icon: CheckCircle, bg: "bg-[#001F0F]", text: "text-[#10B981]", border: "border-[#10B981]/30" },
    refused: { label: "Refusé", icon: XCircle, bg: "bg-[#1F0005]", text: "text-[#EF4444]", border: "border-[#EF4444]/30" },
  }[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      <Icon size={11} />
      {config.label}
    </span>
  );
};

const KPICard = ({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string | number; sub?: string; color: string }) => (
  <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-5 flex items-start gap-4">
    <div className={`p-2.5 rounded-lg ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-[#A8A8C0] text-xs mb-1">{label}</p>
      <p className="text-[#F2F2F8] text-2xl font-bold">{value}</p>
      {sub && <p className="text-[#A8A8C0] text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const NoteModal = ({ swap, type, onClose, onConfirm }: { swap: SwapRequest; type: "approve" | "refuse"; onClose: () => void; onConfirm: (note: string) => void }) => {
  const [note, setNote] = useState("");
  const isApprove = type === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A38]">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isApprove ? "bg-[#10B981]/10" : "bg-[#EF4444]/10"}`}>
              {isApprove ? <CheckCircle size={18} className="text-[#10B981]" /> : <XCircle size={18} className="text-[#EF4444]" />}
            </div>
            <div>
              <h3 className="text-[#F2F2F8] font-semibold">{isApprove ? "Approuver le swap" : "Refuser le swap"}</h3>
              <p className="text-[#A8A8C0] text-xs">{swap.id} — {swap.client.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-[#0A0A0F] border border-[#2A2A38] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-[#A8A8C0] mb-2">
              <span className="font-medium text-[#F2F2F8]">{swap.originalModule}</span>
              <RefreshCw size={12} className="text-[#3D8BFF]" />
              <span className="font-medium text-[#F2F2F8]">{swap.requestedModule}</span>
            </div>
            <p className="text-[#A8A8C0] text-xs italic">« {swap.reason} »</p>
          </div>
          <div>
            <label className="block text-[#A8A8C0] text-xs font-medium mb-2">Note administrative <span className="text-[#A8A8C0]/50">(optionnel)</span></label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder={isApprove ? "Ex: Swap validé car cohérent avec le parcours..." : "Ex: Refusé car le module prérequis n'est pas validé..."}
              className="w-full bg-[#0A0A0F] border border-[#2A2A38] rounded-xl px-4 py-3 text-[#F2F2F8] text-sm placeholder-[#A8A8C0]/50 focus:outline-none focus:border-[#3D8BFF] resize-none transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-[#2A2A38] text-[#A8A8C0] hover:text-[#F2F2F8] hover:border-[#3D8BFF]/50 text-sm transition-colors">
            Annuler
          </button>
          <button
            onClick={() => onConfirm(note)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all ${isApprove ? "bg-[#10B981] hover:bg-[#059669]" : "bg-[#EF4444] hover:bg-[#DC2626]"}`}
          >
            {isApprove ? "Confirmer l'approbation" : "Confirmer le refus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SwapsPage() {
  const [activeTab, setActiveTab] = useState<SwapStatus>("pending");
  const [swaps, setSwaps] = useState<SwapRequest[]>(mockSwaps);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [modal, setModal] = useState<{ swap: SwapRequest; type: "approve" | "refuse" } | null>(null);

  const tabs: { key: SwapStatus; label: string; count: number }[] = [
    { key: "pending", label: "En attente", count: swaps.filter(s => s.status === "pending").length },
    { key: "approved", label: "Approuvés", count: swaps.filter(s => s.status === "approved").length },
    { key: "refused", label: "Refusés", count: swaps.filter(s => s.status === "refused").length },
  ];

  const filtered = swaps.filter(s => s.status === activeTab);

  const handleAction = (note: string) => {
    if (!modal) return;
    const newStatus: SwapStatus = modal.type === "approve" ? "approved" : "refused";
    setSwaps(prev => prev.map(s => s.id === modal.swap.id ? { ...s, status: newStatus, adminNote: note || (newStatus === "approved" ? "Swap approuvé par l'administrateur." : "Swap refusé par l'administrateur."), adminDate: new Date().toISOString().split("T")[0] } : s));
    setModal(null);
  };

  const toggleRow = (id: string) => setExpandedRow(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen bg-[#0A0A0F] p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#F2F2F8] text-2xl font-bold">Swaps</h1>
        <p className="text-[#A8A8C0] text-sm mt-1">Gestion des tokens de swap</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={BarChart2} label="Total swaps ce mois" value={24} sub="+3 vs mois dernier" color="bg-[#3D8BFF]/20" />
        <KPICard icon={Clock} label="En attente" value={swaps.filter(s => s.status === "pending").length} sub="Demandes à traiter" color="bg-[#FFC107]/20" />
        <KPICard icon={TrendingUp} label="Taux swap" value="4.2%" sub="Des formations actives" color="bg-[#10B981]/20" />
        <KPICard icon={Package} label="Tokens distribués" value={156} sub="Ce trimestre" color="bg-[#8B5CF6]/20" />
      </div>

      {/* Tabs + Table */}
      <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl overflow-hidden">
        {/* Tab Bar */}
        <div className="flex border-b border-[#2A2A38]">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-[#3D8BFF] border-b-2 border-[#3D8BFF] bg-[#3D8BFF]/5"
                  : "text-[#A8A8C0] hover:text-[#F2F2F8]"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.key
                  ? "bg-[#3D8BFF]/20 text-[#3D8BFF]"
                  : "bg-[#2A2A38] text-[#A8A8C0]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A38]">
                {["ID", "Client", "Module original", "Module demandé", "Date demande", "Statut", "Actions"].map(col => (
                  <th key={col} className="text-left text-[#A8A8C0] text-xs font-semibold uppercase tracking-wide px-6 py-3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A38]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-[#A8A8C0]">
                    <AlertCircle size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Aucun swap dans cette catégorie</p>
                  </td>
                </tr>
              )}
              {filtered.map(swap => (
                <>
                  <tr
                    key={swap.id}
                    className={`transition-colors cursor-pointer group ${
                      expandedRow === swap.id ? "bg-[#3D8BFF]/5" : "hover:bg-[#2A2A38]/40"
                    }`}
                    onClick={() => toggleRow(swap.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#3D8BFF] text-sm font-mono font-medium">{swap.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-[#F2F2F8] text-sm font-medium">{swap.client.name}</p>
                        <p className="text-[#A8A8C0] text-xs">{swap.client.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#2A2A38] text-[#A8A8C0] text-xs px-2.5 py-1 rounded-lg">
                        <Package size={11} />
                        {swap.originalModule}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#3D8BFF]/10 text-[#3D8BFF] text-xs px-2.5 py-1 rounded-lg">
                        <RefreshCw size={11} />
                        {swap.requestedModule}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#A8A8C0] text-sm">{new Date(swap.dateRequest).toLocaleDateString("fr-FR")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={swap.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        {swap.status === "pending" && (
                          <>
                            <button
                              onClick={() => setModal({ swap, type: "approve" })}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 text-xs font-medium hover:bg-[#10B981]/20 transition-colors"
                            >
                              <CheckCircle size={12} />
                              Approuver
                            </button>
                            <button
                              onClick={() => setModal({ swap, type: "refuse" })}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-xs font-medium hover:bg-[#EF4444]/20 transition-colors"
                            >
                              <XCircle size={12} />
                              Refuser
                            </button>
                          </>
                        )}
                        {swap.status !== "pending" && (
                          <span className="text-[#A8A8C0] text-xs">Traité</span>
                        )}
                        <button onClick={() => toggleRow(swap.id)} className="p-1.5 rounded-lg hover:bg-[#2A2A38] text-[#A8A8C0] transition-colors">
                          {expandedRow === swap.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === swap.id && (
                    <tr key={`${swap.id}-expanded`} className="bg-[#0A0A0F]/60">
                      <td colSpan={7} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-4 space-y-2">
                            <p className="text-[#A8A8C0] text-xs font-semibold uppercase tracking-wide">Raison de la demande</p>
                            <p className="text-[#F2F2F8] text-sm leading-relaxed italic">« {swap.reason} »</p>
                            <div className="flex items-center gap-4 pt-1">
                              <div className="text-xs text-[#A8A8C0]">
                                <span className="font-medium text-[#F2F2F8]">De: </span>{swap.originalModule}
                              </div>
                              <RefreshCw size={12} className="text-[#3D8BFF]" />
                              <div className="text-xs text-[#A8A8C0]">
                                <span className="font-medium text-[#F2F2F8]">Vers: </span>{swap.requestedModule}
                              </div>
                            </div>
                          </div>
                          {(swap.adminNote || swap.status !== "pending") && (
                            <div className={`border rounded-xl p-4 space-y-2 ${
                              swap.status === "approved"
                                ? "bg-[#001F0F] border-[#10B981]/20"
                                : swap.status === "refused"
                                ? "bg-[#1F0005] border-[#EF4444]/20"
                                : "bg-[#1C1C28] border-[#2A2A38]"
                            }`}>
                              <div className="flex items-center justify-between">
                                <p className={`text-xs font-semibold uppercase tracking-wide ${
                                  swap.status === "approved" ? "text-[#10B981]" : swap.status === "refused" ? "text-[#EF4444]" : "text-[#A8A8C0]"
                                }`}>Réponse administrative</p>
                                {swap.adminDate && (
                                  <span className="text-[#A8A8C0] text-xs">{new Date(swap.adminDate).toLocaleDateString("fr-FR")}</span>
                                )}
                              </div>
                              <p className="text-[#F2F2F8] text-sm leading-relaxed">{swap.adminNote ?? "En attente de traitement."}</p>
                            </div>
                          )}
                          {swap.status === "pending" && !swap.adminNote && (
                            <div className="bg-[#2A1F00]/50 border border-[#FFC107]/20 rounded-xl p-4 space-y-2">
                              <p className="text-[#FFC107] text-xs font-semibold uppercase tracking-wide">En attente de traitement</p>
                              <p className="text-[#A8A8C0] text-sm">Cette demande n'a pas encore été traitée par un administrateur.</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#2A2A38]">
                          <div className="text-xs text-[#A8A8C0]">
                            <span className="text-[#F2F2F8] font-medium">Client: </span>{swap.client.name} — {swap.client.email}
                          </div>
                          <div className="text-xs text-[#A8A8C0]">
                            <span className="text-[#F2F2F8] font-medium">Demande: </span>{new Date(swap.dateRequest).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                          <div className="text-xs text-[#A8A8C0]">
                            <span className="text-[#F2F2F8] font-medium">ID: </span>{swap.id}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A2A38] flex items-center justify-between">
          <p className="text-[#A8A8C0] text-xs">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
          <p className="text-[#A8A8C0] text-xs">Dernière mise à jour: {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <NoteModal
          swap={modal.swap}
          type={modal.type}
          onClose={() => setModal(null)}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}
