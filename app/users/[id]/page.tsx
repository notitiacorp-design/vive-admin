"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Mail,
  Crown,
  Activity,
  Package,
  Brain,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Bell,
  RefreshCw,
  CreditCard,
  Flame,
  Moon,
  Target,
  Zap,
  AlertTriangle,
  Star,
} from "lucide-react";
import SleepChart from "@/components/SleepChart";

const user = {
  id: "1",
  name: "Camille Fontaine",
  email: "camille.fontaine@gmail.com",
  plan: "Premium",
  status: "active",
  memberSince: "2023-04-12",
  avatar: "CF",
  phone: "+33 6 12 34 56 78",
  location: "Lyon, France",
  sleepAvg: 6.8,
  bestStreak: 14,
  totalCheckins: 87,
  lastActivity: "2024-01-15",
};

const sleepData = [
  { date: "17 déc", hours: 6.5, quality: 72 },
  { date: "18 déc", hours: 7.2, quality: 81 },
  { date: "19 déc", hours: 5.8, quality: 61 },
  { date: "20 déc", hours: 7.8, quality: 88 },
  { date: "21 déc", hours: 6.9, quality: 75 },
  { date: "22 déc", hours: 8.1, quality: 91 },
  { date: "23 déc", hours: 7.4, quality: 83 },
  { date: "24 déc", hours: 6.2, quality: 68 },
  { date: "25 déc", hours: 7.0, quality: 77 },
  { date: "26 déc", hours: 6.7, quality: 74 },
  { date: "27 déc", hours: 7.5, quality: 84 },
  { date: "28 déc", hours: 8.0, quality: 90 },
  { date: "29 déc", hours: 6.3, quality: 70 },
  { date: "30 déc", hours: 7.1, quality: 79 },
  { date: "31 déc", hours: 5.9, quality: 63 },
  { date: "01 jan", hours: 7.6, quality: 85 },
  { date: "02 jan", hours: 6.8, quality: 76 },
  { date: "03 jan", hours: 7.3, quality: 82 },
  { date: "04 jan", hours: 8.2, quality: 92 },
  { date: "05 jan", hours: 6.1, quality: 67 },
  { date: "06 jan", hours: 7.9, quality: 89 },
  { date: "07 jan", hours: 7.0, quality: 78 },
  { date: "08 jan", hours: 6.5, quality: 72 },
  { date: "09 jan", hours: 7.7, quality: 86 },
  { date: "10 jan", hours: 8.3, quality: 93 },
  { date: "11 jan", hours: 6.4, quality: 71 },
  { date: "12 jan", hours: 7.2, quality: 80 },
  { date: "13 jan", hours: 7.8, quality: 87 },
  { date: "14 jan", hours: 6.6, quality: 73 },
  { date: "15 jan", hours: 7.4, quality: 83 },
];

const missions = [
  { id: 1, title: "Établir une routine pré-sommeil", category: "Sommeil", status: "completed", completedAt: "2024-01-10", xp: 150 },
  { id: 2, title: "Méditation 10 min pendant 7 jours", category: "Stress", status: "completed", completedAt: "2024-01-08", xp: 200 },
  { id: 3, title: "Réduire écrans 1h avant lit", category: "Sommeil", status: "in_progress", completedAt: null, xp: 120 },
  { id: 4, title: "Journal de gratitude quotidien", category: "Mental", status: "in_progress", completedAt: null, xp: 100 },
  { id: 5, title: "Exercice matinal 3x/semaine", category: "Énergie", status: "failed", completedAt: null, xp: 180 },
  { id: 6, title: "Hydratation : 2L d'eau par jour", category: "Santé", status: "completed", completedAt: "2024-01-05", xp: 80 },
  { id: 7, title: "Exposition lumière naturelle le matin", category: "Sommeil", status: "completed", completedAt: "2024-01-03", xp: 90 },
];

const boxes = [
  { id: 1, month: "Janvier 2024", theme: "Reset & Recharge", status: "en_route", items: ["Tisane Valériane BIO", "Masque yeux soie", "Bouchons Bose Sleepbuds", "Guide sommeil"], trackingId: "FR123456789" },
  { id: 2, month: "Décembre 2023", theme: "Deep Sleep Winter", status: "delivered", items: ["Spray magnésium", "Diffuseur huiles", "Lavande bio", "Carnet rituels"], trackingId: "FR987654321" },
  { id: 3, month: "Novembre 2023", theme: "Stress Shield", status: "delivered", items: ["Adaptogènes Ashwagandha", "Balles massage", "Playlist sommeil", "Patch CBD"], trackingId: "FR456789123" },
  { id: 4, month: "Octobre 2023", theme: "Autumn Restore", status: "delivered", items: ["Mélatonine naturelle", "Tisane camomille", "Sérum récupération", "Journal bien-être"], trackingId: "FR321654987" },
];

