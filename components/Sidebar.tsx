'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ArrowLeftRight,
  Users,
  BarChart3,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Modules', href: '/modules', icon: Package },
  { label: 'Commandes', href: '/orders', icon: ShoppingCart },
  { label: 'Swaps', href: '/swaps', icon: ArrowLeftRight },
  { label: 'Utilisateurs', href: '/users', icon: Users },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <aside
      className="flex flex-col h-screen bg-[#1C1C28] border-r border-[#2A2A38]"
      style={{ width: '260px', minWidth: '260px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#2A2A38]">
        <span className="text-2xl font-bold tracking-widest text-[#F2F2F8] select-none">
          VIVE
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#3D8BFF]/15 text-[#3D8BFF] border border-[#3D8BFF]/30 rounded px-1.5 py-0.5">
          admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                    'border-l-2',
                    active
                      ? 'border-[#3D8BFF] bg-[#3D8BFF]/10 text-[#3D8BFF]'
                      : 'border-transparent text-[#A8A8C0] hover:bg-[#2A2A38] hover:text-[#F2F2F8]',
                  ].join(' ')}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className={active ? 'text-[#3D8BFF]' : 'text-[#A8A8C0]'}
                  />
                  <span>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-[#2A2A38]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3D8BFF]/20 border border-[#3D8BFF]/40 text-[#3D8BFF] text-sm font-semibold select-none shrink-0">
            VA
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-[#F2F2F8] truncate">
              VIVE Admin
            </span>
            <span className="text-xs text-[#A8A8C0] truncate">Super Admin</span>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online" />
        </div>
      </div>
    </aside>
  )
}
