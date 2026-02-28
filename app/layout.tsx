import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'VIVE Admin',
  description: 'VIVE Admin Dashboard — manage modules, orders, swaps and users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0A0A0F] text-[#F2F2F8] antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[#0A0A0F] p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