const jarvisState = {
  machineState: "plateau",
  bottleneck: "Qualité sommeil stagnante entre 70-85% malgré l'adoption des routines. Possible déficit en magnésium ou stress chronique non adressé.",
  lastAnalysis: "2024-01-15",
  confidence: 84,
  recommendations: [
    { id: 1, priority: "high", action: "Introduire protocole magnésium glycinate soir", category: "Nutrition", eta: "Box Février 2024" },
    { id: 2, priority: "high", action: "Proposer mission cohérence cardiaque 5-3-5", category: "Stress", eta: "Cette semaine" },
    { id: 3, priority: "medium", action: "Ajuster heure de coucher à 22h30 (vs 23h15)", category: "Chronobiologie", eta: "Immédiat" },
    { id: 4, priority: "low", action: "Débloquer badge \"14 jours consécutifs\" pour motivation", category: "Gamification", eta: "J+3" },
  ],
  triggers: ["Semaine chargée détectée (lun-mer)", "Score qualité < 75 trois fois cette semaine"],
};

const planDetails = {
  plan: "Premium",
  price: 39.90,
  nextBilling: "2024-02-12",
  startDate: "2023-04-12",
  swapTokens: 2,
  totalBoxes: 9,
};

const planColors: Record<string, string> = {
  Essential: "bg-[#2A2A38] text-[#A8A8C0] border border-[#3A3A4A]",
  Premium: "bg-[#1A2A4A] text-[#3D8BFF] border border-[#2A4A7A]",
  Elite: "bg-[#2A1A3A] text-[#A855F7] border border-[#4A2A6A]",
};

const stateColors: Record<string, { bg: string; text: string; label: string }> = {
  onboarding: { bg: "bg-yellow-900/30", text: "text-yellow-400", label: "Onboarding" },
  active: { bg: "bg-green-900/30", text: "text-green-400", label: "Actif" },
  plateau: { bg: "bg-orange-900/30", text: "text-orange-400", label: "Plateau" },
  breakthrough: { bg: "bg-purple-900/30", text: "text-purple-400", label: "Breakthrough" },
};

const priorityColors: Record<string, string> = {
  high: "text-red-400 bg-red-900/20 border-red-800",
  medium: "text-yellow-400 bg-yellow-900/20 border-yellow-800",
  low: "text-green-400 bg-green-900/20 border-green-800",
};

