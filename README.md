# VIVE Admin Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss) ![Supabase](https://img.shields.io/badge/Supabase-latest-3ECF8E?style=flat-square&logo=supabase) ![Vercel](https://img.shields.io/badge/Déploiement-Vercel-000000?style=flat-square&logo=vercel)

Dashboard d'administration interne pour **VIVE**, une application de health concierge premium. Cette interface permet aux équipes internes de gérer les membres, de suivre les indicateurs clés de performance, de superviser les rendez-vous et de piloter l'ensemble des opérations de la plateforme depuis un point de contrôle centralisé.

---

## Table des matières

- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Direction artistique](#direction-artistique)
- [Pages](#pages)
- [Déploiement Vercel](#déploiement-vercel)
- [Licence](#licence)

---

## Stack technique

| Technologie | Rôle | Version |
|---|---|---|
| **Next.js** | Framework React avec App Router | 14.x |
| **TypeScript** | Typage statique | 5.x |
| **Tailwind CSS** | Utilitaires CSS & design system | 3.x |
| **shadcn/ui** | Composants UI accessibles et personnalisables | latest |
| **Supabase** | Backend as a Service (BDD, Auth, Storage) | latest |
| **Recharts** | Visualisation de données & graphiques | latest |

---

## Structure du projet

```
vive-admin/
├── app/
│   ├── layout.tsx                  # Layout racine (providers, fonts)
│   ├── page.tsx                    # Redirection vers /dashboard
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx            # Page de connexion administrateur
│   │   └── layout.tsx              # Layout minimaliste pour l'auth
│   └── (dashboard)/
│       ├── layout.tsx              # Layout principal avec sidebar
│       ├── dashboard/
│       │   └── page.tsx            # Vue d'ensemble & KPIs
│       ├── membres/
│       │   ├── page.tsx            # Liste des membres
│       │   └── [id]/
│       │       └── page.tsx        # Fiche détaillée d'un membre
│       ├── rendez-vous/
│       │   └── page.tsx            # Gestion des rendez-vous
│       ├── praticiens/
│       │   ├── page.tsx            # Liste des praticiens
│       │   └── [id]/
│       │       └── page.tsx        # Fiche détaillée d'un praticien
│       ├── contenu/
│       │   └── page.tsx            # Gestion éditoriale du contenu
│       ├── facturation/
│       │   └── page.tsx            # Suivi des paiements & abonnements
│       ├── notifications/
│       │   └── page.tsx            # Centre de notifications
│       └── parametres/
│           └── page.tsx            # Paramètres de l'application
├── components/
│   ├── ui/                         # Composants shadcn/ui générés
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx             # Navigation latérale principale
│   │   ├── Header.tsx              # Barre supérieure avec recherche & profil
│   │   └── MobileNav.tsx           # Navigation responsive mobile
│   ├── dashboard/
│   │   ├── KpiCard.tsx             # Carte indicateur clé de performance
│   │   ├── RevenueChart.tsx        # Graphique revenus (Recharts)
│   │   ├── MembresChart.tsx        # Évolution du nombre de membres
│   │   ├── ActivityFeed.tsx        # Flux d'activité récente
│   │   └── QuickStats.tsx          # Statistiques rapides en ligne
│   ├── membres/
│   │   ├── MembresTable.tsx        # Tableau paginé des membres
│   │   ├── MembreCard.tsx          # Carte résumé d'un membre
│   │   ├── MembreFilters.tsx       # Filtres & recherche avancée
│   │   └── MembreStatusBadge.tsx   # Badge statut (actif, suspendu, etc.)
│   ├── rendez-vous/
│   │   ├── AppointmentsTable.tsx   # Tableau des rendez-vous
│   │   ├── AppointmentCard.tsx     # Carte rendez-vous
│   │   └── CalendarView.tsx        # Vue calendrier mensuelle
│   ├── praticiens/
│   │   ├── PraticiensTable.tsx     # Tableau des praticiens
│   │   └── PraticienCard.tsx       # Carte profil praticien
│   ├── facturation/
│   │   ├── FacturesTable.tsx       # Tableau des transactions
│   │   └── RevenueBreakdown.tsx    # Répartition des revenus
│   └── shared/
│       ├── PageHeader.tsx          # En-tête de page réutilisable
│       ├── DataTable.tsx           # Composant tableau générique
│       ├── EmptyState.tsx          # État vide illustré
│       ├── LoadingSpinner.tsx      # Indicateur de chargement
│       ├── ConfirmDialog.tsx       # Modale de confirmation
│       └── SearchInput.tsx         # Champ de recherche global
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Client Supabase côté navigateur
│   │   ├── server.ts               # Client Supabase côté serveur
│   │   └── middleware.ts           # Gestion de session middleware
│   ├── utils.ts                    # Fonctions utilitaires générales
│   ├── formatters.ts               # Formatage dates, monnaie, etc.
│   └── constants.ts                # Constantes globales de l'application
├── hooks/
│   ├── useMembers.ts               # Hook données membres
│   ├── useAppointments.ts          # Hook données rendez-vous
│   ├── useStats.ts                 # Hook statistiques dashboard
│   └── useAuth.ts                  # Hook authentification
├── types/
│   ├── member.ts                   # Types TypeScript — membres
│   ├── appointment.ts              # Types TypeScript — rendez-vous
│   ├── practitioner.ts             # Types TypeScript — praticiens
│   └── supabase.ts                 # Types générés par Supabase CLI
├── middleware.ts                   # Middleware Next.js (auth guards)
├── tailwind.config.ts              # Configuration Tailwind & tokens
├── next.config.js                  # Configuration Next.js
├── .env.example                    # Modèle de variables d'environnement
└── package.json
```

---

## Installation

### Prérequis

- Node.js **18.17+**
- npm **9+** ou pnpm
- Un projet [Supabase](https://supabase.com) configuré

### Étapes

**1. Cloner le dépôt**

```bash
git clone https://github.com/vive-health/vive-admin.git
```

**2. Accéder au répertoire du projet**

```bash
cd vive-admin
```

**3. Installer les dépendances**

```bash
npm install
```

**4. Configurer les variables d'environnement**

Copier le fichier d'exemple et renseigner les valeurs correspondant à votre projet Supabase :

```bash
cp .env.example .env.local
```

Ouvrir `.env.local` et compléter toutes les variables (voir la section [Variables d'environnement](#variables-denvironnement)).

**5. Lancer le serveur de développement**

```bash
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Variables d'environnement

Toutes les variables doivent être définies dans `.env.local` pour le développement et dans les paramètres Vercel pour la production.

| Variable | Description | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase (ex. `https://xxxx.supabase.co`) | Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique anonyme Supabase | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service Supabase — usage serveur uniquement, ne jamais exposer côté client | Oui |
| `SUPABASE_JWT_SECRET` | Secret JWT pour la validation des tokens d'authentification | Oui |
| `NEXT_PUBLIC_APP_URL` | URL publique de l'application (ex. `https://admin.vive.health`) | Oui |
| `NEXT_PUBLIC_APP_ENV` | Environnement courant : `development`, `staging` ou `production` | Non |
| `ADMIN_EMAIL_WHITELIST` | Liste d'adresses e-mail autorisées à accéder au dashboard (séparées par des virgules) | Non |

> **Attention** — Ne jamais commiter `.env.local` dans le dépôt Git. Le fichier est listé dans `.gitignore` par défaut.

---

## Direction artistique

VIVE adopte une esthétique **premium, épurée et médicale** — tons neutres chauds et accents vert sauge, inspirés du bien-être et de la santé haut de gamme.

### Tokens de couleur

| Token | Nom | Valeur HEX | Usage |
|---|---|---|---|
| `--color-brand-primary` | Vert VIVE | `#4A7C6F` | Actions primaires, liens actifs, indicateurs positifs |
| `--color-brand-secondary` | Vert clair | `#7FB5A8` | Hover, états secondaires, graphiques |
| `--color-brand-accent` | Or doux | `#C9A96E` | Badges premium, mises en avant éditoriales |
| `--color-bg-base` | Blanc cassé | `#F9F7F4` | Fond principal de l'application |
| `--color-bg-surface` | Blanc pur | `#FFFFFF` | Cards, modales, panneaux |
| `--color-bg-subtle` | Gris chaud | `#F2EFEB` | Fonds alternatifs, zebra-stripes tableaux |
| `--color-text-primary` | Anthracite | `#1C1C1E` | Titres, texte principal |
| `--color-text-secondary` | Gris moyen | `#6B6B6F` | Sous-titres, métadonnées, labels |
| `--color-text-muted` | Gris clair | `#AEAEB2` | Placeholders, texte désactivé |
| `--color-border` | Séparateur | `#E5E1DC` | Bordures de cards, lignes de tableaux |
| `--color-status-success` | Vert succès | `#34C759` | Statuts actifs, confirmations |
| `--color-status-warning` | Ambre | `#FF9F0A` | Alertes, statuts en attente |
| `--color-status-danger` | Rouge | `#FF3B30` | Erreurs, suppressions, suspensions |
| `--color-status-info` | Bleu | `#007AFF` | Informations, liens secondaires |

### Typographie

| Rôle | Police | Grammage |
|---|---|---|
| Titres & branding | **Playfair Display** | 600, 700 |
| Interface & corps de texte | **Inter** | 400, 500, 600 |
| Données & chiffres | **JetBrains Mono** | 400 |

---

## Pages

### Dashboard `/dashboard`
Vue d'ensemble de l'activité VIVE. Affiche les KPIs principaux (membres actifs, revenus du mois, rendez-vous planifiés, taux de rétention), des graphiques d'évolution temporelle et un flux d'activité récente.

### Membres `/membres`
Tableau complet de tous les membres inscrits sur la plateforme. Recherche, filtrage par statut (actif, suspendu, en attente) et accès aux fiches individuelles. La vue détaillée `/membres/[id]` regroupe le profil, l'historique des rendez-vous et les informations d'abonnement.

### Rendez-vous `/rendez-vous`
Supervision de l'ensemble des rendez-vous passés et à venir. Disponible en vue tableau et en vue calendrier mensuelle. Permet de modifier le statut d'un rendez-vous et de filtrer par praticien, spécialité ou période.

### Praticiens `/praticiens`
Répertoire des professionnels de santé partenaires de VIVE. Gestion des profils, des spécialités et des disponibilités. La fiche `/praticiens/[id]` détaille les statistiques individuelles et l'agenda.

### Contenu `/contenu`
Interface éditoriale pour gérer les articles, conseils santé et ressources publiés dans l'application VIVE. Publication, mise en brouillon et archivage des contenus.

### Facturation `/facturation`
Tableau de bord financier : historique des transactions, suivi des abonnements actifs, revenus par période et répartition par formule d'abonnement.

### Notifications `/notifications`
Centre d'envoi et de suivi des notifications push et e-mails à destination des membres. Historique des campagnes et indicateurs d'ouverture.

### Paramètres `/parametres`
Configuration générale de l'application, gestion des administrateurs autorisés et personnalisation des préférences système.

---

## Déploiement Vercel

VIVE Admin Dashboard est optimisé pour un déploiement sur [Vercel](https://vercel.com), la plateforme recommandée pour les projets Next.js.

**1. Connecter le dépôt GitHub**

Se rendre sur [vercel.com/new](https://vercel.com/new), importer le dépôt `vive-health/vive-admin` et sélectionner le framework **Next.js** (détecté automatiquement).

**2. Configurer les variables d'environnement**

Dans l'onglet **Settings > Environment Variables** du projet Vercel, ajouter toutes les variables listées dans la section [Variables d'environnement](#variables-denvironnement). Veiller à appliquer les variables sensibles (`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`) uniquement aux environnements **Production** et **Preview**, sans les exposer.

**3. Déployer**

Cliquer sur **Deploy**. Vercel effectue le build automatiquement. Chaque `git push` sur la branche `main` déclenche un nouveau déploiement en production. Les branches de fonctionnalité génèrent des **Preview Deployments** isolés.

```bash
# Déploiement manuel via CLI Vercel (optionnel)
npx vercel --prod
```

> **Recommandation** — Activer la **protection par mot de passe** sur les Preview Deployments depuis les paramètres Vercel afin de restreindre l'accès aux environnements de staging.

---

## Licence

Ce projet est un logiciel propriétaire développé exclusivement pour **VIVE Health**. Toute reproduction, distribution ou utilisation en dehors du cadre de VIVE est strictement interdite sans autorisation écrite préalable.

---

*VIVE Admin Dashboard — Usage interne uniquement. Pour toute question technique, contacter l'équipe engineering VIVE.*