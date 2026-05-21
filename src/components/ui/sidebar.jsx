import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  Box,
  Diamond,
  Menu,
  MoreHorizontal,
  Send,
  Shield,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: BarChart3, href: '/umkm' },
  { label: 'Evidence Vault', icon: Box, href: '/umkm/evidence' },
  { label: 'Green Passport', icon: Diamond, href: '/umkm/passport' },
  { label: 'Proposal', icon: Send, href: '/umkm/proposal', badge: '1' },
]

const Brand = () => (
  <div className="flex h-20 items-center gap-3 border-b border-[#e5e0d8] px-6">
    <div className="grid h-7 w-7 place-items-center rounded-full border border-[#d8d3ca] bg-white">
      <Shield className="h-4 w-4 text-[#236041]" />
    </div>
    <div className="text-[1rem] font-black tracking-[-0.04em] text-[#236041]">
      GreenTrust<span className="font-semibold text-[#3f403b]"> Passport</span>
    </div>
  </div>
)

const NavList = ({ onNavigate }) => (
  <nav className="flex-1 overflow-y-auto px-4 py-4">
    <ul className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const content = (
          <>
            <Icon className="h-4 w-4 flex-none" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#c47739] px-1.5 text-[0.72rem] font-black text-white">
                {item.badge}
              </span>
            )}
          </>
        )

        if (!item.href) {
          return (
            <li key={item.label}>
              <button
                type="button"
                disabled
                className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[0.95rem] font-bold text-[#5f5a53] opacity-80"
              >
                {content}
              </button>
            </li>
          )
        }

        return (
          <li key={`${item.label}-${item.href}`}>
            <NavLink
              to={item.href}
              end={item.href === '/umkm'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 rounded-lg px-3 text-[0.95rem] font-bold transition ${
                  isActive
                    ? 'bg-[#dcebdc] text-[#244232]'
                    : 'text-[#5f5a53] hover:bg-[#f4f1ea] hover:text-[#20201c]'
                }`
              }
            >
              {content}
            </NavLink>
          </li>
        )
      })}
    </ul>
  </nav>
)

const AccountCard = () => (
  <div className="border-t border-[#e5e0d8] p-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 flex-none rounded-full bg-[#ece7dc]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9rem] font-black leading-tight text-[#20201c]">Batik Siti</p>
        <p className="truncate text-[0.78rem] font-semibold text-[#8d877f]">id #4821</p>
      </div>
      <button
        type="button"
        aria-label="Buka menu akun"
        className="grid h-8 w-8 place-items-center rounded-lg text-[#8d877f] transition hover:bg-[#f4f1ea] hover:text-[#20201c]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  </div>
)

const SidebarPanel = ({ onNavigate }) => (
  <aside className="flex h-full w-64 flex-col border-r border-[#ddd6ca] bg-white">
    <Brand />
    <NavList onNavigate={onNavigate} />
    <AccountCard />
  </aside>
)

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Tutup menu"
              className="fixed inset-0 z-40 bg-[#101310]/25 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
            >
              <SidebarPanel onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed left-0 top-0 z-30 hidden h-screen md:block">
        <SidebarPanel />
      </div>

      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#ddd6ca] bg-white px-4 md:hidden">
        <div className="flex items-center gap-2 text-[0.95rem] font-black tracking-[-0.04em] text-[#236041]">
          <Shield className="h-4 w-4" />
          GreenTrust Passport
        </div>
        <button
          type="button"
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setIsOpen((current) => !current)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[#d8d3ca] bg-[#fbfaf7] text-[#20201c]"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
    </>
  )
}

export { Sidebar }