export default function UserDetailPage() {
  const [activeTab, setActiveTab] = useState<"health" | "missions" | "boxes" | "jarvis">("health");
  const [showChangePlan, setShowChangePlan] = useState(false);

  const state = stateColors[jarvisState.machineState];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F2F2F8]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-[#A8A8C0] hover:text-[#F2F2F8] transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm">Retour aux utilisateurs</span>
        </Link>

        {/* User Header */}
        <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3D8BFF] to-[#A855F7] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-[#F2F2F8]">{user.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${planColors[user.plan]}`}>
                  <Crown size={10} className="inline mr-1" />
                  {user.plan}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-800">
                  Actif
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#A8A8C0]">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  Membre depuis {new Date(user.memberSince).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity size={13} />
                  Dernière activité : 15 jan 2024
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowChangePlan(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A2A38] hover:bg-[#3A3A4A] border border-[#3A3A4A] text-sm text-[#F2F2F8] transition-colors"
              >
                <CreditCard size={14} />
                Changer plan
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A2A38] hover:bg-[#3A3A4A] border border-[#3A3A4A] text-sm text-[#F2F2F8] transition-colors">
                <RefreshCw size={14} />
                Swap token
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#3D8BFF]/20 hover:bg-[#3D8BFF]/30 border border-[#3D8BFF]/40 text-sm text-[#3D8BFF] transition-colors">
                <Bell size={14} />
                Notifier
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#2A2A38]">
            <div className="text-center">
              <div className="text-xl font-bold text-[#3D8BFF]">{user.sleepAvg}h</div>
              <div className="text-xs text-[#A8A8C0] mt-0.5">Sommeil moyen</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400">{user.bestStreak}</div>
              <div className="text-xs text-[#A8A8C0] mt-0.5">Meilleure série</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">{user.totalCheckins}</div>
              <div className="text-xs text-[#A8A8C0] mt-0.5">Check-ins totaux</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-400">{planDetails.totalBoxes}</div>
              <div className="text-xs text-[#A8A8C0] mt-0.5">Boxes reçues</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-[#1C1C28] border border-[#2A2A38] rounded-xl p-1 mb-6 overflow-x-auto">
          {[
            { key: "health", label: "Données santé", icon: Moon },
            { key: "missions", label: "Missions", icon: Target },
            { key: "boxes", label: "Abonnement & Boxes", icon: Package },
            { key: "jarvis", label: "Jarvis AI", icon: Brain },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center ${
                activeTab === key
                  ? "bg-[#3D8BFF] text-white"
                  : "text-[#A8A8C0] hover:text-[#F2F2F8] hover:bg-[#2A2A38]"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Health Tab */}
        {activeTab === "health" && (
          <div className="space-y-6">
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#F2F2F8] mb-1">Qualité du sommeil — 30 derniers jours</h2>
              <p className="text-sm text-[#A8A8C0] mb-5">Données agrégées depuis l'app VIVE</p>
              <SleepChart data={sleepData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center">
                    <Moon size={16} className="text-[#3D8BFF]" />
                  </div>
                  <span className="text-sm text-[#A8A8C0]">Moyenne sommeil</span>
                </div>
                <div className="text-3xl font-bold text-[#F2F2F8]">{user.sleepAvg}h</div>
                <div className="text-xs text-green-400 mt-1">↑ +0.3h vs mois dernier</div>
              </div>
              <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-900/30 flex items-center justify-center">
                    <Flame size={16} className="text-orange-400" />
                  </div>
                  <span className="text-sm text-[#A8A8C0]">Meilleure série</span>
                </div>
                <div className="text-3xl font-bold text-[#F2F2F8]">{user.bestStreak} jours</div>
                <div className="text-xs text-[#A8A8C0] mt-1">Série actuelle : 4 jours</div>
              </div>
              <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-400" />
                  </div>
                  <span className="text-sm text-[#A8A8C0]">Total check-ins</span>
                </div>
                <div className="text-3xl font-bold text-[#F2F2F8]">{user.totalCheckins}</div>
                <div className="text-xs text-[#A8A8C0] mt-1">Depuis l'inscription</div>
              </div>
            </div>
          </div>
        )}

        {/* Missions Tab */}
        {activeTab === "missions" && (
          <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#2A2A38]">
              <h2 className="text-lg font-semibold text-[#F2F2F8]">Historique missions & check-ins</h2>
              <p className="text-sm text-[#A8A8C0] mt-0.5">
                {missions.filter((m) => m.status === "completed").length} complétées · {missions.filter((m) => m.status === "in_progress").length} en cours
              </p>
            </div>
            <div className="divide-y divide-[#2A2A38]">
              {missions.map((mission) => (
                <div key={mission.id} className="p-5 flex items-center gap-4 hover:bg-[#22222E] transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    mission.status === "completed" ? "bg-green-900/30" :
                    mission.status === "in_progress" ? "bg-blue-900/30" :
                    "bg-red-900/30"
                  }`}>
                    {mission.status === "completed" ? (
                      <CheckCircle2 size={16} className="text-green-400" />
                    ) : mission.status === "in_progress" ? (
                      <Clock size={16} className="text-[#3D8BFF]" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#F2F2F8] truncate">{mission.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#A8A8C0]">{mission.category}</span>
                      {mission.completedAt && (
                        <span className="text-xs text-[#A8A8C0]">· Complété le {new Date(mission.completedAt).toLocaleDateString("fr-FR")}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
                    <Star size={12} />
                    {mission.xp} XP
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    mission.status === "completed" ? "bg-green-900/30 text-green-400" :
                    mission.status === "in_progress" ? "bg-blue-900/30 text-[#3D8BFF]" :
                    "bg-red-900/30 text-red-400"
                  }`}>
                    {mission.status === "completed" ? "Complété" : mission.status === "in_progress" ? "En cours" : "Échoué"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boxes Tab */}
        {activeTab === "boxes" && (
          <div className="space-y-6">
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-[#F2F2F8] mb-4">Abonnement actuel</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-[#A8A8C0] mb-1">Plan</div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[planDetails.plan]}`}>
                    <Crown size={10} className="inline mr-1" />
                    {planDetails.plan}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8C0] mb-1">Mensualité</div>
                  <div className="text-sm font-semibold text-[#F2F2F8]">{planDetails.price.toFixed(2)} €/mois</div>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8C0] mb-1">Prochain débit</div>
                  <div className="text-sm font-semibold text-[#F2F2F8]">
                    {new Date(planDetails.nextBilling).toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#A8A8C0] mb-1">Swap tokens</div>
                  <div className="text-sm font-semibold text-purple-400">{planDetails.swapTokens} disponibles</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[#2A2A38]">
                <h2 className="text-lg font-semibold text-[#F2F2F8]">Historique des boxes</h2>
                <p className="text-sm text-[#A8A8C0] mt-0.5">{planDetails.totalBoxes} boxes envoyées depuis l'inscription</p>
              </div>
              <div className="divide-y divide-[#2A2A38]">
                {boxes.map((box) => (
                  <div key={box.id} className="p-5 hover:bg-[#22222E] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3D8BFF]/20 to-purple-500/20 border border-[#2A4A7A] flex items-center justify-center flex-shrink-0">
                          <Package size={16} className="text-[#3D8BFF]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#F2F2F8]">{box.month}</div>
                          <div className="text-xs text-[#A8A8C0]">Thème : {box.theme}</div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        box.status === "en_route" ? "bg-blue-900/30 text-[#3D8BFF] border border-[#2A4A7A]" :
                        "bg-green-900/30 text-green-400 border border-green-800"
                      }`}>
                        {box.status === "en_route" ? "En route" : "Livré"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {box.items.map((item) => (
                        <span key={item} className="px-2 py-0.5 rounded bg-[#2A2A38] text-xs text-[#A8A8C0]">{item}</span>
                      ))}
                    </div>
                    {box.trackingId && (
                      <div className="mt-2 text-xs text-[#A8A8C0]">Suivi : <span className="text-[#3D8BFF]">{box.trackingId}</span></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Jarvis Tab */}
        {activeTab === "jarvis" && (
          <div className="space-y-6">
            {/* Machine State */}
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-900/30 flex items-center justify-center">
                    <Brain size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#F2F2F8]">État Jarvis</h2>
                    <p className="text-xs text-[#A8A8C0]">Moteur IA bien-être • Confiance {jarvisState.confidence}%</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${state.bg} ${state.text}`}>
                  {state.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {["onboarding", "active", "plateau", "breakthrough"].map((s) => {
                  const sc = stateColors[s];
                  const isActive = jarvisState.machineState === s;
                  return (
                    <div key={s} className={`p-3 rounded-xl border transition-all ${
                      isActive
                        ? `${sc.bg} border-opacity-50 border-current`
                        : "bg-[#16161F] border-[#2A2A38] opacity-40"
                    }`}>
                      <div className={`text-xs font-semibold ${isActive ? sc.text : "text-[#A8A8C0]"}`}>
                        {stateColors[s].label}
                      </div>
                      <div className="text-xs text-[#A8A8C0] mt-0.5">
                        {s === "onboarding" && "Découverte des habitudes"}
                        {s === "active" && "Progression régulière"}
                        {s === "plateau" && "Stagnation détectée"}
                        {s === "breakthrough" && "Percée majeure"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#16161F] rounded-xl p-4 border border-[#2A2A38]">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-orange-400 mb-1">Bottleneck identifié</div>
                    <p className="text-sm text-[#A8A8C0] leading-relaxed">{jarvisState.bottleneck}</p>
                  </div>
                </div>
              </div>

              {jarvisState.triggers.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {jarvisState.triggers.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-[#2A2A38] text-[#A8A8C0] border border-[#3A3A4A]">
                      ⚡ {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendation Queue */}
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[#2A2A38]">
                <h2 className="text-lg font-semibold text-[#F2F2F8]">File de recommandations</h2>
                <p className="text-sm text-[#A8A8C0] mt-0.5">Actions suggérées par Jarvis</p>
              </div>
              <div className="divide-y divide-[#2A2A38]">
                {jarvisState.recommendations.map((rec, idx) => (
                  <div key={rec.id} className="p-5 flex items-start gap-4 hover:bg-[#22222E] transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#2A2A38] flex items-center justify-center text-xs font-bold text-[#A8A8C0] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#F2F2F8] mb-1">{rec.action}</div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-[#A8A8C0]">{rec.category}</span>
                        <span className="text-xs text-[#A8A8C0]">· {rec.eta}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded border text-xs font-medium flex-shrink-0 ${priorityColors[rec.priority]}`}>
                      {rec.priority === "high" ? "Haute" : rec.priority === "medium" ? "Moyenne" : "Basse"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Change Plan Modal */}
        {showChangePlan && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1C1C28] border border-[#2A2A38] rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-[#F2F2F8] mb-4">Changer le plan</h3>
              <div className="space-y-3 mb-5">
                {["Essential", "Premium", "Elite"].map((plan) => (
                  <button
                    key={plan}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      user.plan === plan
                        ? "bg-[#3D8BFF]/10 border-[#3D8BFF]/40"
                        : "bg-[#16161F] border-[#2A2A38] hover:border-[#3A3A4A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Crown size={16} className={user.plan === plan ? "text-[#3D8BFF]" : "text-[#A8A8C0]"} />
                      <span className={`font-medium ${user.plan === plan ? "text-[#3D8BFF]" : "text-[#F2F2F8]"}`}>{plan}</span>
                    </div>
                    <span className="text-sm text-[#A8A8C0]">
                      {plan === "Essential" ? "19,90 €" : plan === "Premium" ? "39,90 €" : "59,90 €"}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowChangePlan(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2A2A38] hover:bg-[#3A3A4A] text-[#A8A8C0] text-sm transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowChangePlan(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#3D8BFF] hover:bg-[#2D7BEF] text-white text-sm font-medium transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
