import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  Diamond,
  LogOut,
  Menu,
  Send,
  Shield,
  X,
} from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import primaryLogo from '@/assets/logo/primary-def.webp'

const navItems = [
  { label: 'Dashboard', icon: BarChart3, href: '/umkm' },
  { label: 'Evidence Vault', icon: Box, href: '/umkm/evidence' },
  { label: 'Green Passport', icon: Diamond, href: '/umkm/passport' },
  { label: 'Proposal', icon: Send, href: '/umkm/proposal', badge: '1' },
]

const SidebarPanel = ({ collapsed, onNavigate }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('reg_session_token')
    if (onNavigate) onNavigate()
    navigate('/login')
  }

  return (
    <aside className={`flex h-full flex-col bg-white transition-[width] duration-300 ease-in-out border-r border-[#ddd6ca] ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 py-5 ${collapsed ? 'justify-center px-4' : 'px-5'}`}>
        <img alt="GreenTrust" className="h-8 w-8 shrink-0 object-contain" src={primaryLogo} />
        {!collapsed && (
          <div className="text-[0.95rem] font-semibold leading-none text-[#205336]">
            GreenTrust
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/umkm'}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl px-3 py-2.5 text-[0.88rem] font-medium transition-colors duration-150 ${
                      collapsed ? 'justify-center' : 'justify-between'
                    } ${
                      isActive
                        ? 'bg-[#e8f0eb] text-[#205336]'
                        : 'text-[#5f5a53] hover:bg-[#f4f3ec] hover:text-[#111111]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {!collapsed && item.label}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c47739] px-1.5 text-[0.72rem] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-[#e5e0d8] p-4">
        {collapsed ? (
          <button
            type="button"
            onClick={handleLogout}
            title="Keluar"
            className="flex w-full items-center justify-center rounded-xl p-2 text-[#934f42] transition-colors hover:bg-[#fde8e3]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <PressButton
            variant="outline"
            className="w-full !flex !items-center !justify-center !gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </PressButton>
        )}
      </div>
    </aside>
  )
}

const Sidebar = ({ onCollapse }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = (val) => {
    setCollapsed(val)
    onCollapse?.(val)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="fixed left-0 top-0 z-30 hidden h-screen md:block">
        <div className="relative h-full">
          {/* Toggle button */}
          <button
            type="button"
            onClick={() => handleCollapse(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#5f5a53] ring-1 ring-[#e5e4e0] transition-colors hover:text-[#111111]"
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
          <SidebarPanel collapsed={collapsed} />
        </div>
      </div>

      {/* Mobile overlay */}
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
              <SidebarPanel collapsed={false} onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#ddd6ca] bg-white px-4 md:hidden">
        <div className="flex items-center gap-2 text-[0.95rem] font-black tracking-[-0.04em] text-[#236041]">
          <Shield className="h-4 w-4" />
          GreenTrust
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
